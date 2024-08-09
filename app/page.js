import React from "react";
import { Provider } from "./provider";
import StockChartDialog from "./components/StockChartDialog";
import StocksGlobal from "./components/StocksGlobal";
import StocksOfDay from "./components/StocksOfDay";
import Logo from "./../components/elements/Logo"

export const metadata = {
  title: 'Stocks',
  description: 'Simple Stock Tracking'
}

export default function Page() {
  return (
    <Provider>
      {/* Will render on the server */}
      <div className="space-y-4 text-center ">
        <Logo />
      </div>

      <hr />

      {/* Start::Client components */}
      <StocksOfDay />
      <StocksGlobal />
      <StockChartDialog />
      {/* End::Client components */}
    </Provider>
  );
}
