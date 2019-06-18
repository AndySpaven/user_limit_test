export default store => ({
  hasMaxStreamsOpen(name) {
    const existing = store.findUser(name);
    return existing && existing.length >= 3;
  },

  canOpenMoreStreams(name) {
    return !this.hasMaxStreamsOpen(name);
  },

  startStreaming({ name, id }) {
    if (this.canOpenMoreStreams(name)) {
      store.addStreamToUser({ name, id });
      return true;
    }
    return false;
  },

  stopStreaming({ name, id }) {
    store.removeStreamFromUser({ name, id });
  },
});
