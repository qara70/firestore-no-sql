import deepEqual from 'deep-equal';

export abstract class ValueObject<T> {
  protected readonly props: T;

  protected constructor(props: T) {
    this.props = Object.freeze(props);
  }

  public equals(other: ValueObject<T>): boolean {
    return deepEqual(this.props, other.props);
  }
}
