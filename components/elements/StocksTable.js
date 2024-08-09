import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./../ui/table";
import { Button } from "./../ui/button";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowTrendDown, faArrowTrendUp, faChartLine, faCircleNotch, faDollarSign } from '@fortawesome/free-solid-svg-icons';

export default function StocksTable({ records = [], fetching, onChartShow }) {
  return (
    <Table className="border bg-white">
      <TableHeader>
        <TableRow>
          <TableHead className="whitespace-nowrap w-[250px]">Symbol</TableHead>
          <TableHead className="whitespace-nowrap w-full">Name</TableHead>
          <TableHead className="whitespace-nowrap w-[250px]">Current Price</TableHead>
          <TableHead className="whitespace-nowrap w-[250px]">Daily Change (%)</TableHead>
          <TableHead className="whitespace-nowrap w-[250px]"></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {fetching ? (
          <TableRow>
            <TableCell colSpan={5} align="center">
              <FontAwesomeIcon icon={faCircleNotch} spin className='w-5 h-5' />
            </TableCell>
          </TableRow>
        ) : (
          records.map((record) => (
            <TableRow key={record.symbol}>

              {/* Stocks Symbol */}
              <TableCell className=" font-semibold">
                <p className={`px-3 py-1 text-xs text-center rounded-md text-white font-semibold ${record.daily_change_percent < 0 ? 'bg-red-600' : 'bg-emerald-600'}`}>
                  {record.symbol}
                </p>
              </TableCell>

              {/* Stocks Name */}
              <TableCell
                onClick={() => onChartShow(record)}
                className="cursor-pointer underline underline-offset-4"
              >
                {record.name}
              </TableCell>

              {/* Current Price */}
              <TableCell>
                <FontAwesomeIcon icon={faDollarSign} className='w-4 h-4' />
                <span>{record.current_price}</span>
              </TableCell>

              {/* Daily Change in Percentage */}
              <TableCell
                className={`font-semibold ${record.daily_change_percent < 0 ? 'text-red-500' : 'text-teal-500'
                  } space-x-2`}
              >
                <FontAwesomeIcon
                  className='w-5 h-5'
                  icon={record.daily_change_percent < 0 ? faArrowTrendDown : faArrowTrendUp}
                />
                <span>{record.daily_change_percent}%</span>
              </TableCell>

              {/* View Chart Action */}
              <TableCell>
                <Button onClick={() => onChartShow(record)} variant="link" className="space-x-2">
                  <FontAwesomeIcon icon={faChartLine} className='w-4 h-4' />
                  <span>Performance</span>
                </Button>
              </TableCell>
            </TableRow>
          ))
        )}
      </TableBody>
    </Table>
  );
}
