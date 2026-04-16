function ResultCard({ result, error }) {
  return (
    <div className="result-panel">
      <h3>Result</h3>
      {error ? <p className="error-text">{error}</p> : <p>{result}</p>}
    </div>
  );
}

export default ResultCard;