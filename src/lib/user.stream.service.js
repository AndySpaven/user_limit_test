import {
  findUser,
  addStreamToUser,
  removeStreamFromUser,
} from './user.stream.store';

const hasMaxStreamsOpen = (name) => {
  const existing = findUser(name);
  return existing && existing.length >= 3;
};

export const canOpenMoreStreams = name => !hasMaxStreamsOpen(name);

export const startStreaming = ({ name, id }) => {
  if (canOpenMoreStreams(name)) {
    addStreamToUser({ name, id });
    return true;
  }
  return false;
};

export const stopStreaming = ({ name, id }) => {
  removeStreamFromUser({ name, id });
};
