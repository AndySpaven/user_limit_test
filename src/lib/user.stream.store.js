export default () => {
  const db = {};

  return {
    exists(name) {
      return Object.keys(db).includes(name);
    },
    purge() {
      Object.keys(db).forEach((key) => {
        delete db[key];
      });
    },
    findUser(name) {
      if (this.exists(name)) {
        return db[name];
      }
      return null;
    },
    addStreamToUser({ name, id }) {
      if (this.exists(name)) {
        db[name].push(id);
      } else {
        db[name] = [id];
      }
    },

    removeStreamFromUser({ name, id }) {
      if (this.exists(name) && db[name].includes(id)) {
        const existing = db[name];

        if (existing.length === 1) {
          delete db[name];
        } else {
          const idx = existing.findIndex(i => i === id);
          existing.splice(idx, 1);
          db[name] = existing;
        }
      }
    },
  };
};
