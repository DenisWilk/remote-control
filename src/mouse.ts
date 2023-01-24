import { mouse } from "@nut-tree/nut-js";

export const mouseKeys = [
  "mouse_position",
  "mouse_up",
  "mouse_right",
  "mouse_down",
  "mouse_left",
];

export async function moveMouse(
  key: string,
  position: { x: number; y: number },
  offset: number
) {
  let { x, y } = position;
  let responseRecuired = false;
  let info = "";

  switch (key) {
    case "mouse_position":
      info = `${key} ${x},${y}`;
      responseRecuired = true;
      break;

    case "mouse_up":
      y = y - offset;
      break;

    case "mouse_right":
      x = x + offset;
      break;

    case "mouse_down":
      y = y + offset;
      break;

    case "mouse_left":
      x = x - offset;
      break;

    default:
  }
  if (key !== "mouse_position") {
    info = `${key} ${offset}`;

    await mouse.setPosition({ x, y });
  }

  return { responseRecuired, info };
}
