import React, { useCallback, useEffect, useState } from 'react';
import style from './ButtonCount.module.scss';
import classnames from 'classnames';

interface ButtonProps {
  /**
   * Is this the principal call to action on the page?
   */
  primary?: boolean;
  /**
   * What background color to use
   */
  backgroundColor?: string;
  /**
   * How large should the button be?
   */
  size?: 'small' | 'medium' | 'large';
  /**
   * Button contents
   */
  label: string;
  /**
   * Optional click handler
   */
  onClick?: () => void;
}

/**
 * Primary UI component for user interaction
 */
export const Button = ({
  primary = false,
  size = 'medium',
  backgroundColor,
  label,
  ...props
}: ButtonProps) => {
  const [count, setCount] = useState<number | null>();
  const mode = primary ? style['storybook-button--primary'] : style['storybook-button--secondary'];
  const buttonClassName = classnames(
    style['storybook-button'],
    style[`storybook-button--${size}`],
    mode,
  );

  useEffect(() => {
    if (typeof window !== 'undefined' && sessionStorage.getItem(`state`)) {
      setCount(parseInt(sessionStorage.getItem(`state`) as string) + 1);
    }
  }, []);

  useEffect(() => {
    if (count) {
      sessionStorage.setItem(`state`, count.toString());
    }
  }, [count]);

  return (
    <button onClick={() => setCount((prev) => prev ? prev + 1 : 1)}
      type="button"
      className={buttonClassName}
      {...props}
    >
      {label}
      <style jsx>{`
        button {
          background-color: ${backgroundColor};
        }
      `}</style>
    </button>
  );
};
