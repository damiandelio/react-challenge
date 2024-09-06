import { memo } from "react";

export const Loader = memo(() => {
  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div>Connecting...</div>
    </div>
  );
});
