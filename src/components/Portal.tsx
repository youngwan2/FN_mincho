import { ReactNode } from "react";
import { createPortal } from "react-dom";

interface PortalProps {
    children: ReactNode;
}

export default function Portal({ children }: PortalProps) {
    if (typeof window === "undefined") return null;
    const modalRoot = document.getElementById("modal-root") || document.body;
    return createPortal(children, modalRoot);
}
