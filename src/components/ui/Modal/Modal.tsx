import { createPortal } from "react-dom";
import { CloseBtn, ModalContent, ModalOverlay, ModalTitle } from "./Modal.styles";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
}

export const Modal: React.FC<ModalProps> = ({ open, onClose, title, children }) => {
  if (!open) return null;

  return createPortal(
    <ModalOverlay>
      <ModalContent>
        {title && <ModalTitle>{title}</ModalTitle>}
        <CloseBtn onClick={onClose} aria-label="Close">
          &times;
        </CloseBtn>
        {children}
      </ModalContent>
    </ModalOverlay>,
    document.body,
  );
};