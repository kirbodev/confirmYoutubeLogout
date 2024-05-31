import { DialogTrigger } from "@radix-ui/react-dialog"
import cssText from "data-text:~style.css"
import type { PlasmoCSConfig, PlasmoGetInlineAnchor } from "plasmo"
import React from "react"

import { Button } from "~components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from "~components/ui/dialog"

export const config: PlasmoCSConfig = {
  matches: ["https://www.youtube.com/*"]
}

export const getInlineAnchor: PlasmoGetInlineAnchor = async () => document.body

export const getStyle = () => {
  // load tailwind
  const style = document.createElement("style")
  style.textContent = cssText
  return style
}

console.log("Hello from Plasmo!")

function getLogout() {
  const logout = document.querySelector('[href="/logout"]') as HTMLAnchorElement
  if (!logout) return
  if (logout.id === "confirm-logout") return
  if (!(logout instanceof HTMLAnchorElement)) return

  return logout
}

function overrideLogout(
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
) {
  // get an element from the DOM
  const logout = getLogout()
  if (!logout) return
  logout.href = "#"
  logout.addEventListener("click", (e) => {
    e.preventDefault()
    e.stopPropagation()
    setOpen(true)
  })
}

export default function ConfirmationDialog() {
  const style = document.createElement("style")
  style.textContent = cssText
  document.head.appendChild(style)

  const [open, setOpen] = React.useState(false)

  const observer = new MutationObserver(function (mutations) {
    mutations.forEach(function (mutation) {
      if (mutation.type === "childList") {
        const logout = getLogout()
        if (!logout) return

        overrideLogout(setOpen)
      }
    })
  })

  observer.observe(document.body, {
    childList: true,
    subtree: true
  })

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle> Are you sure you want to logout?</DialogTitle>
          <DialogDescription>
            This will log you out of your Google account on this browser.
          </DialogDescription>
        </DialogHeader>
        <Button variant="destructive" size="lg" asChild>
          <a href="/logout" id="confirm-logout" className="tw-text-base">
            Logout
          </a>
        </Button>
      </DialogContent>
      <DialogClose />
    </Dialog>
  )
}
