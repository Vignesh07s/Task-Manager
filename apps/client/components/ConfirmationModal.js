"use client";
import React from "react";

export default function ConfirmationModal({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmColor = "red", // can pass "green" for mark completed
}) {
  if (!isOpen) return null;

  // Set confirm button color
  const confirmClasses =
    confirmColor === "green"
      ? "bg-green-600 hover:bg-green-700"
      : "bg-red-600 hover:bg-red-700";

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 px-4">
      <div className="bg-white w-full max-w-sm rounded-2xl shadow-xl">
        {/* Header */}
        <div className="px-6 py-4">
          <h2 className="text-lg font-bold text-gray-900">{title}</h2>
          <div className="border-b border-gray-300 mt-2"></div>
        </div>

        {/* Message */}
        <div className="py-3 text-center">
          <p className="text-gray-700">{message}</p>
        </div>

        {/* Buttons */}
        <div className="px-6 py-4 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-100 transition"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              onConfirm();
              onClose();
            }}
            className={`px-4 py-2 text-white rounded-md text-sm font-medium transition ${confirmClasses}`}
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
}
