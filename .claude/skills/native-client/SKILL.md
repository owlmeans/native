---
name: native-client
description: How to use @owlmeans/native-client — the React Native app bootstrap package. Provides makeContext() to wire context/auth/permissions/router/db, AppConfig for multi-environment service routing, and useContext() hook. Auto-invoked when importing from native-client or setting up a React Native OwlMeans app.
user-invocable: false
---

# @owlmeans/native-client

**Layer:** Native (React Native "quadra" entry point — extends `@owlmeans/client`)
**Install:** `"@owlmeans/native-client": "^0.1.2"` in `dependencies`

## Key Exports

| Export | Description |
|--------|-------------|
| `makeContext<C, T>(cfg)` | Create a native `AppContext` (registers auth, db, permissions, router services) |
| `useContext<C, T>()` | React hook — access the app context inside any component |
| `AppConfig` | Config type extending `ClientConfig` with `environments` map and `debug.webView` |
| `AppContext<C>` | Context interface extending `ClientContext` + `AuthServiceAppend` + `PermissionsAppend` |
| `PermissionService` | Interface for device-permission service (`request`, `settings`) |
| `PermissionsAppend` | Mixin — adds `context.permissions()` to a context |
| `ENV_DEFAULT`, `ENV_DEV`, `ENV_TEST`, `ENV_PROD`, `ENV_STAGE` | Environment name constants |
| `Debugger` | Component for in-app debug overlay |
| `Permission` | Helper for permission-gated rendering |

## Bootstrap Pattern

```typescript
import { makeContext, ENV_DEV } from '@owlmeans/native-client'
import { AppType, Layer } from '@owlmeans/context'

const context = makeContext({
  service: 'mobile-app',
  type: AppType.Frontend,
  layer: Layer.User,
  services: {
    api: { alias: 'api', route: { alias: 'api', path: '/api', service: 'backend' } }
  },
  environments: {
    [ENV_DEV]:  { route: { path: 'http://localhost:3000/api' } },
    production: { route: { path: 'https://api.example.com/api' } }
  },
  defaultEnv: ENV_DEV
})

await context.configure().init()
```

## Services auto-registered by makeContext

- **auth** — client-side auth manager (`context.auth()`)
- **permissions** — native device permissions (`context.permissions().request('camera')`)
- **db** — AsyncStorage-backed key-value store (via `@owlmeans/native-db`)
- **router** — React Router Native memory router (via `@owlmeans/native-router`)

## Depends On

- `@owlmeans/client`, `@owlmeans/client-context`, `@owlmeans/client-auth`
- `@owlmeans/native-db`, `@owlmeans/native-router`
- `react`, `react-native`, `react-native-permissions` (peer)
