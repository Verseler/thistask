import { Routes, Route } from "react-router-dom";

import { Toaster } from "@/components/ui/toaster";
import NotFound from "@/pages/NotFound";
import Login from "@/pages/unauthenticated/Login";
import Register from "@/pages/unauthenticated/Register";
import AuthRoute from "@/components/auth/AuthRoute";
import Home from "@/pages/authenticated/home/Home";
import useTheme from "./hooks/useTheme";

const App = () => {
  const {} = useTheme(); //initialize theme

  return (
    <div className="bg-white dark:bg-gray-900">
      <Routes>
        <Route path="/" element={<AuthRoute />}>
          <Route index element={<Home />} />
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
