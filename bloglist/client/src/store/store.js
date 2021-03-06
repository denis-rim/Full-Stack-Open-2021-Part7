import thunk from 'redux-thunk'
import { createStore, applyMiddleware, combineReducers } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import { notificationReducer } from './reducers/notificationReducer'
import { blogsReducer } from './reducers/blogsReducer'
import { loginReducer } from './reducers/loginReducer'
import { usersReducer } from './reducers/usersReducer'

const rootReducer = combineReducers({
  notification: notificationReducer,
  blogs: blogsReducer,
  user: loginReducer,
  users: usersReducer,
})

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
)

export default store
