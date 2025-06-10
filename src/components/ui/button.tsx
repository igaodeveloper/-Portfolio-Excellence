import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import {
  motion,
  isMotionValue,
  type MotionValue,
  type HTMLMotionProps,
  type MotionProps,
} from 'framer-motion';

import { cn } from '@/lib/utils';

/* ---------------------------------- cva ---------------------------------- */

const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background',
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground hover:bg-primary/90',
        destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/90',
        outline: 'border border-input bg-background hover:bg-accent hover:text-accent-foreground',
        secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
        ghost: 'hover:bg-accent hover:text-accent-foreground',
        link: 'underline-offset-4 hover:underline text-primary',
      },
      size: {
        default: 'h-10 py-2 px-4',
        sm: 'h-9 px-3 rounded-md',
        lg: 'h-11 px-8 rounded-md',
        icon: 'h-10 w-10',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

/* ------------------------------ type helpers ----------------------------- */

export interface ButtonProps
  extends Omit<HTMLMotionProps<'button'>, 'ref'>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

/** Garante que Motion props não vazem pro `<Slot/>` */
function filterMotionProps(props: ButtonProps): Omit<ButtonProps, keyof MotionProps> {
  const {
    /* Motion-only props a descartar */
    whileHover,
    whileTap,
    whileDrag,
    drag,
    dragConstraints,
    dragControls,
    dragElastic,
    dragListener,
    dragMomentum,
    dragSnapToOrigin,
    onDrag,
    onDragStart,
    onDragEnd,
    onDragTransitionEnd,
    animate,
    initial,
    exit,
    transition,
    variants,
    layout,
    layoutId,
    ...rest
  } = props;
  return rest;
}

/* -------------------------- aria-label auto helper ------------------------ */

function getAriaLabel(
  children: React.ReactNode | MotionValue<unknown>,
  ariaLabel?: string
) {
  if (ariaLabel) return ariaLabel;          // usuário já definiu
  if (isMotionValue(children)) return;      // não dá pra inferir de MotionValue
  if (
    React.Children.count(children) === 1 &&
    React.isValidElement(children) &&
    (children.type as any)?.render?.name?.toLowerCase().includes('icon')
  ) {
    return 'Ícone';
  }
  return undefined;
}

/* -------------------------------- Button --------------------------------- */

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      asChild = false,
      children,
      'aria-label': ariaLabel,
      ...restProps
    },
    ref
  ) => {
    const classNames = cn(buttonVariants({ variant, size, className }));
    const autoAriaLabel = getAriaLabel(children, ariaLabel);

    /* -- Slot branch (sem Motion props) ----------------------------------- */
    if (asChild) {
      const safeProps = filterMotionProps(restProps);
      return (
        <Slot ref={ref} className={classNames} aria-label={autoAriaLabel} {...safeProps} />
      );
    }

    /* -- motion.button branch -------------------------------------------- */
    return (
      <motion.button
        ref={ref}
        className={classNames}
        whileTap={{ scale: 0.96 }}
        aria-label={autoAriaLabel}
        {...restProps}
      >
        {children}
      </motion.button>
    );
  }
);
Button.displayName = 'Button';

export { Button, buttonVariants };
