/*
 * Genera src/data/projects.generated.json a partir de projects.config.json.
 *
 * Por cada proyecto con `repo` consulta la API de GitHub (datos del repo y
 * lenguajes) y los combina con lo que se haya escrito a mano en la config.
 * Corre antes de cada build (`prebuild`). Nunca rompe el build: si GitHub no
 * responde, conserva los datos de la última ejecución.
 *
 * Uso: npm run fetch-projects   (opcional: GITHUB_TOKEN para más peticiones/hora)
 */
import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const configPath = resolve(root, 'projects.config.json');
const outputPath = resolve(root, 'src/data/projects.generated.json');
const MAX_LANGUAGES = 4;

const headers = {
  Accept: 'application/vnd.github+json',
  'X-GitHub-Api-Version': '2022-11-28',
  'User-Agent': 'portafolioweb-build',
  ...(process.env.GITHUB_TOKEN ? { Authorization: `Bearer ${process.env.GITHUB_TOKEN}` } : {}),
};

async function readJson(path, fallback) {
  try {
    return JSON.parse(await readFile(path, 'utf8'));
  } catch {
    return fallback;
  }
}

async function github(path) {
  const response = await fetch(`https://api.github.com${path}`, {
    headers,
    signal: AbortSignal.timeout(10_000),
  });
  if (!response.ok) throw new Error(`GitHub respondió ${response.status} en ${path}`);
  return response.json();
}

/** Convierte { Java: 1200, HTML: 300 } en [{ name: 'Java', share: 80 }, …]. */
function languageShares(bytes) {
  const total = Object.values(bytes).reduce((sum, value) => sum + value, 0);
  if (!total) return [];
  return Object.entries(bytes)
    .sort(([, a], [, b]) => b - a)
    .slice(0, MAX_LANGUAGES)
    .map(([name, value]) => ({ name, share: Math.round((value / total) * 100) }))
    .filter((language) => language.share > 0);
}

function slug(text) {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

async function buildProject(entry, previous) {
  const id = entry.id ?? slug(entry.repo ? entry.repo.split('/')[1] : entry.title);
  const base = {
    id,
    repo: entry.repo ?? null,
    title: entry.title ?? entry.repo?.split('/')[1] ?? 'Proyecto',
    description: entry.description ?? '',
    kind: entry.kind ?? '',
    image: entry.image ?? null,
    imageAlt: entry.imageAlt ?? '',
    demo: entry.demo ?? null,
    placeholder: Boolean(entry.placeholder),
    languages: (entry.languages ?? []).map((name) => ({ name, share: 0 })),
    topics: [],
    stars: 0,
    year: entry.year ?? null,
    updatedAt: null,
    url: entry.repo ? repoUrl(`https://github.com/${entry.repo}`, entry.path) : null,
  };

  if (!entry.repo) return base;

  try {
    const [repo, languages] = await Promise.all([
      github(`/repos/${entry.repo}`),
      github(`/repos/${entry.repo}/languages`),
    ]);

    if (repo.private) {
      console.warn(`  ! ${entry.repo} es privado: se omite para no publicar sus datos.`);
      return null;
    }

    return {
      ...base,
      description: entry.description || repo.description || '',
      demo: entry.demo ?? (repo.homepage || null),
      languages: languageShares(languages),
      topics: repo.topics ?? [],
      stars: repo.stargazers_count ?? 0,
      year: entry.year ?? new Date(repo.pushed_at).getFullYear(),
      updatedAt: repo.pushed_at,
      url: repoUrl(repo.html_url, entry.path, repo.default_branch),
    };
  } catch (error) {
    const cached = previous.find((project) => project.id === id);
    console.warn(
      `  ! ${entry.repo}: ${error.message}. ${cached ? 'Se usan los datos anteriores.' : 'Se usan solo los datos de la config.'}`,
    );
    // Lo escrito a mano en la config manda también sobre los datos en caché.
    return cached ? { ...cached, ...stripEmpty(base), languages: cached.languages } : base;
  }
}

/** Enlace al repo o, si hay `path`, a esa carpeta dentro de él. */
function repoUrl(base, path, branch = 'main') {
  if (!path) return base;
  return `${base}/tree/${branch}/${path.split('/').map(encodeURIComponent).join('/')}`;
}

function stripEmpty(object) {
  return Object.fromEntries(
    Object.entries(object).filter(
      ([, value]) => value !== null && value !== '' && !(Array.isArray(value) && !value.length),
    ),
  );
}

const config = await readJson(configPath, null);
if (!config?.projects?.length) {
  console.error('projects.config.json no existe o no tiene proyectos.');
  process.exit(1);
}

const previous = (await readJson(outputPath, { projects: [] })).projects ?? [];

console.log(`Proyectos: consultando ${config.projects.length} entradas…`);
const projects = (
  await Promise.all(config.projects.map((entry) => buildProject(entry, previous)))
).filter(Boolean);

await mkdir(dirname(outputPath), { recursive: true });
await writeFile(outputPath, `${JSON.stringify({ projects }, null, 2)}\n`);
console.log(`Proyectos: ${projects.length} escritos en src/data/projects.generated.json`);
