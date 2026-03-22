import { Badge } from '@/components/ui/badge'
import Image from 'next/image'

const sourceIcons: Record<
  string,
  { src: string; width: number; height: number }
> = {
  TIKTOK_SHOP: {
    src: 'https://api.minio.runeforge.tech/crmax-assets/tokopedia-shop.webp',
    width: 120,
    height: 120,
  },
  TOKOPEDIA: {
    src: 'https://api.minio.runeforge.tech/crmax-assets/tokopedia-shop.webp',
    width: 120,
    height: 120,
  },
  SHOP_TOKOPEDIA: {
    src: 'https://api.minio.runeforge.tech/crmax-assets/tokopedia-shop.webp',
    width: 120,
    height: 120,
  },
  SHOPEE: {
    src: 'https://api.minio.runeforge.tech/crmax-assets/shopee.webp',
    width: 70,
    height: 70,
  },
  CRMAX_PLATFORM: {
    src: 'https://api.minio.runeforge.tech/crmax-assets/logo.png',
    width: 70,
    height: 70,
  },
}

export function OrderSourceBadge({ value }: { value: string }) {
  const icon = sourceIcons[value] ?? {
    src: '/default.png',
    width: 120,
    height: 120,
  }

  return (
    <Badge className="bg-transparent p-2">
      <Image
        src={icon.src}
        alt={value}
        width={icon.width}
        height={icon.height}
        quality={100}
        priority
      />
    </Badge>
  )
}
