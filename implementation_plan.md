# Implementation Plan - Personal Profile Upgrade

## Goal
Transform the existing REST API demo into a fully functional Personal Profile Website using React, Bootstrap 5, and Supabase.

## Proposed Changes

### Dependencies
- Install `bootstrap`, `bootstrap-icons`
- Install `@supabase/supabase-js`

### Project Structure Refactoring
- Create `src/components` directory.
- Create `src/pages` directory (if multiple pages needed).
- Create `src/lib` for Supabase client.

### Components
#### [NEW] `src/components/Navbar.jsx`
- Bootstrap 5 responsive navigation.

#### [NEW] `src/components/Hero.jsx`
- Introduction section with personal details.

#### [NEW] `src/components/Projects.jsx`
- Showcase of projects (can fetch from Supabase or hardcoded array).

#### [NEW] `src/components/Comments.jsx`
- Interface to read and add comments.
- Connected to Supabase `comments` table.

#### [NEW] `src/lib/supabaseClient.js`
- Supabase configuration.

#### [MODIFY] `src/App.jsx`
- Assemble the components.
- Remove `jsonplaceholder` code.

### Vue.js Version (Future/Parallel)
- Initialize a new Vue project in a sibling directory if requested.

## Verification
- Manual verification of UI responsiveness.
- Verify Supabase connection for comments.
- Build check for deployment.
