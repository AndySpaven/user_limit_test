const db = {};

function exists(name) {
  return Object.keys(db).includes(name);
}
export const purge = () => {
  Object.keys(db).forEach((key) => {
    delete db[key];
  });
};

export const findUser = (name) => {
  if (exists(name)) {
    return db[name];
  }
  return null;
};

export const addStreamToUser = ({ name, id }) => {
  if (exists(name)) {
    db[name].push(id);
  } else {
    db[name] = [id];
  }
};

export const removeStreamFromUser = ({ name, id }) => {
  if (exists(name) && db[name].includes(id)) {
    const existing = db[name];

    if (existing.length === 1) {
      delete db[name];
    } else {
      console.log(`before: ${existing}`);
      const idx = existing.findIndex(i => i === id);
      existing.splice(idx, 1);
      db[name] = existing;
      console.log(`after: ${db[name]}`);
    }
  }
};
