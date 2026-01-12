# Thin Apps - Route Shell Examples

**Date:** 2026-01-06  
**Purpose:** Minimal working route shells for each app demonstrating the "thin shell" pattern

---

## Pattern: Thin App Shells

**Apps are composition-only:**
- ✅ Route definitions
- ✅ Layout composition
- ✅ Provider setup
- ❌ NO business logic
- ❌ NO reusable components
- ❌ NO feature code

---

## apps/knowledge

### routes.ts

```typescript
import { type RouteConfig, layout, route, index } from '@react-router/dev/routes';

export default [
  // Knowledge app layout (shared docs shell)
  layout('routes/docs-layout.tsx', [
    index('routes/home.tsx'),
    
    // Documentation routes
    route('docs/*', 'routes/docs.tsx'),
    
    // Learning routes
    route('learn/*', 'routes/learn.tsx'),
    
    // Knowledge base routes
    route('kb/*', 'routes/kb.tsx'),
  ]),
] satisfies RouteConfig;
```

### app/routes/docs-layout.tsx

```typescript
import { Outlet } from 'react-router';
import { DocsShell } from '@xalatechnologies/ui';
import { ContentNavigation } from '@xalatechnologies/content/navigation';

/**
 * Shared layout for all knowledge app routes
 * Provides navigation sidebar and content area
 */
export default function DocsLayout() {
  return (
    <DocsShell>
      <ContentNavigation />
      <main className="flex-1">
        <Outlet />
      </main>
    </DocsShell>
  );
}
```

### app/routes/docs.tsx

```typescript
import { useParams, useLoaderData } from 'react-router';
import { loadContent } from '@xalatechnologies/content';
import { MDXProvider } from '@mdx-js/react';
import { MDXComponents } from '@xalatechnologies/content/mdx/components';
import { ContentHeader } from '@xalatechnologies/content/components/content';
import type { Route } from './+types/docs';

/**
 * Documentation route handler
 * Loads MDX content from @xalatechnologies/content
 */
export async function loader({ params, request }: Route.LoaderArgs) {
  const slug = params['*'] || 'index';
  const locale = new URL(request.url).searchParams.get('locale') || 'nb';
  
  const content = await loadContent(`docs/${slug}`, locale as 'nb' | 'en');
  
  return {
    content,
    locale,
  };
}

export default function DocsRoute() {
  const { content, locale } = useLoaderData<typeof loader>();
  const { compiled, meta } = content;
  const MDXContent = compiled.default;

  return (
    <article className="prose prose-lg max-w-none">
      <ContentHeader
        title={meta.frontmatter.title}
        description={meta.frontmatter.description}
        readingTime={meta.readingTime}
        updatedAt={meta.frontmatter.updatedAt}
      />
      
      <MDXProvider components={MDXComponents}>
        <MDXContent />
      </MDXProvider>
    </article>
  );
}
```

### app/routes/learn.tsx

```typescript
import { useLoaderData } from 'react-router';
import { loadContent } from '@xalatechnologies/content';
import { MDXProvider } from '@mdx-js/react';
import { MDXComponents } from '@xalatechnologies/content/mdx/components';
import { ContentHeader } from '@xalatechnologies/content/components/content';
import type { Route } from './+types/learn';

/**
 * Learning route handler
 * Loads learning content from @xalatechnologies/content
 */
export async function loader({ params, request }: Route.LoaderArgs) {
  const slug = params['*'] || 'index';
  const locale = new URL(request.url).searchParams.get('locale') || 'nb';
  
  const content = await loadContent(`learning/${slug}`, locale as 'nb' | 'en');
  
  return {
    content,
    locale,
  };
}

export default function LearnRoute() {
  const { content } = useLoaderData<typeof loader>();
  const { compiled, meta } = content;
  const MDXContent = compiled.default;

  return (
    <article className="prose prose-lg max-w-none">
      <ContentHeader
        title={meta.frontmatter.title}
        description={meta.frontmatter.description}
        readingTime={meta.readingTime}
      />
      
      <MDXProvider components={MDXComponents}>
        <MDXContent />
      </MDXProvider>
    </article>
  );
}
```

### app/routes/kb.tsx

