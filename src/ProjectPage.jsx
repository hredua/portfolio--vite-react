import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { getProjectById } from "./projectsData.js";
import { useProjectTheme } from "./theme.jsx";

export default function ProjectPage() {
  const { projectId } = useParams();
  const project = getProjectById(projectId);
  const { setProjectTheme } = useProjectTheme();

  useEffect(() => {
    if (project) {
      setProjectTheme(project.kind);
    }
  }, [project, setProjectTheme]);

  useEffect(() => {
    const cls = ["theme-home", "theme-projects", "theme-about", "theme-contact"];
    document.body.classList.remove(...cls);
    document.body.classList.add("theme-projects");

    return () => {
      document.body.classList.remove("theme-projects");
    };
  }, []);

  if (!project) {
    return (
      <div className="page projectDetailWrap">
        <section className="projectDetailCard">
          <h1 className="sectionTitle">Projeto nao encontrado</h1>
          <p className="sectionLead">
            O projeto solicitado nao existe ou foi removido.
          </p>
          <Link className="btn primary" to="/">
            Voltar para home
          </Link>
        </section>
      </div>
    );
  }

  return (
    <div className="page projectDetailWrap">
      <section className={`projectDetailCard project-${project.kind}`}>
        <div className="projectDetailTop">
          <div className={`projectPill pill-${project.kind}`}>
            {project.kind.toUpperCase()}
          </div>
          <h1 className="sectionTitle">{project.title}</h1>
          <p className="sectionLead">{project.tagline}</p>
        </div>

        <ul className="projectBullets projectDetailBullets">
          {project.bullets.map((bullet) => (
            <li key={bullet}>{bullet}</li>
          ))}
        </ul>

        <div className="projectStack">
          {project.stack.map((item) => (
            <span key={item} className="chip">
              {item}
            </span>
          ))}
        </div>

        <div className="projectActions">
          <Link className="btn primary" to="/">
            Voltar para home
          </Link>
          {project.links.repo ? (
            <a
              className="btn"
              href={project.links.repo}
              target="_blank"
              rel="noreferrer"
            >
              Ver repositorio
            </a>
          ) : null}
          {project.links.site ? (
            <a
              className="btn"
              href={project.links.site}
              target="_blank"
              rel="noreferrer"
            >
              Acessar projeto
            </a>
          ) : null}
        </div>
      </section>
    </div>
  );
}
