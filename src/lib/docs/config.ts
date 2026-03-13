import path from 'node:path';

export const REPO_OWNER = 'seaportal';
export const REPO_NAME = 'seaportal';
export const DOCS_BRANCH = 'main';
export const DOCS_JSON_URL = `https://raw.githubusercontent.com/${REPO_OWNER}/${REPO_NAME}/refs/heads/${DOCS_BRANCH}/docs/index.json`;
export const TEMP_SKIPPED_DOCS = new Set<string>([]);
export const USE_LOCAL_DOCS = true;
export const LOCAL_DOCS_PATH = path.resolve(process.cwd(), 'docs');
