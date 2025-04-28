import { useContext, useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { setToken } from "./api/restRequest";
import './App.css';
import { AppContext } from "./context/AppContext";
import { MainLayout } from "./layouts/MainLayout";
import Login from "./pages/authentication/Login";
import Dashboard from './pages/dashboard/Dashboard';
import FloristAdd from "./pages/florist/FloristAdd";
import FloristList from "./pages/florist/FloristList";
import UserList from "./pages/user/UserList";
import PrivateRoute from "./shared/PrivateRoute";
import NotFound from "./components/not-found";

function App() {

  const { token } = useContext(AppContext) as any;
  useEffect(() => {
      if (token) {
          setToken(token);
      }
  }, [token]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route element={<PrivateRoute />}>
          <Route element={<MainLayout />}>
            <Route path="/" element={<Dashboard />} />
            {/* Florist Page */}
            <Route path="/florists">
              <Route index element={<FloristList />} />
              <Route path="create" element={<FloristAdd />} />
              <Route path="edit/:id" element={<FloristAdd />} />
            </Route>

            <Route
              path="/users"
              element={
                <UserList />
              }
            />
          </Route>
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;