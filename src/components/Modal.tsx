import { useEffect, HTMLAttributes, MouseEventHandler } from "react";
import ReactDOM from "react-dom";
import style from './Modal.module.scss'

function Modal({ onClose, children, actionBar }:
  HTMLAttributes<HTMLDivElement> &
  {
    onClose: MouseEventHandler<HTMLDivElement>;
    actionBar: JSX.Element
  }
) {

  let container: HTMLDivElement|null = null;
  if (typeof window !== 'undefined') {
    console.log("find container");
    let rootContainer: HTMLDivElement|null = null;
    rootContainer = document.querySelector('.modal-container');
    if (rootContainer === null) {
      const parentElem = document.querySelector('#__next') as HTMLDivElement;
      rootContainer = document.createElement('div');
      rootContainer.classList.add("modal-container")
      parentElem.appendChild(rootContainer);
    }
    container = rootContainer;
    console.log("found container", container);
  }

  useEffect(() => {
    document.body.classList.add('overflow-hidden');
    return () => {
      document.body.classList.remove('overflow-hidden');
    };
  }, []);

  return container ? ReactDOM.createPortal(
    <div>
      <div
        onClick={onClose}
        className={style.modalButton}
      ></div>
      <div className={style.modal}>
        <div className={style.modal_inner}>
          {children}
          <div className={style.actionBar}>
            {actionBar}
          </div>
        </div>
      </div>
    </div>,
    container
  ) : null;
}

export default Modal;