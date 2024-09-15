import { defineNoteConfig, defineNotesConfig } from 'vuepress-theme-plume'

const demoNote = defineNoteConfig({
  dir: 'demo',
  link: '/demo',
  sidebar: 'auto',
})

const CSSNote = defineNoteConfig({
  dir: 'CSS',
  link: '/CSS',
  sidebar: 'auto'
})
const VUENote = defineNoteConfig({
  dir: 'VUE',
  link: '/VUE',
  sidebar: 'auto'
})

export const notes = defineNotesConfig({
  dir: 'notes',
  link: '/',
  notes: [demoNote, CSSNote, VUENote],
})
