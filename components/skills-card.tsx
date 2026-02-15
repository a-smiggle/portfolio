"use client";
import { useMemo, useState, useEffect } from "react";
import levelColors from "@/data/skill_colors.json";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type Skill = {
  skill: string;
  category: string;
  level?: string;
  score?: number;
  years?: number;
  keywords?: string;
  details?: string;
};

function SkillPie({ skill }: { skill: Skill }) {
  const score = typeof skill.score === "number" ? Math.max(0, Math.min(100, skill.score)) : 50;
  const lc = (typeof skill.level === "string" && (levelColors as any)[skill.level]) || null;
  const fgColor = lc?.fg || "#3b82f6";
  const bgColor = lc?.remainder || "rgba(148,163,184,0.25)";

  const size = 96;
  const stroke = 10;
  const r = (size - stroke) / 2; // radius
  const c = 2 * Math.PI * r; // circumference
  const progress = (score / 100) * c;

  return (
    <div className="flex flex-col items-center gap-2">
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="block">
        <g transform={`translate(${size / 2}, ${size / 2})`}>
          <circle r={r} fill="none" stroke={bgColor} strokeWidth={stroke} />
          <circle
            r={r}
            fill="none"
            stroke={fgColor}
            strokeWidth={stroke}
            strokeLinecap="round"
            strokeDasharray={`${progress} ${c - progress}`}
            transform="rotate(-90)"
          />
        </g>
      </svg>
      <div className="-mt-24 h-24 w-24 flex items-center justify-center text-xs font-semibold select-none">
        {Math.round(score)}%
      </div>
      <div className="text-xs text-center">
        <div className="font-medium">{skill.skill}</div>
      </div>
    </div>
  );
}

export default function SkillsCard({ skills }: { skills: Skill[] }) {
  const categories = useMemo(() => {
    const base = Array.from(new Set(skills.map((s) => s.category)));
    return base.includes("Data Analytics")
      ? ["Data Analytics", ...base.filter((c) => c !== "Data Analytics")]
      : base;
  }, [skills]);
  const [active, setActive] = useState<string>(categories[0] ?? "");
  const filtered = useMemo(() => skills.filter((s) => s.category === active), [skills, active]);

  // Auto-cycle tabs every 20 seconds
  useEffect(() => {
    if (categories.length <= 1) return;
    const id = setInterval(() => {
      setActive((prev) => {
        const idx = categories.indexOf(prev);
        const nextIdx = idx >= 0 ? (idx + 1) % categories.length : 0;
        return categories[nextIdx];
      });
    }, 20_000);
    return () => clearInterval(id);
  }, [categories]);

  return (
    <Card id="skills" className="anchor-offset">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Skills</CardTitle>
        <div className="flex flex-wrap items-center gap-2 text-xs">
          {categories.map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => setActive(c)}
              className={`px-2 py-1 rounded-md hover:bg-primary/10 ${active === c ? "bg-primary/10 border-primary text-primary" : "border-border text-foreground"}`}
            >
              {c}
            </button>
          ))}
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(6rem,max-content))] gap-4 justify-center justify-items-center">
          {filtered.map((s) => (
            <SkillPie key={`${active}-${s.skill}`} skill={s} />
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
