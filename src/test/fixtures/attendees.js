import { initialState as configuration } from '../../app/configuration/configurationSlice'
import { featureToggles as toggles } from '../../config/featureToggles'

export const student = {
  id: 1,
  attendance: false,
  name: 'Darth Maul',
  role: 'Student',
  'new': false,
  tutorial: 'JS: Beginning JavaScript',
  notes: 'Good programming practice, interested in learning how to make code efficient',
  languages: ['JS', 'Java']
}

export const coach = {
  id: 2,
  attendance: false,
  name: 'Han Solo',
  role: 'Coach',
  'new': false,
  skills: '',
  notes: 'Junior developer, can help with HTML/CSS, JavaScript, React, Express, MongoDB',
  languages: ['HTML', 'CSS', 'Java']
}

export const stateAfterParsingCsv = {
  toggles,
  configuration,
  attendees: {
    list: [
      {
        id: 1,
        attendance: false,
        name: 'Darth Maul',
        role: 'Student',
        'new': false,
        tutorial: 'JS: Beginning JavaScript',
        notes: 'Good programming practice, interested in learning how to make code efficient',
        languages: ['JS', 'Java']
      },
      {
        id: 2,
        attendance: false,
        name: 'Han Solo',
        role: 'Coach',
        'new': false,
        skills: '',
        notes: 'Junior developer, can help with HTML/CSS, JavaScript, React, Express, MongoDB',
        languages: ['HTML', 'CSS', 'Java']
      },
      {
        id: 3,
        attendance: false,
        name: 'General Grievous',
        role: 'Student',
        'new': true,
        tutorial: 'JS: Introduction to Testing',
        notes: 'Notes',
        languages: ['JS']
      },
      {
        id: 4,
        attendance: false,
        name: 'Yoda',
        role: 'Coach',
        'new': false,
        skills: '',
        notes: 'I am a Junior. I can attend as a coach for beginners and also as a student',
        languages: []
      },
      {
        id: 5,
        attendance: false,
        name: 'Chewbacca',
        role: 'Student',
        'new': true,
        tutorial: 'Python',
        notes: 'Python or SQL works for me :)',
        languages: ['Python', 'SQL']
      },
      {
        id: 6,
        attendance: false,
        name: 'Darth Vader',
        role: 'Coach',
        'new': false,
        skills: '',
        notes: 'I can help with anything related to js, know some java too but am a little rusty. ',
        languages: ['JS', 'Java']
      },
      {
        id: 7,
        attendance: false,
        name: 'Princess Leia',
        role: 'Student',
        'new': false,
        tutorial: 'JavaScript Project',
        notes: 'I\'m starting to learn Javascript and I\'m doing my first form validation. I need to solve doubts ;)',
        languages: ['Java']
      },
      {
        id: 8,
        attendance: false,
        name: 'Obi-wan Kenobi',
        role: 'Coach',
        'new': false,
        skills: 'heroku, ruby, Test, nodejs, javascript, docker, testing, java, TDD, shellscript, deploy',
        notes: '',
        languages: ['JS', 'Ruby', 'Java']
      },
      {
        id: 9,
        attendance: false,
        name: 'Sebulba',
        role: 'Student',
        'new': false,
        tutorial: 'JS: HTTP Requests, AJAX and APIs',
        notes: 'Notes',
        languages: ['JS']
      },
      {id: 10, attendance: false, name: 'C-3PO', role: 'Coach', 'new': false, skills: '', notes: '', languages: []},
      {
        id: 11,
        attendance: false,
        name: 'Jar jar bins',
        role: 'Student',
        'new': false,
        tutorial: 'Other',
        notes: 'I need help learning media queries and flexbox.',
        languages: ['Other']
      },
      {
        id: 12,
        attendance: false,
        name: 'Padmé Amidala',
        role: 'Coach',
        'new': true,
        skills: 'spring, backend development, etc., java, AWS',
        notes: '',
        languages: ['Java']
      },
      {
        id: 13,
        attendance: false,
        name: 'Boba Fett',
        role: 'Student',
        'new': false,
        tutorial: 'JS: Introduction to Testing',
        notes: 'I\'d like to work refactoring and testing a JS project that I\'ve been working on',
        languages: ['JS']
      },
      {
        id: 14,
        attendance: false,
        name: 'Admiral Ackbar',
        role: 'Coach',
        'new': false,
        skills: 'kotlin, python, Go, java',
        notes: '',
        languages: ['Python', 'Java']
      },
      {
        id: 15,
        attendance: false,
        name: 'Luke Skywalker',
        role: 'Student',
        'new': false,
        tutorial: 'JS: Beginning JavaScript',
        notes: 'Notes',
        languages: ['JS', 'Java']
      },
      {
        id: 16,
        attendance: false,
        name: 'R2-D2',
        role: 'Coach',
        'new': true,
        skills: 'Scala, javascript, java',
        notes: '',
        languages: ['Java']
      }
    ],
    nextId: 17,
    readyForPairing: false
  },
  pairings: {
    students: [],
    coaches: []
  }
}
