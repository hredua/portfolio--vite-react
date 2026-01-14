import { useEffect, useMemo, useRef } from "react";
import { motion } from "framer-motion";
import { useProjectTheme } from "./theme.jsx";

const PROJECTS = [
  {
    id: "rotaz",
    title: "RotaZ",
    kind: "api",
    tagline:
      "Automação de operação logística com foco em previsibilidade e redução de retrabalho.",
    bullets: [
      "Problema: fluxo manual e propenso a erro na organização de entregas.",
      "Solução: regras de agrupamento + integrações + automação orientada a eventos.",
      "Impacto: menos tempo operacional e mais consistência no processo.",
    ],
    stack: ["React", "Node", "PostgreSQL", "Webhooks", "APIs"],
  },
  {
    id: "telegram-bot",
    title: "Telegram Bots & Webhooks",
    kind: "bot",
    tagline:
      "Bots resilientes para automação: eventos → validação → ação → resposta.",
    bullets: [
      "Problema: mensagens e integrações chegam inconsistentes e fora de ordem.",
      "Solução: pipeline com validação, logging e idempotência onde necessário.",
      "Impacto: respostas confiáveis e menos incidentes em produção.",
    ],
    stack: ["Node", "Telegram", "Webhooks", "Queues/Jobs", "Observability"],
  },
  {
    id: "react-ui",
    title: "React UI Systems",
    kind: "ui",
    tagline:
      "Interfaces rápidas e claras: estado, async e feedback do usuário bem resolvidos.",
    bullets: [
      "Problema: fricção na UX em fluxos com dados assíncronos.",
      "Solução: padrões de estado + loading/skeleton + componentes reutilizáveis.",
      "Impacto: sensação de performance e menor taxa de erro do usuário.",
    ],
    stack: ["React", "TypeScript", "Vite", "Framer Motion", "A11y"],
  },
];

export default function Projects() {
  const { setProjectTheme } = useProjectTheme();
  const cardRefs = useRef(new Map());

  const ids = useMemo(() => PROJECTS.map((p) => p.id), []);

  useEffect(() => {
    const opts = {
      root: null,
      // “ativo” quando o card está no miolo da viewport
      rootMargin: "-35% 0px -45% 0px",
      threshold: [0, 0.15, 0.3, 0.6, 1],
    };

    const obs = new IntersectionObserver((entries) => {
      // pega o entry mais visível
      const visible = entries
        .filter((e) => e.isIntersecting)
        .sort(
          (a, b) => (b.intersectionRatio ?? 0) - (a.intersectionRatio ?? 0)
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
          Cases selecionados com foco em impacto: UX, automação e integrações em
          produção.
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
              <a className="btn primary" href="#contato">
                Discutir este case
              </a>
              <a className="btn" href="#sobre">
                Como eu trabalho
              </a>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
