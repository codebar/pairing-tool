const Papa = require('papaparse')

// TODO: This should be coming from configuration
const commonLanguages = ['HTML', 'CSS', 'JS', 'Python', 'Ruby', 'SQL', 'Java']

const parseLanguagesFrom = information => commonLanguages.reduce(
  (acc, value) => information.toLowerCase().includes(value.toLowerCase()) && !acc.includes(value)
    ? [...acc, value]
    : acc,
  []
)

const parseStudent = entry => ({
  name: entry.Name,
  role: 'Student',
  new: entry['New attendee'] === 'true',
  tutorial: entry.Tutorial,
  notes: entry.Note,
  languages: parseLanguagesFrom(`${entry.Note} ${entry.Tutorial}`)
})

const parseCoach = entry => ({
  name: entry.Name,
  role: 'Coach',
  new: entry['New attendee'] === 'true',
  skills: entry.Skills,
  notes: entry.Note,
  languages: parseLanguagesFrom(`${entry.Note} ${entry.Skills}`)
})

const parse = csv => {
  const data = Papa.parse(csv, {header: true}).data
  const initialValue = []
  return data.reduce((acc, entry) => {
      switch (entry.Role) {
        case 'Student':
          return [...acc, parseStudent(entry)]
        case 'Coach':
          return [...acc, parseCoach(entry)]
        default:
          return acc
      }
    },
    initialValue
  )
}

module.exports = { parse }
