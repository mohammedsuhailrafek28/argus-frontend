"use client";
import { motion, type Variants } from "framer-motion";
import type { ReactNode } from "react";

const ease = [0.22, 0.61, 0.36, 1] as const;

export function Fade({ children, delay = 0, className }: { children: ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div className={className} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease, delay }}>
      {children}
    </motion.div>
  );
}

export function Reveal({ children, delay = 0, className }: { children: ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div className={className} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.55, ease, delay }}>
      {children}
    </motion.div>
  );
}

const stagger: Variants = { hidden: {}, visible: { transition: { staggerChildren: 0.06, delayChildren: 0.04 } } };
const reveal: Variants = { hidden: { opacity: 0, y: 14 }, visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease } } };

export function Section({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <motion.section className={className} initial="hidden" whileInView="visible"
      viewport={{ once: true, margin: "-100px" }} variants={stagger}>
      {children}
    </motion.section>
  );
}

export function SectionItem({ children, className }: { children: ReactNode; className?: string }) {
  return <motion.div className={className} variants={reveal}>{children}</motion.div>;
}

export function HoverLift({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <motion.div className={className} whileHover={{ y: -2 }} transition={{ duration: 0.25, ease }}>
      {children}
    </motion.div>
  );
}
