import { useEffect, useState } from "react";

export default function ScrollIndicator() {
  const [p, setP] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement;
      const max = h.scrollHeight - h.clientHeight;
      const val = max > 0 ? (h.scrollTop / max) * 100 : 0;
      setP(val);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="scrollIndicator" aria-hidden="true">
      <div className="scrollIndicatorBar" style={{ width: `${p}%` }} />
    </div>
  );
}
