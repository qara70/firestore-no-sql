import { ValueObject } from '../__shared__/value-object';

export interface IQuestionTitleProps {
  value: string;
}

export default class QuestionTitle extends ValueObject<IQuestionTitleProps> {
  private constructor(props: IQuestionTitleProps) {
    super(props);
  }
}
