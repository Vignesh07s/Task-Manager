"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Check, Edit2, Trash2, LogOut  } from "lucide-react";
import CreateTaskModal from "@/components/CreateTaskModal";
import EditTaskModal from "@/components/EditTaskModal";
import ConfirmationModal from "@/components/ConfirmationModal";
import { Plus } from "lucide-react";

export default function MyTasks() {
  const [tasks, setTasks] = useState([]);
  const [stats, setStats] = useState({ total: 0, pending: 0, completed: 0, percent: 0 });
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("active");

  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);

  const [confirmOpen, setConfirmOpen] = useState(false);
  const [confirmAction, setConfirmAction] = useState(() => { });
  const [confirmTitle, setConfirmTitle] = useState("");
  const [confirmMessage, setConfirmMessage] = useState("");

  const router = useRouter();

  // Fetch tasks from backend
  const fetchTasks = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/tasks`, {
        credentials: "include",
      });
      const data = await res.json();
      if (res.ok) {
        setTasks(data.tasks);
        setStats(data.stats); // <-- Use backend stats
      } else if (res.status === 401) router.push("/login");
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    fetchTasks();
  }, []);

  // Mark task as completed
  const markCompleted = async (id) => {
    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/tasks/${id}/mark-as-completed`, {
      method: "PATCH",
      credentials: "include",
    });
    fetchTasks();
  };

  // Delete task
  const deleteTask = async (id) => {
    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/tasks/${id}`, {
      method: "DELETE",
      credentials: "include",
    });
    fetchTasks();
  };

  // Confirmation handlers
  const handleDeleteClick = (task) => {
    setConfirmTitle("Delete Task");
    setConfirmMessage(`This action will permanently delete "${task.title}". Are you sure?`);
    setConfirmAction(() => () => deleteTask(task._id));
    setConfirmOpen(true);
  };

  const handleMarkCompletedClick = (task) => {
    setConfirmTitle("Mark Task as Completed");
    setConfirmMessage(`Mark the task "${task.title}" as completed?`);
    setConfirmAction(() => () => markCompleted(task._id));
    setConfirmOpen(true);
  };

  const logout = async () => {
    try {
      await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/logout`, {
        method: "POST",
        credentials: "include",
      });
      router.push("/login");
    } catch (err) {
      console.error("Logout failed", err);
    }
  };

  const filteredTasks =
    activeTab === "active"
      ? tasks.filter((t) => !t.isCompleted)
      : tasks.filter((t) => t.isCompleted);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-sm text-gray-500">
        Loading tasks...
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-10 min-h-screen bg-white">
      {/* Header row */}
      <div className="flex flex-wrap items-center justify-between mb-8 border-b border-gray-300 pb-4 gap-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">My Tasks</h1>
          <p className="text-sm text-gray-500 mt-1">Manage and track your progress</p>
        </div>

        <div className="flex gap-6 text-gray-600 text-xs uppercase tracking-wide font-semibold">
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-900">{stats.total}</div>
            <div>Total Tasks</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-900">{stats.pending}</div>
            <div>Pending</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-900">{stats.completed}</div>
            <div>Completed</div>
          </div>
        </div>

        <div className="flex gap-4">
          <button
            onClick={() => setIsCreateOpen(true)}
            className="bg-black text-white px-6 py-2 rounded-md text-sm font-medium hover:bg-gray-900 transition"
          >
            <Plus size={16}className="mr-2 inline"/> New Task
          </button>
          <button
            onClick={logout}
            className="bg-red-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-red-700 transition"
          >
            <LogOut size={16} className="mr-2 inline" /> Logout
          </button>
        </div>

      </div>

      {/* Tabs */}
      <div className="flex justify-start mb-6">
        <nav className="flex space-x-8 text-sm font-semibold text-gray-600 uppercase tracking-wider">
          <button
            onClick={() => setActiveTab("active")}
            className={`pb-2 border-b-2 ${activeTab === "active"
              ? "border-black text-black"
              : "border-transparent hover:text-gray-900"
              }`}
          >
            Active
          </button>
          <button
            onClick={() => setActiveTab("completed")}
            className={`pb-2 border-b-2 ${activeTab === "completed"
              ? "border-black text-black"
              : "border-transparent hover:text-gray-900"
              }`}
          >
            Completed
          </button>
        </nav>
      </div>

      {/* Task List */}
      <div className="space-y-4">
        {filteredTasks.length === 0 ? (
          <div className="py-16 border border-dashed border-gray-200 rounded-lg text-center text-gray-400 text-sm flex flex-col items-center gap-4">
            <p>No tasks here.</p>
            <button
              onClick={() => setIsCreateOpen(true)}
              className="bg-black text-white px-6 py-2 rounded-md text-sm font-medium hover:bg-gray-900 transition"
            >
              Create Your {stats.total === 0 ? "First" : ""} Task
            </button>
          </div>
        ) : (
          filteredTasks.map((task) => (
            <div
              key={task._id}
              className="border rounded-md p-4 hover:bg-gray-50 transition flex justify-between items-center"
            >
              {/* Task info */}
              <div className="flex flex-col gap-1 max-w-[85%]">
                <h2
                  className={`font-medium text-gray-900 ${task.isCompleted ? "line-through text-gray-400" : ""
                    }`}
                >
                  {task.title}
                </h2>
                <p className="text-sm text-gray-500 truncate">{task.description}</p>
              </div>

              {/* Actions: Only show for active tasks */}
              {!task.isCompleted && (
                <div className="flex items-center gap-4 text-gray-500">
                  <button
                    onClick={() => handleMarkCompletedClick(task)}
                    className="hover:text-green-600"
                    title="Mark as Completed"
                  >
                    <Check size={16} />
                  </button>

                  <button
                    onClick={() => {
                      setSelectedTask(task);
                      setIsEditOpen(true);
                    }}
                    className="hover:text-blue-600"
                    title="Edit"
                  >
                    <Edit2 size={16} />
                  </button>

                  <button
                    onClick={() => handleDeleteClick(task)}
                    className="hover:text-red-600"
                    title="Delete"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              )}
            </div>
          ))
        )}
      </div>

      {/* Confirmation modal */}
      <ConfirmationModal
        isOpen={confirmOpen}
        onClose={() => setConfirmOpen(false)}
        onConfirm={confirmAction}
        title={confirmTitle}
        message={confirmMessage}
      />

      {/* Create/Edit modals */}
      <CreateTaskModal
        isOpen={isCreateOpen}
        onClose={() => setIsCreateOpen(false)}
        onTaskCreated={fetchTasks}
      />
      <EditTaskModal
        isOpen={isEditOpen}
        onClose={() => setIsEditOpen(false)}
        task={selectedTask}
        onTaskUpdated={fetchTasks}
      />
    </div>
  );
}
