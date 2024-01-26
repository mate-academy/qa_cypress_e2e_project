/* eslint-disable no-unused-vars */
/// <reference types='cypress' />
/// <reference types='../support' />

import ArticlePageObject from '../support/pages/article.pageObject';

const articlePage = new ArticlePageObject();

describe('User', () => {
  let article;
  let slug;
  let user;

  beforeEach(() => {
    cy.task('db:clear');
    cy.task('generateArticle').then((generateArticle) => {
      article = generateArticle;
      cy.createArticle(article.title, article.description, article.body)
        .then((response) => {
          slug = response.body.article.slug;
        });
    });
    cy.task('generateUser').then((generateUser) => {
      user = generateUser;
      cy.login(user.email, user.username, user.password)
        .then(() => {
          cy.visit(`/#/articles/${slug}`);
        });
    });
  });

  it('should be able to follow another user', () => {
    articlePage.clickFollowBtn();
    articlePage.unfollowBtn.should('exist');
  });

  it('should be able to unfollow another user', () => {
    articlePage.clickFollowBtn();
    articlePage.unfollowBtn.should('exist');
    articlePage.clickUnfollowBtn();
    articlePage.followBtn.should('exist');
  });
});
