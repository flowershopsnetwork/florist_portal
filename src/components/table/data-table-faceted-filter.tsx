import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
    CommandSeparator,
} from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"
import type { Column } from "@tanstack/react-table"
import { Check, PlusCircle } from "lucide-react"
import type * as React from "react"

interface DataTableFacetedFilterProps<TData, TValue> {
    column?: Column<TData, TValue>
    title?: string
    options: {
        label: string
        value: string
        icon?: React.ComponentType<{ className?: string }>
    }[]
    onFilterChange?: (value: string | undefined) => void
}

export function DataTableFacetedFilter<TData, TValue>({
    column,
    title,
    options,
    onFilterChange,
}: DataTableFacetedFilterProps<TData, TValue>) {
    const facets = column?.getFacetedUniqueValues()
    const selectedValue = column?.getFilterValue() as string | undefined

    const selectedOption = options.find((option) => option.value === selectedValue)

    const handleSelect = (value: string) => {
        const newValue = selectedValue === value ? undefined : value
        column?.setFilterValue(newValue)

        // Call the onFilterChange callback
        if (onFilterChange) {
            onFilterChange(newValue)
        }
    }

    const handleClear = () => {
        column?.setFilterValue(undefined)

        // Call the onFilterChange callback with undefined
        if (onFilterChange) {
            onFilterChange(undefined)
        }
    }

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button variant="outline" size="sm" className="h-8 border-dashed">
                    <PlusCircle className="mr-2 h-4 w-4" />
                    {title}
                    {selectedOption && (
                        <>
                            <Separator orientation="vertical" className="mx-2 h-4" />
                            <Badge variant="secondary" className="rounded-sm px-1 font-normal">
                                {selectedOption.label}
                            </Badge>
                        </>
                    )}
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0" align="start">
                <Command>
                    <CommandInput placeholder={title} />
                    <CommandList>
                        <CommandEmpty>No results found.</CommandEmpty>
                        <CommandGroup>
                            {options.map((option) => {
                                const isSelected = selectedValue === option.value
                                return (
                                    <CommandItem key={option.value} onSelect={() => handleSelect(option.value)}>
                                        <div
                                            className={cn(
                                                "mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary",
                                                isSelected ? "bg-primary text-primary-foreground" : "opacity-50 [&_svg]:invisible",
                                            )}
                                        >
                                            <Check className="h-4 w-4" />
                                        </div>
                                        {option.icon && <option.icon className="mr-2 h-4 w-4 text-muted-foreground" />}
                                        <span>{option.label}</span>
                                        {facets?.get(option.value) && (
                                            <span className="ml-auto flex h-4 w-4 items-center justify-center font-mono text-xs">
                                                {facets.get(option.value)}
                                            </span>
                                        )}
                                    </CommandItem>
                                )
                            })}
                        </CommandGroup>
                        {selectedValue && (
                            <>
                                <CommandSeparator />
                                <CommandGroup>
                                    <CommandItem onSelect={handleClear} className="justify-center text-center">
                                        Clear filter
                                    </CommandItem>
                                </CommandGroup>
                            </>
                        )}
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    )
}
