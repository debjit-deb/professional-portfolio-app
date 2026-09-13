import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axiosClient from '../api/axiosClient';
import ProjectCard from '../components/ProjectCard';
import { useAuth } from '../context/AuthContext';

export default function MemberPortfolio() {
  const { slug } = useParams();
  const { user } = useAuth();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const fetchMember = async () => {
      try {
        const res = await axiosClient.get(`/team/${slug}`);
        setData(res.data.data);
      } catch (error) {
        console.error('Failed to fetch member:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMember();
  }, [slug]);

  if (loading) return <div className="text-center py-12">Loading...</div>;
  if (!data) return <div className="text-center py-12">Member not found</div>;

  const canManage = user && (user.slug === slug || user.role === 'superadmin');

  return (
    <>
      <div className="member-header">
        <img src={data.member.avatar} alt={data.member.name} />
        <h1>{data.member.name}</h1>
        <p className="text-lg">{data.member.title}</p>
        {data.member.bio && <p className="mt-4 text-lg max-w-2xl mx-auto">{data.member.bio}</p>}
      </div>
      <div className="project-grid">
        {data.projects && data.projects.length > 0 ? (
          data.projects.map((project) => (
            <ProjectCard key={project._id} project={project} showControls={canManage} />
          ))
        ) : (
          <p className="col-span-full text-center text-gray-500">No projects yet</p>
        )}
      </div>
    </>
  );
}
