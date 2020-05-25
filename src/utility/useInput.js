import React, { useState, useCallback } from "react";

// Hook for handling form input state

export default function useInput(initialValue) {
  const [value, setValue] = useState(initialValue);

  const onChange = useCallback((e) => setValue(e.target.value), [value]);

  return {
    value,
    onChange,
  };
}
