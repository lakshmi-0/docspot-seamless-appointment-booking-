import { Col, Form, Input, Row, TimePicker, message, Button } from 'antd';
import { Container } from 'react-bootstrap';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import moment from 'moment';

function ApplyDoctor({ userId }) {
  const [doctor, setDoctor] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    specialization: '',
    experience: '',
    fees: '',
    timings: [],
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const checkTokenValidity = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        message.error('No authentication token found. Please login again.');
        return;
      }
      try {
        await axios.get('http://localhost:5001/api/user/profile', {
          headers: { Authorization: `Bearer ${token}` }
        });
      } catch (error) {
        if (error.response?.status === 401) {
          message.error('Session expired. Please login again.');
          localStorage.removeItem('token');
        }
      }
    };
    checkTokenValidity();
  }, []);

  const handleChange = (e) => {
    setDoctor({ ...doctor, [e.target.name]: e.target.value });
  };

  const handleTimingChange = (times) => {
    if (times && times.length === 2) {
      setDoctor({ ...doctor, timings: [times[0].format('HH:mm'), times[1].format('HH:mm')] });
    } else {
      setDoctor({ ...doctor, timings: [] });
    }
  };

  const handleSubmit = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      message.error('No token found. Please login.');
      return;
    }
    const { fullName, email, phone, address, specialization, experience, fees, timings } = doctor;
    if (!fullName || !email || !phone || !address || !specialization || !experience || !fees || timings.length !== 2) {
      return message.error("Please fill all fields including timings.");
    }
    setLoading(true);
    try {
      const res = await axios.post('http://localhost:5001/api/user/registerdoc', {
        doctor: { ...doctor, userId },
        userId
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.data.success) {
        message.success("Application submitted successfully");
        setDoctor({
          fullName: '',
          email: '',
          phone: '',
          address: '',
          specialization: '',
          experience: '',
          fees: '',
          timings: [],
        });
      } else {
        message.error(res.data.message || "Failed to submit application");
      }
    } catch (err) {
      message.error("Something went wrong while submitting");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <h1 className='page-title'>Apply Doctor</h1>
      <hr />
      <Form layout='vertical' onFinish={handleSubmit}>
        <h1 className='card-title'>Personal Information</h1>
        <Row gutter={20}>
          <Col span={8} xs={24} sm={24} lg={8}>
            <Form.Item required label="Full Name" name="fullName" rules={[{ required: true }]}>
              <Input
                type="text"
                placeholder="Full Name"
                name="fullName"
                value={doctor.fullName}
                onChange={handleChange}
              />
            </Form.Item>
          </Col>
          <Col span={8} xs={24} sm={24} lg={8}>
            <Form.Item required label="Email" name="email" rules={[{ required: true, type: 'email' }]}>
              <Input
                type="email"
                placeholder="Email"
                name="email"
                value={doctor.email}
                onChange={handleChange}
              />
            </Form.Item>
          </Col>
          <Col span={8} xs={24} sm={24} lg={8}>
            <Form.Item required label="Phone" name="phone" rules={[{ required: true }]}>
              <Input
                type="text"
                placeholder="Phone"
                name="phone"
                value={doctor.phone}
                onChange={handleChange}
              />
            </Form.Item>
          </Col>
          <Col span={8} xs={24} sm={24} lg={8}>
            <Form.Item required label="Address" name="address" rules={[{ required: true }]}>
              <Input
                type="text"
                placeholder="Address"
                name="address"
                value={doctor.address}
                onChange={handleChange}
              />
            </Form.Item>
          </Col>
        </Row>
        <hr />
        <h1 className='card-title'>Professional Information</h1>
        <Row gutter={20}>
          <Col span={8} xs={24} sm={24} lg={8}>
            <Form.Item required label="Specialization" name="specialization" rules={[{ required: true }]}>
              <Input
                type="text"
                placeholder="Specialization"
                name="specialization"
                value={doctor.specialization}
                onChange={handleChange}
              />
            </Form.Item>
          </Col>
          <Col span={8} xs={24} sm={24} lg={8}>
            <Form.Item required label="Experience" name="experience" rules={[{ required: true }]}>
              <Input
                type="number"
                placeholder="Experience"
                name="experience"
                value={doctor.experience}
                onChange={handleChange}
              />
            </Form.Item>
          </Col>
          <Col span={8} xs={24} sm={24} lg={8}>
            <Form.Item required label="Fees" name="fees" rules={[{ required: true }]}>
              <Input
                type="number"
                placeholder="Fee Per Consultation"
                name="fees"
                value={doctor.fees}
                onChange={handleChange}
              />
            </Form.Item>
          </Col>
          <Col span={8} xs={24} sm={24} lg={8}>
            <Form.Item required label="Timings" name="timings" rules={[{ required: true }]}>
              <TimePicker.RangePicker
                format="HH:mm"
                value={
                  doctor.timings.length === 2
                    ? [moment(doctor.timings[0], 'HH:mm'), moment(doctor.timings[1], 'HH:mm')]
                    : []
                }
                onChange={handleTimingChange}
              />
            </Form.Item>
          </Col>
        </Row>
        <div
          style={{
            position: 'sticky',
            bottom: 0,
            background: '#fff',
            padding: '16px 0 8px 0',
            zIndex: 10,
            textAlign: 'right',
            borderTop: '1px solid #eee'
          }}
        >
          <Button
            className='primary-button'
            htmlType="submit"
            loading={loading}
          >
            SUBMIT
          </Button>
        </div>
      </Form>
    </Container>
  );
}

export default ApplyDoctor;