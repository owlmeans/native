---
description: "How to use @owlmeans/native-panel — React Native Material Design 3 panel/UI library built on react-native-paper. PanelApp is the root wrapper; re-exports makeContext, panel helpers, and all UI components (form, modal, list, tabs, etc.)."
applyTo: "**/*.ts, **/*.tsx"
---

# @owlmeans/native-panel

**Layer:** Native UI (React Native "quadra" panel — mirrors `@owlmeans/web-panel`)
**Install:** `"@owlmeans/native-panel": "^0.1.2"`

## Core exports

- `PanelApp` — root panel wrapper providing MD3 theme, auth, context
- `makeContext`, `AppConfig`, `AppContext` — re-exported from `@owlmeans/native-client`
- `handler`, `useContext`, `useNavigate`, `useValue`, `useToggle` — module/context hooks
- `module`, `elevate`, `stab`, `provideRequest` — module factories
- `route`, `frontend`, `croute`, `guard`, `parent` — route/guard factories
- `config`, `service` — config/service helpers
- `useCommonI18n`, `useI18nApp`, `addCommonI18n`, `addI18nApp` — i18n
- `DAUTH_GUARD` — default auth guard alias
- All `@owlmeans/client-panel` exports

## PanelApp usage

```typescript
import { makeContext, PanelApp } from '@owlmeans/native-panel'

const context = makeContext(appConfig)

export default function App() {
  return (
    <PanelApp context={context} name="admin">
      {/* screens / modules */}
    </PanelApp>
  )
}
```

## PanelApp props

- `context: AppContext` — from `makeContext()`
- `fonts?: MD3Fonts` — react-native-paper font config
- `colors?: Partial<MD3Colors>` — MD3 color overrides
- `name?: string` — panel resource name
- `icons?: Record<string, IconComponent>` — icon overrides

## Components

Button · Form (react-hook-form + AJV) · Header · Layout · List · Modal · Tabs · Text · Permissions · Progress

## Depends on

`@owlmeans/client-panel`, `@owlmeans/native-client`, `@owlmeans/client-auth`, `@owlmeans/client-i18n`, `@owlmeans/client-module`, `@owlmeans/i18n`, `@owlmeans/error`
Peers: `react`, `react-native`, `react-native-paper`, `react-native-reanimated`, `react-native-safe-area-context`, `react-native-vector-icons`, `react-hook-form`, `@hookform/resolvers`, `ajv`
