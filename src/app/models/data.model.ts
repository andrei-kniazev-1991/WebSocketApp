import {ChildModel} from "./child.model";

export class DataModel {
  constructor(
    public id: string,
    public int: number,
    public float: number,
    public color: string,
    public child: ChildModel
  ) {
  }
}
