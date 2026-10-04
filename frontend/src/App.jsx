import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Layout from './components/Layout';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Customers from './pages/Customers';
import Rooms from './pages/Rooms';
import Bookings from './pages/Bookings';
import Payments from './pages/Payments';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/login" element={<Login />} />
        
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<Layout />}>
            <Route index element={<Navigate to="/dashboard" replace />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="customers" element={<Customers />} />
            <Route path="rooms" element={<Rooms />} />
            <Route path="bookings" element={<Bookings />} />
            <Route path="payments" element={<Payments />} />
          </Route>
        </Route>
      </Routes>
    </AuthProvider>
  );
}

export default App;