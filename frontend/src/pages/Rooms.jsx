import { useState, useEffect } from 'react';
import { Table, Alert, Form, Badge, Card, Row, Col } from 'react-bootstrap';
import api from '../services/api';

export default function Rooms() {
  const [rooms, setRooms] = useState([]);
  const [error, setError] = useState('');

  const fetchRooms = () => {
    api.get('/rooms').then(res => setRooms(res.data)).catch(() => setError('Failed to fetch rooms'));
  };

  useEffect(() => { fetchRooms(); }, []);

  const updateStatus = (roomNumber, status) => {
    api.put(`/rooms/${roomNumber}/status`, { status })
       .then(fetchRooms)
       .catch(() => setError('Failed to update room status'));
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Available': return 'success';
      case 'Occupied': return 'danger';
      case 'Maintenance': return 'warning';
      default: return 'secondary';
    }
  };

  return (
    <div>
      <h2 className="mb-4 fw-bold">Room Management</h2>
      {error && <Alert variant="danger" dismissible onClose={() => setError('')}>{error}</Alert>}
      
      <Row>
        {rooms.map(r => (
          <Col md={4} key={r.roomNumber} className="mb-4">
            <Card className="shadow-sm border-0 h-100">
              <Card.Body>
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <h4 className="fw-bold mb-0">Room {r.roomNumber}</h4>
                  <Badge bg={getStatusBadge(r.roomStatus)} className="fs-6 px-3 py-2 rounded-pill">
                    {r.roomStatus}
                  </Badge>
                </div>
                <p className="text-muted mb-3">Type: <strong>{r.roomType}</strong></p>
                
                <Form.Group>
                  <Form.Label className="small text-uppercase fw-semibold text-muted">Update Status</Form.Label>
                  <Form.Select 
                    size="sm" 
                    value={r.roomStatus} 
                    onChange={(e) => updateStatus(r.roomNumber, e.target.value)}
                  >
                    <option value="Available">Available</option>
                    <option value="Occupied">Occupied</option>
                    <option value="Maintenance">Maintenance</option>
                  </Form.Select>
                </Form.Group>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
      {rooms.length === 0 && <p className="text-muted">No rooms configured in the system.</p>}
    </div>
  );
}
