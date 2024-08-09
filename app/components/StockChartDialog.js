"use client";

import React from "react";
import {
  Dialog,
  DialogContent,
} from "./../../components/ui/dialog";
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./../../components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "./../../components/ui/chart";
import { usePage } from "../provider";
import { faArrowTrendDown, faArrowTrendUp, faDollarSign } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const chartConfig = {
  price: {
    label: "Price",
    color: "hsl(var(--chart-4))",
  },
};

export default function StockChartDialog() {
  const { chartData, setChartData } = usePage();

  return (
    <Dialog
      open={Object.keys(chartData).length !== 0}
      onOpenChange={(status) => {
        if (!status) setChartData({});
      }}
    >
      <DialogContent className="p-0 max-w-2xl">
        <Card className="border-0">
          <CardHeader className="py-4 space-y-4 flex flex-wrap flex-row justify-between items-end">
            <div className="space-y-2">

              {/* Stock Symbol/Name */}
              <CardTitle className="text-xl">
                <span className="underline underline-offset-4 text-indigo-500">
                  {chartData.symbol}
                </span>{" "}
                - {chartData.name}
              </CardTitle>
              <CardDescription>Stock performance over last week</CardDescription>
            </div>

            <div className="flex items-center gap-4">
              {/* Price */}
              <div
                className={`flex items-center font-semibold`}
              >
                <FontAwesomeIcon icon={faDollarSign} className='w-4 h-4' />
                <span>{chartData.current_price}</span>
              </div>

              {/* Daily Percentage Change */}
              <div
                className={`flex items-center gap-2 font-semibold ${chartData.daily_change_percent < 0 ? 'text-red-500' : 'text-teal-500'
                  }`}
              >
                <FontAwesomeIcon
                  className='w-5 h-5'
                  icon={chartData.daily_change_percent < 0 ? faArrowTrendDown : faArrowTrendUp}
                />
                <span>{chartData.daily_change_percent}%</span>
              </div>
            </div>
          </CardHeader>

          {/* Chart */}
          <CardContent className="p-4 -ml-6">
            <ChartContainer config={chartConfig}>
              {chartData.historical_performance &&
                <AreaChart accessibilityLayer data={chartData.historical_performance}>
                  <CartesianGrid vertical={false} />
                  <XAxis dataKey="date" />
                  <YAxis tickLine={false} axisLine={false} tickMargin={8}
                    domain={[
                      Math.min(...chartData.historical_performance?.map(item => item.price)) * 0.9,
                      'auto'
                    ]}
                  />
                  <ChartTooltip
                    cursor={false}
                    content={<ChartTooltipContent indicator="line" />}
                  />
                  <Area
                    dataKey="price"
                    type="monotone"
                    fill="#6366f1"
                    fillOpacity={0.2}
                    stroke="#6366f1"
                  />
                </AreaChart>}
            </ChartContainer>
          </CardContent>
        </Card>
      </DialogContent>
    </Dialog>
  );
}
