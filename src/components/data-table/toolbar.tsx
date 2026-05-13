'use client'

import type { ReactNode } from 'react'
import { HugeiconsIcon } from '@hugeicons/react'
import {
  Search01Icon,
  Calendar01Icon,
  Cancel01Icon,
  FilterIcon,
  Add01Icon,
  Edit02Icon,
  FileExportIcon,
} from '@hugeicons/core-free-icons'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { Calendar } from '@/components/ui/calendar'
import { format } from 'date-fns'
import type {
  SearchConfig,
  FilterConfig,
  DateRangeConfig,
  TableButtonsConfig,
} from './types'

interface DataTableToolbarProps {
  search?: SearchConfig
  searchInput: string
  onSearchInput: (value: string) => void
  filters?: FilterConfig[]
  dateRange?: DateRangeConfig
  buttons?: TableButtonsConfig
  actions?: ReactNode
}

export function DataTableToolbar({
  search,
  searchInput,
  onSearchInput,
  filters,
  dateRange,
  buttons,
  actions,
}: DataTableToolbarProps) {
  return (
    <div className="flex items-center justify-between gap-2">
      <div className="flex items-center gap-2">
        {search && (
          <div className="relative">
            <HugeiconsIcon
              icon={Search01Icon}
              size={13}
              className="absolute top-1/2 left-3.5 -translate-y-1/2 text-gray-400"
            />
            <Input
              value={searchInput}
              onChange={(e) => onSearchInput(e.target.value)}
              placeholder={search.placeholder ?? 'Search...'}
              className="h-8 w-56 rounded-full border-gray-200 bg-gray-50 pl-8.5 text-xs shadow-none transition-all focus-visible:w-72 focus-visible:bg-white focus-visible:ring-2 focus-visible:ring-gray-200"
            />
          </div>
        )}
        {filters?.map((filter) => {
          const isActive = !!filter.value && filter.value !== 'ALL'
          return (
            <Select
              key={filter.label}
              value={filter.value}
              onValueChange={filter.onChange}
            >
              <SelectTrigger
                className={`h-8 w-auto gap-1.5 rounded-full border px-3 text-xs font-medium shadow-none transition-all [&>svg]:hidden ${
                  isActive
                    ? 'border-gray-900 bg-gray-900 text-white hover:bg-gray-800'
                    : 'border-gray-200 bg-white text-gray-500 hover:border-gray-300 hover:text-gray-700'
                }`}
              >
                <HugeiconsIcon
                  icon={FilterIcon}
                  size={12}
                  className="shrink-0"
                />
                <SelectValue placeholder={filter.label} />
              </SelectTrigger>
              <SelectContent className="rounded-xl shadow-lg">
                {filter.options.map((opt) => (
                  <SelectItem key={opt.value} value={opt.value}>
                    {opt.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )
        })}
        {dateRange && (
          <div className="flex items-center gap-1.5">
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  data-active={!!dateRange.value?.from}
                  className="h-8 gap-1.5 rounded-full border-gray-200 bg-white px-3 text-xs font-medium text-gray-500 shadow-none transition-all hover:border-gray-300 hover:text-gray-700 data-[active=true]:border-gray-900 data-[active=true]:bg-gray-900 data-[active=true]:text-white data-[active=true]:hover:bg-gray-800"
                >
                  <HugeiconsIcon
                    icon={Calendar01Icon}
                    size={12}
                    className="shrink-0"
                  />
                  {dateRange.value?.from ? (
                    dateRange.value.to ? (
                      <>
                        {format(dateRange.value.from, 'MMM d')}
                        {' – '}
                        {format(dateRange.value.to, 'MMM d, yyyy')}
                      </>
                    ) : (
                      format(dateRange.value.from, 'MMM d, yyyy')
                    )
                  ) : (
                    'Date range'
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent
                className="w-auto rounded-xl border border-gray-100 p-3 shadow-xl"
                align="start"
              >
                <Calendar
                  autoFocus
                  mode="range"
                  defaultMonth={dateRange.value?.from}
                  selected={dateRange.value}
                  onSelect={(range) => {
                    if (
                      range?.from &&
                      range?.to &&
                      range.from.getTime() === range.to.getTime()
                    ) {
                      dateRange.onChange({ from: range.from, to: undefined })
                    } else {
                      dateRange.onChange(range)
                    }
                  }}
                  numberOfMonths={2}
                  timeZone={Intl.DateTimeFormat().resolvedOptions().timeZone}
                  className="[--cell-size:--spacing(8)]"
                />
              </PopoverContent>
            </Popover>
            {(dateRange.value?.from || dateRange.value?.to) && (
              <button
                onClick={() => dateRange.onChange(undefined)}
                className="flex h-8 w-8 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-400 transition-all hover:border-red-200 hover:bg-red-50 hover:text-red-500"
              >
                <HugeiconsIcon icon={Cancel01Icon} size={12} />
              </button>
            )}
          </div>
        )}
      </div>
      {(buttons || actions) && (
        <div className="flex items-center gap-2">
          {buttons?.export && (
            <Button
              variant="outline"
              size="sm"
              onClick={buttons.export.onClick}
              className="h-8 gap-1.5 rounded-full border-gray-200 px-3 text-xs font-medium text-gray-500 shadow-none hover:border-gray-300 hover:text-gray-700"
            >
              <HugeiconsIcon icon={FileExportIcon} size={12} strokeWidth={2} />
              {buttons.export.label ?? 'Export'}
            </Button>
          )}
          {buttons?.update && (
            <Button
              variant="outline"
              size="sm"
              onClick={buttons.update.onClick}
              className="h-8 gap-1.5 rounded-full border-gray-200 px-3 text-xs font-medium text-gray-500 shadow-none hover:border-gray-300 hover:text-gray-700"
            >
              <HugeiconsIcon icon={Edit02Icon} size={12} strokeWidth={2} />
              {buttons.update.label ?? 'Update'}
            </Button>
          )}
          {buttons?.create && (
            <Button
              size="sm"
              onClick={buttons.create.onClick}
              className="h-8 gap-1.5 rounded-full px-3 text-xs font-medium shadow-none"
            >
              <HugeiconsIcon icon={Add01Icon} size={12} strokeWidth={2} />
              {buttons.create.label ?? 'Create'}
            </Button>
          )}
          {actions}
        </div>
      )}
    </div>
  )
}
