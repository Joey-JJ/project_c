import React, { FC, useState } from "react";
import { BsBell, BsBellSlash } from "react-icons/bs";

const Notification: FC = () => {
  const [marked, setMarked] = useState(false);

  return (
    <button
      className="relative border-2 p-1"
      onClick={() => setMarked(!marked)}
    >
      {marked ? <BsBell size={30} /> : <BsBellSlash size={30} />}
    </button>
  );
};

export default React.memo(Notification);
