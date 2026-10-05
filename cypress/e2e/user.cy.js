import ProfilePageObject from '../support/pages/profile.pageObject';

const page = new ProfilePageObject();

describe('Following users', () => {
  let otherUser;

  beforeEach(() => {
    cy.task('generateUser').then((user) => {
      cy.register(user.email, user.username, user.password);
      cy.login(user.email, user.password);
    });
    cy.task('generateUser').then((user) => {
      otherUser = user;
      cy.register(user.email, user.username, user.password);
      // Registration creates a second session; retain the first user's cookie.
    });
  });

  it('follows and unfollows another user with persisted state', () => {
    page.visitUser(otherUser.username);
    page.follow();
    page.reload();
    page.assertFollowing();
    page.unfollow();
    page.reload();
    page.assertNotFollowing();
  });
});
