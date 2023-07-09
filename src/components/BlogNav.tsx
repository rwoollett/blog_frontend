import React, { HTMLAttributes } from "react";
import Link from "next/link";
import classNames from "classnames";

/**
* Option with a label and value. Each navigation item is an Option.
*/
export type Option = {
  label: string;
  value: string;
}

interface BlogNavProps {
  /**
  * Is this the selected active item in navigation bar
  */
  value: Option | null;
  /**
  * Required selected item handler from parent
  */
  onChange?: (newOption: Option) => void;
  /**
  * Required list of Options
  */
  options: Option[];
}

/**
 * Primary UI component for Blog Navigation
 */
const BlogNav = ({ value, onChange, options, ...rest }:
  Omit<HTMLAttributes<HTMLElement>, 'onChange'> & BlogNavProps) => {

  const handleOptionClick = (option: Option) => {
    onChange && onChange(option);
  }
  const content = options.map((option, i) => {
    const itemClassnames = classNames({
      "uk-active": value?.label === option.label
    });
    return (<li key={option.label} className={itemClassnames}>
      <Link onClick={() => handleOptionClick(option)} href={option.value}>
        {option.label}
      </Link>
    </li>
    );
  });

  return (
    <nav {...rest} className="uk-navbar-container">
      <div className="uk-container">
        <div className="uk-navbar">
          <div className="uk-navbar-left">
            <ul className="uk-navbar-nav">
              <li>
                <Link href="/blog">Strapi Blog</Link>
              </li>
            </ul>
          </div>
          <div className="uk-navbar-right">
            <ul className="uk-navbar-nav">
              {content}
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export { BlogNav };