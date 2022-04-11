const GlobalFilterClients = ({ filter, setFilter }) => {
  return (
    <span>
      <input
        placeholder="Gustavo Esmanhotto Bareta"
        className="form-control global-filter"
        value={filter || ""}
        onChange={(e) => setFilter(e.target.value)}
      />
    </span>
  );
};

export default GlobalFilterClients;
