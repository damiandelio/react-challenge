import { memo } from "react";

import styles from "./StatusIndicator.module.css";

interface StatusIndicator {
  online: boolean;
}

export const StatusIndicator = memo(({ online }: StatusIndicator) => {
  return (
    <div className={styles.statusIndicator}>
      <div
        className={styles.bullet}
        style={{
          background: online ? "green" : "red",
        }}
      />
      {online ? "Online" : "Offline"}
    </div>
  );
});
