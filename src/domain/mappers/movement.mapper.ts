import { ECardinal, EInstruction } from '../enums'
import { TMovementAction, TOrientation } from '../types'

export const movementInstructions: Array<EInstruction> = [EInstruction.M]

export const movementMap: Record<TOrientation, TMovementAction> = {
  [ECardinal.N]: {
    axis: 'yAxis',
    value: 1,
  },
  [ECardinal.S]: {
    axis: 'yAxis',
    value: -1,
  },
  [ECardinal.E]: {
    axis: 'xAxis',
    value: 1,
  },
  [ECardinal.W]: {
    axis: 'xAxis',
    value: -1,
  },
}
