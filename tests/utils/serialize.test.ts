import { serializeRoverPosition } from '../../src/utils'
import { ECardinal, IRoverPosition } from '../../src/domain'

describe('serialize functions', () => {
  test('Should serialize input', () => {
    const scenarios: Array<{ input: IRoverPosition; output: string }> = [
      {
        input: {
          xAxis: 1,
          yAxis: 2,
          orientation: ECardinal.N,
        },
        output: '1 2 N',
      },
      {
        input: {
          xAxis: 22,
          yAxis: 33,
          orientation: ECardinal.S,
        },
        output: '22 33 S',
      },
    ]

    for (const scenario of scenarios) {
      const response: string = serializeRoverPosition(scenario.input)
      expect(response).toEqual(scenario.output)
    }
  })
})
