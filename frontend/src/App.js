import { Routes, Route, useLocation } from 'react-router-dom';

import Landing from './pages/Landing';
import Login from './pages/Login';
import Register from './pages/Register';
import ClientDashboard from './pages/ClientDashboard';
import CreateShipment from './pages/CreateShipment';
import MyShipments from './pages/MyShipments';
import AdminDashboard from './pages/AdminDashboard';
import AdminUsers from './pages/AdminUsers';
import AdminShipments from './pages/AdminShipments';
import AdminContacts from './pages/AdminContacts';

import ProtectedRoute from './components/ProtectedRoute';
import AdminRoute from './components/AdminRoute';
import Footer from './components/Footer';

const ROUTES_WITH_FOOTER = ['/', '/dashboard'];

function App() {
  const { pathname } = useLocation();
  const showFooter = ROUTES_WITH_FOOTER.includes(pathname);

  return (
    <>
      <Routes>

        <Route path="/" element={<Landing />} />

        <Route path="/login" element={<Login />} />

        <Route path="/register" element={<Register />} />

        <Route path="/dashboard" element={<ProtectedRoute> <ClientDashboard /> </ProtectedRoute>} />

        <Route path="/shipments/new" element={<ProtectedRoute> <CreateShipment /> </ProtectedRoute>} />

        <Route path="/shipments" element={<ProtectedRoute> <MyShipments /> </ProtectedRoute>} />

        <Route path="/admin" element={<AdminRoute> <AdminDashboard /> </AdminRoute>} />

        <Route path="/admin/users" element={<AdminRoute> <AdminUsers /> </AdminRoute>} />

        <Route path="/admin/shipments" element={<AdminRoute> <AdminShipments /> </AdminRoute>} />

        <Route path="/admin/contacts" element={<AdminRoute> <AdminContacts /> </AdminRoute>} />

      </Routes>

      {showFooter && <Footer />}
    </>
  );
}

export default App;