```typescript
import { useLoaderData } from 'react-router';
import { loadContent } from '@xalatechnologies/content';
import { MDXProvider } from '@mdx-js/react';
import { MDXComponents } from '@xalatechnologies/content/mdx/components';
import { ContentHeader } from '@xalatechnologies/content/components/content';
import type { Route } from './+types/kb';

/**
 * Knowledge base route handler
 * Loads KB content from @xalatechnologies/content
 */
export async function loader({ params, request }: Route.LoaderArgs) {
  const slug = params['*'] || 'index';
  const locale = new URL(request.url).searchParams.get('locale') || 'nb';
  
  const content = await loadContent(`kb/${slug}`, locale as 'nb' | 'en');
  
  return {
    content,
    locale,
  };
}

export default function KbRoute() {
  const { content } = useLoaderData<typeof loader>();
  const { compiled, meta } = content;
  const MDXContent = compiled.default;

  return (
    <article className="prose prose-lg max-w-none">
      <ContentHeader
        title={meta.frontmatter.title}
        description={meta.frontmatter.description}
        readingTime={meta.readingTime}
      />
      
      <MDXProvider components={MDXComponents}>
        <MDXContent />
      </MDXProvider>
    </article>
  );
}
```

### app/root.tsx

```typescript
import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from 'react-router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { UiRuntimeProvider } from '@xalatechnologies/ui/runtime';
import { createNavigationAdapter } from './adapters/navigation';
import { createAuthAdapter } from './adapters/auth';
import { createTenantAdapter } from './adapters/tenant';
import '@xalatechnologies/ui/style.css';
import './app.css';

const queryClient = new QueryClient();

export default function Root() {
  return (
    <html lang="nb">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <QueryClientProvider client={queryClient}>
          <UiRuntimeProvider
            navigation={createNavigationAdapter()}
            auth={createAuthAdapter()}
            tenant={createTenantAdapter()}
          >
            <Outlet />
          </UiRuntimeProvider>
        </QueryClientProvider>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}
```

---

## apps/monitoring

### routes.ts

```typescript
import { type RouteConfig, index, route } from '@react-router/dev/routes';

export default [
  index('routes/dashboard.tsx'),
  route('scans', 'routes/scans.tsx'),
  route('scans/:runId', 'routes/scans.$runId.tsx'),
  route('requirements', 'routes/requirements.tsx'),
  route('requirements/:id', 'routes/requirements.$id.tsx'),
  route('compliance', 'routes/compliance.tsx'),
  route('ui-chemistry', 'routes/ui-chemistry.tsx'),
] satisfies RouteConfig;
```

### app/routes/dashboard.tsx

```typescript
import { useLoaderData } from 'react-router';
import { DashboardShell } from '@xalatechnologies/ui';
import { ScanSummary } from '@xalatechnologies/scanners';
import { RequirementsOverview } from '@xalatechnologies/requirements';
import type { Route } from './+types/dashboard';

/**
 * Monitoring dashboard
 * Shows scan summaries and requirements overview
 */
export async function loader({ request }: Route.LoaderArgs) {
  // Load dashboard data from API
  const response = await fetch(`${new URL(request.url).origin}/api/monitoring/dashboard`);
  const data = await response.json();
  
  return {
    recentScans: data.recentScans,
    requirementsSummary: data.requirementsSummary,
  };
}

export default function DashboardRoute() {
  const { recentScans, requirementsSummary } = useLoaderData<typeof loader>();

  return (
    <DashboardShell>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">Monitoring Dashboard</h1>
        
        <ScanSummary scans={recentScans} />
        <RequirementsOverview summary={requirementsSummary} />
      </div>
    </DashboardShell>
  );
}
```

### app/routes/requirements.tsx

```typescript
import { useLoaderData } from 'react-router';
import { DashboardShell } from '@xalatechnologies/ui';
import { RequirementsList } from '@xalatechnologies/requirements';
import type { Route } from './+types/requirements';

/**
 * Requirements list page
 * Shows all requirements with coverage status
 */
export async function loader({ request }: Route.LoaderArgs) {
  const response = await fetch(`${new URL(request.url).origin}/api/monitoring/requirements`);
  const data = await response.json();
  
  return {
    requirements: data.requirements,
  };
}

export default function RequirementsRoute() {
  const { requirements } = useLoaderData<typeof loader>();

  return (
    <DashboardShell>
      <RequirementsList requirements={requirements} />
    </DashboardShell>
  );
}
```

### app/routes/requirements.$id.tsx

```typescript
import { useLoaderData, useParams } from 'react-router';
import { DashboardShell } from '@xalatechnologies/ui';
import { RequirementDetail } from '@xalatechnologies/requirements';
import type { Route } from './+types/requirements.$id';

/**
 * Requirement detail page
 * Shows requirement with evidence and traceability
 */
export async function loader({ params, request }: Route.LoaderArgs) {
  const { id } = params;
  const response = await fetch(`${new URL(request.url).origin}/api/monitoring/requirements/${id}`);
  const data = await response.json();
  
  return {
    requirement: data.requirement,
  };
}

export default function RequirementDetailRoute() {
  const { requirement } = useLoaderData<typeof loader>();

  return (
    <DashboardShell>
      <RequirementDetail requirement={requirement} />
    </DashboardShell>
  );
}
```

