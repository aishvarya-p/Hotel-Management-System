import { Nav } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';

export default function Sidebar() {
  const location = useLocation();
  const links = [
    { path: '/dashboard', label: 'Dashboard' },
    { path: '/customers', label: 'Customers' },
    { path: '/rooms', label: 'Rooms' },
    { path: '/bookings', label: 'Bookings' },
    { path: '/payments', label: 'Payments' }
  ];
  return (
    <div className="bg-dark text-white h-100 py-3">
      <Nav className="flex-column px-3">
        {links.map(link => (
          <Nav.Link 
            key={link.path} 
            as={Link} 
            to={link.path} 
            className={`text-white mb-2 rounded ${location.pathname.startsWith(link.path) ? 'bg-primary' : 'text-opacity-75 hover-bg-secondary'}`}
          >
            {link.label}
          </Nav.Link>
        ))}
      </Nav>
    </div>
  );
}
