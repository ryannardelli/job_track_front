import { PrivateRoute } from "@/components/layout/PrivateRoute";

import { Login } from "@/pages/Auth/Login";
import { Register } from "@/pages/Auth/Register";
import { Home } from "@/pages/Dashboard/Home";

import { BrowserRouter, Route, Routes } from "react-router";

export function MainRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {<Route
          path="/"
          element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          }
        />}
      </Routes>
    </BrowserRouter>
  );
}