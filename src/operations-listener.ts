import { mouse } from "@nut-tree/nut-js";
import { moveMouse, mouseKeys } from "./mouse.js";
import { drawOperations, drawing } from "./figures.js";
import { screenshotOperation, screenshot } from "./screenshot.js";

export async function operationsListener(
  operation: string,
  arg1: number,
  arg2: number
) {
  const position = await mouse.getPosition();
  let result = { responseRecuired: false, info: "" };

  if (mouseKeys.includes(operation)) {
    result = await moveMouse(operation, position, arg1);
  }
  if (drawOperations.includes(operation)) {
    result.info = await drawing(operation, position, arg1, arg2);
  }
  if (result.info) {
    console.log(result.info);
  }
  if (screenshotOperation === operation) {
    const { x, y } = position;

    console.log(`${operation} ${x} ${y}`);
    result = { responseRecuired: true, info: await screenshot(x, y) };
  }

  return result;
}
