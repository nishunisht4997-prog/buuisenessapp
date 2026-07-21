"use client";

import { useEffect, useState } from "react";
import {
  ShieldCheck,
  FileCheck,
  XCircle,
  CheckCircle2,
  Phone,
  Mail,
  Building2,
  FileText,
  Search,
  Filter,
  MessageSquare,
  AlertTriangle,
  Eye,
  Send,
  ToggleLeft,
  ToggleRight,
  ExternalLink,
  Sparkles,
  X
} from "lucide-react";

const DEMO_KYC_MERCHANTS = [
  {
    id: "biz-101",
    name: "Royal Feast Restaurant & Caterers",
    phone: "+919876543210",
    email: "contact@royalfeast.com",
    category: "Restaurants & Catering",
    gstin: "21ABCDE1234F1Z5",
    fssai: "12021001000458",
    tradeLicense: "TL/BBSR/2026/8942",
    pan: "ABCDE1234F",
    docImages: {
      gst: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=600&q=80",
      fssai: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=600&q=80",
      license: "https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&w=600&q=80",
    },
    isVerified: true,
    status: "APPROVED",
    kycDate: "2026-07-20",
  },
  {
    id: "biz-102",
    name: "S Convention & Resort Stay",
    phone: "+919876543211",
    email: "manager@sconvention.com",
    category: "Hotels & Stays",
    gstin: "21XYZAB5678C1Z9",
    fssai: "N/A",
    tradeLicense: "TL/BBSR/2026/3412",
    pan: "XYZAB5678C",
    docImages: {
      gst: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=600&q=80",
      license: "https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&w=600&q=80",
    },
    isVerified: false,
    status: "PENDING",
    kycDate: "2026-07-21",
  },
  {
    id: "biz-103",
    name: "Toni & Guy Luxury Unisex Salon",
    phone: "+919876543212",
    email: "info@toniguybbsr.com",
    category: "Beauty & Spa",
    gstin: "21LMNPQ9012R1Z3",
    fssai: "N/A",
    tradeLicense: "TL/BBSR/2026/7781",
    pan: "LMNPQ9012R",
    docImages: {
      gst: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=600&q=80",
      license: "https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&w=600&q=80",
    },
    isVerified: false,
    status: "PENDING",
    kycDate: "2026-07-21",
  },
  {
    id: "biz-104",
    name: "Quick Relocate Packers & Movers",
    phone: "+919876543213",
    email: "shift@quickrelocate.in",
    category: "Packers & Movers",
    gstin: "21QRSST3456U1Z1",
    fssai: "N/A",
    tradeLicense: "TL/BBSR/2026/1092",
    pan: "QRSST3456U",
    docImages: {
      gst: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=600&q=80",
      license: "https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&w=600&q=80",
    },
    isVerified: false,
    status: "REJECTED",
    rejectionReason: "GST Certificate document blurred and unreadable",
    kycDate: "2026-07-19",
  },
];

