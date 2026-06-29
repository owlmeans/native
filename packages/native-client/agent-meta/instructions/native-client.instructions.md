---
description: "How to use @owlmeans/native-client — makeContext() bootstraps a React Native OwlMeans app (auth, permissions, db, router auto-registered). AppConfig for multi-environment service routing."
applyTo: "**/*.ts, **/*.tsx"
---
<!-- AUTO-GENERATED — do not edit. Regenerate via sync-agent-meta. -->

# @owlmeans/native-client

**Layer:** Native (React Native "quadra" entry point)
**Install:** `"@owlmeans/native-client": "^0.1.2"`

## Core exports

- `makeContext<C, T>(cfg)` — creates `AppContext` and auto-registers auth, db, permissions, router services
- `useContext<C, T>()` — React hook to access the app context in components
- `AppConfig` — extends `ClientConfig` with `environments: { [env]: Partial<CommonServiceRoute> }` and `debug.webView`
- `AppContext<C>` — extends `ClientContext` + `AuthServiceAppend` + `PermissionsAppend`
- `ENV_DEFAULT`, `ENV_DEV`, `ENV_TEST`, `ENV_PROD`, `ENV_STAGE` — environment name constants
- `Permission` — permission-gated component helper
- `Debugger` — in-app debug overlay

## Bootstrap

```typescript
import { makeContext, ENV_DEV } from '@owlmeans/native-client'
import { AppType, Layer } from '@owlmeans/context'

const context = makeContext({
  service: 'mobile-app',
  type: AppType.Frontend,
  layer: Layer.User,
  services: { api: { alias: 'api', route: { alias: 'api', path: '/api', service: 'backend' } } },
  environments: {
    [ENV_DEV]:  { route: { path: 'http://localhost:3000/api' } },
    production: { route: { path: 'https://api.example.com/api' } }
  },
  defaultEnv: ENV_DEV
})
await context.configure().init()
```

## Services auto-registered

- `context.auth()` — auth manager
- `context.permissions().request('camera')` — device permissions
- db via `@owlmeans/native-db` (service alias `DEFAULT_ALIAS`)
- router via `@owlmeans/native-router`

## Depends on

`@owlmeans/client`, `@owlmeans/client-context`, `@owlmeans/client-auth`, `@owlmeans/native-db`, `@owlmeans/native-router`
Peers: `react`, `react-native`, `react-native-permissions`
