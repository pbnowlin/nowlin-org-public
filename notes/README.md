# Notes

This is a static, local-first notes app. Notes and folders are stored in the browser's local storage; data is not encrypted at rest. JSON backups can optionally be encrypted before export.

The generated `notes.css` is checked in so static hosting does not need a build step. To regenerate it after changing Tailwind classes, run:

```sh
npm ci
npm run build:css
```