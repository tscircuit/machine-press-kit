// NEMA17 press-tool prototypes. Dimensions in mm. No load rating.
// Export: openscad -D 'part="platform_5p8"' -o output.stl press-kit.scad
// Change shaft_d and regenerate the entire set for another shaft.
$fn=96;
shaft_d=5;
part="platform_5p8";
slot_clearance=0.8;
plate_w=88; plate_d=70; plate_h=10;
foot_w=18; foot_h=65; foot_x=35;
module rounded_box(w,d,h,r=2){
 linear_extrude(h) offset(r=r) square([w-2*r,d-2*r],center=true);
}
module platform(slot){
 difference(){
  rounded_box(plate_w,plate_d,plate_h);
  translate([0,0,-1]) cylinder(d=slot,h=plate_h+2);
  translate([-slot/2,-plate_d/2-1,-1]) cube([slot,plate_d/2+1,plate_h+2]);
  // Underside seats locate the two separate risers; 0.4 mm total clearance.
  for(x=[-foot_x,foot_x]) translate([x-(foot_w+0.4)/2,-plate_d/2-1,-1]) cube([foot_w+0.4,plate_d+2,3]);
 }
}
module punch(reach){
 union(){
  cylinder(d=20,h=8);
  translate([0,0,8]) cylinder(d1=20,d2=shaft_d-0.6,h=4);
  translate([0,0,12]) cylinder(d=shaft_d-0.6,h=reach);
 }
}
module guide(){
 difference(){
  union(){cylinder(d=28,h=5);translate([0,0,5]) cylinder(d1=28,d2=18,h=5);translate([0,0,10]) cylinder(d=18,h=18);}
  translate([0,0,-1]) cylinder(d=4.3,h=30);
 }
}
if(part=="platform_5p8") platform(shaft_d+slot_clearance);
if(part=="platform_8p4") platform(8.4);
if(part=="platform_12p4") platform(12.4);
if(part=="punch_05") punch(5);
if(part=="punch_10") punch(10);
if(part=="punch_15") punch(15);
if(part=="riser") rounded_box(foot_w,plate_d,foot_h,1.5);
if(part=="steel_guide") guide();
