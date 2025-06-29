import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts"],
  format: ["esm", "cjs"],
  dts: true, // Gera arquivos de tipos (.d.ts)
  clean: true, // Limpa a pasta dist antes de gerar
  minify: true, // Minimiza o JS
});
