import { TaskDocument, TaskModel } from '@/models/task';
import { connectDb } from '@/utils/database';
import { NextResponse } from 'next/server';

export const GET = async () => {
  try {
    await connectDb();
    // コレクション内の全てのドキュメントを取得
    const allTasks: TaskDocument[] = await TaskModel.find();

    return NextResponse.json({ message: 'タスク取得成功', tasks: allTasks });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: 'タスク取得失敗' }, { status: 500 });
  }
};

// ルートハンドラーが動的に実行されるべきであることを指定する。
//これにより、レスポンスがキャッシュされず、毎回新しいデータが取得されます。
export const dynamic = 'force-dynamic';
