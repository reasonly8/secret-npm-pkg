import fs from "fs";
import path from "path";
import { KeyNameEnum } from "./KeyName.enum";

export function getKey(keyDir: string, keyName: KeyNameEnum) {
  const keyPath = path.join(keyDir, keyName);
  const key = fs.readFileSync(keyPath).toString();
  return key;
}
