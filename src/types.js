// @flow

export type ImageRecordModel = {
  id: number,
  isLocal: boolean,
  uploadProgress?: number, // from 0 to 1
  name?: string,
  file?: File | null,
  status?: 'uploaded' | 'uploading' | 'failed',
};

export type ActionSetImageUploading = {
  type: 'SET_IMAGE_UPLOADING',
  id: number,
};

export type ActionClearImageStatus = { type: 'CLEAR_IMAGE_STATUS', id: number };

export type ActionSetAuthCredentials = {
  type: 'SET_AUTH_CREDENTIALS',
  idToken: string,
  accessToken: string,
};

export type ActionFetchRemoteImages = { type: 'FETCH_REMOTE_IMAGES' };

export type ActionSetRemotePrefix = {
  type: 'SET_REMOTE_PREFIX',
  prefix: string,
};

export type ActionSetAppReady = { type: 'SET_APP_READY' };

export type ActionStartUp = { type: 'START_UP' };

export type Action =
  | { type: 'ADD_REMOTE_IMAGES', images: Array<{ name: string, id: number }> }
  | { type: 'ADD_FILES', files: Array<{ id: number, file: File }> }
  | { type: 'SET_VIEWPORT_SIZE', width: number, height: number }
  | { type: 'PUBLISH_IMAGE', id: number, file: File }
  | { type: 'HANDLE_IMAGE_PUBLISHED', id: number }
  | { type: 'HANDLE_IMAGE_UPLOAD_FAILED', id: number }
  | { type: 'SET_IMAGE_UPLOAD_PROGRESS', id: number, progress: number }
  | { type: 'SET_IMAGE_REMOTE_NAME', id: number, name: string }
  | ActionSetImageUploading
  | ActionClearImageStatus
  | ActionSetAuthCredentials
  | ActionFetchRemoteImages
  | ActionStartUp
  | ActionSetRemotePrefix
  | ActionSetAppReady;
