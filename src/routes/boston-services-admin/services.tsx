import { createFileRoute } from "@tanstack/react-router";
import { Plus, Edit2, Trash2, GripVertical, CheckCircle2, X, Image as ImageIcon, Box } from "lucide-react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiFetch } from "@/lib/auth";
import { serviceImageMap } from "@/data/services";
import { useState } from "react";

export const Route = createFileRoute("/boston-services-admin/services")({
  component: ServicesAdminPage,
});

function ServicesAdminPage() {
  const queryClient = useQueryClient();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingService, setEditingService] = useState<any>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    slug: "",
    title: "",
    desc: "",
    full_desc: "",
  });
  const [imageFile, setImageFile] = useState<File | null>(null);

  const { data: adminServices = [], isLoading } = useQuery({
    queryKey: ['admin_services'],
    queryFn: async () => {
      const res = await apiFetch("/api/services/");
      return res.json();
    }
  });

  const saveMutation = useMutation({
    mutationFn: async () => {
      const isEdit = !!editingService;
      const url = isEdit ? `/api/services/${editingService.slug}/` : "/api/services/";
      const method = isEdit ? "PATCH" : "POST";

      let body: any;
      if (imageFile) {
        body = new FormData();
        body.append('title', formData.title);
        if (!isEdit) body.append('slug', formData.slug);
        body.append('desc', formData.desc);
        body.append('full_desc', formData.full_desc);
        body.append('image', imageFile);
      } else {
        body = JSON.stringify({
          title: formData.title,
          ...(!isEdit && { slug: formData.slug }),
          desc: formData.desc,
          full_desc: formData.full_desc,
        });
      }

      const res = await apiFetch(url, { method, body });
      if (!res.ok) throw new Error("Failed to save service");
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin_services'] });
      closeModal();
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (slug: string) => {
      const res = await apiFetch(`/api/services/${slug}/`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete service");
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin_services'] });
      setDeleteConfirm(null);
    },
  });

  const openModal = (service: any = null) => {
    if (service) {
      setEditingService(service);
      setFormData({
        slug: service.slug,
        title: service.title,
        desc: service.desc,
        full_desc: service.full_desc,
      });
    } else {
      setEditingService(null);
      setFormData({ slug: "", title: "", desc: "", full_desc: "" });
    }
    setImageFile(null);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingService(null);
    setImageFile(null);
    setFormData({ slug: "", title: "", desc: "", full_desc: "" });
  };

  return (
    <>
      <div className="space-y-8 animate-in fade-in duration-500 min-h-[calc(100vh-12rem)]">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 shrink-0">
          <div>
            <h2 className="text-3xl font-black text-ink tracking-tight">Services</h2>
            <p className="mt-1 text-sm text-gray-400 font-medium">Manage your service offerings and catalog.</p>
          </div>
          <button 
            onClick={() => openModal()}
            className="flex items-center justify-center gap-2 px-5 py-2.5 bg-ink text-white rounded-xl font-bold text-sm hover:bg-ink/80 hover:shadow-lg transition-all"
          >
            <Plus className="w-4 h-4" />
            Add Service
          </button>
        </div>

        {/* Content */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-64 bg-gray-50 rounded-[2rem] border border-gray-100 animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            
            {/* Add New Ghost Card */}
            <button 
              onClick={() => openModal()}
              className="flex flex-col items-center justify-center min-h-[280px] bg-gray-50/50 hover:bg-white border-2 border-dashed border-gray-200 hover:border-primary/50 rounded-[2rem] text-gray-400 hover:text-primary transition-all group"
            >
              <div className="w-16 h-16 rounded-2xl bg-white border border-gray-100 flex items-center justify-center mb-4 group-hover:scale-110 group-hover:shadow-lg transition-all">
                <Plus className="w-8 h-8" />
              </div>
              <span className="font-bold text-sm">Create New Service</span>
            </button>

            {/* Service Cards */}
            {adminServices.map((service: any) => (
              <div key={service.slug} className="group bg-white rounded-[2rem] border border-gray-200 hover:border-gray-300 hover:shadow-[0_8px_30px_rgba(0,0,0,0.04)] overflow-hidden flex flex-col transition-all relative">
                
                {/* Active Badge */}
                <div className="absolute top-5 right-5 z-10 px-3 py-1.5 bg-white/90 backdrop-blur-sm rounded-lg border border-gray-100 shadow-sm flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest text-emerald-600">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                  Live
                </div>

                {/* Card Image Area */}
                <div className="h-32 bg-gray-50 flex items-center justify-center border-b border-gray-100 p-6 relative overflow-hidden group-hover:bg-gray-100/50 transition-colors">
                  <div className="w-20 h-20 bg-white shadow-sm rounded-2xl flex items-center justify-center p-3 border border-gray-100 relative z-10 group-hover:scale-105 transition-transform">
                    <img src={service.image ? `${import.meta.env.VITE_API_URL || "http://localhost:8000"}${service.image}` : serviceImageMap[service.slug]} alt={service.title} className="w-full h-full object-contain" />
                  </div>
                  {/* Decorative background circle */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-primary/5 rounded-full blur-2xl" />
                </div>

                {/* Card Content Area */}
                <div className="p-6 flex-1 flex flex-col">
                  <h3 className="text-lg font-black text-ink mb-2 truncate">{service.title}</h3>
                  <p className="text-xs text-gray-500 font-medium leading-relaxed line-clamp-2 mb-6 flex-1">
                    {service.desc}
                  </p>

                  {/* Actions */}
                  <div className="flex items-center gap-2 pt-4 border-t border-gray-100">
                    <button 
                      onClick={() => openModal(service)}
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-gray-50 hover:bg-gray-100 text-ink rounded-xl text-xs font-bold transition-colors"
                    >
                      <Edit2 className="w-3.5 h-3.5" /> Edit
                    </button>
                    
                    {deleteConfirm === service.slug ? (
                      <div className="flex flex-1 items-center gap-1">
                        <button 
                          onClick={() => setDeleteConfirm(null)}
                          className="flex-1 px-2 py-2.5 bg-gray-50 hover:bg-gray-200 text-ink rounded-xl text-xs font-bold transition-colors"
                        >
                          Cancel
                        </button>
                        <button 
                          onClick={() => deleteMutation.mutate(service.slug)}
                          className="flex-1 px-2 py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-xl text-xs font-bold transition-colors"
                        >
                          Delete
                        </button>
                      </div>
                    ) : (
                      <button 
                        onClick={() => setDeleteConfirm(service.slug)}
                        className="p-2.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Editor Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[60] flex flex-col lg:flex-row">
          <div className="absolute inset-0 bg-ink/30 backdrop-blur-sm animate-in fade-in" onClick={closeModal} />
          
          <div className="relative w-full lg:w-[600px] lg:ml-auto h-[100dvh] bg-white shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">
            <div className="flex items-center justify-between p-6 border-b border-gray-100">
              <h3 className="text-xl font-black text-ink">{editingService ? "Edit Service" : "New Service"}</h3>
              <button onClick={closeModal} className="p-2 text-gray-400 hover:text-ink hover:bg-gray-100 rounded-xl transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-8">
              <div className="space-y-6">
                {!editingService && (
                  <div>
                    <label className="block text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2">URL Slug</label>
                    <input 
                      type="text" 
                      value={formData.slug}
                      onChange={(e) => setFormData({...formData, slug: e.target.value})}
                      placeholder="e.g., residential-plumbing"
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all text-sm font-bold"
                    />
                  </div>
                )}
                
                <div>
                  <label className="block text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2">Service Title</label>
                  <input 
                    type="text" 
                    value={formData.title}
                    onChange={(e) => setFormData({...formData, title: e.target.value})}
                    placeholder="e.g., Expert Plumbing"
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all text-sm font-bold"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2">Short Description</label>
                  <textarea 
                    value={formData.desc}
                    onChange={(e) => setFormData({...formData, desc: e.target.value})}
                    rows={3}
                    placeholder="Brief summary for cards..."
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all text-sm font-medium resize-none"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2">Detailed Description</label>
                  <textarea 
                    value={formData.full_desc}
                    onChange={(e) => setFormData({...formData, full_desc: e.target.value})}
                    rows={6}
                    placeholder="Comprehensive details for the dedicated page..."
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all text-sm font-medium resize-none"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2">Icon / Cover Image</label>
                  <div className="relative group">
                    <input 
                      type="file" 
                      accept="image/*"
                      onChange={(e) => setImageFile(e.target.files?.[0] || null)}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                    />
                    <div className="w-full px-4 py-8 border-2 border-dashed border-gray-200 rounded-xl bg-gray-50 flex flex-col items-center justify-center gap-2 group-hover:border-primary/50 group-hover:bg-primary/5 transition-all">
                      <ImageIcon className="w-8 h-8 text-gray-400 group-hover:text-primary transition-colors" />
                      <span className="text-sm font-bold text-gray-500 group-hover:text-ink transition-colors">
                        {imageFile ? imageFile.name : "Click or drag image to upload"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6 border-t border-gray-100 bg-gray-50 flex gap-4 shrink-0">
              <button onClick={closeModal} className="flex-1 px-4 py-3 rounded-xl bg-white border border-gray-200 text-sm font-bold text-ink hover:bg-gray-50 transition-colors">
                Cancel
              </button>
              <button 
                onClick={() => saveMutation.mutate()}
                disabled={saveMutation.isPending}
                className="flex-1 px-4 py-3 rounded-xl bg-ink text-white text-sm font-bold hover:bg-ink/80 transition-colors disabled:opacity-50"
              >
                {saveMutation.isPending ? "Saving..." : "Save Service"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
