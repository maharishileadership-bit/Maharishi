"use client"
import { motion } from "framer-motion";

const lineageItems = [
  {
    era: "Ancient India",
    label: "The Vedic Tradition",
    text: "For thousands of years, the knowledge of Transcendental Meditation was preserved and transmitted in an unbroken oral lineage — one of the oldest bodies of knowledge on human consciousness.",
  },
  {
    era: "Modern Rediscovery",
    label: "Maharishi Mahesh Yogi",
    text: "In the 1950s, Maharishi Mahesh Yogi revived and systematised this knowledge in its original purity, making it accessible to people of any background, belief, or walk of life.",
  },
  {
    era: "Scientific Validation",
    label: "480+ Peer-Reviewed Studies",
    text: "Over five decades, this ancient practice has been validated by modern science — across cardiovascular health, brain coherence, resilience, creativity, and executive performance.",
  },
];

export function ProfoundHeritage() {
  return (
    <section
      id="heritage"
      style={{ background: "hsl(var(--background))", overflow: "hidden" }}
    >
      <div className="max-w-6xl mx-auto px-8 py-20 sm:py-32 border-t">
        <div className="grid md:grid-cols-2 gap-16 items-start">

          {/* Left: heading + quote */}
          <motion.div
            initial={{ opacity: 0, y: 36 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <span
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border text-[11px] tracking-[0.22em] uppercase font-sans mb-8"
              style={{
                borderColor: "hsl(var(--peach-deep) / 0.22)",
                background: "hsl(var(--sky) / 0.2)",
                color: "hsl(var(--peach-deep) / 0.9)",
              }}
            >
              Our Profound Heritage
            </span>

            <h2
              className="leading-[1.08] mb-8"
              style={{
                fontFamily: "'Georgia', serif",
                fontSize: "clamp(2.2rem, 4vw, 3.6rem)",
                fontWeight: 400,
                color: "hsl(var(--primary))",
                letterSpacing: "-0.01em",
              }}
            >
              Rooted in 5,000 Years
              <span
                className="block italic mt-2"
                style={{ color: "hsl(var(--peach-deep))" }}
              >
                of Vedic Wisdom.
              </span>
            </h2>

            {/* Maharishi quote */}
            <div
              className="rounded-2xl p-6 md:p-8 mt-6"
              style={{
                background: "hsl(var(--primary) / 0.04)",
                borderLeft: "3px solid hsl(var(--peach-deep) / 0.5)",
              }}
            >
              <p
                className="font-serif italic leading-[1.75] mb-4"
                style={{
                  fontSize: "clamp(1rem, 1.4vw, 1.15rem)",
                  color: "hsl(var(--primary) / 0.82)",
                }}
              >
                "Transcendental Meditation opens the awareness to the infinite reservoir of energy, creativity, and intelligence that lies deep within everyone."
              </p>
              <p
                className="text-[11px] uppercase tracking-[0.22em] font-medium"
                style={{ color: "hsl(var(--peach-deep))" }}
              >
                Maharishi Mahesh Yogi
              </p>
            </div>

            <p
              className="font-sans font-light leading-[1.9] mt-8"
              style={{
                fontSize: "clamp(0.9rem, 1.3vw, 1.02rem)",
                color: "hsl(var(--primary) / 0.65)",
              }}
            >
              Transcendental Meditation is not a new-age concept invented by an influencer. It is a precise, effortless technique preserved over millennia — drawn from the most systematically developed body of knowledge on human consciousness that the world has ever known. Today more than 10 million have benefited in over 140 countries.
            </p>
          </motion.div>

          {/* Right: lineage timeline */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 1, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="space-y-0"
          >
            {lineageItems.map((item, i) => (
              <motion.div
                key={item.era}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.1 + i * 0.15 }}
                className="relative flex gap-6"
              >
                {/* Timeline spine */}
                <div className="flex flex-col items-center">
                  <div
                    className="w-3 h-3 rounded-full shrink-0 mt-1"
                    style={{ background: "hsl(var(--peach-deep))" }}
                  />
                  {i < lineageItems.length - 1 && (
                    <div
                      className="w-px flex-1 mt-1"
                      style={{
                        background: "linear-gradient(to bottom, hsl(var(--peach-deep) / 0.4), hsl(var(--peach-deep) / 0.1))",
                        minHeight: 48,
                      }}
                    />
                  )}
                </div>

                <div className="pb-10">
                  <p
                    className="text-[10px] uppercase tracking-[0.28em] font-medium mb-1"
                    style={{ color: "hsl(var(--peach-deep) / 0.8)" }}
                  >
                    {item.era}
                  </p>
                  <p
                    className="font-serif mb-2"
                    style={{
                      fontSize: "1.15rem",
                      color: "hsl(var(--primary))",
                      fontWeight: 500,
                    }}
                  >
                    {item.label}
                  </p>
                  <p
                    className="font-sans font-light leading-[1.8]"
                    style={{
                      fontSize: "0.93rem",
                      color: "hsl(var(--primary) / 0.62)",
                    }}
                  >
                    {item.text}
                  </p>
                </div>
              </motion.div>
            ))}

            
          </motion.div>

        </div>
      </div>
    </section>
  );
}
