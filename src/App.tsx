import { useContext, useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { setToken } from "./api/restRequest";
import './App.css';
import NotFound from "./components/not-found";
import { AppContext } from "./context/AppContext";
import { MainLayout } from "./layouts/MainLayout";
import Login from "./pages/authentication/Login";
import Dashboard from './pages/dashboard/Dashboard';
import FloristAdd from "./pages/florist/FloristAdd";
import FloristList from "./pages/florist/FloristList";
import ProvinceAdd from "./pages/province/ProvinceAdd";
import ProvinceList from "./pages/province/ProvinceList";
import Settings from "./pages/settings/Settings";
import TownAdd from "./pages/town/TownAdd";
import TownList from "./pages/town/TownList";
import UserAdd from "./pages/user/UserAdd";
import UserList from "./pages/user/UserList";
import PrivateRoute from "./shared/PrivateRoute";
import ProductList from "./pages/product/ProductList";
import ProductAdd from "./pages/product/ProductAdd";
import CollectionList from "./pages/collections/CollectionList";
import CollectionAdd from "./pages/collections/CollectionAdd";

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
            {/* Town Page */}
            <Route path="/towns">
              <Route index element={<TownList />} />
              <Route path="create" element={<TownAdd />} />
              <Route path="edit/:id" element={<TownAdd />} />
            </Route>
            {/* Province Page */}
            <Route path="/provinces">
              <Route index element={<ProvinceList />} />
              <Route path="create" element={<ProvinceAdd />} />
              <Route path="edit/:id" element={<ProvinceAdd />} />
            </Route>
            {/* Collection Page */}
            <Route path="/collections">
              <Route index element={<CollectionList />} />
              <Route path="create" element={<CollectionAdd />} />
              <Route path="edit/:id" element={<CollectionAdd />} />
            </Route>
            {/* Product Page */}
            <Route path="/products">
              <Route index element={<ProductList />} />
              <Route path="create" element={<ProductAdd />} />
              <Route path="edit/:id" element={<ProductAdd />} />
            </Route>
            {/* User Page */}
            <Route path="/users">
              <Route index element={<UserList />} />
              <Route path="create" element={<UserAdd />} />
              <Route path="edit/:id" element={<UserAdd />} />
            </Route>
            {/* Settings Page */}
            <Route path="/settings">
              <Route index element={<Settings />} />
            </Route>
          </Route>
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;