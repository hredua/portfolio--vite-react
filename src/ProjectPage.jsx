import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { getProjectById } from "./projectsData.js";
import { useProjectTheme } from "./theme.jsx";

function MockupCard({ mockup }) {
  return (
    <article className="mockupCard">
      <div className={`mockupVisual mockup-${mockup.view}`}>
        <div className="mockupChrome">
          <span />
          <span />
          <span />
        </div>
        <div className="mockupCanvas">
          <div className="mockupBlock blockWide" />
          <div className="mockupRow">
            <div className="mockupBlock" />
            <div className="mockupBlock" />
            <div className="mockupBlock" />
          </div>
          <div className="mockupBlock blockWide soft" />
          <div className="mockupRow">
            <div className="mockupBlock" />
            <div className="mockupBlock" />
          </div>
        </div>
      </div>

      <div className="mockupContent">
        <h3>{mockup.name}</h3>
        <p>{mockup.focus}</p>
        <ul>
          {mockup.notes.map((note) => (
            <li key={note}>{note}</li>
          ))}
        </ul>
      </div>
    </article>
  );
}

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
          <p className="sectionLead">{project.detail.hook}</p>
          <p className="projectDetailBody">{project.detail.overview}</p>
        </div>

        <div className="projectMetaGrid">
          <div className="projectMetaCard">
            <span>Role</span>
            <strong>{project.detail.role}</strong>
          </div>
          <div className="projectMetaCard">
            <span>Timeline</span>
            <strong>{project.detail.timeline}</strong>
          </div>
          <div className="projectMetaCard">
            <span>Status</span>
            <strong>{project.detail.status}</strong>
          </div>
        </div>

        <div className="projectStoryGrid">
          <article className="projectStoryCard">
            <h3>Contexto</h3>
            <p>{project.detail.context}</p>
          </article>
          <article className="projectStoryCard">
            <h3>Desafio</h3>
            <p>{project.detail.challenge}</p>
          </article>
          <article className="projectStoryCard">
            <h3>Estrategia</h3>
            <p>{project.detail.strategy}</p>
          </article>
        </div>

        <article className="projectStoryCard">
          <h3>Resultados e aprendizado</h3>
          <ul>
            {project.detail.outcomes.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </article>

        <article className="projectStoryCard">
          <h3>Mockups do projeto</h3>
          <p>
            Exploracoes visuais para validar navegacao, hierarquia de conteudo e
            clareza operacional antes das iteracoes finais.
          </p>
          <div className="mockupsGrid">
            {project.detail.mockups.map((mockup) => (
              <MockupCard key={mockup.name} mockup={mockup} />
            ))}
          </div>
        </article>

        <article className="projectStoryCard">
          <h3>Stack e blocos tecnicos</h3>
          <div className="projectStack">
            {project.stack.map((item) => (
              <span key={item} className="chip">
                {item}
              </span>
            ))}
          </div>
          <ul>
            {project.detail.highlights.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </article>

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
