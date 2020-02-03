# Welcom to Laser Tank
This is a rewrite of the classic puzzle game [LaserTank](https://laser-tank.com/) created by Jim Kindley

## TODO
* menu
    * save level
    * save replay
    * upload level
* replay
* map editor
* test tutor levels

## Basic Rules
map has 3 layers
1. tank
2. objects (SOLID_BLOCK, MOVABLE_BLOCK, CRYSTAL_BLOCK, BRICKS, ANTI_TANK, MIRROR, ROTARY_MIRROR)
3. backgrounds (DIRT, FLAG, WATER, TANK_MOVER, ICE, THIN_ICE, TUNNEL)

Tank, object, and background can share same space at same time, but there can't be more than one tank/object/background inside same space.
Laser only interact with tank and objects on same space. (Old version laser would kill tank on adjacent space)
Object will block tank movement. But tank can't block objects movement.
All laser, tank and objects move with the same speed.
All actions following same order, N to S, and W to E.

## Legacy tricks
first step on mover and ice doesn't count moving time
move tank | move laser | move other object | checking whether certain conditions have been met 