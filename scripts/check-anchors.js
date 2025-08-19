import { readFileSync } from 'fs';

const html = readFileSync('index.html', 'utf8');
const anchorIds = Array.from(html.matchAll(/href="#(.*?)"/g)).map(m => m[1]);
const ids = new Set(Array.from(html.matchAll(/id="(.*?)"/g)).map(m => m[1]));
let broken = 0;
for (const id of anchorIds) {
  if (!ids.has(id)) {
    console.error(`Missing target for #${id}`);
    broken++;
  }
}
if (broken) {
  process.exit(1);
} else {
  console.log('All internal anchors have targets.');
}
