import * as React from "react";
const TrashIcon = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={30}
    height={30}
    viewBox="0 0 50 50"
    {...props}
  >
    <path d="M42 5H32V3c0-1.652-1.348-3-3-3h-8c-1.652 0-3 1.348-3 3v2H8c-.55 0-1 .45-1 1s.45 1 1 1h1.086l3.61 40.516C12.82 48.906 14.003 50 15.39 50h19.214c1.387 0 2.57-1.094 2.696-2.484L40.914 7H42a1 1 0 1 0 0-2ZM20 44a1 1 0 1 1-2 0V11c0-.55.45-1 1-1s1 .45 1 1Zm0-41c0-.55.45-1 1-1h8c.55 0 1 .45 1 1v2H20Zm6 41a1 1 0 1 1-2 0V11c0-.55.45-1 1-1s1 .45 1 1Zm6 0c0 .555-.445 1-1 1-.555 0-1-.445-1-1V11a1 1 0 1 1 2 0Z" />
  </svg>
);
export default TrashIcon;
