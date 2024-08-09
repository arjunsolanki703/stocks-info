"use client";

import React from 'react';
import Select from './../../components/elements/Select';
import { usePage } from '../provider';
import StocksTable from './../../components/elements/StocksTable';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChartSimple } from '@fortawesome/free-solid-svg-icons';

export default function StocksOfDay() {
  const {
    sectorOptions,
    getActiveStocks,
    fetchingStocks,
    sector,
    setSector,
    setChartData,
  } = usePage();

  return (
    <div className="space-y-4">
      <div className="flex  flex-wrap items-center justify-between gap-4 px-2">
        <h2 className="flex items-center gap-2">
          <FontAwesomeIcon icon={faChartSimple} className='w-5 h-5' />
          <span>Top 5 Stocks of the Day</span>
        </h2>
        <Select value={sector} onChange={setSector} options={sectorOptions} />
      </div>
      <StocksTable
        fetching={fetchingStocks}
        records={getActiveStocks}
        onChartShow={setChartData}
      />
    </div>
  );
}
