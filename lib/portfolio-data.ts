import skills from "@/data/skills.json";
import jobs from "@/data/jobs.json";
import jobDetails from "@/data/job_details.json";
import education from "@/data/education.json";
import certifications from "@/data/certifications.json";
import portfolio from "@/data/portfolio.json";

export async function getSkills() {
  return skills as any[];
}

export async function getJobs() {
  return jobs as any[];
}

export async function getJobDetails() {
  return jobDetails as any[];
}

export async function getEducation() {
  return education as any[];
}

export async function getCertifications() {
  return certifications as any[];
}

export async function getPortfolio() {
  return portfolio as any[];
}
