import React from "react";
import Timer from "./Components/Timer";
import Tasks from "./Components/Tasks";
import Header from "./Components/Header";
import ProgressBar from "./Components/ProgressBar";
import StateProvider from "./Components/StateProvider";
import "./App.css";

const App: React.FC = () => {
  return (
    <StateProvider>
      <center className="container">
        <Header />
        <ProgressBar />
        <Timer />
        <Tasks />
      </center>
    </StateProvider>
  );
};

export default App;