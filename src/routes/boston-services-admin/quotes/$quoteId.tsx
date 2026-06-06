import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiFetch } from "@/lib/auth";
import { useState } from "react";
import { ArrowLeft, Mail, Phone, Clock, Send, AlertCircle, CheckCircle2, XCircle, Trash2, Calendar, ImageIcon } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

export const Route = createFileRoute("/boston-services-admin/quotes/$quoteId")({
  component: QuoteDetailPage,
});

const STATUS_CONFIG: Record<string, { label: string; color: string; border: string; bg: string; icon: any }> = {
  NEW: { label: "New Lead", color: "text-[#ff6b00]", border: "border-[#ff6b00]/20", bg: "bg-[#fff4ec]", icon: AlertCircle },
  CONTACTED: { label: "Contacted", color: "text-blue-600", border: "border-blue-200", bg: "bg-blue-50", icon: Clock },
  CONVERTED: { label: "Converted", color: "text-emerald-600", border: "border-emerald-200", bg: "bg-emerald-50", icon: CheckCircle2 },
  REJECTED: { label: "Rejected", color: "text-red-600", border: "border-red-200", bg: "bg-red-50", icon: XCircle },
};

function QuoteDetailPage() {
  const { quoteId } = Route.useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  
  const [subject, setSubject] = useState("Quotation for Boston Services");
  const [message, setMessage] = useState("");
  const [deleteConfirm, setDeleteConfirm] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");

  const { data: lead, isLoading } = useQuery({
    queryKey: ['admin_quote', quoteId],
    queryFn: async () => {
      const res = await apiFetch(`/api/leads/${quoteId}/`);
      if (!res.ok) throw new Error("Lead not found");
      return res.json();
    }
  });

  const updateStatusMutation = useMutation({
    mutationFn: async (status: string) => {
      const res = await apiFetch(`/api/leads/${quoteId}/`, {
        method: "PATCH",
        body: JSON.stringify({ status }),
      });
      if (!res.ok) throw new Error("Failed to update status");
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin_quote', quoteId] });
      queryClient.invalidateQueries({ queryKey: ['admin_quotes'] });
    },
  });

  const sendEmailMutation = useMutation({
    mutationFn: async () => {
      const res = await apiFetch(`/api/leads/${quoteId}/send_message/`, {
        method: "POST",
        body: JSON.stringify({ subject, message }),
      });
      if (!res.ok) throw new Error("Failed to send email");
      return res.json();
    },
    onSuccess: () => {
      setSuccessMsg("Email sent successfully!");
      setMessage("");
      setTimeout(() => setSuccessMsg(""), 3000);
      queryClient.invalidateQueries({ queryKey: ['admin_quote', quoteId] });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async () => {
      const res = await apiFetch(`/api/leads/${quoteId}/`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete");
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin_quotes'] });
      navigate({ to: "/boston-services-admin/quotes" });
    },
  });

  if (isLoading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-10 w-32 bg-gray-200" />
        <Skeleton className="h-[400px] w-full bg-white rounded-[2rem]" />
      </div>
    );
  }

  if (!lead) return <div>Lead not found.</div>;

  const currentStatus = STATUS_CONFIG[lead.status] || STATUS_CONFIG.NEW;

  return (
    <div className="space-y-6 animate-in fade-in duration-500 pb-12">
      
      {/* Top Nav */}
      <div className="flex items-center gap-4">
        <Link 
          to="/boston-services-admin/quotes"
          className="flex items-center gap-2 text-sm font-bold text-gray-400 hover:text-ink transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Inbox
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column: Lead Info */}
        <div className="lg:col-span-1 space-y-6">
          
          {/* Profile Card */}
          <div className="bg-white rounded-[2rem] border border-gray-100 shadow-sm p-8 text-center relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-br from-[#ff6b00]/10 to-transparent" />
            
            <div className="w-24 h-24 rounded-full bg-white shadow-xl mx-auto mb-6 flex items-center justify-center text-4xl font-black text-[#ff6b00] relative z-10 border-4 border-white">
              {lead.name?.charAt(0)?.toUpperCase()}
            </div>
            
            <h2 className="text-2xl font-black text-ink mb-2">{lead.name}</h2>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-bold bg-gray-50 text-gray-500 mb-6 border border-gray-100">
              <Calendar className="w-3.5 h-3.5" />
              {new Date(lead.created_at).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
            </div>

            <div className="flex justify-center gap-3">
              <a href={`tel:${lead.phone}`} className="w-12 h-12 rounded-xl bg-gray-50 hover:bg-gray-100 border border-gray-100 flex items-center justify-center text-ink transition-all hover:scale-105 shadow-sm">
                <Phone className="w-5 h-5" />
              </a>
              <a href={`mailto:${lead.email}`} className="w-12 h-12 rounded-xl bg-[#ff6b00] hover:bg-[#e66000] flex items-center justify-center text-white transition-all hover:scale-105 shadow-md shadow-[#ff6b00]/20">
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Contact Details */}
          <div className="bg-white rounded-[2rem] border border-gray-100 shadow-sm p-8 space-y-6">
            <h3 className="text-sm font-black uppercase tracking-widest text-gray-400">Contact Details</h3>
            
            <div>
              <p className="text-xs font-bold text-gray-400 mb-1">Email Address</p>
              <p className="text-sm font-bold text-ink truncate">{lead.email}</p>
            </div>
            
            {lead.phone && (
              <div>
                <p className="text-xs font-bold text-gray-400 mb-1">Phone Number</p>
                <p className="text-sm font-bold text-ink">{lead.phone}</p>
              </div>
            )}
          </div>

          {/* Danger Zone */}
          <div className="bg-white rounded-[2rem] border border-gray-100 shadow-sm p-8">
            {deleteConfirm ? (
              <div className="space-y-4">
                <p className="text-sm font-bold text-red-600 text-center">Are you sure?</p>
                <div className="flex gap-2">
                  <button onClick={() => setDeleteConfirm(false)} className="flex-1 py-2 rounded-xl text-xs font-bold text-gray-500 bg-gray-50 hover:bg-gray-100">Cancel</button>
                  <button onClick={() => deleteMutation.mutate()} className="flex-1 py-2 rounded-xl text-xs font-bold text-white bg-red-600 hover:bg-red-700">Delete</button>
                </div>
              </div>
            ) : (
              <button onClick={() => setDeleteConfirm(true)} className="w-full py-3 rounded-xl border-2 border-red-50 hover:bg-red-50 text-red-600 text-sm font-bold transition-colors flex items-center justify-center gap-2">
                <Trash2 className="w-4 h-4" /> Delete Lead
              </button>
            )}
          </div>
        </div>

        {/* Right Column: Request & Messaging */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Status Bar */}
          <div className="bg-white rounded-[2rem] border border-gray-100 shadow-sm p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="text-sm font-black text-gray-400 uppercase tracking-widest">Status:</span>
              <span className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-xl border text-sm font-black uppercase tracking-wider ${currentStatus.bg} ${currentStatus.color} ${currentStatus.border}`}>
                <currentStatus.icon className="w-4 h-4" /> {currentStatus.label}
              </span>
            </div>
            <div className="flex gap-2 w-full sm:w-auto overflow-x-auto pb-2 sm:pb-0">
              {Object.keys(STATUS_CONFIG).map((status) => {
                if (status === lead.status) return null;
                const sc = STATUS_CONFIG[status];
                return (
                  <button
                    key={status}
                    onClick={() => updateStatusMutation.mutate(status)}
                    className="shrink-0 px-4 py-2 rounded-xl border border-gray-200 text-xs font-bold text-gray-500 hover:bg-gray-50 transition-colors"
                  >
                    Mark {sc.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Request Details */}
          <div className="bg-white rounded-[2rem] border border-gray-100 shadow-sm overflow-hidden">
            <div className="bg-gray-50/50 p-6 border-b border-gray-100 flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-white shadow-sm flex items-center justify-center text-[#ff6b00]">
                <AlertCircle className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs font-black uppercase tracking-widest text-gray-400 mb-0.5">Service Requested</p>
                <h3 className="text-base font-bold text-ink">{lead.service_title || lead.service}</h3>
              </div>
            </div>
            <div className="p-8">
              <p className="text-sm font-medium text-gray-600 leading-relaxed whitespace-pre-wrap">
                {lead.message || "No additional message provided by the customer."}
              </p>
            </div>
          </div>

          {/* Attached Photos */}
          {lead.photos && lead.photos.length > 0 && (
            <div className="bg-white rounded-[2rem] border border-gray-100 shadow-[0_8px_30px_rgba(0,0,0,0.04)] p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-500">
                  <ImageIcon className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-black text-ink">Attached Photos</h3>
                  <p className="text-xs font-medium text-gray-400">{lead.photos.length} image(s) provided by the customer</p>
                </div>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {lead.photos.map((photo: any) => (
                  <a key={photo.id} href={`http://localhost:8000${photo.image}`} target="_blank" rel="noreferrer" className="block relative aspect-square rounded-2xl overflow-hidden border border-gray-100 hover:border-[#ff6b00] transition-colors group shadow-sm hover:shadow-md bg-gray-50">
                    <img src={`http://localhost:8000${photo.image}`} alt="Lead upload" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                  </a>
                ))}
              </div>
            </div>
          )}

          {/* Quotation / Messaging System */}
          <div className="bg-white rounded-[2rem] border border-gray-100 shadow-[0_8px_30px_rgba(0,0,0,0.04)] p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-[#ff6b00]/10 flex items-center justify-center text-[#ff6b00]">
                <Send className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-black text-ink">Send Quotation / Message</h3>
                <p className="text-xs font-medium text-gray-400">Sends a professional HTML email directly to {lead.name}</p>
              </div>
            </div>

            {successMsg && (
              <div className="mb-6 p-4 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center gap-3 text-emerald-700 text-sm font-bold animate-in fade-in zoom-in">
                <CheckCircle2 className="w-5 h-5" /> {successMsg}
              </div>
            )}

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-black uppercase tracking-widest text-gray-400 mb-2 ml-1">Subject</label>
                <input 
                  type="text" 
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-[#ff6b00]/20 focus:border-[#ff6b00] transition-all text-sm font-bold text-ink"
                />
              </div>

              <div>
                <label className="block text-xs font-black uppercase tracking-widest text-gray-400 mb-2 ml-1">Message Content</label>
                <textarea 
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={8}
                  placeholder="Type your quotation, pricing, or message here. This will be beautifully formatted in the email..."
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-[#ff6b00]/20 focus:border-[#ff6b00] transition-all text-sm font-medium text-ink resize-none"
                />
              </div>

              <div className="flex justify-end pt-4">
                <button 
                  onClick={() => sendEmailMutation.mutate()}
                  disabled={sendEmailMutation.isPending || !message.trim()}
                  className="flex items-center gap-2 px-8 py-3.5 rounded-xl bg-[#ff6b00] hover:bg-[#e66000] text-white text-sm font-black uppercase tracking-widest transition-all shadow-lg shadow-[#ff6b00]/20 disabled:opacity-50 disabled:shadow-none"
                >
                  {sendEmailMutation.isPending ? "Sending..." : "Send Email"} 
                  {!sendEmailMutation.isPending && <Send className="w-4 h-4" />}
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
