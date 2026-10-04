import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import { Container, Row, Col } from 'react-bootstrap';

export default function Layout() {
  return (
    <div className="d-flex flex-column vh-100">
      <Navbar />
      <Container fluid className="flex-grow-1 d-flex p-0 overflow-hidden">
        <Row className="flex-grow-1 w-100 m-0">
          <Col md={2} className="p-0 h-100">
            <Sidebar />
          </Col>
          <Col md={10} className="bg-light p-4 h-100 overflow-auto">
            <Outlet />
          </Col>
        </Row>
      </Container>
    </div>
  );
}
