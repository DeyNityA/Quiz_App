import { BrowserRouter, Routes, Route } from "react-router-dom";
import Main from "./components/Main";
import Quiz from "./components/Quiz";
import Result from "./components/Result";
import Questions from "./components/Questions";
import Registration from "./components/Registration";
import Login from "./components/Login";
import ProtectRouter from "./ProtectRouter";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<ProtectRouter />}>
          <Route path="/" element={<Main />}></Route>
          <Route path="/quiz" element={<Quiz />}></Route>

          <Route path="/questions" element={<Questions />}></Route>
          <Route path="/result" element={<Result />}></Route>

          <Route path="/registration" element={<Registration />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="*" element={<div>Wrong route</div>}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
