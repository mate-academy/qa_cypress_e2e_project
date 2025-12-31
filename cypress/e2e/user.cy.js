/// <reference types='cypress' />
/// <reference types='../support' />

import UserPageObject from '../support/pages/user.pageObject';

const userPage = new UserPageObject();

describe('User', () => {
  let firstUser;
  let secondUser;

  beforeEach(() => {
    cy.task('db:clear')
      .then(() => {
        return cy.task('generateUser');
      })
      .then((generatedUser) => {
        firstUser = generatedUser;

        return cy.register(
          firstUser.email,
          firstUser.username,
          firstUser.password
        );
      })
      .then(() => {
        return cy.task('generateUser');
      })
      .then((generatedUser) => {
        secondUser = generatedUser;
        return cy.register(
          secondUser.email,
          secondUser.username,
          secondUser.password
        );
      })
      .then(() => {
        userPage.visit();
      });
  });

  it('should be able to follow the another user', () => {
    userPage.login(firstUser.email, firstUser.password);

    cy.url().should('not.include', '/login');

    userPage.visit(`/#/@${secondUser.username}`);

    userPage.followBtn
      .should('exist').and('be.visible').and('contain.text', 'Follow').click();

    userPage.assertFollowingText(`Follow ${secondUser.username}`);
  });

  it('should be able to unfollow the another user', () => {
    userPage.login(firstUser.email, firstUser.password);

    cy.url().should('not.include', '/login');

    userPage.visit(`/#/@${secondUser.username}`);

    userPage.followBtn
      .should('exist').and('be.visible').and('contain.text', 'Follow').click();

    userPage.unfollowBtn
      .should('exist').and('be.visible').and('contain.text', 'Follow').click();

    userPage.assertFollowingText(`Unfollow ${secondUser.username}`);
  });
});
