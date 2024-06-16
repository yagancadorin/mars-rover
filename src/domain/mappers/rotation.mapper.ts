import { ECardinal, EInstruction } from '../enums'
import { TOrientation, TRotationAction } from '../types'

export const rotationInstructions: Array<EInstruction> = [
  EInstruction.L,
  EInstruction.R,
]

export const rotationMap: Record<TOrientation, TRotationAction> = {
  [ECardinal.N]: {
    [EInstruction.L]: ECardinal.W,
    [EInstruction.R]: ECardinal.E,
  },
  [ECardinal.S]: {
    [EInstruction.L]: ECardinal.E,
    [EInstruction.R]: ECardinal.W,
  },
  [ECardinal.E]: {
    [EInstruction.L]: ECardinal.N,
    [EInstruction.R]: ECardinal.S,
  },
  [ECardinal.W]: {
    [EInstruction.L]: ECardinal.S,
    [EInstruction.R]: ECardinal.N,
  },
}
