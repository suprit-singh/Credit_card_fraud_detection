import React from "react";
import Navbar from "./components/Navbar";
import PredictionPage from "./components/PredictionPage";
function App() {
  
  return (
    <div className="flex flex-col bg-slate-600 h-screen overflow-auto">
      <Navbar/>
      <PredictionPage/>
    </div>
  );
}

export default App;
