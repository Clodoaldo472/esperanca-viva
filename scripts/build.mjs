// Build de produção: junta e minifica CSS e JS, copia só as imagens usadas
// e gera a pasta docs/ (publicada pelo GitHub Pages).
import { readFileSync, writeFileSync, mkdirSync, rmSync, copyFileSync, existsSync } from "node:fs";
import { gzipSync } from "node:zlib";
import { transformSync } from "esbuild";

const ordemJs = ["dados", "templates", "mascaras", "armazenamento", "notificacoes", "validacao", "menu", "roteador"]
  .map((n) => `js/modules/${n}.js`).concat("js/main.js");
const imagens = ["logo-esperanca-viva.png", "projeto-educacao.jpg", "projeto-alimentar.jpg", "projeto-digital.jpg", "oficina-inclusao-digital.jpg"];
const ler = (c) => readFileSync(c, "utf8");

rmSync("docs", { recursive: true, force: true });
mkdirSync("docs/css", { recursive: true });
mkdirSync("docs/js", { recursive: true });
mkdirSync("docs/img", { recursive: true });

const css = transformSync(ler("css/reset.css") + "\n" + ler("css/estilo.css"), { loader: "css", minify: true }).code;
writeFileSync("docs/css/estilo.min.css", css);

// Cada arquivo é envolvido em um bloco para isolar constantes de nível superior.
const jsFonte = ordemJs.map((c) => `{\n${ler(c)}\n}`).join("\n").replaceAll("../img/", "img/");
const js = transformSync(jsFonte, { loader: "js", minify: true, target: "es2022" }).code;
writeFileSync("docs/js/app.min.js", js);

let html = ler("html/index.html")
  .replace(/<link rel="stylesheet" href="\.\.\/css\/reset\.css">\n<link rel="stylesheet" href="\.\.\/css\/estilo\.css">/, '<link rel="stylesheet" href="css/estilo.min.css">')
  .replace(/(<script src="\.\.\/js\/[^\n]*\n)+/, '<script src="js/app.min.js" defer></script>\n')
  .replaceAll("../img/", "img/");
writeFileSync("docs/index.html", html);

for (const i of imagens) { if (!existsSync(`img/${i}`)) throw new Error("Imagem ausente: " + i); copyFileSync(`img/${i}`, `docs/img/${i}`); }

const tam = (t) => `${Buffer.byteLength(t)} B (gzip ${gzipSync(t).length} B)`;
console.log("CSS:", tam(css));
console.log("JS :", tam(js));
console.log("HTML:", tam(html));
