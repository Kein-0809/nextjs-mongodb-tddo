import { TaskDocument } from '@/models/task';
import TaskDeleteButton from './TaskDeleteButton/TaskDeleteButton';
import TaskEditButton from './TaskEditButton/TaskEditButton';

interface TaskCardProps {
  task: TaskDocument;
}

const TaskCard: React.FC<TaskCardProps> = ({ task }) => {
  return (
    <div
      className="w-64 h-52 p-4 bg-white rounded-md shadow-md 
  flex flex-col justify-between"
    >
      <header>
        <h1 className="text-lg font-semibold">{task.title}</h1>
        <div className="mt-1 text-sm line-clamp-3">{task.description}</div>
      </header>
      <div>
        <div className="text-sm">{task.dueDate}</div>
        <div className="flex justify-between items-center">
          <div
            className={`mt-1 text-sm px-2 py-1 w-24 text-center text-white 
        rounded-full shadow-sm ${
          task.isCompleted ? 'bg-green-500' : 'bg-red-500'
        }`}
          >
            {task.isCompleted ? 'Completed' : 'Incomplete'}
          </div>
          <div className="flex gap-4">
            <TaskEditButton id={task._id} />
            <TaskDeleteButton id={task._id} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
