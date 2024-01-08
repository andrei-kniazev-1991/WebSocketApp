import {FloatPipe} from "./float.pipe";

describe("Float pipe", () => {
  let pipe: FloatPipe = new FloatPipe();

  it("formats short numbers properly", () => {
    let num = 1;
    expect(pipe.transform(num)).toEqual("1");
  });

  it("formats long numbers properly", () => {
    let num = 100.123456789;
    expect(pipe.transform(num)).toEqual("100.123456...");
  });
});
