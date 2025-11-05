import { createSlice } from '@reduxjs/toolkit'

const workspaceSlice = createSlice({
  name: 'workspace',
  initialState: {
    currentNoteContent: '',
  },
  reducers: {
    setCurrentNoteContent(state, action) {
      state.currentNoteContent = action.payload || ''
    },
    clearCurrentNoteContent(state) {
      state.currentNoteContent = ''
    },
  },
})

export const { setCurrentNoteContent, clearCurrentNoteContent } = workspaceSlice.actions
export default workspaceSlice.reducer


