import React, { useState, useEffect, useCallback } from "react";

// Hook for handling modal open/close logic

export default function useModal(initialShow) {
  const [show, setShow] = useState(initialShow);

  const open = useCallback(() => setShow(true), []);
  const close = useCallback(() => setShow(false), []);

  return {
    show,
    open,
    close,
  };
}
