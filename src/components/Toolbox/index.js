import React from "react";
import styles from "./index.module.css";
import { COLORS, MENU_ITEMS } from "@/shared/constants";
import { useDispatch, useSelector } from "react-redux";
import { changeBrushSize, changeColor } from "@/slice/toolboxSlice";
import cx from "classnames";
import { socket } from "@/shared/socket";

export const ToolBox = () => {
  const activeMenuItem = useSelector((state) => state.menu.activeMenuItem);
  const { color, size } = useSelector((state) => state.toolbox[activeMenuItem]);
  const dispatch = useDispatch();

  const showColorOption = activeMenuItem === MENU_ITEMS.PENCIL;

  const updateColor = (color) => {
    dispatch(changeColor({ menuItem: activeMenuItem, color }));
    socket.emit("changeConfig", { color, size });
  };

  const updateBrushSize = (e) => {
    dispatch(
      changeBrushSize({ menuItem: activeMenuItem, size: e.target.value })
    );
    socket.emit("changeConfig", { color, size: e.target.value });
  };

  return (
    <div className={styles.toolboxContainer}>
      {showColorOption ? (
        <div className={styles.toolItem}>
          <h4 className={styles.toolText}>Stroke color</h4>
          <div className={styles.itemContainer}>
            <button
              className={cx(styles.colorBox, {
                [styles.active]: color === COLORS.BLACK,
              })}
              style={{ backgroundColor: COLORS.BLACK }}
              onClick={() => updateColor(COLORS.BLACK)}
              tabIndex={0}
            />
            <button
              className={cx(styles.colorBox, {
                [styles.active]: color === COLORS.RED,
              })}
              style={{ backgroundColor: COLORS.RED }}
              onClick={() => updateColor(COLORS.RED)}
              tabIndex={0}
            />
            <button
              className={cx(styles.colorBox, {
                [styles.active]: color === COLORS.GREEN,
              })}
              style={{ backgroundColor: COLORS.GREEN }}
              onClick={() => updateColor(COLORS.GREEN)}
              tabIndex={0}
            />
            <button
              className={cx(styles.colorBox, {
                [styles.active]: color === COLORS.BLUE,
              })}
              style={{ backgroundColor: COLORS.BLUE }}
              onClick={() => updateColor(COLORS.BLUE)}
              tabIndex={0}
            />
            <button
              className={cx(styles.colorBox, {
                [styles.active]: color === COLORS.ORANGE,
              })}
              style={{ backgroundColor: COLORS.ORANGE }}
              onClick={() => updateColor(COLORS.ORANGE)}
              tabIndex={0}
            />
            <button
              className={cx(styles.colorBox, {
                [styles.active]: color === COLORS.YELLOW,
              })}
              style={{ backgroundColor: COLORS.YELLOW }}
              onClick={() => updateColor(COLORS.YELLOW)}
              tabIndex={0}
            />
          </div>
        </div>
      ) : null}
      <div className={styles.toolItem}>
        <h4 className={styles.toolText}>Brush size</h4>
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
