import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

interface ModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description?: string;
  children?: React.ReactNode;
  onSubmit?: (e: React.FormEvent<HTMLFormElement>) => void;
  triggerText?: string;
}

export function Modal({
  open,
  onOpenChange,
  title = "Add New Entry",
  description = "Add a new favorite movie or TV show.",
  children,
  triggerText
}: ModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      { triggerText &&
      <DialogTrigger asChild>
        <Button>{ triggerText }</Button>
      </DialogTrigger>}
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{ title }</DialogTitle>
          {description && (
            <DialogDescription>
              {description}
            </DialogDescription>
          )}
        </DialogHeader>

        <div>
          {children}
        </div>

      </DialogContent>
    </Dialog>
  )
}
