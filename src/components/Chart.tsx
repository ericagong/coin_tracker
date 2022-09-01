import { useOutletContext } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
// 그냥 Chart 가져오면 현재 컴포넌트와 충돌하므로 ApexChart 가져옴.
import ApexChart from "react-apexcharts";

import { fetchCoinChart } from "../shared/api";

interface IChartProps {
  id: string;
}

interface IChartData {
  open: string;
  close: string;
  time_open: number;
  time_close: number;
  high: string;
  low: string;
  market_cap: number;
  volume: string;
}

const Chart = () => {
  const { id } = useOutletContext<IChartProps>();

  const {
    isLoading,
    data: chartData,
    error,
  } = useQuery<IChartData[]>(["chart", id], () => fetchCoinChart(id));

  return (
    <>
      {isLoading ? (
        "Loading data..."
      ) : error === null ? (
        <ApexChart
          type='line'
          series={[
            {
              name: "close",
              data: chartData?.map((price) => Number(price.close)) ?? [],
            },
          ]}
          options={{
            chart: {
              id: "price",
              height: 500,
              width: 500,
              toolbar: { show: false },
              background: "transparent",
            },
            theme: {
              mode: "dark",
            },
            yaxis: {
              show: false,
            },
            xaxis: {
              labels: {
                show: false,
              },
              axisTicks: {
                show: false,
              },
              axisBorder: {
                show: false,
              },
            },
            grid: {
              show: false,
            },
            stroke: { curve: "smooth", width: 3 },
          }}
        />
      ) : (
        "Sorry, there is no price data :("
      )}
    </>
  );
};

export default Chart;
