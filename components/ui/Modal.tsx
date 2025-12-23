'use client';

import {
  forwardRef,
  useCallback,
  useEffect,
  useId,
  useRef,
  type HTMLAttributes,
  type ReactNode,
  type KeyboardEvent,
} from 'react';
import { createPortal } from 'react-dom';

export type ModalSize = 'sm' | 'md' | 'lg' | 'xl' | 'full';

export interface ModalProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  /** Whether the modal is open */
  isOpen: boolean;
  /** Callback when the modal should close */
  onClose: () => void;
  /** The title displayed in the modal header */
  title?: ReactNode;
  /** The description displayed below the title for accessibility */
  description?: string;
  /** The size of the modal */
  size?: ModalSize;
  /** Whether to show the close button */
  showCloseButton?: boolean;
  /** Whether clicking the backdrop should close the modal */
  closeOnBackdropClick?: boolean;
  /** Whether pressing Escape should close the modal */
  closeOnEscape?: boolean;
  /** Content to render in the modal footer */
  footer?: ReactNode;
  /** Whether to center the modal vertically */
  centered?: boolean;
}

const sizeStyles: Record<ModalSize, string> = {
  sm: 'max-w-sm',
  md: 'max-w-md',
  lg: 'max-w-lg',
  xl: 'max-w-xl',
  full: 'max-w-full mx-4',
};

/**
 * A reusable modal component with backdrop, close button, and focus trap.
 *
 * @example
 * ```tsx
 * <Modal
 *   isOpen={isOpen}
 *   onClose={() => setIsOpen(false)}
 *   title="Confirm Action"
 * >
 *   <p>Are you sure you want to continue?</p>
 * </Modal>
 *
 * <Modal
 *   isOpen={isOpen}
 *   onClose={handleClose}
 *   title="Edit Profile"
 *   size="lg"
 *   footer={
 *     <div className="flex gap-2 justify-end">
 *       <Button variant="secondary" onClick={handleClose}>Cancel</Button>
 *       <Button onClick={handleSave}>Save</Button>
 *     </div>
 *   }
 * >
 *   <form>...</form>
 * </Modal>
 * ```
 */
