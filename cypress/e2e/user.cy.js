/// <reference types='cypress' />
/// <reference types='../support' />

import UserPageObject
  from '../support/pages/user.pageObject';

const user = new UserPageObject();

describe('User', () => {
  let account;
  let userFolower;

  beforeEach(() => {
    cy.task('db:clear');
    cy.task('generateUser').then((generateUser) => {
      account = generateUser;
      cy.register(account.email, account.username, account.password);
    });

    cy.task('generateUser').then((generateUser) => {
      userFolower = generateUser;
      cy.register(
        userFolower.email,
        userFolower.username,
        userFolower.password
      );
    });
  });

  it('should be able to follow the another user', () => {
    user.visitProfile(account.username);
    user.followBtn.click();

    user.assertFollow();
  });

  it('should be able to unfollow the another user', () => {
    user.visitProfile(account.username);
    user.followBtn.click();
    user.unfollowBtn.click();

    user.assertUnFollow();
  });
});
