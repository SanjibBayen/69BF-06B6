"use client"

import { useTheme } from "next-themes"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Sun, Moon, Cog } from "lucide-react"

interface ThemeSwitcherProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function ThemeSwitcher({ open, onOpenChange }: ThemeSwitcherProps) {
  const { setTheme } = useTheme()

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Select Theme</DialogTitle>
          <DialogDescription>
            Choose a theme to personalize your experience.
          </DialogDescription>
        </DialogHeader>
        <div className="mt-4 flex flex-col gap-4">
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
      </DialogContent>
    </Dialog>
  )
}
