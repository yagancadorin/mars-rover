import { IPlateau, IRover, IRoverPosition } from '../domain/interfaces'
import {
  movementInstructions,
  movementMap,
  rotationInstructions,
  rotationMap,
} from '../domain/mappers'
import {
  TCoordinates,
  TInstruction,
  TMovementAction,
  TOrientation,
  TRotationInstruction,
} from '../domain/types'
import { printPrompt, serializeRoverPosition } from '../utils'

export const processRovers = async (plateau: IPlateau, rovers: IRover[]) => {
  for (const [index, rover] of rovers.entries()) {
    printPrompt(`Starting instructions for Rover[${index + 1}]`)

    if (
      !rover.position.xAxis ||
      !rover.position.yAxis ||
      !rover.position.orientation
    ) {
      throw new Error('Oops... The rover position was not detected!')
    }

    if (rover.instructions.length === 0) {
      throw new Error(
        `Oops... The instructions for Rover[${index + 1}] were not detected!`,
      )
    }

    const finalPosition: IRoverPosition = await processRoverInstructions(
      plateau,
      rover.position,
      rover.instructions,
    )

    printPrompt(
      `Final position found for Rover[${index + 1}] => ${serializeRoverPosition(finalPosition)}\n`,
    )
  }
}

export const processRoverInstructions = async (
  plateau: IPlateau,
  position: IRoverPosition,
  instructions: TInstruction[],
): Promise<IRoverPosition> => {
  if (!instructions || instructions.length === 0) {
    return position
  }

  const newPosition: IRoverPosition = position
  const actualCommand: TInstruction = instructions[0]
  const missingInstructions: TInstruction[] = instructions.slice(1)

  if (movementInstructions.includes(actualCommand)) {
    const newCoordinates: TCoordinates = await calculateRoverMovement(position)

    newPosition.xAxis = newCoordinates.xAxis
    newPosition.yAxis = newCoordinates.yAxis
  }

  if (rotationInstructions.includes(actualCommand)) {
    newPosition.orientation = await calculateRoverRotation(
      position,
      actualCommand as TRotationInstruction,
    )
  }

  await checkRoverPosition(plateau, newPosition)

  return processRoverInstructions(plateau, newPosition, missingInstructions)
}

export const calculateRoverRotation = async (
  roverPostion: IRoverPosition,
  command: TRotationInstruction,
): Promise<TOrientation> => {
  const newOrientation: TOrientation =
    rotationMap[roverPostion.orientation][command]

  if (!newOrientation) {
    throw new Error('Oops... The rotation was not found!')
  }

  return newOrientation
}

export const calculateRoverMovement = async (
  roverPosition: IRoverPosition,
): Promise<TCoordinates> => {
  const newCoordinates: TCoordinates = {
    xAxis: roverPosition.xAxis,
    yAxis: roverPosition.yAxis,
  }

  const valueToChange: TMovementAction = movementMap[roverPosition.orientation]

  if (!valueToChange) {
    throw new Error('Oops... The movement was not found!')
  }

  newCoordinates[valueToChange.axis] =
    roverPosition[valueToChange.axis] + valueToChange.value

  return newCoordinates
}

export const checkRoverPosition = async (
  plateau: IPlateau,
  roverPosition: IRoverPosition,
): Promise<void> => {
  if (
    Object.keys(plateau).length === 0 ||
    Object.keys(roverPosition).length === 0
  ) {
    throw new Error('Oops... The plateu or rover position was not found!')
  }

  if (
    roverPosition.xAxis > plateau.maximumXAxis ||
    roverPosition.yAxis > plateau.maximumYAxis
  ) {
    throw new Error('Oops... The rover is outside the plateau!')
  }

  if (roverPosition.xAxis < 0 || roverPosition.yAxis < 0) {
    throw new Error('Oops... The rover is outside the plateau!')
  }
}
