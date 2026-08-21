const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('realworld', 'user', 'userpassword', {
  host: '127.0.0.1',
  dialect: 'postgres',
  port: 54320,
  logging: false
});

async function clear() {
  const transaction = await sequelize.transaction();

  try {
    await sequelize.query('DELETE FROM article_comments;', { transaction });
    await sequelize.query('DELETE FROM articles_favorites;', { transaction });
    await sequelize.query('DELETE FROM articles;', { transaction });
    await sequelize.query('DELETE FROM sessions;', { transaction });
    await sequelize.query('DELETE FROM users;', { transaction });
    await transaction.commit();
  } catch (error) {
    await transaction.rollback();
    throw error;
  }
}

module.exports = { clear };
