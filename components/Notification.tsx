import React, { FC, useState } from "react";
import { BsBell, BsBellSlash } from "react-icons/bs";

const Notification: FC = () => {
  const [marked, setMarked] = useState(false);

  return (
    <div className="max-w-[15rem] flex flex-col justify-center items-center gap-2 stats shadow py-2">
      <div className="max-w-max" onClick={() => setMarked(!marked)}>
        {marked ? <BsBell size={50} /> : <BsBellSlash size={50} />}
      </div>
      <p className="text-xs text-center">
        Click the bell to be notified when a charging spot becomes available
      </p>
    </div>
  );
};

export default React.memo(Notification);
