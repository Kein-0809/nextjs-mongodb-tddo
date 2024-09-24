import { TaskModel } from '@/models/task';
import { connectDb } from '@/utils/database';
import { NextRequest, NextResponse } from 'next/server';

export const GET = async (
  _: NextRequest,
  { params }: { params: { id: string } }
) => {
  try {
    await connectDb();
    // models/task.tsで定義されているTaskModelを使用して、
    // 指定されたIDに対応するタスクを検索します。
    // "findById"はMongoDBのfindOneメソッドのエイルミングバージョンです。
    // このメソッドは、指定されたIDに対応するタスクを検索し、
    // 見つかった場合はそのタスクを返します。
    const task = await TaskModel.findById(params.id);

    if (!task) {
      return NextResponse.json(
        { message: 'タスクが存在しません' },
        { status: 404 }
      );
    }

    return NextResponse.json({ message: 'タスク取得成功', task });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: 'タスク取得失敗' }, { status: 500 });
  }
};

export const dynamic = 'force-dynamic';
