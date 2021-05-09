import pairingCsvParser from './pairingCsvParser'

describe('Pairing CSV parser', () => {
  const languageDetectionRules = [
    {name: 'HTML', alias: [], exclusions: [] },
    {name: 'Python', alias: [], exclusions: [] },
    {name: 'Java', alias: [], exclusions: ['javascript'] },
    {name: 'JS', alias: ['javascript', 'typescript'], exclusions: [] }
  ]

  describe('Parsing Students', () => {
    const csv = 'New attendee,Name,Role,Tutorial,Note,Skills\n' +
      'false,Jennifer Jolie (she),Student,JS: Building your own app,"I am learning HTML, CSS and Javascript",N/A\n'
    const student = (pairingCsvParser.parse(csv, languageDetectionRules))[0]

    it('copies the available information', () => {
      expect(student).toMatchObject({
        name: 'Jennifer Jolie (she)',
        role: 'Student',
        new: false,
        tutorial: 'JS: Building your own app',
        notes: 'I am learning HTML, CSS and Javascript'
      })
    })

    it('detects the language from the tutorial', () => {
      expect(student.languages).toContain('JS')
    })

    it('detects the languages from the notes', () => {
      expect(student.languages).toContain('HTML')
    })

    it('do not match exclusions from the configuration', () => {
      expect(student.languages).not.toContain('Java')
    })
  })

  describe('Parsing Coaches', () => {
    const csv = 'New attendee,Name,Role,Tutorial,Note,Skills\n' +
      'false,Andrew Dicaprio (he),Coach,N/A,"Git or Python would be good for me to do pair.","heroku, ruby, Test, nodejs, javascript, docker, testing, TDD, java, shellscript, deploy"\n'
    const coach = (pairingCsvParser.parse(csv, languageDetectionRules))[0]

    it('copies the available information', () => {
      expect(coach).toMatchObject({
        name: 'Andrew Dicaprio (he)',
        role: 'Coach',
        new: false,
        notes: 'Git or Python would be good for me to do pair.',
        skills: 'heroku, ruby, Test, nodejs, javascript, docker, testing, TDD, java, shellscript, deploy'
      })
    })

    it('detects the languages from the notes', () => {
      expect(coach.languages).toContain('Python')
    })

    it('detects the languages from the skills', () => {
      expect(coach.languages).toContain('JS')
      expect(coach.languages).toContain('Java')
    })
  })

})
