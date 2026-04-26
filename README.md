# OwlMeans Native — React Native Libraries

**OwlMeans Native** is the React Native layer of the [OwlMeans Common](https://github.com/owlmeans/common) framework. It provides mobile implementations of the platform-agnostic client packages, enabling you to build React Native applications using the same module system, context-driven dependency injection, and cryptographic authentication as your web and server counterparts.

## 📦 **Packages**

All packages are in the `@owlmeans/*` namespace, MIT-licensed, and synchronized at the same version as `owlmeans/common`.

| Package | Description |
|---------|-------------|
| [`@owlmeans/native-router`](packages/native-router) | React Native router integration using `react-router-native`. Implements the `@owlmeans/router` contract for mobile navigation. |
| [`@owlmeans/native-db`](packages/native-db) | Async storage adapter using `@react-native-async-storage/async-storage`. Implements the `@owlmeans/resource` contract for mobile-local persistence. |
| [`@owlmeans/native-client`](packages/native-client) | Top-level React Native client bootstrapper. Wires together router, db, and client-context with environment config. |
| [`@owlmeans/native-panel`](packages/native-panel) | React Native UI component library built on `react-native-paper` (Material Design 3). Includes auth forms, navigation panels, and shared UI components. |

## 🏗️ **Architecture**

These packages implement the **Native** layer of the OwlMeans "Quadra" pattern:

```
Core (common) → Client (common) → Native (this repo)
                                → Web   (common)
```

- **Core packages** (`@owlmeans/context`, `@owlmeans/module`, `@owlmeans/auth`, etc.) are environment-agnostic and live in [owlmeans/common](https://github.com/owlmeans/common)
- **Client packages** (`@owlmeans/client`, `@owlmeans/client-auth`, etc.) are platform-agnostic React packages, also in [owlmeans/common](https://github.com/owlmeans/common)
- **Native packages** (this repo) provide React Native-specific implementations on top of the client layer

## 🚀 **Quick Start**

### Install

```bash
npm install @owlmeans/native-client @owlmeans/native-panel
```

React Native peer dependencies required:

```bash
npm install react-native react react-native-paper react-native-vector-icons react-router-native
npm install @react-native-async-storage/async-storage react-native-permissions
```

### Bootstrap your app

```typescript
import { setupNativeClient } from '@owlmeans/native-client'
import { config, AppType, Layer } from '@owlmeans/client-config'

const clientConfig = config(
  AppType.Frontend,
  'my-native-app',
  {
    layer: Layer.Service,
  }
)

// Boot OwlMeans context with native adapters (router, db, client)
const context = setupNativeClient(clientConfig)
await context.configure()
await context.init()
```

### Use native UI components

```tsx
import { PanelApp } from '@owlmeans/native-panel'

export default function App() {
  return (
    <PanelApp context={context}>
      {/* your screens */}
    </PanelApp>
  )
}
```

## 🔗 **Related Repos**

| Repo | Description |
|------|-------------|
| [owlmeans/common](https://github.com/owlmeans/common) | Core, Client, Web, Server, and Infrastructure packages |

## 📄 **License**

MIT — see [LICENSE](LICENSE) for details.

---

**OwlMeans Native** — *The OwlMeans framework on mobile.*

