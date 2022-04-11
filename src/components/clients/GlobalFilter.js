const GlobalFilter = ({ filter, setFilter, placeholder }) => {
  return (
    <span>
      <input
        placeholder={placeholder}
        className="form-control global-filter"
        value={filter || ""}
        onChange={(e) => setFilter(e.target.value)}
      />
    </span>
  );
};

export default GlobalFilter;
