function Feedback({state, totalFeedback}) {
  return (
    <div>
      <p>Good: {state.good}</p>
      <p>Neutral: {state.neutral}</p>
      <p>Bad: {state.bad}</p>
      <p>Total: {totalFeedback}</p>
      <p>Positive: {Math.round((state.good / totalFeedback) * 100)}%</p>
    </div>
  );
}

export default Feedback;
