import Papa from 'papaparse'

const parseLanguagesFrom = (information,languageDetectionRules) => {
  return languageDetectionRules.reduce(
    (matchedLanguages, languageRules) => {
      const language = languageRules.name
      const includes = [...languageRules.alias.map(x => x.toLowerCase()), language.toLowerCase()]
      const excludes = languageRules.exclusions.map(x => x.toLowerCase())
      const wordsForDetection = information.toLowerCase().split(' ')

      const notParsedAlready = !matchedLanguages.includes(language)
      const matchIncludesAndNotExcludes = wordsForDetection.reduce((match, word) => {
        const matchIncludes = includes.some(keyword => word.includes(keyword))
        const dontMatchExcludes = excludes.every(keyword => !word.includes(keyword))
        return match || (matchIncludes && dontMatchExcludes)
      }, false)

      return notParsedAlready && matchIncludesAndNotExcludes ? [...matchedLanguages, language] : matchedLanguages
    },
    []
  )
}

const parseStudent = (entry,languageDetectionRules) => ({
  name: entry.Name,
  role: 'Student',
  new: entry['New attendee'] === 'true',
  tutorial: entry.Tutorial,
  notes: entry.Note,
  languages: parseLanguagesFrom(`${entry.Note} ${entry.Tutorial}`, languageDetectionRules)
})

const parseCoach = (entry,languageDetectionRules) => ({
  name: entry.Name,
  role: 'Coach',
  new: entry['New attendee'] === 'true',
  skills: entry.Skills,
  notes: entry.Note,
  languages: parseLanguagesFrom(`${entry.Note} ${entry.Skills}`, languageDetectionRules)
})

const parse = (csv, languageDetectionRules) => {
  const data = Papa.parse(csv, {header: true}).data
  const initialValue = []
  return data.reduce((acc, entry) => {
    switch (entry.Role) {
    case 'Student':
      return [...acc, parseStudent(entry, languageDetectionRules)]
    case 'Coach':
      return [...acc, parseCoach(entry, languageDetectionRules)]
    default:
      return acc
    }
  },
  initialValue
  )
}

const pairingCsvParser = {
  parse
}

export default pairingCsvParser
