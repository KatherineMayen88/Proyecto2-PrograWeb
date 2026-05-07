import { Routes, Route } from 'react-router-dom';

import Landing from './pages/Landing';
import Login from './pages/Login';
import Register from './pages/Register';
import ClientDashboard from './pages/ClientDashboard';
import CreateShipment from './pages/CreateShipment';
import MyShipments from './pages/MyShipments';
import AdminDashboard from './pages/AdminDashboard';
import AdminUsers from './pages/AdminUsers';
import AdminShipments from './pages/AdminShipments';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route path="/dashboard" element={<ClientDashboard />} />
      <Route path="/shipments/new" element={<CreateShipment />} />
      <Route path="/shipments" element={<MyShipments />} />

      <Route path="/admin" element={<AdminDashboard />} />
      <Route path="/admin/users" element={<AdminUsers />} />
      <Route path="/admin/shipments" element={<AdminShipments />} />
    </Routes>
  );
}

export default App;