---
description: "How to use @owlmeans/native-router — React Router Native adapter implementing @owlmeans/router contract. appendNativeRouter(ctx) registers a memory-router service; makeContext() from native-client calls it automatically."
applyTo: "**/*.ts, **/*.tsx"
---

# @owlmeans/native-router

**Layer:** Native (router adapter — implements `@owlmeans/router` contract for React Native)
**Install:** `"@owlmeans/native-router": "^0.1.2"`

## Core exports

- `appendNativeRouter(ctx)` — registers a `react-router-native` router service on any `ClientContext`
- `makeWebRouterService()` — creates the router service directly (name mirrors web package convention)

## Router service capabilities

- `service.provider()` → `RouterProvider` from `react-router-native`
- `service.outlet()` → `Outlet`
- `service.useParams<T>()` → wraps `useParams()`
- `service.useLocation()` → wraps `useLocation()`
- `service.useNavigate()` → wraps `useNavigate()`

## Usage

```typescript
import { appendNativeRouter } from '@owlmeans/native-router'

// makeContext() from @owlmeans/native-client calls appendNativeRouter automatically.
// Only call it directly when composing a custom context:
appendNativeRouter(context)
```

## Version constraint

`react-router-native@6.30.0` is pinned — peer `react-router` must match exactly (`6.30.0`).

## Depends on

`@owlmeans/router`, `@owlmeans/client-context`, `@owlmeans/client`
Peers: `react`, `react-router@6.30.0`, `react-router-native@6.30.0`
