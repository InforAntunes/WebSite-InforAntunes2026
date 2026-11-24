import assert from "node:assert/strict"
import { readFileSync } from "node:fs"
import { fileURLToPath } from "node:url"

const root = new URL("../", import.meta.url)
const read = (path) => readFileSync(new URL(path, root), "utf8")
// Only registered namespaces are runtime content; pt/consumidor.json is an unused stub.
const namespaces = [...read("src/i18n.ts").matchAll(/from ['"]\.\/locales\/pt\/([^'"]+)\.json['"]/g)]
  .map((match) => match[1])
assert(namespaces.length > 0, "No Portuguese namespaces found in src/i18n.ts")

function tokens(value) {
  return [...value.matchAll(/\{\{[^}]+\}\}|<\/?[a-zA-Z][^>]*>/g)]
    .map((match) => match[0]).sort()
}

function compare(source, translated, path) {
  assert.equal(typeof translated, typeof source, `${path}: type mismatch or missing key`)
  if (Array.isArray(source)) {
    assert(Array.isArray(translated), `${path}: expected array`)
    assert.equal(translated.length, source.length, `${path}: list length differs from PT`)
    source.forEach((item, index) => compare(item, translated[index], `${path}[${index}]`))
  } else if (source && typeof source === "object") {
    assert(translated && !Array.isArray(translated), `${path}: expected object`)
    for (const [key, value] of Object.entries(source)) {
      compare(value, translated[key], `${path}.${key}`)
    }
  } else if (typeof source === "string") {
    assert(translated.trim(), `${path}: empty translation`)
    assert.deepEqual(tokens(translated), tokens(source), `${path}: interpolation or markup mismatch`)
  } else {
    assert.equal(translated, source, `${path}: value mismatch`)
  }
}

for (const namespace of namespaces) {
  const source = JSON.parse(read(`src/locales/pt/${namespace}.json`))
  for (const language of ["en", "es", "fr"]) {
    compare(source, JSON.parse(read(`src/locales/${language}/${namespace}.json`)), `${language}/${namespace}`)
  }
}
console.log(`OK: ${namespaces.length} registered namespaces in PT/EN/ES/FR (${fileURLToPath(root)}).`)
