import skills from "@/data/skills.json";

const SITE_URL = "https://anthony.smigielski.com.au";
const TITLE = "Anthony Smigielski | Data & Business Analyst (Perth • Remote)";
const DESCRIPTION =
  "Data & Business Analyst specializing in Power BI, SQL, and end-to-end analytics platforms for mining operations. Open to roles in Perth or remote.";
const GITHUB_URL = "https://github.com/a-smiggle";
const LINKEDIN_URL = "https://www.linkedin.com/in/anthonysmigielski/";

export default function Head() {
  const skillKeywords = Array.isArray(skills)
    ? skills.map((s: any) => s.skill).filter(Boolean)
    : [];
  const keywords = [
    "Data Analyst",
    "Business Analyst",
    "Power BI",
    "DAX",
    "SQL",
    "Python",
    "Next.js",
    "React",
    "TypeScript",
    "ETL",
    "Mining Analytics",
    "Perth",
    "Remote",
    ...skillKeywords,
  ]
    .map((k) => String(k))
    .filter((v, i, a) => v && a.indexOf(v) === i)
    .join(", ");

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Anthony Smigielski",
    url: SITE_URL,
    jobTitle: ["Data Analyst", "Business Analyst"],
    address: {
      "@type": "PostalAddress",
      addressLocality: "Perth",
      addressRegion: "WA",
      addressCountry: "AU",
    },
    areaServed: ["Perth", "Remote", "Australia - Remote"],
    sameAs: [GITHUB_URL, LINKEDIN_URL],
    knowsAbout: skillKeywords,
  };

  return (
    <>
      {/* JSON-LD Person Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </>
  );
}
