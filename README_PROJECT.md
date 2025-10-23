# project - live link 
[preview live app](https://react-plp.netlify.app/)

# React Frontend — Project Documentation

This repository contains a small React front-end project focusing on JSX, components, and Tailwind styling. This README documents how to run the project, developer workflow, and how the theme (dark/light) toggle works.

## Quick start

1. Install dependencies:

```bash
npm install
```

2. Start the dev server (Vite):

```bash
npm run dev
```

3. Open the URL shown by Vite (usually http://localhost:5173).

## Available scripts

- `npm run dev` - start Vite dev server
- `npm run build` - build production files
- `npm run preview` - preview built files
- `npm run lint` - run ESLint

## Project structure (important files)

- `index.html` — application entry. You may find a small pre-hydration script here to apply the saved theme (dark) before React mounts.
- `src/main.jsx` — React entrypoint.
- `src/index.css` — Tailwind + base styles.
- `src/components/` — UI components. Notable files:
  - `Navbar.jsx` — responsive navigation (desktop + mobile hamburger).
  - `TaskManager.jsx` — main demo app component with tasks, filters, and dark-mode toggle.
  - `Footer.jsx` — responsive footer.
  - `Button.jsx` — shared button component.

## Theme (Dark / Light) behavior

This project uses TailwindCSS utility classes with `dark:` variants in components. For `dark:` utilities to work you need two pieces:

1. Tailwind should be configured to use class-based dark mode (`darkMode: 'class'`) in `tailwind.config.js` or `tailwind.config.cjs`.
2. The document root must have the `dark` class when dark mode is active (e.g., `document.documentElement.classList.add('dark')`).

There are two ways to ensure this works without flashes (FOUC):

- A tiny pre-hydration script in `index.html` reads `localStorage.darkMode` and applies `document.documentElement.classList.add('dark')` before React mounts. This avoids a visible theme flash.
- A centralized hook (e.g., `src/hooks/useTheme.js`) that reads/writes `localStorage.darkMode` and toggles the `dark` class on the root element so components can call `setIsDark(true/false)`.

If dark mode isn't working for you, verify:

1. `tailwind.config.*` includes `darkMode: 'class'` and `content` paths include `./src/**/*.{js,jsx,ts,tsx,html}`.
2. `src/index.css` contains the appropriate Tailwind directives for your Tailwind version. Tailwind v4 uses `@import 'tailwindcss/preflight'` and `@tailwind utilities`.
3. The pre-hydration script (if present) uses the same localStorage key (`darkMode`) as any theme hooks in code.

## How to add/use the theme hook

If the repo includes `src/hooks/useTheme.js(x)` you can import and use it in any component:

```jsx
import useTheme from '../hooks/useTheme'

const [isDark, setIsDark] = useTheme()

<button onClick={() => setIsDark(v => !v)}>{isDark ? 'Light' : 'Dark'}</button>
```

The hook should persist the preference in `localStorage.darkMode` and toggle the `dark` class on the `document.documentElement`.

## Troubleshooting

- If you see a flash of wrong theme on load: ensure a pre-hydration script is present in `index.html` and uses the same storage key as your hook.
- If `dark:` classes have no effect: confirm `tailwind.config.*` contains `darkMode: 'class'` and Vite restarted after changes.
- If Link errors occur in console: ensure you render `<Link>` only inside a `<BrowserRouter>` (react-router). For quick fixes, change `<Link>` to `<a>` when Router isn't mounted.

## Next steps / improvements

- Centralize theme behavior: create one `useTheme` hook and replace ad-hoc toggles to avoid inconsistencies.
- Add a small toggle in the Navbar that uses `useTheme`.
- Add unit tests for the theme hook and `useLocalStorageTasks` hook.

If you'd like, I can implement any of the above automatically (add hook, pre-hydration script, tailwind config) and start the dev server to verify. Tell me which step you'd like me to take next.
