const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('realworld', 'user', 'userpassword', {
  host: 'localhost',
  dialect: 'postgres',
  port: 54320,
  logging: false
});

async function clear() {
  await sequelize.transaction(async (transaction) => {
    await sequelize.query(
      'TRUNCATE TABLE user_followings, articles_favorites, ' +
      'article_comments, articles, ' +
      'sessions, users RESTART IDENTITY CASCADE;',
      { transaction }
    );
  });
  return null;
}

module.exports = { clear };
