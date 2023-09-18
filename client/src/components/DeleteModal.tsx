type Props = {
  cancelOperation: () => void;
  acceptOperation: () => void;
};

const DeleteModal = ({ cancelOperation, acceptOperation }: Props) => {
  return (
    <>
      <div className="absolute top-0 left-0 right-0 bottom-0 bg-black bg-opacity-50 flex justify-center items-center">
        <div className="flex flex-col p-4 rounded-md shadow-[0_0_10px_#8e24aa]">
          <p className="text-center">
            Are you sure you want to delete this reflection?
          </p>
          <p className=" text-xs italic text-center text-gray-400">
            This can't be undone and it will be removed from the timeline
          </p>
          <div className="flex justify-center gap-2 mt-3">
            <button
              className="bg-purple-800 border border-purple-400 rounded-md px-2 py-1 hover:opacity-80 transition-opacity"
              onClick={() => cancelOperation()}
            >
              Cancel
            </button>
            <button
              className="bg-purple-800 border border-purple-400 rounded-md px-2 py-1 hover:opacity-80 transition-opacity"
              onClick={() => acceptOperation()}
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default DeleteModal;
