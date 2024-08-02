import { memo, useRef } from "react";

import styles from "./ListItem.module.css";

interface ListItemProps {
  symbol: string;
  price: string;
}

export const ListItem = memo(({ symbol, price }: ListItemProps) => {
  const itemRef = useRef<HTMLLIElement>(null);
  const $item = itemRef.current;

  if ($item) {
    $item.style.borderColor = "cyan";
    setTimeout(() => {
      $item.style.borderColor = "transparent";
    }, 300);
  }

  return (
    <li ref={itemRef} className={styles.item}>
      {symbol.replace("-USD", "")} {price}
    </li>
  );
});
