import React, { useState, useEffect } from 'react';
import { Container, Card, Button, Row, Col, Form, Modal, Table } from 'react-bootstrap';
import { message } from 'antd';
import { useNavigate } from 'react-router-dom';

const doctorsList = [
   { _id: '1', fullName: 'Dr. Priya Sharma', specialization: 'Cardiologist', fees: 500, timings: '10:00 AM - 2:00 PM' },
  { _id: '2', fullName: 'Dr. Amit Verma', specialization: 'Dermatologist', fees: 400, timings: '11:00 AM - 3:00 PM' },
  { _id: '3', fullName: 'Dr. Neha Singh', specialization: 'Pediatrician', fees: 350, timings: '9:00 AM - 1:00 PM' },
  { _id: '4', fullName: 'Dr. Rajesh Kumar', specialization: 'Orthopedic', fees: 600, timings: '2:00 PM - 6:00 PM' },
  { _id: '5', fullName: 'Dr. Anjali Mehta', specialization: 'Gynecologist', fees: 450, timings: '10:00 AM - 2:00 PM' },
  { _id: '6', fullName: 'Dr. Suresh Gupta', specialization: 'ENT Specialist', fees: 300, timings: '12:00 PM - 4:00 PM' },
  { _id: '7', fullName: 'Dr. Kavita Joshi', specialization: 'Dentist', fees: 350, timings: '9:00 AM - 12:00 PM' },
  { _id: '8', fullName: 'Dr. Manoj Patel', specialization: 'Neurologist', fees: 700, timings: '3:00 PM - 7:00 PM' },
  { _id: '9', fullName: 'Dr. Ritu Agarwal', specialization: 'Psychiatrist', fees: 550, timings: '11:00 AM - 3:00 PM' },
  { _id: '10', fullName: 'Dr. Vikram Desai', specialization: 'General Physician', fees: 250, timings: '8:00 AM - 11:00 AM' },
];

const BookAppointment = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    date: '',
    document: '',
  });
  const [appointments, setAppointments] = useState([]);
  const navigate = useNavigate();

  // Load appointments from localStorage on first render
  useEffect(() => {
    const stored = localStorage.getItem('appointments');
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          setAppointments(parsed);
        }
      } catch (err) {
        console.error('Error parsing appointments:', err);
      }
    }
  }, []);

  const handleBookNow = (doctor) => {
    setSelectedDoctor(doctor);
    setShowModal(true);
    setFormData({ fullName: '', phone: '', date: '', document: '' });
  };

  const handleClose = () => {
    setShowModal(false);
    setSelectedDoctor(null);
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'document') {
      const fileName = files[0]?.name || '';
      setFormData({ ...formData, document: fileName });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.fullName || !formData.phone || !formData.date) {
      message.error('Please fill all required fields.');
      return;
    }

    const newAppointment = {
      doctor: selectedDoctor,
      fullName: formData.fullName,
      phone: formData.phone,
      date: formData.date,
      document: formData.document || 'Not Provided',
      status: 'Pending',
    };

    const updated = [...appointments, newAppointment];
    setAppointments(updated);
    localStorage.setItem('appointments', JSON.stringify(updated));
    message.success('Appointment booked successfully!');
    handleClose();
  };

  return (
    <Container className="mt-4">
      <h2 className="mb-4 text-center">Book Appointment</h2>

      <div className="d-flex justify-content-end">
        <Button className="mb-4" onClick={() => navigate('/appointments')}>
          Go to All Appointments
        </Button>
      </div>

      <Row>
        {doctorsList.map((doctor) => (
          <Col md={4} lg={3} sm={6} xs={12} className="mb-4" key={doctor._id}>
            <Card>
              <Card.Body>
                <Card.Title>{doctor.fullName}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">{doctor.specialization}</Card.Subtitle>
                <div><strong>Fee:</strong> ₹{doctor.fees}</div>
                <div><strong>Timings:</strong> {doctor.timings}</div>
                <Button className="mt-3" variant="primary" onClick={() => handleBookNow(doctor)}>
                  Book Now
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      <Modal show={showModal} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Book Appointment with {selectedDoctor?.fullName}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Your Name</Form.Label>
              <Form.Control
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Phone Number</Form.Label>
              <Form.Control
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Date of Appointment</Form.Label>
              <Form.Control
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Upload Document (optional)</Form.Label>
              <Form.Control
                type="file"
                name="document"
                onChange={handleChange}
              />
            </Form.Group>
            <Button type="submit" variant="success" className="w-100">
              Confirm Booking
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default BookAppointment;
