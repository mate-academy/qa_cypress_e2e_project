/// <reference types='cypress' />
/// <reference types='../support' />

import HomePageObject from '../support/pages/home.pageObject';
import UserPageObject from '../support/pages/user.pageObject';

describe('User', () => {
  const homePage = new HomePageObject();
  const userPage = new UserPageObject();
  const VALID_PASSWORD = 'Password!23';
  const USERNAME = 'pp';
  const EMAIL = 'pp@pp.pp';
  const myArticlesUrl = `${userPage.url}${USERNAME}`;
  let user;
  let article;

  before(() => {
    cy.task('db:clear');
    cy.register(EMAIL, USERNAME, VALID_PASSWORD).then((response) => {
      user = response.body.user;
    });
    homePage.visit();
  });

  beforeEach(() => {
    cy.login(user.email, user.username, VALID_PASSWORD);
    cy.task('generateArticle').then((generateArticle) => {
      article = generateArticle;
    });
  });

  it('should be able to follow the another user', () => {
    cy.createArticle(article.title, article.description, article.body)
      .then((response) => cy.setFavorite(response.body.article.slug))
      .then((response) => {
        cy.wrap(response.body.article.favorited).should('be.true');
        homePage.visit(myArticlesUrl);
        userPage.favoriteCount.should('contain', '1');
      });
  });

  it('should be able to unfollow the another user', () => {
    cy.createArticle(article.title, article.description, article.body)
      .then((response) => cy.setFavorite(response.body.article.slug))
      .then((response) => cy.unsetFavorite(response.body.article.slug))
      .then((response) => {
        cy.wrap(response.body.article.favorited).should('be.false');
        homePage.visit(myArticlesUrl);
        userPage.favoriteCount.should('contain', '0');
      });
  });
});
