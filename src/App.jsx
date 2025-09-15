import { useEffect, useState } from "react";

const API_URL =
  "https://api.coingecko.com/api/v3/coins/markets?vs_currency=bdt&order=market_cap_desc&per_page=10&page=1&sparkline=false";

const App = () => {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(true);

  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCoins = async () => {
      try {
        const res = await fetch(API_URL);
        if (!res.ok) throw new Error("Failed to fetch data");
        const data = await res.json();
        // console.log(data);
        setCoins(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCoins();
    // fetch(API_URL)
    //   .then((res) => {
    //     if (!res.ok) throw new Error("Failed to fetch data");
    //     return res.json();
    //   })
    //   .then((data) => {
    //     console.log(data);
    //     setCoins(data);
    //     setLoading(false);
    //   })
    //   .catch((err) => {
    //     setError(err.message);
    //     setLoading(false);
    //   });
  }, []);

  return (
    <>
      <h1>🚀 Crypto Currency</h1>
      {loading && <p>Loading ....</p>}
      {error && <div className="error">{error}</div>}
      {!loading && !error && (
        <main className="grid">
          {coins.map((coin) => (
            <div className="coin-card" key={coin.id}>
              <div className="coin-header">
                <img
                  src={coin.image}
                  alt={coin.name}
                  className="coin-image"
                ></img>
                <div>
                  <h2>{coin.name}</h2>
                  <p className="symbol">{coin.symbol.toUpperCase()}</p>
                </div>
              </div>
              <p>Price {coin.current_price.toLocaleString()}</p>
              <p
                className={
                  coin.price_change_percentage_24h >= 0
                    ? "positive"
                    : "negative"
                }
              >
                {coin.price_change_percentage_24h.toFixed(2)} %
              </p>
              <p>Market Cap : {coin.market_cap.toLocaleString()}</p>
            </div>
          ))}
        </main>
      )}
    </>
  );
};

export default App;
