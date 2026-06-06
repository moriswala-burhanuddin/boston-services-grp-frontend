import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
} from "@tanstack/react-router";

import appCss from "../styles.css?url";
import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";
import { QuoteForm } from "@/components/site/QuoteForm";
import { WhatsApp, CookieNotice } from "@/components/site/Floats";
import image404 from "@/assets/404-illustration.png";


function NotFoundComponent() {
  return (
    <main className="min-h-screen bg-white flex flex-col">
      <Nav />
      
      <section className="flex-1 relative pt-32 pb-20 md:pt-48 md:pb-32 bg-gray-50 overflow-hidden flex flex-col items-center justify-center">
        <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-white to-transparent pointer-events-none"></div>
        
        <div className="container-page relative z-10 flex flex-col items-center text-center">
          <div className="w-64 h-64 sm:w-96 sm:h-96 shrink-0 bg-white shadow-2xl shadow-black/5 rounded-[3rem] p-8 flex items-center justify-center border border-gray-100 mb-10 animate-in zoom-in duration-700">
            <img src={image404} alt="404 - Under Construction" className="w-full h-full object-contain drop-shadow-[0_20px_30px_rgba(0,0,0,0.15)]" />
          </div>
          
          <h1 className="text-6xl md:text-8xl font-black tracking-tighter text-ink mb-6">
            Oops... <span className="text-primary">404</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 font-medium leading-relaxed max-w-2xl mx-auto mb-10">
            It looks like this page is still under construction or doesn't exist. Let's get you back to safe ground.
          </p>
          
          <Link to="/" className="inline-flex h-16 items-center justify-center rounded-full bg-primary px-10 text-sm font-black uppercase tracking-widest text-white transition-transform hover:scale-105 shadow-xl shadow-primary/20">
            Return to Homepage
          </Link>
        </div>
      </section>

      <Footer />
      <WhatsApp />
      <CookieNotice />
    </main>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <Outlet />
    </QueryClientProvider>
  );
}
