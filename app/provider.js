"use client";

import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { useToast } from "./../components/ui/use-toast";
import useFetch from './../hooks/useFetch';

const Context = createContext(null);

export function Provider({ children }) {
  const { toast } = useToast();

  // States
  const [sector, setSector] = useState(-1);
  const [sectorOptions, setSectorOptions] = useState([]);
  const [globalsStocks, setGlobalsStocks] = useState([]);
  const [stocks, setStocks] = useState([]);
  const [chartData, setChartData] = useState({});

  // Fetch sector options
  const { retrieve: fetchSectorsOptions } = useFetch({
    route: "/data/sectors.json",
    onSuccess: (data) => setSectorOptions([{ label: "Select Sector", value: -1 }, ...data]),
    onError: (error) => {
      toast({
        variant: "destructive",
        title: "Something went wrong!",
        description: error.message,
      });
    }
  });

  // Fetch global/daily stocks
  const { retrieve: fetchInitialStocks, fetching: fetchingStocks } = useFetch({
    route: "/data/stocks.json",
    onSuccess: (data) => {
      setGlobalsStocks(data.top_5_global_stocks);
      setStocks({
        top_5_daily_stocks: data.top_5_daily_stocks,
        sector_wise_top_stocks: data.sector_wise_top_stocks,
      });
    },
    onError: (error) => {
      toast({
        variant: "destructive",
        title: "Something went wrong!",
        description: error.message,
      });
    }
  });

  // Initial Calls
  useEffect(() => {
    fetchInitialStocks();
    fetchSectorsOptions();
  }, []);

  const getActiveStocks = useMemo(() => {
    return sector === -1 ? stocks.top_5_daily_stocks : stocks.sector_wise_top_stocks[sector];
  }, [stocks, sector]);

  return (
    <Context.Provider
      value={{
        sectorOptions,
        globalsStocks,
        getActiveStocks,
        fetchingStocks,
        sector,
        setSector,
        chartData,
        setChartData,
      }}
    >
      {children}
    </Context.Provider>
  );
}

export const usePage = () => {
  const context = useContext(Context);
  if (!context) {
    throw new Error("The `usePage` hook must be used within a `Provider` wrapper.");
  }
  return context;
};
