const CoinCard = ({ coin }) => {
  const {
    image,
    name,
    current_price,
    price_change_percentage_24h,
    market_cap,
  } = coin;
  return (
    <div className="coin-card" key={coin.id}>
      <div className="coin-header">
        <img src={image} alt={coin.name} className="coin-image"></img>
        <div>
          <h2>{name}</h2>
          <p className="symbol">{coin.symbol.toUpperCase()}</p>
        </div>
      </div>
      <p>Price {current_price.toLocaleString()}</p>
      <p className={price_change_percentage_24h >= 0 ? "positive" : "negative"}>
        {price_change_percentage_24h.toFixed(2)} %
      </p>
      <p>Market Cap : {market_cap.toLocaleString()}</p>
    </div>
  );
};

export default CoinCard;
