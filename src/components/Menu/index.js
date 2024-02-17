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
import { useDispatch } from "react-redux";
import { menuItemClick } from "@/slice/menuSlice";

export const Menu = () => {
  const dispatch = useDispatch();
  const handleMenuItemClick = (menuItem) => {
    dispatch(menuItemClick(menuItem));
  };
  return (
    <div className={styles.menuContainer}>
      <button
        className={styles.iconWrapper}
        onClick={() => handleMenuItemClick(MENU_ITEMS.PENCIL)}
        tabIndex={0}
      >
        <FontAwesomeIcon icon={faPencil} className={styles.icon} />
      </button>
      <button
        className={styles.iconWrapper}
        onClick={() => handleMenuItemClick(MENU_ITEMS.ERASER)}
        tabIndex={0}
      >
        <FontAwesomeIcon icon={faEraser} className={styles.icon} />
      </button>
      <button
        className={styles.iconWrapper}
        onClick={() => handleMenuItemClick(MENU_ITEMS.UNDO)}
        tabIndex={0}
      >
        <FontAwesomeIcon icon={faRotateLeft} className={styles.icon} />
      </button>
      <button
        className={styles.iconWrapper}
        onClick={() => handleMenuItemClick(MENU_ITEMS.REDO)}
        tabIndex={0}
      >
        <FontAwesomeIcon icon={faRotateRight} className={styles.icon} />
      </button>
      <button
        className={styles.iconWrapper}
        onClick={() => handleMenuItemClick(MENU_ITEMS.DOWNLOAD)}
        tabIndex={0}
      >
        <FontAwesomeIcon icon={faFileArrowDown} className={styles.icon} />
      </button>
    </div>
  );
};
