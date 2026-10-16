# Verification — Animal World and illustrated math

## Automated checks: passed

Commands: `node test.cjs`, `node collection.test.cjs`, and JavaScript syntax checks for all runtime scripts.

- **54,000 generated problems:** addition/subtraction/mixed, ranges 10/20/100, strategy settings, correct original and guided-step answers, and nonnegative subtraction.
- **1,035,351 signed equal-change cases:** accepted transformations preserve the difference; negative operands, unequal amounts/directions, empty changes, and out-of-range changes are rejected. Addition compensation is rejected.
- **30,906 picture states:** correct starting, marked, combined, remaining, and taken-away quantities, including zero and equal operands. Remaining plus taken away equals the starting subtraction quantity.
- Exactly 100 animal IDs and 71 item IDs, all unique; 100 distinct animal SVG strings and 71 distinct item SVG strings. Ten animals per habitat, 60 base items, ten habitat keepsakes, one all-animal keepsake.
- A starter-only simulation welcomed every other animal in 99 completed adventures, with no duplicates or repeat session awards. Every base item could be bought once, every accessory equipped, and every decoration/keepsake placed. The shortest sessions fund the whole base item catalog during those 99 adventures.
- Configurable two-ticket pacing retains meaningful partial progress before an animal joins.
- Repeated claims/purchases/placements, selected-field editing, guided mirroring, independent changes, zero changes, applying twice without erasing input, and no answers/rewards for applying adjustments.
- Version 1 migration preserves currency, companions, items, completed sessions, learning history, and equipped/decorated state. Favorites/layouts survive JSON roundtrip. Adding a catalog entry does not invalidate an old save; unknown safe IDs are retained.
- Resume restores compensation fields, applied numbers, entry, and a correct-answer lock; reloading cannot record that answer twice.
- Main-save corruption recovers a prior valid copy. Invalid temporary-adventure data is discarded without dropping valid permanent progress. Two unreadable copies recover gracefully to a fresh game; storage failures show a notice.
- Key dark/light normal-text contrast pairs meet 4.5:1. CSS includes visible focus and a system reduced-motion override.

## Real browser interaction: passed

Tests used the Chromium in-app browser, with disposable test saves on separate localhost ports. This was a software walkthrough, not actual child testing.

- Empty submit showed a prompt. Incorrect entry opened useful visual help before a worked answer. Correct answers worked through both on-screen controls and physical keyboard input. Double-clicking Check did not duplicate the answer or rewards.
- Took two bunnies from three: stage one marked exactly two; stage two showed one Still here and two Taken away. The remaining answer was not printed. Replay and return-to-answer controls worked.
- Put three and two together into five displayed bunnies; a two-digit example 9 + 65 produced starting grids of 9 and 65, then a combined 74. The final answer was left for the player to count.
- Resumed after reload at the saved visual stage and after applying a negative compensation change. An unfinished adventure produced Keep going / Start fresh / Back home when choosing another activity.
- Guided +3 mirrored both changes. Comparison quantities were [3, 2, 6, 5], with zero take-away marks. Repeated Apply retained a typed answer. Independent unequal changes were rejected. −3 to both 3 and 2 was rejected; −2 gave 1 − 0 with comparison quantities [3, 2, 1, 0]. Zero was accepted and explained.
- A fresh save at `/jazzy/` loaded with one starter, no currency, sound/motion off, and range 10. Its first full five-question mixed adventure awarded five stars and welcomed Rabbit/Clover, reaching 2 of 100 animals.
- A second target was selected in Ocean; a completed adventure welcomed the dolphin. Favorites, a worn Blue bandana, and habitat decorations survived reload.
- Double-clicking a ball purchase charged once. Tapping the same placement twice kept one item in the slot with no additional charge.
- All ten habitat tabs displayed ten animals each. Each of six base item categories displayed ten items; Keepsakes displayed eleven. Collection totals came from the catalog.
- Parent confirmation, number-range/session-length/theme changes, and light-mode appearance were exercised. Keyboard Tab navigation retained visible focus through habitat tab updates.
- Phone widths 320 and 390, iPad portrait 768 × 1024, iPad landscape 1024 × 768, and desktop 1440 × 900 were checked. No horizontal page overflow was measured for the book or workspace. Collection controls measured at least 48px high; habitat spots were 72 × 78px on the phone.
- Bunny grids computed ten CSS columns at all checked widths. In the 65-bunny group, measured full rows were [10,10,10,10,10,10,5] with identical left edges. Place-value columns aligned in the vertical problems.
- Top-of-home Play/Collection controls both fit within the first 241px of the 390 × 844 viewport.
- Existing localhost progress was migrated in place without spending its saved currency or removing its owned rewards. Offline reload and collection navigation were checked with the corresponding preview server stopped, both at the root and under a repository-style subdirectory.

## Limits and scope

Physical iPad touch hardware, Safari-specific rendering, screen-reader audio, browser speech voices, home-screen installation, and the OS import/export file picker were not tested end to end. Save validation/import normalization were tested in the runtime suite. The parent reset was not used against the real save. Full 100-animal completion and all item use were automated simulations, not 99 manual browser adventures. There was no actual playtest with Jazzy and no public GitHub deployment.

All released collectibles have implemented unlock/use behavior. Habitat decoration deliberately uses six tap-to-place slots rather than free dragging. Accessories use stylized SVG overlays. Optional motion is not needed to understand any math picture.
