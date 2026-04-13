import Image from 'next/image';

import { fetcher } from '@/lib/actions/coingecko.actions';
import { CoinOverviewFallback } from './Fallback';

const CoinOverview = async () => {
  let coin: CoinDetailsData;
  try {
    coin = await fetcher<CoinDetailsData>('coins/bitcoin');
  } catch {
    return <div id="coin-overview">Unable to load coin data right now.</div>;
  }

  return (
    <div id="coin-overview">
      <div className="header pt-2">
        <Image src={coin.image.large} alt={coin.name} width={56} height={56} />
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
    </div>
  );
};

export default CoinOverview;
