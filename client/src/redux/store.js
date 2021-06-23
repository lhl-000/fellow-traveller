import { createStore, applyMiddleware } from 'redux'
// import reducer from './reducers'
import reducer from './reducers/people';
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

export default createStore(reducer, composeWithDevTools(applyMiddleware(thunk)));