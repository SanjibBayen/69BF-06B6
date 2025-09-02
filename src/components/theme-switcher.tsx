"use client"

import { useTheme } from "next-themes"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Sun, Moon, Cog } from "lucide-react"

interface ThemeSwitcherProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function ThemeSwitcher({ open, onOpenChange }: ThemeSwitcherProps) {
  const { setTheme } = useTheme()

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Select Theme</SheetTitle>
          <SheetDescription>
            Choose a theme to personalize your experience.
          </SheetDescription>
        </SheetHeader>
        <div className="mt-8 flex flex-col gap-4">
          <Button
            variant="outline"
            className="w-full justify-start gap-4 h-14 text-base"
            onClick={() => {
              setTheme("light")
              onOpenChange(false)
            }}
          >
            <Sun className="h-6 w-6" />
            Light
          </Button>
          <Button
            variant="outline"
            className="w-full justify-start gap-4 h-14 text-base"
            onClick={() => {
              setTheme("dark")
              onOpenChange(false)
            }}
          >
            <Moon className="h-6 w-6" />
            Dark
          </Button>
          <Button
            variant="outline"
            className="w-full justify-start gap-4 h-14 text-base"
            onClick={() => {
              setTheme("system")
              onOpenChange(false)
            }}
          >
            <Cog className="h-6 w-6" />
            System
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  )
}
