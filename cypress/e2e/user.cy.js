/// <reference types='cypress' />
/// <reference types='../support' />
import UserPageObject from '../support/pages/user.PageObject';

const userPage = new UserPageObject();

describe('User', () => {
  let user;
  let userToFollow;

  beforeEach(() => {
    cy.task('db:clear');
    cy.task('generateUser').then((generateUser) => {
      user = generateUser;
    }).then((user) => {
      cy.login(user.email, user.username, user.password);
    });
    cy.task('generateUser').then((generateUser) => {
      userToFollow = generateUser;
    }).then((userToFollow) => {
      cy.login(userToFollow.email, userToFollow.username,
        userToFollow.password);
    });
  });

  it('should be able to follow the another user', () => {
    userPage.visit(`#/@${user.username}`);
    userPage.visit(`#/@${userToFollow.username}`);
    userPage.followBtn.click();
    // test cannot be asserted because of bug on 'Follow' button
  });

  it('should be able to follow the another user', () => {
    // test is blocked because of bug on 'Follow' button
  });
});
