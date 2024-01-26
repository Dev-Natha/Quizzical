import "./App.css"
import Home from "./components/Home";
import { Route, Routes } from "react-router-dom";
import Quiz from "./components/Quiz";
import Todo from "./components/Todo";
const App = () => {
  return ( 
    <>
    <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/start-quiz" element={<Quiz/>}/>
    </Routes>
    </>
   );
}
 
export default App;