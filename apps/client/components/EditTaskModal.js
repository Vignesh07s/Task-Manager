"use client";
import { useState, useEffect } from "react";

export default function EditTaskModal({ isOpen, onClose, task, onTaskUpdated }) {
  const [data, setData] = useState({ title: "", description: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (task) {
      setData({
        title: task.title || "",
        description: task.description || "",
      });
    }
  }, [task]);

  if (!isOpen) return null;

  const handleUpdate = async (e) => {
    e.preventDefault();
    setError("");

    if (!data.title.trim()) {
      setError("Title is required.");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/tasks/${task._id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: data.title.trim(),
          description: data.description.trim(),
        }),
        credentials: "include",
      });

      if (!res.ok) {
        throw new Error("Failed to update task");
      }

      onTaskUpdated();
      onClose();
    } catch (err) {
      console.error(err);
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 px-4">
      <div className="bg-white w-full max-w-md rounded-lg shadow-xl relative">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-black text-lg font-semibold"
        >
          ×
        </button>

        {/* Header */}
        <div className="px-6 py-4 border-b">
          <h2 className="text-lg font-semibold text-gray-800">
            Edit Task
          </h2>
        </div>

        {/* Form */}
        <form onSubmit={handleUpdate} className="px-6 py-5 space-y-4">
          
          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Title <span className="text-red-500">*</span>
            </label>
            <input
              autoFocus
              type="text"
              placeholder="Enter task title"
              className="w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-black focus:border-black"
              value={data.title}
              onChange={(e) =>
                setData({ ...data, title: e.target.value })
              }
              required
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description{" "}
              <span className="text-gray-400">(Optional)</span>
            </label>
            <textarea
              rows="3"
              placeholder="Enter task details"
              className="w-full px-3 py-2 border border-gray-300 rounded-md resize-none placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-black focus:border-black"
              value={data.description}
              onChange={(e) =>
                setData({ ...data, description: e.target.value })
              }
            />
          </div>

          {/* Error */}
          {error && (
            <p className="text-sm text-red-600">{error}</p>
          )}

          {/* Footer */}
          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-100 transition"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 bg-black text-white rounded-md text-sm font-medium hover:bg-gray-900 transition disabled:opacity-60"
            >
              {loading ? "Updating..." : "Update"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
