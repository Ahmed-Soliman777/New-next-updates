# Next.js 16 — What’s New & What Changed 🚀

## 📥 Version  

**Next.js 16** — stable release (Oct 21, 2025) :contentReference[oaicite:1]{index=1}  

## 🎯 Key Features & Improvements  

### • Turbopack by Default  
- The Rust-based bundler **Turbopack** is now the default bundler for all new Next.js projects. :contentReference[oaicite:2]{index=2}  
- Expect significantly improved build performance: up to **10× faster Fast Refresh** and **2–5× faster production builds**. :contentReference[oaicite:3]{index=3}  
- Optionally, you can still revert to Webpack (`next dev --webpack`, `next build --webpack`) if needed. :contentReference[oaicite:4]{index=4}

### • Explicit Caching with “Cache Components”  
- Introduces a new caching model: **Cache Components** via the `use cache` directive, giving you explicit control over what gets cached. :contentReference[oaicite:5]{index=5}  
- Built on top of previous Partial Pre-Rendering (PPR), letting you mix static and dynamic parts in the same page — fast initial load + up-to-date data. :contentReference[oaicite:6]{index=6}  
- Improved caching APIs: new `updateTag()`, `refresh()`, and refined `revalidateTag()` to better manage revalidation and cache invalidation. :contentReference[oaicite:7]{index=7}  

### • Built-in React Compiler Support  
- Stable support for the **React Compiler**: automatically memoizes components to reduce unnecessary re-renders — fewer manual optimizations required. :contentReference[oaicite:8]{index=8}  

### • Enhanced Routing & Navigation  
- Routing improvements including **layout deduplication** and **incremental prefetching**: shared layouts load once, and only needed parts of pages are prefetched. :contentReference[oaicite:9]{index=9}  
- Smoother, faster page transitions with less redundant network or rendering overhead. :contentReference[oaicite:10]{index=10}  

### • Build Adapters API (Alpha)  
- New **Build Adapters API** allows customizing build output or adapt Next.js to various environments (e.g. custom hosting, non-default infrastructures). :contentReference[oaicite:11]{index=11}  

### • Updated React / Ecosystem Support  
- Next.js 16 supports latest features from React 19 — e.g. `View Transitions`, `useEffectEvent()`, `<Activity />` for smoother UI behavior. :contentReference[oaicite:13]{index=13}  
- Default project setup (via `create-next-app`) is now more streamlined: includes App Router, TypeScript-first configuration, and sensible defaults for modern development. :contentReference[oaicite:14]{index=14}  

## ⚠️ Breaking Changes & Removals  

- Minimum required Node.js version raised to **20.9.0 (LTS)** or later; minimum TypeScript version is now **5.1.0+**. :contentReference[oaicite:15]{index=15}  
- **AMP support removed** — the deprecated AMP standard is no longer supported (`useAmp`, `amp: true` configs dropped). :contentReference[oaicite:16]{index=16}  
- The old `middleware.ts` file has been replaced by a new **`proxy.ts`** approach for middleware — migrating existing middleware may require updates. :contentReference[oaicite:17]{index=17}  
- Default behavior and config defaults (e.g. image defaults, async route params / searchParams behavior) have changed — refer to the official changelog and migration guide. :contentReference[oaicite:18]{index=18}  

## 🛠 Recommended Upgrade Steps  

```bash
# 1. Update project dependencies
npm install next@latest react@latest react-dom@latest

# 2. Update minimum environment requirements
#    Ensure Node.js ≥ 20.9, TypeScript ≥ 5.1

# 3. Review caching logic:
#    - Use `use cache` where appropriate
#    - Replace deprecated cache/revalidation patterns with `updateTag()`, `revalidateTag()`, `refresh()` as needed

# 4. Migrate middleware:
#    - Rename any `middleware.ts` to `proxy.ts`
#    - Adjust logic for any custom middleware

# 5. Test routing & dynamic params:
#    - Ensure async params / searchParams are handled correctly
#    - Re-test image loading and defaults if using next/image

# 6. (Optional) Use Turbopack and React Compiler:
#    - Enjoy faster builds and automatic memoization
