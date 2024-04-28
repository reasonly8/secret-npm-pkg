import fs from "fs";
import path from "path";
import type { Config } from "./index.d";
import { merge } from "lodash-es";

export function updateConfig(config: Partial<Config>) {
  try {
    const configPath = getConfigPath();
    const exist = isExistConfig(configPath);

    if (!exist) {
      const defaultConfig = getDefaultConfig();
      createConfigFile(configPath, defaultConfig);
    }

    const oldConfig = getConfig(configPath);
    const newConfig = merge(oldConfig, config);
    setConfig(configPath, newConfig);
    return true;
  } catch {
    return false;
  }
}

function getDefaultConfig() {
  const config: Config = { keyDir: "", names: {} };
  return config;
}

function getConfigPath() {
  const configPath = path.join(import.meta.dirname, "./config.json");
  return configPath;
}

function isExistConfig(path: string) {
  const exist = fs.existsSync(path);
  return exist;
}

function createConfigFile(configPath: string, defaultConfig: Config) {
  fs.writeFileSync(configPath, JSON.stringify(defaultConfig));
}

function getConfig(path: string) {
  const rawConfig = fs.readFileSync(path).toString();
  const config = JSON.parse(rawConfig);
  return config;
}

function setConfig(path: string, config: Config) {
  const rawConfig = JSON.stringify(config);
  fs.writeFileSync(path, rawConfig);
}
