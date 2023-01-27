## Tracker Instructions

All settings/progress are saved in local storage. Use trash can to reset progress.


### <i class="fa fa-gear" /> Tracker Settings

Click the gear button at the far right to view the settings:

* Visible locations: This will hide all locations not matching the selected split.
* Warp lines: "legacy" will use the same line colors as the current varia.run site. "area" will draw two lines between each connected warp point. The color and style of the lines indicates which area the line is connected too (eg crater is solid+pink while red brinstar is dashed+green).
* Show item counts: show/hide the list of items in each area in the top right
* Large locations, large warps: double the size of the click targets

### <i class="fa fa-gamepad" /> Rando Settings

These settings determine how the map is randomized. Click the gamepad button at the far right to view the settings:

* Logic: Which initial rom (Vanilla Super Metroid or Mirrortroid) was used.
* Majors Split: Where key items will be placed (change "visible locations" in tracker settings to filter).
* Area rando: Whether or not the area connections can be remapped (purple portals).
* Boss rando: Whether or not the boss connections can be remapped (red portals).
* Escape rando: Whether or not the escape connections can be remapped (green portals).
* Door rando: Whether or not door colors can be changed.
* Tourian: Will Tourian be `vanilla` (unchanged), `fast` (no metroids, zebetites, or cutscenes), or `disabled` (escape starts when all objectives are met).

### Keyboard shortcuts

* `cx`: clear all locations in area c (crater). If all locations are already cleared, reset all locations in crater. (see area hotkeys for full list of area letters)
* `g1`: Click the g1 warp (green brinstar elevator)
* `g1c5`: connect warps c5 (left of morph) and g1 (green brinstar elevator). If already connected it will disconnect the two. If either warp is connected to a different warp, command is ignored.
* `ctrl+z`: undo
* `ctrl+shift+z`: redo


### Area hotkeys

I'll make these customizeable eventually but for now:

* Boss doors: boss doors in are always numbered 9. Boss doors out are always numbered 0.
* Other warp doors: I numbered these starting with 1 in the way I felt was most intuitive (left-to-right, top-to-bottom)
* Areas: All areas use their first letter except where there was a confilict (croc, wrecked ship)
* `C` - Crater
* `S` - wrecked Ship
* `T` - Tourian
* `G` - Green Brinstar
* `R` - Red Brinstar
* `K` - Kraids Lair
* `W` - West Maridia
* `E` - East Maridia
* `O` - crOcomires Lair
* `U` - Upper Norfair
* `L` - Lower Norfair
