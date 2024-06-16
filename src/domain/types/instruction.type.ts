import { EInstruction } from '../enums'

export type TInstruction = EInstruction.L | EInstruction.R | EInstruction.M

export type TMovementInstruction = EInstruction.M

export type TRotationInstruction = EInstruction.L | EInstruction.R
