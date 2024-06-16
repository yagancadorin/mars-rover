import { IPlateau, IRover, IRoverPosition } from '../domain/interfaces'
import { TInformation, TInstruction, TOrientation } from '../domain/types'
import { isValidInformationString, normalizedInputInformation } from '../utils'

export const formatInputInformation = (input: string): TInformation => {
  const cleanString = normalizedInputInformation(input)

  if (!isValidInformationString(cleanString)) {
    throw new Error('Oops... The information provided was not as expected!')
  }

  const lines = cleanString.split('[NEWLINE]')

  const [plateauXAxis, plateauYAxis] = lines[0].split(' ').map(Number)

  const plateauUpperRight: IPlateau = {
    maximumXAxis: plateauXAxis,
    maximumYAxis: plateauYAxis,
  }

  const rovers: IRover[] = []

  for (let i = 1; i < lines.length; i += 2) {
    const [xAxis, yAxis, orientation] = lines[i].split(' ')

    const position: IRoverPosition = {
      xAxis: Number(xAxis),
      yAxis: Number(yAxis),
      orientation: orientation as TOrientation,
    }

    const instructions: TInstruction[] = lines[i + 1].split(
      '',
    ) as TInstruction[]

    rovers.push({ position, instructions })
  }

  return { plateauUpperRight, rovers }
}
