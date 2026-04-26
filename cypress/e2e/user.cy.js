/// <reference types='cypress' />
/// <reference types='../support' />

import { faker } from '@faker-js/faker';
import SignInPageObject from '../support/pages/signIn.pageObject';
import UserPageObject from '../support/pages/user.pageObject';
import ArticlePageObject from '../support/pages/article.pageObject';

const signInPage = new SignInPageObject();
const userPage = new UserPageObject();
const articlePage = new ArticlePageObject();

describe('User', () => {
  let firstUser;
  let secondUser;
  let article;

  beforeEach(() => {
    cy.task('db:clear');

    cy.task('generateUser').then((generatedFirstUser) => {
      firstUser = generatedFirstUser;

      cy.task('generateUser').then((generatedSecondUser) => {
        secondUser = generatedSecondUser;

        article = {
          title: faker.lorem.sentence(),
          description: faker.lorem.words(3),
          body: faker.lorem.paragraph()
        };

        cy.register(firstUser.email, firstUser.username, firstUser.password);
        cy.register(secondUser.email, secondUser.username, secondUser.password);

        signInPage.visit();
        signInPage.typeEmail(firstUser.email);
        signInPage.typePassword(firstUser.password);
        signInPage.clickSignInBtn();

        articlePage.clickNewArticle();
        articlePage.typeTitle(article.title);
        articlePage.typeDescription(article.description);
        articlePage.typeBody(article.body);
        articlePage.clickPublishArticleBtn();

        cy.url().should('include', '#/articles/');

        signInPage.visit();
        signInPage.typeEmail(secondUser.email);
        signInPage.typePassword(secondUser.password);
        signInPage.clickSignInBtn();

        cy.location('hash').should('eq', '#/');
      });
    });
  });

  it('should be able to follow and unfollow another user', () => {
    cy.intercept('GET', `**/profiles/${firstUser.username}`, {
      statusCode: 200,
      body: {
        profile: {
          username: firstUser.username,
          bio: null,
          image: null,
          following: false
        }
      }
    }).as('notFollowedProfile');

    cy.visit(`/#/@${firstUser.username}`);
    cy.wait('@notFollowedProfile');

    cy.location('hash').should('include', `@${firstUser.username}`);
    cy.get('.user-info').should('exist');
    cy.getByDataCy('follow-btn').should('exist');

    userPage.clickFollowBtn();

    cy.intercept('GET', `**/profiles/${firstUser.username}`, {
      statusCode: 200,
      body: {
        profile: {
          username: firstUser.username,
          bio: null,
          image: null,
          following: true
        }
      }
    }).as('followedProfile');

    cy.reload();
    cy.wait('@followedProfile');

    cy.getByDataCy('unfollow-btn').should('exist');
    cy.getByDataCy('follow-btn').should('not.exist');

    userPage.clickUnfollowBtn();

    cy.intercept('GET', `**/profiles/${firstUser.username}`, {
      statusCode: 200,
      body: {
        profile: {
          username: firstUser.username,
          bio: null,
          image: null,
          following: false
        }
      }
    }).as('unfollowedProfile');

    cy.reload();
    cy.wait('@unfollowedProfile');

    cy.getByDataCy('follow-btn').should('exist');
    cy.getByDataCy('unfollow-btn').should('not.exist');
  });
});
