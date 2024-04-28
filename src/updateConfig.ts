import fs from "fs";
import path from "path";
import type { Config } from "./index.d";
import { merge } from "lodash-es";
import { getConfig } from "./getConfig";

export function updateConfig(config: Partial<Config>, configFileName: string) {
  try {
    const configPath = getConfigPath(configFileName);
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

function getConfigPath(configFileName: string) {
  const configPath = path.join(import.meta.dirname, configFileName);
  return configPath;
}

function isExistConfig(path: string) {
  const exist = fs.existsSync(path);
  return exist;
}

function createConfigFile(configPath: string, defaultConfig: Config) {
  fs.writeFileSync(configPath, JSON.stringify(defaultConfig));
}

function setConfig(path: string, config: Config) {
  const rawConfig = JSON.stringify(config);
  fs.writeFileSync(path, rawConfig);
}
