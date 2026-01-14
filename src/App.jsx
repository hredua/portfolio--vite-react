import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import "./App.css";
import LogoMark from "./LogoMark";

import ScrollIndicator from "./ScrollIndicator";
import Projects from "./Projects";
import Sobre from "./Sobre";
import { useProjectTheme } from "./theme.jsx";
import Contato from "./Contato.jsx";

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

/** easing + scroll controlado */
function easeInOutCubic(t) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

function scrollToSection(id, duration = 900) {
  const el = document.getElementById(id);
  if (!el) return;

  const start = window.scrollY;
  const end = el.getBoundingClientRect().top + window.scrollY;
  const distance = end - start;

  let startTime = null;

  function step(ts) {
    if (startTime === null) startTime = ts;
    const t = Math.min((ts - startTime) / duration, 1);
    const eased = easeInOutCubic(t);
    window.scrollTo(0, start + distance * eased);
    if (t < 1) requestAnimationFrame(step);
  }

  requestAnimationFrame(step);
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

function safeId() {
  return typeof crypto !== "undefined" && crypto.randomUUID
    ? crypto.randomUUID()
    : String(Date.now()) + Math.random().toString(16).slice(2);
}

function TracePanel() {
  const { projectTheme } = useProjectTheme(); // ui | api | bot

  const [paused, setPaused] = useState(false);
  const [lines, setLines] = useState(() => []);
  const [seed, setSeed] = useState(0);

  const bank = TRACE_BY_THEME[projectTheme] ?? TRACE_BY_THEME.ui;

  useEffect(() => {
    setSeed(0);
    setLines([]);
  }, [projectTheme]);

  const sequence = useMemo(() => {
    const pick = bank[seed % bank.length];
    return [
      { type: "meta", text: now() + "  incoming  " + pick.route },
      ...pick.steps.map((s) => ({ type: "step", text: "→ " + s })),
    ];
  }, [seed, bank]);

  useInterval(
    () => {
      setLines((prev) => {
        const nextIndex = prev.filter(Boolean).length % sequence.length;
        const nextLine = {
          id: safeId(),
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
  const [isJumping, setIsJumping] = useState(false);
  const [sectionTheme, setSectionTheme] = useState("home"); // home | projects | about | contact

  // aplica classe no body pra trocar o "tema" (cores de acento / glow / fundo)
  useEffect(() => {
    const cls = [
      "theme-home",
      "theme-projects",
      "theme-about",
      "theme-contact",
    ];
    document.body.classList.remove(...cls);
    document.body.classList.add(`theme-${sectionTheme}`);
    return () => {
      document.body.classList.remove(`theme-${sectionTheme}`);
    };
  }, [sectionTheme]);

  function jumpTo(id) {
    setIsJumping(true);
    setTimeout(() => scrollToSection(id, 850), 120);
    setTimeout(() => setIsJumping(false), 950);
  }

  // detecta qual seção está em foco pra trocar tema
  useEffect(() => {
    const ids = ["home", "projetos", "sobre", "contato"];
    const mapIdToTheme = {
      home: "home",
      projetos: "projects",
      sobre: "about",
      contato: "contact",
    };

    const obs = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort(
            (a, b) => (b.intersectionRatio ?? 0) - (a.intersectionRatio ?? 0)
          )[0];

        if (!visible) return;
        const id = visible.target.getAttribute("id");
        if (id && mapIdToTheme[id]) setSectionTheme(mapIdToTheme[id]);
      },
      {
        root: null,
        rootMargin: "-40% 0px -55% 0px",
        threshold: [0, 0.1, 0.25, 0.5, 1],
      }
    );

    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) obs.observe(el);
    });

    return () => obs.disconnect();
  }, []);

  return (
    <>
      <ScrollIndicator />

      <AnimatePresence>
        {isJumping && (
          <motion.div
            className="transitionOverlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
          >
            <motion.div
              className="transitionWipe"
              initial={{ scaleY: 0, originY: 1 }}
              animate={{ scaleY: 1 }}
              exit={{ scaleY: 0, originY: 0 }}
              transition={{ duration: 0.35, ease: "easeInOut" }}
            />
          </motion.div>
        )}
      </AnimatePresence>

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
            <button
              className="navBtn"
              type="button"
              onClick={() => jumpTo("projetos")}
            >
              Projetos
            </button>
            <button
              className="navBtn"
              type="button"
              onClick={() => jumpTo("sobre")}
            >
              Sobre
            </button>
            <button
              className="navBtn"
              type="button"
              onClick={() => jumpTo("contato")}
            >
              Contato
            </button>
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
              <button
                className="btn primary"
                type="button"
                onClick={() => jumpTo("projetos")}
              >
                Ver projetos
              </button>

              <button
                className="btn"
                type="button"
                onClick={() => jumpTo("sobre")}
              >
                Sobre mim
              </button>
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

        {/* Sobre agora vem do seu componente */}
        <Sobre />
        <Contato />
      </div>
    </>
  );
}
