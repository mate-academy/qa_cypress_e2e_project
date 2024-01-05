/// <reference types='cypress' />
/// <reference types='../support' />
import UserPageObject from '../support/pages/user.pageObject';
const userPage = new UserPageObject();

describe('User', () => {
  let follower;
  let followee;
  before(() => {
    cy.task('generateUser')
      .then((user) => {
        follower = user;
      });
    cy.task('generateUser')
      .then((user) => {
        followee = user;
      });
  });

  it('should be able to follow the another user', () => {
    cy.register2(follower);
    cy.register2(followee);
    cy.login2(follower);
    userPage.url = `/#/@${followee.username}`;
    userPage.visit();
    userPage.followButtonClick();
    cy.getByDataCy('userUnFollow')
      .should('be.visible');
  });
});
