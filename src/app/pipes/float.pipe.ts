import {Pipe, PipeTransform} from "@angular/core";

@Pipe({
  name: 'floatPipe'
})
export class FloatPipe implements PipeTransform {
  transform(value: number): string {
    let values = value.toString().split(".");
    if (values[1] == undefined) {
      return values[0];
    }
    return values[0] + "." + (values[1].length < 6 ? values[1] : values[1].slice(0, 6) + "...");
  }
}
