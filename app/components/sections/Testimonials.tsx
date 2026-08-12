"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { LiteVideoEmbed } from "./LiteVideoEmbed";

const DR_TEJAS_VIDEO_SRC =
  "https://res.cloudinary.com/dycpdti0a/video/upload/e_volume:-50/v1778245977/WhatsApp_Video_2026-05-08_at_2.36.52_PM_qrnf3h.mp4";
const DR_TEJAS_VIDEO_POSTER =
  "https://res.cloudinary.com/dycpdti0a/video/upload/so_0,w_1280,q_auto,f_jpg/v1778245977/WhatsApp_Video_2026-05-08_at_2.36.52_PM_qrnf3h.jpg";

const quotes = [
  {
    text: "TM has given me greater creativity, centredness, and the ability to put things in perspective. It has been the single biggest influence on my life.",
    name: "Ray Dalio",
    role: "Founder & Co-CIO, Bridgewater Associates",
    logo: "/logos/optimized/Bridgewater_Associates.webp",
    logoAlt: "Bridgewater Associates logo",
    avatar: "/images/Benefits-ray-dalio.png",
  },
  {
    text: "My creativity improved. I can solve problems faster and more easily. I can focus for longer periods of time - and I am happier.",
    name: "Rahul Vohra",
    role: "Founder & CEO, Superhuman",
    logo: "/logos/optimized/Superhuman.webp",
    logoAlt: "Superhuman logo",
  },
  {
    text: "It has given a boost to our overall creativity and performance. Health, well-being, clarity of mind, happiness, and calm have all improved. Significant benefits to myself and our team.",
    name: "Rajan Navani",
    role: "Chairman & MD, JetSynthesys Pvt. Ltd.",
    logo: "/logos/optimized/JetSynthesys.webp",
    logoAlt: "JetSynthesys logo",
    avatar: "/images/testimonial-rajan-navani.jpg",
  },
  {
    text: "In 2024, I learned TM and never looked back. I even got my entire family to learn it. I can absolutely guarantee its results for enhancing leadership, unlocking creativity, and transforming both your personal and professional life. It grounds you to achieve everything you wish for.",
    name: "Sandeep Railwal",
    role: "Founder Polygon",
    logo: "/logos/optimized/polygon.png",
    logoAlt: "Polygon logo",
    avatar: "/images/testimonial-rajan-navani.jpg",
  },
  {
    text: "I work in very high stress situations. The last few months since I learned and have been practicing TM, it has helped me to handle deep stress on a day-to-day basis. I strongly recommend everyone to learn this practice and make it a part of your daily life  ",
    name: "Tejas Patel",
    role: "Chairman & Chief Interventional Cardiologist at Apex Heart Institute, Ahmedabad, Gujrat",
    logo: "/logos/optimized/Apex-Heart.png",
    logoAlt: "JetSynthesys logo",
    avatar: "/images/testimonial-rajan-navani.jpg",
  },
];

const companies = [
  { name: "Bridgewater Associates", logo: "/logos/optimized/Bridgewater_Associates.webp" },
  { name: "Superhuman", logo: "/logos/optimized/Superhuman.webp" },
  { name: "JetSynthesys", logo: "/logos/optimized/JetSynthesys.webp" },
  { name: "Google", logo: "/logos/optimized/google.webp" },
  { name: "IBM", logo: "/logos/optimized/ibm.webp" },
  { name: "Citadel", logo: "/logos/optimized/citadel.webp" },
  { name: "Toyota", logo: "/logos/optimized/Toyota-logo.webp" },
  { name: "Tata Tea", logo: "/logos/optimized/tatatea.webp" },
];

