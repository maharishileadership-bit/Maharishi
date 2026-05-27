"use client";

import { motion } from "framer-motion";

const heritagePillars = [
  {
    title: "Ancient, not fashionable",
    text: "TM is drawn from the Vedic tradition of India, a living body of knowledge on consciousness that predates modern wellness culture by millennia.",
  },
  {
    title: "Preserved through lineage",
    text: "Maharishi Mahesh Yogi brought the technique to the modern world while keeping the instruction personal, precise, and true to its oral tradition.",
  },
  {
    title: "Practical in every age",
    text: "The practice asks for no belief system or lifestyle change. It is an old science applied to a very modern leadership problem: a nervous system under pressure.",
  },
];

export function ProfoundHeritage() {
  return (
    <section
      id="about"
      style={{
        background: "hsl(var(--background))",
        overflow: "hidden",
      }}
    >
      <div className="container mx-auto border-t px-6 py-18 md:px-12 md:py-30">
        <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:gap-18">
          <motion.div
            initial={{ opacity: 0, y: 36 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <span className="inline-flex items-center gap-2 rounded-full border px-4 py-1.5 font-sans text-[11px] uppercase tracking-[0.22em]">
              Our Profound Heritage
            </span>

            <h2
              className="mt-8 max-w-3xl leading-[1.04]"
              style={{
                fontFamily: "'Georgia', serif",
                fontSize: "clamp(2.7rem, 5.4vw, 5.35rem)",
                fontWeight: 400,
                color: "hsl(var(--primary))",
              }}
            >
              Not a trend.
              <span
                className="block italic"
                style={{ color: "hsl(var(--peach-deep))" }}
              >
                A living Vedic tradition.
              </span>
            </h2>

            <p
              className="mt-8 max-w-2xl font-sans text-base font-light leading-[1.9] sm:text-lg"
              style={{ color: "hsl(var(--primary) / 0.72)" }}
            >
              Transcendental Meditation is not a new technique wrapped in
              ancient language. It comes from the Vedic wisdom tradition of
              India, one of the oldest and most systematic explorations of
              consciousness known to humanity.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.9, delay: 0.15, ease: "easeOut" }}
            className="lg:pt-16"
          >
            <div className="border-l border-[hsl(var(--peach-deep)/0.28)] pl-6 sm:pl-8">
              <div className="mb-8">
                <p className="font-serif text-[4.8rem] leading-none text-[hsl(var(--peach-deep))] sm:text-[6.5rem]">
                  5,000
                </p>
                <p className="mt-2 text-[11px] font-medium uppercase tracking-[0.28em] text-primary/45">
                  Years of Vedic wisdom
                </p>
              </div>

              <div className="space-y-6">
                {heritagePillars.map((pillar, index) => (
                  <motion.div
                    key={pillar.title}
                    initial={{ opacity: 0, x: 18 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7, delay: index * 0.12 }}
                    className="grid gap-4 sm:grid-cols-[2.5rem_minmax(0,1fr)]"
                  >
                    <div className="font-serif text-2xl italic text-[hsl(var(--peach-deep))]">
                      0{index + 1}
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-primary">
                        {pillar.title}
                      </h3>
                      <p className="mt-2 text-sm leading-[1.8] text-primary/62 sm:text-base">
                        {pillar.text}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
      <style jsx>{`
        span.inline-flex {
          border-color: hsl(var(--peach-deep) / 0.22);
          background: hsl(var(--sky) / 0.2);
          color: hsl(var(--peach-deep) / 0.9);
        }
      `}</style>
    </section>
  );
}
