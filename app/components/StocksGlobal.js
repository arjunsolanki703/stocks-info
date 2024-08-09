"use client";

import React from 'react';
import StocksTable from './../../components/elements/StocksTable';
import { usePage } from '../provider';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGlobe } from '@fortawesome/free-solid-svg-icons';

export default function StocksGlobal() {
  const { globalsStocks, fetchingStocks, setChartData } = usePage();

  return (
    <div className="space-y-4">
      <h2 className="px-2 flex items-center gap-2">
        <FontAwesomeIcon icon={faGlobe} className='w-5 h-5' />
        <span>Global Top 5 Stocks</span>
      </h2>
      <StocksTable
        fetching={fetchingStocks}
        records={globalsStocks}
        onChartShow={setChartData}
      />
    </div>
  );
}
