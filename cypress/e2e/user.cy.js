/// <reference types='cypress' />
/// <reference types='../support' />

import SignInPageObject from '../support/pages/signIn.pageObject';
import UserPageObject from '../support/pages/user.pageObject';

const signInPage = new SignInPageObject();
const userPage = new UserPageObject();

describe('User', () => {
  beforeEach(() => {
    cy.task('db:clear');

    cy.task('generateData').as('userData');

    signInPage.visit();
    cy.task('generateUser').then((generateUser) => {
      const { email, username, password } = generateUser;
      cy.registerAndLoginUser(email, username, password);
    });
  });

  it('should be able to follow another user', () => {
    cy.task('generateUser').then((secondUser) => {
      const { email, username, password } = secondUser;

      cy.register(email, username, password).then((newUser) => {
        cy.wrap(newUser).as('secondUser');
      });
    });

    cy.get('@user').then((firstUser) => {
      cy.login(firstUser).then(() => {
        cy.get('@secondUser').then((secondUser) => {
          cy.visit('/#/@' + secondUser.username);

          userPage.clickFollowBtn();

          userPage.followBtn.should('exist');
        });
      });
    });
  });
});
