export interface IconSymbolProps extends React.SVGProps<SVGSVGElement> {
  /**
   * The id of the symbol. This will be used to reference the symbol in the `Icon` component.
   */
  id: string
  /**
   * The size of the symbol. This will be used to set the `viewBox` attribute.
   */
  size: number
  children: React.ReactNode
}

export function IconSymbol({ id, size, children, ...props }: IconSymbolProps) {
  return (
    <symbol {...props} id={`icon-${id}`} viewBox={`0 0 ${size} ${size}`}>
      {children}
    </symbol>
  )
}
