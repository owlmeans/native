---
name: native-panel
description: How to use @owlmeans/native-panel — React Native Material Design 3 panel/UI component library built on react-native-paper. Use PanelApp as the root wrapper; re-exports makeContext, common panel helpers, and form/modal/list components. Auto-invoked when importing from native-panel or building React Native admin/dashboard UIs.
user-invocable: false
---

# @owlmeans/native-panel

**Layer:** Native UI (React Native "quadra" panel — mirrors `@owlmeans/web-panel` for mobile)
**Install:** `"@owlmeans/native-panel": "^0.1.2"` in `dependencies`

## Key Exports

| Export | Description |
|--------|-------------|
| `PanelApp` | Root panel wrapper — provides theme, auth, context (`context`, `fonts`, `colors`, `icons`) |
| `makeContext` | Re-exported from `@owlmeans/native-client` — use this in panel apps instead of importing from native-client directly |
| `AppConfig`, `AppContext` | Re-exported types from `@owlmeans/native-client` |
| `handler`, `useContext` | Module handler and context hook (from `@owlmeans/client`) |
| `module`, `elevate`, `stab` | Module factories (from `@owlmeans/client-module`) |
| `route`, `frontend`, `croute` | Route factories |
| `guard`, `parent` | Module guard helpers |
| `config`, `service` | Config/service helpers |
| `useCommonI18n`, `useI18nApp` | i18n hooks for components |
| `addCommonI18n`, `addI18nApp` | i18n registration helpers |
| `DAUTH_GUARD` | Default auth guard alias constant |
| All `@owlmeans/client-panel` exports | Shared panel primitives |

## PanelApp Props

```typescript
interface PanelAppProps {
  context: AppContext        // from makeContext()
  provide?: ProvideFunction  // custom router provider (defaults to native-router)
  children: React.ReactNode
  fonts?: MD3Fonts           // custom react-native-paper font config
  colors?: Partial<MD3Colors> // Material Design 3 color overrides
  name?: string              // panel resource name for i18n / routing
  icons?: Record<string, IconComponent> // additional icon mappings
}
```

## Bootstrap Pattern

```typescript
import { makeContext, PanelApp } from '@owlmeans/native-panel'

const context = makeContext(appConfig)

export default function App() {
  return (
    <PanelApp context={context} name="admin">
      {/* panel routes/screens */}
    </PanelApp>
  )
}
```

## Components (from `src/components/`)

- **Button** — Material Design button variants
- **Form** — form wrapper with react-hook-form + AJV validation
- **Header** — screen header with navigation
- **Layout** — screen layout scaffolding
- **List** — list views for resource records
- **Modal** — modal dialogs (`useSetupModalNavigator`, `ModalBodyProps`)
- **Tabs** — tab navigation
- **Text** — typography primitives
- **PanelApp** — root app wrapper (see above)
- **Permissions** — permission-gated component wrappers
- **Progress** — loading/progress indicators

## Peer Dependencies

```
react, react-native, react-native-paper, react-native-reanimated,
react-native-safe-area-context, react-native-vector-icons,
react-hook-form, @hookform/resolvers, ajv
```

## Depends On

- `@owlmeans/client-panel`, `@owlmeans/native-client`
- `@owlmeans/client-auth`, `@owlmeans/client-i18n`, `@owlmeans/client-module`
- `@owlmeans/i18n`, `@owlmeans/error`
