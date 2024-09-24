import mongoose, { Document } from 'mongoose';

// Taskインターフェイスは、MongoDBに依存しない純粋なタスクの定義として他の場所でも使用できます（例：APIのレスポンス型など）。
export interface Task {
  title: string;
  description: string;
  dueDate: string;
  isCompleted: boolean;
}

// MongoDBライブラリからDocumentで使う基本的なプロパティとメソッドを提供するためDocumentを継承
// これにより、TaskDocumentはTaskに加えて_idとcreatedAt, updatedAtを持つ
// これらのプロパティはMongoDBが自動的に生成する
export interface TaskDocument extends Task, Document {
  _id: string;
  createdAt: Date;
  updatedAt: Date;
}

const taskSchema = new mongoose.Schema<TaskDocument>(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    dueDate: {
      type: String,
      required: true,
    },
    isCompleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export const TaskModel =
  mongoose.models.Task || mongoose.model('Task', taskSchema);
