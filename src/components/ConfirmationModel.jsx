import React from 'react';

const ConfirmationModal = ({ confirmDelete, cancelDelete }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-75">
      <div className="bg-white p-4 rounded shadow-lg">
        <p>Are you sure you want to delete this favorite?</p>
        <div className="flex justify-end mt-4">
          <button
            onClick={cancelDelete}
            className="mr-2 p-2 bg-green-500 text-white rounded"
          >
            Cancel
          </button>
          <button
            onClick={confirmDelete}
            className="p-2 bg-red-500 text-white rounded"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
