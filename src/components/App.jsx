import Description from "./Description/Description";
import Options from "./Options/Options";
import Feedback from "./Feedback/Feedback";
import Notification from "./Notification/Notification";

import { useState, useEffect } from "react";

function App() {
  const [state, setState] = useState(() => {
    const savedState = localStorage.getItem("feedbackState");
    if (savedState) {
      return JSON.parse(savedState);
    }
    return {
      good: 0,
      neutral: 0,
      bad: 0,
    };
  });
  useEffect(() => {
    localStorage.setItem("feedbackState", JSON.stringify(state));
  }, [state]);
  const updateFeedback = function (type) {
    if (type === "reset") {
      setState({
        good: 0,
        neutral: 0,
        bad: 0,
      });
      localStorage.removeItem("feedbackState");
      return;
    }
    setState((prevState) => ({
      ...prevState,
      [type]: prevState[type] + 1,
    }));
    return;
  };
  const totalFeedback = state.good + state.neutral + state.bad;
  return (
    <>
      <Description />
      <Options updateFeedback={updateFeedback} totalFeedback={totalFeedback} />
      {totalFeedback === 0 ? (
        <Notification message="No feedback yet" />
      ) : (
        <Feedback
          state={state}
          totalFeedback={totalFeedback}
          positiveFeedback={Math.round((state.good / totalFeedback) * 100)}
        />
      )}
    </>
  );
}

export default App;
