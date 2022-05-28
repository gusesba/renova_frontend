const ColumnSelector = ({ allColumns }) => {
  return (
    <div className="column-btns">
      {allColumns.map((column) => (
        <div key={column.id}>
          <label>
            <input
              className="checkbox-input"
              type="checkbox"
              {...column.getToggleHiddenProps()}
            />
            <span className="btn btn-primary checkbox-span">
              {column.Header}
            </span>
          </label>
        </div>
      ))}
    </div>
  );
};

export default ColumnSelector;
