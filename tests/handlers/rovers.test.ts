import {
  IPlateau,
  IRover,
  IRoverPosition,
  TCoordinates,
  TInstruction,
  TRotationInstruction,
} from '../../src/domain'
import {
  calculateRoverMovement,
  calculateRoverRotation,
  checkRoverPosition,
  processRoverInstructions,
  processRovers,
} from '../../src/handlers'

describe('rovers functions', () => {
  test('Should process rovers', async () => {
    const plateau = {
      maximumXAxis: 5,
      maximumYAxis: 5,
    } as IPlateau

    const rovers = [
      {
        position: { xAxis: 1, yAxis: 2, orientation: 'N' },
        instructions: ['L', 'M', 'L', 'M', 'L', 'M', 'L', 'M', 'M'],
      } as IRover,
      {
        position: { xAxis: 2, yAxis: 3, orientation: 'S' },
        instructions: ['M', 'R', 'R', 'M', 'M', 'R', 'M', 'R', 'R', 'M'],
      } as IRover,
    ] as IRover[]

    expect(processRovers(plateau, rovers)).resolves.not.toThrow
  })

  test('Should throw error on process rovers', async () => {
    const plateau = {
      maximumXAxis: 5,
      maximumYAxis: 5,
    } as IPlateau

    const scenarios = [
      {
        input: {
          rovers: [
            {
              position: {},
              instructions: ['L', 'M', 'L', 'M', 'L', 'M', 'L', 'M', 'M'],
            } as IRover,
          ] as IRover[],
        },
        output: 'Oops... The rover position was not detected!',
      },
      {
        input: {
          rovers: [
            {
              position: { xAxis: 1, yAxis: 2, orientation: 'N' },
              instructions: [],
            } as IRover,
          ] as IRover[],
        },
        output: 'Oops... The instructions for Rover[1] were not detected!',
      },
    ]

    for (const scenario of scenarios) {
      await expect(
        processRovers(plateau, scenario.input.rovers),
      ).rejects.toThrow(scenario.output)
    }
  })

  test('Should process rover instructions', async () => {
    const scenarios = [
      {
        input: {
          plateau: {
            maximumXAxis: 5,
            maximumYAxis: 5,
          } as IPlateau,
          position: {
            xAxis: 1,
            yAxis: 2,
            orientation: 'N',
          } as IRoverPosition,
          instructions: [
            'L',
            'M',
            'L',
            'M',
            'L',
            'M',
            'L',
            'M',
            'M',
          ] as TInstruction[],
        },
        output: {
          xAxis: 1,
          yAxis: 3,
          orientation: 'N',
        } as IRoverPosition,
      },
      {
        input: {
          plateau: {
            maximumXAxis: 5,
            maximumYAxis: 5,
          } as IPlateau,
          position: {
            xAxis: 3,
            yAxis: 3,
            orientation: 'E',
          } as IRoverPosition,
          instructions: [
            'M',
            'R',
            'R',
            'M',
            'M',
            'R',
            'M',
            'R',
            'R',
            'M',
          ] as TInstruction[],
        },
        output: {
          xAxis: 2,
          yAxis: 3,
          orientation: 'S',
        } as IRoverPosition,
      },
    ]

    for (const scenario of scenarios) {
      const response = await processRoverInstructions(
        scenario.input.plateau,
        scenario.input.position,
        scenario.input.instructions,
      )
      expect(response).toEqual(scenario.output)
    }
  })

  test('Should calculate rover rotation', async () => {
    const scenarios = [
      {
        input: {
          roverPosition: {
            xAxis: 2,
            yAxis: 2,
            orientation: 'W',
          } as IRoverPosition,
          command: 'L' as TRotationInstruction,
        },
        output: 'S' as TRotationInstruction,
      },
      {
        input: {
          roverPosition: {
            xAxis: 2,
            yAxis: 2,
            orientation: 'W',
          } as IRoverPosition,
          command: 'R' as TRotationInstruction,
        },
        output: 'N' as TRotationInstruction,
      },
      {
        input: {
          roverPosition: {
            xAxis: 2,
            yAxis: 2,
            orientation: 'E',
          } as IRoverPosition,
          command: 'L' as TRotationInstruction,
        },
        output: 'N' as TRotationInstruction,
      },
      {
        input: {
          roverPosition: {
            xAxis: 2,
            yAxis: 2,
            orientation: 'E',
          } as IRoverPosition,
          command: 'R' as TRotationInstruction,
        },
        output: 'S' as TRotationInstruction,
      },
      {
        input: {
          roverPosition: {
            xAxis: 2,
            yAxis: 2,
            orientation: 'S',
          } as IRoverPosition,
          command: 'L' as TRotationInstruction,
        },
        output: 'E' as TRotationInstruction,
      },
      {
        input: {
          roverPosition: {
            xAxis: 2,
            yAxis: 2,
            orientation: 'S',
          } as IRoverPosition,
          command: 'R' as TRotationInstruction,
        },
        output: 'W' as TRotationInstruction,
      },
      {
        input: {
          roverPosition: {
            xAxis: 2,
            yAxis: 2,
            orientation: 'N',
          } as IRoverPosition,
          command: 'L' as TRotationInstruction,
        },
        output: 'W' as TRotationInstruction,
      },
      {
        input: {
          roverPosition: {
            xAxis: 2,
            yAxis: 2,
            orientation: 'N',
          } as IRoverPosition,
          command: 'R' as TRotationInstruction,
        },
        output: 'E' as TRotationInstruction,
      },
    ]

    for (const scenario of scenarios) {
      const response = await calculateRoverRotation(
        scenario.input.roverPosition,
        scenario.input.command,
      )
      expect(response).toEqual(scenario.output)
    }
  })

  test('Should throw error on calculate rover rotation', async () => {
    const roverPosition = {
      xAxis: 3,
      yAxis: 4,
      orientation: 'W',
    } as IRoverPosition

    const command = 'E' as unknown as TRotationInstruction

    const output = 'Oops... The rotation was not found!'

    expect(calculateRoverRotation(roverPosition, command)).rejects.toThrow(
      output,
    )
  })

  test('Should calculate rover movement', async () => {
    const scenarios = [
      {
        input: {
          xAxis: 2,
          yAxis: 2,
          orientation: 'W',
        } as IRoverPosition,
        output: {
          xAxis: 1,
          yAxis: 2,
        } as TCoordinates,
      },
      {
        input: {
          xAxis: 2,
          yAxis: 2,
          orientation: 'S',
        } as IRoverPosition,
        output: {
          xAxis: 2,
          yAxis: 1,
        } as TCoordinates,
      },
      {
        input: {
          xAxis: 2,
          yAxis: 2,
          orientation: 'E',
        } as IRoverPosition,
        output: {
          xAxis: 3,
          yAxis: 2,
        } as TCoordinates,
      },
      {
        input: {
          xAxis: 2,
          yAxis: 2,
          orientation: 'N',
        } as IRoverPosition,
        output: {
          xAxis: 2,
          yAxis: 3,
        } as TCoordinates,
      },
    ]

    for (const scenario of scenarios) {
      const response = await calculateRoverMovement(scenario.input)
      expect(response).toEqual(scenario.output)
    }
  })

  test('Should throw error on calculate rover movement', async () => {
    const input = {
      xAxis: 3,
      yAxis: 4,
      orientation: 'J',
    } as unknown as IRoverPosition

    const output = 'Oops... The movement was not found!'

    expect(calculateRoverMovement(input)).rejects.toThrow(output)
  })

  test('Should check wrong rover position', async () => {
    const scenarios = [
      {
        input: {
          plateau: {} as IPlateau,
          roverPosition: {
            xAxis: 6,
            yAxis: 2,
            orientation: 'E',
          } as IRoverPosition,
        },
        output: 'Oops... The plateu or rover position was not found!',
      },
      {
        input: {
          plateau: {
            maximumXAxis: 5,
            maximumYAxis: 5,
          } as IPlateau,
          roverPosition: {} as IRoverPosition,
        },
        output: 'Oops... The plateu or rover position was not found!',
      },
      {
        input: {
          plateau: {
            maximumXAxis: 5,
            maximumYAxis: 5,
          } as IPlateau,
          roverPosition: {
            xAxis: 6,
            yAxis: 2,
            orientation: 'E',
          } as IRoverPosition,
        },
        output: 'Oops... The rover is outside the plateau!',
      },
      {
        input: {
          plateau: {
            maximumXAxis: 5,
            maximumYAxis: 5,
          } as IPlateau,
          roverPosition: {
            xAxis: 2,
            yAxis: 8,
            orientation: 'E',
          } as IRoverPosition,
        },
        output: 'Oops... The rover is outside the plateau!',
      },
      {
        input: {
          plateau: {
            maximumXAxis: 5,
            maximumYAxis: 5,
          } as IPlateau,
          roverPosition: {
            xAxis: -1,
            yAxis: 2,
            orientation: 'E',
          } as IRoverPosition,
        },
        output: 'Oops... The rover is outside the plateau!',
      },
      {
        input: {
          plateau: {
            maximumXAxis: 5,
            maximumYAxis: 5,
          } as IPlateau,
          roverPosition: {
            xAxis: 2,
            yAxis: -2,
            orientation: 'E',
          } as IRoverPosition,
        },
        output: 'Oops... The rover is outside the plateau!',
      },
    ]

    for (const scenario of scenarios) {
      await expect(
        checkRoverPosition(
          scenario.input.plateau,
          scenario.input.roverPosition,
        ),
      ).rejects.toThrow(scenario.output)
    }
  })
})
