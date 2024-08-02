import { memo } from "react";

interface StatusIndicator {
  online: boolean;
}

export const StatusIndicator = memo(({ online }: StatusIndicator) => {
  return (
    <div
      style={{
        position: "fixed",
        padding: "1rem 1rem 1rem 0",
        display: "flex",
        alignItems: "center",
        borderRadius: "0 25px 25px 0",
        background: "rgba(29, 59, 57, 0.85)",
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
