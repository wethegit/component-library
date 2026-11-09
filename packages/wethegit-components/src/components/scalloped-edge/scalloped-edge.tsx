import { useId } from "react"
import type { ComponentPropsWithoutRef, CSSProperties, ReactNode } from "react"

import { classnames } from "@local/utilities/classnames"

import styles from "./scalloped-edge.module.scss"

export const SCALLOPED_EDGE_SIDES = ["top", "bottom", "left", "right"] as const

export type ScallopedEdgeSide = (typeof SCALLOPED_EDGE_SIDES)[number]

type ScallopedEdgeOwnProps = {
  /**
   * Shared edge artwork.
   * Applied to every side added to `sides`.
   */
  image?: string

  /**
   * Side-specific artwork.
   * Setting one also has option to mirror to opposite side
   */
  top?: string
  bottom?: string
  left?: string
  right?: string

  /**
   * Sides that receive `image`.
   * Accepts `top`, `bottom`, `left`, `right`, combinations like `top bottom`, `left right` or `all`.

  * Defaults to all four sides when only `image` is provided
   */
  sides?: string

  /**
   * Tile the artwork instead of stretching
   */
  repeat?: boolean

  /**
   * Size of one tile along the edge when `repeat` is used with `mirror`.
   * Defaults to `size`. Numbers = pixels
   */
  tileSize?: number | string

  /**
   * Thickness of the edge container. Numbers = pixels
   */
  size?: number | string

  /**
   * Mirror the artwork on the opposite side.
   
  * The `bottom` and `right` mask images get flipped so the image points inwards
   */
  mirror?: boolean

  /**
   * Place the `image` over a predictable `frameAspect` container instead of one per edge
   */
  fullFrame?: boolean

  /**
   * Aspect ratio of the container when `fullFrame` is set.
   */
  frameAspect?: string
  children?: ReactNode
}

export type ScallopedEdgeProps = ScallopedEdgeOwnProps &
  Omit<ComponentPropsWithoutRef<"div">, keyof ScallopedEdgeOwnProps>

type Edge = {
  side: ScallopedEdgeSide
  src: string
  mirrorAxis: MirrorAxis | null
}

type MirrorAxis = "x" | "y"

type EdgeMask = {
  id: string
  patternId: string
  side: ScallopedEdgeSide
  src: string
  mirrorAxis: MirrorAxis
  repeat: boolean
  tileSize: string
}

type MaskProperties = {
  style: CSSProperties | null
  masks: EdgeMask[]
}

type MaskComposite = "add" | "subtract"

const SIDE_SET = new Set<string>(SCALLOPED_EDGE_SIDES)

const SIDE_POSITION: Record<ScallopedEdgeSide, string> = {
  top: "0 0",
  bottom: "0 100%",
  left: "0 0",
  right: "100% 0",
}

function toLength(value: number | string | undefined, fallback: string): string {
  if (value === undefined || value === "") return fallback
  return typeof value === "number" ? `${value}px` : value
}

function isVerticalSide(side: ScallopedEdgeSide): boolean {
  return side === "left" || side === "right"
}

function edgeContainerSize(side: ScallopedEdgeSide, size: string): string {
  return isVerticalSide(side) ? `${size} 100%` : `100% ${size}`
}

function repeatLayerSize(side: ScallopedEdgeSide, size: string): string {
  return isVerticalSide(side) ? `${size} auto` : `auto ${size}`
}

function parseSides(value?: string): ScallopedEdgeSide[] | null {
  if (value === undefined) return null

  const sideNames = value.split(/[\s,|]+/)
  const found: ScallopedEdgeSide[] = []
  sideNames.forEach((sideName) => {
    const side = sideName.toLowerCase()
    if (side === "all") {
      found.push(...SCALLOPED_EDGE_SIDES)
    } else if (SIDE_SET.has(side)) {
      found.push(side as ScallopedEdgeSide)
    }
  })

  return Array.from(new Set(found))
}

/**
 * - bottom and right edges point inwards when mirrored
 */
function mirrorAxis(side: ScallopedEdgeSide, mirror: boolean): MirrorAxis | null {
  if (!mirror) return null
  if (side === "bottom") return "y"
  if (side === "right") return "x"

  return null
}

function makeMask({
  edges,
  frameSrc,
  size,
  repeat,
  tileSize,
  idPrefix,
}: {
  edges: Edge[]
  frameSrc?: string
  size: string
  repeat: boolean
  tileSize: string
  idPrefix: string
}): MaskProperties {
  const images: string[] = []
  const sizes: string[] = []
  const positions: string[] = []
  const repeats: string[] = []
  const composites: MaskComposite[] = []
  const masks: EdgeMask[] = []

  const addMaskingLayer = (
    image: string,
    layerSize: string,
    position: string,
    layerRepeat: string,
    composite: MaskComposite
  ) => {
    images.push(image)
    sizes.push(layerSize)
    positions.push(position)
    repeats.push(layerRepeat)
    composites.push(composite)
  }

  addMaskingLayer(
    "linear-gradient(#000, #000)",
    "100% 100%",
    "0 0",
    "no-repeat",
    "subtract"
  )

  if (frameSrc) {
    addMaskingLayer(`url("${frameSrc}")`, "100% 100%", "0 0", "no-repeat", "add")
  } else {
    edges.forEach(({ side, src, mirrorAxis }) => {
      if (mirrorAxis) {
        const id = `${idPrefix}-${side}`

        masks.push({
          id,
          patternId: `${id}-tile`,
          side,
          src,
          mirrorAxis,
          repeat,
          tileSize: tileSize,
        })

        addMaskingLayer(`url(#${id})`, "100% 100%", "0 0", "no-repeat", "add")
        return
      }

      const vertical = isVerticalSide(side)

      addMaskingLayer(
        `url("${src}")`,
        repeat ? repeatLayerSize(side, size) : edgeContainerSize(side, size),
        SIDE_POSITION[side],
        repeat ? (vertical ? "repeat-y" : "repeat-x") : "no-repeat",
        "add"
      )
    })
  }

  if (images.length < 2) return { style: null, masks }

  return {
    masks,
    style: {
      maskComposite: composites.join(", "),
      maskImage: images.join(", "),
      maskPosition: positions.join(", "),
      maskRepeat: repeats.join(", "),
      maskSize: sizes.join(", "),
    },
  }
}

