import Image from 'next/image';

import { fetcher } from '@/lib/actions/coingecko.actions';
import CandlestickChart from '../CandlestickChart';
import { CoinOverviewFallback } from './Fallback';

const CoinOverview = async () => {
  try {
    const [coin, coinOHLCData] = await Promise.all([
      await fetcher<CoinDetailsData>('coins/bitcoin'),
      await fetcher<OHLCData[]>('coins/bitcoin/ohlc', {
        vs_currency: 'usd',
        days: 1,
      }),
    ]);

    return (
      <div id="coin-overview">
        <CandlestickChart data={coinOHLCData} coinId="bitcoin">
          <div className="header pt-3">
            <Image
              src={coin.image.large}
              alt={coin.name}
              width={56}
              height={56}
            />
            <div className="info">
              <p>
                {coin.name} / {coin.symbol.toUpperCase()}
              </p>
              <h1>
                $
                {coin.market_data.current_price.usd.toLocaleString('en-US', {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </h1>
            </div>
          </div>
        </CandlestickChart>
      </div>
    );
  } catch {
    return <CoinOverviewFallback />;
  }
};

export default CoinOverview;
