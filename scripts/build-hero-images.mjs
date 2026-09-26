/**
 * Regenerates the three composited images the /shop/request-quote-new landing
 * page uses. There is no photograph of a real Ellenox installation, so the hero
 * is built: the site's stock wall-mount render has its generic charger cloned
 * out and the Model 1 cut-out dropped in.
 *
 *   node scripts/build-hero-images.mjs
 *
 * Outputs (all in public/):
 *   hero-ellenox-install.webp        balanced crop, used for the mobile band
 *   hero-ellenox-install-panel.webp  framed so the unit clears the form card
 *   model-1-wall-detail.webp         tall crop for the Smart Charging section
 *
 * ellenox-model-1-cutout.png beside this file is product.webp with its white
 * studio background knocked out. Delete these outputs and re-run after swapping
 * in a real install photograph.
 */
import { createRequire } from "node:module"
import { dirname, join } from "node:path"
import { fileURLToPath } from "node:url"

const HERE = dirname(fileURLToPath(import.meta.url))
const ROOT = join(HERE, "..") + "/"
const sharp = createRequire(join(ROOT, "package.json"))("sharp")
const BASE = ROOT + "public/ev-charger-installation-outdoor-wall-mounted.webp"
const CUT = join(HERE, "ellenox-model-1-cutout.png")
const OUT = ROOT + "public/hero-ellenox-install.webp"

const COVER = { left: 424, top: 300, width: 258, height: 540 }
const STRIP = { left: 392, top: 300, width: 32, height: 540 }
const UNIT = { left: 404, top: 338, width: 267 }
const CROP = { left: 268, top: 175, width: 422, height: 630 }
// Clean band of wall above the stock unit — used to read the horizontal
// light falloff so the cloned patch does not sit brighter than its neighbours.
const PROFILE_ROWS = { top: 286, height: 48 }

const lum = (r, g, b) => 0.299 * r + 0.587 * g + 0.114 * b

async function columnProfile(left, width) {
  const { data, info } = await sharp(BASE)
    .extract({ left, top: PROFILE_ROWS.top, width, height: PROFILE_ROWS.height })
    .removeAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true })
  const { width: W, height: H, channels: C } = info
  const cols = new Float64Array(W)
  for (let x = 0; x < W; x++) {
    let s = 0
    for (let y = 0; y < H; y++) {
      const i = (y * W + x) * C
      s += lum(data[i], data[i + 1], data[i + 2])
    }
    cols[x] = s / H
  }
  return cols
}

