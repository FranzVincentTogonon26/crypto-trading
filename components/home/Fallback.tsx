import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

export function CoinOverviewFallback() {
  return (
    <div id="coin-overview-fallback">
      <div className="header pt-2">
        <div className="header-image skeleton" />
        <div className="info">
          <div className="header-line-sm skeleton" />
          <div className="header-line-lg skeleton" />
        </div>
      </div>
    </div>
  );
}

export function TrendingCoinsFallback() {
  return (
    <div id="trending-coins-fallback">
      <h4>Trending Coins</h4>
      <Table className="trending-coins-table">
        <TableHeader>
          <TableRow>
            <TableHead className="text-purple-100 py-4 first:pl-5 last:pr-5 ">
              Name
            </TableHead>
            <TableHead className="text-purple-100 py-4 first:pl-5 last:pr-5 ">
              24h Change
            </TableHead>
            <TableHead className="text-purple-100 py-4 first:pl-5 last:pr-5 ">
              Price
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {Array.from({ length: 10 }).map((_, index) => (
            <TableRow
              key={index}
              className="overflow-hidden rounded-lg border-b border-purple-200/5 hover:bg-dark-400/30! relative"
            >
              <TableCell className="name-cell">
                <div className="name-link">
                  <div className="name-image skeleton" />
                  <div className="name-line skeleton" />
                </div>
              </TableCell>
              <TableCell className="change-cell">
                <div className="change-line skeleton" />
              </TableCell>
              <TableCell className="price-cell">
                <div className="price-line skeleton" />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
