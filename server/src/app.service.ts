import { Injectable } from '@nestjs/common';
import { UpdateStatusDto } from './dto/update-status-dto';
import { db } from './lib/firebase-firestore';

interface UserQuestionStatusProps {
  id: string;
  name: string;
  question: Question[];
}

type Question = {
  id: string;
  title: string;
  status: string;
};

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

  // まさにコールバック地獄になってしまいゴリ押しで実装した
  // どうすればよかったか？
  // 案①questionsは、参照の形にしないで、ユーザーに紐付ける形にするか？
  async getUserStatusList() {
    const usersDb = db.collection('users');
    const userQuestions = [];

    const datas = () => {
      return usersDb.get().then((usersRecord) => {
        usersRecord.docs.map(async (userDoc) => {
          const questionDb = this.getQuestionDb(userDoc.data().user_id);

          await questionDb.get().then(async (quests) => {
            quests.docs.forEach(async (quest) => {
              const questionStatusDb = this.getQuestionStatusDb(
                userDoc.data().user_id,
                quest.data().question_id,
              );

              const questionStatusData = await questionStatusDb
                .get()
                .then((statuses) => {
                  return statuses.docs.map((status) => {
                    return {
                      id: userDoc.data().user_id,
                      name: userDoc.data().user_name,
                      question: {
                        id: quest.data().question_id as string,
                        title: quest.data().question_title as string,
                        status: status.data().status as string,
                      },
                    };
                  });
                });
              userQuestions.push(questionStatusData[0]);
            });
          });
        });
      });
    };
    await datas();
    const _sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
    await _sleep(1000);

    return userQuestions;

    // questionデータ参照をquestionsコレクションからではなく、usersの中にあるquestion001フィールド：参照から取得する形
    // 先行で作成したupdateStatus()ではコレクションから取得する形
    // そうなると、コレクションとquestion001フィールドと2つのquestionsに関するデータの持ち形になるけどあってるの？？
    // 結果：ぜんぶコレクションでデータを取得する形にした。ただ、コールバック多用で可読性低い
  }

  private getQuestionDb(user_id: string) {
    const usersDb = db.collection('users');
    const questionDb = usersDb.doc(user_id).collection('questions');
    return questionDb;
  }

  private getQuestionStatusDb(user_id: string, question_id: string) {
    const usersDb = db.collection('users');
    const questionDb = usersDb.doc(user_id).collection('questions');
    const questionStatusDb = questionDb
      .doc(question_id)
      .collection('question_status');
    return questionStatusDb;
  }
}
