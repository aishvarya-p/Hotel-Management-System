import { useState } from 'react';
import { Form, Button, Alert, Card, Row, Col } from 'react-bootstrap';
import api from '../services/api';

export default function Payments() {
  const [searchId, setSearchId] = useState('');
  const [payment, setPayment] = useState(null);
  const [error, setError] = useState('');
  const [msg, setMsg] = useState('');
  
  const [form, setForm] = useState({ bookingId: '', paymentMethod: 'Credit Card', paymentDate: '', paymentStatus: 'Completed', paymentAmount: '' });

  const handleSearch = (e) => {
    e.preventDefault();
    setError(''); setMsg(''); setPayment(null);
    api.get(`/payments/booking/${searchId}`)
       .then(res => setPayment(res.data))
       .catch(() => setError('No payment found for this Booking ID'));
  };

  const handleCreate = (e) => {
    e.preventDefault();
    setError(''); setMsg('');
    api.post('/payments', form)
       .then(() => {
          setMsg('Payment processed successfully!');
          setForm({ bookingId: '', paymentMethod: 'Credit Card', paymentDate: '', paymentStatus: 'Completed', paymentAmount: '' });
       })
       .catch(err => setError(err.response?.data || 'Failed to process payment'));
  };

  return (
    <div>
      <h2 className="mb-4 fw-bold">Payment Management</h2>
      {error && <Alert variant="danger" dismissible onClose={() => setError('')}>{error}</Alert>}
      {msg && <Alert variant="success" dismissible onClose={() => setMsg('')}>{msg}</Alert>}
      
      <Row>
        <Col md={6}>
          <Card className="shadow-sm border-0 mb-4 h-100">
            <Card.Body className="p-4">
              <Card.Title className="fw-bold mb-4">Process New Payment</Card.Title>
              <Form onSubmit={handleCreate}>
                <Form.Group className="mb-3">
                  <Form.Label>Booking ID</Form.Label>
                  <Form.Control type="number" value={form.bookingId} onChange={e => setForm({...form, bookingId: e.target.value})} required />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Amount (₹)</Form.Label>
                  <Form.Control type="number" step="0.01" value={form.paymentAmount} onChange={e => setForm({...form, paymentAmount: e.target.value})} required />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Payment Date</Form.Label>
                  <Form.Control type="date" value={form.paymentDate} onChange={e => setForm({...form, paymentDate: e.target.value})} required />
                </Form.Group>
                <Form.Group className="mb-4">
                  <Form.Label>Payment Method</Form.Label>
                  <Form.Select value={form.paymentMethod} onChange={e => setForm({...form, paymentMethod: e.target.value})}>
                    <option>Credit Card</option>
                    <option>Debit Card</option>
                    <option>Cash</option>
                    <option>UPI</option>
                  </Form.Select>
                </Form.Group>
                <Button type="submit" variant="primary" className="w-100 py-2">Process Payment</Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>

        <Col md={6}>
          <Card className="shadow-sm border-0 mb-4 h-100">
            <Card.Body className="p-4">
              <Card.Title className="fw-bold mb-4">Lookup Payment</Card.Title>
              <Form className="d-flex mb-4" onSubmit={handleSearch}>
                <Form.Control type="number" placeholder="Enter Booking ID" className="me-2" value={searchId} onChange={e => setSearchId(e.target.value)} required />
                <Button type="submit" variant="secondary">Search</Button>
              </Form>
              
              {payment && (
                <div className="p-4 bg-light rounded border">
                  <h5 className="fw-bold text-success mb-3">Payment Found</h5>
                  <p className="mb-1"><strong>Transaction ID:</strong> {payment.transactionId}</p>
                  <p className="mb-1"><strong>Booking ID:</strong> {payment.bookingId}</p>
                  <p className="mb-1"><strong>Method:</strong> {payment.paymentMethod}</p>
                  <p className="mb-1"><strong>Date:</strong> {payment.paymentDate}</p>
                  <p className="mb-1"><strong>Status:</strong> {payment.paymentStatus}</p>
                  <p className="mb-0 fs-5 mt-2"><strong>Amount:</strong> ₹{payment.paymentAmount}</p>
                </div>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
}
