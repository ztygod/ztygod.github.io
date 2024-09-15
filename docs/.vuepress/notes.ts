import { defineNoteConfig, defineNotesConfig } from 'vuepress-theme-plume'

const Note = defineNoteConfig({
  dir: '前端面试题',
  link: '/note',
  sidebar: 'auto'
})

export const notes = defineNotesConfig({
  dir: 'notes',
  link: '/',
  notes: [Note],
})
