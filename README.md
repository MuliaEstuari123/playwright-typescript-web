# Playwright TypeScript Web Automation

End-to-end UI automation project built with [Playwright](https://playwright.dev/) and TypeScript, covering multi-step form flows, custom reporting, and secure credential management.

## Tech Stack

- **Playwright** — browser automation & test runner
- **TypeScript** — type-safe test scripts
- **pdf-lib** — auto-generate visual PDF reports from test-step screenshots
- **dotenv** — environment-based credential management

## Features

- **Multi-step form automation** — handles long, real-world forms with 20+ fields, including text inputs, searchable dropdowns, and date/time pickers
- **Reusable helper functions** — shared login and reporting utilities imported across multiple test files (DRY principle)
- **Automated visual reporting** — every key step captures a screenshot, which are compiled into a single PDF report at the end of each test run for easy review/documentation
- **Secure credential handling** — login credentials are never hardcoded; all sensitive values are loaded from a local `.env` file (excluded from version control)
- **Configurable timeouts** — global timeout set in `playwright.config.ts`, with per-test overrides (`test.setTimeout()`) for longer, more complex flows

## Project Structure

```
tests/
  ├── loginSandia.spec.ts       # Login + navigation helper (reusable)
  ├── loginOPEX.spec.ts         # Login helper for OPEX module
  ├── listOrderNMC.spec.ts      # End-to-end order creation flow
  ├── PengaturanDanaOpex.spec.ts
  ├── ScreenshotsToPdf.ts       # Reusable screenshot-to-PDF helper
  └── ...
playwright.config.ts
tsconfig.json
.env                            # (not committed) local credentials
```

## Setup

1. Clone the repo and install dependencies:
   ```bash
   npm install
   ```

2. Create a `.env` file in the project root with your own credentials:
   ```
   SANDIA_EMAIL=your_email
   SANDIA_PASSWORD=your_password
   OPEX_EMAIL=your_email
   OPEX_PASSWORD=your_password
   ```

3. Run a specific test:
   ```bash
   npx playwright test listOrderNMC.spec.ts
   ```

4. View the HTML report:
   ```bash
   npx playwright show-report
   ```

Generated PDF reports (per test run) are saved under `test-results/report/`.

## Notes

This is a personal QA automation portfolio project, adapted from real-world testing workflows (with all sensitive/internal details removed or replaced with dummy data).
