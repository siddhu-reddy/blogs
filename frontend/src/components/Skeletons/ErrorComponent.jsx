const ErrorComponent = ({ message = "Something went wrong.", onRetry }) => {
  return (
    <tr>
      <td colSpan="7" className="p-6 text-center text-red-600 font-semibold">
        {message}
        {onRetry && (
          <div className="mt-2">
            <button
              onClick={onRetry}
              className="px-4 py-2 bg-[#00922f] text-white rounded-lg mt-2"
            >
              Retry
            </button>
          </div>
        )}
      </td>
    </tr>
  );
};

export default ErrorComponent;
