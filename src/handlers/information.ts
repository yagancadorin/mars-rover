import * as readline from 'readline'
import { TInformation } from '../domain'
import { processRovers } from '../handlers'
import {
  formatInputInformation,
  printPrompt,
  printStartProcess,
} from '../utils'

export const coreInformation = async () => {
  printStartProcess()

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  })

  const information: string = await askInformations(rl)

  printPrompt('')

  processInformation(information)

  rl.close()
}

export const askInformations = (rl: readline.Interface): Promise<string> => {
  return new Promise((resolve) => {
    rl.question(
      'Please enter the string with plateau and rovers information:',
      (answer: string) => {
        resolve(answer)
      },
    )
  })
}

export const processInformation = async (
  information: string,
): Promise<void> => {
  const formattedInformation: TInformation = formatInputInformation(information)

  processRovers(
    formattedInformation.plateauUpperRight,
    formattedInformation.rovers,
  )
}
