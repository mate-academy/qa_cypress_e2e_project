/// <reference types='cypress' />
/// <reference types='../support' />

import ArticleEditPageObject from '../support/pages/articleEdit.pageObject';
import ArticlePageObject from '../support/pages/article.pageObject';

const editPage = new ArticleEditPageObject();
const articlePage = new ArticlePageObject();

const { faker } = require('@faker-js/faker');

describe('Article', () => {
  let user;

  const articleData = {
    title: faker.lorem.word(),
    about: faker.lorem.sentence(),
    mainContent: faker.lorem.sentence()
  };

  const changedArticleData = {
    title: faker.lorem.word(),
    about: faker.lorem.sentence(),
    mainContent: faker.lorem.sentence()
  };

  before(() => {
    cy.task('db:clear');
    cy.task('generateUser').then((generateUser) => {
      user = generateUser;
      cy.register(user.email, user.username, user.password);
    });
  });

  beforeEach(() => {
    cy.login(user.email, user.username, user.password);
  });

  it('should be created using New Article form', () => {
    editPage.visit();

    editPage.fillArticleTitleField(articleData.title);
    editPage.fillArticleAboutField(articleData.about);
    editPage.fillWriteArticleTextarea(articleData.mainContent);
    editPage.clickPublishArticleBtn();

    articlePage.visit(articleData.title);
    articlePage.assertTitleName(articleData.title);
  });

  it('should be edited using Edit button', () => {
    articlePage.visit(articleData.title);
    articlePage.clickEditBtn();

    editPage.clearArticleTitleField();
    editPage.clearArticleAboutField();
    editPage.clearWriteArticleField();

    editPage.fillArticleTitleField(changedArticleData.title);
    editPage.fillArticleAboutField(changedArticleData.about);
    editPage.fillWriteArticleTextarea(changedArticleData.mainContent);
    editPage.clickPublishArticleBtn();

    articlePage.visit(changedArticleData.title);
    articlePage.assertTitleName(changedArticleData.title);
  });

  it('should be deleted using Delete button', () => {
    articlePage.visit(articleData.title);
    articlePage.clickDeleteBtn();

    articlePage.visit(articleData.title);
    cy.get(articleData.title).should('not.exist');
  });
});
