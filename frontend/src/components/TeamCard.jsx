import { useNavigate } from 'react-router-dom';

export default function TeamCard({ member }) {
  const navigate = useNavigate();

  return (
    <div className="team-card" onClick={() => navigate(`/portfolio/${member.slug}`)}>
      <img src={member.avatar} alt={member.name} />
      <h3>{member.name}</h3>
      <p>{member.title}</p>
    </div>
  );
}
