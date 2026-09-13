import { useEffect, useState } from 'react';
import axiosClient from '../api/axiosClient';
import ProjectCard from '../components/ProjectCard';

export default function OrganizationProjects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await axiosClient.get('/organization-projects');
        setProjects(res.data.data || []);
      } catch (error) {
        console.error('Failed to fetch organization projects:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  return (
    <section className="py-12">
      <div className="max-w-6xl mx-auto px-4">
        <h1 className="text-4xl font-bold text-center mb-12">Organization Projects</h1>
        {loading ? (
          <p className="text-center">Loading...</p>
        ) : (
          <div className="project-grid">
            {projects.length > 0 ? (
              projects.map((project) => (
                <ProjectCard key={project._id} project={project} showControls={false} />
              ))
            ) : (
              <p className="col-span-full text-center text-gray-500">No organization projects yet</p>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
