import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  async updateStatus(updateStatus: UpdateStatusDto): Promise<void> {
    // コレクションにする or question001ドキュメント内にもたせる
    // どちらがどうしてよくなるのか？
    // 結論：コレクションでもたせる方が良さそう。
    // 理由：question_statusを完了or未完了だけでクエリしようとすると追加インデックス作成が不要で取得できるから
    const targetData = db
      .collection('users')
      .doc(updateStatus.user_id)
      .collection('questions')
      .doc(updateStatus.question_id)
      .collection('question_status')
      .doc('complete');

    targetData.update({ status: '完了' }).catch((error) => {
      throw new Error(`update status error : ${error}`);
    });
  }
}
