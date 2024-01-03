const { Sequelize } = require('sequelize');

const sequilize = new Sequelize({
  dialect: 'sqlite',
  storage: './db.sqlite3'
});

async function clear() {
  const t = await sequilize.transaction();

  try {
    await sequilize.query('DELETE FROM Article;');
    await sequilize.query('DELETE FROM User;');
    await sequilize.query('DELETE FROM Tag;');
    await sequilize.query('DELETE FROM ArticleTag;');
    await sequilize.query('DELETE FROM UserFollowUser;');
    await sequilize.query('DELETE FROM UserFavoriteArticle;');
    await sequilize.query('DELETE FROM Comment;');

    await t.commit();

    console.log('DB was cleared');
  } catch (error) {
    await t.rollback();

    console.log(`Can't clear DB`);
  }
}

module.exports = { clear };
