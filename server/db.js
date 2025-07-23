const { Sequelize } = require('sequelize');

const sequilize = new Sequelize('realworld', 'user', 'userpassword', {
  host: 'localhost',
  dialect: 'postgres',
  port: 54320
});

async function clear() {
  const t = await sequilize.transaction();

  try {
    await sequilize.query('DELETE FROM articles;');
    await sequilize.query('DELETE FROM article_comments;');
    await sequilize.query('DELETE FROM sessions;');
    await sequilize.query('DELETE FROM users;');

    await t.commit();
  } catch (error) {
    await t.rollback();
  }
}

module.exports = { clear };
