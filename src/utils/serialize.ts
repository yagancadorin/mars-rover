import { IRoverPosition } from '../domain'

export const serializeRoverPosition = (
  roverPosition: IRoverPosition,
): string => {
  const { xAxis, yAxis, orientation } = roverPosition

  return `${xAxis} ${yAxis} ${orientation}`
}
