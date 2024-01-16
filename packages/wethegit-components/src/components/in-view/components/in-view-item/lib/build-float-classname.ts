/**
 * Returns a class name string with the float value multiplied by 10
 * appended to it, because CSS class names cannot have decimals.
 *
 * @param name The property to prepend the class name with.
 * @param value Float value corresponding to seconds.
 *
 * @example
 * buildFloatClassName("staggerAmount", 0.2) // => "staggerAmount2"
 */
export function buildFloatClassname(name: string, value: number) {
  return name + Math.floor(value * 10)
}
