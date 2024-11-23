import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "../../../lib/cn";
import { useClickOutside } from "../../../hooks/useClickOutside";

type ModalBackdrop = "opaque" | "blur";

interface ContextMenuProps {
  className?: string;
  children?: React.ReactNode;
  backdrop?: ModalBackdrop;
  open: boolean;
  positionX: number;
  positionY: number;
  defaultOpen?: boolean;
  onOpenChange: (state: boolean) => void;
}

const contextMenuBgVariants = {
  closed: { opacity: 0 },
  open: { opacity: 1 },
};

const contextMenuVariants = {
  closed: { opacity: 0, scale: 0.9 },
  open: { opacity: 1, scale: 1 },
};

export const ContextMenu: React.FC<ContextMenuProps> = ({
  children,
  open,
  backdrop,
  className,
  positionY,
  positionX,
  onOpenChange,
}) => {
  const ref = React.useRef<HTMLDivElement>(null);

  useClickOutside(ref, () => {
    onOpenChange(false);
  });

  return (
    <div>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={contextMenuBgVariants.closed}
            animate={contextMenuBgVariants.open}
            exit={contextMenuVariants.closed}
            transition={{ duration: 0.15 }}
            className={cn(
              " fixed top-0 left-0 h-svh w-svw transition-all  z-50"
            )}
          ></motion.div>
        )}
      </AnimatePresence>
      <div
        className="fixed top-0 left-0 h-svh w-svw pointer-events-none z-50"
        style={{ top: positionY, left: positionX }}
      >
        <AnimatePresence>
          {open && (
            <motion.div
              ref={ref}
              className={cn(
                "h-fit w-fit rounded-md text-black pointer-events-auto",
                className
              )}
              initial={contextMenuVariants.closed}
              animate={contextMenuVariants.open}
              exit={contextMenuVariants.closed}
              transition={{ duration: 0.15 }}
            >
              {children}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
