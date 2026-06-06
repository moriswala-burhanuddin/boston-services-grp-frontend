import { QueryClient } from "@tanstack/react-query";
import { createRouter } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";
import { Skeleton } from "@/components/ui/skeleton";

function GlobalPendingComponent() {
  return (
    <div className="min-h-screen bg-white p-8 pt-32">
      <div className="container-page max-w-7xl mx-auto space-y-12">
        {/* Header Skeleton */}
        <div className="space-y-4">
          <Skeleton className="h-12 w-1/3 bg-gray-200 rounded-xl" />
          <Skeleton className="h-4 w-1/4 bg-gray-200" />
        </div>
        
        {/* Content Grid Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="space-y-4">
              <Skeleton className="h-64 w-full bg-gray-200 rounded-3xl" />
              <Skeleton className="h-6 w-3/4 bg-gray-200" />
              <Skeleton className="h-4 w-full bg-gray-200" />
              <Skeleton className="h-4 w-5/6 bg-gray-200" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export const getRouter = () => {
  const queryClient = new QueryClient();

  const router = createRouter({
    routeTree,
    context: { queryClient },
    scrollRestoration: true,
    defaultPreloadStaleTime: 0,
    defaultPendingComponent: GlobalPendingComponent,
    defaultPendingMs: 150,
    defaultPendingMinMs: 500,
  });

  return router;
};
