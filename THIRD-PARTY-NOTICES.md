# Third-party notices

Generated 2026-11-19 by `node scripts/third-party-notices.mjs` (uses `license-checker` over the installed production dependencies, 275 packages). **Not legal advice.** This file is for the owner's review; it is a starting inventory, not a legal opinion.

The project's own code is proprietary (see `docs/buyer/LICENCE-STATUS.md`); no open-source licence has been applied to it. The packages below keep their own licences. Their licence texts ship inside each package in `node_modules` (installed with `bun install`) and are not copied into this repository. The production build bundles parts of these packages into the site's JavaScript. MIT, ISC, BSD and Apache-2.0 licences require the copyright notice and licence text to travel with copies of the software; if you distribute the built bundle, keep the notices (this file plus the licence texts from `node_modules`, or a bundler licence-comment plugin).

## Summary by licence

| Licence | Packages |
| --- | --- |
| MIT | 235 |
| ISC | 19 |
| MPL-2.0 | 6 |
| BSD-3-Clause | 5 |
| Apache-2.0 | 4 |
| Python-2.0 | 1 |
| CC-BY-4.0 | 1 |
| Unlicense | 1 |
| 0BSD | 1 |
| BSD-2-Clause | 1 |
| MIT AND ISC | 1 |

No GPL, AGPL, LGPL, SSPL or "unknown" licence appears in the production set at generation time. Re-run the script after any dependency change and re-check this statement.

## Notable licences (not plain MIT or ISC)

- **MPL-2.0** (`lightningcss` and its platform binaries): file-level copyleft. Used unmodified as build tooling; if you modify and distribute those files, MPL-2.0 source-sharing duties apply to those files.
- **Apache-2.0** (for example `class-variance-authority`, `typescript`, `detect-libc`, `baseline-browser-mapping`): keep the licence and NOTICE text if you redistribute.
- **BSD-2/3-Clause**, **0BSD**, **Unlicense**, **Python-2.0** (`argparse`): permissive.
- **CC-BY-4.0** (`caniuse-lite`, browser-support data): requires attribution; the notice is in the package.
- **MIT AND ISC** (`victory-vendor`, bundled d3 pieces): both notices apply.

| Package | Licence | Copyright line found in the package licence file |
| --- | --- | --- |
| argparse@2.0.1 | Python-2.0 | i.e., "Copyright (c) 2001, 2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010, |
| baseline-browser-mapping@2.11.4 | Apache-2.0 |  |
| caniuse-lite@1.0.30001806 | CC-BY-4.0 |  |
| class-variance-authority@0.7.1 | Apache-2.0 | Copyright 2022 Joe Bell |
| d3-ease@3.0.1 | BSD-3-Clause | Copyright 2010-2021 Mike Bostock |
| detect-libc@2.1.2 | Apache-2.0 |  |
| diff@8.0.4 | BSD-3-Clause | Copyright (c) 2009-2015, Kevin Decker <kpdecker@gmail.com> |
| isbot@5.2.1 | Unlicense | In jurisdictions that recognize copyright laws, the author or authors |
| lightningcss-linux-x64-gnu@1.32.0 | MPL-2.0 |  |
| lightningcss-linux-x64-gnu@1.33.0 | MPL-2.0 |  |
| lightningcss-linux-x64-musl@1.32.0 | MPL-2.0 |  |
| lightningcss-linux-x64-musl@1.33.0 | MPL-2.0 |  |
| lightningcss@1.32.0 | MPL-2.0 |  |
| lightningcss@1.33.0 | MPL-2.0 |  |
| react-transition-group@4.4.5 | BSD-3-Clause | Copyright (c) 2018, React Community |
| source-map-js@1.2.2 | BSD-3-Clause | Copyright (c) 2009-2011, Mozilla Foundation and contributors |
| source-map@0.7.6 | BSD-3-Clause | Copyright (c) 2009-2011, Mozilla Foundation and contributors |
| tslib@2.8.1 | 0BSD |  |
| typescript@5.9.3 | Apache-2.0 |  |
| uri-js@4.4.1 | BSD-2-Clause | Copyright 2011 Gary Court. All rights reserved. |
| victory-vendor@36.9.2 | MIT AND ISC |  |

## Fonts and other non-npm material

| Item | Licence | Where the licence text is |
| --- | --- | --- |
| Fraunces (Copyright 2018 The Fraunces Project Authors) | SIL Open Font License 1.1 | `design/brand/fonts/OFL-Fraunces.txt` |
| DM Sans (Copyright 2014 The DM Sans Project Authors) | SIL Open Font License 1.1 | `design/brand/fonts/OFL-DMSans.txt` |
| Caveat (Copyright 2014 The Caveat Project Authors) | SIL Open Font License 1.1 | `design/brand/fonts/OFL-Caveat.txt` |

