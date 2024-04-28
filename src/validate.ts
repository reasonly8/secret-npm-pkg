import path from "path";
import fs from "fs";
import { getConfig } from "./getConfig";

export function validate(configName: string) {
  const config = getConfig(configName);
  if (config === null) {
    return false;
  }

  const { keyDir } = config;

  if (typeof keyDir !== "string") {
    return false;
  }

  if (!path.isAbsolute(keyDir)) {
    console.log(`${p} is not an absolute path`);
    return false;
  }
  if (!fs.existsSync(p)) {
    console.log(`${p} is not a valid path`);
    return false;
  }
  if (!existKey(p, KeyNameEnum.PUBLIC)) {
    console.log(`${KeyNameEnum.PUBLIC} file not found in ${p}`);
    return false;
  }
  if (!existKey(p, KeyNameEnum.PIRVATE)) {
    console.log(`${KeyNameEnum.PIRVATE} file not found in ${p}`);
    return false;
  }
  return true;
}
