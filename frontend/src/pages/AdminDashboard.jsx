import { useEffect, useState } from 'react';
import axiosClient from '../api/axiosClient';
import { useAuth } from '../context/AuthContext';
import ProjectCard from '../components/ProjectCard';
import toast from 'react-hot-toast';

export default function AdminDashboard() {
  const { user } = useAuth();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await axiosClient.get(`/team/${user.slug}`);
        setProjects(res.data.data.projects || []);
      } catch (error) {
        console.error('Failed to fetch projects:', error);
        toast.error('Failed to load projects');
      } finally {
        setLoading(false);
      }
    };

    if (user) fetchProjects();
  }, [user]);

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this project?')) return;

    try {
      await axiosClient.delete(`/projects/${id}`);
      setProjects((prev) => prev.filter((p) => p._id !== id));
      toast.success('Project deleted successfully');
    } catch (error) {
      toast.error('Failed to delete project');
    }
  };

  return (
    <section className="admin-dashboard">
      <h1 className="text-4xl font-bold mb-4">Welcome, {user?.name}!</h1>
      <p className="text-gray-600 mb-8">Manage your personal portfolio projects.</p>

      {loading ? (
        <p>Loading projects...</p>
      ) : (
        <div className="space-y-4">
          {projects.length > 0 ? (
            projects.map((project) => (
              <div key={project._id} className="admin-project-row">
                <span>{project.title}</span>
                <button onClick={() => handleDelete(project._id)}>Delete</button>
              </div>
            ))
          ) : (
            <p className="text-gray-500">No projects yet. Create your first project!</p>
          )}
        </div>
      )}
    </section>
  );
}
