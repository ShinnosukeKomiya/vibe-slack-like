# Next.js 15 Parameter Handling

Next.js 15 now treats page component params as Promises. In client components, you need to handle them as follows:

1. Import the `use` function from React
2. Define the params type as `Promise<{ paramName: string }>`
3. Resolve the Promise with `use(params)` to access parameters

## Correct Implementation Example

```tsx
"use client";

// Importing use is important
import { use } from "react";

export default function Page({
  params,
}: {
  // Define as Promise type
  params: Promise<{ id: string }>;
}) {
  // Resolve params with use
  const { id } = use(params);

  return <div>ID: {id}</div>;
}
```

If you don't follow this approach, you'll get the error: "A param property was accessed directly with params". This is an important change in Next.js 15, and direct access will no longer be supported in future versions.
