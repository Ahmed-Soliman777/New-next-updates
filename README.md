# Next.js 16 — What’s New & What Changed 🚀

## 📥 Version  

**Next.js 16** — stable release (Oct 21, 2025)   

## 🎯 Key Features & Improvements  

### • Turbopack by Default  
- The Rust-based bundler **Turbopack** is now the default bundler for all new Next.js projects.   
- Expect significantly improved build performance: up to **10× faster Fast Refresh** and **2–5× faster production builds**.   
- Optionally, you can still revert to Webpack (`next dev --webpack`, `next build --webpack`) if needed. 

### • Explicit Caching with “Cache Components”  
- Introduces a new caching model: **Cache Components** via the `use cache` directive, giving you explicit control over what gets cached.   
- Built on top of previous Partial Pre-Rendering (PPR), letting you mix static and dynamic parts in the same page — fast initial load + up-to-date data.   
- Improved caching APIs: new `updateTag()`, `refresh()`, and refined `revalidateTag()` to better manage revalidation and cache invalidation.   

### • Built-in React Compiler Support  
- Stable support for the **React Compiler**: automatically memoizes components to reduce unnecessary re-renders — fewer manual optimizations required.   

### • Enhanced Routing & Navigation  
- Routing improvements including **layout deduplication** and **incremental prefetching**: shared layouts load once, and only needed parts of pages are prefetched.   
- Smoother, faster page transitions with less redundant network or rendering overhead.  

### • Build Adapters API (Alpha)  
- New **Build Adapters API** allows customizing build output or adapt Next.js to various environments (e.g. custom hosting, non-default infrastructures).

### • Updated React / Ecosystem Support  
- Next.js 16 supports latest features from React 19 — e.g. `View Transitions`, `useEffectEvent()`, `<Activity />` for smoother UI behavior.  
- Default project setup (via `create-next-app`) is now more streamlined: includes App Router, TypeScript-first configuration, and sensible defaults for modern development.  

## ⚠️ Breaking Changes & Removals  

- Minimum required Node.js version raised to **20.9.0 (LTS)** or later; minimum TypeScript version is now **5.1.0+**.  
- **AMP support removed** — the deprecated AMP standard is no longer supported (`useAmp`, `amp: true` configs dropped).  
- The old `middleware.ts` file has been replaced by a new **`proxy.ts`** approach for middleware — migrating existing middleware may require updates.
- Default behavior and config defaults (e.g. image defaults, async route params / searchParams behavior) have changed — refer to the official changelog and migration guide.  

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
