const Modal = ({
  visible,
  title,
  body,
  onOk,
  onCancel,
  okText,
  cancelText,
}: {
  visible: boolean;
  title: React.ReactNode;
  body: React.ReactNode;
  onOk: (() => Promise<void>) | (() => void);
  onCancel: () => void;
  okText: string;
  cancelText: string;
}) => {
  if (!visible) {
    return null;
  }

  return (
    <>
      <div className="w-screen h-screen bg-black fixed top-0 right-0 left-0 bottom-0 opacity-60 z-20" />
      <div className="w-screen h-screen fixed top-0 right-0 left-0 bottom-0 z-30 flex items-center justify-center">
        <div className="bg-white w-96 h-auto rounded-xl p-8">
          <div className="text-2xl mb-4">{title}</div>
          <div className="text-base mb-4">{body}</div>
          <div className="flex justify-end gap-4 text-lg">
            <button
              className="text-gray-600 hover:text-gray-400"
              onClick={onCancel}
            >
              {cancelText}
            </button>
            <button
              className="text-blue-600 hover:text-blue-400"
              onClick={async () => {
                await onOk();
                onCancel();
              }}
            >
              {okText}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;
