/// <reference types='cypress' />
/// <reference types='../support' />

describe('User', () => {
  const usernameToFollow = 'johndoe';

  before(() => {
    signIn();
  });

  it('should be able to follow another user', () => {
    userPage.visit(usernameToFollow);
    userPage.follow();
    userPage.shouldBeFollowing();
  });

  it('should be able to unfollow the same user', () => {
    userPage.visit(usernameToFollow);
    userPage.unfollow();
    userPage.shouldNotBeFollowing();
  });
});