export function Testimonials() {
  return (
    <section
      id="testimonials"
      className="relative overflow-hidden bg-[hsl(var(--primary)/0.92)] py-18 md:py-30 text-primary-foreground "
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage:
            "radial-gradient(circle, hsl(var(--cream)) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-30"
        style={{
          background:
            "radial-gradient(circle at top left, hsl(var(--sky) / 0.16), transparent 24%), radial-gradient(circle at right bottom, hsl(var(--peach) / 0.16), transparent 24%)",
        }}
      />

      <div className="container mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9 }}
          className="max-w-3xl mb-16"
        >
          <p className="flex items-center gap-3 text-[hsl(var(--peach))] uppercase text-[11px] tracking-[0.3em] font-medium mb-6">
            <span className="w-7 h-px bg-[hsl(var(--peach))]" /> Voices
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-6xl leading-[1.05] font-light">
            What <em className="italic text-[hsl(var(--peach))]">Leaders</em>{" "}
            Say After the Practice has Settled In.
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-primary-foreground/[0.08]">
          {quotes.slice(0, 3).map((quote, index) => (
            <motion.div
              key={quote.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.15 }}
              className="bg-[hsl(var(--primary)/0.88)] p-5 md:p-10 transition-colors hover:bg-[hsl(var(--peach)/0.08)]"
            >
              {/* {quote.avatar ? (
                <div className="mb-6">
                  <Image
                    src={quote.avatar}
                    alt={`${quote.name} portrait`}
                    width={88}
                    height={88}
                    className="h-34 w-60 mx-auto object-cover ring-2 "
                  />
                </div>
              ) : null} */}
              <div className="">
              <span className="font-serif text-xl sm:text-2xl md:text-3xl text-[hsl(var(--peach))] leading-none mb-2">
                &ldquo;
              </span>
              <span className="font-serif text-lg sm:text-xl md:text-2xl italic font-light leading-[1.5] text-primary-foreground mb-8">
                {quote.text}
              </span>
              <span className="font-serif text-xl sm:text-2xl md:text-3xl text-[hsl(var(--peach))] leading-none mb-2">
                &rdquo;
              </span>
              </div>

              <div className="mt-4 sm:mt-6 md:mt-8">
              <div className="mb-4 flex h-14 w-32 items-center justify-center rounded-2xl bg-white px-4 shadow-[0_20px_36px_-28px_rgba(255,255,255,0.6)]">
                <Image
                  src={quote.logo}
                  alt={quote.logoAlt}
                  width={128}
                  height={64}
                  quality={72}
                  sizes="128px"
                  className="h-auto max-h-8 w-auto max-w-full object-contain"
                />
              </div>
              <p className="text-[12px] uppercase tracking-[0.15em] text-[hsl(var(--peach))] font-medium">
                {quote.name}
              </p>
              <p className="text-[12px] text-primary-foreground/45 mt-1">
                {quote.role}
              </p>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-px grid grid-cols-1 md:grid-cols-2 gap-px bg-primary-foreground/[0.08] md:w-2/3 md:mx-auto">
        {quotes.slice(3).map((quote, index) => (
            <motion.div
              key={quote.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.15 }}
              className="bg-[hsl(var(--primary)/0.88)] p-5 md:p-10 transition-colors hover:bg-[hsl(var(--peach)/0.08)]"
            >
              {/* {quote.avatar ? (
                <div className="mb-6">
                  <Image
                    src={quote.avatar}
                    alt={`${quote.name} portrait`}
                    width={88}
                    height={88}
                    className="h-34 w-60 mx-auto object-cover ring-2 "
                  />
                </div>
              ) : null} */}
              <div className="">
              <span className="font-serif text-xl sm:text-2xl md:text-3xl text-[hsl(var(--peach))] leading-none mb-2">
                &ldquo;
              </span>
              <span className="font-serif text-lg sm:text-xl md:text-2xl italic font-light leading-[1.5] text-primary-foreground mb-8">
                {quote.text}
              </span>
              <span className="font-serif text-xl sm:text-2xl md:text-3xl text-[hsl(var(--peach))] leading-none mb-2">
                &rdquo;
              </span>
              </div>

              <div className="mt-4 sm:mt-6 md:mt-8">
              <div className="mb-4 flex h-14 w-32 items-center justify-center rounded-2xl bg-white px-4 shadow-[0_20px_36px_-28px_rgba(255,255,255,0.6)]">
                <Image
                  src={quote.logo}
                  alt={quote.logoAlt}
                  width={128}
                  height={64}
                  quality={72}
                  sizes="128px"
                  className="h-auto max-h-8 w-auto max-w-full object-contain"
                />
              </div>
              <p className="text-[12px] uppercase tracking-[0.15em] text-[hsl(var(--peach))] font-medium">
                {quote.name}
              </p>
              <p className="text-[12px] text-primary-foreground/45 mt-1">
                {quote.role}
              </p>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-16 md:mt-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mb-8 max-w-2xl"
          >
            <p className="text-[11px] font-medium uppercase tracking-[0.28em] text-primary-foreground/45">
              Video Stories
            </p>
            <h3 className="mt-3 font-serif text-3xl font-light leading-tight text-primary-foreground sm:text-4xl">
              Hear the practice through the people who carry it.
            </h3>
          </motion.div>

          <div className="grid gap-5 lg:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, y: 26 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.12 }}
              className="overflow-hidden border border-primary-foreground/10 bg-primary-foreground/[0.04] shadow-[0_28px_70px_-48px_rgba(0,0,0,0.7)]"
            >
              <iframe
                src="https://www.linkedin.com/embed/feed/update/urn:li:ugcPost:7490395115556085760?compact=1"
                height={399}
                width={504}
                frameBorder={0}
                allowFullScreen
                title="Embedded LinkedIn post"
                className="h-[399px] w-full"
              />
            </motion.div>
          
            <motion.div
              initial={{ opacity: 0, y: 26 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="overflow-hidden border border-primary-foreground/10 bg-primary-foreground/[0.04] shadow-[0_28px_70px_-48px_rgba(0,0,0,0.7)]"
            >
              <LiteVideoEmbed
                src="https://res.cloudinary.com/dycpdti0a/video/upload/q_auto/f_auto/v1780028027/video3433815413_rgmtzd.mp4"
                posterSrc="/images/sandeep.png"
                title="Dr. Tejas Patel on Transcendental Meditation"
                teaser={{
                  eyebrow: "Watch Sandeep Railwal",
                  title: "Founder Polygon",
                 
                }}
              />
            </motion.div>

  
            
          </div>
          <div className="md:w-1/2 md:mx-auto mt-5">
          <motion.div
              initial={{ opacity: 0, y: 26 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="overflow-hidden border border-primary-foreground/10 bg-primary-foreground/[0.04] shadow-[0_28px_70px_-48px_rgba(0,0,0,0.7)]"
            >
              <LiteVideoEmbed
                src={DR_TEJAS_VIDEO_SRC}
                posterSrc={DR_TEJAS_VIDEO_POSTER}
                title="Dr. Tejas Patel on Transcendental Meditation"
                teaser={{
                  eyebrow: "Watch Dr. Tejas Patel",
                  title: "Chairman & Chief Interventional Cardiologist",
                  }}
              />
            </motion.div>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.4 }}
          className="mt-20 border-t border-primary-foreground/10 pt-8"
        >
          <div className="mb-5 text-[11px] text-center uppercase tracking-[0.28em] text-primary-foreground/45">
            Leaders and teams from institutions such as
          </div>
          <div className="grid gap-2 md:gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-8 ">
            {companies.map((company) => (
              <div
                key={company.name}
                className=" flex h-14 w-32 items-center justify-center rounded-2xl bg-white px-4 shadow-[0_20px_36px_-28px_rgba(255,255,255,0.6)] m-auto"
              >
                <Image
                  src={company.logo}
                  alt={`${company.name} logo`}
                  width={128}
                  height={64}
                  quality={72}
                  sizes="128px"
                  className="h-auto max-h-10 w-auto max-w-full object-contain "
                />
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
