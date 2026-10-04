import { useState } from 'react';
import { Container, Row, Col, Card, Form, Button, Alert } from 'react-bootstrap';
import { useNavigate, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login, admin } = useAuth();

  // If already logged in, redirect away from login page
  if (admin) {
    return <Navigate to="/dashboard" replace />;
  }

  const handleLogin = (e) => {
    e.preventDefault();
    setError('');
    
    // Using mock auth as requested
    const success = login(username, password);
    if (success) {
      navigate('/dashboard');
    } else {
      setError('Invalid username or password.');
    }
  };

  return (
    <Container className="d-flex align-items-center justify-content-center vh-100 bg-light" fluid>
      <Row className="w-100">
        <Col md={{ span: 4, offset: 4 }}>
          <Card className="shadow-lg border-0 rounded-lg">
            <Card.Body className="p-5">
              <div className="text-center mb-4">
                <h3 className="fw-bold text-primary mb-1">Grand Plaza Hotel</h3>
                <p className="text-muted">Administrator Portal</p>
              </div>
              {error && <Alert variant="danger">{error}</Alert>}
              <Form onSubmit={handleLogin}>
                <Form.Group className="mb-3">
                  <Form.Label className="fw-semibold">Username</Form.Label>
                  <Form.Control type="text" required value={username} onChange={e => setUsername(e.target.value)} placeholder="Enter admin username" />
                </Form.Group>
                <Form.Group className="mb-4">
                  <Form.Label className="fw-semibold">Password</Form.Label>
                  <Form.Control type="password" required value={password} onChange={e => setPassword(e.target.value)} placeholder="Enter password" />
                </Form.Group>
                <Button variant="primary" type="submit" className="w-100 py-2 fw-bold">Sign In</Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
