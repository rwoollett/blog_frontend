import React, { HTMLAttributes } from "react";
import ReactDOM from "react-dom";
import styles from "./NotificationList.module.scss";
import createContainer from "./createContainer";
import Notification, { NotifyItem } from "./Notification";
import Skeleton from "../Skeleton";

interface NotificationListProps {
  notifications: NotifyItem[];
  onDelete: (id: string) => void;
}

const container = createContainer();

export default function NotificationList(
  { onDelete, notifications }: NotificationListProps & HTMLAttributes<HTMLDivElement>
) {

  return container ? ReactDOM.createPortal(
    <>
      {notifications.map(({ id, ...props }: NotifyItem, index) => {
        if (index < 5) {
          return (<Notification
            key={id}
            onDelete={() => onDelete(id)}
            {...props} >{`key: ${id} ${index}`}
          </Notification>);
        } else if (index == notifications.length - 1) {
          return <Skeleton key={id} className={styles.loading} times={index - 4} />
        } else {
          return null;
        }
      })}
    </>,
    container
  ) : null;
}
