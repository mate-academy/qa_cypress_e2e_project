/// <reference types='cypress' />
/// <reference types='../support' />
import UserPageObject from '../support/pages/user.pageObject';
import { generateUser } from '../support/generateData';

const userPage = new UserPageObject();

describe('User', () => {
  let user;
  let anotherUser;

  beforeEach(() => {
    cy.task('db:clear');
    user = generateUser();
    cy.register(user.email, user.username, user.password);
    anotherUser = generateUser();
    cy.register(anotherUser.email, anotherUser.username, anotherUser.password);
  });

  it('should be able to follow the another user', () => {
  // here is a bug
    cy.visit(`#/@${user.username}`);

    userPage.followButton.click();
    userPage.assertUserIsFollowed('Unfollow');
  });

  it('should be able to unfollow the another user', () => {
    cy.visit(`#/@${user.username}`);

    userPage.followButton.click();
    userPage.unFollowButton.click();
    userPage.assertUserIsUnfollowed('Follow');
  });
});
