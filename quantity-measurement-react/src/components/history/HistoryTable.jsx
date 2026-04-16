function HistoryTable({ items }) {
  if (!items || items.length === 0) {
    return <p>No history found.</p>;
  }

  return (
    <div className="history-table">
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>Operation</th>
            <th>Quantity Type</th>
            <th>Input Values</th>
            <th>Result</th>
            <th>Timestamp</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item, index) => (
            <tr key={item.id || index}>
              <td>{index + 1}</td>
              <td>{item.operation || item.operationType || "-"}</td>
              <td>{item.quantityType || item.measurementType || "-"}</td>
              <td>
                {item.inputValues ? (
                  typeof item.inputValues === 'string' 
                    ? item.inputValues 
                    : JSON.stringify(item.inputValues)
                ) : (
                  item.value || "-"
                )}
              </td>
              <td className="result-value">
                {item.result || item.resultValue || item.convertedValue || "-"}
              </td>
              <td>
                {item.timestamp 
                  ? new Date(item.timestamp).toLocaleDateString() 
                  : item.date || "-"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default HistoryTable;