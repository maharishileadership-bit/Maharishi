"use client";

import { ContactInquiryForm } from "@/app/components/pages/ContactInquiryForm";
import { motion } from "framer-motion";

export function CTA() {
  return (
    <section
      id="contact"
      className="bg-[hsl(var(--primary)/0.92)] text-primary-foreground py-20 md:py-28 relative overflow-hidden"
    >
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.05] pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle, hsl(var(--cream)) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />
      <div
        aria-hidden
        className="absolute inset-0 opacity-30 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 40% at 50% 0%, hsl(var(--peach) / 0.25) 0%, transparent 70%), radial-gradient(ellipse 60% 40% at 50% 100%, hsl(var(--sky) / 0.18) 0%, transparent 70%)",
        }}
      />
      <div className="container relative mx-auto px-6 md:px-12">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[minmax(0,0.82fr)_minmax(0,1.18fr)] lg:items-start">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          >
            <p className="mb-5 flex items-center gap-3 text-[11px] font-medium uppercase tracking-[0.3em] text-[hsl(var(--peach))]">
              <span className="h-px w-7 bg-[hsl(var(--peach))]" />
              Let&apos;s Talk
            </p>
            <h2 className="font-serif text-4xl font-light leading-[1.06] md:text-6xl">
              Book a{" "}
              <em className="italic text-[hsl(var(--peach))]">
                Conversation.
              </em>
            </h2>

            <p className="mt-6 max-w-xl text-base font-light leading-[1.85] text-primary-foreground/64 sm:text-lg">
              Tell us a little about your context, and our team will get back
              to you to schedule a discussion.
            </p>

            <p className="mt-10 text-[11px] uppercase tracking-[0.25em] text-primary-foreground/45">
              Trusted by leaders at Google, IBM, Bridgewater, Tata
            </p>
          </motion.div>

          <motion.article
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.18 }}
            className="w-full"
          >
            <ContactInquiryForm initialType="general" />
          </motion.article>
        </div>
      </div>
    </section>
  );
}
