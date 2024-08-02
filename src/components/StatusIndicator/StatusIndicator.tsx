import { memo } from "react";

interface StatusIndicator {
  online: boolean;
}

export const StatusIndicator = memo(({ online }: StatusIndicator) => {
  return (
    <div
      style={{
        position: "fixed",
        top: "1rem",
        display: "flex",
        alignItems: "center",
      }}
    >
      <div
        style={{
          background: online ? "green" : "red",
          borderRadius: "100%",
          height: "1rem",
          width: "1rem",
          marginRight: "0.5rem",
        }}
      />
      {online ? "Online" : "Offline"}
    </div>
  );
});
