export interface Circle {
  kind: "circle";
  radius: number;
}

export interface Rectangle {
  kind: "rectangle";
  width: number;
  height: number;
}

export interface Square {
  kind: "square";
  size: number;
}

export type Shape = Circle | Rectangle | Square;

export function isCircle(shape: Shape): shape is Circle {
  // Implement custom type guard
  if (shape.kind === "circle") {
    return true;
  }
  return false;
}

export function calculateArea(shape: Shape): number {
  // Implement exhaustive switch check
  switch (shape.kind) {
    case "circle":
      return Math.PI * shape.radius * shape.radius;
    case "rectangle":
      return shape.width * shape.height;
    case "square":
      return shape.size * shape.size;

    default:
      const _exhaustiveCheck: never = shape;
      return _exhaustiveCheck;
  }
}
