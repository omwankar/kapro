<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

## Design
- Landing page (src/routes/index.tsx) uses framer-motion for all scroll animation: hero parallax, reveal-on-scroll, sticky horizontal journey rail, and uses the Karpo brand tokens (navy/gold/cream/crimson) defined in src/styles.css. Keep new styling token-based.
