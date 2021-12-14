import { Entity } from '../__shared__/entity';
import QuestionTitle from './question-title';

export interface IQuestionProps {
  title: QuestionTitle;
}

export default class Question extends Entity<IQuestionProps> {
  public constructor(props: IQuestionProps) {
    super(props);
  }
}
