import { useState, useEffect } from 'react';
import { Table, Button, Modal, Form, Alert, Badge, Card } from 'react-bootstrap';
import api from '../services/api';

export default function Bookings() {
  const [bookings, setBookings] = useState([]);
  const [show, setShow] = useState(false);
  const [form, setForm] = useState({ customerId: '', bookingDate: '', checkInDate: '', checkOutDate: '', roomNumber: '', bookingStatus: 'Pending' });
  const [error, setError] = useState('');

  const fetchBookings = () => api.get('/bookings').then(res => setBookings(res.data)).catch(() => setError('Failed to fetch bookings'));
  
  useEffect(() => { fetchBookings(); }, []);

  const handleSave = () => {
    api.post('/bookings', form).then(() => { 
      fetchBookings(); 
      setShow(false); 
      setForm({ customerId: '', bookingDate: '', checkInDate: '', checkOutDate: '', roomNumber: '', bookingStatus: 'Pending' });
    }).catch(e => setError(e.response?.data || 'Failed to create booking'));
  };

  const updateStatus = (id, status) => {
    api.put(`/bookings/${id}/status`, { status }).then(fetchBookings).catch(() => setError('Failed to update status'));
  };

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="fw-bold mb-0">Booking Management</h2>
        <Button variant="primary" onClick={() => setShow(true)}>+ New Booking</Button>
      </div>

      {error && <Alert variant="danger" dismissible onClose={() => setError('')}>{error}</Alert>}
      
      <Card className="shadow-sm border-0">
        <Card.Body className="p-0">
          <Table striped hover responsive className="mb-0">
            <thead className="table-light">
              <tr>
                <th>ID</th>
                <th>Customer ID</th>
                <th>Room</th>
                <th>Check In</th>
                <th>Check Out</th>
                <th>Status</th>
                <th>Update Status</th>
              </tr>
            </thead>
            <tbody>
              {bookings.length === 0 ? (
                <tr><td colSpan="7" className="text-center py-4 text-muted">No bookings found.</td></tr>
              ) : (
                bookings.map(b => (
                  <tr key={b.bookingId}>
                    <td className="align-middle">{b.bookingId}</td>
                    <td className="align-middle">{b.customerId}</td>
                    <td className="align-middle fw-semibold">{b.roomNumber}</td>
                    <td className="align-middle">{b.checkInDate}</td>
                    <td className="align-middle">{b.checkOutDate}</td>
                    <td className="align-middle">
                      <Badge bg={b.bookingStatus === 'Confirmed' ? 'success' : b.bookingStatus === 'Pending' ? 'warning' : 'secondary'}>
                        {b.bookingStatus}
                      </Badge>
                    </td>
                    <td className="align-middle">
                      <Form.Select size="sm" value={b.bookingStatus} onChange={(e) => updateStatus(b.bookingId, e.target.value)}>
                        <option value="Pending">Pending</option>
                        <option value="Confirmed">Confirmed</option>
                        <option value="Completed">Completed</option>
                        <option value="Cancelled">Cancelled</option>
                      </Form.Select>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </Table>
        </Card.Body>
      </Card>

      <Modal show={show} onHide={() => setShow(false)}>
        <Modal.Header closeButton><Modal.Title>Create New Booking</Modal.Title></Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3"><Form.Label>Customer ID</Form.Label><Form.Control type="number" onChange={e => setForm({...form, customerId: e.target.value})} /></Form.Group>
            <Form.Group className="mb-3"><Form.Label>Room Number</Form.Label><Form.Control type="text" onChange={e => setForm({...form, roomNumber: e.target.value})} /></Form.Group>
            <Form.Group className="mb-3"><Form.Label>Booking Date</Form.Label><Form.Control type="date" onChange={e => setForm({...form, bookingDate: e.target.value})} /></Form.Group>
            <Form.Group className="mb-3"><Form.Label>Check In Date</Form.Label><Form.Control type="date" onChange={e => setForm({...form, checkInDate: e.target.value})} /></Form.Group>
            <Form.Group className="mb-3"><Form.Label>Check Out Date</Form.Label><Form.Control type="date" onChange={e => setForm({...form, checkOutDate: e.target.value})} /></Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShow(false)}>Cancel</Button>
          <Button variant="primary" onClick={handleSave}>Confirm Booking</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