const run = async () => {
  const coverProfile = await columnProfile(COVER.left, COVER.width)
  const stripProfile = await columnProfile(STRIP.left, STRIP.width)
  const reference = stripProfile.reduce((a, b) => a + b, 0) / stripProfile.length

  // Stretch the clean strip across the whole cover area, keeping its vertical
  // gradient, then scale each column back to the brightness the original wall
  // had at that x. That restores the shadow the garage frame casts.
  const stretched = await sharp(BASE)
    .extract(STRIP)
    .resize({ width: COVER.width, height: COVER.height, fit: "fill" })
    .blur(1.1)
    .removeAlpha()
    .raw()
    .toBuffer()

  const { width: W, height: H } = COVER
  const shaded = Buffer.alloc(W * H * 3)
  for (let x = 0; x < W; x++) {
    const f = Math.max(0.55, Math.min(1.25, coverProfile[x] / reference))
    for (let y = 0; y < H; y++) {
      const i = (y * W + x) * 3
      for (let c = 0; c < 3; c++) {
        shaded[i + c] = Math.max(0, Math.min(255, Math.round(stretched[i + c] * f)))
      }
    }
  }

  const feather = Buffer.from(
    `<svg width="${W}" height="${H}">` +
      `<filter id="f"><feGaussianBlur stdDeviation="18"/></filter>` +
      `<rect x="30" y="30" width="${W - 60}" height="${H - 60}" fill="#fff" filter="url(#f)"/></svg>`
  )
  const mask = await sharp(feather).greyscale().raw().toBuffer()
  const patch = await sharp(shaded, { raw: { width: W, height: H, channels: 3 } })
    .joinChannel(mask, { raw: { width: W, height: H, channels: 1 } })
    .png()
    .toBuffer()

  const charger = await sharp(CUT).resize({ width: UNIT.width }).png().toBuffer()
  const cm = await sharp(charger).metadata()
  // Scene is lit from the left, so the shadow falls down and to the right.
  const alpha = await sharp(charger).extractChannel("alpha").linear(0.4, 0).blur(7).toBuffer()
  const shadow = await sharp({
    create: { width: cm.width, height: cm.height, channels: 3, background: { r: 22, g: 24, b: 22 } },
  })
    .joinChannel(alpha)
    .png()
    .toBuffer()

  const composed = await sharp(BASE)
    .composite([
      { input: patch, left: COVER.left, top: COVER.top },
      { input: shadow, left: UNIT.left + 11, top: UNIT.top + 8 },
      { input: charger, left: UNIT.left, top: UNIT.top },
    ])
    .png()
    .toBuffer()

  await sharp(composed)
    .extract(CROP)
    .resize({ width: CROP.width * 2, height: CROP.height * 2, kernel: "lanczos3" })
    .sharpen({ sigma: 0.6 })
    .webp({ quality: 88 })
    .toFile(OUT)

  const m = await sharp(OUT).metadata()
  console.log("wrote", OUT, m.width + "x" + m.height)

  // Desktop hero panel. The form card covers everything past roughly 30% of the
  // panel, so this crop is framed to put the unit inside that first 30% — the
  // balanced crop above centres it and would hide it behind the card.
  //
  // The wall runs out at x=678 and the dark garage opening starts, which showed
  // as a murky sliver down the right edge of the hero. So the panel is the wall
  // crop plus a stretched column of clean wall feathered over the join.
  const PANEL = { left: 366, top: 175, width: 312, height: 630 }
  const FILLER = 108
  const panelW = PANEL.width + FILLER
  const wallBody = await sharp(composed).extract(PANEL).png().toBuffer()
  // Source the filler from the band of wall left of the unit. Take the brightest
  // pixel per row rather than stretching the strip as-is: any column near the
  // unit clips a sliver of its dark edge, and stretching that smears a ghost
  // bar down the fill. Wall is the bright thing there, so max() picks it out.
  const fillW = FILLER + 40
  const strip = await sharp(composed)
    .extract({ left: 392, top: PANEL.top, width: 16, height: PANEL.height })
    .removeAlpha()
    .raw()
    .toBuffer()
  const wallFill = Buffer.alloc(fillW * PANEL.height * 3)
  for (let y = 0; y < PANEL.height; y++) {
    let best = -1
    let px = [0, 0, 0]
    for (let x = 0; x < 16; x++) {
      const i = (y * 16 + x) * 3
      const l = lum(strip[i], strip[i + 1], strip[i + 2])
      if (l > best) {
        best = l
        px = [strip[i], strip[i + 1], strip[i + 2]]
      }
    }
    for (let x = 0; x < fillW; x++) {
      const o = (y * fillW + x) * 3
      wallFill[o] = px[0]
      wallFill[o + 1] = px[1]
      wallFill[o + 2] = px[2]
    }
  }
  const fillMask = await sharp(
    Buffer.from(
      `<svg width="${fillW}" height="${PANEL.height}">` +
        `<defs><linearGradient id="g" x1="0" x2="1">` +
        `<stop offset="0" stop-color="#000"/><stop offset="0.45" stop-color="#fff"/></linearGradient></defs>` +
        `<rect width="${fillW}" height="${PANEL.height}" fill="url(#g)"/></svg>`
    )
  )
    .greyscale()
    .raw()
    .toBuffer()
  const fill = await sharp(wallFill, { raw: { width: fillW, height: PANEL.height, channels: 3 } })
    .joinChannel(fillMask, { raw: { width: fillW, height: PANEL.height, channels: 1 } })
    .png()
    .toBuffer()

  // sharp applies resize before composite within one pipeline, so the panel has
  // to be assembled at native size and scaled up in a second pass.
  const panelFlat = await sharp({
    create: { width: panelW, height: PANEL.height, channels: 3, background: "#e9e6df" },
  })
    .composite([
      { input: wallBody, left: 0, top: 0 },
      { input: fill, left: PANEL.width - 40, top: 0 },
    ])
    .png()
    .toBuffer()

  const OUT3 = ROOT + "public/hero-ellenox-install-panel.webp"
  await sharp(panelFlat)
    .resize({ width: panelW * 2, height: PANEL.height * 2, kernel: "lanczos3" })
    .sharpen({ sigma: 0.6 })
    .webp({ quality: 88 })
    .toFile(OUT3)
  const m3 = await sharp(OUT3).metadata()
  console.log("wrote", OUT3, m3.width + "x" + m3.height)

  // Tall narrow crop of the unit for the right edge of the "Smart Charging"
  // section, where the design shows the charger cropped against a light wall.
  const DETAIL = { left: 400, top: 256, width: 188, height: 450 }
  const OUT2 = ROOT + "public/model-1-wall-detail.webp"
  await sharp(composed)
    .extract(DETAIL)
    .resize({ width: DETAIL.width * 3, height: DETAIL.height * 3, kernel: "lanczos3" })
    .sharpen({ sigma: 0.6 })
    .webp({ quality: 88 })
    .toFile(OUT2)
  const m2 = await sharp(OUT2).metadata()
  console.log("wrote", OUT2, m2.width + "x" + m2.height)
}

run()
