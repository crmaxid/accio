import {
  ArrowLeftRightIcon,
  BarCode01Icon,
  CheckListIcon,
  Database01Icon,
  DeliveryBox01Icon,
  Discount01Icon,
  Factory01Icon,
  Invoice01Icon,
  Layers01Icon,
  Package01Icon,
  PackageSearch01Icon,
  ShoppingBag01Icon,
  User02Icon,
} from '@hugeicons/core-free-icons'
import type { NavItem, Team } from '@/types'

const crMaxNavItems: NavItem[] = [
  {
    title: 'Database',
    url: '',
    icon: Database01Icon,
    items: [{ title: 'Customer', url: 'database/customers', icon: User02Icon }],
  },
  {
    title: 'Inventory',
    url: '',
    icon: Package01Icon,
    items: [
      {
        title: 'Product',
        url: 'inventory/products',
        icon: PackageSearch01Icon,
      },
      { title: 'SKU', url: 'inventory/skus', icon: BarCode01Icon },
      {
        title: 'Stock Transaction',
        url: 'inventory/stock-transaction',
        icon: ArrowLeftRightIcon,
      },
      { title: 'Bundles', url: 'inventory/bundles', icon: CheckListIcon },
    ],
  },
  {
    title: 'Order',
    url: '',
    icon: ShoppingBag01Icon,
    items: [{ title: 'Sales', url: 'order/sales', icon: Discount01Icon }],
  },
  {
    title: 'Production',
    url: '',
    icon: Factory01Icon,
    items: [
      { title: 'Restock', url: 'production/restock', icon: Layers01Icon },
      {
        title: 'Delivery',
        url: 'production/delivery',
        icon: DeliveryBox01Icon,
      },
    ],
  },
]

const mahaKaryaNavItems: NavItem[] = [
  {
    title: 'Database',
    url: '',
    icon: Database01Icon,
    items: [{ title: 'Supplier', url: 'database/suppliers', icon: User02Icon }],
  },
  {
    title: 'Factory',
    url: '',
    icon: Factory01Icon,
    items: [
      {
        title: 'Raw Materials',
        url: 'factory/raw-materials',
        icon: Layers01Icon,
      },
    ],
  },
  {
    title: 'Order',
    url: '',
    icon: ShoppingBag01Icon,
    items: [
      {
        title: 'Purchase Order',
        url: 'order/purchase-orders',
        icon: Invoice01Icon,
      },
      {
        title: 'Delivery Order',
        url: 'order/delivery-orders',
        icon: Invoice01Icon,
      },
    ],
  },
]

export const TEAMS_CONFIG: Team[] = [
  {
    id: 'crmax',
    name: 'Performance',
    plan: 'CAM',
    logo: 'https://api.minio.runeforge.tech/crmax-assets/crmax-logo.jpeg',
    navItems: crMaxNavItems,
  },
  {
    id: 'mahakarya',
    name: 'Mahakarya',
    plan: 'CMS',
    logo: 'https://api.minio.runeforge.tech/crmax-assets/mahakarya-logo.jpeg',
    navItems: mahaKaryaNavItems,
  },
]
