"use client"

import Image from "next/image";

const companies = [
  { name: "Google", logo: "google.webp" },
  { name: "IBM", logo: "ibm.webp" },
  { name: "Bridgewater Associates", logo: "Bridgewater_Associates.webp" },
  { name: "Hewlett-Packard", logo: "hpe.webp" },
  { name: "Ericsson", logo: "Ericsson.webp" },
  { name: "General Motors", logo: "General_Motors.webp" },
  { name: "Toyota", logo: "Toyota-logo.webp" },
  { name: "Citi", logo: "Citi.webp" },
  { name: "Citadel", logo: "citadel.webp" },
  { name: "Square", logo: "square.webp" },
  { name: "Dropbox", logo: "Dropbox.webp" },
  { name: "Instagram", logo: "instagram.webp" },
  { name: "Superhuman", logo: "Superhuman.webp" },
  { name: "Salesforce", logo: "SFDO.webp" },
  { name: "Piramal Capital", logo: "Piramal.webp" },
  { name: "Wipro Infotech", logo: "wipro.webp" },
  { name: "Tata Tea", logo: "tatatea.webp" },
  { name: "Taj Hotels", logo: "taj.webp" },
  { name: "JetSynthesys", logo: "JetSynthesys.webp" },
  { name: "Eveready", logo: "EVEREADY.webp" },
]
export function CompaniesMarquee() {
  const marqueeCompanies = [...companies, ...companies];

  return (
    <section
      aria-label="Companies and institutions where TM is practiced"
      className="text-primary-foreground overflow-hidden  bg-white"
    >
      <div className="py-5 relative">
        <div
          className="flex gap-6 whitespace-nowrap animate-[marquee_36s_linear_infinite] sm:gap-8 md:gap-10"
          style={{ width: "max-content" }}
        >
          {marqueeCompanies.map((c, i) => (
            <div key={`${c.name}-${i}`} className="flex shrink-0 items-center gap-3">
              <div className="flex h-14 w-28 items-center justify-center rounded-2xl bg-white px-4 shadow-[0_14px_34px_-24px_rgba(4,18,44,0.6)] sm:h-16 sm:w-32 md:h-[4.5rem] md:w-36">
                <Image
                  src={`/logos/optimized/${c.logo}`}
                  alt={c.name}
                  width={144}
                  height={72}
                  quality={72}
                  sizes="(min-width: 768px) 144px, (min-width: 640px) 128px, 112px"
                  className="h-auto max-h-12 w-auto max-w-full object-contain sm:max-h-15 md:max-h-18"
                />
              </div>
              {/* <span className="text-[10px] font-medium uppercase tracking-[0.22em] text-primary-foreground/60 sm:text-[11px]">
                {c.name}
              </span> */}
            </div>
          ))}
        </div>
        <style>{`
          @keyframes marquee {
            from { transform: translateX(0); }
            to { transform: translateX(-50%); }
          }
        `}</style>
      </div>
    </section>
  );
}
