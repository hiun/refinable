module.exports = {
  db: {
    user: ['apple', 'peach', 'banana']
  },
  find: function (table, id) {
    return this.db[table][id];
  }
}