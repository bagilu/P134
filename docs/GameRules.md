# P134 V0.1 Game Rules

## Core rules

- Targets are the 26 English letters A-Z. Input is case-insensitive.
- One correct key destroys the lowest matching target and awards one point.
- A target that reaches the ground becomes a fallen letter and remains visible.
- Ten fallen letters end the game.

## Difficulty

Difficulty increases every five points. At level 1, a target is generated every 1.0 second and needs about 5.7 seconds to fall. Each level reduces generation interval by 0.15 second, so more letters are simultaneously visible. Fall duration is only reduced by 0.2 second per level, maintaining a gentler reaction window. Limits are 0.45 seconds and 4.5 seconds, respectively.

## Visual feedback

The energy bolt follows a curved Bézier trajectory: it first rises from the ship and then turns smoothly towards the selected target.

## Fair randomness

Letters are delivered from a shuffled 26-letter bag. No letter repeats within a bag, and the first item of a new bag cannot equal the final item of the previous bag. Horizontal positions are randomized with an attempt to avoid newly overlapping targets.
