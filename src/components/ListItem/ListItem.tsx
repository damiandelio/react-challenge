import { memo, useRef } from "react";

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
    <li
      ref={itemRef}
      style={{
        height: "4rem",
        border: "2px solid transparent",
        padding: "0 1rem",
        alignContent: "center",
        borderRadius: "4px",
        background: "#2e605c",
      }}
    >
      {symbol.replace("-USD", "")} {price}
    </li>
  );
});
