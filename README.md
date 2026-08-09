[![ko-fi](https://ko-fi.com/img/githubbutton_sm.svg)](https://ko-fi.com/D1D71M8JMY)

# CloseDose for Providers

CloseDose is a small collection of free, open pediatric clinical tools built by a
practicing physician and shared as an outlet for fellow providers and caregivers
to use. It is a static site built with plain HTML, CSS, and JavaScript and hosted
via GitHub Pages.

## Pages

| Page | File | Purpose |
|------|------|---------|
| Home (Provider hub) | `index.html` | Landing page introducing the tools |
| Dosing Calculator | `calculator.html` | Weight-based pediatric dosing for acetaminophen, ibuprofen, and antihistamines |
| Medication Guides | `medication-guides.html` | Concentration / product reference guides |
| PALS Code Simulator | `code-simulator.html` | First-person, voice-driven 3D pediatric resuscitation simulator |
| POCUS Deck | `pocus-presentation.html` | Pass the Pointer pediatric POCUS teaching slides |
| ABP Board Prep | `board-prep.html` | Blueprint-weighted study system for the ABP General Pediatrics certifying exam |
| Donate | `donation.html` | Ways to support the project |

### Board Prep data files

`board-prep.html` loads its content from three plain-JS data files so the page
markup stays readable:

| File | Contents |
|------|----------|
| `board-prep-data.js` | Exam metadata and content domains 1–12 (weights, high-yield pearls, traps) |
| `board-prep-data-b.js` | Content domains 13–24, appended to the same array |
| `board-prep-cram.js` | Cram sheet sections and the differentiation ("discriminator") tables |
| `board-prep-questions.js` | Retrieval-practice question bank |
| `board-prep.js` | Countdown, domain tracker, study plan, cram/discriminator rendering, and quiz engine |

Domain weights are quoted from the publicly available ABP General Pediatrics
Content Outline (effective for exams administered on or after October 15, 2024).
Progress is stored per-device in `localStorage` and never leaves the browser.

## Styling

The site uses the CloseDose teal color scheme (`#0f2c2a` dark, `#24a687` bright)
and the Nunito typeface for a clean, professional look. Shared design tokens are
defined as CSS custom properties at the top of each page's `<style>` block.

## Logo files and license

This repository contains several CloseDose logo files in SVG and PNG formats. The
logos are the intellectual property of Nickolas Mancini, MD, MBA and are provided
solely for use with the CloseDose project. Redistribution or modification of the
logo assets is prohibited without express permission. See `LOGO_LICENSE.md` for
the full license.

## Disclaimer

These tools are for educational purposes only and are not a substitute for
professional medical advice or clinical judgment. Always confirm dosing and
management with your own institution's resources.
