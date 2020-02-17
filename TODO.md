## TODO
* menu
    * export/upload level
    * upload replay
* map editor
* mobile control panel up/down/left/right
* popup after finish last level
* editor: support press mouse for bulk editing
* editor: shift

## Basic Rules
map has 3 layers
1. tank
2. Obstacles (SOLID_BLOCK, MOVABLE_BLOCK, CRYSTAL_BLOCK, BRICKS, ANTI_TANK, MIRROR, ROTARY_MIRROR)
3. backgrounds (DIRT, FLAG, WATER, TANK_MOVER, ICE, THIN_ICE, TUNNEL)

Tank, object, and background can share same space at same time, but there can't be more than one tank/object/background inside same space.
Laser only interact with tank and objects on same space. (Old version laser would kill tank on adjacent space)
Object will block tank movement. But tank can't block objects movement.
All laser, tank and objects move with the same speed.
Anti-tank fires order E, S, W, N
Tunnel jump order N to S, W to E

## lifecycle
1. lifecycle will finish as soon as game got a "FAIL" status.
2. laser interect with tank/obstacle on same space
3. move obstacle from source position to target position
3. move tank from source position to target position
4. check target background (ex. Flag, Water, Ice ..., but not Mover)
5. check source background tank/obstacle (ex. When Tunnel become empty, it may draw a tank/obstacle on top of it)
6. check tank surrounding (ex. AntiTank)
7. check tank backgound (Mover)

## Legacy tricks
first step on mover and ice doesn't count moving time
move tank | move laser | move other object | checking whether certain conditions have been met 
tankMover and ice handle shouldCheckTank differently
tank sinks in different speed: ice->thin == tm->thin == tm->water slower than ice->water

## refactoring
styles: classnames