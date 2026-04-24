# Task 2: Fix Technical Issues

## Agent: Fix Agent

### Issues Addressed:

#### Issue 1: ThemeToggle Hydration Mismatch (HIGH PRIORITY) ✅
- **File:** `/home/z/my-project/src/app/page.tsx` (lines 344-368)
- **Problem:** Server rendered `<div className="w-9 h-9" />` but client rendered `<button>...</button>`, causing React hydration mismatch error.
- **Fix:** Changed ThemeToggle to always render a `<button>` element regardless of `mounted` state. When not mounted, renders `<div className="w-5 h-5" />` inside the button as placeholder. Added `suppressHydrationWarning` to the button element.
- **Key change:** Removed `if (!mounted) return <div .../>` early return. Now always returns `<button>` with conditional content inside.

#### Issue 2: Arabic Font Change ✅
- **File:** `/home/z/my-project/src/app/layout.tsx`
  - Changed import from `Noto_Naskh_Arabic` to `Amiri`
  - Renamed variable from `notoNaskhArabic` to `amiri`
  - Updated weights from `["400", "500", "600", "700"]` to `["400", "700"]` (Amiri only supports 400 and 700)
  - Updated body className to use `${amiri.variable}` instead of `${notoNaskhArabic.variable}`
- **File:** `/home/z/my-project/src/app/globals.css`
  - Updated font-family fallback from `"Noto Naskh Arabic"` to `"Amiri"` in the RTL font-family rule

#### Issue 3: Arabic-Indic Numerals Check ✅
- **Result:** No Arabic-Indic numerals (٠١٢٣٤٥٦٧٨٩) found anywhere in the project source files.
- **Action:** No changes needed. The Arabic text in the project consists of Arabic letters (with tashkil/diacritics) for Quranic verses and prayers, not Arabic-Indic numerals.

### Verification:
- ESLint: 0 errors, 0 warnings
- Dev log: Latest compilations successful, HTTP 200 responses, no hydration errors after fix
