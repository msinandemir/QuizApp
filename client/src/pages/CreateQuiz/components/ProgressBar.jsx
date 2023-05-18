import React, { useEffect, useState } from "react";

function ProgressBar({ page }) {
  const [filled, setFilled] = useState(33);

  useEffect(() => {
    if (page <= 3) setFilled((page * 33.3).toFixed(0));
  }, [page]);

  return (
    <div className='w-full h-2 rounded-md bg-gray-300 absolute left-0 -top-5 overflow-hidden'>
      <div
        className='h-full bg-[#2e2e2e] transition-all'
        style={{ width: `${filled}%` }}
      ></div>
    </div>
  );
}

export default ProgressBar;
