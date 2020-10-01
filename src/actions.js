// @flow

import type {
  Action,
  ActionSetImageUploading,
  ActionClearImageStatus,
  ActionFetchRemoteImages,
  ActionSetRemotePrefix,
  ActionSetAppReady,
  ActionStartUp,
  ActionSetAuthCredentials,
} from './types';

let imageId = 0;

export const fetchRemoteImages = (): ActionFetchRemoteImages => ({
  type: 'FETCH_REMOTE_IMAGES',
});

export const setAuthCredentials = (
  idToken: string,
  accessToken: string,
): ActionSetAuthCredentials => ({
  type: 'SET_AUTH_CREDENTIALS',
  idToken,
  accessToken,
});

export const setAppReady = (): ActionSetAppReady => ({
  type: 'SET_APP_READY',
});

export const setRemotePrefix = (prefix: string): ActionSetRemotePrefix => ({
  type: 'SET_REMOTE_PREFIX',
  prefix,
});

export const startUp = (): ActionStartUp => ({
  type: 'START_UP',
});

export const addRemoteImages = (names: string[]): Action => ({
  type: 'ADD_REMOTE_IMAGES',
  images: names.map((name) => {
    imageId += 1;
    return { id: imageId, name };
  }),
});

export const addFiles = (files: File[]): Action => ({
  type: 'ADD_FILES',
  files: files.map((file) => {
    imageId += 1;
    return { id: imageId, file };
  }),
});

export const publishImage = (id: number, file: File): Action => ({
  type: 'PUBLISH_IMAGE',
  file,
  id,
});

export const handleImagePublished = (id: number): Action => ({
  type: 'HANDLE_IMAGE_PUBLISHED',
  id,
});

export const setImageRemoteName = (id: number, name: string): Action => ({
  type: 'SET_IMAGE_REMOTE_NAME',
  id,
  name,
});

export const setImageUploadProgress = (
  id: number,
  progress: number,
): Action => ({
  type: 'SET_IMAGE_UPLOAD_PROGRESS',
  id,
  progress,
});

export const handleImageUploadFailed = (id: number): Action => ({
  type: 'HANDLE_IMAGE_UPLOAD_FAILED',
  id,
});

export const setImageUploading = (id: number): ActionSetImageUploading => ({
  type: 'SET_IMAGE_UPLOADING',
  id,
});

export const clearImageStatus = (id: number): ActionClearImageStatus => ({
  type: 'CLEAR_IMAGE_STATUS',
  id,
});

export const setViewportSize = (width: number, height: number): Action => ({
  type: 'SET_VIEWPORT_SIZE',
  width,
  height,
});
