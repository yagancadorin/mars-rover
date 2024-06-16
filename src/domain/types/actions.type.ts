import { EInstruction } from '../enums'
import { TOrientation } from '../types'

export type TMovementAction = {
  axis: 'xAxis' | 'yAxis'
  value: number
}

export type TRotationAction = {
  [EInstruction.L]: TOrientation
  [EInstruction.R]: TOrientation
}
