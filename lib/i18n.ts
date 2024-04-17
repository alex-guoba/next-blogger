import { getRequestConfig } from "next-intl/server";

// The localisation files are synced with Crowdin using GitHub Actions.
// By default, there are 3 ways to sync the message files:
// 1. Automatically sync on push to the `main` branch
// 2. Run manually the workflow on GitHub Actions
// 3. Every 24 hours at 5am, the workflow will run automatically

// Using internationalization in Server Components
export default getRequestConfig(async ({ locale }) => ({
  messages: (await import(`../locales/${locale}.json`)).default,
}));
