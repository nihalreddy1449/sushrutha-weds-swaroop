# Sushrutha & Swaroop – Wedding Invitation Website

A plain HTML/CSS/JS site. No build step. Works on GitHub Pages.

## Publish on GitHub Pages
1. Create a public repo named `sushrutha-weds-swaroop`.
2. Upload all files from this folder (keep the `assets` folder).
3. Repo → Settings → Pages → Source: "Deploy from a branch" → `main` / root → Save.
4. The site appears at `https://nihalreddy1449.github.io/sushrutha-weds-swaroop/` in a minute or two.

## Change anything later
All text, dates, times, the phone number, links and photos are in **`content.js`**.
On github.com open `content.js` → click the pencil icon → edit → "Commit changes".
The live site updates in about a minute.

## Add photos
Upload images to `assets/photos/`, then add lines to `gallery` in `content.js`:
`{ src: "assets/photos/one.jpg", alt: { en: "The couple", te: "వధూవరులు" } },`

## Add music
Put an MP3 named `mangala-vadyam.mp3` in `assets/audio/` (or change the `music` path). Use a track you have the right to use, for example a royalty-free one from Pixabay Music. If the file is missing the music button hides itself.
