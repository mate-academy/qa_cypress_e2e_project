/// <reference types='cypress' />
/// <reference types='../support' />
import { FollowUnfollowUser } from
  '../support/pages/followUnfollowUser.pageObject';

describe('Follow/unfollow user', () => {
  const followUnfollow = new FollowUnfollowUser();
  let user1;
  let user2;

  beforeEach(() => {
    cy.task('generateUser').then((generateUser) => {
      user1 = generateUser;
    });

    cy.task('generateUser').then((generateUser) => {
      user2 = generateUser;
    });
  });

  it('should be able to follow the another user', () => {
    cy.register(user1.email, user1.username, user1.password)
      .then((responce) => {
        cy.login(user2.email, user2.username, user2.password);
        cy.visit(`#/@${responce.body.user.username}`);
      });

    followUnfollow.clickFollowButton();
    followUnfollow.assertFollowUser();
  });
});
