import UserPageObject from '../support/pages/user.pageObject';
const userPage = new UserPageObject();

describe('Follow/unfollow button', () => {
  before(() => {
    cy.task('db:clear');
  });

  it('should provide an ability to follow another user', () => {
    const usernameToFollow = 'JaneDoe';
    userPage.visitProfile(usernameToFollow);
    userPage.clickFollow();
    userPage.assertFollowButtonText('Unfollow');
  });

  it('should provide an ability to unfollow the user', () => {
    const usernameToFollow = 'JaneDoe';
    userPage.visitProfile(usernameToFollow);
    userPage.clickFollow(); // jeśli jest już "Unfollow", klikamy, żeby odfollowować
    userPage.assertFollowButtonText('Follow');
  });
});
