import { screen, Region } from "@nut-tree/nut-js";
import Jimp from "jimp";

export const screenshotOperation = "prnt_scrn";
const areaWidth = 200;
const areaHeight = 200;

async function getScreenArea(x: number, y: number) {
  const screenWidth = await screen.width();
  const screenHeight = await screen.height();
  let left = x - areaWidth / 2;
  let top = y - areaHeight / 2;

  left = left < 0 ? 0 : left;
  top = top < 0 ? 0 : top;
  left = x + areaWidth / 2 > screenWidth ? screenWidth - areaWidth : left;
  top = y + areaHeight / 2 > screenHeight ? screenHeight - areaHeight : top;

  return { left, top, width: areaWidth, height: areaHeight };
}

export async function screenshot(x: number, y: number) {
  const { left, top, width, height } = await getScreenArea(x, y);
  const area = new Region(left, top, width, height);
  const image = new Jimp(await(await screen.grabRegion(area)).toRGB());
  const base64Image = await image.getBase64Async(image.getMIME());

  return `${screenshotOperation} ${base64Image.slice(
    base64Image.indexOf(",") + 1
  )}`;
}
