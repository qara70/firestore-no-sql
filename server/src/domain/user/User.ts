import { Entity } from '../__shared__/entity';
import UserName from './UserName';

export interface IUserProps {
  name: UserName;
}

export default class User extends Entity<IUserProps> {
  public constructor(props: IUserProps) {
    super(props);
  }
}
