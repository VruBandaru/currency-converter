import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectItem,
  SelectTrigger,
  SelectContent,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { v4 as uuidv4 } from 'uuid';

const priorities = ['low', 'med', 'high', 'urgent'];
const categories = ['ui', 'feature', 'testing', 'design', 'optimization'];

export default function TaskTracker() {
  const [tasks, setTasks] = useState([]);
  const [form, setForm] = useState({
    title: '',
    description: '',
    priority: 'low',
    category: 'ui',
  });

  const handleChange = (key, value) => {
    if (key === 'description' && value.length > 100) return;
    setForm({ ...form, [key]: value });
  };

  const handleSubmit = () => {
    const newTask = { ...form, id: uuidv4() };
    setTasks([...tasks, newTask]);
    setForm({ title: '', description: '', priority: 'low', category: 'ui' });
  };

  return (
    <div className="p-6 max-w-2xl mx-auto space-y-6">
      <Card>
        <CardContent className="space-y-4 p-6">
          <h2 className="text-xl font-semibold">Create a Task</h2>
          <Input
            placeholder="Task Title"
            value={form.title}
            onChange={(e) => handleChange('title', e.target.value)}
          />
          <Textarea
            placeholder="Description (max 100 chars)"
            value={form.description}
            onChange={(e) => handleChange('description', e.target.value)}
          />
          <Select
            value={form.priority}
            onValueChange={(val) => handleChange('priority', val)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select Priority" />
            </SelectTrigger>
            <SelectContent>
              {priorities.map((p) => (
                <SelectItem key={p} value={p}>
                  {p}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select
            value={form.category}
            onValueChange={(val) => handleChange('category', val)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select Category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((c) => (
                <SelectItem key={c} value={c}>
                  {c}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button onClick={handleSubmit}>Add Task</Button>
        </CardContent>
      </Card>

      <div className="space-y-4">
        {tasks.map((task) => (
          <Card key={task.id}>
            <CardContent className="p-4 space-y-1">
              <h3 className="text-lg font-medium">{task.title}</h3>
              <p className="text-sm text-muted-foreground">
                {task.description}
              </p>
              <div className="text-sm text-muted-foreground flex gap-4">
                <span>Priority: {task.priority}</span>
                <span>Category: {task.category}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
