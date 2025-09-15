const LimitSelector = ({ limit, onLimitChange }) => {
  return (
    <div className="controls">
      <label htmlFor="limit">Show :</label>
      <select
        name="limit"
        value={limit}
        id="limit"
        onChange={(e) => onLimitChange(Number(e.target.value))}
      >
        <option value={6}>6</option>
        <option value={12}>12</option>
        <option value={18}>18</option>
        <option value={24}>24</option>
        <option value={100}>100</option>
      </select>
    </div>
  );
};

export default LimitSelector;
