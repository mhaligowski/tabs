import { immerable } from "immer";

class Cursor {
  [immerable] = true;

  private _stringNo: number;
  private _position: number;

  public get string_no(): number {
    return this._stringNo;
  }

  public set string_no(string_no: number) {
    this._stringNo = string_no;
  }

  public get position(): number {
    return this._position;
  }

  public set position(position: number) {
    this._position = position;
  }
}

export { Cursor };
