import "./App.css";
import {  BrowserRouter } from "react-router-dom";
import MainRouter from "./routes/MainRouter";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <MainRouter />
      </div>
    </BrowserRouter>
  );
}

// export default App;
export default App;
