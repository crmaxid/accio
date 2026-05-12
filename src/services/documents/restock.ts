import { documents } from '@/lib'
import {
  GenerateRestockDocumentResponse,
  GenerateRestockInvoiceResponse,
} from '@/types'
import { useMutation } from '@tanstack/react-query'

export const useRestockDocument = () => {
  const generateDocument = useMutation({
    mutationFn: (id: string) =>
      documents
        .get<GenerateRestockDocumentResponse>(
          `/stock-replenishment/${id}/generate-letter`,
        )
        .then((res) => res.data),
  })

  const generateInvoice = useMutation({
    mutationFn: (id: string) =>
      documents
        .get<GenerateRestockInvoiceResponse>(
          `/stock-replenishment/${id}/generate-invoice`,
        )
        .then((res) => res.data),
  })

  const generateShippingLabel = useMutation({
    mutationFn: (id: string) =>
      documents
        .get<GenerateRestockDocumentResponse>(
          `/stock-replenishment/${id}/generate-qr-code`,
        )
        .then((res) => res.data),
  })

  return { generateDocument, generateInvoice, generateShippingLabel }
}
