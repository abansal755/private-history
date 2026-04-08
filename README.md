# Private History

Private History is a Chrome extension that records browsing activity from incognito windows and lets you review it later in a dedicated options page. It also lets you save favourite entries, restore closed private sessions, and export or import your local data.

## Features

- Records pages visited in incognito windows
- Groups private tabs into reopenable sessions
- Saves favourite entries from history
- Searches and sorts history and favourites
- Exports and imports extension data as JSON
- Includes a settings page and an about page inside the extension UI

## Tech Stack

- Chrome Extension Manifest V3
- React 18
- Material UI
- React Query v3
- Webpack 5

## Project Structure

```text
src/
  background/   Background service worker and storage/cache logic
  options/      React app for history, favourites, sessions, settings, and about
  popup/        Small popup that redirects to the options page
public/
  manifest.json Extension manifest and static assets
build/          Generated build output after bundling
```

## Prerequisites

- Node.js
- npm
- Google Chrome

## Install Dependencies

```bash
npm install
```

## Development

Start the webpack watcher:

```bash
npm run dev
```

This builds the extension into the `build/` directory and rebuilds it whenever source files change.

If you want a one-off production build instead:

```bash
npm run build
```

## Load The Extension In Chrome

1. Run a build so the `build/` directory exists.
2. Open `chrome://extensions`.
3. Enable `Developer mode`.
4. Click `Load unpacked`.
5. Select the `build/` directory from this repo.
6. Open the extension details page and enable `Allow in Incognito`.

That last step is required for end-to-end testing because the extension only records tabs when the tab is incognito.

## End-To-End Test Flow

1. Open an incognito window in Chrome.
2. Visit a few websites.
3. Click the extension icon.
4. The popup opens the extension options page.
5. Verify the visited pages appear in `History`.
6. Verify the session appears in `Sessions`.
7. Try adding a history item to `Favourites`.
8. Try exporting and importing data from `Settings`.

After making code changes, rebuild or let `npm run dev` rebuild automatically, then click `Reload` for the extension in `chrome://extensions`.

## Available Scripts

```bash
npm run dev
```

Runs webpack in watch mode for development.

```bash
npm run build
```

Creates a production build in `build/`.

```bash
npm run serve
```

Serves the options UI with webpack-dev-server. This is useful for UI iteration, but it is not a replacement for testing the actual extension inside Chrome.

## Data And Privacy

This extension is built to persist browsing data from incognito windows into `chrome.storage.local` so it can be reviewed later. That means:

- Incognito history is intentionally stored locally by the extension
- Exported backups contain that data in JSON form
- Imported backups overwrite the current stored extension data

If you use this project personally or share it with others, make sure that behavior is understood before enabling it in incognito mode.

## Notes

- The popup does not contain the main UI; it redirects to the options page.
- The extension currently has no automated test suite or lint script.
- The generated `options.js` bundle is relatively large, so there is room for future optimization.

## Author

Built by Akshit Bansal.
