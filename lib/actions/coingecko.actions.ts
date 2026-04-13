'use server';

import qs from 'query-string';

const BASE_URL = process.env.COINGECKO_BASE_URL;
const API_KEY = process.env.COINGECKO_API_KEY;

if (!BASE_URL) throw new Error('Could not get base url.');
if (!API_KEY) throw new Error('Could not get api key.');

export async function fetcher<T>(
  endpoint: string,
  params?: QueryParams,
  revalidate: number = 60
): Promise<T> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 10_000);

  const url = qs.stringifyUrl(
    {
      url: `${BASE_URL}/${endpoint}`,
      query: params,
    },
    {
      skipEmptyString: true,
      skipNull: true,
    }
  );

  let response: Response;
  try {
    response = await fetch(url, {
      headers: {
        'x-cg-pro-api-key': API_KEY,
        'Content-Type': 'application/json',
      } as Record<string, string>,
      next: { revalidate },
      signal: controller.signal,
    });
  } catch (error) {
    if ((error as Error).name === 'AbortError') {
      throw new Error('CoinGecko request timed out.');
    }
    throw error;
  } finally {
    clearTimeout(timeout);
  }

  if (!response.ok) {
    const errorBody: CoinGeckoErrorBody = await response
      .json()
      .catch(() => ({}));
    throw new Error(
      `${errorBody.error || response.statusText} (${response.status})`
    );
  }

  return response.json();
}
