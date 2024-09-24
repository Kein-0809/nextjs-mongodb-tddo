import { TaskDocument, TaskModel } from '@/models/task';
import { connectDb } from '@/utils/database';
import { NextResponse } from 'next/server';

export const GET = async () => {
  try {
    await connectDb();
    const completedTasks: TaskDocument[] = await TaskModel.find({
      isCompleted: true,
    });

    return NextResponse.json({ message: 'タスク取得成功', tasks: completedTasks });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: 'タスク取得失敗' }, { status: 500 });
  }
};

export const dynamic = 'force-dynamic';
