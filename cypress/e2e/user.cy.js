import UserPageObject from '../support/pages/userPage.pageObject';

/// <reference types='cypress' />
/// <reference types='../support' />

const userPage = new UserPageObject();

describe('User', () => {
  let user;
  beforeEach(() => {
    cy.task('db:clear');
    cy.task('generateUser').then((generateUser) => {
      user = generateUser;
    });
  });

  it('should be able to follow the another user', () => {
    cy.register(user.firstEmail, user.firstUser, user.password);
    cy.login(user.email, user.username, user.password);
    cy.visit('/#/@' + user.firstUser);
    cy.contains(`Follow ${user.firstUser}`).should('exist');
    userPage.clickModalBtn();
    cy.contains(`Unollow ${user.firstUser}`).should('exist');
  });
});
