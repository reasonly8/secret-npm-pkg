import fs from "fs";
import path from "path";
import type { KeyNameEnum } from "./KeyName.enum";

export function existKey(keyDir: string, keyFileName: KeyNameEnum) {
  const keyPath = path.join(keyDir, keyFileName);
  return fs.existsSync(keyPath);
}
