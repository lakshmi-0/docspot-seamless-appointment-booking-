import React, { useEffect, useState } from 'react';
import { Container, Table, Button } from 'react-bootstrap';

const UserAppointments = () => {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const storedAppointments = localStorage.getItem('appointments');
    if (storedAppointments) {
      setAppointments(JSON.parse(storedAppointments));
    }
  }, []);

  return (
    <Container className="mt-5">
      <h2 className="text-center mb-4">All Booked Appointments</h2>

      {appointments.length === 0 ? (
        <p className="text-center">No Appointments to show</p>
      ) : (
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>#</th>
              <th>Doctor</th>
              <th>Specialization</th>
              <th>Patient Name</th>
              <th>Date</th>
              <th>Phone</th>
              <th>Document</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {appointments.map((appt, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{appt.doctor?.fullName || 'Unknown'}</td>
                <td>{appt.doctor?.specialization || '-'}</td>
                <td>{appt.fullName}</td>
                <td>{appt.date}</td>
                <td>{appt.phone}</td>
                <td>{appt.document || 'Not Provided'}</td>
                <td>{appt.status || 'Pending'}</td>
                <td>
                  <Button variant="info" size="sm" disabled>View</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </Container>
  );
};

export default UserAppointments;
