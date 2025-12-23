import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.VITE_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

const { data: minds } = await supabase.from("minds").select("id, slug");
const { data: projects } = await supabase.from("content_projects").select("id, persona_mind_id").eq("project_type", "mind_artifacts");
const { data: prompts } = await supabase.from("contents").select("id, project_id, title").eq("content_type", "mind_prompts");

const mindMap = new Map(minds.map(m => [m.id, m.slug]));
const projectMindMap = new Map(projects.map(p => [p.id, p.persona_mind_id]));

const promptsByMind = {};
for (const p of prompts) {
  const mindId = projectMindMap.get(p.project_id);
  const slug = mindMap.get(mindId) || "unknown";
  if (!promptsByMind[slug]) promptsByMind[slug] = [];
  promptsByMind[slug].push(p.title);
}

console.log("=== Prompts no DB por mind ===");
for (const [slug, titles] of Object.entries(promptsByMind).sort()) {
  console.log(`${slug}: ${titles.length}`);
}
console.log("\nTotal:", prompts.length);
