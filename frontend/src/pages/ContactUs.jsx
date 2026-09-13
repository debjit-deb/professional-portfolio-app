import { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import axiosClient from '../api/axiosClient';

export default function ContactUs() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    message: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');

    try {
      const res = await axiosClient.post('/contact', form);
      toast.success(res.data.message, { duration: 6000 });
      setForm({ name: '', email: '', phone: '', address: '', message: '' });
    } catch (err) {
      const errorMsg = err.response?.data?.message || 'Something went wrong. Please try again.';
      setError(errorMsg);
      toast.error(errorMsg);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="contact-page">
      <Toaster position="top-center" />
      <h1>Contact Us</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Name *"
          value={form.name}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email *"
          value={form.email}
          onChange={handleChange}
          required
        />
        <input
          type="tel"
          name="phone"
          placeholder="Phone *"
          value={form.phone}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="address"
          placeholder="Address (optional)"
          value={form.address}
          onChange={handleChange}
        />
        <textarea
          name="message"
          placeholder="Message"
          value={form.message}
          onChange={handleChange}
          rows="5"
        />
        {error && <p className="text-red-500 text-center">{error}</p>}
        <button type="submit" disabled={submitting}>
          {submitting ? 'Sending...' : 'Send'}
        </button>
      </form>
    </section>
  );
}
