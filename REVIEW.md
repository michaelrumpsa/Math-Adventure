# Review and improvement report

This review combined source inspection, automated tests, and real browser interaction. The child-perspective walkthrough was a simulation based on the stated learning needs, not research with Jazzy. The reasons a situation *could* be confusing below are design judgments. No claim is made about what Jazzy will prefer or how she will respond.

## Meaningful findings and changes

| Observed trigger | Potential child-facing difficulty (simulated) | Implemented improvement | Verification |
| --- | --- | --- | --- |
| Check answer with no digits silently returned. | A child might think the button is broken. | A short prompt says to tap a number, then Check answer. | Browser empty-submit check; automated no-answer/no-record assertion. |
| Subtraction supports displayed first and second groups without showing removal. | It could look like addition. | Illustrated Take away activity and three controlled pictures: start, mark exactly what leaves, then separate Taken away and Still here. | Browser 3 − 2 marked two and displayed one remaining/two removed; 30,906 automated picture-state checks include zero/equal cases. |
| Addition supports did not visually join the groups. | The meaning of putting together depended on reading. | A consistent bunny illustration shows separate quantities, the joining action, then one group to count. | Browser combined 3 + 2 into five unlabeled-to-count bunnies, and 9 + 65 into 74; no printed final answer. |
| Long supports separated the answer box from the keypad. | The child could lose track of where the answer goes. | Answer and keypad are adjacent; Show me opens pictures below. Replay and I’m ready to answer explicitly navigate between counting and entry. | Browser picture stages and return-to-answer focus were exercised. |
| Rerendered controls lost keyboard focus. | Tab/keyboard users could repeatedly start navigation over. | Focus is retained for input fields, keypad controls, habitat tabs, and collection controls. New math problems focus the active field. | Physical digits/Backspace/Enter; Tab moved from Forest to Jungle with a visible outline. |
| Reloading or leaving discarded an unfinished adventure. | A break could feel like losing work. | Resume saves the problem, answer state, visual stage, and workspace. A different activity asks Keep going or Start fresh. | Browser resumed a final visual stage and a negative-adjustment workspace; automated already-correct reload did not add another answer. |
| Browser scroll restoration and next-question position could leave the new question above the viewport. | It could be unclear whether the problem changed. | Manual scroll restoration, top-of-question positioning, and predictable active-field focus. | Browser reload and next-question position checks. |
| The home scene preceded math controls on small screens. | Finding how to play could require scrolling through the scene. | Play/Resume and My collection are now at the top, with large illustrated activity choices still available below. | On a 390 × 844 viewport both quick controls ended at 241px; no horizontal overflow. |
| Repeated Apply cleared an answer even when the same change was already applied. | A double tap could feel like lost work. | Apply is idempotent for the same transformation and explains that the answer remains. | Browser typed answer 1, tapped Apply again, and retained it; automated regression test. |
| Within-10 compensation allowed a change of 100. | Hundreds could appear unexpectedly in early practice. | Change amounts are limited to the adventure’s selected range, while both operands still shift equally. | Automated range-limited rejection; positive, negative, zero, mismatch, and nonnegative-boundary checks. |
| The small old reward shelf offered limited collecting goals. | The requested collecting loop needed clearer goals and more variety. | 100 animals, 60 base items, 11 completion keepsakes, habitat book, targets, favorites, and tap placement. One session earns one animal ticket. | All IDs/artwork strings unique; 99 simulated adventures collected every animal; all items exercised; browser earned the first animal after one fresh session. |
| A saved balance could make the next target’s Welcome button appear in the same spot immediately after a manual welcome. | A second tap could spend a second ticket on a different animal. | Manual welcome now visits the newly welcomed animal, removing the next purchase from that location. | Automated UI-state regression: two tickets become one, the view becomes the habitat, and a repeated claim leaves one ticket. |
| An accessory purchase initially led to an unclear placement step during this implementation’s review. | A child could try to place clothing on the ground. | Buying/choosing an accessory equips the selected resident immediately; other friends can wear it from the shelf. | Browser equipped Blue bandana, reloaded, and retained it on the dolphin. |
| A damaged main save could lead directly to a fresh game. | Losing a large collection could be upsetting. | Retain a previous valid save; recover it with a notice. Damage to a temporary adventure alone does not discard the collection. | Automated main-save corruption, fallback recovery, two damaged copies, blocked storage, and invalid-adventure tests. |
| Some light-theme accent text and focus treatment lacked sufficient contrast. | Labels or focus could be hard to see. | Darker teal/gold text and focus outlines in light mode. | Key normal-text color pairs passed a 4.5:1 contrast assertion; light-theme browser walkthrough. |

## Catalog and pacing

All 100 animals are distinct catalog animals across the ten requested habitats, not outfit variants. Every habitat contains ten. Original SVGs share a friendly outline/palette system; locked cards use silhouettes. The book renders one habitat/category at a time, so it does not insert all 171 collectible illustrations into every screen.

One starter is immediate; each completed adventure supplies one friend ticket and one star per question. Any unowned animal costs one ticket. Guided practice pays equally. The selected animal joins at completion; the next target is predictable and can be changed. Base items cost 3–6 stars. Locked completion items say Habitat reward or All-animal reward rather than suggesting a disabled zero-star purchase. All 60 cost 268 stars together, less than the 297 stars earned while collecting the other 99 animals with the shortest session setting. Habitat and all-animal keepsakes are free completion rewards. Repeated claims, purchases, placement, and reward settlement cannot double-charge or duplicate ownership.

No timed events, rankings, daily obligations, neglect penalties, random-only unlocks, or unavailable future catalog entries were added. Animals and decorations stay permanently owned. All celebrations are ordinary screens with immediate navigation away; sound and movement remain optional.

## Three things to observe when Jazzy first plays

1. Without explaining the pictures first, see whether she identifies **Put together** and **Take away**.
2. See whether **Show me**, **Next picture**, and **I’m ready to answer** let her count and return to the answer without adult direction.
3. Watch whether choosing a target and welcoming one animal feels clear and satisfying, and whether she is comfortable stopping after an adventure.

These are things to observe and adapt around, not expected outcomes. Her preferences may differ from the design assumptions.

## Remaining limits

No actual child playtest was performed. Device-sized Chromium checks are not physical iPad/Safari tests. Screen-reader audio, home-screen installation, speech voices, and backup OS file-picker flows remain unverified end to end. The existing real save was retained; interaction tests used separate localhost origins. GitHub publishing was not performed. See `VERIFICATION.md` for the test record.
