import { mouse, up, right, down, left } from "@nut-tree/nut-js";

export const drawOperations = ["draw_circle", "draw_rectangle", "draw_square"];

async function circle({ x, y }: { x: number; y: number }, radius: number) {
  const circumference = Math.PI * 2;
  const segment = 0.005 * Math.PI;

  for (
    let gradient = 0;
    gradient <= circumference;
    gradient = gradient + segment
  ) {
    await mouse.move([
      {
        x: x + radius - Math.round(radius * Math.cos(gradient)),
        y: y - Math.round(radius * Math.sin(gradient)),
      },
    ]);
  }
}

async function rectangle(x: number, y: number) {
  await mouse.move(right(x));
  await mouse.move(down(y));
  await mouse.move(left(x));
  await mouse.move(up(y));
}

export async function drawing(
  operation: string,
  position: { x: number; y: number },
  width: number,
  height: number
) {
  let log = `${operation} `;

  await mouse.pressButton(0);
  switch (operation) {
    case "draw_circle":
      await circle(position, width);
      log = `${log} ${width}`;
      break;

    case "draw_rectangle":
      await rectangle(width, height);
      log = `${log} ${width} ${height}`;
      break;

    case "draw_square":
      await rectangle(width, width);
      log = `${log} ${width}`;
      break;

    default:
  }
  await mouse.releaseButton(0);

  return log;
}
