import React from "react";

export const GlobalFilter = ({ filter, setFilter }) => {
  return (
    <span>
      <input
        className="global-filter form-control"
        placeholder="Busca"
        value={filter || ""}
        onChange={(e) => setFilter(e.target.value)}
      />
    </span>
  );
};
