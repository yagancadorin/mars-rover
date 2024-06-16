export const isValidInformationString = (input: string): boolean => {
  const regexNewLine = '\\[NEWLINE]'
  const regexPlateu = '\\d+\\s\\d+'
  const regexRoverPosition = '\\d+\\s\\d+\\s[NSEW]'
  const regexRoverInstructions = '[LRM]+'
  const regexRover = `${regexRoverPosition}${regexNewLine}${regexRoverInstructions}`
  const regexPattern = `^${regexPlateu}${regexNewLine}${regexRover}(${regexNewLine}${regexRover})*$`

  return new RegExp(regexPattern).test(input)
}
