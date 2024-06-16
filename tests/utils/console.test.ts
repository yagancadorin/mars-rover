import { printStartProcess, printPrompt } from '../../src/utils'

describe('console functions', () => {
  test('Should print input string', () => {
    const input: string =
      'Lorem Ipsum is simply dummy text of the printing and typesetting industry.'
    let consoleOutput: string = ''

    const consoleSpy = jest
      .spyOn(console, 'log')
      .mockImplementation((output) => {
        consoleOutput += output
      })

    printPrompt(input)

    expect(consoleSpy).toHaveBeenCalledWith(input)
    expect(consoleOutput).toBeTruthy()
    expect(consoleOutput).toEqual(input)

    consoleSpy.mockRestore()
  })

  test('Should print starter string', () => {
    let consoleOutput: string = ''

    const consoleSpy = jest
      .spyOn(console, 'log')
      .mockImplementation((output) => {
        consoleOutput += output
      })

    printStartProcess()

    expect(consoleSpy).toHaveBeenCalled()
    expect(consoleOutput).toBeTruthy()

    consoleSpy.mockRestore()
  })
})
