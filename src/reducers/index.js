import { combineReducers } from 'redux';
import imageRecords from './imageRecords';
import remotePrefix from './remotePrefix';
import dimensions from './dimensions';
import authentication from './authentication';
import ready from './ready';

export default combineReducers({
  imageRecords,
  remotePrefix,
  dimensions,
  ready,
  authentication,
});
