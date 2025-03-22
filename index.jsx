import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion, AnimatePresence } from "framer-motion";
import { Sun, Moon, Trash2, Check, PlusCircle } from "lucide-react";
import { v4 as uuidv4 } from "uuid";

export default function TodoApp() {
  const [tasks, setTasks] = useState(() => {
    return JSON.parse(localStorage.getItem("tasks")) || [];
  });
  const [taskInput, setTaskInput] = useState("");
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (taskInput.trim() === "") return;
    const newTask = {
      id: uuidv4(),
      text: taskInput,
      completed: false,
    };
    setTasks([...tasks, newTask]);
    setTaskInput("");
  };

  const toggleTask = (id) => {
    setTasks(tasks.map(task => task.id === id ? { ...task, completed: !task.completed } : task));
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  return (
    <div className={`min-h-screen p-5 transition-all ${darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-black"}`}>
      <div className="max-w-lg mx-auto space-y-5">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">To-Do List</h1>
          <Button onClick={() => setDarkMode(!darkMode)}>
            {darkMode ? <Sun /> : <Moon />}
          </Button>
        </div>

        <div className="flex gap-2">
          <Input
            value={taskInput}
            onChange={(e) => setTaskInput(e.target.value)}
            placeholder="Digite uma nova tarefa..."
          />
          <Button onClick={addTask} className="bg-blue-500 hover:bg-blue-700">
            <PlusCircle />
          </Button>
        </div>

        <div className="space-y-2">
          <AnimatePresence>
            {tasks.map(task => (
              <motion.div
                key={task.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
              >
                <Card className="p-3 flex justify-between items-center shadow-md">
                  <span
                    className={`flex-1 ${task.completed ? "line-through text-gray-400" : ""}`}
                    onClick={() => toggleTask(task.id)}
                  >
                    {task.text}
                  </span>
                  <div className="flex gap-2">
                    <Button onClick={() => toggleTask(task.id)} className="bg-green-500 hover:bg-green-700">
                      <Check />
                    </Button>
                    <Button onClick={() => deleteTask(task.id)} className="bg-red-500 hover:bg-red-700">
                      <Trash2 />
                    </Button>
                  </div>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