---

## apps/web

### routes.ts (Example)

```typescript
import { type RouteConfig, layout, route, index } from '@react-router/dev/routes';

export default [
  layout('routes/public-layout.tsx', [
    index('routes/home.tsx'),
    route('listings/*', 'routes/listings.tsx'),
    route('bookings/*', 'routes/bookings.tsx'),
  ]),
] satisfies RouteConfig;
```

### app/routes/listings.tsx

```typescript
import { useLoaderData } from 'react-router';
import { PublicPageShell } from '@xalatechnologies/ui';
import { ListingsGrid } from '@xalatechnologies/ui/features/listings';
import { useListings } from '@xalatechnologies/domain-hooks/listings';
import type { Route } from './+types/listings';

/**
 * Listings page
 * Uses domain hooks and UI feature components
 */
export async function loader({ request }: Route.LoaderArgs) {
  // Pre-fetch data if needed
  return {};
}

export default function ListingsRoute() {
  const { data: listings } = useListings();

  return (
    <PublicPageShell>
      <ListingsGrid listings={listings} />
    </PublicPageShell>
  );
}
```

---

## apps/backoffice

### routes.ts (Example)

```typescript
import { type RouteConfig, layout, route, index } from '@react-router/dev/routes';

export default [
  layout('routes/admin-layout.tsx', [
    index('routes/dashboard.tsx'),
    route('listings/*', 'routes/listings.tsx'),
    route('approvals/*', 'routes/approvals.tsx'),
  ]),
] satisfies RouteConfig;
```

### app/routes/admin-layout.tsx

```typescript
import { Outlet } from 'react-router';
import { DashboardPageShell } from '@xalatechnologies/ui';
import { AdminSidebar } from '@xalatechnologies/ui/features/admin';

/**
 * Admin layout shell
 * Provides sidebar and main content area
 */
export default function AdminLayout() {
  return (
    <DashboardPageShell>
      <AdminSidebar />
      <main className="flex-1">
        <Outlet />
      </main>
    </DashboardPageShell>
  );
}
```

---

## Key Patterns

### 1. Loader Pattern

```typescript
export async function loader({ request }: Route.LoaderArgs) {
  // Fetch data from API or use domain hooks
  // Return serializable data
  return { data };
}
```

### 2. Component Pattern

```typescript
export default function RouteComponent() {
  const { data } = useLoaderData<typeof loader>();
  
  // Use package components only
  return (
    <Shell>
      <FeatureComponent data={data} />
    </Shell>
  );
}
```

### 3. Layout Pattern

```typescript
export default function Layout() {
  return (
    <Shell>
      <Navigation />
      <main>
        <Outlet />
      </main>
    </Shell>
  );
}
```

### 4. Provider Pattern

```typescript
// In root.tsx
<QueryClientProvider client={queryClient}>
  <UiRuntimeProvider adapters={adapters}>
    <Outlet />
  </UiRuntimeProvider>
</QueryClientProvider>
```

---

## What NOT to Do

### ❌ Business Logic in Routes

```typescript
// ❌ WRONG - Business logic in route
export default function ListingsRoute() {
  const [listings, setListings] = useState([]);
  
  useEffect(() => {
    // Business logic here
    fetchListings().then(setListings);
  }, []);
  
  return <div>{/* ... */}</div>;
}
```

### ✅ Use Domain Hooks

```typescript
// ✅ CORRECT - Use domain hooks
export default function ListingsRoute() {
  const { data: listings } = useListings();
  
  return <ListingsGrid listings={listings} />;
}
```

---

### ❌ Reusable Components in Apps

```typescript
// ❌ WRONG - Reusable component in app
// apps/web/app/components/ListingCard.tsx
export function ListingCard({ listing }) {
  return <div>{/* ... */}</div>;
}
```

### ✅ Components in Packages

```typescript
// ✅ CORRECT - Component in package
// packages/client/ui/src/features/listings/ListingCard.tsx
export function ListingCard({ listing }) {
  return <div>{/* ... */}</div>;
}
```

---

### ❌ Direct API Calls in Routes

```typescript
// ❌ WRONG - Direct API call
export async function loader() {
  const response = await fetch('/api/listings');
  return { listings: await response.json() };
}
```

### ✅ Use Domain Hooks or Services

```typescript
// ✅ CORRECT - Use domain hooks (client-side) or services (server-side)
export async function loader() {
  const listings = await listingService.getAll();
  return { listings };
}
```

---

## Summary

**Apps are thin shells:**
- Routes compose packages
- Layouts use package shells
- Providers wire adapters
- No business logic
- No reusable components
- No feature code

**Packages provide:**
- Business logic (domain hooks)
- UI components
- Content loading
- Scanners and utilities
- Types and models
