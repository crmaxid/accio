import { SupplierProduct } from '@/types'
import { Skeleton } from '@/components/ui/skeleton'
import { Button } from '@/components/ui/button'

interface SupplierProductsProps {
  products: SupplierProduct[]
  isLoading: boolean
  onAddClick: () => void
}

const formatRupiah = (value: number) =>
  new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  }).format(value)

export default function SupplierProducts({
  products,
  isLoading,
  onAddClick,
}: SupplierProductsProps) {
  return (
    <div className="flex flex-col gap-3 rounded-xl border border-gray-100 bg-white p-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-gray-800">Products</h3>
        <Button size="sm" className="h-7 text-xs" onClick={onAddClick}>
          Add Product
        </Button>
      </div>

      {isLoading ? (
        <div className="flex flex-col gap-2">
          {Array.from({ length: 3 }).map((_, i) => (
            <Skeleton key={i} className="h-10 w-full" />
          ))}
        </div>
      ) : products.length === 0 ? (
        <p className="py-4 text-center text-xs text-gray-400">
          No products yet.
        </p>
      ) : (
        <div className="divide-y divide-gray-100">
          {products.map((product) => (
            <div
              key={product._id}
              className="flex items-center justify-between py-2"
            >
              <div className="flex flex-col gap-0.5">
                <span className="text-xs font-medium text-gray-700">
                  {product.name}
                </span>
                <span className="text-[11px] text-gray-400">{product.unit}</span>
              </div>
              <span className="text-xs font-semibold text-gray-800">
                {formatRupiah(product.price)}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
