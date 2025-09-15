import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  TimeScale,
} from "chart.js";
import "chartjs-adapter-date-fns";
import { useEffect, useState } from "react";

ChartJS.register(
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Tooltip,
  Legend,
  TimeScale
);

const API_URL = import.meta.env.VITE_COIN_API_URL;

const CoinChart = ({ coinId }) => {
  const [chartData, setChartData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPrices = async () => {
      try {
        const res = await fetch(
          `${API_URL}/${coinId}/market_chart?vs_currency=bdt&days=7`
        );
        const data = await res.json();

        const prices = data.prices.map((price) => ({
          x: price[0], // timestamp
          y: price[1], // price value
        }));

        setChartData({
          datasets: [
            {
              label: "Price (BDT)",
              data: prices,
              fill: true,
              borderColor: "#007bff",
              backgroundColor: "rgba(0,123,255,0.1)",
              pointRadius: 0,
              tension: 0.3,
            },
          ],
        });
      } catch (error) {
        console.error("Error fetching prices:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPrices();
  }, [coinId]);

  return (
    <div style={{ marginTop: "30px" }}>
      {loading ? (
        <p>Loading chart...</p>
      ) : (
        chartData && (
          <Line
            data={chartData}
            options={{
              responsive: true,
              plugins: {
                legend: { display: false },
                tooltip: { enabled: true },
              },
              interaction: {
                mode: "index",
                intersect: false,
              },
              scales: {
                x: {
                  type: "time",
                  time: { unit: "day" },
                  ticks: {
                    autoSkip: true,
                    maxTicksLimit: 7,
                  },
                },
                y: {
                  ticks: {
                    callback: (value) => `৳${value.toLocaleString()}`,
                  },
                },
              },
            }}
          />
        )
      )}
    </div>
  );
};

export default CoinChart;
