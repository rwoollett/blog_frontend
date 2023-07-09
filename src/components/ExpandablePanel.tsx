import { HTMLAttributes, useState } from "react";
import { GoChevronDown, GoChevronLeft } from 'react-icons/go';
import style from './ExpandablePanel.module.scss';

interface ExpandablePanelProps {
  header: JSX.Element;
}

function ExpandablePanel({ header, children }: ExpandablePanelProps & HTMLAttributes<HTMLElement>) {
  const [expanded, setExpanded] = useState(false);

  const handleClick = () => {
    setExpanded(!expanded);
  }

  const icon = <>
    {expanded ? <GoChevronDown /> : <GoChevronLeft />}
  </>

  return (
    <div className={style.expandable}>
      <div className={style.expandable__bar}>
        <div className={style.expandable__header}>
          {header}
        </div>
        <div className={style.expandable__chevron} onClick={handleClick}>
          {icon}
        </div>
      </div>
      {
        expanded && <div className={style.expandable__expand}>
          {children}
        </div>
      }

    </div>
  );
};

export default ExpandablePanel;