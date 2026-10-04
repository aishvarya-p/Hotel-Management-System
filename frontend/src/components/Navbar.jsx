import { Navbar as BsNavbar, Container, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const navigate = useNavigate();
  const { admin, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <BsNavbar bg="dark" variant="dark" className="border-bottom border-secondary shadow-sm">
      <Container fluid>
        <BsNavbar.Brand href="#" className="fw-bold">Hotel Management System</BsNavbar.Brand>
        <div className="d-flex align-items-center">
          {admin && <span className="text-light me-3 d-none d-md-block">Welcome, {admin.name}</span>}
          <Button variant="outline-light" size="sm" onClick={handleLogout}>Logout</Button>
        </div>
      </Container>
    </BsNavbar>
  );
}
