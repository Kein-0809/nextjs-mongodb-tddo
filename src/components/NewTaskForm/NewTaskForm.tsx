'use client';

import { FormState, createTask } from '@/actions/task';
import { useFormState, useFormStatus } from 'react-dom';

const NewTaskForm = () => {
  const initialState: FormState = { error: '' };
  const [state, formAction] = useFormState(createTask, initialState);
  // "formAction"を使ってフォームを送信する
  // これにより、フォームのデータが送信され、useFormState()内にあるcreateTask関数が実行される
  // actions/task.tsのcreateTask関数が実行され、その戻り値がstateに格納される
  // useFormState()内にある"initialState"は、フォームの初期値を定義する

  const SubmitButton = () => {
    // useFormStatus()を使ってフォームのが送信中jかどうかを確認するために使う
    // pendingは、フォームの送信中かどうかを示すboolean値 (trueなら送信中、falseなら送信されていない)
    const { pending } = useFormStatus();

    return (
      <button
        type="submit"
        className="mt-8 py-2 w-full rounded-md text-white 
        bg-gray-800 hover:bg-gray-700 text-sm font-semibold shadow-sm
        disabled:bg-gray-400"
        disabled={pending}
      >
        Create
      </button>
      // pending が true の場合：ボタンは無効化され、ユーザーがクリックできなくなります。
      // pending が false の場合：ボタンは通常の状態で、クリックが可能です。
    );
  };

  return (
    <div className="mt-10 mx-auto w-full max-w-sm">
      <form action={formAction}>
        <div>
          <label htmlFor="title" className="block text-sm font-medium">
            タイトル
          </label>
          <input
            type="text"
            id="title"
            name="title"
            required
            className="block mt-2 py-1.5 px-2 w-full rounded-md border-0 
          shadow-sm ring-1 ring-inset ring-gray-300"
          />
        </div>
        <div className="mt-6">
          <label htmlFor="description" className="block text-sm font-medium">
            説明
          </label>
          <input
            type="text"
            id="description"
            name="description"
            required
            className="block mt-2 py-1.5 px-2 w-full rounded-md border-0 
          shadow-sm ring-1 ring-inset ring-gray-300"
          />
        </div>
        <div className="mt-6">
          <label htmlFor="dueDate" className="block text-sm font-medium">
            期限
          </label>
          <input
            type="date"
            id="dueDate"
            name="dueDate"
            min="2020-01-01"
            max="2999-12-31"
            required
            className="block mt-2 py-1.5 px-2 w-full rounded-md border-0 
          shadow-sm ring-1 ring-inset ring-gray-300"
          />
        </div>
        <SubmitButton />
        {state.error && (
          <p className="mt-2 text-red-500 text-sm">{state.error}</p>
        )}
      </form>
    </div>
  );
};

export default NewTaskForm;
