/* eslint-disable max-len */
/// <reference types='cypress' />
/// <reference types='../support' />

import ArticlePageObject from '../support/pages/article.pageObject';

const articlePage = new ArticlePageObject();

describe('User', () => {
  let user1;
  let user2;
  let article;

  before(() => {
    cy.task('db:clear');
    cy.task('generateUser').then((generateUser) => {
      user1 = generateUser;
    });
    cy.task('generateUser').then((generateUser) => {
      user2 = generateUser;
    });
    cy.task('generateArticle').then((generateArticle) => {
      article = generateArticle;
    });
  });

  beforeEach(() => {
    cy.loginAndRegister(user1.email, user1.username, user1.password);
  });

  it('should be able to follow the another user', () => {
    const { title, description, body } = article;
    cy.get('@newUser').then((createdUser) => {
      articlePage.createArticleAndRedirect(createdUser.id, title, description, body);
    });

    cy.loginAndRegister(user2.email, user2.username, user2.password);
    cy.reload();
    // eslint-disable-next-line cypress/no-unnecessary-waiting
    cy.wait(4000);

    articlePage.clickOnFollowBtn();
    articlePage.assertFollow();
  });
});
