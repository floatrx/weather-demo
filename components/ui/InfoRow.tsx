import { cn } from '@/lib/utils/cn';

interface Props extends ComponentProps<'p'> {
  label: string;
  classNames?: {
    label?: string;
    value?: string;
  };
}

/**
 * Display info row with label and value
 * Supports responsive design based on @container query
 * @param label
 * @param children
 * @param className
 * @param classNames
 * @param props
 * @constructor
 */
export const InfoRow: FC<Props> = ({ label, children, className, classNames, ...props }) => (
  <p className={cn('mb-2 flex flex-col', className)} {...props}>
    <span className={cn('@xs:inline hidden text-nowrap opacity-50', classNames?.label)}>{label}</span>{' '}
    <strong className={cn('text-nowrap text-xl transition-all', classNames?.value)}>{children}</strong>
  </p>
);
