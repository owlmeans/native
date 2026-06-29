---
name: native-router
description: How to use @owlmeans/native-router — React Router Native adapter implementing the @owlmeans/router contract. Use appendNativeRouter() to register a memory-router-based router service on a context. Auto-invoked when importing from native-router or wiring navigation in a React Native OwlMeans app.
user-invocable: false
---
<!-- AUTO-GENERATED — do not edit. Regenerate via sync-agent-meta. -->

# @owlmeans/native-router

**Layer:** Native (router adapter — implements `@owlmeans/router` contract for React Native)
**Install:** `"@owlmeans/native-router": "^0.1.2"` in `dependencies`

## Key Exports

| Export | Description |
|--------|-------------|
| `appendNativeRouter(ctx)` | Register a `react-router-native` router service on any `ClientContext` |
| `makeWebRouterService()` | Create the router service directly (uses `RouterProvider`, `Outlet`, hooks from `react-router-native`) |

## RouterService capabilities (via `@owlmeans/router`)

| Member | Implementation |
|--------|----------------|
| `service.provider()` | Returns `RouterProvider` from `react-router-native` |
| `service.outlet()` | Returns `Outlet` |
| `service.useParams<T>()` | Wraps `useParams()` from `react-router-native` |
| `service.useLocation()` | Wraps `useLocation()` |
| `service.useNavigate()` | Wraps `useNavigate()` |

## Usage

```typescript
import { appendNativeRouter } from '@owlmeans/native-router'
import { makeClientContext } from '@owlmeans/client-context'

// Manual context composition (makeContext from native-client does this automatically)
const context = makeClientContext(config)
appendNativeRouter(context)
```

## Notes

- `makeContext()` from `@owlmeans/native-client` calls `appendNativeRouter` automatically — only call it manually when composing a custom context without `native-client`.
- Uses `react-router-native` `6.30.0` (pinned); peer-dep `react-router` must match exactly.
- The function is named `makeWebRouterService` internally (mirrors the web package naming convention) but is consumed via `appendNativeRouter`.

## Depends On

- `@owlmeans/router` (for `makeRouterService` base)
- `@owlmeans/client-context`, `@owlmeans/client` (type deps)
- `react-router-native@6.30.0`, `react@*`, `react-router@6.30.0` (peers)
