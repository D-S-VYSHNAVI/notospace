import { configureStore } from '@reduxjs/toolkit'
import templatesReducer from './templatesSlice'
import workspaceReducer from './workspaceSlice'

export const store = configureStore({
  reducer: {
    templates: templatesReducer,
    workspace: workspaceReducer,
  },
})


