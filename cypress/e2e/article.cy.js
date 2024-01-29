/// <reference types='cypress' />
/// <reference types='../support' />

import { ArticlePageObject } from '../support/pages/article.pageObject';

describe('Article', () => {
  const articlePage = new ArticlePageObject();
  let user;
  const title = 'articleTitle';

  beforeEach(() => {
    cy.task('db:clear');
    cy.task('generateUser').then((generateUser) => {
      user = generateUser;
    });
  });

  it('should be created using New Article form', () => {
    cy.login(user.email, user.username, user.password);
    articlePage.visit();
    cy.createArticle();
    articlePage.assertCreateAnArticle(title);
  });

  it('should be edited using Edit button', () => {
    cy.login(user.email, user.username, user.password);
    cy.createArticle();
    articlePage.editArticleButton();
    articlePage.TypeNewDescription();
    articlePage.clickOnPublishButton();
    articlePage.clickOnUserNameUrl();
    articlePage.assertDescriptionChange();
  });

  it('should be deleted using Delete button', () => {
    cy.login(user.email, user.username, user.password);
    cy.createArticle();
    articlePage.clickOnDeleteArticleButton();
    articlePage.assertDeteledArticle();
  });
});
