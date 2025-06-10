import { Check } from "lucide-react";

const ConfirmationDialog = ({ isOpen, onClose, onConfirm, title, message }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-[#00922F]/10 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-[#00922F]/10 rounded-lg p-4 w-full max-w-md">
        <h3 className="text-white font-medium text-lg mb-2">{title}</h3>
        <p className="text-gray-300 mb-6">{message}</p>

        <div className="flex justify-between">
          <button
            onClick={onClose}
            className="bg-transparent text-white px-4 py-2 rounded-md hover:bg-gray-800"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="bg-[#00922F] text-white px-4 py-2 rounded-md flex items-center"
          >
            Confirm <Check className="w-4 h-4 ml-2" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationDialog;
