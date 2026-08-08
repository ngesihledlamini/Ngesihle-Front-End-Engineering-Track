# WORKFLOW.md — Vague vs. Precise Prompting Comparison

## Setup
Built the same feature (a user settings form: name, email, language, optional
password change, notification checkboxes) twice, in independent ChatGPT
sessions, on separate branches (`round1-vague`, `round2-precise`), off `main`.

**Round 1** used a single unqualified prompt: "Build a settings form with
validation." Output accepted as-is, no edits, no follow-up questions answered
beyond what the model asked on its own.

**Round 2** used a prompt specifying: vanilla HTML/CSS/JS split into three
files, exact field list and validation rules, blur-based validation timing,
required ARIA attributes (`aria-invalid`, `aria-describedby`, `role="alert"`),
focus management on failed submit, `autocomplete` on password fields, and a
self-verification step (write a manual test checklist, check the code against
it, fix failures before returning).

## Correctness
Round 1 shipped a hard bug: the email regex used escaped backslashes
(`\\s`, `\\.`) inside a JS regex literal, which match literal backslash
characters instead of whitespace/dot. Verified in DevTools console —
`/^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test("test@example.com")` returns `false`.
Every valid email is rejected. Round 2, using the browser's native
`email.validity.valid`, has no equivalent failure.

## Accessibility
Round 1 shows error text on failed submit but does not move focus — a user
has to scroll to find which field failed. No `aria-invalid`,
`aria-describedby`, or `role="alert"` anywhere, so screen reader users get no
signal that errors appeared. Round 2 moves focus to the first invalid field
on failed submit and wires every error message to its input via
`aria-describedby`, with `role="alert"` so errors are announced immediately.

## Edge cases
Both rounds correctly skip password validation when the password field is
left empty (a partial-update case). Round 2 additionally handles the
password/confirm-password relationship correctly if a user fills password,
then clears it — Round 1 was not tested against that sequence.

## Review effort
Round 1 took [X minutes] to prompt and accept, but the bug wasn't visible
until manual testing — meaning true "done" time includes debugging I hadn't
budgeted for. Round 2 took [X minutes] to write the prompt and review the
output, but needed no debugging: the model's own verification checklist
caught what it could, and manual spot-checks (empty submit, invalid email,
mismatched password) all passed on first try. Net, Round 2 was [faster/about
the same] end-to-end despite feeling slower upfront.

## AI mistake caught
The Round 1 email regex bug — a copy/escaping error that silently breaks the
core validation the form exists to do — was not visible from reading the
code casually. It only surfaced under manual testing in the browser console.
This is the clearest evidence in this drill that "accept AI output" and
"verify AI output" are different skills.