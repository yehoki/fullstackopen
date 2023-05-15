import Content from "./components/Content";
import Header from "./components/Header";
import Total from "./components/Total";

function App() {
  const course = "Half Stack application development";
  const parts = [
    {
      name: "Fundamentals of React",
      exercises: 10,
    },
    {
      name: "Using props to pass data",
      exercises: 7,
    },
    {
      name: "State of a component",
      exercises: 14,
    },
  ];

  return (
    <div>
      <Header course={course} />
      <Content
        part1={parts[0].name}
        part2={parts[1].name}
        part3={parts[2].name}
        ex1={parts[0].exercises}
        ex2={parts[1].exercises}
        ex3={parts[2].exercises}
      />
      <Total
        ex1={parts[0].exercises}
        ex2={parts[1].exercises}
        ex3={parts[2].exercises}
      />
    </div>
  );
}

export default App;
