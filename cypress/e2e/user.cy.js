/// <reference types='cypress' />
/// <reference types='../support' />

import ArticlePageObject from '../support/pages/article.pageObject';

const articlePage = new ArticlePageObject();

describe('User', () => {
  let user;
  let article;
  let slug;

  before(() => {
    cy.task('db:clear');
  });

  beforeEach(() => {
    cy.task('generateUser').then((generateUser) => {
      user = generateUser;
    });
    cy.task('generateArticle').then((generateArticle) => {
      article = generateArticle;
    });
  });

  it('should be able to follow the another user', () => {
    cy.createArticle(article.title, article.description, article.body)
      .then((response) => {
        slug = response.body.article.slug;
        cy.register(
          user.subscriberEmail,
          user.subscriberUsername,
          user.password
        );
        articlePage.visitArticlePage(slug);
        articlePage.clickFollowBtn();
        articlePage.assertFollowBtnChangeUnfollow();
      });
  });

  it('should be able to unfollow the another user', () => {
    cy.createArticle(article.title, article.description, article.body)
      .then((response) => {
        slug = response.body.article.slug;
        cy.register(
          user.subscriberEmail,
          user.subscriberUsername,
          user.password
        );
        articlePage.visitArticlePage(slug);
        articlePage.assertFollowBtnChangeUnfollow();
        articlePage.clickFollowBtn();
        articlePage.assertUnfollowBtnChangeFollow();
      });
  });
});
