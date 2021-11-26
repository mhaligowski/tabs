import { immerable } from "immer";

class Cursor {
  [immerable] = true;

  private _stringNo: number;
  private _position: number;

  constructor(position: number, stringNo: number) {
    this._position = position;
    this._stringNo = stringNo;
  }

  public get stringNo(): number {
    return this._stringNo;
  }

  public set stringNo(stringNo: number) {
    this._stringNo = stringNo;
  }

  public get position(): number {
    return this._position;
  }

  public set position(position: number) {
    this._position = position;
  }
}

export { Cursor };
