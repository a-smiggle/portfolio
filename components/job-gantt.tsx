"use client";
import { useEffect, useMemo, useState, useRef } from "react";
import dynamic from "next/dynamic";
import { getEmploymentTypeColor as typeColor } from "@/lib/job-colors";
const ReactApexChart = dynamic(() => import("react-apexcharts"), { ssr: false });

type Job = {
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

export default function JobGantt({ jobs }: { jobs: Job[] }) {
  const [isDark, setIsDark] = useState<boolean>(false);
  const [inView, setInView] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    const update = () => setIsDark(document.documentElement.classList.contains("dark"));
    update();
    const observer = new MutationObserver(update);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const io = new IntersectionObserver((entries) => {
      for (const e of entries) {
        if (e.isIntersecting) {
          setInView(true);
          io.disconnect();
          break;
        }
      }
    }, { rootMargin: "100px" });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const now = useMemo(() => new Date().getTime(), []);
  const sorted = useMemo(() => [...jobs].sort((a, b) => new Date(b.start_date).getTime() - new Date(a.start_date).getTime()), [jobs]);
  const minStart = useMemo(() => Math.min(...sorted.map((j) => new Date(j.start_date).getTime())), [sorted]);
  const maxEnd = useMemo(() => Math.max(...sorted.map((j) => (j.end_date ? new Date(j.end_date).getTime() : now))), [sorted, now]);

  const series = useMemo(() => [{
    name: "Timeline",
    data: sorted.map((j) => ({
      x: j.label,
      y: [new Date(j.start_date).getTime(), j.end_date ? new Date(j.end_date).getTime() : now],
      fillColor: typeColor(j.employment_type).bg,
    })),
  }], [sorted, now]);

  const options = useMemo((): import("apexcharts").ApexOptions => ({
    chart: { type: "rangeBar", animations: { enabled: false }, toolbar: { show: false }, background: "transparent" },
    theme: { mode: isDark ? "dark" : "light" },
    plotOptions: { bar: { horizontal: true, barHeight: "60%", rangeBarGroupRows: true } },
    stroke: { show: false, width: 0, colors: ["transparent"] },
    xaxis: { type: "datetime", min: minStart, max: maxEnd },
    yaxis: { labels: { style: { colors: isDark ? "#ffffff" : "#000000" } } },
    grid: { borderColor: isDark ? "#374151" : "#e5e7eb" },
    dataLabels: { enabled: false },
    legend: { show: false },
    tooltip: {
      theme: isDark ? "dark" : "light",
      y: {
        formatter: (_: number, opts: { dataPointIndex: number }) => {
          const { dataPointIndex } = opts;
          const dp = series[0].data[dataPointIndex];
          const [start, end] = dp.y as [number, number];
          const days = Math.round((end - start) / (1000 * 60 * 60 * 24));
          const job = sorted[dataPointIndex];
          return `${days} days • ${job.employment_type}`;
        },
      },
    },
  }), [isDark, minStart, maxEnd, series, sorted]);

  return (
    <div ref={containerRef} className="w-full h-full">
      {inView ? (
        <ReactApexChart options={options} series={series as unknown as number[]} type="rangeBar" height={288} />
      ) : null}
    </div>
  );
}