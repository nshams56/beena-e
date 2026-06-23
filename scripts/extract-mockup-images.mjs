import sharp from "sharp";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const src = path.resolve(
  __dirname,
  "../assets/c__Users_HP_AppData_Roaming_Cursor_User_workspaceStorage_02e3f7186acfe82f1d17032635ec88b5_images_image-34689f35-ea5e-43ac-b223-619742eebb17.png",
);
const outDir = path.resolve(__dirname, "../public/images/home");

const crops = [
  { name: "hero-eye.png", left: 235, top: 52, width: 305, height: 215 },
  { name: "about-lab.png", left: 248, top: 515, width: 292, height: 195 },
  { name: "insight-1.png", left: 6, top: 675, width: 168, height: 115 },
  { name: "insight-2.png", left: 184, top: 675, width: 168, height: 115 },
  { name: "insight-3.png", left: 362, top: 675, width: 172, height: 115 },
];

const mockupPath = path.resolve(
  __dirname,
  "../../.cursor/projects/d-beena/assets/c__Users_HP_AppData_Roaming_Cursor_User_workspaceStorage_02e3f7186acfe82f1d17032635ec88b5_images_image-34689f35-ea5e-43ac-b223-619742eebb17.png",
);

async function main() {
  const input =
    (await sharp(src).metadata().catch(() => null)) != null
      ? src
      : "C:/Users/HP/.cursor/projects/d-beena/assets/c__Users_HP_AppData_Roaming_Cursor_User_workspaceStorage_02e3f7186acfe82f1d17032635ec88b5_images_image-34689f35-ea5e-43ac-b223-619742eebb17.png";

  const { mkdir } = await import("fs/promises");
  await mkdir(outDir, { recursive: true });

  for (const crop of crops) {
    await sharp(input)
      .extract({
        left: crop.left,
        top: crop.top,
        width: crop.width,
        height: crop.height,
      })
      .png({ quality: 90 })
      .toFile(path.join(outDir, crop.name));
    console.log("Wrote", crop.name);
  }
}

main().catch(console.error);