export default function AdminKycVerificationPage() {
  const [merchants, setMerchants] = useState(DEMO_KYC_MERCHANTS);
  const [selectedMerchant, setSelectedMerchant] = useState(null);
  const [previewDoc, setPreviewDoc] = useState(null);
  const [rejectModalMerchant, setRejectModalMerchant] = useState(null);
  const [rejectReason, setRejectReason] = useState("GST Certificate document blurred / invalid");
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("ALL");

  // Toggle Blue Tick Status
  const toggleBlueTick = (id) => {
    setMerchants((prev) =>
      prev.map((m) => {
        if (m.id === id) {
          const nextVal = !m.isVerified;
          return {
            ...m,
            isVerified: nextVal,
            status: nextVal ? "APPROVED" : m.status,
          };
        }
        return m;
      })
    );
  };

  // Toggle Active/Block Status
  const toggleActiveStatus = (id) => {
    setMerchants((prev) =>
      prev.map((m) => {
        if (m.id === id) {
          const nextStatus = m.status === "APPROVED" ? "BLOCKED" : "APPROVED";
          return {
            ...m,
            status: nextStatus,
            isVerified: nextStatus === "APPROVED" ? m.isVerified : false,
          };
        }
        return m;
      })
    );
  };

  // 1-Click Approve with Blue Tick
  const approveKyc = (merchant) => {
    setMerchants((prev) =>
      prev.map((m) =>
        m.id === merchant.id ? { ...m, isVerified: true, status: "APPROVED" } : m
      )
    );
    alert(`APPROVED: ${merchant.name} is now Verified with Blue Tick Badge!`);
  };

  // Submit Rejection Reason & Open WhatsApp/SMS Template
  const handleConfirmReject = (e) => {
    e.preventDefault();
    if (!rejectModalMerchant) return;

    setMerchants((prev) =>
      prev.map((m) =>
        m.id === rejectModalMerchant.id
          ? { ...m, isVerified: false, status: "REJECTED", rejectionReason: rejectReason }
          : m
      )
    );

    const waMsg = `*APNABIZ KYC VERIFICATION STATUS*\n\nDear ${rejectModalMerchant.name},\nYour merchant KYC request could not be approved.\n\n*Reason:* ${rejectReason}\n\nPlease re-upload valid documents via your Merchant Dashboard.`;
    const cleanPhone = rejectModalMerchant.phone.replace(/\D/g, "");
    const waUrl = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(waMsg)}`;

    window.open(waUrl, "_blank");
    setRejectModalMerchant(null);
  };

  const filteredMerchants = merchants.filter((m) => {
    const matchesSearch =
      m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.gstin.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.phone.includes(searchQuery);

    if (filterStatus === "PENDING") return matchesSearch && m.status === "PENDING";
    if (filterStatus === "VERIFIED") return matchesSearch && m.isVerified;
    if (filterStatus === "REJECTED") return matchesSearch && m.status === "REJECTED";
    return matchesSearch;
  });

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-emerald-950 via-slate-900 to-indigo-950 border border-slate-800 p-6 rounded-3xl shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <span className="bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-[11px] font-extrabold px-3 py-1 rounded-full uppercase tracking-wider inline-flex items-center gap-1 mb-2">
            <ShieldCheck size={14} /> Security Command
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight flex items-center gap-2">
            <span>Merchant KYC & Document Verification Hub</span>
          </h1>
          <p className="text-slate-400 text-xs sm:text-sm mt-1 font-medium">
            Inspect GSTIN certificates, FSSAI licenses & trade licenses. Approve verified Blue Tick badges or reject with automated WhatsApp reasons.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="bg-slate-900 border border-slate-800 px-4 py-2 rounded-2xl text-xs font-bold text-slate-300">
            Pending Queue: <span className="text-amber-400 font-extrabold">{merchants.filter(m => m.status === "PENDING").length}</span>
          </div>
        </div>
      </div>

      {/* Filter Tabs & Search */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-1.5 bg-slate-900 p-1.5 rounded-2xl border border-slate-800">
          {["ALL", "PENDING", "VERIFIED", "REJECTED"].map((tab) => (
            <button
              key={tab}
              onClick={() => setFilterStatus(tab)}
              className={`px-4 py-2 rounded-xl text-xs font-extrabold transition-all ${
                filterStatus === tab
                  ? "bg-emerald-500 text-slate-950 shadow"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="relative flex items-center bg-slate-900 border border-slate-800 rounded-2xl px-3.5 py-2 w-full sm:w-72 focus-within:border-emerald-500 transition-all">
          <Search size={16} className="text-slate-500 mr-2 shrink-0" />
          <input
            type="text"
            placeholder="Search by name, GSTIN, or phone..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="bg-transparent text-xs text-white placeholder:text-slate-500 outline-none w-full font-medium"
          />
        </div>
      </div>

      {/* Merchant KYC Verification Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-800 text-xs font-bold text-slate-400 uppercase tracking-wider">
                <th className="py-3.5 px-4">Merchant Business</th>
                <th className="py-3.5 px-4">GSTIN & Licenses</th>
                <th className="py-3.5 px-4">Documents</th>
                <th className="py-3.5 px-4">Blue Tick Toggle</th>
                <th className="py-3.5 px-4">Active Toggle</th>
                <th className="py-3.5 px-4 text-right">1-Click Action</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-800/60 text-xs">
              {filteredMerchants.map((merchant) => (
                <tr key={merchant.id} className="hover:bg-slate-800/40 transition-colors">
                  {/* Name & Contact */}
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-2.5">
                      <div className="w-10 h-10 rounded-xl bg-slate-800 border border-slate-700 text-emerald-400 font-black flex items-center justify-center shrink-0">
                        {merchant.name.charAt(0)}
                      </div>
                      <div>
                        <div className="font-extrabold text-white flex items-center gap-1.5">
                          <span>{merchant.name}</span>
                          {merchant.isVerified && (
                            <ShieldCheck size={14} className="text-emerald-400 shrink-0 fill-emerald-400/20" />
                          )}
                        </div>
                        <p className="text-[11px] text-slate-400 mt-0.5">{merchant.phone} • {merchant.category}</p>
                      </div>
                    </div>
                  </td>

                  {/* GSTIN & Licenses */}
                  <td className="py-4 px-4 font-mono">
                    <div className="space-y-1">
                      <span className="bg-slate-950 px-2 py-0.5 rounded border border-slate-800 text-emerald-300 font-bold block w-fit">
                        GST: {merchant.gstin}
                      </span>
                      {merchant.fssai !== "N/A" && (
                        <span className="bg-slate-950 px-2 py-0.5 rounded border border-slate-800 text-amber-300 text-[11px] block w-fit">
                          FSSAI: {merchant.fssai}
                        </span>
                      )}
                    </div>
                  </td>

                  {/* Document Inspection Trigger */}
                  <td className="py-4 px-4">
                    <button
                      onClick={() => setSelectedMerchant(merchant)}
                      className="bg-indigo-950 hover:bg-indigo-900 border border-indigo-800 text-indigo-300 font-bold px-3 py-1.5 rounded-xl flex items-center gap-1.5 transition-colors"
                    >
                      <FileText size={14} />
                      <span>Inspect Docs</span>
                    </button>
                  </td>

                  {/* Blue Tick Toggle Switch */}
                  <td className="py-4 px-4">
                    <button
                      onClick={() => toggleBlueTick(merchant.id)}
                      className={`flex items-center gap-1.5 px-3 py-1 rounded-xl border text-[11px] font-extrabold transition-all ${
                        merchant.isVerified
                          ? "bg-emerald-500/20 text-emerald-400 border-emerald-500/40"
                          : "bg-slate-950 text-slate-500 border-slate-800"
                      }`}
                    >
                      {merchant.isVerified ? (
                        <>
                          <ToggleRight size={18} className="text-emerald-400" /> Blue Tick ON
                        </>
                      ) : (
                        <>
                          <ToggleLeft size={18} className="text-slate-500" /> Blue Tick OFF
                        </>
                      )}
                    </button>
                  </td>

                  {/* Active / Block Toggle Switch */}
                  <td className="py-4 px-4">
                    <button
                      onClick={() => toggleActiveStatus(merchant.id)}
                      className={`flex items-center gap-1.5 px-3 py-1 rounded-xl border text-[11px] font-extrabold transition-all ${
                        merchant.status === "APPROVED"
                          ? "bg-indigo-500/20 text-indigo-400 border-indigo-500/40"
                          : "bg-rose-500/20 text-rose-400 border-rose-500/40"
                      }`}
                    >
                      {merchant.status === "APPROVED" ? (
                        <>
                          <ToggleRight size={18} className="text-indigo-400" /> Listing Active
                        </>
                      ) : (
                        <>
                          <ToggleLeft size={18} className="text-rose-400" /> Blocked
                        </>
                      )}
                    </button>
                  </td>

                  {/* 1-Click Approve / Reject */}
                  <td className="py-4 px-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => approveKyc(merchant)}
                        className="bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-black px-3 py-1.5 rounded-xl text-[11px] shadow transition-all flex items-center gap-1"
                      >
                        <CheckCircle2 size={13} /> Approve
                      </button>

                      <button
                        onClick={() => setRejectModalMerchant(merchant)}
                        className="bg-rose-950 hover:bg-rose-900 border border-rose-800 text-rose-300 font-bold px-3 py-1.5 rounded-xl text-[11px] transition-all flex items-center gap-1"
                      >
                        <XCircle size={13} /> Reject
                      </button>
                    </div>
                  </td>
                </tr>
              ))}

              {filteredMerchants.length === 0 && (
                <tr>
                  <td colSpan="6" className="text-center py-12 text-slate-500 font-medium">
                    No merchants found matching KYC search filter.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* 🔹 DOCUMENT INSPECTION MODAL */}
      {selectedMerchant && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-md flex items-center justify-center z-50 p-4">
          <div className="bg-slate-900 border border-slate-800 w-full max-w-2xl rounded-3xl p-6 shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-4">
              <div>
                <h3 className="text-base font-extrabold text-white flex items-center gap-2">
                  <FileText size={18} className="text-emerald-400" />
                  <span>KYC Inspection: {selectedMerchant.name}</span>
                </h3>
                <p className="text-xs text-slate-400 font-mono mt-0.5">GSTIN: {selectedMerchant.gstin}</p>
              </div>

              <button
                onClick={() => setSelectedMerchant(null)}
                className="p-1.5 text-slate-400 hover:text-white rounded-full bg-slate-800"
              >
                <X size={18} />
              </button>
            </div>

            <div className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-3 bg-slate-950 p-3 rounded-2xl border border-slate-800 font-mono">
                <div>
                  <span className="text-slate-500 block">Trade License</span>
                  <span className="text-slate-200 font-bold">{selectedMerchant.tradeLicense}</span>
                </div>
                <div>
                  <span className="text-slate-500 block">Owner PAN</span>
                  <span className="text-slate-200 font-bold">{selectedMerchant.pan}</span>
                </div>
              </div>

              <h4 className="font-extrabold text-slate-300 uppercase tracking-wider">Uploaded License Images</h4>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {Object.entries(selectedMerchant.docImages).map(([key, url]) => (
                  <div key={key} className="bg-slate-950 border border-slate-800 rounded-2xl p-3">
                    <span className="text-[11px] font-bold text-indigo-400 uppercase block mb-2">{key} Document</span>
                    <div className="h-40 rounded-xl overflow-hidden relative group">
                      <img src={url} alt={key} className="w-full h-full object-cover" />
                      <button
                        onClick={() => setPreviewDoc(url)}
                        className="absolute inset-0 bg-slate-950/60 backdrop-blur-xs opacity-0 group-hover:opacity-100 flex items-center justify-center text-white font-bold transition-opacity"
                      >
                        <Eye size={18} className="mr-1" /> Expand Preview
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 🔹 REJECTION REASON MODAL */}
      {rejectModalMerchant && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-md flex items-center justify-center z-50 p-4">
          <div className="bg-slate-900 border border-slate-800 w-full max-w-md rounded-3xl p-6 shadow-2xl relative">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-4">
              <h3 className="text-base font-extrabold text-rose-400 flex items-center gap-2">
                <AlertTriangle size={18} />
                <span>Reject KYC Verification</span>
              </h3>
              <button onClick={() => setRejectModalMerchant(null)} className="text-slate-400 hover:text-white">
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleConfirmReject} className="space-y-4">
              <p className="text-xs text-slate-300 font-medium">
                Rejecting <strong className="text-white">{rejectModalMerchant.name}</strong>. Select or type rejection reason to send via WhatsApp notification:
              </p>

              <div>
                <label className="text-xs font-bold text-slate-400 block mb-1">Select Rejection Reason</label>
                <select
                  value={rejectReason}
                  onChange={(e) => setRejectReason(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-xs text-white outline-none focus:border-rose-500 font-medium"
                >
                  <option value="GST Certificate document blurred / invalid">GST Certificate document blurred / invalid</option>
                  <option value="FSSAI License number expired">FSSAI License number expired</option>
                  <option value="Address proof mismatch with business location">Address proof mismatch with business location</option>
                  <option value="Trade license registration name mismatch">Trade license registration name mismatch</option>
                </select>
              </div>

              <button
                type="submit"
                className="w-full bg-rose-600 hover:bg-rose-700 text-white font-black py-3 rounded-2xl text-xs shadow-lg flex items-center justify-center gap-2 transition-all"
              >
                <Send size={15} />
                <span>Confirm Rejection & Send WhatsApp Notice</span>
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
