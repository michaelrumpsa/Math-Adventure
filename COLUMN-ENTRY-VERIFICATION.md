# Column entry and Elevator update

This report covers the current update. Older review reports describe earlier releases.

## Implemented

- Separate place-value answer boxes, selected ones first. One key press writes one digit in the selected box. Empty is distinct from zero; no answer digits are filled automatically.
- Correct digits advance left. Incorrect digits stay available to revise. Editing/clearing a lower column clears all dependent columns and recalculates carry visibility. The keypad and physical keyboard share the same entry function.
- Addition uses standard column carrying. A carry appears only after the lower column is correct. Carry explanations use ones/tens or tens/hundreds as appropriate. There is no addition compensation or make-ten solving sequence.
- Subtraction automatically displays the Elevator only if a digit column requires regrouping. Original and adjusted equations remain visible. There is no Make it easier button or separate compensation screen.
- Equal positive or negative changes are allowed. Guided mode mirrors an entered change; independent mode checks both signed changes. Empty, mismatched, excessive, and negative-operand changes cannot start solving. A difference-preserving change that still needs regrouping is acknowledged and needs revision. Nothing silently borrows.
- Adjustment amounts are never supplied automatically. Hints suggest a genuinely useful round target, including cases such as 100 − 1 where making the second operand 10 is insufficient.
- Changing an applied adjustment clears column work and explains the reset. Applying it again unchanged preserves work. Only the completed full answer records learning progress; session completion awards rewards once.
- Existing collection/save IDs are unchanged. Partial digits, selected column, visual stage, and Elevator changes survive reload. Legacy whole-answer saves are accepted and rechecked against the current problem.
- The parent-selected 100 range permits addition of operands through 100, so results through 200 can exercise a new hundreds column. Within-10 and within-20 generation retain their existing result limits.

## Automated checks

Run `node test.cjs`, `node collection.test.cjs`, and `node columns.test.cjs` from this directory.

- 54,000 generated problems, respecting the configured bounds and correct arithmetic.
- 1,035,351 signed equal-change cases: answer preserved; negative operands and mismatches rejected.
- 13,228 column problems, including zeros, equal subtraction, and results through 200. Every entered digit matches its column calculation; clearing ones invalidates dependent work.
- All six requested examples: 81 − 32 (+8 → 89 − 40 → 49); 86 − 32 (54, no Elevator); 70 − 26 (+4 → 74 − 30 → 44); 27 + 35 (62 with carry); 23 + 14 (37 without carry); 58 + 67 (125 with two carries).
- Useful positive adjustment hints exist for every regrouping subtraction through 100, within the permitted adjustment amount.
- Incorrect/empty digits, selecting higher columns first, editing earlier digits, clearing, repeated Apply/submit/advance, no reward for applying changes, full-session reward idempotency, partial and completed answer reload, migrations and damaged saves.
- Collection regression checks retain all 100 animals, 71 items, unique IDs/artworks, obtainability, favorites/layout persistence, and 30,906 accurate visual states.

## Browser checks

Used the actual running app in Chromium through browser automation. Deterministic examples ran in a separate test origin, with a test-only problem generator, leaving the user's saved progress untouched.

- Played every requested example using the visible keypad and keyboard. Observed no premature carry after an incorrect ones digit; carry 1 appeared after 2 for 27 + 35. For 58 + 67, verified two carries and restored partial 25 with hundreds still empty after reload, then completed 125.
- Entered +8 and −2 for 81 − 32. Both produced friendly subtractions with answer 49. Changing an adjustment reset existing ones work.
- Entered zero, mismatched +8/+7, and −33/−33. Zero preserved the difference but was flagged as still needing help; mismatches and negative operands were blocked with explanations.
- Completed a three-question session and double-clicked Continue: exactly three stars and one new animal were awarded. No award was made for applying adjustments or finishing an individual column.
- Checked 320×740 and 390×844 phones, 768×1024 iPad portrait, 1024×768 iPad landscape, and 1440×900 desktop. No horizontal overflow. Elevator stacked directly below the original equation on phones and appeared to its right on wider views. Answer boxes were at least 48×62 pixels, aligned at the same horizontal centers as operand digits.
- Original/adjusted counter quantities matched their labels and every grid retained exactly ten columns. Motion-off presentation worked without animation. Console showed no errors or warnings.

These are software checks and a simulated learner walkthrough, not testing with Jazzy. No physical iPad, Safari, or screen-reader listening test was available. Earlier release reports retain their own test scope; they are not claims about new physical-device testing.
