'use client'

import { useParams } from 'next/navigation'
import { usePageTitle } from '@/hooks/use-page-title'
import { useSupplierDetail } from './_hooks/use-supplier-detail'
import SupplierSummary from './_components/supplier-summary'
import SupplierProducts from './_components/supplier-products'
import CreateSupplierProduct from './_components/create-supplier-product'

export default function SupplierDetailPage() {
  const { id } = useParams<{ id: string }>()

  const {
    supplier,
    isLoading,
    addProductOpen,
    setAddProductOpen,
    register,
    errors,
    onSubmit,
    handleUnitChange,
    isPending,
  } = useSupplierDetail(id)

  usePageTitle(supplier?.name ?? 'Supplier Detail')

  return (
    <main className="flex flex-col gap-4 lg:flex-row lg:items-start">
      <div className="w-full lg:w-[30%]">
        <SupplierSummary supplier={supplier} isLoading={isLoading} />
      </div>

      <div className="flex flex-1 flex-col gap-4">
        <SupplierProducts
          products={supplier?.products ?? []}
          isLoading={isLoading}
          onAddClick={() => setAddProductOpen(true)}
        />
      </div>

      <CreateSupplierProduct
        open={addProductOpen}
        onOpenChange={setAddProductOpen}
        register={register}
        errors={errors}
        onSubmit={onSubmit}
        isPending={isPending}
        onUnitChange={handleUnitChange}
      />
    </main>
  )
}
