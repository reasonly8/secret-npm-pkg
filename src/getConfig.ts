import fs from "fs";
import path from "path";
import type { Config } from "./index.d";

export function getConfig(configName: string) {
  const configPath = path.join(import.meta.dirname, configName);

  if (!fs.existsSync(configPath)) {
    console.log(
      `${configName} does not exist. Please use \`secret config -p <config_dir>\` at first.`
    );
    return null;
  }

  const rawConfig = fs.readFileSync(configPath).toString();
  try {
    const config = JSON.parse(rawConfig) as Config;
    return config;
  } catch {
    return null;
  }
}
