import { normalizedInputInformation } from '../../src/utils'

describe('normalize functions', () => {
  test('Should normalize input information', () => {
    const scenarios = [
      {
        input: '5 5\n1 2 N\nLMLMLMLMM\n3 3 E\nMRRMMRMRRM',
        output:
          '5 5[NEWLINE]1 2 N[NEWLINE]LMLMLMLMM[NEWLINE]3 3 E[NEWLINE]MRRMMRMRRM',
      },
      {
        input: ' 5 5 \n 1 2 N \n LMLMLMLMM \n 3 3 E \n MRRMMRMRRM ',
        output:
          '5 5[NEWLINE]1 2 N[NEWLINE]LMLMLMLMM[NEWLINE]3 3 E[NEWLINE]MRRMMRMRRM',
      },
      {
        input:
          '5   5  \n   1   2  N   \n   LMLMLMLMM   \n  3  3  E  \n   MRRMMRMRRM',
        output:
          '5 5[NEWLINE]1 2 N[NEWLINE]LMLMLMLMM[NEWLINE]3 3 E[NEWLINE]MRRMMRMRRM',
      },
      {
        input: '5 5\n\n\n\n1 2 N\n\n\nLMLMLMLMM\n\n3 3 E\nMRRMMRMRRM',
        output:
          '5 5[NEWLINE]1 2 N[NEWLINE]LMLMLMLMM[NEWLINE]3 3 E[NEWLINE]MRRMMRMRRM',
      },
    ]

    for (const scenario of scenarios) {
      const response: string = normalizedInputInformation(scenario.input)
      expect(response).toEqual(scenario.output)
    }
  })
})
