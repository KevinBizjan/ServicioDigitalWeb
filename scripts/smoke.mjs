// Smoke test de hidratación para las plantillas SitioFirme.
//
// Por qué: `astro build` arma el sitio pero NO lo ejecuta, así que no detecta
// errores de hidratación de los islands React (p.ej. el bug de createRoot con
// @astrojs/react@4). Este script levanta cada plantilla en su dev server, la
// abre en un navegador real (headless) y verifica lo mínimo:
//   1. No hay errores de hidratación en consola ni pageerror.
//   2. Los islands son interactivos (el hamburguesa del Header togglea).
//   3. (kinesiología) el sistema de turnos avanza de paso.
//
// Uso:  npm run smoke
// Navegador: usa el Chrome instalado. Override con CHROME_PATH=ru\al\chrome.exe

import { chromium } from "playwright-core";
import { spawn, execSync } from "node:child_process";
import { setTimeout as sleep } from "node:timers/promises";

const CHROME_PATH =
  process.env.CHROME_PATH ||
  "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";

const PORT = 4321;
const BASE = `http://localhost:${PORT}`;

const TEMPLATES = [
  { name: "landing", script: "dev:landing", turnos: false },
  { name: "cabanas", script: "dev:cabanas", turnos: false },
  { name: "restaurante", script: "dev:restaurante", turnos: false },
  { name: "kinesiologia", script: "dev:kinesiologia", turnos: true },
];

function startDev(script) {
  // Comando como string único (evita DEP0190 con shell:true). `script` es una
  // constante interna, no entrada de usuario. stdio ignorado: solo importa el navegador.
  return spawn(`npm run ${script}`, { shell: true, stdio: "ignore" });
}

function killTree(pid) {
  if (!pid) return;
  try {
    if (process.platform === "win32") {
      execSync(`taskkill /pid ${pid} /t /f`, { stdio: "ignore" });
    } else {
      process.kill(-pid, "SIGKILL");
    }
  } catch {
    /* ya estaba muerto */
  }
}

async function waitReady(timeoutMs = 40000) {
  const start = Date.now();
  while (Date.now() - start < timeoutMs) {
    try {
      const r = await fetch(BASE);
      if (r.ok) return true;
    } catch {
      /* todavía no levanta */
    }
    await sleep(700);
  }
  return false;
}

async function checkTemplate(t, browser) {
  const errores = [];
  const page = await browser.newPage({ viewport: { width: 390, height: 800 } });
  page.on("pageerror", (e) => errores.push("pageerror: " + e.message));
  page.on("console", (m) => {
    const txt = m.text();
    // Solo nos importan errores de hidratación, no 404 de favicon/imágenes.
    if (m.type() === "error" && /hydrat|createRoot|astro-island/i.test(txt)) {
      errores.push("console: " + txt);
    }
  });

  const checks = [];
  try {
    await page.goto(BASE, { waitUntil: "domcontentloaded", timeout: 30000 });
    await page.waitForTimeout(1500); // hidratación client:load

    // 1) Header interactivo (si la plantilla tiene el hamburguesa)
    const btn = page.getByRole("button", { name: "Abrir menú" });
    if (await btn.count()) {
      const antes = await btn.getAttribute("aria-expanded");
      await btn.click();
      await page.waitForTimeout(200);
      const despues = await btn.getAttribute("aria-expanded");
      checks.push(["header interactivo", antes === "false" && despues === "true"]);
    }

    // 2) Flujo de turnos (kinesiología)
    if (t.turnos) {
      await page.locator("#turnos").scrollIntoViewIfNeeded();
      await page.waitForTimeout(1200);
      const paso = async () =>
        (await page.locator("#turnos").innerText()).match(/[1-4]\/4/)?.[0];
      const inicial = await paso();
      await page.getByRole("button", { name: /Kinesiología deportiva/ }).click();
      await page.getByRole("button", { name: /^Continuar$/ }).click();
      await page.waitForTimeout(400);
      const luego = await paso();
      checks.push(["turnos avanza 1/4→2/4", inicial === "1/4" && luego === "2/4"]);
    }
  } catch (e) {
    errores.push("excepción: " + e.message);
  } finally {
    await page.close();
  }

  checks.push(["sin errores de hidratación", errores.length === 0]);
  return { checks, errores };
}

async function main() {
  const browser = await chromium.launch({
    executablePath: CHROME_PATH,
    headless: true,
  });

  let ok = true;
  for (const t of TEMPLATES) {
    process.stdout.write(`\n▶ ${t.name}: levantando dev server... `);
    const dev = startDev(t.script);
    const ready = await waitReady();
    if (!ready) {
      console.log("✗ no levantó a tiempo");
      ok = false;
      killTree(dev.pid);
      continue;
    }
    console.log("listo");

    const { checks, errores } = await checkTemplate(t, browser);
    for (const [label, pass] of checks) {
      console.log(`   ${pass ? "✓" : "✗"} ${label}`);
      if (!pass) ok = false;
    }
    for (const e of errores) console.log(`     · ${e}`);

    killTree(dev.pid);
    await sleep(800); // liberar el puerto antes de la siguiente
  }

  await browser.close();
  console.log(ok ? "\n✅ smoke test OK\n" : "\n❌ smoke test FALLÓ\n");
  process.exit(ok ? 0 : 1);
}

main();
