import { cn } from '@/lib/utils/cn';

interface Props extends ComponentProps<'p'> {
  label: string;
  classNames?: {
    label?: string;
    value?: string;
  };
}

export const InfoRow: FC<Props> = ({ label, children, className, classNames, ...props }) => (
  <p className={cn('mb-2 flex flex-col', className)} {...props}>
    <span className={cn('hidden text-nowrap opacity-50 @xs:inline', classNames?.label)}>{label}</span>{' '}
    <strong className={cn('text-nowrap text-xl transition-all', classNames?.value)}>{children}</strong>
  </p>
);
