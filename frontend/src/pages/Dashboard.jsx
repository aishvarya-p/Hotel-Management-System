import { useEffect, useState } from 'react';
import { Row, Col, Card, Table, Badge, Spinner } from 'react-bootstrap';
import { FaUsers, FaBed, FaDoorOpen, FaDoorClosed, FaBook, FaMoneyBillWave } from 'react-icons/fa';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import api from '../services/api';

export default function Dashboard() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({
    customers: [],
    rooms: [],
    bookings: [],
    payments: []
  });

  useEffect(() => {
    Promise.all([
      api.get('/customers').catch(() => ({ data: [] })),
      api.get('/rooms').catch(() => ({ data: [] })),
      api.get('/bookings').catch(() => ({ data: [] })),
      api.get('/payments').catch(() => ({ data: [] }))
    ]).then(([custRes, roomRes, bookRes, payRes]) => {
      setData({
        customers: custRes.data || [],
        rooms: roomRes.data || [],
        bookings: bookRes.data || [],
        payments: payRes.data || []
      });
      setLoading(false);
    });
  }, []);

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center h-100">
        <Spinner animation="border" variant="primary" />
      </div>
    );
  }

  const { customers, rooms, bookings, payments } = data;

  // 1. Summary Metrics Computations
  const totalCustomers = customers.length;
  const totalRooms = rooms.length;
  const availableRooms = rooms.filter(r => r.roomStatus === 'Available').length;
  const occupiedRooms = rooms.filter(r => r.roomStatus === 'Occupied').length;
  const totalBookings = bookings.length;
  
  // Total Revenue calculation
  const totalRevenueNum = payments.reduce((sum, p) => sum + parseFloat(p.paymentAmount || 0), 0);
  const todaysRevenue = "₹" + totalRevenueNum.toLocaleString(); 
  
  // 2. Charts Data Processing
  
  // Room Occupancy Pie Chart
  const maintenanceRooms = rooms.filter(r => r.roomStatus === 'Maintenance').length;
  const occupancyData = [
    { name: 'Available', value: availableRooms },
    { name: 'Occupied', value: occupiedRooms },
    { name: 'Maintenance', value: maintenanceRooms }
  ];
  const COLORS = ['#28a745', '#dc3545', '#ffc107'];

  // Booking Trend Line Chart (Group by Booking Date)
  const bookingCounts = bookings.reduce((acc, curr) => {
    const date = curr.bookingDate;
    acc[date] = (acc[date] || 0) + 1;
    return acc;
  }, {});
  
  let bookingTrendData = Object.keys(bookingCounts).map(date => ({
    date: date.slice(-5), // MM-DD
    Bookings: bookingCounts[date]
  })).sort((a, b) => a.date.localeCompare(b.date));
  
  // Fallback if no bookings exist yet
  if (bookingTrendData.length === 0) {
    bookingTrendData = [{ date: 'No Data', Bookings: 0 }];
  }

  // Revenue Bar Chart
  const revenueByDate = payments.reduce((acc, curr) => {
    const d = curr.paymentDate;
    acc[d] = (acc[d] || 0) + parseFloat(curr.paymentAmount);
    return acc;
  }, {});

  let revenueData = Object.keys(revenueByDate).map(date => ({
    day: date.slice(-5), // MM-DD
    Revenue: revenueByDate[date]
  })).sort((a,b) => a.day.localeCompare(b.day)).slice(-7); // Last 7 days

  if (revenueData.length === 0) {
    revenueData = [{ day: 'No Data', Revenue: 0 }];
  }

  // 3. Recent Activity Computations
  const recentCustomers = [...customers].reverse().slice(0, 5);
  const recentBookings = [...bookings].reverse().slice(0, 5);
  
  const recentPayments = [...payments].reverse().slice(0, 5).map(p => ({
    id: `TXN-${p.transactionId}`,
    method: p.paymentMethod,
    amount: p.paymentAmount,
    status: p.paymentStatus
  }));

  // Custom Stat Card Component for reuse
  const StatCard = ({ title, value, icon, color }) => (
    <Card 
      className="shadow-sm border-0 mb-4 h-100 stat-card" 
      style={{ transition: 'transform 0.2s', cursor: 'pointer' }} 
      onMouseOver={e => e.currentTarget.style.transform = 'translateY(-5px)'} 
      onMouseOut={e => e.currentTarget.style.transform = 'translateY(0)'}
    >
      <Card.Body className="d-flex align-items-center">
        <div className={`p-3 rounded bg-${color} text-white me-3 d-flex align-items-center justify-content-center shadow-sm`} style={{ width: '56px', height: '56px' }}>
          {icon}
        </div>
        <div>
          <h6 className="text-muted mb-1 text-uppercase fw-bold" style={{ fontSize: '0.75rem', letterSpacing: '0.5px' }}>{title}</h6>
          <h3 className="mb-0 fw-bold">{value}</h3>
        </div>
      </Card.Body>
    </Card>
  );

  return (
    <div className="p-3">
      <div className="d-flex justify-content-between align-items-center mb-4 pb-2 border-bottom">
        <h2 className="fw-bold text-dark mb-0">Analytics Dashboard</h2>
        <Badge bg="primary" className="px-3 py-2">Premium Edition</Badge>
      </div>

      {/* Summary Cards */}
      <Row>
        <Col md={6} xl={4} xxl={2}><StatCard title="Total Customers" value={totalCustomers} icon={<FaUsers size={24}/>} color="primary" /></Col>
        <Col md={6} xl={4} xxl={2}><StatCard title="Total Rooms" value={totalRooms} icon={<FaBed size={24}/>} color="info" /></Col>
        <Col md={6} xl={4} xxl={2}><StatCard title="Available Rooms" value={availableRooms} icon={<FaDoorOpen size={24}/>} color="success" /></Col>
        <Col md={6} xl={4} xxl={2}><StatCard title="Occupied Rooms" value={occupiedRooms} icon={<FaDoorClosed size={24}/>} color="danger" /></Col>
        <Col md={6} xl={4} xxl={2}><StatCard title="Total Bookings" value={totalBookings} icon={<FaBook size={24}/>} color="warning" /></Col>
        <Col md={6} xl={4} xxl={2}><StatCard title="Total Revenue" value={todaysRevenue} icon={<FaMoneyBillWave size={24}/>} color="success" /></Col>
      </Row>

      {/* Charts Section */}
      <Row className="mb-4">
        <Col lg={8} className="mb-4 mb-lg-0">
          <Card className="shadow-sm border-0 h-100">
            <Card.Body>
              <Card.Title className="fw-bold mb-4">Booking Trends</Card.Title>
              <div style={{ height: '300px' }}>
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={bookingTrendData}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#eee" />
                    <XAxis dataKey="date" axisLine={false} tickLine={false} />
                    <YAxis allowDecimals={false} axisLine={false} tickLine={false} />
                    <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }} />
                    <Line type="monotone" dataKey="Bookings" stroke="#0d6efd" strokeWidth={3} dot={{ r: 4, fill: '#0d6efd', strokeWidth: 2, stroke: '#fff' }} activeDot={{ r: 8 }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col lg={4}>
          <Card className="shadow-sm border-0 h-100">
            <Card.Body>
              <Card.Title className="fw-bold mb-4">Room Occupancy</Card.Title>
              <div style={{ height: '300px' }}>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={occupancyData} innerRadius={70} outerRadius={90} paddingAngle={5} dataKey="value" stroke="none">
                      {occupancyData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }} />
                    <Legend iconType="circle" />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row className="mb-4">
        <Col lg={12}>
          <Card className="shadow-sm border-0 h-100">
            <Card.Body>
              <Card.Title className="fw-bold mb-4 d-flex justify-content-between">
                Recent Revenue Trends
              </Card.Title>
              <div style={{ height: '300px' }}>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={revenueData}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#eee" />
                    <XAxis dataKey="day" axisLine={false} tickLine={false} />
                    <YAxis axisLine={false} tickLine={false} tickFormatter={(value) => `₹${value / 1000}k`} />
                    <Tooltip cursor={{ fill: '#f8f9fa' }} contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }} />
                    <Bar dataKey="Revenue" fill="#198754" radius={[4, 4, 0, 0]} barSize={40} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Today's Activity Section */}
      <h4 className="fw-bold text-dark mb-4 mt-5">Recent Activity</h4>
      <Row>
        <Col lg={4} className="mb-4">
          <Card className="shadow-sm border-0 h-100">
            <Card.Header className="bg-white border-bottom-0 pt-4 pb-0">
              <h6 className="fw-bold text-primary mb-0">Recent Bookings</h6>
            </Card.Header>
            <Card.Body>
              {recentBookings.length === 0 ? <p className="text-muted small">No recent bookings.</p> : (
                <Table responsive hover size="sm" className="mb-0 align-middle border-top-0">
                  <tbody>
                    {recentBookings.map(b => (
                      <tr key={b.bookingId}>
                        <td className="border-0 py-3">
                          <div className="fw-bold text-dark">Room {b.roomNumber}</div>
                          <div className="text-muted small">Check-in: {b.checkInDate}</div>
                        </td>
                        <td className="border-0 text-end py-3">
                          <Badge bg={b.bookingStatus === 'Confirmed' ? 'success' : b.bookingStatus === 'Pending' ? 'warning' : 'secondary'}>
                            {b.bookingStatus}
                          </Badge>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              )}
            </Card.Body>
          </Card>
        </Col>

        <Col lg={4} className="mb-4">
          <Card className="shadow-sm border-0 h-100">
            <Card.Header className="bg-white border-bottom-0 pt-4 pb-0">
              <h6 className="fw-bold text-info mb-0">Recent Customers</h6>
            </Card.Header>
            <Card.Body>
              {recentCustomers.length === 0 ? <p className="text-muted small">No recent customers.</p> : (
                <Table responsive hover size="sm" className="mb-0 align-middle border-top-0">
                  <tbody>
                    {recentCustomers.map(c => (
                      <tr key={c.customerId}>
                        <td className="border-0 py-3">
                          <div className="fw-bold text-dark">{c.customerName}</div>
                          <div className="text-muted small">{c.customerEmail || 'No Email'}</div>
                        </td>
                        <td className="border-0 text-end py-3 text-muted small">
                          {c.customerPhone || 'N/A'}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              )}
            </Card.Body>
          </Card>
        </Col>
        
        <Col lg={4} className="mb-4">
          <Card className="shadow-sm border-0 h-100">
            <Card.Header className="bg-white border-bottom-0 pt-4 pb-0">
              <h6 className="fw-bold text-success mb-0">Recent Payments</h6>
            </Card.Header>
            <Card.Body>
                {recentPayments.length === 0 ? <p className="text-muted small">No recent payments.</p> : (
                  <Table responsive size="sm" className="mb-0 align-middle border-top-0">
                    <tbody>
                      {recentPayments.map((p, i) => (
                        <tr key={i}>
                          <td className="border-0 py-3">
                            <div className="fw-bold">{p.id}</div>
                            <div className="small text-muted">{p.method}</div>
                          </td>
                          <td className="border-0 text-end py-3">
                            <div className="fw-bold">₹{p.amount}</div>
                            <Badge bg={p.status === 'Completed' ? 'success' : 'warning'} className="mt-1">{p.status}</Badge>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
}