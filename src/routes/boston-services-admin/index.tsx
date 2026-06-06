import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { apiFetch } from "@/lib/auth";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowUpRight, TrendingUp, Users, Clock, AlertCircle } from "lucide-react";

export const Route = createFileRoute("/boston-services-admin/")({
  component: DashboardOverview,
});

function DashboardOverview() {
  const { data: leads = [], isLoading: loadingLeads } = useQuery({
    queryKey: ['admin_quotes'],
    queryFn: async () => {
      const res = await apiFetch("/api/leads/");
      return res.json();
    }
  });

  const { data: services = [], isLoading: loadingServices } = useQuery({
    queryKey: ['admin_services'],
    queryFn: async () => {
      const res = await apiFetch("/api/services/");
      return res.json();
    }
  });

  const isLoading = loadingLeads || loadingServices;
  const newLeads = leads.filter((l: any) => l.status === "NEW").length;
  const conversionRate = leads.length > 0 ? Math.round((leads.filter((l: any) => l.status === "CONVERTED").length / leads.length) * 100) : 0;

  const recentQuotes = leads.slice(0, 5);

  return (
    <div className="space-y-12 animate-in fade-in duration-500">

      {/* Overview Section */}
      <section>
        <h2 className="text-3xl font-black text-ink tracking-tight mb-8">Overview</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Main Hero Metric */}
          <div className="md:col-span-2 bg-ink text-white rounded-[2rem] p-8 md:p-10 relative overflow-hidden flex flex-col justify-between min-h-[280px] shadow-xl shadow-ink/10">
            {/* Abstract Background Shapes */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/3" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-blue-500/20 rounded-full blur-[60px] translate-y-1/3 -translate-x-1/3" />

            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 border border-white/10 text-xs font-bold text-white mb-6">
                <Users className="w-3.5 h-3.5" /> Total Leads
              </div>
              {isLoading ? (
                <Skeleton className="h-20 w-32 bg-white/10 rounded-2xl" />
              ) : (
                <div className="flex items-end gap-4">
                  <span className="text-[5rem] leading-none font-black tracking-tighter">{leads.length}</span>
                  <div className="pb-3 flex items-center gap-1 text-emerald-400 font-bold text-sm">
                    <TrendingUp className="w-4 h-4" />
                  </div>
                </div>
              )}
            </div>

            <div className="relative z-10 flex items-center justify-between border-t border-white/10 pt-6 mt-8">

              <Link to="/boston-services-admin/quotes" className="px-5 py-2.5 bg-white text-ink rounded-xl text-xs font-black uppercase tracking-widest hover:bg-gray-50 transition-colors">
                View All
              </Link>
            </div>
          </div>

          {/* Secondary Metrics Stack */}
          <div className="flex flex-col gap-6">
            <div className="flex-1 bg-white border border-gray-100 rounded-[2rem] p-8 flex flex-col justify-center relative overflow-hidden group hover:border-primary/20 transition-colors shadow-sm">
              <div className="absolute top-6 right-6 w-10 h-10 rounded-full bg-orange-50 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                <AlertCircle className="w-5 h-5" />
              </div>
              <p className="text-gray-400 text-xs font-bold uppercase tracking-widest mb-2">Needs Action</p>
              {isLoading ? <Skeleton className="h-12 w-16 bg-gray-100" /> : <p className="text-4xl font-black text-ink">{newLeads}</p>}
            </div>

            <div className="flex-1 bg-white border border-gray-100 rounded-[2rem] p-8 flex flex-col justify-center relative overflow-hidden group hover:border-primary/20 transition-colors shadow-sm">
              <div className="absolute top-6 right-6 w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 group-hover:scale-110 transition-transform">
                <Clock className="w-5 h-5" />
              </div>
              <p className="text-gray-400 text-xs font-bold uppercase tracking-widest mb-2">Active Services</p>
              {isLoading ? <Skeleton className="h-12 w-16 bg-gray-100" /> : <p className="text-4xl font-black text-ink">{services.length}</p>}
            </div>
          </div>
        </div>
      </section>

      {/* Activity Section */}
      <section>
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-black text-ink tracking-tight">Recent Activity</h2>
            <p className="text-gray-400 text-sm font-medium mt-1">Latest quote requests from customers.</p>
          </div>
          <Link to="/boston-services-admin/quotes" className="text-[13px] font-bold text-primary flex items-center gap-1 hover:gap-2 transition-all">
            See all activity <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="bg-white border border-gray-100 rounded-[2rem] shadow-sm overflow-hidden">
          {isLoading ? (
            <div className="divide-y divide-gray-50">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="p-6 flex items-center gap-4">
                  <Skeleton className="w-10 h-10 rounded-full bg-gray-100" />
                  <div className="space-y-2 flex-1">
                    <Skeleton className="h-4 w-32 bg-gray-100" />
                    <Skeleton className="h-3 w-48 bg-gray-100" />
                  </div>
                </div>
              ))}
            </div>
          ) : recentQuotes.length === 0 ? (
            <div className="p-12 text-center text-gray-400">No recent activity.</div>
          ) : (
            <div className="divide-y divide-gray-50">
              {recentQuotes.map((quote: any) => (
                <div key={quote.id} className="p-6 flex flex-col sm:flex-row sm:items-center gap-4 hover:bg-gray-50/50 transition-colors group">
                  <div className="flex items-center gap-4 flex-1 min-w-0">
                    <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-ink font-bold text-sm shrink-0 border border-gray-200">
                      {quote.name?.charAt(0)?.toUpperCase()}
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-bold text-ink truncate mb-0.5">{quote.name}</p>
                      <div className="flex items-center gap-2 text-xs text-gray-500 font-medium truncate">
                        <span>{quote.service_title || quote.service}</span>
                        <span className="w-1 h-1 rounded-full bg-gray-300"></span>
                        <span className="truncate">{quote.email}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between sm:justify-end gap-4 pl-14 sm:pl-0 shrink-0">
                    <div className="text-right hidden sm:block">
                      <p className="text-xs font-bold text-ink mb-0.5">
                        {new Date(quote.created_at).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                      </p>
                      <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">
                        {new Date(quote.created_at).toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" })}
                      </p>
                    </div>

                    {quote.status === "NEW" && (
                      <span className="inline-flex items-center justify-center px-2.5 py-1 rounded-md bg-orange-50 text-primary text-[10px] font-black uppercase tracking-widest border border-orange-100/50">
                        New
                      </span>
                    )}
                    {quote.status === "CONTACTED" && (
                      <span className="inline-flex items-center justify-center px-2.5 py-1 rounded-md bg-blue-50 text-blue-600 text-[10px] font-black uppercase tracking-widest border border-blue-100/50">
                        Contacted
                      </span>
                    )}
                    {quote.status === "CONVERTED" && (
                      <span className="inline-flex items-center justify-center px-2.5 py-1 rounded-md bg-emerald-50 text-emerald-600 text-[10px] font-black uppercase tracking-widest border border-emerald-100/50">
                        Converted
                      </span>
                    )}

                    <Link to="/boston-services-admin/quotes" className="opacity-0 group-hover:opacity-100 transition-opacity p-2 text-gray-400 hover:text-ink bg-white shadow-sm border border-gray-100 rounded-lg">
                      <ArrowUpRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

    </div>
  );
}
