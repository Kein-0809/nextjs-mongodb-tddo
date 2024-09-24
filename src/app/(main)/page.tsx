import TaskCard from '@/components/TaskCard/TaskCard';
import { TaskDocument } from '@/models/task';
import Link from 'next/link';
import { MdAddTask } from 'react-icons/md';
import { GET } from '../api/tasks/expired/route';

// この関数は、APIからタスクを取得してTaskDocumentの配列を返す
// Map関数などを使って、それぞれのデータを表示できるようにTaskDocumentの配列を定義する
const getAllTasks = async (): Promise<TaskDocument[]> => {
  // api/tasks/route.tsのGETリクエストを実行する
  const response = await fetch(`${process.env.API_URL}/tasks`, {
    cache: 'no-store', // キャッシュを無効にして毎回新しいデータを取得する
  });

  if (response.status !== 200) {
    throw new Error();
  }

  // レスポンスをJSONとして読み込む
  const data = await response.json();
  // レスポンスのtasksプロパティをTaskDocumentの配列として返す (api/tasks/rote.tsの GET Method を参照するべし)
  return data.tasks as TaskDocument[];
};

export default async function MainPage() {
  const allTasks = await getAllTasks();

  return (
    <div className="text-gray-800 p-8 h-full overflow-y-auto pb-24">
      <header className="flex justify-between items-center">
        <h1 className="text-2xl font-bold flex items-center">All Tasks</h1>
        <Link
          href="/new"
          className="flex items-center gap-1 font-semibold border px-4
      py-2 rounded-full shadow-sm text-white bg-gray-800 hover:bg-gray-700"
        >
          <MdAddTask className="size-5" />
          <div>Add Task</div>
        </Link>
      </header>
      <div className="mt-8 flex flex-wrap gap-4">
        {allTasks.map((task) => (
          <TaskCard key={task._id} task={task} />
        ))}
      </div>
    </div>
  );
}
