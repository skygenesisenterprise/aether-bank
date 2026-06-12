'use client'

import { Search, Bell, HelpCircle } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

interface HeaderProps {
  title: string
  description?: string
}

export function AdminHeader({ title, description }: HeaderProps) {
  return (
    <header className="sticky top-0 z-40 flex h-16 items-center justify-between border-b border-border bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60 px-6">
      <div className="flex flex-col">
        <h1 className="text-lg font-semibold text-foreground">{title}</h1>
        {description && (
          <p className="text-sm text-muted-foreground">{description}</p>
        )}
      </div>

      <div className="flex items-center gap-4">
        {/* Search */}
        <div className="relative hidden md:block">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Rechercher..."
            className="w-64 pl-9 bg-secondary/50 border-border"
          />
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="h-5 w-5 text-muted-foreground" />
            <Badge className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center bg-destructive text-destructive-foreground text-xs">
              3
            </Badge>
          </Button>
          <Button variant="ghost" size="icon">
            <HelpCircle className="h-5 w-5 text-muted-foreground" />
          </Button>
        </div>
      </div>
    </header>
  )
}
