import EditTaskForm from '@/components/EditTaskForm/EditTaskForm';
import { TaskDocument } from '@/models/task';

// このインターフェースはparamsというプロパティを持ち、
// そのプロパティはidという文字列型のプロパティを持つオブジェクトである
// Next.jsのダイナミックルーティングシステムと連携して使用されます。
// 例えば、/edit/[id]のようなパスがあった場合、
// [id]の部分が実際のIDに置き換わり、そのIDの値がparams.idとして利用可能になります。
interface Params {
  params: { id: string };
}

// /api/tasks/[id]/page.tsxのGETリクエストで取得したデータを取得する
const getTask = async (id: string): Promise<TaskDocument> => {
  const response = await fetch(`${process.env.API_URL}/tasks/${id}`, {
    cache: 'no-store',
  });

  const data = await response.json();
  return data.task as TaskDocument;
};

const EditTaskPage = async ({ params }: Params) => {
  const id = params.id;
  const task = await getTask(id);

  return (
    <div className="flex flex-col justify-center py-20">
      <h2 className="text-center text-2xl font-bold">Edit Task</h2>
      <EditTaskForm task={task} />
    </div>
  );
};

export default EditTaskPage;
