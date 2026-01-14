import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import "./App.css";
import LogoMark from "./LogoMark";

import ScrollIndicator from "./ScrollIndicator";
import Projects from "./Projects";
import { useProjectTheme } from "./theme.jsx";

function useInterval(callback, delay, enabled = true) {
  const saved = useRef(callback);
  useEffect(() => {
    saved.current = callback;
  }, [callback]);

  useEffect(() => {
    if (!enabled || delay == null) return;
    const id = setInterval(() => saved.current(), delay);
    return () => clearInterval(id);
  }, [delay, enabled]);
}

/** Temas do painel conforme o case ativo */
const TRACE_BY_THEME = {
  ui: [
    {
      route: "ui/render",
      steps: [
        "mount components",
        "fetch data",
        "render skeleton",
        "hydrate UI ✅",
      ],
    },
    {
      route: "ui/interaction",
      steps: ["click event", "optimistic update", "sync request", "confirm ✅"],
    },
    {
      route: "ui/perf",
      steps: [
        "memoize hot paths",
        "reduce re-renders",
        "lazy load",
        "LCP improved ✅",
      ],
    },
  ],
  api: [
    {
      route: "/webhook",
      steps: [
        "verify signature",
        "normalize data",
        "persist log",
        "ack 200 ✅",
      ],
    },
    {
      route: "/route",
      steps: [
        "geocode CEP",
        "group by address",
        "optimize stops",
        "return plan ✅",
      ],
    },
    {
      route: "/status",
      steps: ["read cache", "fallback DB", "format response", "return JSON ✅"],
    },
  ],
  bot: [
    {
      route: "/update",
      steps: ["receive update", "parse message", "validate", "respond ✅"],
    },
    {
      route: "/command",
      steps: ["match intent", "call service", "format reply", "send ✅"],
    },
    {
      route: "/start",
      steps: [
        "receive update",
        "auth user",
        "load context",
        "reply welcome ✅",
      ],
    },
  ],
};

function TracePanel() {
  const { projectTheme } = useProjectTheme(); // ui | api | bot

  const [paused, setPaused] = useState(false);
  const [lines, setLines] = useState(() => []);
  const [seed, setSeed] = useState(0);

  const bank = TRACE_BY_THEME[projectTheme] ?? TRACE_BY_THEME.ui;

  // Reinicia o “stream” quando o tema muda (para a transição ficar nítida)
  useEffect(() => {
    setSeed(0);
    setLines([]);
  }, [projectTheme]);

  const sequence = useMemo(() => {
    const pick = bank[seed % bank.length];
    const base = [
      { type: "meta", text: now() + "  incoming  " + pick.route },
      ...pick.steps.map((s) => ({ type: "step", text: "→ " + s })),
    ];
    return base;
  }, [seed, bank]);

  useInterval(
    () => {
      setLines((prev) => {
        const nextIndex = prev.filter(Boolean).length % sequence.length;
        const nextLine = {
          id: crypto.randomUUID(),
          kind: sequence[nextIndex].type,
          text: sequence[nextIndex].text,
        };
        return [...prev, nextLine].slice(-10);
      });

      setLines((prev) => {
        const last = prev[prev.length - 1];
        if (!last) return prev;

        const endsOk = last.text.includes("✅");
        const countSteps = prev.filter((l) => l.kind === "step").length;
        const neededSteps = sequence.filter((s) => s.type === "step").length;

        if (endsOk && countSteps >= neededSteps) {
          setTimeout(() => {
            setSeed((s) => s + 1);
            setLines([]);
          }, 650);
        }
        return prev;
      });
    },
    520,
    !paused
  );

  const title =
    projectTheme === "ui"
      ? "UI Trace"
      : projectTheme === "bot"
      ? "Bot Trace"
      : "API Trace";

  return (
    <div
      className={`traceCard trace-${projectTheme}`}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      aria-label="Live System Trace"
    >
      <div className="traceHeader">
        <div className="traceTitle">{title}</div>
        <div className="traceHint">{paused ? "paused" : "live"}</div>
      </div>

      <div className="traceBody">
        <div className="scanline" aria-hidden="true" />
        <div className="cursorRow" aria-hidden="true">
          <span className="cursorDot" />
          <span className="cursorText">listening…</span>
        </div>

        <div className="traceLines">
          <AnimatePresence initial={false}>
            {lines.map((l) => (
              <motion.div
                key={l.id}
                className={`traceLine ${l.kind === "meta" ? "meta" : "step"}`}
                initial={{ opacity: 0, y: 6, filter: "blur(2px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.22 }}
              >
                {l.text}
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

function now() {
  const d = new Date();
  const hh = String(d.getHours()).padStart(2, "0");
  const mm = String(d.getMinutes()).padStart(2, "0");
  const ss = String(d.getSeconds()).padStart(2, "0");
  return `${hh}:${mm}:${ss}`;
}

export default function App() {
  return (
    <>
      <ScrollIndicator />

      <div className="page">
        <header className="topbar">
          <div className="brand">
            <LogoMark size={44} />
            <div className="brandText">
              <div className="name">Helamã Rédua</div>
              <div className="role">
                Front-end Developer • React • Automação & Integrações
              </div>
            </div>
          </div>

          <nav className="nav">
            <a href="#projetos">Projetos</a>
            <a href="#sobre">Sobre</a>
            <a href="#contato">Contato</a>
          </nav>
        </header>

        <main className="hero" id="home">
          <section className="heroLeft">
            <motion.h1
              className="headline"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35 }}
            >
              Interfaces de alto desempenho.
              <span className="accent">
                {" "}
                Automação aplicada a problemas reais.
              </span>
            </motion.h1>

            <motion.p
              className="subhead"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: 0.06 }}
            >
              Desenvolvimento front-end em React aliado a integrações de
              back-end, bots Telegram e APIs, focado em reduzir fricção
              operacional e melhorar a experiência do usuário.
            </motion.p>

            <motion.div
              className="ctaRow"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: 0.12 }}
            >
              <a className="btn primary" href="#projetos">
                Ver projetos
              </a>
              <a className="btn" href="#contato">
                Entrar em contato
              </a>
            </motion.div>

            <motion.div
              className="chips"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.35, delay: 0.18 }}
            >
              {[
                "React",
                "TypeScript",
                "Vite",
                "Node",
                "Telegram Bots",
                "APIs",
                "Webhooks",
              ].map((c) => (
                <span key={c} className="chip">
                  {c}
                </span>
              ))}
            </motion.div>
          </section>

          <section className="heroRight">
            <TracePanel />
            <div className="miniNote">
              Simulação de eventos típicos (UI/API/Bot). O tema muda conforme o
              case em foco.
            </div>
          </section>
        </main>

        <Projects />

        {/* placeholders por enquanto (você pode criar depois) */}
        <section id="sobre" className="section">
          <div className="sectionHeader">
            <h2 className="sectionTitle">Sobre</h2>
            <p className="sectionLead">
              Trabalho entre interface e automação: UX clara na ponta,
              integração robusta por trás.
            </p>
          </div>
        </section>

        <section id="contato" className="section">
          <div className="sectionHeader">
            <h2 className="sectionTitle">Contato</h2>
            <p className="sectionLead">
              Para propostas, freelas ou parcerias: e-mail, LinkedIn e GitHub.
            </p>
          </div>
        </section>
      </div>
    </>
  );
}
