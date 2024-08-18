import { Routes, Route } from "react-router-dom";
import Login from "./pages/unauthenticated/Login";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
    </Routes>
  );
};

export default App;
