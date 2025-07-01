import React, { useEffect, useState } from 'react';
import { Container, Table } from 'react-bootstrap';

const AdminAppointments = () => {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    // Load appointments from localStorage
    const storedAppointments = localStorage.getItem('appointments');
    if (storedAppointments) {
      try {
        const parsed = JSON.parse(storedAppointments);
        if (Array.isArray(parsed)) {
          setAppointments(parsed);
        }
      } catch (error) {
        console.error('Failed to parse appointments:', error);
      }
    }
  }, []);

  return (
    <Container className="p-4">
      <h3 className="text-center mb-4">All Booked Appointments</h3>

      {appointments.length === 0 ? (
        <p className="text-center">No Appointments to show</p>
      ) : (
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>#</th>
              <th>Doctor</th>
              <th>Specialization</th>
              <th>Patient</th>
              <th>Phone</th>
              <th>Date</th>
              <th>Document</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {appointments.map((appt, idx) => (
              <tr key={idx}>
                <td>{idx + 1}</td>
                <td>{appt.doctor?.fullName || 'N/A'}</td>
                <td>{appt.doctor?.specialization || 'N/A'}</td>
                <td>{appt.fullName}</td>
                <td>{appt.phone}</td>
                <td>{appt.date}</td>
                <td>{appt.document || 'Not Provided'}</td>
                <td>{appt.status || 'Pending'}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </Container>
  );
};

export default AdminAppointments;
