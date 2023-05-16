import "./App.css";
import { useState } from "react";
import { Button } from "./components/Button";
import { Anecdote } from "./components/Anecdote";
const App = () => {
  const [selected, setSelected] = useState(0);
  const [points, setPoints] = useState(new Uint8Array(8));
  const anecdotes = [
    "If it hurts, do it more often.",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.",
    "The only way to go fast, is to go well.",
  ];

  const handleNextAnecdote = () => {
    setSelected((selected + 1) % anecdotes.length);
  };

  const handleAddVote = () => {
    const copy = [...points];
    copy[selected] += 1;
    setPoints(copy);
  };

  const getMostVoted = () => {
    const index = points.indexOf(Math.max(...points));
    return index;
  }
  return (
    <div>
      <h2>Anecdote of the day</h2>
      <Anecdote anecdote={anecdotes[selected]} votes={points[selected]} />
      <div>
        <Button text="Vote" onClick={handleAddVote} />
        <Button text="Next anecdote" onClick={handleNextAnecdote} />
      </div>
      <h2>Anecdote with most votes</h2>
      <Anecdote anecdote={anecdotes[getMostVoted()]} votes ={points[getMostVoted()]}/>
    </div>
  );
};

export default App;
