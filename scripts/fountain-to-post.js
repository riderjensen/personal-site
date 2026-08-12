// One-off converter: public/Eternum.fountain -> src/posts/eternum.md
// Strips [[notes]] and /* boneyard */ comments, preserves screenplay formatting as HTML.
const fs = require("fs");
const path = require("path");

const ROOT = "E:/dev/personal";
const SRC = path.join(ROOT, "public/Eternum.fountain");
const OUT = path.join(ROOT, "src/posts/eternum.md");

let raw = fs.readFileSync(SRC, "utf8").replace(/\r\n/g, "\n");

// Strip boneyard comments and inline notes
raw = raw.replace(/\/\*[\s\S]*?\*\//g, "");
raw = raw.replace(/\[\[[\s\S]*?\]\]/g, "");
// Collapse whitespace left behind by stripped notes
raw = raw
  .split("\n")
  .map((l) => l.replace(/[ \t]+$/g, "").replace(/  +/g, " "))
  .join("\n");

const lines = raw.split("\n");

// --- Title page ---
let i = 0;
const titlePage = {};
while (i < lines.length) {
  const m = lines[i].match(/^([A-Za-z ]+):\s*(.*)$/);
  if (!m || /^(INT|EXT|EST)[. ]/.test(lines[i])) break;
  const key = m[1].trim().toLowerCase();
  titlePage[key] = m[2].trim();
  i++;
  // indented continuation lines
  while (i < lines.length && /^\s+\S/.test(lines[i])) {
    titlePage[key] += "\n" + lines[i].trim();
    i++;
  }
}

function esc(s) {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}
// Fountain emphasis: **bold**, *italic*, _underline_
function inline(s) {
  return esc(s)
    .replace(/\*\*([^*]+)\*\*/g, "<b>$1</b>")
    .replace(/\*([^*]+)\*/g, "<i>$1</i>")
    .replace(/_([^_]+)_/g, "<u>$1</u>");
}

const isBlank = (l) => !l || !l.trim();
const isHeading = (l) =>
  /^(INT|EXT|EST|INT\.?\/EXT|I\/E)[. ]/i.test(l.trim()) ||
  (/^\.[A-Za-z]/.test(l.trim()) && !/^\.\./.test(l.trim()));
const isTransition = (l) => {
  const t = l.trim();
  return (
    t === t.toUpperCase() &&
    /[A-Z]/.test(t) &&
    (/ TO:$/.test(t) || /^(CUT|FADE|SMASH|MATCH|DISSOLVE)[A-Z ]*(:|\.)$/.test(t))
  );
};
const isCharacter = (l, next) => {
  const t = l.trim();
  if (!t || isBlank(next)) return false;
  if (t !== t.toUpperCase() || !/[A-Z]/.test(t)) return false;
  if (isHeading(t) || isTransition(t)) return false;
  if (t.length > 40) return false;
  return /^[A-Z0-9 .#'()\/-]+$/.test(t);
};

const out = [];
out.push('<div class="screenplay">');

// Title page block
if (titlePage.title) {
  out.push('<div class="sp-titlepage">');
  out.push(`<div class="sp-title">${inline(titlePage.title)}</div>`);
  if (titlePage.credit) out.push(`<div>${inline(titlePage.credit)}</div>`);
  if (titlePage.author || titlePage.authors)
    out.push(`<div>${inline(titlePage.author || titlePage.authors)}</div>`);
  out.push("</div>");
}

const stats = { headings: 0, cues: 0, transitions: 0, actions: 0, parens: 0, dialogue: 0 };

while (i < lines.length) {
  const line = lines[i];
  if (isBlank(line)) {
    i++;
    continue;
  }
  const t = line.trim();

  if (isHeading(t)) {
    const text = t.replace(/^\.(?!\.)/, "");
    out.push(`<div class="sp-heading">${inline(text)}</div>`);
    stats.headings++;
    i++;
  } else if (isTransition(t)) {
    out.push(`<div class="sp-transition">${inline(t)}</div>`);
    stats.transitions++;
    i++;
  } else if (isCharacter(line, lines[i + 1])) {
    out.push(`<div class="sp-character">${inline(t)}</div>`);
    stats.cues++;
    i++;
    while (i < lines.length && !isBlank(lines[i])) {
      const d = lines[i].trim();
      if (/^\(.*\)$/.test(d)) {
        out.push(`<div class="sp-paren">${inline(d)}</div>`);
        stats.parens++;
      } else {
        out.push(`<div class="sp-dialogue">${inline(d)}</div>`);
        stats.dialogue++;
      }
      i++;
    }
  } else {
    // Action block: consecutive non-blank lines
    const block = [];
    while (
      i < lines.length &&
      !isBlank(lines[i]) &&
      !isHeading(lines[i].trim()) &&
      !isTransition(lines[i].trim()) &&
      !isCharacter(lines[i], lines[i + 1])
    ) {
      block.push(inline(lines[i].trim()));
      i++;
    }
    out.push(`<div class="sp-action">${block.join("<br>")}</div>`);
    stats.actions++;
  }
}

out.push("</div>");

const frontmatter = `---
  title: "Eternum"
  date: "2026-08-11"
  excerpt: "Something a little different from my usual posts: a feature-length fantasy screenplay I wrote. A shipwreck, a bread shop, a ritual gone wrong, and a mercenary trio pulled into something much bigger than a gnoll contract."
  img: "posts/eternum/eternum-cover.png"
  alt: "A dark title card with the word Eternum in white typewriter lettering"
---

Something a little different this time: instead of a technical write-up, this post is a screenplay I wrote called **Eternum**. It's presented below in standard screenplay format. If you'd rather read it in a screenwriting app, you can [download the Fountain file](/Eternum.fountain).

`;

// IMPORTANT: no blank lines inside the screenplay HTML so markdown treats it as one block
fs.writeFileSync(OUT, frontmatter + out.join("\n") + "\n");
console.log("Wrote", OUT);
console.log(stats);
