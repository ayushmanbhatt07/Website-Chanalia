import { cn } from '@/lib/utils';

type ContainerProps = {
  children: React.ReactNode;
  className?: string;
  as?: React.ElementType;
};

export function Container({ children, className, as: Tag = 'div' }: ContainerProps) {
  return (
    <Tag className={cn('mx-auto w-full max-w-[1280px] px-5 md:px-8 lg:px-12', className)}>
      {children}
    </Tag>
  );
}
