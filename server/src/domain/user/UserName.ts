import { ValueObject } from '../__shared__/value-object';

export interface IUserNameProps {
  value: string;
}

export default class UserName extends ValueObject<IUserNameProps> {
  private constructor(props: IUserNameProps) {
    super(props);
  }
}
