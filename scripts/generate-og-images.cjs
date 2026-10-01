const sharp = require("sharp");
const path = require("path");

const fav = path.join("src/assets/fav-image1.png");
const outOg = path.join("public/og-image.png");
const outSquare = path.join("public/og-square.png");

async function main() {
  const logo = await sharp(fav)
    .resize(280, 280, {
      fit: "contain",
      background: { r: 0, g: 0, b: 0, alpha: 0 },
    })
    .png()
    .toBuffer();

  const logoSmall = await sharp(fav)
    .resize(260, 260, {
      fit: "contain",
      background: { r: 0, g: 0, b: 0, alpha: 0 },
    })
    .png()
    .toBuffer();

  const bgWide = Buffer.from(`<?xml version="1.0" encoding="UTF-8"?>
<svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <radialGradient id="g" cx="50%" cy="45%" r="65%">
      <stop offset="0%" stop-color="#1D4ED8"/>
      <stop offset="55%" stop-color="#0B1F4A"/>
      <stop offset="100%" stop-color="#0A0A0C"/>
    </radialGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#g)"/>
</svg>`);

  const bgSquare = Buffer.from(`<?xml version="1.0" encoding="UTF-8"?>
<svg width="512" height="512" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <radialGradient id="g" cx="50%" cy="45%" r="70%">
      <stop offset="0%" stop-color="#2563EB"/>
      <stop offset="100%" stop-color="#0A0A0C"/>
    </radialGradient>
  </defs>
  <rect width="512" height="512" rx="96" fill="url(#g)"/>
</svg>`);

  await sharp({
    create: {
      width: 1200,
      height: 630,
      channels: 3,
      background: { r: 10, g: 10, b: 12 },
    },
  })
    .composite([
      { input: bgWide, top: 0, left: 0 },
      { input: logo, top: 175, left: 460 },
    ])
    .png()
    .toFile(outOg);

  await sharp({
    create: {
      width: 512,
      height: 512,
      channels: 3,
      background: { r: 10, g: 10, b: 12 },
    },
  })
    .composite([
      { input: bgSquare, top: 0, left: 0 },
      { input: logoSmall, top: 126, left: 126 },
    ])
    .png()
    .toFile(outSquare);

  const m1 = await sharp(outOg).metadata();
  const m2 = await sharp(outSquare).metadata();
  console.log("og-image", m1.width, m1.height);
  console.log("og-square", m2.width, m2.height);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
