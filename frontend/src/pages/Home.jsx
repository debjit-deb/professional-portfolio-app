import { useEffect, useState } from 'react';
import axiosClient from '../api/axiosClient';
import HeroScene from '../components/HeroScene';
import TeamCard from '../components/TeamCard';

export default function Home() {
  const [team, setTeam] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTeam = async () => {
      try {
        const res = await axiosClient.get('/team');
        setTeam(res.data.data);
      } catch (error) {
        console.error('Failed to fetch team:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTeam();
  }, []);

  return (
    <>
      <HeroScene />
      <section className="team-section">
        <h2>Meet the Team</h2>
        {loading ? (
          <p className="text-center">Loading...</p>
        ) : (
          <div className="team-grid">
            {team.map((member) => (
              <TeamCard key={member.slug} member={member} />
            ))}
          </div>
        )}
      </section>
    </>
  );
}
