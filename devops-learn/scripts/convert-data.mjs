import fs from "fs";
import path from "path";

const TOPICS_DIR = path.resolve("../topics");
const OUTPUT_FILE = path.resolve("src/data/topics.json");

const TOPIC_META = {
  ansible: { name: "Ansible", category: "automation", color: "#EE0000" },
  argo: { name: "ArgoCD", category: "cicd", color: "#EF7B4D" },
  aws: { name: "AWS", category: "cloud", color: "#FF9900" },
  azure: { name: "Azure", category: "cloud", color: "#0078D4" },
  chaos_engineering: { name: "Chaos Engineering", category: "sre", color: "#E74C3C" },
  cicd: { name: "CI/CD", category: "cicd", color: "#3498DB" },
  circleci: { name: "CircleCI", category: "cicd", color: "#343434" },
  cloud: { name: "Cloud", category: "cloud", color: "#6C63FF" },
  containers: { name: "Containers", category: "container", color: "#2496ED" },
  databases: { name: "Databases", category: "data", color: "#336791" },
  datadog: { name: "Datadog", category: "monitoring", color: "#632CA6" },
  devops: { name: "DevOps", category: "culture", color: "#00B4D8" },
  dns: { name: "DNS", category: "network", color: "#E67E22" },
  flask_container_ci: { name: "Flask Container CI", category: "cicd", color: "#000" },
  flask_container_ci2: { name: "Flask Container CI 2", category: "cicd", color: "#000" },
  gcp: { name: "GCP", category: "cloud", color: "#4285F4" },
  git: { name: "Git", category: "tools", color: "#F05032" },
  grafana: { name: "Grafana", category: "monitoring", color: "#F46800" },
  kafka: { name: "Kafka", category: "data", color: "#231F20" },
  kubernetes: { name: "Kubernetes", category: "container", color: "#326CE5" },
  linux: { name: "Linux", category: "os", color: "#FCC624" },
  misc: { name: "Miscellaneous", category: "other", color: "#95A5A6" },
  node: { name: "Node.js", category: "programming", color: "#339933" },
  observability: { name: "Observability", category: "monitoring", color: "#7B68EE" },
  openshift: { name: "OpenShift", category: "container", color: "#EE0000" },
  os: { name: "Operating System", category: "os", color: "#FCC624" },
  perl: { name: "Perl", category: "programming", color: "#39457E" },
  programming: { name: "Programming", category: "programming", color: "#6C5CE7" },
  python: { name: "Python", category: "programming", color: "#3776AB" },
  security: { name: "Security", category: "security", color: "#E74C3C" },
  shell: { name: "Shell", category: "programming", color: "#4EAA25" },
  software_development: { name: "Software Development", category: "programming", color: "#6C5CE7" },
  soft_skills: { name: "Soft Skills", category: "culture", color: "#00B894" },
  sql: { name: "SQL", category: "data", color: "#336791" },
  sre: { name: "SRE", category: "sre", color: "#00B4D8" },
  terraform: { name: "Terraform", category: "iac", color: "#7B42BC" },
  zuul: { name: "Zuul", category: "cicd", color: "#000" },
};

const CATEGORY_NAMES = {
  cloud: "Cloud",
  container: "Containers & Orchestration",
  cicd: "CI/CD & Automation",
  programming: "Programming & Scripting",
  monitoring: "Monitoring & Observability",
  data: "Databases & Data",
  os: "Operating System",
  network: "Networking",
  security: "Security",
  iac: "Infrastructure as Code",
  tools: "Tools",
  sre: "SRE & Reliability",
  culture: "Culture & Practices",
  other: "Other",
};

