# Machine Press Kit

Printable prototype tooling for removing open-ended hubs or sleeves from **5 mm NEMA17 motor shafts**, with parametric OpenSCAD source, eight STL designs, and an interactive Three.js viewer.

**[Open the interactive 3D site](https://nema17-press-tool-studio.seveibar.chatgpt.site)** · **[Download the complete STL + CAD kit](https://nema17-press-tool-studio.seveibar.chatgpt.site/models/nema17-press-kit.zip)**

[![Screenshot of the toolkit site showing the assembled removal fixture, part library, and design notes](docs/site-preview.png)](https://nema17-press-tool-studio.seveibar.chatgpt.site)

The viewer displays the actual STL meshes. Select any part, orbit and zoom, switch to front/top views or wireframe, and use the removal-travel slider to inspect the assembly. The illustrated motor and hub are reference geometry, not printable parts.

## Included parts

All dimensions are in millimeters. There are eight unique designs; print **two risers**.

| Part | Geometry | STL |
| --- | --- | --- |
| Short punch | 4.4 mm tip, 5 mm straight reach | [Download](dist/models/punch_05.stl) |
| Medium punch | 4.4 mm tip, 10 mm straight reach | [Download](dist/models/punch_10.stl) |
| Long punch | 4.4 mm tip, 15 mm straight reach | [Download](dist/models/punch_15.stl) |
| Shaft platform | 88 × 70 × 10 mm, 5.8 mm open slot | [Download](dist/models/platform_5p8.stl) |
| Wide-clearance platform | 88 × 70 × 10 mm, 8.4 mm open slot | [Download](dist/models/platform_8p4.stl) |
| Large-collar platform | 88 × 70 × 10 mm, 12.4 mm open slot | [Download](dist/models/platform_12p4.stl) |
| Platform riser | 18 × 70 × 65 mm; print two | [Download](dist/models/riser.stl) |
| Steel-punch guide | 4.3 mm through-hole for a separate 4 mm steel punch | [Download](dist/models/steel_guide.stl) |

## Fit and use

These are **fit-check prototypes, not load-rated tooling**. Closed-solid mesh validation does not establish mechanical strength; the parts have not been physically load-tested.

- The default shaft diameter is 5 mm. NEMA17 specifies a frame size, so verify your actual motor dimensions.
- The removal setup needs an accessible shaft end, an open-ended hub, and **at least 10 mm clearance beneath the hub**, including the motor pilot boss. It cannot remove a blind sleeve.
- Choose the narrowest slot that clears the shaft or collar. Suggested minimum hub outside diameters are 12, 15, and 19 mm for the 5.8, 8.4, and 12.4 mm slots respectively; these are geometric fit guides, not load ratings.
- The risers leave 52 mm between them and put the platform top 73 mm above the bench. Leave enough space for the motor to move downward through the full release stroke.
- Support the hub directly and let the motor hang freely. Remove set screws, center the punch on the shaft, apply gentle axial pressure, and catch the motor when it releases.
- Printed punches are for light hand pressure and alignment. For tight interference fits, use suitable **metal punches and metal support tooling**. Do not hammer the printed parts.
- The steel-punch guide is only an alignment sleeve; the separate steel punch passes through and receives force directly.
- This is a removal fixture. Installation needs direct support of an accessible rear shaft end; pressing with the motor resting on its casing loads the bearings.

See [full dimensions, printing orientations, and usage notes](dist/models/README.txt). Starting print settings are PETG or nylon, 0.2 mm layers, 6+ walls, 60% or higher infill for supports, and solid punches. Print platforms top-face-down, punches and guide flange-down, and risers on their 18 × 70 mm bases. These settings do not establish a load rating.

## Source layout

| Path | Contents |
| --- | --- |
| [`cad/press-kit.scad`](cad/press-kit.scad) | Parametric source for all printable parts |
| [`cad/validate.py`](cad/validate.py) | Mesh validation and downloadable ZIP packaging |
| [`src/app.js`](src/app.js) | Three.js viewer, part descriptions, and illustrative assembly |
| [`dist/index.html`](dist/index.html) / [`dist/style.css`](dist/style.css) | Editable site markup and styles |
| [`dist/app.js`](dist/app.js) | Bundled viewer JavaScript generated from `src/app.js` |
| [`dist/models/`](dist/models/) | STL files, CAD copy, print notes, validation report, and ZIP |
| [`docs/site-preview.png`](docs/site-preview.png) | Site screenshot shown above |

## Run the viewer locally

Requirements: Node.js with npm; Python 3 for the example static server.

```sh
npm ci
npm run check
npm run build
python3 -m http.server 4173 --directory dist
```

Open <http://localhost:4173>. Serve `dist` as the site root: the viewer uses root-relative asset URLs. All 3D code and models are bundled locally; the stylesheet requests Google Fonts with local fallback fonts.

The public site is hosted on ChatGPT Sites. This repository contains its source and downloadable artifacts; GitHub pushes do **not** automatically redeploy that site. The account-specific Sites hosting identity is not needed to build or serve this copy.

## Edit and regenerate CAD

Install [OpenSCAD](https://openscad.org/). Edit `shaft_d`, `foot_h`, or other parameters in `cad/press-kit.scad`, then export the selected parts:

```sh
for part in platform_5p8 platform_8p4 platform_12p4 punch_05 punch_10 punch_15 riser steel_guide; do
  openscad --export-format binstl -D "part=\"$part\"" \
    -o "dist/models/$part.stl" cad/press-kit.scad
done
cp cad/press-kit.scad dist/models/press-kit.scad
```

The 5.8 mm slot follows `shaft_d + slot_clearance`; the wider slots are fixed at 8.4 and 12.4 mm. Punch tips follow `shaft_d - 0.6`. Recheck fit and update viewer descriptions and illustrative assembly dimensions after geometry changes: the viewer's notes and reference motor are not automatically derived from the CAD parameters.

To validate all meshes and rebuild the download ZIP:

```sh
python3 -m venv .venv
. .venv/bin/activate
python3 -m pip install -r cad/requirements.txt
python3 cad/validate.py
```

The validator checks that each STL is watertight, has consistent winding, forms one connected solid, and has positive volume. Results are recorded in [`mesh-validation.json`](dist/models/mesh-validation.json). These are geometry checks, not a stress analysis or physical test.

## Repository provisioning

Created through the declarative [`tscircuit/create-repo`](https://github.com/tscircuit/create-repo) workflow with public visibility and the live site configured as its homepage.
