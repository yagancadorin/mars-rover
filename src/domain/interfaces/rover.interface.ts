import { TInstruction, TOrientation } from '../types'

export interface IRover {
  position: IRoverPosition
  instructions: TInstruction[]
}

export interface IRoverPosition {
  xAxis: number
  yAxis: number
  orientation: TOrientation
}