Keep the three OFL files with any copy of the font files. The fonts may not be sold on their own. The site loads them at runtime from Google Fonts (a third-party request; disclose it or self-host).

AI-generated images are not covered by a licence in this file: see `docs/buyer/IMAGE-AND-ASSET-RIGHTS.md`.

## Full production list

| Package | Licence | Publisher | Repository |
| --- | --- | --- | --- |
| @babel/code-frame@7.29.7 | MIT | The Babel Team | https://github.com/babel/babel |
| @babel/compat-data@7.29.7 | MIT | The Babel Team | https://github.com/babel/babel |
| @babel/core@7.29.7 | MIT | The Babel Team | https://github.com/babel/babel |
| @babel/generator@7.29.7 | MIT | The Babel Team | https://github.com/babel/babel |
| @babel/generator@7.29.8 | MIT | The Babel Team | https://github.com/babel/babel |
| @babel/helper-compilation-targets@7.29.7 | MIT | The Babel Team | https://github.com/babel/babel |
| @babel/helper-globals@7.29.7 | MIT | The Babel Team | https://github.com/babel/babel |
| @babel/helper-module-imports@7.29.7 | MIT | The Babel Team | https://github.com/babel/babel |
| @babel/helper-module-transforms@7.29.7 | MIT | The Babel Team | https://github.com/babel/babel |
| @babel/helper-string-parser@7.29.7 | MIT | The Babel Team | https://github.com/babel/babel |
| @babel/helper-validator-identifier@7.29.7 | MIT | The Babel Team | https://github.com/babel/babel |
| @babel/helper-validator-option@7.29.7 | MIT | The Babel Team | https://github.com/babel/babel |
| @babel/helpers@7.29.7 | MIT | The Babel Team | https://github.com/babel/babel |
| @babel/parser@7.29.7 | MIT | The Babel Team | https://github.com/babel/babel |
| @babel/parser@7.29.9 | MIT | The Babel Team | https://github.com/babel/babel |
| @babel/runtime@7.29.7 | MIT | The Babel Team | https://github.com/babel/babel |
| @babel/template@7.29.7 | MIT | The Babel Team | https://github.com/babel/babel |
| @babel/traverse@7.29.7 | MIT | The Babel Team | https://github.com/babel/babel |
| @babel/types@7.29.7 | MIT | The Babel Team | https://github.com/babel/babel |
| @babel/types@7.29.8 | MIT | The Babel Team | https://github.com/babel/babel |
| @date-fns/tz@1.5.0 | MIT | Sasha Koss | https://github.com/date-fns/date-fns |
| @emnapi/core@2.0.0-alpha.3 | MIT | toyobayashi | https://github.com/toyobayashi/emnapi |
| @emnapi/runtime@2.0.0-alpha.3 | MIT | toyobayashi | https://github.com/toyobayashi/emnapi |
| @emnapi/wasi-threads@2.0.1 | MIT | toyobayashi | https://github.com/toyobayashi/emnapi |
| @floating-ui/core@1.8.0 | MIT | atomiks | https://github.com/floating-ui/floating-ui |
| @floating-ui/dom@1.8.0 | MIT | atomiks | https://github.com/floating-ui/floating-ui |
| @floating-ui/react-dom@2.1.9 | MIT | atomiks | https://github.com/floating-ui/floating-ui |
| @floating-ui/utils@0.2.12 | MIT | atomiks | https://github.com/floating-ui/floating-ui |
| @hookform/resolvers@5.5.7 | MIT | bluebill1049 | https://github.com/react-hook-form/resolvers |
| @jridgewell/gen-mapping@0.3.13 | MIT | Justin Ridgewell | https://github.com/jridgewell/sourcemaps |
| @jridgewell/remapping@2.3.5 | MIT | Justin Ridgewell | https://github.com/jridgewell/sourcemaps |
| @jridgewell/resolve-uri@3.1.2 | MIT | Justin Ridgewell | https://github.com/jridgewell/resolve-uri |
| @jridgewell/sourcemap-codec@1.5.5 | MIT | Justin Ridgewell | https://github.com/jridgewell/sourcemaps |
| @jridgewell/trace-mapping@0.3.31 | MIT | Justin Ridgewell | https://github.com/jridgewell/sourcemaps |
| @napi-rs/wasm-runtime@1.2.0 | MIT | LongYinan | https://github.com/napi-rs/napi-rs |
| @oozcitak/dom@2.0.2 | MIT | Ozgur Ozcitak | https://github.com/oozcitak/dom |
| @oozcitak/infra@2.0.2 | MIT | Ozgur Ozcitak | https://github.com/oozcitak/infra |
| @oozcitak/url@3.0.0 | MIT | Ozgur Ozcitak | https://github.com/oozcitak/url |
| @oozcitak/util@10.0.0 | MIT | Ozgur Ozcitak | https://github.com/oozcitak/util |
| @oxc-project/types@0.142.0 | MIT | Boshen and oxc contributors | https://github.com/oxc-project/oxc |
| @radix-ui/number@1.1.3 | MIT |  | https://github.com/radix-ui/primitives |
| @radix-ui/primitive@1.1.7 | MIT |  | https://github.com/radix-ui/primitives |
| @radix-ui/react-accordion@1.2.20 | MIT |  | https://github.com/radix-ui/primitives |
| @radix-ui/react-alert-dialog@1.1.23 | MIT |  | https://github.com/radix-ui/primitives |
| @radix-ui/react-arrow@1.1.15 | MIT |  | https://github.com/radix-ui/primitives |
| @radix-ui/react-aspect-ratio@1.1.15 | MIT |  | https://github.com/radix-ui/primitives |
| @radix-ui/react-avatar@1.2.6 | MIT |  | https://github.com/radix-ui/primitives |
| @radix-ui/react-checkbox@1.3.11 | MIT |  | https://github.com/radix-ui/primitives |
| @radix-ui/react-collapsible@1.1.20 | MIT |  | https://github.com/radix-ui/primitives |
| @radix-ui/react-collection@1.1.15 | MIT |  | https://github.com/radix-ui/primitives |
| @radix-ui/react-compose-refs@1.1.5 | MIT |  | https://github.com/radix-ui/primitives |
| @radix-ui/react-context-menu@2.3.7 | MIT |  | https://github.com/radix-ui/primitives |
| @radix-ui/react-context@1.2.2 | MIT |  | https://github.com/radix-ui/primitives |
| @radix-ui/react-dialog@1.1.23 | MIT |  | https://github.com/radix-ui/primitives |
| @radix-ui/react-direction@1.1.4 | MIT |  | https://github.com/radix-ui/primitives |
| @radix-ui/react-dismissable-layer@1.1.19 | MIT |  | https://github.com/radix-ui/primitives |
| @radix-ui/react-dropdown-menu@2.1.24 | MIT |  | https://github.com/radix-ui/primitives |
| @radix-ui/react-focus-guards@1.1.6 | MIT |  | https://github.com/radix-ui/primitives |
| @radix-ui/react-focus-scope@1.1.16 | MIT |  | https://github.com/radix-ui/primitives |
| @radix-ui/react-hover-card@1.1.23 | MIT |  | https://github.com/radix-ui/primitives |
| @radix-ui/react-id@1.1.4 | MIT |  | https://github.com/radix-ui/primitives |
| @radix-ui/react-label@2.1.15 | MIT |  | https://github.com/radix-ui/primitives |
| @radix-ui/react-menu@2.1.24 | MIT |  | https://github.com/radix-ui/primitives |
| @radix-ui/react-menubar@1.1.24 | MIT |  | https://github.com/radix-ui/primitives |
| @radix-ui/react-navigation-menu@1.2.22 | MIT |  | https://github.com/radix-ui/primitives |
| @radix-ui/react-popover@1.1.23 | MIT |  | https://github.com/radix-ui/primitives |
| @radix-ui/react-popper@1.3.7 | MIT |  | https://github.com/radix-ui/primitives |
| @radix-ui/react-portal@1.1.17 | MIT |  | https://github.com/radix-ui/primitives |
| @radix-ui/react-presence@1.1.10 | MIT |  | https://github.com/radix-ui/primitives |
| @radix-ui/react-primitive@2.1.10 | MIT |  | https://github.com/radix-ui/primitives |
| @radix-ui/react-progress@1.1.16 | MIT |  | https://github.com/radix-ui/primitives |
| @radix-ui/react-radio-group@1.4.7 | MIT |  | https://github.com/radix-ui/primitives |
| @radix-ui/react-roving-focus@1.1.19 | MIT |  | https://github.com/radix-ui/primitives |
| @radix-ui/react-scroll-area@1.2.18 | MIT |  | https://github.com/radix-ui/primitives |
| @radix-ui/react-select@2.3.7 | MIT |  | https://github.com/radix-ui/primitives |
| @radix-ui/react-separator@1.1.15 | MIT |  | https://github.com/radix-ui/primitives |
| @radix-ui/react-slider@1.4.7 | MIT |  | https://github.com/radix-ui/primitives |
| @radix-ui/react-slot@1.3.3 | MIT |  | https://github.com/radix-ui/primitives |
| @radix-ui/react-switch@1.3.7 | MIT |  | https://github.com/radix-ui/primitives |
| @radix-ui/react-tabs@1.1.21 | MIT |  | https://github.com/radix-ui/primitives |
| @radix-ui/react-toggle-group@1.1.19 | MIT |  | https://github.com/radix-ui/primitives |
| @radix-ui/react-toggle@1.1.18 | MIT |  | https://github.com/radix-ui/primitives |
| @radix-ui/react-tooltip@1.2.16 | MIT |  | https://github.com/radix-ui/primitives |
| @radix-ui/react-use-callback-ref@1.1.4 | MIT |  | https://github.com/radix-ui/primitives |
| @radix-ui/react-use-controllable-state@1.2.6 | MIT |  | https://github.com/radix-ui/primitives |
| @radix-ui/react-use-effect-event@0.0.5 | MIT |  | https://github.com/radix-ui/primitives |
| @radix-ui/react-use-is-hydrated@0.1.3 | MIT |  | https://github.com/radix-ui/primitives |
| @radix-ui/react-use-layout-effect@1.1.4 | MIT |  | https://github.com/radix-ui/primitives |
| @radix-ui/react-use-previous@1.1.4 | MIT |  | https://github.com/radix-ui/primitives |
| @radix-ui/react-use-rect@1.1.4 | MIT |  | https://github.com/radix-ui/primitives |
| @radix-ui/react-use-size@1.1.4 | MIT |  | https://github.com/radix-ui/primitives |
| @radix-ui/react-visually-hidden@1.2.11 | MIT |  | https://github.com/radix-ui/primitives |
| @radix-ui/rect@1.1.3 | MIT |  | https://github.com/radix-ui/primitives |
| @rolldown/binding-linux-x64-gnu@1.2.1 | MIT |  | https://github.com/rolldown/rolldown |
| @rolldown/binding-linux-x64-musl@1.2.1 | MIT |  | https://github.com/rolldown/rolldown |
| @rolldown/binding-wasm32-wasi@1.2.1 | MIT |  | https://github.com/rolldown/rolldown |
| @rolldown/pluginutils@1.0.1 | MIT |  | https://github.com/rolldown/plugins |
| @standard-schema/spec@1.1.0 | MIT | Colin McDonnell | https://github.com/standard-schema/standard-schema |
| @standard-schema/utils@0.3.0 | MIT | Fabian Hiller | https://github.com/standard-schema/standard-schema |
| @tabby_ai/hijri-converter@1.0.5 | MIT |  |  |
| @tailwindcss/node@4.3.3 | MIT |  | https://github.com/tailwindlabs/tailwindcss |
| @tailwindcss/oxide-linux-x64-gnu@4.3.3 | MIT |  | https://github.com/tailwindlabs/tailwindcss |
| @tailwindcss/oxide-linux-x64-musl@4.3.3 | MIT |  | https://github.com/tailwindlabs/tailwindcss |
| @tailwindcss/oxide@4.3.3 | MIT |  | https://github.com/tailwindlabs/tailwindcss |
| @tailwindcss/vite@4.3.3 | MIT |  | https://github.com/tailwindlabs/tailwindcss |
| @tanstack/history@1.162.4 | MIT | Tanner Linsley | https://github.com/TanStack/router |
| @tanstack/query-core@5.101.4 | MIT | tannerlinsley | https://github.com/TanStack/query |
| @tanstack/react-query@5.101.4 | MIT | tannerlinsley | https://github.com/TanStack/query |
| @tanstack/react-router@1.170.41 | MIT | Tanner Linsley | https://github.com/TanStack/router |
| @tanstack/react-start-client@1.168.39 | MIT | Tanner Linsley | https://github.com/TanStack/router |
| @tanstack/react-start-rsc@0.1.59 | MIT | Tanner Linsley | https://github.com/TanStack/router |
| @tanstack/react-start-server@1.167.46 | MIT | Tanner Linsley | https://github.com/TanStack/router |
| @tanstack/react-start@1.168.60 | MIT | Tanner Linsley | https://github.com/TanStack/router |
| @tanstack/react-store@0.11.2 | MIT | Tanner Linsley | https://github.com/TanStack/store |
| @tanstack/router-core@1.171.34 | MIT | Tanner Linsley | https://github.com/TanStack/router |
| @tanstack/router-generator@1.167.40 | MIT | Tanner Linsley | https://github.com/TanStack/router |
| @tanstack/router-plugin@1.168.42 | MIT | Tanner Linsley | https://github.com/TanStack/router |
| @tanstack/router-utils@1.162.3 | MIT | Tanner Linsley | https://github.com/TanStack/router |
| @tanstack/start-client-core@1.170.34 | MIT | Tanner Linsley | https://github.com/TanStack/router |
| @tanstack/start-fn-stubs@1.162.0 | MIT | Tanner Linsley | https://github.com/TanStack/router |
| @tanstack/start-plugin-core@1.171.49 | MIT | Tanner Linsley | https://github.com/TanStack/router |
| @tanstack/start-server-core@1.169.39 | MIT | Tanner Linsley | https://github.com/TanStack/router |
| @tanstack/start-storage-context@1.167.36 | MIT | Tanner Linsley | https://github.com/TanStack/router |
| @tanstack/store@0.11.2 | MIT | Tanner Linsley | https://github.com/TanStack/store |
| @tanstack/virtual-file-routes@1.162.0 | MIT | Tanner Linsley | https://github.com/TanStack/router |
| @tybys/wasm-util@0.10.3 | MIT | toyobayashi | https://github.com/toyobayashi/wasm-util |
| @types/d3-array@3.2.2 | MIT |  | https://github.com/DefinitelyTyped/DefinitelyTyped |
| @types/d3-color@3.1.3 | MIT |  | https://github.com/DefinitelyTyped/DefinitelyTyped |
| @types/d3-ease@3.0.2 | MIT |  | https://github.com/DefinitelyTyped/DefinitelyTyped |
| @types/d3-interpolate@3.0.4 | MIT |  | https://github.com/DefinitelyTyped/DefinitelyTyped |
| @types/d3-path@3.1.1 | MIT |  | https://github.com/DefinitelyTyped/DefinitelyTyped |
| @types/d3-scale@4.0.9 | MIT |  | https://github.com/DefinitelyTyped/DefinitelyTyped |
| @types/d3-shape@3.1.8 | MIT |  | https://github.com/DefinitelyTyped/DefinitelyTyped |
| @types/d3-time@3.0.4 | MIT |  | https://github.com/DefinitelyTyped/DefinitelyTyped |
| @types/d3-timer@3.0.2 | MIT |  | https://github.com/DefinitelyTyped/DefinitelyTyped |
| @types/node@22.20.1 | MIT |  | https://github.com/DefinitelyTyped/DefinitelyTyped |
| @types/react-dom@19.2.3 | MIT |  | https://github.com/DefinitelyTyped/DefinitelyTyped |
| @types/react@19.2.17 | MIT |  | https://github.com/DefinitelyTyped/DefinitelyTyped |
| ajv@6.15.0 | MIT | Evgeny Poberezkin | https://github.com/ajv-validator/ajv |
| ansis@4.3.1 | ISC | webdiscus | https://github.com/webdiscus/ansis |
| argparse@2.0.1 | Python-2.0 |  | https://github.com/nodeca/argparse |
| aria-hidden@1.2.6 | MIT | Anton Korzunov | https://github.com/theKashey/aria-hidden |
| babel-dead-code-elimination@1.0.12 | MIT | pcattori | https://github.com/pcattori/babel-dead-code-elimination |
| baseline-browser-mapping@2.11.4 | Apache-2.0 |  | https://github.com/web-platform-dx/baseline-browser-mapping |
| browserslist@4.28.7 | MIT | Andrey Sitnik | https://github.com/browserslist/browserslist |
| caniuse-lite@1.0.30001806 | CC-BY-4.0 | Ben Briggs | https://github.com/browserslist/caniuse-lite |
| chokidar@5.0.0 | MIT | Paul Miller | https://github.com/paulmillr/chokidar |
| class-variance-authority@0.7.1 | Apache-2.0 | Joe Bell | https://github.com/joe-bell/cva |
| clsx@2.1.1 | MIT | Luke Edwards | https://github.com/lukeed/clsx |
| cmdk@1.1.1 | MIT | Paco | https://github.com/pacocoursey/cmdk |
| convert-source-map@2.0.0 | MIT | Thorsten Lorenz | https://github.com/thlorenz/convert-source-map |
| cookie-es@3.1.1 | MIT |  | https://github.com/unjs/cookie-es |
| crossws@0.4.10 | MIT |  | https://github.com/h3js/crossws |
| csstype@3.2.3 | MIT | Fredrik Nicol | https://github.com/frenic/csstype |
| d3-array@3.2.4 | ISC | Mike Bostock | https://github.com/d3/d3-array |
| d3-color@3.1.0 | ISC | Mike Bostock | https://github.com/d3/d3-color |
| d3-ease@3.0.1 | BSD-3-Clause | Mike Bostock | https://github.com/d3/d3-ease |
| d3-format@3.1.2 | ISC | Mike Bostock | https://github.com/d3/d3-format |
| d3-interpolate@3.0.1 | ISC | Mike Bostock | https://github.com/d3/d3-interpolate |
| d3-path@3.1.0 | ISC | Mike Bostock | https://github.com/d3/d3-path |
| d3-scale@4.0.2 | ISC | Mike Bostock | https://github.com/d3/d3-scale |
| d3-shape@3.2.0 | ISC | Mike Bostock | https://github.com/d3/d3-shape |
| d3-time-format@4.1.0 | ISC | Mike Bostock | https://github.com/d3/d3-time-format |
| d3-time@3.1.0 | ISC | Mike Bostock | https://github.com/d3/d3-time |
| d3-timer@3.0.1 | ISC | Mike Bostock | https://github.com/d3/d3-timer |
| date-fns-jalali@4.1.0-0 | MIT |  | https://github.com/date-fns-jalali/date-fns-jalali |
| date-fns@4.4.0 | MIT |  | https://github.com/date-fns/date-fns |
| debug@4.4.3 | MIT | Josh Junon | https://github.com/debug-js/debug |
| decimal.js-light@2.5.1 | MIT | Michael Mclaughlin | https://github.com/MikeMcl/decimal.js-light |
| detect-libc@2.1.2 | Apache-2.0 | Lovell Fuller | https://github.com/lovell/detect-libc |
| detect-node-es@1.1.0 | MIT | Ilya Kantor | https://github.com/thekashey/detect-node |
| diff@8.0.4 | BSD-3-Clause |  | https://github.com/kpdecker/jsdiff |
| dom-helpers@5.2.1 | MIT | Jason Quense | https://github.com/react-bootstrap/dom-helpers |
| electron-to-chromium@1.5.398 | ISC | Kilian Valkhof | https://github.com/Kilian/electron-to-chromium |
| embla-carousel-react@8.6.0 | MIT | David Jerleke | https://github.com/davidjerleke/embla-carousel |
| embla-carousel-reactive-utils@8.6.0 | MIT | David Jerleke | https://github.com/davidjerleke/embla-carousel |
| embla-carousel@8.6.0 | MIT | David Jerleke | https://github.com/davidjerleke/embla-carousel |
| enhanced-resolve@5.24.4 | MIT | Tobias Koppers @sokra | https://github.com/webpack/enhanced-resolve |
| escalade@3.2.0 | MIT | Luke Edwards | https://github.com/lukeed/escalade |
| eventemitter3@4.0.7 | MIT | Arnout Kazemier | https://github.com/primus/eventemitter3 |
| exsolve@1.1.1 | MIT |  | https://github.com/unjs/exsolve |
| fast-deep-equal@3.1.3 | MIT | Evgeny Poberezkin | https://github.com/epoberezkin/fast-deep-equal |
| fast-equals@5.4.1 | MIT | Tony Quetano | https://github.com/planttheidea/fast-equals |
| fast-json-stable-stringify@2.1.0 | MIT | James Halliday | https://github.com/epoberezkin/fast-json-stable-stringify |
| fdir@6.5.0 | MIT | thecodrr | https://github.com/thecodrr/fdir |
| fetchdts@0.1.7 | MIT | Daniel Roe | https://github.com/unjs/fetchdts |
| gensync@1.0.0-beta.2 | MIT | Logan Smyth | https://github.com/loganfsmyth/gensync |
| get-nonce@1.0.1 | MIT | Anton Korzunov | https://github.com/theKashey/get-nonce |
| globrex@0.1.2 | MIT | Terkel Gjervig | https://github.com/terkelg/globrex |
| graceful-fs@4.2.11 | ISC |  | https://github.com/isaacs/node-graceful-fs |
| h3@2.0.1-rc.20 | MIT |  | https://github.com/h3js/h3 |
| input-otp@1.4.2 | MIT | Guilherme Rodz | https://github.com/guilhermerodz/input-otp |
| internmap@2.0.3 | ISC | Mike Bostock | https://github.com/mbostock/internmap |
| isbot@5.2.1 | Unlicense |  | https://github.com/omrilotan/isbot |
| jiti@2.7.0 | MIT |  | https://github.com/unjs/jiti |
| js-tokens@4.0.0 | MIT | Simon Lydell | https://github.com/lydell/js-tokens |
| js-yaml@4.3.2 | MIT | Vladimir Zapparov | https://github.com/nodeca/js-yaml |
| jsesc@3.1.0 | MIT | Mathias Bynens | https://github.com/mathiasbynens/jsesc |
| json-schema-traverse@0.4.1 | MIT | Evgeny Poberezkin | https://github.com/epoberezkin/json-schema-traverse |
| json5@2.2.3 | MIT | Aseem Kishore | https://github.com/json5/json5 |
| lightningcss-linux-x64-gnu@1.32.0 | MPL-2.0 |  | https://github.com/parcel-bundler/lightningcss |
| lightningcss-linux-x64-gnu@1.33.0 | MPL-2.0 |  | https://github.com/parcel-bundler/lightningcss |
| lightningcss-linux-x64-musl@1.32.0 | MPL-2.0 |  | https://github.com/parcel-bundler/lightningcss |
| lightningcss-linux-x64-musl@1.33.0 | MPL-2.0 |  | https://github.com/parcel-bundler/lightningcss |
| lightningcss@1.32.0 | MPL-2.0 |  | https://github.com/parcel-bundler/lightningcss |
| lightningcss@1.33.0 | MPL-2.0 |  | https://github.com/parcel-bundler/lightningcss |
| lodash@4.18.1 | MIT | John-David Dalton | https://github.com/lodash/lodash |
| loose-envify@1.4.0 | MIT | Andres Suarez | https://github.com/zertosh/loose-envify |
| lru-cache@5.1.1 | ISC | Isaac Z. Schlueter | https://github.com/isaacs/node-lru-cache |
| lucide-react@0.575.0 | ISC | Eric Fennis | https://github.com/lucide-icons/lucide |
| magic-string@0.30.21 | MIT | Rich Harris | https://github.com/Rich-Harris/magic-string |
| ms@2.1.3 | MIT |  | https://github.com/vercel/ms |
| nanoid@3.3.20 | MIT | Andrey Sitnik | https://github.com/ai/nanoid |
| node-releases@2.0.51 | MIT | Sergey Rubanov | https://github.com/chicoxyzzy/node-releases |
| object-assign@4.1.1 | MIT | Sindre Sorhus | https://github.com/sindresorhus/object-assign |
| pathe@2.0.3 | MIT |  | https://github.com/unjs/pathe |
| picocolors@1.1.1 | ISC | Alexey Raspopov | https://github.com/alexeyraspopov/picocolors |
| picomatch@4.0.5 | MIT | Jon Schlinkert | https://github.com/micromatch/picomatch |
| picomatch@4.0.7 | MIT | Jon Schlinkert | https://github.com/micromatch/picomatch |
| postcss@8.5.24 | MIT | Andrey Sitnik | https://github.com/postcss/postcss |
| prettier@3.9.6 | MIT | James Long | https://github.com/prettier/prettier |
| prop-types@15.8.1 | MIT |  | https://github.com/facebook/prop-types |
| punycode@2.3.1 | MIT | Mathias Bynens | https://github.com/mathiasbynens/punycode.js |
| react-day-picker@9.14.0 | MIT | Giampaolo Bellavite | https://github.com/gpbl/react-day-picker |
| react-dom@19.2.8 | MIT |  | https://github.com/react/react |
| react-hook-form@7.83.0 | MIT | Beier | https://github.com/react-hook-form/react-hook-form |
| react-is@16.13.1 | MIT |  | https://github.com/facebook/react |
| react-is@18.3.1 | MIT |  | https://github.com/facebook/react |
| react-remove-scroll-bar@2.3.8 | MIT | Anton Korzunov | https://github.com/theKashey/react-remove-scroll-bar |
| react-remove-scroll@2.7.2 | MIT | Anton Korzunov | https://github.com/theKashey/react-remove-scroll |
| react-resizable-panels@4.12.2 | MIT | Brian Vaughn | https://github.com/bvaughn/react-resizable-panels |
| react-smooth@4.0.4 | MIT | JasonHzq | https://github.com/recharts/react-smooth |
| react-style-singleton@2.2.3 | MIT | Anton Korzunov | https://github.com/theKashey/react-style-singleton |
| react-transition-group@4.4.5 | BSD-3-Clause |  | https://github.com/reactjs/react-transition-group |
| react@19.2.8 | MIT |  | https://github.com/react/react |
| readdirp@5.0.0 | MIT | Thorsten Lorenz | https://github.com/paulmillr/readdirp |
| recharts-scale@0.4.5 | MIT | recharts group | https://github.com/recharts/recharts-scale |
| recharts@2.15.4 | MIT | recharts group | https://github.com/recharts/recharts |
| rolldown@1.2.1 | MIT |  | https://github.com/rolldown/rolldown |
| rou3@0.8.1 | MIT |  | https://github.com/h3js/rou3 |
| scheduler@0.27.0 | MIT |  | https://github.com/facebook/react |
| semver@6.3.1 | ISC | GitHub Inc. | https://github.com/npm/node-semver |
| seroval-plugins@1.6.8 | MIT | Alexis Munsayac | https://github.com/lxsmnsyc/seroval |
| seroval@1.6.8 | MIT | Alexis Munsayac | https://github.com/lxsmnsyc/seroval |
| sonner@2.0.7 | MIT | Emil Kowalski | https://github.com/emilkowalski/sonner |
| source-map-js@1.2.2 | BSD-3-Clause | Valentin 7rulnik Semirulnik | https://github.com/7rulnik/source-map-js |
| source-map@0.7.6 | BSD-3-Clause | Nick Fitzgerald | https://github.com/mozilla/source-map |
| srvx@0.11.22 | MIT |  | https://github.com/h3js/srvx |
| tailwind-merge@3.6.0 | MIT | Dany Castillo | https://github.com/dcastil/tailwind-merge |
| tailwindcss@4.3.3 | MIT |  | https://github.com/tailwindlabs/tailwindcss |
| tapable@2.3.3 | MIT | Tobias Koppers @sokra | https://github.com/webpack/tapable |
| tiny-invariant@1.3.3 | MIT | Alex Reardon | https://github.com/alexreardon/tiny-invariant |
| tinyglobby@0.2.17 | MIT | Superchupu | https://github.com/SuperchupuDev/tinyglobby |
| tsconfck@3.1.6 | MIT | dominikg | https://github.com/dominikg/tsconfck |
| tslib@2.8.1 | 0BSD | Microsoft Corp. | https://github.com/Microsoft/tslib |
| tw-animate-css@1.4.0 | MIT | Luca Bosin | https://github.com/Wombosvideo/tw-animate-css |
| typescript@5.9.3 | Apache-2.0 | Microsoft Corp. | https://github.com/microsoft/TypeScript |
| ufo@1.6.4 | MIT |  | https://github.com/unjs/ufo |
| undici-types@6.21.0 | MIT |  | https://github.com/nodejs/undici |
| unplugin@3.3.0 | MIT |  | https://github.com/unjs/unplugin |
| update-browserslist-db@1.2.3 | MIT | Andrey Sitnik | https://github.com/browserslist/update-db |
| uri-js@4.4.1 | BSD-2-Clause | Gary Court | https://github.com/garycourt/uri-js |
| use-callback-ref@1.3.3 | MIT | theKashey | https://github.com/theKashey/use-callback-ref |
| use-sidecar@1.1.3 | MIT | theKashey | https://github.com/theKashey/use-sidecar |
| use-sync-external-store@1.6.0 | MIT |  | https://github.com/facebook/react |
| vaul@1.1.2 | MIT | Emil Kowalski | https://github.com/emilkowalski/vaul |
| victory-vendor@36.9.2 | MIT AND ISC | Formidable | https://github.com/FormidableLabs/victory |
| vite-tsconfig-paths@6.1.1 | MIT | aleclarson | https://github.com/aleclarson/vite-tsconfig-paths |
| vite@8.1.5 | MIT | Evan You | https://github.com/vitejs/vite |
| vitefu@1.1.3 | MIT |  | https://github.com/svitejs/vitefu |
| webpack-virtual-modules@0.6.2 | MIT | SysGears INC | https://github.com/sysgears/webpack-virtual-modules |
| xmlbuilder2@4.0.3 | MIT | Ozgur Ozcitak | https://github.com/oozcitak/xmlbuilder2 |
| yallist@3.1.1 | ISC | Isaac Z. Schlueter | https://github.com/isaacs/yallist |
| zod@3.25.76 | MIT | Colin McDonnell | https://github.com/colinhacks/zod |
| zod@4.6.7 | MIT | Colin McDonnell | https://github.com/colinhacks/zod |