function parseDetailsBlocks(content) {
  const lines = content.split("\n");
  const regex =
    /<details>\s*<summary>([\s\S]*?)<\/summary>(?:<br>)?(?:<b>)?([\s\S]*?)(?:<\/b>)?<\/details>/gi;

  // Find the start of the questions section
  let questionsStartLine = 0;
  for (let i = 0; i < lines.length; i++) {
    if (/^##\s+.*uestions/i.test(lines[i])) {
      questionsStartLine = i;
      break;
    }
  }

  // Collect ### sections from the questions section onwards
  const sectionPositions = [];
  for (let i = questionsStartLine; i < lines.length; i++) {
    const h3Match = lines[i].match(/^###\s+(.+)/);
    if (h3Match) {
      const title = h3Match[1].trim();
      const id = title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/-+$/, "");
      sectionPositions.push({ id, title, lineIndex: i });
    }
  }

  // Second pass: match <details> blocks and assign sections
  const questions = [];
  const sectionCounts = {};

  let match;
  while ((match = regex.exec(content)) !== null) {
    const beforeMatch = content.substring(0, match.index);
    const lineIndex = beforeMatch.split("\n").length - 1;

    // Find the last ### heading before this match
    let sectionId = null;
    for (let i = sectionPositions.length - 1; i >= 0; i--) {
      if (sectionPositions[i].lineIndex <= lineIndex) {
        sectionId = sectionPositions[i].id;
        break;
      }
    }

    const question = match[1]
      .replace(/<[^>]+>/g, "")
      .replace(/\n+/g, " ")
      .trim();
    const answer = match[2]
      .replace(/<[^>]+>/g, "")
      .replace(/\n+/g, "\n")
      .trim();
    if (question && answer) {
      const q = { question, answer };
      if (sectionId) {
        q.section = sectionId;
        sectionCounts[sectionId] = (sectionCounts[sectionId] || 0) + 1;
      }
      questions.push(q);
    }
  }

  const sections = sectionPositions.map((s) => ({
    id: s.id,
    title: s.title,
    questionCount: sectionCounts[s.id] || 0,
  }));
  return { questions, sections };
}

function parseExerciseTable(content) {
  const exercises = [];
  const tableRegex = /\|[^|]+\|[^|]+\|\s*\[Exercise\]\(([^)]+)\)\s*\|[^|]*/g;
  let match;
  while ((match = tableRegex.exec(content)) !== null) {
    exercises.push({ file: match[1] });
  }
  return exercises;
}

function getTopicExercises(topicDir, readmeContent) {
  const exercises = [];
  const tableRegex =
    /\|\s*([^|]+?)\s*\|\s*([^|]+?)\s*\|\s*\[Exercise\]\(([^)]+)\)\s*\|\s*(?:\[Solution\]\(([^)]*)\))?\s*\|/g;
  let match;
  while ((match = tableRegex.exec(readmeContent)) !== null) {
    exercises.push({
      name: match[1].trim(),
      topic: match[2].trim(),
      exerciseFile: match[3].trim(),
      solutionFile: match[4] ? match[4].trim() : null,
    });
  }
  return exercises;
}

function buildTopicsData() {
  const topics = [];

  for (const dirName of fs.readdirSync(TOPICS_DIR)) {
    const readmePath = path.join(TOPICS_DIR, dirName, "README.md");
    if (!fs.statSync(path.join(TOPICS_DIR, dirName)).isDirectory()) continue;
    if (!fs.existsSync(readmePath)) continue;

    const content = fs.readFileSync(readmePath, "utf-8");
    const meta = TOPIC_META[dirName] || {
      name: dirName.charAt(0).toUpperCase() + dirName.slice(1),
      category: "other",
      color: "#95A5A6",
    };

    const { questions, sections } = parseDetailsBlocks(content);
    const exercises = getTopicExercises(
      path.join(TOPICS_DIR, dirName),
      content
    );

    topics.push({
      slug: dirName,
      name: meta.name,
      category: meta.category,
      categoryName: CATEGORY_NAMES[meta.category] || meta.category,
      color: meta.color,
      sections,
      questionCount: questions.length,
      exerciseCount: exercises.length,
      totalItems: questions.length + exercises.length,
      questions,
      exercises,
    });
  }

  topics.sort((a, b) => b.totalItems - a.totalItems);
  return { topics, categories: CATEGORY_NAMES };
}

const data = buildTopicsData();
fs.writeFileSync(OUTPUT_FILE, JSON.stringify(data, null, 2));
console.log(`Generated ${data.topics.length} topics to ${OUTPUT_FILE}`);
console.log(
  `Total: ${data.topics.reduce((s, t) => s + t.totalItems, 0)} items`
);
