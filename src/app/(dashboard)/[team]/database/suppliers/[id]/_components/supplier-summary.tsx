import { SupplierDetail } from '@/types'
import { Skeleton } from '@/components/ui/skeleton'

interface SupplierSummaryProps {
  supplier: SupplierDetail | null
  isLoading: boolean
}

export default function SupplierSummary({
  supplier,
  isLoading,
}: SupplierSummaryProps) {
  if (isLoading) {
    return (
      <div className="flex flex-col gap-3 rounded-xl border border-gray-100 bg-white p-4">
        <Skeleton className="h-5 w-1/3" />
        <div className="flex flex-col gap-2">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-4 w-3/4" />
          ))}
        </div>
      </div>
    )
  }

  if (!supplier) return null

  const rows = [
    { label: 'Phone', value: supplier.phone ?? '-' },
    { label: 'Email', value: supplier.email ?? '-' },
    { label: 'Address', value: supplier.address?.fullAddress ?? '-' },
    { label: 'City', value: supplier.address?.city ?? '-' },
    { label: 'Country', value: supplier.address?.country ?? '-' },
  ]

  return (
    <div className="flex flex-col gap-3 rounded-xl border border-gray-100 bg-white p-4">
      <h2 className="text-sm font-semibold text-gray-800">{supplier.name}</h2>
      <div className="flex flex-col gap-2">
        {rows.map(({ label, value }) => (
          <div key={label} className="flex gap-2 text-xs">
            <span className="w-20 shrink-0 font-medium text-gray-500">
              {label}
            </span>
            <span className="text-gray-700">{value}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
