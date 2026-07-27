"use client"

import { 
  PackageSearch, 
  Mountain, 
  Gem, 
  Cubes, 
  AlertTriangle, 
  Check, 
  Table2, 
  Truck,
  Building2,
  Bell,
  Lightbulb
} from "lucide-react"

interface InventoryTabProps {
  inventoryStatus?: {
    stock: { clay: number; feldspar: number; quartz: number }
    consumed: { clay: number; feldspar: number; quartz: number }
  }
}

export function InventoryTab({ inventoryStatus }: InventoryTabProps) {
  // Default mocks if not provided
  const status = inventoryStatus || {
    stock: { clay: 2800, feldspar: 3500, quartz: 4200 },
    consumed: { clay: 5200, feldspar: 1500, quartz: 800 }
  }

  const materials = [
    {
      name: 'Clay (Tanah Liat)',
      icon: Mountain,
      color: '#d97706',
      colorBg: 'rgba(245,158,11,0.08)',
      stock: status.stock.clay,
      consumed: status.consumed.clay,
      maxStock: 8000,
      unit: 'kg',
      reorderPoint: 2500,
      consumption: 120,
      consumptionUnit: 'kg/shift',
    },
    {
      name: 'Feldspar',
      icon: Gem,
      color: '#030b85',
      colorBg: 'rgba(3,11,133,0.08)',
      stock: status.stock.feldspar,
      consumed: status.consumed.feldspar,
      maxStock: 5000,
      unit: 'kg',
      reorderPoint: 1800,
      consumption: 75,
      consumptionUnit: 'kg/shift',
    },
    {
      name: 'Quartz (Silika)',
      icon: Cubes,
      color: '#059669',
      colorBg: 'rgba(5,150,105,0.08)',
      stock: status.stock.quartz,
      consumed: status.consumed.quartz,
      maxStock: 5000,
      unit: 'kg',
      reorderPoint: 1200,
      consumption: 60,
      consumptionUnit: 'kg/shift',
    },
  ]

  const suppliers = [
    { name: 'Supplier A', quality: 92 },
    { name: 'Supplier B', quality: 85 },
    { name: 'Supplier C', quality: 88 },
  ]

  return (
    <div className="space-y-5 animate-in fade-in duration-500">
      {/* Title */}
      <div className="text-sm font-mono font-extrabold text-slate-700 uppercase flex items-center gap-2 mb-2">
        <PackageSearch className="w-5 h-5 text-[#030b85]" /> Inventory & Materials
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {materials.map((m, i) => {
          const pct = Math.min(100, Math.round((m.stock / m.maxStock) * 100))
          const isLow = m.stock <= m.reorderPoint
          const Icon = m.icon

          return (
            <div key={i} className="bg-white/60 border border-slate-900/10 rounded-2xl p-5 flex flex-col gap-4 transition-all hover:bg-white/80">
              <div className="flex justify-between items-start gap-2">
                <div>
                  <div className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5 mb-1">
                    <Icon className="w-3.5 h-3.5" style={{ color: m.color }} /> {m.name}
                  </div>
                  <div className="text-3xl font-mono font-black mt-1" style={{ color: m.color }}>
                    {m.stock.toLocaleString()} <span className="text-sm font-bold">{m.unit}</span>
                  </div>
                  <div className="text-[10px] font-mono text-slate-500 mt-1">
                    Terpakai: {m.consumed.toLocaleString()} {m.unit} • {m.consumption} {m.consumptionUnit}
                  </div>
                </div>
                
                <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold flex items-center gap-1 whitespace-nowrap ${
                  isLow ? "bg-rose-100 text-rose-600" : "bg-emerald-100 text-emerald-600"
                }`}>
                  {isLow ? <AlertTriangle className="w-3 h-3" /> : <Check className="w-3 h-3" />}
                  {isLow ? 'Reorder Now' : 'Stok Aman'}
                </span>
              </div>
              
              <div>
                <div className="flex justify-between text-[10px] font-mono font-bold mb-1.5">
                  <span className="text-slate-500">Level Stok</span>
                  <span style={{ color: isLow ? '#e11d48' : m.color }}>{pct}% dari kapasitas</span>
                </div>
                <div className="h-2 w-full bg-slate-900/10 rounded-full overflow-hidden">
                  <div 
                    className="h-full rounded-full transition-all duration-700" 
                    style={{ width: `${pct}%`, background: isLow ? '#e11d48' : m.color }}
                  />
                </div>
                <div className="text-[10px] font-mono text-slate-500 mt-1.5 flex items-center gap-1">
                  <Bell className="w-3 h-3 text-amber-500" />
                  Reorder Point: {m.reorderPoint.toLocaleString()} {m.unit}
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Bottom Row */}
      <div className="grid lg:grid-cols-[1.5fr_1fr] gap-4">
        {/* Material Details Table */}
        <div className="bg-white/60 border border-slate-900/10 rounded-2xl p-5 flex flex-col overflow-hidden h-[340px]">
          <h4 className="text-xs font-mono font-extrabold text-[#030b85] uppercase mb-4 flex items-center gap-1.5">
            <Table2 className="w-4 h-4" /> Detail Stok & Konsumsi Material
          </h4>
          <div className="flex-1 overflow-auto pr-2 custom-scrollbar">
            <table className="w-full text-left text-xs font-mono border-collapse">
              <thead>
                <tr className="border-b border-slate-900/10 bg-[#030b85]/5 text-[#030b85] font-extrabold">
                  <th className="p-2.5 sticky top-0 bg-[#030b85]/5 backdrop-blur-md">Material</th>
                  <th className="p-2.5 sticky top-0 bg-[#030b85]/5 backdrop-blur-md">Stok Saat Ini</th>
                  <th className="p-2.5 sticky top-0 bg-[#030b85]/5 backdrop-blur-md whitespace-nowrap">Total Terpakai</th>
                  <th className="p-2.5 sticky top-0 bg-[#030b85]/5 backdrop-blur-md whitespace-nowrap">Konsumsi/Shift</th>
                  <th className="p-2.5 sticky top-0 bg-[#030b85]/5 backdrop-blur-md whitespace-nowrap">Estimasi Sisa</th>
                  <th className="p-2.5 sticky top-0 bg-[#030b85]/5 backdrop-blur-md">Status</th>
                </tr>
              </thead>
              <tbody>
                {materials.map((m, i) => {
                  const daysLeft = Math.floor(m.stock / (m.consumption * 3))
                  const isLow = m.stock <= m.reorderPoint
                  const Icon = m.icon

                  return (
                    <tr key={i} className="border-b border-slate-900/5 hover:bg-white/80 transition-colors">
                      <td className="p-2.5 font-bold flex items-center gap-1.5" style={{ color: m.color }}>
                        <Icon className="w-3.5 h-3.5" /> {m.name}
                      </td>
                      <td className="p-2.5 font-bold text-slate-900">
                        {m.stock.toLocaleString()} {m.unit}
                      </td>
                      <td className="p-2.5 text-slate-600">
                        {m.consumed.toLocaleString()} {m.unit}
                      </td>
                      <td className="p-2.5 text-slate-600">
                        {m.consumption} {m.consumptionUnit}
                      </td>
                      <td className="p-2.5">
                        <span className={`font-bold ${daysLeft <= 3 ? 'text-rose-600' : 'text-emerald-600'}`}>
                          {daysLeft} hari
                        </span>
                      </td>
                      <td className="p-2.5">
                        <span className={`px-2 py-0.5 rounded-full font-bold text-[10px] inline-flex items-center gap-1 whitespace-nowrap ${
                          isLow ? "bg-rose-100 text-rose-700" : "bg-emerald-100 text-emerald-700"
                        }`}>
                          <span className={`w-1.5 h-1.5 rounded-full ${isLow ? "bg-rose-500" : "bg-emerald-500"}`}></span>
                          {isLow ? 'Perlu Reorder' : 'Aman'}
                        </span>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Supplier Performance */}
        <div className="bg-white/60 border border-slate-900/10 rounded-2xl p-5 h-[340px] flex flex-col">
          <h4 className="text-xs font-mono font-extrabold text-[#030b85] uppercase mb-4 flex items-center gap-1.5">
            <Truck className="w-4 h-4" /> Performa Supplier
          </h4>
          
          <div className="flex flex-col gap-4 flex-1">
            {suppliers.map((s, i) => {
              const color = s.quality >= 90 ? '#059669' : s.quality >= 85 ? '#030b85' : '#d97706'
              
              return (
                <div key={i}>
                  <div className="flex justify-between items-center mb-1.5">
                    <span className="font-mono font-bold text-xs text-slate-600 flex items-center gap-1.5">
                      <Building2 className="w-3.5 h-3.5" style={{ color }} /> {s.name}
                    </span>
                    <span className="font-mono font-extrabold text-sm" style={{ color }}>
                      {s.quality}%
                    </span>
                  </div>
                  <div className="h-2 w-full bg-slate-900/10 rounded-full overflow-hidden">
                    <div 
                      className="h-full rounded-full transition-all duration-700" 
                      style={{ width: `${s.quality}%`, background: color }}
                    />
                  </div>
                  <div className="text-[10px] font-mono text-slate-500 mt-1">
                    {s.quality >= 90 ? 'Kualitas Unggul' : s.quality >= 85 ? 'Kualitas Baik' : 'Perlu Evaluasi'}
                  </div>
                </div>
              )
            })}

            <div className="mt-auto bg-[#030b85]/5 p-3 rounded-xl border border-[#030b85]/15">
              <div className="font-mono font-extrabold text-[11px] text-[#030b85] mb-1 flex items-center gap-1.5">
                <Lightbulb className="w-3 h-3" /> Rekomendasi Pengadaan
              </div>
              <div className="text-[10px] font-mono text-slate-700 leading-relaxed font-medium">
                Prioritaskan <strong>Supplier A</strong> untuk order clay & feldspar berikutnya. Quality score 92% tertinggi dengan lead time konsisten.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
