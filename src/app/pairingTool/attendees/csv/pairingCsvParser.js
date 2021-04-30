import Papa from 'papaparse'

const parseLanguagesFrom = (information,languages) => {
  return languages.reduce(
    (acc, value) => {
      const informationIncludesKeyword = information.toLowerCase().includes(value.toLowerCase())
      const notParsedAlready = !acc.includes(value)
      return informationIncludesKeyword && notParsedAlready
        ? [...acc, value]
        : acc
    },
    []
  )
}

const parseStudent = (entry,languages) => ({
  name: entry.Name,
  role: 'Student',
  new: entry['New attendee'] === 'true',
  tutorial: entry.Tutorial,
  notes: entry.Note,
  languages: parseLanguagesFrom(`${entry.Note} ${entry.Tutorial}`, languages)
})

const parseCoach = (entry,languages) => ({
  name: entry.Name,
  role: 'Coach',
  new: entry['New attendee'] === 'true',
  skills: entry.Skills,
  notes: entry.Note,
  languages: parseLanguagesFrom(`${entry.Note} ${entry.Skills}`, languages)
})

const parse = (csv, languages) => {
  const data = Papa.parse(csv, {header: true}).data
  const initialValue = []
  return data.reduce((acc, entry) => {
    switch (entry.Role) {
    case 'Student':
      return [...acc, parseStudent(entry, languages)]
    case 'Coach':
      return [...acc, parseCoach(entry, languages)]
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
