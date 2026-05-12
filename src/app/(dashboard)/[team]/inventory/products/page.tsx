'use client'

import { useState } from 'react'
import DataTable from '@/components/data-table/table'
import { usePageTitle } from '@/hooks/use-page-title'
import { usePagination } from '@/hooks/use-pagination'
import { useProduct } from '@/services'
import { useProductTable } from './_hooks/use-product-table'
import CreateProduct from './_components/create-product'
import UpdateProduct from './_components/update-product'
import DeleteProduct from './_components/delete-product'

export default function ProductPage() {
  usePageTitle('Products')

  const [createOpen, setCreateOpen] = useState(false)
  const { page, limit, setPage } = usePagination()
  const {
    columns,
    search,
    searchConfig,
    selectedProduct,
    updateOpen,
    setUpdateOpen,
    deleteOpen,
    setDeleteOpen,
  } = useProductTable()
  const { getProductList } = useProduct({ page, limit, search })
  const { data, isLoading } = getProductList

  return (
    <main>
      <DataTable
        data={data?.data?.data}
        meta={data?.data?.meta}
        columns={columns}
        onPageChange={setPage}
        isLoading={isLoading}
        search={searchConfig}
        buttons={{
          create: { onClick: () => setCreateOpen(true) },
        }}
      />
      <CreateProduct open={createOpen} onOpenChange={setCreateOpen} />
      <UpdateProduct
        open={updateOpen}
        onOpenChange={setUpdateOpen}
        product={selectedProduct}
      />
      <DeleteProduct
        open={deleteOpen}
        onOpenChange={setDeleteOpen}
        product={selectedProduct}
      />
    </main>
  )
}
