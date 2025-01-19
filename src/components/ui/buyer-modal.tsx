"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

interface BuyerInfo {
  name: string
  email: string
}

interface BuyerInfoModalProps {
  buyerInfo: BuyerInfo
  trigger: React.ReactNode,
  isBuyer: boolean
}

export function BuyerInfoModal({ buyerInfo, trigger, isBuyer }: BuyerInfoModalProps) {
  const [open, setOpen] = useState(false)

  const handleProceed = () => {
    setOpen(false)
  }


  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Informações do {isBuyer ? "Comprador" : "Vendedor"} </DialogTitle>
          <DialogDescription>
            {isBuyer ? "Contacte o comprador para finalizar a venda" : "Contacte o vendedor para finalizar a compra"}
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <span className="font-semibold">Name:</span>
            <span className="col-span-3">{buyerInfo.name}</span>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <span className="font-semibold">Email:</span>
            <span className="col-span-3">{buyerInfo.email}</span>
          </div>
        </div>
        <DialogFooter>
          <Button onClick={handleProceed}>Fechar</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
