import React, { useState, MouseEvent, useEffect } from 'react';
import Button from './Button';
import style from './header.module.scss';
import Link from 'next/link';
import Image from 'next/image';
import Modal from './Modal';
import useUsersContext from '../hooks/use-users-context';
import { useCommentFeedSubscription } from '../../generated/graphql-comments';
import { ROUTES } from '../constants/routes';

type User = {
  name: string;
};

interface HeaderProps {
  user?: User;
  onLogin: () => void;
  onLogout: () => void;
  onCreateAccount: () => void;
}

export const Header = ({ user, onLogin, onLogout, onCreateAccount }: HeaderProps) => {
  const [showModal, setShowModal] = useState(false);
  const [showNotifications, setShowNotifications] = useState(true);
  const { info, success, error, handleShowNotificationsClick, notifications } = useUsersContext();
  const { loading, data, error: onFeedError } = useCommentFeedSubscription({
    variables: {
    },
  });
  const message = "This is a message!"
  useEffect(() => {
    if (loading) { }
    else if (onFeedError) {
      console.log(`OnFeedError: ${JSON.stringify(onFeedError)}`);
    } else {
      if (data && data.newComment) {
        const { message, publishedAt, article } = data.newComment;
        info(
          `New comment at ${new Date(publishedAt).toLocaleString()} - ${message}`,
          true,
          {
            route: `${ROUTES.BLOGARTICLE_ROUTE}/${article.slug}`,
            label: `Click here to view article \"${article.slug}\"`
          });
      }
    }
  }, [loading, onFeedError, data, info]);

  const notificationBadge = () => {
    const unreadNotificationsBadge = notifications.length > 0
      ? (<span className={style.badge}><i><u>{notifications.length}</u></i></span>)
      : <span className={style.badge}>&nbsp;</span>;
    return (<>
      <Button type="button" onClick={
        () => {
          setShowNotifications(!showNotifications);
          handleShowNotificationsClick(!showNotifications);
        }
      } primary outline>Notifications{unreadNotificationsBadge}</Button>
    </>
    );
  };

  const handleClick = () => {
    console.log(showModal);
    setShowModal(true);
  };

  const handleClose = (event: MouseEvent<HTMLElement>) => {
    console.log(showModal);
    setShowModal(false);
  };

  const actionBar = (
    <div>
      <Button onClick={handleClose} primary outline>I Accept</Button>
    </div>
  );

  const modal = (
    <Modal onClose={handleClose} actionBar={actionBar}>
      <p>Here is an important agreement for you to accept</p>
    </Modal>
  );


  return (
    <header>
      <div className={style.wrapper}>
        <div>
          <Link href="/">
            <Image alt="coastal 32x32" src="/coastal-32x32.png" width={32} height={32} />
          </Link>
          <h1>Hello</h1>
        </div>
        <div>
          {user ? (
            <>
              <span className={style.welcome}>
                Welcome, <b>{user.name}</b>!
              </span>
              <Button secondary onClick={onLogout}>Log out</Button>
            </>
          ) : (
            <>
              <Button type="button" key={1} secondary onClick={onLogin}>Log in</Button>
              <Button type="button" key={2} onClick={onCreateAccount}>Sign up</Button>
            </>
          )}
          <Button type="button" success onClick={() => success(message, true)}>Success</Button>
          <Button type="button" danger onClick={() => error(message, false)}>Error</Button>
          {notificationBadge()}
          <>
            <Button type="button" primary rounded onClick={handleClick}>
              ?
            </Button>
          </>
        </div>
      </div>
      {showModal && modal}
    </header>);
};
