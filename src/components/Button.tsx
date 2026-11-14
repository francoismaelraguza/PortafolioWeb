import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react';
import s from './Button.module.css';

type Common = { children: ReactNode; block?: boolean };

type LinkProps = Common & AnchorHTMLAttributes<HTMLAnchorElement> & { href: string };
type ButtonProps = Common & ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined };

/** La única forma de botón de la página: relleno plano de acento, esquinas rectas. */
export function Button(props: LinkProps | ButtonProps) {
  const className = [s.button, props.block ? s.block : '', props.className ?? '']
    .filter(Boolean)
    .join(' ');

  if (props.href !== undefined) {
    const { block: _block, children, ...rest } = props;
    return (
      <a {...rest} className={className}>
        {children}
      </a>
    );
  }

  const { block: _block, children, ...rest } = props;
  return (
    <button type="button" {...rest} className={className}>
      {children}
    </button>
  );
}
