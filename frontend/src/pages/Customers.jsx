import { useState, useEffect } from 'react';
import { Table, Button, Modal, Form, Alert, Card } from 'react-bootstrap';
import api from '../services/api';

export default function Customers() {
  const [customers, setCustomers] = useState([]);
  const [show, setShow] = useState(false);
  const [form, setForm] = useState({ customerName: '', customerEmail: '', customerPhone: '', customerDob: '' });
  const [editId, setEditId] = useState(null);
  const [error, setError] = useState('');

  const fetchCustomers = () => {
    api.get('/customers')
       .then(res => setCustomers(res.data))
       .catch(() => setError('Failed to fetch customers from server.'));
  };
  
  useEffect(() => { fetchCustomers(); }, []);

  const handleClose = () => { 
    setShow(false); 
    setEditId(null); 
    setForm({ customerName: '', customerEmail: '', customerPhone: '', customerDob: '' }); 
  };

  const handleShow = (c = null) => {
    if (c) { 
      setEditId(c.customerId); 
      setForm(c); 
    }
    setShow(true);
  };

  const handleSave = () => {
    const req = editId ? api.put(`/customers/${editId}`, form) : api.post('/customers', form);
    req.then(() => { 
      fetchCustomers(); 
      handleClose(); 
    }).catch(() => setError('Failed to save customer.'));
  };

  const handleDelete = (id) => {
    if(window.confirm('Are you sure you want to delete this customer?')) {
      api.delete(`/customers/${id}`).then(fetchCustomers).catch(() => setError('Failed to delete. They might have active bookings.'));
    }
  };

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="fw-bold mb-0">Customer Management</h2>
        <Button variant="primary" onClick={() => handleShow()}>+ Add Customer</Button>
      </div>

      {error && <Alert variant="danger" dismissible onClose={() => setError('')}>{error}</Alert>}
      
      <Card className="shadow-sm border-0">
        <Card.Body className="p-0">
          <Table striped hover responsive className="mb-0">
            <thead className="table-light">
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>DOB</th>
                <th className="text-end">Actions</th>
              </tr>
            </thead>
            <tbody>
              {customers.length === 0 ? (
                <tr><td colSpan="6" className="text-center py-4 text-muted">No customers found.</td></tr>
              ) : (
                customers.map(c => (
                  <tr key={c.customerId}>
                    <td className="align-middle">{c.customerId}</td>
                    <td className="align-middle fw-semibold">{c.customerName}</td>
                    <td className="align-middle">{c.customerEmail}</td>
                    <td className="align-middle">{c.customerPhone}</td>
                    <td className="align-middle">{c.customerDob}</td>
                    <td className="text-end">
                      <Button variant="outline-primary" size="sm" className="me-2" onClick={() => handleShow(c)}>Edit</Button>
                      <Button variant="outline-danger" size="sm" onClick={() => handleDelete(c.customerId)}>Delete</Button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </Table>
        </Card.Body>
      </Card>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{editId ? 'Edit Customer' : 'Add New Customer'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Full Name</Form.Label>
              <Form.Control value={form.customerName || ''} onChange={e => setForm({...form, customerName: e.target.value})} required />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Email Address</Form.Label>
              <Form.Control type="email" value={form.customerEmail || ''} onChange={e => setForm({...form, customerEmail: e.target.value})} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Phone Number</Form.Label>
              <Form.Control value={form.customerPhone || ''} onChange={e => setForm({...form, customerPhone: e.target.value})} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Date of Birth</Form.Label>
              <Form.Control type="date" value={form.customerDob || ''} onChange={e => setForm({...form, customerDob: e.target.value})} />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>Cancel</Button>
          <Button variant="primary" onClick={handleSave}>Save Customer</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
