import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import "./App.css";
import LogoMark from "./LogoMark";

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

const TRACE_BANK = [
  {
    route: "/start",
    steps: ["receive update", "parse message", "auth user", "reply welcome ✅"],
  },
  {
    route: "/update",
    steps: ["receive update", "validate payload", "enqueue job", "ack 200 ✅"],
  },
  {
    route: "/webhook",
    steps: ["verify signature", "normalize data", "call API", "persist log ✅"],
  },
  {
    route: "/status",
    steps: ["read cache", "fallback DB", "format response", "send message ✅"],
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
];

function TracePanel() {
  const [paused, setPaused] = useState(false);
  const [lines, setLines] = useState(() => []);
  const [seed, setSeed] = useState(0);

  const sequence = useMemo(() => {
    const pick = TRACE_BANK[seed % TRACE_BANK.length];
    const base = [
      { type: "meta", text: now() + "  incoming  " + pick.route },
      ...pick.steps.map((s) => ({ type: "step", text: "→ " + s })),
    ];
    return base;
  }, [seed]);

  // “stream” de linhas
  useInterval(
    () => {
      setLines((prev) => {
        const nextIndex = prev.filter(Boolean).length % sequence.length;
        const nextLine = {
          id: crypto.randomUUID(),
          kind: sequence[nextIndex].type,
          text: sequence[nextIndex].text,
        };
        const merged = [...prev, nextLine].slice(-10); // mantém últimas 10
        return merged;
      });

      // quando fecha um ciclo, troca o “caso”
      setTimeout(() => {
        setLines((prev) => {
          const done =
            prev.length > 0 && prev[prev.length - 1]?.text?.includes("✅");
          if (!done) return prev;
          return prev;
        });
      }, 0);

      // se a última linha termina com ✅ e o ciclo completou, avança o seed
      setLines((prev) => {
        const last = prev[prev.length - 1];
        if (!last) return prev;

        const endsOk = last.text.includes("✅");
        const countSteps = prev.filter((l) => l.kind === "step").length;
        const neededSteps = sequence.filter((s) => s.type === "step").length;

        if (endsOk && countSteps >= neededSteps) {
          // pequena “pausa” antes de trocar
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

  return (
    <div
      className="traceCard"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      aria-label="Live System Trace"
    >
      <div className="traceHeader">
        <div className="traceTitle">Live System Trace</div>
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

      <main className="hero">
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
            Desenvolvimento front-end em React aliado a integrações de back-end,
            bots Telegram e APIs, focado em reduzir fricção operacional e
            melhorar a experiência do usuário.
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
            Simulação de eventos típicos em integrações, bots e webhooks.
          </div>
        </section>
      </main>
    </div>
  );
}
