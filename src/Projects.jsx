import { useEffect, useMemo, useRef } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useProjectTheme } from "./theme.jsx";
import { PROJECTS } from "./projectsData.js";

export default function Projects() {
  const { setProjectTheme } = useProjectTheme();
  const cardRefs = useRef(new Map());

  const ids = useMemo(() => PROJECTS.map((p) => p.id), []);

  useEffect(() => {
    const opts = {
      root: null,
      // "ativo" quando o card esta no miolo da viewport
      rootMargin: "-35% 0px -45% 0px",
      threshold: [0, 0.15, 0.3, 0.6, 1],
    };

    const obs = new IntersectionObserver((entries) => {
      // pega o entry mais visivel
      const visible = entries
        .filter((e) => e.isIntersecting)
        .sort(
          (a, b) => (b.intersectionRatio ?? 0) - (a.intersectionRatio ?? 0),
        )[0];

      if (!visible) return;

      const id = visible.target.getAttribute("data-project-id");
      const proj = PROJECTS.find((p) => p.id === id);
      if (proj) setProjectTheme(proj.kind);
    }, opts);

    ids.forEach((id) => {
      const el = cardRefs.current.get(id);
      if (el) obs.observe(el);
    });

    return () => obs.disconnect();
  }, [ids, setProjectTheme]);

  return (
    <section id="projetos" className="section">
      <div className="sectionHeader">
        <h2 className="sectionTitle">Projetos</h2>
        <p className="sectionLead">
          Cases selecionados com foco em impacto: UX, automacao e integracoes em
          producao.
        </p>
      </div>

      <div className="projectsGrid">
        {PROJECTS.map((p, idx) => (
          <motion.article
            key={p.id}
            data-project-id={p.id}
            ref={(node) => {
              if (node) cardRefs.current.set(p.id, node);
            }}
            className={`projectCard project-${p.kind}`}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-20% 0px -10% 0px" }}
            transition={{ duration: 0.35, delay: idx * 0.04 }}
          >
            <div className="projectTop">
              <div className={`projectPill pill-${p.kind}`}>
                {p.kind.toUpperCase()}
              </div>
              <div className="projectTitle">{p.title}</div>
              <div className="projectTagline">{p.tagline}</div>
            </div>

            <ul className="projectBullets">
              {p.bullets.map((b) => (
                <li key={b}>{b}</li>
              ))}
            </ul>

            <div className="projectStack">
              {p.stack.map((s) => (
                <span key={s} className="chip">
                  {s}
                </span>
              ))}
            </div>

            <div className="projectActions">
              <Link className="btn primary" to={`/projetos/${p.id}`}>
                Ver detalhes
              </Link>
              <a className="btn" href="#contato">
                Discutir este case
              </a>
              <a
                className="btn"
                href={`${p.links.site || "#sobre"}`}
                target="_blank"
                rel="noreferrer"
              >
                Acessar projeto
              </a>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