export const Modal = forwardRef<HTMLDivElement, ModalProps>(
  (
    {
      isOpen,
      onClose,
      title,
      description,
      size = 'md',
      showCloseButton = true,
      closeOnBackdropClick = true,
      closeOnEscape = true,
      footer,
      centered = true,
      className = '',
      children,
      ...props
    },
    ref
  ) => {
    const generatedId = useId();
    const titleId = `${generatedId}-title`;
    const descriptionId = `${generatedId}-description`;

    const modalRef = useRef<HTMLDivElement>(null);
    const previousActiveElement = useRef<Element | null>(null);

    // Focus trap: get all focusable elements within the modal
    const getFocusableElements = useCallback(() => {
      if (!modalRef.current) return [];
      const focusableSelectors = [
        'button:not([disabled])',
        'input:not([disabled])',
        'select:not([disabled])',
        'textarea:not([disabled])',
        'a[href]',
        '[tabindex]:not([tabindex="-1"])',
      ];
      return Array.from(
        modalRef.current.querySelectorAll<HTMLElement>(focusableSelectors.join(', '))
      );
    }, []);

    // Handle focus trap on Tab key
    const handleKeyDown = useCallback(
      (event: KeyboardEvent<HTMLDivElement>) => {
        if (event.key === 'Escape' && closeOnEscape) {
          event.preventDefault();
          onClose();
          return;
        }

        if (event.key !== 'Tab') return;

        const focusableElements = getFocusableElements();
        if (focusableElements.length === 0) return;

        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        // Shift + Tab: if focus is on first element, move to last
        if (event.shiftKey) {
          if (document.activeElement === firstElement) {
            event.preventDefault();
            lastElement.focus();
          }
        } else {
          // Tab: if focus is on last element, move to first
          if (document.activeElement === lastElement) {
            event.preventDefault();
            firstElement.focus();
          }
        }
      },
      [closeOnEscape, onClose, getFocusableElements]
    );

    // Handle backdrop click
    const handleBackdropClick = useCallback(
      (event: React.MouseEvent<HTMLDivElement>) => {
        if (closeOnBackdropClick && event.target === event.currentTarget) {
          onClose();
        }
      },
      [closeOnBackdropClick, onClose]
    );

    // Lock body scroll and manage focus when modal opens/closes
    useEffect(() => {
      if (isOpen) {
        // Store the currently focused element
        previousActiveElement.current = document.activeElement;

        // Lock body scroll
        document.body.style.overflow = 'hidden';

        // Focus the modal or first focusable element
        const timer = setTimeout(() => {
          const focusableElements = getFocusableElements();
          if (focusableElements.length > 0) {
            focusableElements[0].focus();
          } else {
            modalRef.current?.focus();
          }
        }, 0);

        return () => {
          clearTimeout(timer);
        };
      } else {
        // Restore body scroll
        document.body.style.overflow = '';

        // Restore focus to previous element
        if (previousActiveElement.current instanceof HTMLElement) {
          previousActiveElement.current.focus();
        }
      }
    }, [isOpen, getFocusableElements]);

    // Cleanup on unmount
    useEffect(() => {
      return () => {
        document.body.style.overflow = '';
      };
    }, []);

    // Don't render anything if modal is closed
    if (!isOpen) return null;

    const backdropStyles = [
      'fixed inset-0 z-50',
      'bg-black/50 backdrop-blur-sm',
      'transition-opacity duration-200',
    ]
      .filter(Boolean)
      .join(' ');

    const containerStyles = [
      'fixed inset-0 z-50',
      'overflow-y-auto',
      'flex min-h-full',
      centered ? 'items-center' : 'items-start pt-10',
      'justify-center p-4',
    ]
      .filter(Boolean)
      .join(' ');

    const panelStyles = [
      'relative w-full',
      'bg-white dark:bg-gray-800',
      'rounded-xl shadow-xl',
      'transform transition-all duration-200',
      sizeStyles[size],
      className,
    ]
      .filter(Boolean)
      .join(' ');

    const headerStyles = [
      'flex items-start justify-between',
      'px-6 pt-6',
      title || showCloseButton ? 'pb-4' : '',
    ]
      .filter(Boolean)
      .join(' ');

    const titleStyles = [
      'text-lg font-semibold',
      'text-gray-900 dark:text-gray-100',
    ]
      .filter(Boolean)
      .join(' ');

    const closeButtonStyles = [
      'flex items-center justify-center',
      'h-8 w-8 rounded-lg',
      'text-gray-400 hover:text-gray-600',
      'dark:text-gray-500 dark:hover:text-gray-300',
      'hover:bg-gray-100 dark:hover:bg-gray-700',
      'transition-colors duration-200',
      'focus:outline-none focus:ring-2 focus:ring-pink-500',
      !title ? 'absolute top-4 right-4' : '',
    ]
      .filter(Boolean)
      .join(' ');

    const contentStyles = [
      'px-6',
      title || showCloseButton ? '' : 'pt-6',
      footer ? 'pb-4' : 'pb-6',
    ]
      .filter(Boolean)
      .join(' ');

    const footerStyles = [
      'px-6 pb-6 pt-2',
      'border-t border-gray-200 dark:border-gray-700',
    ]
      .filter(Boolean)
      .join(' ');

    const modalContent = (
      <>
        {/* Backdrop */}
        <div className={backdropStyles} aria-hidden="true" />

        {/* Modal container */}
        <div
          className={containerStyles}
          onClick={handleBackdropClick}
          onKeyDown={handleKeyDown}
          role="presentation"
        >
          {/* Modal panel */}
          <div
            ref={(node) => {
              // Handle both refs
              modalRef.current = node;
              if (typeof ref === 'function') {
                ref(node);
              } else if (ref) {
                ref.current = node;
              }
            }}
            role="dialog"
            aria-modal="true"
            aria-labelledby={title ? titleId : undefined}
            aria-describedby={description ? descriptionId : undefined}
            tabIndex={-1}
            className={panelStyles}
            {...props}
          >
            {/* Header */}
            {(title || showCloseButton) && (
              <div className={headerStyles}>
                {title && (
                  <div className="flex-1">
                    <h2 id={titleId} className={titleStyles}>
                      {title}
                    </h2>
                    {description && (
                      <p
                        id={descriptionId}
                        className="mt-1 text-sm text-gray-500 dark:text-gray-400"
                      >
                        {description}
                      </p>
                    )}
                  </div>
                )}
                {showCloseButton && (
                  <button
                    type="button"
                    onClick={onClose}
                    className={closeButtonStyles}
                    aria-label="Close modal"
                  >
                    <CloseIcon />
                  </button>
                )}
              </div>
            )}

            {/* Content */}
            <div className={contentStyles}>{children}</div>

            {/* Footer */}
            {footer && <div className={footerStyles}>{footer}</div>}
          </div>
        </div>
      </>
    );

    // Use portal to render modal at the document body level
    if (typeof document !== 'undefined') {
      return createPortal(modalContent, document.body);
    }

    return null;
  }
);

Modal.displayName = 'Modal';

/**
 * Internal close icon component for the modal close button
 */
function CloseIcon() {
  return (
    <svg
      className="h-5 w-5"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M6 18L18 6M6 6l12 12"
      />
    </svg>
  );
}

export default Modal;
