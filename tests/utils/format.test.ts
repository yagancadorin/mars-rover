import { formatInputInformation } from '../../src/utils'
import { ECardinal, EInstruction, TInformation } from '../../src/domain'

describe('normalize functions', () => {
  test('Should format input', () => {
    const scenarios: Array<{ input: string; output: TInformation }> = [
      {
        input: '6 6\n3 4 S\nRMRMRMRMM',
        output: {
          plateauUpperRight: { maximumXAxis: 6, maximumYAxis: 6 },
          rovers: [
            {
              position: { xAxis: 3, yAxis: 4, orientation: ECardinal.S },
              instructions: [
                EInstruction.R,
                EInstruction.M,
                EInstruction.R,
                EInstruction.M,
                EInstruction.R,
                EInstruction.M,
                EInstruction.R,
                EInstruction.M,
                EInstruction.M,
              ],
            },
          ],
        },
      },
      {
        input: '5 5\n1 2 N\nLMLMLMLMM\n3 3 E\nMRRMMRMRRM',
        output: {
          plateauUpperRight: { maximumXAxis: 5, maximumYAxis: 5 },
          rovers: [
            {
              position: { xAxis: 1, yAxis: 2, orientation: ECardinal.N },
              instructions: [
                EInstruction.L,
                EInstruction.M,
                EInstruction.L,
                EInstruction.M,
                EInstruction.L,
                EInstruction.M,
                EInstruction.L,
                EInstruction.M,
                EInstruction.M,
              ],
            },
            {
              position: { xAxis: 3, yAxis: 3, orientation: ECardinal.E },
              instructions: [
                EInstruction.M,
                EInstruction.R,
                EInstruction.R,
                EInstruction.M,
                EInstruction.M,
                EInstruction.R,
                EInstruction.M,
                EInstruction.R,
                EInstruction.R,
                EInstruction.M,
              ],
            },
          ],
        },
      },
    ]

    for (const scenario of scenarios) {
      const response: TInformation = formatInputInformation(scenario.input)
      expect(response).toEqual(scenario.output)
    }
  })

  test('Should throw error', () => {
    const scenarios = [
      {
        input: '5 5',
      },
      {
        input: '5 5 1 2 N LMLMLMLMM 3 3 E MRRMMRMRRM',
      },
      {
        input: '5 5\r1 2 N\rLMLMLMLMM\r3 3 E\rMRRMMRMRRM',
      },
      {
        input: '1 2 N\nLMLMLMLMM\n3 3 E\nMRRMMRMRRM',
      },
    ]

    for (const scenario of scenarios) {
      expect(() => formatInputInformation(scenario.input)).toThrow(
        'Oops... The information provided was not as expected!',
      )
    }
  })
})
