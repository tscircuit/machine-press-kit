FIELDWORK / NEMA17 PRESS KIT / REV 01
Units: millimeters. Prototype geometry; no validated load capacity.

WHAT THIS SET DOES
Supports an open-ended hub/sleeve while a punch pushes the 5 mm motor shaft downward. It does not remove a blind sleeve or the motor rotor shaft from its bearings. NEMA17 specifies frame size; verify your actual motor and hub measurements.

FILES (8 unique STL designs, 9 printed pieces if printing one of each)
punch_05.stl       4.4 mm tip, 5 mm straight reach, 20 mm flange, 17 mm tall
punch_10.stl       4.4 mm tip, 10 mm straight reach, 20 mm flange, 22 mm tall
punch_15.stl       4.4 mm tip, 15 mm straight reach, 20 mm flange, 27 mm tall
platform_5p8.stl   88 x 70 x 10 mm, open 5.8 mm slot
platform_8p4.stl   88 x 70 x 10 mm, open 8.4 mm slot
platform_12p4.stl  88 x 70 x 10 mm, open 12.4 mm slot
riser.stl         18 x 70 x 65 mm; PRINT TWO
steel_guide.stl   28 mm flange x 28 mm tall, 4.3 mm through-hole for separate 4 mm steel punch
press-kit.scad    Parametric source, select a part and render/export in OpenSCAD
mesh-validation.json   Geometric validation results (not a strength analysis)

FIT REQUIREMENTS
- Assumed motor shaft: 5 mm, accessible from the top of an open-ended hub.
- Platform needs at least 10 mm axial clearance beneath the hub, including the motor pilot boss. If less, this printed platform will not fit.
- Choose the narrowest slot that clears the shaft/collar beneath the hub.
- Suggested minimum hub ODs: 12 mm for 5.8 slot; 15 mm for 8.4 slot; 19 mm for 12.4 slot. These give roughly 3 mm radial overlap per side, not a load rating. Check actual contact area, hub strength and stability.
- Riser center spacing 70 mm; clear opening 52 mm. Standard 42.3 mm motor frame illustrated.
- Plate seats are 18.4 mm wide and 2 mm deep. Plate top sits 73 mm above the bench. Verify printed seat fit and stable seating.
- Allow room beneath the motor for the entire release stroke. Longer motors need taller risers. Default example has a 40 mm body and 12 mm travel.
- Printed-tip reach is the straight narrow segment only. The shoulder must never contact the hub during pressing.
- STL files contain millimeter coordinates; select mm in the slicer.

PRINT STARTING POINTS (NOT A LOAD RATING)
PETG or nylon; 0.2 mm layers; 6+ walls; 60% or higher infill for plates/risers; solid punches. Use a material/process you understand. Plates: flat top face on bed, underside seats upward. Punches and steel guide: flange on bed. Risers: 18 x 70 mm base on bed. No support structures should be needed in these orientations. Check layer bonding and all fits. Use the source to compensate for printer tolerances.

REMOVAL
Remove set screws or other fasteners. Place two risers on a flat stable surface. Seat the chosen plate beneath the hub so the motor hangs freely. Confirm the plate supports the hub itself, not the motor boss or casing. Center the shortest suitable punch on the shaft. Apply only gentle, controlled axial hand pressure and catch the motor as it releases. Stop at bending, slipping, whitening, cracking, or significant resistance. Do not hammer. Keep hands out from under the falling motor.

Printed punches are light-duty fit/alignment prototypes. Tight interference fits require suitable metal punch AND metal support tooling. The steel guide takes no pressing load: a separate straight 4 mm steel punch passes entirely through it and receives force directly. Ensure adequate steel punch length and support. Ream the guide to sliding clearance if necessary.

INSTALLATION
Do not press hubs on with the motor supported by its casing or front face; that loads the motor bearings. Installation needs direct support of an accessible rear shaft end, with geometry specific to that motor. This set does not include a universal installation fixture.

VIEWER
The site displays the actual STL meshes. The assembly includes a non-printable illustrative 42.3 x 42.3 x 40 mm motor body, 5 mm shaft and 14 mm OD x 10 mm long hub. The slider illustrates ideal motion only; it is not a stress simulation. Wider-slot platform variants are inspected separately.

REGENERATE
Change shaft_d, foot_h or other dimensions in press-kit.scad, then render each selected part:
openscad -D 'part="platform_5p8"' -o platform_5p8.stl press-kit.scad
Named slot variants 8.4 and 12.4 are fixed; the 5.8 variant follows shaft_d + slot_clearance. Punch tips follow shaft_d - 0.6. Recheck all fits after changes. The site and pre-generated STLs do not update automatically from source edits.
