import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react';
import { ArrowRight } from 'lucide-react';

type FlowButtonProps = {
  text: string;
  className?: string;
  children?: ReactNode;
} & (
  | ({ href: string } & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href' | 'children' | 'className' | 'type'>)
  | ({ href?: undefined } & Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children' | 'className'>)
);

const buttonClassName = 'group relative inline-flex shrink-0 items-center justify-center gap-1 overflow-hidden whitespace-nowrap rounded-[100px] border-[1.5px] border-[#8a4ff0] bg-[#9e6df2] px-7 py-3.5 text-sm font-semibold text-white transition-all duration-[600ms] ease-[cubic-bezier(0.23,1,0.32,1)] hover:rounded-xl hover:border-[#7C3AED] hover:bg-[#7C3AED] hover:text-white active:scale-[0.95]';

function Contents({ text, children }: { text: string; children?: ReactNode }) {
  return <>
    <ArrowRight aria-hidden="true" className="absolute left-[-25%] z-[9] h-4 w-4 stroke-current transition-all duration-[800ms] ease-[cubic-bezier(0.34,1.56,0.64,1)] group-hover:left-4" />
    <span className="relative z-[1] -translate-x-3 transition-transform duration-[800ms] ease-out group-hover:translate-x-3">{children || text}</span>
    <span aria-hidden="true" className="absolute left-1/2 top-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet-600 opacity-0 transition-all duration-[800ms] ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:h-[220px] group-hover:w-[220px] group-hover:opacity-100" />
    <ArrowRight aria-hidden="true" className="absolute right-4 z-[9] h-4 w-4 stroke-current transition-all duration-[800ms] ease-[cubic-bezier(0.34,1.56,0.64,1)] group-hover:right-[-25%]" />
  </>;
}

export function FlowButton(props: FlowButtonProps) {
  const { text, className = '', children, ...rest } = props;
  const classes = `${buttonClassName} ${className}`;

  if (props.href) {
    return <a {...rest as AnchorHTMLAttributes<HTMLAnchorElement>} href={props.href} className={classes}><Contents text={text} children={children} /></a>;
  }

  return <button {...rest as ButtonHTMLAttributes<HTMLButtonElement>} type={(props as ButtonHTMLAttributes<HTMLButtonElement>).type || 'button'} className={classes}><Contents text={text} children={children} /></button>;
}
