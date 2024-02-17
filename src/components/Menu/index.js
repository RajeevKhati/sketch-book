import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPencil,
  faEraser,
  faRotateLeft,
  faRotateRight,
  faFileArrowDown,
} from "@fortawesome/free-solid-svg-icons";
import styles from "./index.module.css";
import { MENU_ITEMS } from "@/shared/constants";
import { useDispatch, useSelector } from "react-redux";
import { menuItemClick, actionMenuItemClick } from "@/slice/menuSlice";
import cx from "classnames";

export const Menu = () => {
  const dispatch = useDispatch();
  const activeMenuItem = useSelector((state) => state.menu.activeMenuItem);
  const handleMenuItemClick = (menuItem) => {
    dispatch(menuItemClick(menuItem));
  };

  const handleActionMenuItemClick = (actionMenuItem) => {
    dispatch(actionMenuItemClick(actionMenuItem));
  };

  return (
    <div className={styles.menuContainer}>
      <button
        className={cx(styles.iconWrapper, {
          [styles.active]: activeMenuItem === MENU_ITEMS.PENCIL,
        })}
        onClick={() => handleMenuItemClick(MENU_ITEMS.PENCIL)}
        tabIndex={0}
      >
        <FontAwesomeIcon icon={faPencil} className={styles.icon} />
      </button>
      <button
        className={cx(styles.iconWrapper, {
          [styles.active]: activeMenuItem === MENU_ITEMS.ERASER,
        })}
        onClick={() => handleMenuItemClick(MENU_ITEMS.ERASER)}
        tabIndex={0}
      >
        <FontAwesomeIcon icon={faEraser} className={styles.icon} />
      </button>
      <button
        className={styles.iconWrapper}
        onClick={() => {
          handleActionMenuItemClick(MENU_ITEMS.UNDO);
        }}
        tabIndex={0}
      >
        <FontAwesomeIcon icon={faRotateLeft} className={styles.icon} />
      </button>
      <button
        className={styles.iconWrapper}
        onClick={() => {
          handleActionMenuItemClick(MENU_ITEMS.REDO);
        }}
        tabIndex={0}
      >
        <FontAwesomeIcon icon={faRotateRight} className={styles.icon} />
      </button>
      <button
        className={styles.iconWrapper}
        onClick={() => {
          handleActionMenuItemClick(MENU_ITEMS.DOWNLOAD);
        }}
        tabIndex={0}
      >
        <FontAwesomeIcon icon={faFileArrowDown} className={styles.icon} />
      </button>
    </div>
  );
};
