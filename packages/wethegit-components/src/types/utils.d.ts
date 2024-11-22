// recursion for the integer
type Enumerate<N extends number, Acc extends number[] = []> = Acc["length"] extends N
  ? Acc[number]
  : Enumerate<N, [...Acc, Acc["length"]]>

// makes sure we exclude the numbers in one range from the other
type IntRange<F extends number, T extends number> = Exclude<Enumerate<T>, Enumerate<F>>
