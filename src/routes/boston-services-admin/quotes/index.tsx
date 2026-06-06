import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Search, Mail, Phone, Inbox, Clock, CheckCircle2, AlertCircle, XCircle } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { apiFetch } from "@/lib/auth";
import { useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";

export const Route = createFileRoute("/boston-services-admin/quotes/")({
  component: QuotesPage,
});

const STATUS_CONFIG: Record<string, { label: string; color: string; border: string; bg: string; icon: any }> = {
  NEW: { label: "New Lead", color: "text-[#ff6b00]", border: "border-[#ff6b00]/20", bg: "bg-[#fff4ec]", icon: AlertCircle },
  CONTACTED: { label: "Contacted", color: "text-blue-600", border: "border-blue-200", bg: "bg-blue-50", icon: Clock },
  CONVERTED: { label: "Converted", color: "text-emerald-600", border: "border-emerald-200", bg: "bg-emerald-50", icon: CheckCircle2 },
  REJECTED: { label: "Rejected", color: "text-red-600", border: "border-red-200", bg: "bg-red-50", icon: XCircle },
};

function QuotesPage() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("ALL");

  const { data: allQuotes = [], isLoading } = useQuery({
    queryKey: ['admin_quotes'],
    queryFn: async () => {
      const res = await apiFetch("/api/leads/");
      return res.json();
    }
  });

  const filtered = allQuotes.filter((q: any) => {
    if (statusFilter !== "ALL" && q.status !== statusFilter) return false;
    if (!search) return true;
    const s = search.toLowerCase();
    return (
      q.name?.toLowerCase().includes(s) ||
      q.email?.toLowerCase().includes(s) ||
      q.service_title?.toLowerCase().includes(s) ||
      q.phone?.includes(s)
    );
  });

  return (
    <div className="space-y-8 animate-in fade-in duration-500 min-h-[calc(100vh-12rem)] flex flex-col">
      {/* Header & Controls */}
      <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-6 shrink-0">
        <div>
          <h2 className="text-3xl font-black text-ink tracking-tight">Inbox</h2>
          <p className="mt-1 text-sm text-gray-400 font-medium">Manage and respond to quote requests.</p>
        </div>
        
        <div className="flex flex-col sm:flex-row items-center gap-3">
          {/* Status Tabs */}
          <div className="flex p-1 bg-white/50 rounded-xl border border-gray-100 shadow-sm">
            <button 
              onClick={() => setStatusFilter("ALL")}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${statusFilter === "ALL" ? "bg-[#ff6b00] text-white shadow-md shadow-[#ff6b00]/20" : "text-gray-500 hover:text-ink hover:bg-gray-50"}`}
            >
              All
            </button>
            {Object.keys(STATUS_CONFIG).map(status => (
              <button 
                key={status}
                onClick={() => setStatusFilter(status)}
                className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${statusFilter === status ? "bg-[#ff6b00] text-white shadow-md shadow-[#ff6b00]/20" : "text-gray-500 hover:text-ink hover:bg-gray-50"}`}
              >
                {STATUS_CONFIG[status].label}
              </button>
            ))}
          </div>

          {/* Search */}
          <div className="relative w-full sm:w-64 shadow-sm rounded-xl">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search leads..."
              className="w-full pl-9 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#ff6b00]/20 focus:border-[#ff6b00] transition-all text-sm font-medium"
            />
          </div>
        </div>
      </div>

      {/* Content Area */}
      <div className="flex-1 bg-white rounded-[2rem] border border-gray-100 shadow-[0_8px_30px_rgba(0,0,0,0.04)] overflow-hidden flex flex-col relative">
        
        {isLoading ? (
          <div className="p-8 space-y-4">
            {Array.from({ length: 5 }).map((_, i) => (
              <Skeleton key={i} className="h-24 w-full bg-gray-50 rounded-2xl border border-gray-100" />
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center p-12 text-center">
            <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center border border-gray-100 mb-4">
              <Inbox className="w-6 h-6 text-gray-300" />
            </div>
            <h3 className="text-lg font-bold text-ink">No leads found</h3>
            <p className="text-sm text-gray-400 mt-1">Try adjusting your filters or search query.</p>
          </div>
        ) : (
          <div className="flex-1 overflow-auto p-6 md:p-8 space-y-4">
            {filtered.map((quote: any) => {
              const sc = STATUS_CONFIG[quote.status] || STATUS_CONFIG.NEW;
              
              return (
                <div 
                  key={quote.id} 
                  onClick={() => navigate({ to: `/boston-services-admin/quotes/${quote.id}` })}
                  className="bg-white rounded-2xl border border-gray-100 hover:border-[#ff6b00]/30 hover:shadow-[0_8px_30px_rgba(255,107,0,0.06)] transition-all cursor-pointer group"
                >
                  <div className="p-5 md:p-6 flex flex-col md:flex-row md:items-center gap-6">
                    
                    {/* Left: Avatar & Name */}
                    <div className="flex items-center gap-4 min-w-[240px]">
                      <div className="w-12 h-12 rounded-xl bg-[#ff6b00]/5 border border-[#ff6b00]/10 flex items-center justify-center text-[#ff6b00] font-black text-lg shrink-0 group-hover:bg-[#ff6b00] group-hover:text-white transition-colors">
                        {quote.name?.charAt(0)?.toUpperCase()}
                      </div>
                      <div>
                        <h4 className="text-base font-bold text-ink mb-0.5 group-hover:text-[#ff6b00] transition-colors">{quote.name}</h4>
                        <div className="flex items-center gap-2 text-xs text-gray-400 font-medium">
                          <Clock className="w-3.5 h-3.5" />
                          {new Date(quote.created_at).toLocaleDateString("en-US", { month: "short", day: "numeric", hour: "numeric", minute: "2-digit" })}
                        </div>
                      </div>
                    </div>

                    {/* Middle: Service & Contact */}
                    <div className="flex-1 min-w-0">
                      <div className="inline-flex px-3 py-1 bg-gray-50 border border-gray-100 rounded-lg text-xs font-bold text-ink mb-2">
                        {quote.service_title || quote.service}
                      </div>
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <span className="flex items-center gap-1.5 truncate"><Mail className="w-4 h-4" /> {quote.email}</span>
                        {quote.phone && <span className="flex items-center gap-1.5 truncate"><Phone className="w-4 h-4" /> {quote.phone}</span>}
                      </div>
                    </div>

                    {/* Right: Status & Actions */}
                    <div className="flex items-center justify-between md:justify-end gap-4 shrink-0">
                      <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-black uppercase tracking-wider ${sc.bg} ${sc.color} ${sc.border}`}>
                        <sc.icon className="w-3.5 h-3.5" /> {sc.label}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

