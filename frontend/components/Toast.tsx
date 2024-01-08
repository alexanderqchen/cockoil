import { ReactNode } from "react";

const Toast = ({
  children,
  visible,
}: {
  children: ReactNode;
  visible: boolean;
}) => {
  return (
    <div
      className={`absolute -bottom-14 left-0 right-0 flex justify-around  ${
        visible && "-translate-y-20"
      }  transition ease-in-out duration-200`}
    >
      <div className="px-4 py-4 bg-black flex items-center gap-2 rounded-md text-base">
        {children}
      </div>
    </div>
  );
};

export default Toast;
