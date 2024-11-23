import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "../../lib/cn";
import { useClickOutside } from "../../hooks/useClickOutside";

type ModalBackdrop = "opaque" | "blur";

interface ModalProps {
  className?: string;
  children?: React.ReactNode;
  backdrop?: ModalBackdrop;
  open: boolean;
  defaultOpen?: boolean;
  onOpenChange: (state: boolean) => void;
}

const modalbgVariants = {
  closed: { opacity: 0 },
  open: { opacity: 1 },
};

const modalVariants = {
  closed: { opacity: 0, scale: 0.9 },
  open: { opacity: 1, scale: 1 },
};

export const Modal: React.FC<ModalProps> = ({
  children,
  open,
  backdrop,
  className,
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
            initial={modalbgVariants.closed}
            animate={modalbgVariants.open}
            exit={modalbgVariants.closed}
            transition={{ duration: 0.15 }}
            className={cn(
              " fixed top-0 left-0 h-svh w-svw backdrop-filter transition-all  z-50",
              backdrop == "blur" && open ? "backdrop-blur-sm" : "",
              backdrop == "opaque" && open ? "bg-[#00000055]" : ""
            )}
          ></motion.div>
        )}
      </AnimatePresence>
      <div className="fixed top-0 left-0 h-svh w-svw flex items-center justify-center pointer-events-none  z-50">
        <AnimatePresence>
          {open && (
            <motion.div
              ref={ref}
              className={cn(
                "bg-gray-400 h-fit w-fit rounded-md text-black pointer-events-auto",
                className
              )}
              initial={modalVariants.closed}
              animate={modalVariants.open}
              exit={modalVariants.closed}
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
