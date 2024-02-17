import React from "react";
import styles from "./index.module.css";
import { COLORS, MENU_ITEMS } from "@/shared/constants";
import { useSelector } from "react-redux";

export const ToolBox = () => {
  const selectedMenuItem = useSelector((state) => state.menu.activeMenuItem);

  const showColorOption = selectedMenuItem === MENU_ITEMS.PENCIL;

  const updateBrushSize = (e) => {
    //
  };

  return (
    <div className={styles.toolboxContainer}>
      {showColorOption ? (
        <div className={styles.toolItem}>
          <h4 className={styles.toolText}>Stroke color</h4>
          <div className={styles.itemContainer}>
            <div
              className={styles.colorBox}
              style={{ backgroundColor: COLORS.BLACK }}
            />
            <div
              className={styles.colorBox}
              style={{ backgroundColor: COLORS.RED }}
            />
            <div
              className={styles.colorBox}
              style={{ backgroundColor: COLORS.GREEN }}
            />
            <div
              className={styles.colorBox}
              style={{ backgroundColor: COLORS.BLUE }}
            />
            <div
              className={styles.colorBox}
              style={{ backgroundColor: COLORS.ORANGE }}
            />
            <div
              className={styles.colorBox}
              style={{ backgroundColor: COLORS.YELLOW }}
            />
          </div>
        </div>
      ) : null}
      <div className={styles.toolItem}>
        <h4 className={styles.toolText}>Brush size {selectedMenuItem}</h4>
        <div className={styles.itemContainer}>
          <input
            type="range"
            min={1}
            max={10}
            step={1}
            onChange={updateBrushSize}
          />
        </div>
      </div>
    </div>
  );
};
