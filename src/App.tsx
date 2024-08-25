import { Routes, Route } from "react-router-dom";

import { Toaster } from "./components/ui/toaster";
import NotFound from "@/pages/NotFound";
import Login from "@/pages/unauthenticated/Login";
import Register from "@/pages/unauthenticated/Register";
import AuthRoute from "./components/auth/AuthRoute";
import Home from "./pages/authenticated/home";
import useTheme from "./hooks/useTheme";

const App = () => {
  const {} = useTheme(); //initialize theme

  return (
    <div className="bg-white dark:bg-gray-900">
      <Routes>
        <Route element={<AuthRoute />}>
          <Route path="/" element={<Home />} />
          <Route path="*" element={<NotFound />} />
        </Route>
        <Route path="register" element={<Register />} />
        <Route path="login" element={<Login />} />
        <Route path="*" element={<NotFound />} />
      </Routes>

      <Toaster />
    </div>
  );
};

export default App;
