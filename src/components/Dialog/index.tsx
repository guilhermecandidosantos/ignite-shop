import { X } from '@phosphor-icons/react';
import * as Dialog from '@radix-ui/react-dialog';
import { AnimatePresence,motion } from 'motion/react';
import { 
  createContext, 
  ForwardedRef,
  forwardRef, 
  useContext, 
  useState 
} from 'react';

import {
  DialogRadixClose, 
  DialogRadixContent, 
  DialogRadixOverlay, 
  DialogRadixTitle
} from './style';

export const DialogOpenContext = createContext<boolean>(false);

export function DialogRoot({ children, ...props }: Dialog.DialogProps) {
  const [isOpen, setOpen] = useState<boolean>(false);

  return (
    <DialogOpenContext.Provider value={isOpen}>
      <Dialog.Root onOpenChange={setOpen} {...props}>
        {children}
      </Dialog.Root>
    </DialogOpenContext.Provider>
  );
}

export const DialogTrigger = Dialog.Trigger;

const overlayVariants = {
  closed: { opacity: 0, translateX: 100 },
  open: { opacity: 1, translateX: 0 }
};

const dialogVariants = {
  closed: { opacity: 0, translateX: 100 },
  open: { opacity: 1, translateX: 0 }
};

let dialogContainer: HTMLDivElement;

function getEnsureDialogContainer() {
  if (!dialogContainer) {
    dialogContainer = document.createElement('div');
    dialogContainer.className = 'container';
    document.body.append(dialogContainer);
  }

  return dialogContainer;
}

function DialogContentCore(
  { children, className, ...props }: Dialog.DialogContentProps,
  forwardedRef: ForwardedRef<HTMLDivElement>
) {
  const isOpen = useContext(DialogOpenContext);

  return (
    <AnimatePresence>
      {isOpen && (
        <Dialog.Portal forceMount container={getEnsureDialogContainer()}>
          <DialogRadixOverlay asChild>
            <motion.div
              variants={overlayVariants}
              initial="closed"
              animate="open"
              exit="closed"
            />
          </DialogRadixOverlay>

          <DialogRadixContent
            forceMount
            className="content"
            ref={forwardedRef}
            asChild
            {...props}
          >
            <motion.div
              variants={dialogVariants}
              initial="closed"
              animate="open"
              exit="closed"
            >
              <DialogRadixClose><X size={24} weight="bold" /></DialogRadixClose>
              <DialogRadixTitle>Sacola de compras</DialogRadixTitle>
              {children}
            </motion.div>
          </DialogRadixContent>
        </Dialog.Portal>
      )}
    </AnimatePresence>
  );
}

export const DialogContent = forwardRef(DialogContentCore);