"use client"

import { Button } from "@/components/ui/button"
import { Settings } from "lucide-react"
import Image from "next/image"

interface AppHeaderProps {
  onOpenSettings: () => void
}

export function AppHeader({ onOpenSettings }: AppHeaderProps) {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80 border-b border-border">
      <div className="container flex h-16 items-center justify-between px-6">
        <div className="flex items-center gap-3">
          <div className="relative w-10 h-10 flex-shrink-0">
            <Image src="/phottomo.jpeg" alt="ふぉっともくん" fill className="object-contain" />
          </div>
          <div className="flex flex-col">
            <h1 className="text-2xl font-bold tracking-tight text-primary leading-none">ふぉっとも</h1>
            <p className="text-xs text-muted-foreground leading-none mt-0.5">Photo Academy</p>
          </div>
        </div>

        <Button variant="ghost" size="icon" onClick={onOpenSettings}>
          <Settings className="h-5 w-5" />
        </Button>
      </div>
    </header>
  )
}
