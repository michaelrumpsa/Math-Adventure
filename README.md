# Jazzy’s Math Adventure — Animal World edition

A complete static addition-and-subtraction game with a cozy cabin, illustrated math, 100 animal friends, and 71 collectible items. No accounts, backend, ads, real-money purchases, analytics, or third-party assets. Artwork is original inline SVG.

## Run locally

Keep all app files together and open `index.html` in a modern browser. For reliable local saves and offline caching, serve this folder instead:

```sh
python -m http.server 8000
```

Open **http://localhost:8000**. No package installation or build is needed. Direct `file:` play supports the core game, but storage behavior varies by browser and service workers do not work from files.

## Publish on GitHub Pages

1. Copy the app files into your repository root: `index.html`, `style.css`, `math.js`, `catalog.js`, `collection.js`, `pictures.js`, `app.js`, `sw.js`, `icon.svg`, and `manifest.webmanifest`. Include `.nojekyll` if desired. Documentation and tests are optional on the hosted site.
2. In **Settings → Pages**, choose **Deploy from a branch**, your main branch, and **/(root)**.
3. Open GitHub’s supplied HTTPS address, usually `https://YOUR-NAME.github.io/YOUR-REPOSITORY/`.

There are no client-side URL routes or absolute asset URLs. Repository subdirectories work; this was tested with a `/jazzy/` prefix. Offline caches are scoped to the installed app path, avoiding cache cleanup across different repository paths. Exported progress backups should not be committed to a public repository. This delivery has not been published to GitHub.

## Play and learn

The top of the home screen has **Play math** (or **Continue my adventure**) and **My collection**. Large illustrated activity buttons also let Jazzy choose:

- **Addition — Put together:** two bunny groups become one.
- **Subtraction — Take away:** some bunnies leave and others remain.
- **Mixed adventure:** both operations.

All questions are vertical, with aligned hundreds, tens, and ones. Each answer has a separate box per place value. Ones is selected first. Each key enters one digit, and a correct digit advances left. Tap a box to edit it. Zero stays visible; an empty box stays empty. Use the single number pad, Backspace, Clear, and Check column. Clearing or changing a lower column resets dependent columns and carries. A physical keyboard also works: digits, Backspace, and Enter on the answer/change field; Tab and Enter operate ordinary buttons. Focus stays visible through edits and tab navigation.

Solve it starts with an independent question. **Show me** opens a three-picture explanation: starting groups, the action, and the result to count. Pictures never automatically print the final answer. Subtraction marks exactly the requested number, then separates **Taken away** from **Still here**. Every full row has ten, including on phones; partial rows begin at the left. Starting quantities and removed quantities are labeled, while the remaining/combined answer is left for Jazzy to count. Zero and equal-number subtraction are supported. **Replay pictures** starts the explanation again without erasing an answer. **I’m ready to answer** returns to the answer box and nearby keypad.

Show me mode opens the starting picture, not a worked answer. Practice a strategy opens visual support alongside column solving. Addition uses standard carrying: a correct ones digit reveals any carry into tens, and a correct tens digit reveals any carry into hundreds. Hints strengthen on request. Incorrect answers are calm and cost nothing. After repeated difficulty, the game provides a column hint, then that column’s digit, and lets Jazzy enter it and continue. Completing guided practice earns the full reward. The first question is deliberately easy; progression considers several answers, never speed.

### Subtraction compensation only

The compact **Elevator** automatically appears beside subtraction when a column needs regrouping, and immediately below it on narrow screens. It is absent for subtraction with no regrouping. There is no separate compensation screen or Make it easier button. It changes both operands by the same signed amount. For example, adding 3 to both operands turns 75 − 7 into 78 − 10. Both answers are 68. Subtracting equally is allowed when neither operand becomes negative.

Each operand has a direction selector, a change field, and a preview. Tap either field to select it for the existing number pad. Guided mode mirrors the other change; independent mode checks both. Apply validates the transformation without recording an answer, completing a question, or earning rewards. Repeated Apply does not erase an answer. A change that preserves the difference but still needs regrouping (including zero) is acknowledged and needs revision before column solving. Adjustment hints find a useful round target; amounts and answers are never filled automatically. Changing an applied adjustment clears earlier column work with an explanation.

The original and adjusted vertical problems remain visible. Their pictures are separate, clearly labeled comparisons of both operands, not a take-away animation. Added counters are outlined; optional motion highlights them once. Solve the adjusted problem one digit at a time. Completing it connects the same answer back to the original problem. Addition has no compensation controls or number transfers. The removed rounding-and-adjusting-the-answer strategy is not used.

## Collecting

The released catalog contains **100 distinct animals in ten habitats, ten per habitat**: Farm, Forest, Jungle, Safari, Ocean, Arctic, Desert, Wetlands, Mountains, and Australian wildlife. See `CATALOG.md` for the complete list.

Maple the fox is available immediately. Every completed adventure earns **one friend ticket**, and every animal costs **one ticket**. The selected target joins automatically at session completion; a saved ticket can also welcome any chosen locked animal from the collection book, then take Jazzy directly to its habitat. The first new animal therefore arrives after one adventure. With the starter included, 99 adventures can collect all 100 animals. No random-only unlocks, duplicates, daily requirements, expiring animals, or perfect-answer requirements exist.

The book has habitat tabs, colored owned animals, locked silhouettes, per-habitat progress, total counts, an earning explanation on each card, and **Work toward this animal**. The target picture and ticket progress appear after sessions. During questions, only a small target-name reminder is shown. Decorations and collection browsing stay outside the math screen.

