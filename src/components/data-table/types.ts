import type { DateRange } from 'react-day-picker'

export interface FilterOption {
  label: string
  value: string
}

export interface FilterConfig {
  label: string
  value: string
  onChange: (value: string) => void
  options: FilterOption[]
}

export interface SearchConfig {
  value: string
  onChange: (value: string) => void
  placeholder?: string
}

export interface DateRangeConfig {
  value: DateRange | undefined
  onChange: (range: DateRange | undefined) => void
}

export interface TableButtonConfig {
  label?: string
  onClick: () => void
}

export interface TableButtonsConfig {
  create?: TableButtonConfig
  update?: TableButtonConfig
  export?: TableButtonConfig
}
