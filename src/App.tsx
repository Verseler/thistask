import { Routes, Route } from "react-router-dom";

import NotFound from "@/pages/NotFound";
import Login from "@/pages/unauthenticated/Login";
import Register from "@/pages/unauthenticated/Register";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Register />} />
      <Route path="login" element={<Login />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default App;
