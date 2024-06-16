import {
  coreInformation,
  askInformations,
  processInformation,
} from '../../src/handlers'

jest.mock('readline', () => ({
  createInterface: jest.fn().mockReturnValue({
    question: jest.fn().mockImplementationOnce((questionText, cb) => {
      cb('5 5\n1 2 N\nLMLMLMLMM\n3 3 E\nMRRMMRMRRM')
    }),
    close: jest.fn(),
  }),
}))

describe('information functions', () => {
  test('Should core information', async () => {
    expect(coreInformation()).resolves.not.toThrow
  })

  test('Should ask information', async () => {
    const mockUserInput = '5 5\n1 2 N\nLMLMLMLMM\n3 3 E\nMRRMMRMRRM'

    const readlineMock = {
      question: jest.fn().mockImplementationOnce((query, cb) => {
        cb(mockUserInput)
      }),
    }

    const result = await askInformations(readlineMock as any)

    expect(result).toBe(mockUserInput)
    expect(readlineMock.question).toHaveBeenCalledWith(
      'Please enter the string with plateau and rovers information:',
      expect.any(Function),
    )
  })

  test('Should process information', async () => {
    const scenarios = [
      { input: '5 5\n1 2 N\nLMLMLMLMM\n3 3 E\nMRRMMRMRRM' },
      { input: ' 5 5 \n 1 2 N \n LMLMLMLMM \n 3 3 E \n MRRMMRMRRM ' },
      {
        input:
          '5   5  \n   1   2  N   \n   LMLMLMLMM   \n  3  3  E  \n   MRRMMRMRRM',
      },
      { input: '5 5\n\n\n\n1 2 N\n\n\nLMLMLMLMM\n\n3 3 E\nMRRMMRMRRM' },
    ]

    for (const scenario of scenarios) {
      expect(processInformation(scenario.input)).resolves.not.toThrow
    }
  })

  test('Should throw error', async () => {
    const scenarios = [
      { input: '' },
      { input: '5 5' },
      { input: '5 5 1 2 N LMLMLMLMM 3 3 E MRRMMRMRRM' },
      { input: '5 5 \n 1 2 J \n LMASDFLMM \n 3 3 A \n MRRMGFSGMRMRRM' },
    ]

    for (const scenario of scenarios) {
      expect(processInformation(scenario.input)).rejects.toThrow()
    }
  })
})
