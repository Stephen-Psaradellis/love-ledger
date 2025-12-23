'use client';

import { forwardRef, type InputHTMLAttributes, useId } from 'react';

export type InputSize = 'sm' | 'md' | 'lg';

export interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  /** Label text displayed above the input */
  label?: string;
  /** Error message to display below the input */
  error?: string;
  /** Helper text displayed below the input when there's no error */
  helperText?: string;
  /** The size of the input */
  size?: InputSize;
  /** Whether the input should take full width of its container */
  fullWidth?: boolean;
  /** Content to display on the left side of the input */
  leftIcon?: React.ReactNode;
  /** Content to display on the right side of the input */
  rightIcon?: React.ReactNode;
}

const sizeStyles: Record<InputSize, string> = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-4 py-2 text-base',
  lg: 'px-4 py-3 text-lg',
};

const iconSizeStyles: Record<InputSize, string> = {
  sm: 'h-4 w-4',
  md: 'h-5 w-5',
  lg: 'h-6 w-6',
};

const labelSizeStyles: Record<InputSize, string> = {
  sm: 'text-xs',
  md: 'text-sm',
  lg: 'text-base',
};

/**
 * A reusable input component with label, error states, and accessibility.
 *
 * @example
 * ```tsx
 * <Input
 *   label="Email"
 *   type="email"
 *   placeholder="Enter your email"
 * />
 *
 * <Input
 *   label="Password"
 *   type="password"
 *   error="Password must be at least 8 characters"
 * />
 *
 * <Input
 *   label="Search"
 *   leftIcon={<SearchIcon />}
 *   placeholder="Search..."
 * />
 * ```
 */
export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      error,
      helperText,
      size = 'md',
      fullWidth = false,
      leftIcon,
      rightIcon,
      disabled,
      className = '',
      id,
      ...props
    },
    ref
  ) => {
    const generatedId = useId();
    const inputId = id || generatedId;
    const errorId = `${inputId}-error`;
    const helperId = `${inputId}-helper`;

    const hasError = Boolean(error);

    const containerStyles = [
      'flex flex-col',
      fullWidth ? 'w-full' : '',
    ]
      .filter(Boolean)
      .join(' ');

    const inputWrapperStyles = [
      'relative flex items-center',
      fullWidth ? 'w-full' : '',
    ]
      .filter(Boolean)
      .join(' ');

    const inputStyles = [
      'block rounded-lg',
      'border transition-colors duration-200',
      'placeholder:text-gray-400 dark:placeholder:text-gray-500',
      'focus:outline-none focus:ring-2 focus:ring-offset-0',
      'disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500',
      'dark:disabled:bg-gray-900 dark:disabled:text-gray-500',
      hasError
        ? 'border-red-500 focus:border-red-500 focus:ring-red-500 dark:border-red-500'
        : 'border-gray-300 focus:border-pink-500 focus:ring-pink-500 dark:border-gray-600 dark:focus:border-pink-500',
      'bg-white dark:bg-gray-800',
      'text-gray-900 dark:text-gray-100',
      sizeStyles[size],
      leftIcon ? 'pl-10' : '',
      rightIcon ? 'pr-10' : '',
      fullWidth ? 'w-full' : '',
      className,
    ]
      .filter(Boolean)
      .join(' ');

    const labelStyles = [
      'block font-medium mb-1.5',
      'text-gray-700 dark:text-gray-300',
      labelSizeStyles[size],
    ]
      .filter(Boolean)
      .join(' ');

    const iconBaseStyles = [
      'absolute top-1/2 -translate-y-1/2',
      'text-gray-400 dark:text-gray-500',
      'pointer-events-none',
      iconSizeStyles[size],
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <div className={containerStyles}>
        {label && (
          <label htmlFor={inputId} className={labelStyles}>
            {label}
          </label>
        )}
        <div className={inputWrapperStyles}>
          {leftIcon && (
            <span className={`${iconBaseStyles} left-3`} aria-hidden="true">
              {leftIcon}
            </span>
          )}
          <input
            ref={ref}
            id={inputId}
            disabled={disabled}
            className={inputStyles}
            aria-invalid={hasError}
            aria-describedby={
              hasError ? errorId : helperText ? helperId : undefined
            }
            {...props}
          />
          {rightIcon && (
            <span className={`${iconBaseStyles} right-3`} aria-hidden="true">
              {rightIcon}
            </span>
          )}
        </div>
        {hasError && (
          <p id={errorId} className="mt-1.5 text-sm text-red-500" role="alert">
            {error}
          </p>
        )}
        {!hasError && helperText && (
          <p id={helperId} className="mt-1.5 text-sm text-gray-500 dark:text-gray-400">
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input;
