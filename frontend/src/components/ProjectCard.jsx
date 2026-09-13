import { useAuth } from '../context/AuthContext';

export default function ProjectCard({ project, showControls = false, onEdit, onDelete }) {
  const { title, image, liveLink, githubLink, description, techStack } = project;

  return (
    <div className="project-card">
      <img src={image} alt={title} />
      <h3>{title}</h3>
      {description && <p>{description}</p>}
      {techStack && techStack.length > 0 && (
        <ul>
          {techStack.map((tech) => (
            <li key={tech}>{tech}</li>
          ))}
        </ul>
      )}
      <div className="project-links">
        <a href={liveLink} target="_blank" rel="noopener noreferrer">
          Live Demo
        </a>
        {githubLink && (
          <a href={githubLink} target="_blank" rel="noopener noreferrer">
            Source Code
          </a>
        )}
      </div>
      {showControls && (
        <div className="admin-controls">
          <button onClick={() => onEdit && onEdit(project)}>Edit</button>
          <button onClick={() => onDelete && onDelete(project._id)}>Delete</button>
        </div>
      )}
    </div>
  );
}
