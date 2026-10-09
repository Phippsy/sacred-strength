# Sacred Strength project site

A static site for Heather and Donal: the mission, the question we're answering, the next step, and all the background research.

## Pages

| File | What it is |
| --- | --- |
| `index.html` | Home: mission, question, next step and where we're heading |
| `guide.html` | Conversation guide for the next step |
| `plan.html` | How we'll test and adjust, timeline, assumptions, risks |
| `app.html` | App principles, mock-ups and the embedded prototypes |
| `research.html` | Conversations so far, problem space, competitors, science, privacy, sources |
| `prototypes.html` | Three clickable app prototypes (data stays in the visitor's browser) |

Shared styles and scripts live in `assets/`.

## Publish on GitHub Pages

1. Create a new public repository on GitHub, for example `sacred-strength`.
2. From this folder:
   ```
   git init
   git add .
   git commit -m "Sacred Strength project site"
   git branch -M main
   git remote add origin https://github.com/<your-username>/sacred-strength.git
   git push -u origin main
   ```
3. In the repository, go to **Settings → Pages**, choose **Deploy from a branch**, select `main` and `/ (root)`, and save.
4. After a minute the site is live at `https://<your-username>.github.io/sacred-strength/`.

Pages include `noindex`, so search engines are asked not to list them, but anyone with the link can view the site.

## Updating

- **Conversation counter:** in `index.html`, change `Conversations held · 0 of 8`, the matching `aria-label`, and add `class="done"` to one `<i>` per conversation held.
- **Status:** change the text of the `status` pill in `index.html` and `guide.html` (for example `Under way` or `Done`).
- **Last updated date:** in the footer of each page and the hero eyebrow on the home page.
