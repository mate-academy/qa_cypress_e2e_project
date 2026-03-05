const { Sequelize } = require('sequelize');

const sequilize = new Sequelize('realworld', 'user', 'userpassword', {
  host: 'localhost',
  dialect: 'postgres',
  port: 54320
});

async function clear() {
  const t = await sequilize.transaction();

  try {
    await sequilize.query('DELETE FROM user_follows;');
    await sequilize.query('DELETE FROM articles_favorites;');
    await sequilize.query('DELETE FROM articles;');
    await sequilize.query('DELETE FROM article_comments;');
    await sequilize.query('DELETE FROM sessions;');
    await sequilize.query('DELETE FROM users;');

    await t.commit();

    // eslint-disable-next-line no-console
    console.log('DB was cleared');
  } catch (error) {
    await t.rollback();
    // eslint-disable-next-line no-console
    console.log(`Can't clear DB`);
  }
}

module.exports = { clear };
