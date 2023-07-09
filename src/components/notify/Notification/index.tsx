import React, { HTMLAttributes, useEffect } from "react";
import cn from "classnames";
import styles from "./Notification.module.scss";
import { GoX } from 'react-icons/go';
import Button from "../../Button";
import { ROUTES } from "../../../constants/routes";
import Link from "next/link";

export const Color = {
  info: "info",
  success: "success",
  warning: "warning",
  error: "error",
};

export interface NotifiyLink {
  label: string;
  route: string;
}
export interface NotifyItem {
  id: string;
  color: string;
  autoClose: boolean;
  message: string;
  link?: NotifiyLink;
}

interface NotificationProps extends Pick<NotifyItem, "color" | "autoClose" | "message" | "link"> {
  onDelete: () => void;
}

const timeToDelete = 300;
const timeToClose = 10000;

export default function Notification(
  { className, color = Color.info, message, link, onDelete, autoClose = false, }: NotificationProps & HTMLAttributes<HTMLDivElement>
) {
  const [isClosing, setIsClosing] = React.useState(false);

  useEffect(() => {
    if (isClosing) {
      const timeoutId = setTimeout(onDelete, timeToDelete);

      return () => {
        clearTimeout(timeoutId);
      };
    }
  }, [isClosing, onDelete]);

  React.useEffect(() => {
    if (autoClose) {
      const timeoutId = setTimeout(() => setIsClosing(true), timeToClose);

      return () => {
        clearTimeout(timeoutId);
      };
    }
  }, [autoClose]);

  return (<div className={cn([
    styles.container,
    { [styles.shrink]: isClosing }
  ])}>
    <div className={cn([
      styles.notification,
      className,
      styles[color],
      { [styles.slideIn]: !isClosing },
      { [styles.slideOut]: isClosing },
    ])}>
      {message}
      {link && (<div className="uk-flex uk-flew-row">
        <div className="uk-width-expand">
          <Link href={`${link.route}`}>{link.label}</Link>
        </div>
      </div>)}
      <Button onClick={() => setIsClosing(true)} className={styles.closeButton}>
        <GoX className={styles.closeButton_close} />
      </Button>
    </div>
  </div>);
}