function mirrorClass(mirrorAxis: MirrorAxis): string {
  return mirrorAxis === "x" ? styles.mirrorX : styles.mirrorY
}

function edgeTransformClass(side: ScallopedEdgeSide): string | undefined {
  if (side === "bottom") return styles.edgeBottom
  if (side === "right") return styles.edgeRight

  return undefined
}

/**
 * Cut a decorative edge from a container's side.
 *
 * The opaque part of your image is used as a mask to allow the background to show through.
 
* The image can be set per side, or one side, or one side and mirrored to the other. It can be stretched, tiled or be a full frame surrounding the container. FullFrame is good for inline autoplay videos with a shapely edge.
 *
 * **Note**: SVG artwork that needs to stretch should set `preserveAspectRatio="none"`.
 */
export function ScallopedEdge({
  image,
  top,
  bottom,
  left,
  right,
  sides,
  repeat = false,
  tileSize,
  size = "40px",
  mirror = false,
  fullFrame = false,
  frameAspect = "16 / 9",
  className,
  children,
  style,
  ...rest
}: ScallopedEdgeProps): React.JSX.Element {
  const edgeSize = toLength(size, "40px")
  const edgeTileSize = toLength(tileSize, edgeSize)
  const idPrefix = `scallop-${useId().replace(/:/g, "")}`

  const sideImages: Record<ScallopedEdgeSide, string | undefined> = {
    top,
    bottom,
    left,
    right,
  }
  const suppliedSides = SCALLOPED_EDGE_SIDES.filter((side) => Boolean(sideImages[side]))
  const requestedSides = parseSides(sides)

  let activeSides: ScallopedEdgeSide[]
  if (requestedSides) {
    activeSides = Array.from(new Set([...requestedSides, ...suppliedSides]))
  } else if (image) {
    activeSides = [...SCALLOPED_EDGE_SIDES]
  } else {
    activeSides = suppliedSides
  }

  const edges = activeSides
    .map((side) => {
      const src = sideImages[side] ?? image

      return src ? { side, src, mirrorAxis: mirrorAxis(side, mirror) } : null
    })
    .filter((edge): edge is Edge => Boolean(edge))

  const { style: maskStyle, masks } = makeMask({
    edges,
    frameSrc: fullFrame ? image : undefined,
    size: edgeSize,
    repeat,
    tileSize: edgeTileSize,
    idPrefix,
  })

  const rootStyle = {
    ...(fullFrame ? { aspectRatio: frameAspect } : null),
    ...maskStyle,
    ...style,
    "--scallop-edge-size": edgeSize,
  } as CSSProperties

  return (
    <div
      {...rest}
      className={classnames([
        styles.scallopedEdge,
        maskStyle ? styles.masked : null,
        className,
      ])}
      style={rootStyle}
    >
      {masks.length ? (
        <div className={styles.maskSizer}>
          <svg aria-hidden="true" className={styles.maskDefs} focusable="false">
            <defs>
              {masks.map((mask) => {
                const vertical = isVerticalSide(mask.side)
                const bandStyle: CSSProperties = vertical
                  ? {
                      height: "100cqh",
                      width: "var(--scallop-edge-size)",
                      x: 0,
                      y: 0,
                    }
                  : {
                      height: "var(--scallop-edge-size)",
                      width: "100cqw",
                      x: 0,
                      y: 0,
                    }
                const patternWidth = vertical ? edgeSize : mask.tileSize
                const patternHeight = vertical ? mask.tileSize : edgeSize

                return (
                  <mask
                    id={mask.id}
                    key={mask.id}
                    height="1"
                    maskContentUnits="userSpaceOnUse"
                    maskUnits="objectBoundingBox"
                    style={{ maskType: "alpha" }}
                    width="1"
                    x="0"
                    y="0"
                  >
                    <g className={edgeTransformClass(mask.side)}>
                      {mask.repeat ? (
                        <>
                          <pattern
                            id={mask.patternId}
                            height={patternHeight}
                            patternUnits="userSpaceOnUse"
                            width={patternWidth}
                          >
                            <image
                              className={classnames([
                                styles.maskImage,
                                mirrorClass(mask.mirrorAxis),
                              ])}
                              href={mask.src}
                              height={patternHeight}
                              preserveAspectRatio="none"
                              width={patternWidth}
                              x="0"
                              y="0"
                            />
                          </pattern>
                          <rect fill={`url(#${mask.patternId})`} style={bandStyle} />
                        </>
                      ) : (
                        <image
                          className={classnames([
                            styles.maskImage,
                            mirrorClass(mask.mirrorAxis),
                          ])}
                          href={mask.src}
                          preserveAspectRatio="none"
                          style={bandStyle}
                        />
                      )}
                    </g>
                  </mask>
                )
              })}
            </defs>
          </svg>
        </div>
      ) : null}

      <div
        className={classnames([
          styles.scallopedContent,
          fullFrame ? styles.fullFrame : null,
        ])}
      >
        {children}
      </div>
    </div>
  )
}
