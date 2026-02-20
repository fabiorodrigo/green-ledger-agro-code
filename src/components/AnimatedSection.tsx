import { motion, type Variants } from "framer-motion";
import { useScrollAnimation, fadeInUp } from "@/hooks/useScrollAnimation";
import type { ReactNode } from "react";

interface Props {
  children: ReactNode;
  className?: string;
  variants?: Variants;
  delay?: number;
}

const AnimatedSection = ({ children, className, variants, delay = 0 }: Props) => {
  const { ref, isInView } = useScrollAnimation();
  const v = variants ?? fadeInUp;

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={{
        hidden: v.hidden,
        visible: {
          ...(v.visible as object),
          transition: {
            ...((v.visible as any)?.transition ?? {}),
            delay,
          },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default AnimatedSection;
