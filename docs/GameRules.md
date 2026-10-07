# P134 V0.1 Game Rules

## Core rules

- Targets are the 26 English letters A-Z. Input is case-insensitive.
- One correct key destroys the lowest matching target and awards one point.
- A target that reaches the ground becomes a fallen letter and remains visible.
- Ten fallen letters end the game.

## Difficulty

Difficulty increases every five points. At level 1, a target is generated every 1.0 second and needs about 5.5 seconds to fall. Each level reduces generation interval by 0.1 second and fall duration by 0.5 second. Limits are 0.4 seconds and 2.5 seconds, respectively.

## Fair randomness

Letters are delivered from a shuffled 26-letter bag. No letter repeats within a bag, and the first item of a new bag cannot equal the final item of the previous bag. Horizontal positions are randomized with an attempt to avoid newly overlapping targets.
