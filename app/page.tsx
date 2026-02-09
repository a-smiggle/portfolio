import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import { getSkills, getEducation, getCertifications, getJobs, getJobDetails, getPortfolio } from "@/lib/portfolio-data";
import SkillsCard from "@/components/skills-card";
import JobGantt from "@/components/job-gantt";
import { getEmploymentTypeColor as typeColor } from "@/lib/job-colors";
// Local types for data models
type Education = {
  institution: string;
  qualification: string;
  field: string;
  start_date: string;
  end_date: string;
  location: string;
  image?: string;
};
type Certification = {
  name: string;
  issuer: string;
  issue_date: string;
  expiry_date?: string | null;
  credential_url: string;
  image?: string;
};
type JobModel = {
  job_id: string;
  company: string;
  role: string;
  label?: string[] | string;
  employment_type: string;
  start_date: string;
  end_date: string | null;
  location: string;
  summary: string;
};
type JobDetail = {
  job_id: string;
  bullet: string;
};
type PortfolioItem = {
  title: string;
  description: string;
  github_url: string;
  tags?: string;
  image?: string;
};

export default async function Home() {
  // Fetch CSV data on the server
  const skills = await getSkills();
  const education: Education[] = (await getEducation()) as Education[];
  const certifications: Certification[] = (await getCertifications()) as Certification[];
  const jobs: JobModel[] = (await getJobs()) as JobModel[];
  const jobDetails: JobDetail[] = (await getJobDetails()) as JobDetail[];
  const portfolio: PortfolioItem[] = (await getPortfolio()) as PortfolioItem[];

  // Client component imported normally; Next.js will render a client boundary

  return (
    <main className="flex flex-col gap-8 px-2 sm:px-4 py-8 w-full max-w-5xl mx-auto">
      {/* Overview */}
      <Card id="overview" className="anchor-offset">

        <CardContent>
          <div className="space-y-3 text-md">
            <p>
              I’m a data analytics leader focused on building governed, production‑ready platforms and decision‑grade Power BI reporting for mining operations. I design enterprise data models, robust ETL, and centralized warehouses that consolidate Fleet Management Systems and operational sources—delivering trusted metrics and clear, actionable dashboards across safety, production, and maintenance.
            </p>
            <p>
              I emphasize data quality, performance, and security, and drive adoption through documentation, training, and structured change management. Complementing analytics, I bring full‑stack engineering depth—APIs and services in Python/JS/TS, modern web apps with React/Next.js, and Azure administration (Linux VMs, certificates, CI/CD)—to integrate telemetry, automate pipelines, and ship reliable analytics products at scale.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Skills (Tabs + Pie Grid) */}
      <SkillsCard skills={skills} />

      {/* Education/Certs */}
      <Card id="education-certs" className="anchor-offset">
        <CardHeader>
          <CardTitle>Education & Certifications</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold mb-2">Education</h3>
              <ul className="space-y-2">
                {education.map((e, idx) => (
                  <li key={`edu-${idx}`} className="text-sm flex items-start gap-3">
                    {e.image ? (
                      <Image
                        src={String(e.image).startsWith("/") || String(e.image).startsWith("http") ? String(e.image) : `/${e.image}`}
                        alt={e.institution ?? "Education"}
                        width={36}
                        height={36}
                        className="shrink-0 rounded"
                      />
                    ) : null}
                    <div>
                      <span className="font-medium">{e.institution}</span> — {e.qualification} ({e.field})
                      <div className="text-muted-foreground">
                        {e.location} · {new Date(e.start_date).toLocaleDateString()} → {new Date(e.end_date).toLocaleDateString()}
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Certifications</h3>
              <ul className="space-y-2">
                {certifications.map((c, idx) => (
                  <li key={`cert-${idx}`} className="text-sm flex items-start gap-3">
                    {c.image ? (
                      <Image
                        src={String(c.image).startsWith("/") || String(c.image).startsWith("http") ? String(c.image) : `/${c.image}`}
                        alt={c.name ?? "Certification"}
                        width={36}
                        height={36}
                        className="shrink-0"
                      />
                    ) : null}
                    <div>
                      <a href={c.credential_url} target="_blank" rel="noreferrer" className="font-medium underline">
                        {c.name}
                      </a>
                      <div className="text-muted-foreground">
                        {c.issuer} · Issued {new Date(c.issue_date).toLocaleDateString()}
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Job Timeline (Gantt chart) */}
      <Card id="job-timeline" className="anchor-offset">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Job Timeline</CardTitle>
          <div className="flex flex-wrap items-center gap-2 text-xs">
            {Array.from(new Set(jobs.map((j) => j.employment_type))).map((t: string) => {
              const c = typeColor(t);
              return (
                <div key={t} className="inline-flex items-center gap-1">
                  <span
                    aria-hidden="true"
                    style={{
                      display: "inline-block",
                      width: 8,
                      height: 8,
                      backgroundColor: c.bg,
                      border: `1px solid ${c.border}`,
                      borderRadius: 9999,
                    }}
                  />
                  <span>{t}</span>
                </div>
              );
            })}
          </div>
        </CardHeader>
        <CardContent>
          <div className="w-full h-72">
            <JobGantt jobs={jobs} />
          </div>
        </CardContent>
      </Card>

      {/* Job Details */}
      <Card id="job-details" className="anchor-offset">
        <CardHeader>
          <CardTitle>Job Details</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {[...jobs]
              .sort((a, b) => new Date(b.start_date).getTime() - new Date(a.start_date).getTime())
              .map((j) => (
              <div key={`job-${j.job_id}`}>                
                <h3 className="font-semibold">{j.company} — {j.role}</h3>
                <ul className="list-disc ml-6 mt-2 space-y-1">
                  {jobDetails.filter((d) => d.job_id === j.job_id).map((d, idx) => (
                    <li key={`bullet-${j.job_id}-${idx}`}>{d.bullet}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Portfolio */}
      <Card id="portfolio" className="anchor-offset">
        <CardHeader>
          <CardTitle>Portfolio</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-4">
            {portfolio.map((p, idx) => (
              <li key={`proj-${idx}`} className="border border-border rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold">{p.title}</h3>
                  <a className="underline" href={p.github_url} target="_blank" rel="noreferrer">GitHub</a>
                </div>
                <p className="text-muted-foreground mt-1">{p.description}</p>
                <div className="text-xs mt-2">Tags: {p.tags}</div>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </main>
  );
}
