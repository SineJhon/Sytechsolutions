'use client'

import * as React from 'react'
import * as TabsPrimitive from '@radix-ui/react-tabs'

const Tabs = TabsPrimitive.Root

const TabsList = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.List
    ref={ref}
    className={`inline-flex items-center gap-1 p-1 rounded-xl bg-[rgba(255,255,255,0.04)] border border-white/5 ${className || ''}`}
    {...props}
  />
))
TabsList.displayName = 'TabsList'

const TabsTrigger = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Trigger
    ref={ref}
    className={`inline-flex items-center justify-center whitespace-nowrap rounded-lg px-4 py-2 text-[13px] font-medium text-text-tertiary transition-all duration-300 data-[state=active]:bg-[rgba(37,99,235,0.15)] data-[state=active]:text-accent-light data-[state=active]:shadow-sm hover:text-text-primary ${className || ''}`}
    {...props}
  />
))
TabsTrigger.displayName = 'TabsTrigger'

export { Tabs, TabsList, TabsTrigger }