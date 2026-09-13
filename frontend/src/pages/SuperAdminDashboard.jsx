import { useEffect, useState } from 'react';
import axiosClient from '../api/axiosClient';
import toast from 'react-hot-toast';

export default function SuperAdminDashboard() {
  const [tab, setTab] = useState('contacts');
  const [contacts, setContacts] = useState([]);
  const [orgProjects, setOrgProjects] = useState([]);
  const [admins, setAdmins] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [contactsRes, projectsRes, adminsRes] = await Promise.all([
          axiosClient.get('/superadmin/contacts'),
          axiosClient.get('/superadmin/organization-projects'),
          axiosClient.get('/superadmin/admins'),
        ]);

        setContacts(contactsRes.data.data || []);
        setOrgProjects(projectsRes.data.data || []);
        setAdmins(adminsRes.data.data || []);
      } catch (error) {
        console.error('Failed to fetch data:', error);
        toast.error('Failed to load dashboard data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const markResolved = async (id) => {
    try {
      await axiosClient.put(`/superadmin/contacts/${id}`, { status: 'resolved' });
      setContacts((prev) =>
        prev.map((c) => (c._id === id ? { ...c, status: 'resolved' } : c))
      );
      toast.success('Contact marked as resolved');
    } catch (error) {
      toast.error('Failed to update contact');
    }
  };

  return (
    <section className="superadmin-dashboard">
      <h1 className="text-4xl font-bold mb-8">Super Admin Dashboard</h1>

      <div className="flex gap-4 mb-8 border-b">
        <button
          onClick={() => setTab('contacts')}
          className={`px-4 py-2 font-bold ${
            tab === 'contacts'
              ? 'border-b-2 border-indigo-600 text-indigo-600'
              : 'text-gray-600'
          }`}
        >
          Contact Requests
        </button>
        <button
          onClick={() => setTab('projects')}
          className={`px-4 py-2 font-bold ${
            tab === 'projects'
              ? 'border-b-2 border-indigo-600 text-indigo-600'
              : 'text-gray-600'
          }`}
        >
          Organization Projects
        </button>
        <button
          onClick={() => setTab('team')}
          className={`px-4 py-2 font-bold ${
            tab === 'team'
              ? 'border-b-2 border-indigo-600 text-indigo-600'
              : 'text-gray-600'
          }`}
        >
          Manage Team
        </button>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          {tab === 'contacts' && (
            <table className="contacts-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Address</th>
                  <th>Message</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {contacts.map((c) => (
                  <tr key={c._id}>
                    <td>{c.name}</td>
                    <td>{c.email}</td>
                    <td>{c.phone}</td>
                    <td>{c.address || '—'}</td>
                    <td>{c.message || '—'}</td>
                    <td>
                      <span
                        className={${
                          c.status === 'new' ? 'text-yellow-600 font-bold' : 'text-green-600 font-bold'
                        }}
                      >
                        {c.status}
                      </span>
                    </td>
                    <td>
                      {c.status === 'new' && (
                        <button onClick={() => markResolved(c._id)}>Mark Resolved</button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          {tab === 'projects' && (
            <div className="project-grid">
              {orgProjects.map((p) => (
                <div key={p._id} className="project-card">
                  <img src={p.image} alt={p.title} />
                  <h3>{p.title}</h3>
                  <p>{p.description}</p>
                  <div className="project-links">
                    <a href={p.liveLink} target="_blank" rel="noopener noreferrer">
                      View
                    </a>
                  </div>
                </div>
              ))}
            </div>
          )}

          {tab === 'team' && (
            <div className="space-y-4">
              {admins.map((a) => (
                <div key={a._id} className="admin-project-row">
                  <div>
                    <p className="font-bold">{a.name}</p>
                    <p className="text-sm text-gray-600">{a.email}</p>
                  </div>
                  <span className="text-gray-600">{a.role}</span>
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </section>
  );
}
