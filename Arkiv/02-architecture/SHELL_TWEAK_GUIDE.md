# **🎛️ SHELL TWEAK GUIDE**

## **📋 THE NEW RULE: APPS DECLARE CONFIG, DON'T CHANGE UI**

Each app should have exactly one configuration file:
```
apps/<app>/src/shell.config.ts
```

**This is where ALL UI behavior is controlled - no custom layout code in apps!**

---

## **🎛️ CONTROLLED LEVERS**

### **1. ShellConfig (Per App Overrides)**
```typescript
export default defineShellConfig({
  appId: "backoffice",
  shell: "dashboard",
  sidebar: { mode: "left+right", collapsible: true, defaultCollapsed: false },
  header: {
    sticky: true,
    features: ["globalSearch", "languageSwitch", "orgSwitch", "notifications", "profileMenu"],
    logo: { variant: "icon", source: "platform", href: "/dashboard" }
  },
  rightPanel: { enabled: true, mode: "drawer" },
  uiDensity: "compact",
  defaultRoute: "/dashboard"
});
```

### **2. Registry Data (Navigation & Content)**
- **Sidebar items** - controlled via registry navigation tree
- **Order & labels** - managed in registry, not code
- **Permissions/flags** - show/hide via registry filters
- **Icons & i18n** - centralized in registry service

### **3. UI Package Slots & Variants**
- **Header features** - controlled by `header.features[]`
- **Sidebar modes** - left/right/both/docs-specific
- **Right panel** - drawer/overlay/inline variants
- **Component slots** - controlled extension points

---

## **🎯 COMMON TWEAKS AND SOLUTIONS**

### **"Backoffice needs different header"**
✅ **ShellConfig + header features**
```typescript
header: {
  features: ["globalSearch", "orgSwitch", "notifications", "profileMenu"],
  logo: { variant: "compact", source: "admin" }
}
```
✅ **Maybe UI variant**: `<TopHeader variant="admin" />`
❌ **Never**: Custom app header component

### **"Docs needs left nav + right 'On this page'"**
✅ **Shell config**:
```typescript
shell: "docs",
sidebar: { mode: "docs-left+right" }
```
✅ **UI provides**: Both panels automatically
❌ **Never**: Custom sidebar implementation

### **"Learning hub needs progress widget in header"**
✅ **Add HeaderFeature**: Create in UI package
✅ **Controlled**: `header.features: ["learningProgress"]`
❌ **Never**: Inject arbitrary app header JSX

### **"Monitoring needs fewer nav items"**
✅ **Registry filtering**:
```typescript
// Registry filters by permissions/flags/navId
navigation: { leftNavId: "monitoring" }
```
❌ **Never**: Custom sidebar code

---

## **🔄 SAFE TWEAK WORKFLOW**

Use this order for any UI changes:

1. **🎛️ Can config solve it?** → Change `shell.config.ts`
2. **🧭 Is it navigation?** → Change registry tree/flags/permissions  
3. **🎨 Is it UI capability?** → Add feature/slot/variant in `@xalatechnologies/ui`
4. **🎭 Is it visual styling?** → Change tokens/theme

---

## **📱 EXAMPLE APP CONFIGURATIONS**

### **Web App (Full Features)**
```typescript
export default defineShellConfig({
  appId: "web",
  shell: "dashboard",
  sidebar: { mode: "left", collapsible: true },
  header: {
    features: ["globalSearch", "languageSwitch", "orgSwitch", "notifications", "profileMenu"],
    logo: { variant: "full", source: "platform" }
  },
  rightPanel: { enabled: true, mode: "drawer" },
  uiDensity: "comfortable"
});
```

### **Docs App (Navigation Focused)**
```typescript
export default defineShellConfig({
  appId: "docs", 
  shell: "docs",
  sidebar: { mode: "docs-left+right", collapsible: true },
  header: {
    features: ["globalSearch", "languageSwitch"],
    logo: { variant: "text", source: "docs" }
  },
  rightPanel: { enabled: true, mode: "inline" },
  uiDensity: "comfortable"
});
```

### **Monitoring App (Compact & Focused)**
```typescript
export default defineShellConfig({
  appId: "monitoring",
  shell: "dashboard", 
  sidebar: { mode: "left", collapsible: false },
  header: {
    features: ["notifications", "profileMenu"],
    logo: { variant: "icon", source: "platform" }
  },
  rightPanel: { enabled: false },
  uiDensity: "compact"
});
```

---

## **🚫 WHAT NOT TO DO**

### **❌ FORBIDDEN IN APPS**
- Custom `<Header />` components
- Custom `<Sidebar />` components  
- Custom `<Layout />` wrappers
- Raw HTML layout elements (`<div>`, `<header>`, `<main>`)
- Inline styling or CSS classes
- Navigation arrays in app code

### **✅ ALLOWED IN APPS**
- `shell.config.ts` declarations
- Route definitions only
- Page composition with semantic components
- Domain-specific widgets (created in UI package)

---

## **🛠️ PAGE COMPOSITION RULES**

When editing app pages, keep to:

### **✅ USE THESE**
```tsx
<Page>
  <PageHeader title="Page Title" />
  <PageBody>
    <Stack direction="vertical" spacing="lg">
      <Card>Content</Card>
      <Grid>Layout</Grid>
    </Stack>
  </PageBody>
</Page>
```

### **❌ AVOID THESE**
```tsx
// Never custom layout wrappers
<div className="flex">
  <header>Custom header</header>
  <main>Custom layout</main>
</div>
```

---

## **🎯 IF YOU NEED NEW UI PATTERNS**

1. **Create in UI package**: `@xalatechnologies/ui`
2. **Make it reusable**: Component or block
3. **Consume in apps**: Import and use
4. **Never copy-paste**: Keep single source of truth

---

## **🔍 ENFORCEMENT**

### **Scanner Rules**
- ❌ Fail if apps contain `Header.tsx`, `Sidebar.tsx`, `Layout.tsx`
- ❌ Fail if apps use raw HTML layout elements
- ✅ Require `shell.config.ts` in every app

### **Code Review Checklist**
- [ ] Changes are in `shell.config.ts`, not custom components
- [ ] Navigation changes are in registry, not app code
- [ ] UI patterns are created in UI package, not apps
- [ ] No raw HTML or custom layout in apps

---

## **🚀 GETTING STARTED**

1. **Identify your tweak** - What do you want to change?
2. **Choose the right lever** - Config, Registry, or UI package?
3. **Make the change** - Use the appropriate system
4. **Test with Storybook** - Verify shell behavior
5. **Deploy with confidence** - No architectural drift

---

**🎉 RESULT: Apps remain ultra-thin while UI becomes infinitely flexible through controlled configuration!**
