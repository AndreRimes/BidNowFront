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

interface ConfirmationModalProps {
  itemName: string
  price: number
  onConfirm: () => void
  onCancel: () => void
  trigger: React.ReactNode
}

export function ConfirmationModal({
  itemName,
  price,
  onConfirm,
  onCancel,
  trigger
}: ConfirmationModalProps) {
  const [open, setOpen] = useState(false)

  const handleConfirm = () => {
    onConfirm()
    setOpen(false)
  }

  const handleCancel = () => {
    onCancel()
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Confirmar venda</DialogTitle>
          <DialogDescription>
            Voce tem certeza que deseja vender este item?
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <p className="text-center text-lg font-semibold">
            {itemName}
          </p>
          <p className="text-center text-2xl font-bold">
            ${price.toFixed(2)}
          </p>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={handleCancel}>Cancelar</Button>
          <Button onClick={handleConfirm}>Confirmar venda</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

