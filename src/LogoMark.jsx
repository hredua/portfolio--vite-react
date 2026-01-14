import { motion } from "framer-motion";

export default function LogoMark({ size = 44 }) {
  const s = size;

  return (
    <div
      className="logoMark"
      style={{ width: s, height: s }}
      aria-label="Logo"
      title="Helamã Rédua"
    >
      <svg
        width={s}
        height={s}
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        {/* Moldura */}
        <motion.rect
          x="7.5"
          y="7.5"
          width="33"
          height="33"
          rx="10"
          className="logoFrame"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.9, ease: "easeInOut" }}
        />

        {/* H */}
        <motion.path
          d="M16 15.5V32.5M16 24H24M24 15.5V32.5"
          className="logoStroke"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.05, ease: "easeInOut", delay: 0.08 }}
        />

        {/* R */}
        <motion.path
          d="M28 32.5V15.5H33.1C35.2 15.5 36.5 16.7 36.5 18.7C36.5 20.7 35.2 22 33.1 22H28M32 22L36.8 32.5"
          className="logoStroke"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.15, ease: "easeInOut", delay: 0.18 }}
        />

        {/* “spark” sutil no canto (opcional, mas fica chique) */}
        <motion.path
          d="M36.5 11.8l1.6-1.6m-0.2 3.4l2.1 0m-4.1-2.2l0-2.2"
          className="logoSpark"
          initial={{ opacity: 0, pathLength: 0 }}
          animate={{ opacity: [0, 1, 0.6], pathLength: 1 }}
          transition={{ duration: 0.9, ease: "easeInOut", delay: 0.55 }}
        />
      </svg>
    </div>
  );
}
