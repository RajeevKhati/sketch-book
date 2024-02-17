import { MENU_ITEMS } from "@/shared/constants";
import { actionMenuItemClick } from "@/slice/menuSlice";
import React, { useEffect, useLayoutEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

export const Board = () => {
  const canvasRef = useRef();
  const contextRef = useRef();
  const isDrawingRef = useRef(false);
  const { activeMenuItem, actionMenuItem } = useSelector((state) => state.menu);
  const { size, color } = useSelector((state) => state.toolbox[activeMenuItem]);
  const dispatch = useDispatch();

  useLayoutEffect(() => {
    const canvas = canvasRef.current;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }, []);

  useEffect(() => {
    const context = canvasRef.current.getContext("2d");
    context.lineWidth = size;
    context.strokeStyle = color;
    contextRef.current = context;
  }, [color, size]);

  useEffect(() => {
    if (actionMenuItem === MENU_ITEMS.DOWNLOAD) {
      const URL = canvasRef.current.toDataURL();
      const anchor = document.createElement("a");
      anchor.href = URL;
      anchor.download = "sketch.jpg";
      anchor.click();
    }
    dispatch(actionMenuItemClick(null));
  }, [actionMenuItem, dispatch]);

  const startDrawing = ({ nativeEvent }) => {
    const { offsetX, offsetY } = nativeEvent;
    contextRef.current.beginPath();
    contextRef.current.moveTo(offsetX, offsetY);
    isDrawingRef.current = true;
  };

  const draw = ({ nativeEvent }) => {
    if (!isDrawingRef.current) {
      return;
    }
    const { offsetX, offsetY } = nativeEvent;
    contextRef.current.lineTo(offsetX, offsetY);
    contextRef.current.stroke();
  };

  const finishDrawing = () => {
    contextRef.current.closePath();
    isDrawingRef.current = false;
  };
  return (
    <canvas
      onMouseDown={startDrawing}
      onMouseMove={draw}
      onMouseUp={finishDrawing}
      ref={canvasRef}
    />
  );
};
