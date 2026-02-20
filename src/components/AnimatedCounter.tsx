import { useEffect, useRef, useState } from "react";

interface Props {
  end: number | string;
  duration?: number;
  suffix?: string;
}

const AnimatedCounter = ({ end, duration = 1.5, suffix = "" }: Props) => {
  const [display, setDisplay] = useState("0");
  const ref = useRef<HTMLSpanElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          const numEnd = typeof end === "string" ? parseInt(end) || 0 : end;
          const isPercent = typeof end === "string" && end.includes("%");
          const startTime = performance.now();

          const animate = (now: number) => {
            const elapsed = (now - startTime) / 1000;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            const current = Math.round(numEnd * eased);
            setDisplay(isPercent ? `${current}%` : `${current}${suffix}`);
            if (progress < 1) requestAnimationFrame(animate);
          };

          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.5 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [end, duration, suffix]);

  return <span ref={ref}>{display}</span>;
};

export default AnimatedCounter;