There are **60 base decorations/accessories**, plus **ten habitat-completion keepsakes** and **one all-animal completion keepsake**, for **71 released items**. Base items cost 3–6 stars, with one star per completed question awarded at adventure completion. Original rug, fern, scarf, lamp, and picture ownership is preserved. The base catalog costs 268 stars in total; even 99 three-question adventures earn enough for every base item. Keepsakes are awarded automatically when their animal collections are complete, and can be placed like other decorations.

Visit an animal in its habitat. Choose an owned decoration, then tap one of six generous placement spots. Repeated placement in the same spot does not remove the item or charge again. **Clear a spot** puts it away without losing ownership. Habitat layouts are shared by residents of that habitat. Accessories are worn by the selected animal, remain owned when replaced, and can be used on other collected friends. One accessory is shown per animal at a time. The original companion nicknames Maple, Clover, and Luna remain associated with their species.

Favorite animals appear on the home screen and in the book’s **My favorites** section. Care is positive and optional: no hunger, sickness, neglect penalties, or disappearance. Finishing each habitat grants its keepsake. Collecting all animals gives a calm completion message and the sanctuary keepsake. Finish screens can be left immediately; completed worlds remain available to visit and decorate.

## Parent settings

Choose **Parent** and type **GROWNUP**. This is a convenience barrier, not authentication.

Settings cover the default adventure, fixed ranges within 10/20/100 or gentle automatic progression, whether Elevator changes mirror by default, 3/5/10 questions, sound, motion, and theme. Sound and motion start off. The system’s reduced-motion preference overrides animation even when motion is enabled. Read-aloud uses browser/device speech when available; every instruction is also text. Voice availability and offline speech depend on the device.

Automatic progression starts within 10 and may move to 20 after at least eight of the last ten answers were independently correct on the first attempt. Several answers needing repeated help return it to 10. Two-digit practice within 100 requires a parent’s selection. Within-10 and within-20 results respect their range. The parent-selected 100 range allows addition operands through 100 and results through 200, so carrying into hundreds is available. Subtraction is nonnegative. Workspace adjustment amounts cannot exceed the adventure’s range; adjusted operands may extend to twice that range. This allows equal shifts without introducing unexpected hundreds during within-10 practice.

The summary covers independent/guided answers and skills needing practice over the most recent 500 answers. Independently counting with optional pictures may count as independent; guided steps or revealed answers count as guided. Rewards never depend on this distinction. Settings changes apply to new adventures; a resumed adventure keeps its original range and mode, labeled on the Resume button.

## Saves, resume, and migration

Version **2** saves retain the original localStorage key `jazzy-adventure-v1` so the existing origin’s progress continues to load. Version 1 saves and backups are accepted and migrated without changing stars, completed sessions, history, earned animals, or items. The removed rounding preference maps to equal-change subtraction. Previously completed adventures are credited as friend tickets. Existing decorations move into the selected companion’s habitat, and accessories remain equipped. A pre-migration copy is retained locally.

An unfinished adventure now saves its problem, individual answer digits, selected column, visual stage, Elevator changes, and whether its answer was already completed. Leaving returns home with a Resume button. Starting a different activity asks whether to keep going or start fresh. Reloading an already-correct answer cannot count it twice. Sessions use a reward ledger to prevent repeated awards. A damaged unfinished-adventure record is discarded without discarding a valid collection.

The app retains a previous valid save as a recovery copy. If the current save is damaged, it attempts to load that copy and explains recovery. If neither copy can be read, it opens a fresh home with a notice. Storage failures show a parent-backup reminder. Confirmed reset clears the local main save and recovery/migration copies before starting over.

Progress is local to the browser/device and origin. Clearing browser data can still remove it. Changing from localhost to GitHub Pages, changing browsers, or moving devices requires exporting a JSON backup and importing it at the destination. Parent settings provide export/import and a reset requiring **RESET**. Import validates the save and asks before replacing progress. There is no cloud sync or collection of personal information.

## Offline and installation

HTTPS and localhost support offline caching after a successful load. Reload once online before depending on it. Offline reload and collection navigation were verified with the local server stopped, including a repository-style subdirectory. On iPad, Safari’s **Share → Add to Home Screen** can install the app. Installation, SVG icon treatment, and speech support vary by browser; ordinary browser play does not require installation.

## Test and maintain

```sh
node test.cjs
node collection.test.cjs
node columns.test.cjs
```

These checks require only Node.js. They cover generated arithmetic, equal shifts, picture quantities, catalogs and artwork IDs, full obtainability, costs, ownership, placements, favorites, migrations, recovery, resume, duplicate protection, and key text contrast. Current column-solving findings and limits are in `COLUMN-ENTRY-VERIFICATION.md`. Earlier-release browser findings are in `VERIFICATION.md`; the simulated child-perspective review is in `REVIEW.md`.

The app is data-driven. `catalog.js` owns habitat/animal/item entries, artwork, and reward configuration. Keep existing IDs stable, add appropriate SVG artwork for a new species/item, and do not rewrite unlock or math logic. `collection.js` computes totals from the catalog, manages ownership/tickets/items, and renders the collection/habitat screens. Unknown safe catalog IDs in a save are retained for compatibility. `pictures.js` holds operation-picture models and rendering; `math.js` holds arithmetic; `app.js` coordinates sessions and parent settings. Increment the service-worker cache version when releasing updates.

## Verification limits

This was software testing and a simulated child walkthrough, not testing with Jazzy. Chromium browser checks covered phones, iPad-sized portrait/landscape viewports, and desktop; no physical iPad or Safari hardware was available. Screen-reader listening, the operating system’s backup file picker, browser speech voices, and home-screen installation were not tested end to end. Core play, collection use, saves, resume, and offline reload were tested. No known core feature is intentionally left as a placeholder.
