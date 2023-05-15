import { useState } from "react";
import { Header } from "./components/Header";
import { Buttons } from "./components/Buttons";
import { Content } from "./components/Content";

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const handleGoodClick = () => {
    setGood(good + 1);
  };

  const handleBadClick = () => {
    setBad(bad + 1);
  };

  const handleNeutralClick = () => {
    setNeutral(neutral + 1);
  };

  return (
    <div>
      <Header text="Give Feedback" />
      <Buttons
        setGood={handleGoodClick}
        setNeutral={handleNeutralClick}
        setBad={handleBadClick}
      />
      <Header text="Statistics" />
      <Content good={good} bad={bad} neutral={neutral} />
    </div>
  );
};

export default App;
