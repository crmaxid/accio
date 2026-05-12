import { DateTime } from 'luxon'

export const formatDateTime = (iso: string | undefined | null) => {
  if (!iso) return { date: '—', time: '' }
  const dt = DateTime.fromISO(iso, { zone: 'utc' }).toLocal()
  return {
    date: dt.toFormat('dd MMM yyyy'),
    time: dt.toFormat('HH:mm ZZZZ'),
  }
}

export const getInitials = (name: string) => {
  return name
    .split(' ')
    .map((n) => n[0])
    .slice(0, 2)
    .join('')
    .toUpperCase()
}

export const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
  }).format(value)
}

export const formatDateParam = (date: Date | undefined): string | undefined => {
  if (!date) return undefined
  return DateTime.fromJSDate(date).toFormat('yyyy-MM-dd')
}
