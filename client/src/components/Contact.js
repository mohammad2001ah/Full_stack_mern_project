import React, { useState } from 'react';
import Button from './common/Button';
import Input from './common/Input';
import './contact.css';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [status, setStatus] = useState({ type: '', message: '' });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus({ type: '', message: '' });

    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      setStatus({
        type: 'success',
        message: 'Thank you for contacting us! We will get back to you soon.',
      });
      setFormData({ name: '', email: '', message: '' });
    }, 1000);

    // TODO: Replace with actual API call
    // try {
    //   const response = await api.post('/api/contact', formData);
    //   setStatus({ type: 'success', message: response.data.message });
    //   setFormData({ name: '', email: '', message: '' });
    // } catch (error) {
    //   setStatus({ type: 'error', message: error.message });
    // } finally {
    //   setLoading(false);
    // }
  };

  return (
    <div className="contact-page">
      <h1>Contact Us</h1>
      <p>Feel free to reach out for any questions or support.</p>

      {status.message && (
        <div className={`alert alert-${status.type === 'success' ? 'success' : 'danger'}`} role="alert">
          {status.message}
        </div>
      )}

      <form className="contact-form" onSubmit={handleSubmit}>
        <Input
          label="Your Name"
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Enter your name"
          required
          autoComplete="name"
        />

        <Input
          label="Your Email"
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Enter your email"
          required
          autoComplete="email"
        />

        <div className="input-wrapper">
          <label htmlFor="message" className="input-label">
            Your Message<span className="input-required" aria-label="required">*</span>
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Enter your message"
            rows="5"
            required
            className="input-field"
            aria-label="Your message"
          />
        </div>

        <Button type="submit" variant="primary" fullWidth loading={loading}>
          {loading ? 'Sending...' : 'Send Message'}
        </Button>
      </form>
    </div>
  );
}
