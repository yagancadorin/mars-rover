export const normalizedInputInformation = (input: string): string => {
  const cleanWhitespacesAndNewLines = input
    .split(/\\n|\n/)
    .map((line: string) => line.trim().split(/\s+/).join(' '))
    .filter((line: string) => line.length > 0)
    .join('[NEWLINE]')

  return cleanWhitespacesAndNewLines.toString()
}
