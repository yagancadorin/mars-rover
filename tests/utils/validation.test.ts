import { isValidInformationString } from '../../src/utils'

describe('validation functions', () => {
  test('Should validate input', () => {
    const scenarios = [
      {
        input: '5 5[NEWLINE]1 2 N[NEWLINE]LMLMLMLMM',
        output: true,
      },
      {
        input:
          '5 5[NEWLINE]1 2 N[NEWLINE]LMLMLMLMM[NEWLINE]3 3 E[NEWLINE]MRRMMRMRRM',
        output: true,
      },
      {
        input:
          '5 5[NEWLINE]1 2 N[NEWLINE]LMLMLMLMM[NEWLINE]3 3 E[NEWLINE]MRRMMRMRRM[NEWLINE]4 4 S[NEWLINE]MLRMMLMRLM',
        output: true,
      },
      {
        input: '5 5',
        output: false,
      },
      {
        input: '5 5 1 2 N LMLMLMLMM 3 3 E MRRMMRMRRM',
        output: false,
      },
      {
        input: '1 2 N[NEWLINE]LMLMLMLMM[NEWLINE]3 3 E[NEWLINE]MRRMMRMRRM',
        output: false,
      },
      {
        input:
          '5 5 [NEWLINE] 1 2 N [NEWLINE] LMLMLMLMM [NEWLINE] 3 3 E [NEWLINE] MRRMMRMRRM',
        output: false,
      },
      {
        input:
          '5 5[NEWLINE]6 6[NEWLINE]LMLMLMLMM[NEWLINE]3 3[NEWLINE]MRRMMRMRRM',
        output: false,
      },
      {
        input:
          '5 5[NEWLINE]LMLMLMLMM[NEWLINE]1 2 N[NEWLINE]MRRMMRMRRM[NEWLINE]3 3 E',
        output: false,
      },
    ]

    for (const scenario of scenarios) {
      const response: boolean = isValidInformationString(scenario.input)
      expect(response).toBe(scenario.output)
    }
  })
})
