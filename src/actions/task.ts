// ここでバックエンドの処理を行う
// HTTP Methodの代わりをになう
// URLなどの操作は行わず、データベースとのやり取りだけ行う
'use server';

import { Task, TaskModel } from '@/models/task';
import { connectDb } from '@/utils/database';
import { redirect } from 'next/navigation';

export interface FormState {
  error: string;
}

// FormDataはJavaScriptの組み込みオブジェクトで、
// フォームの各フィールドの名前と値のペアを含んでいる
export const createTask = async (state: FormState, formData: FormData) => {
  const newTask: Task = {
    // formData.get('フィールド名')メソッドを使用して
    // 各フィールドの値を取得しています。
    title: formData.get('title') as string,
    description: formData.get('description') as string,
    dueDate: formData.get('dueDate') as string,
    isCompleted: false,
  };

  try {
    await connectDb();
    await TaskModel.create(newTask);
  } catch (error) {
    state.error = 'タスクの作成に失敗しました';
    return state;
  }

  redirect('/');
};

export const updateTask = async (
  id: string,
  state: FormState,
  formData: FormData
) => {
  const updateTask: Task = {
    title: formData.get('title') as string,
    description: formData.get('description') as string,
    dueDate: formData.get('dueDate') as string,
    isCompleted: Boolean(formData.get('isCompleted')),
  };

  try {
    await connectDb();
    await TaskModel.updateOne({ _id: id }, updateTask);
  } catch (error) {
    state.error = 'タスクの更新に失敗しました';
    return state;
  }

  redirect('/');
};

export const deleteTask = async (id: string, state: FormState) => {
  try {
    await connectDb();
    await TaskModel.deleteOne({ _id: id });
  } catch (error) {
    state.error = 'タスクの削除に失敗しました';
    return state;
  }

  redirect('/');
};
