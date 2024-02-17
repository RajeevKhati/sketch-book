import { MENU_ITEMS } from "@/shared/constants";
import { socket } from "@/shared/socket";
import { actionMenuItemClick } from "@/slice/menuSlice";
import React, { useEffect, useLayoutEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

export const Board = () => {
  const canvasRef = useRef();
  const contextRef = useRef();
  const isDrawingRef = useRef(false);
  const drawingHistoryRef = useRef([]);
  const historyPointerRef = useRef(-1);
  const { activeMenuItem, actionMenuItem } = useSelector((state) => state.menu);
  const { size, color } = useSelector((state) => state.toolbox[activeMenuItem]);
  const dispatch = useDispatch();

  const setContext = (size, color) => {
    contextRef.current.lineWidth = size;
    contextRef.current.strokeStyle = color;
  };

  const beginPath = (x, y) => {
    contextRef.current.beginPath();
    contextRef.current.moveTo(x, y);
    isDrawingRef.current = true;
  };

  const startDrawing = ({ nativeEvent }) => {
    const { offsetX, offsetY } = nativeEvent;
    beginPath(offsetX, offsetY);
    socket.emit("beginPath", { x: offsetX, y: offsetY });
  };

  const drawOnCanvas = (x, y) => {
    contextRef.current.lineTo(x, y);
    contextRef.current.stroke();
  };

  const draw = ({ nativeEvent }) => {
    if (!isDrawingRef.current) {
      return;
    }
    const { offsetX, offsetY } = nativeEvent;
    drawOnCanvas(offsetX, offsetY);
    socket.emit("draw", { x: offsetX, y: offsetY });
  };

  const finishDrawing = () => {
    contextRef.current.closePath();
    isDrawingRef.current = false;
    const drawnData = contextRef.current.getImageData(
      0,
      0,
      canvasRef.current.width,
      canvasRef.current.height
    );
    drawingHistoryRef.current.push(drawnData);
    historyPointerRef.current = drawingHistoryRef.current.length - 1;
  };

  useLayoutEffect(() => {
    const canvas = canvasRef.current;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }, []);

  useEffect(() => {
    socket.on("beginPath", (coordinates) => {
      beginPath(coordinates.x, coordinates.y);
    });

    socket.on("draw", (coordinates) => {
      drawOnCanvas(coordinates.x, coordinates.y);
    });

    socket.on("changeConfig", (config) => {
      setContext(config.size, config.color);
    });

    return () => {
      socket.off("beginPath");
      socket.off("draw");
      socket.off("changeConfig");
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const context = canvasRef.current.getContext("2d");
    contextRef.current = context;
    setContext(size, color);
  }, [color, size]);

  useEffect(() => {
    if (actionMenuItem === MENU_ITEMS.DOWNLOAD) {
      const URL = canvasRef.current.toDataURL();
      const anchor = document.createElement("a");
      anchor.href = URL;
      anchor.download = "sketch.jpg";
      anchor.click();
    } else if (actionMenuItem === MENU_ITEMS.UNDO) {
      if (historyPointerRef.current > 0) {
        historyPointerRef.current = historyPointerRef.current - 1;
        const previouslyDrawnData =
          drawingHistoryRef.current[historyPointerRef.current];
        contextRef.current.putImageData(previouslyDrawnData, 0, 0);
      }
    } else if (actionMenuItem === MENU_ITEMS.REDO) {
      if (historyPointerRef.current < drawingHistoryRef.current.length - 1) {
        historyPointerRef.current = historyPointerRef.current + 1;
        const previouslyDrawnData =
          drawingHistoryRef.current[historyPointerRef.current];
        contextRef.current.putImageData(previouslyDrawnData, 0, 0);
      }
    }
    dispatch(actionMenuItemClick(null));
  }, [actionMenuItem, dispatch]);

  return (
    <canvas
      onMouseDown={startDrawing}
      onMouseMove={draw}
      onMouseUp={finishDrawing}
      ref={canvasRef}
    />
  );
};
