import SignInPageObject from '../support/pages/signIn.pageObject';
import UserProfilePageObject from '../support/pages/userProfile.pageObject';

const userProfilePage = new UserProfilePageObject();
const signInPage = new SignInPageObject();

describe('User', () => {
  let user1;
  let user2;

  before(() => {
    return cy
      .task('generateUser')
      .then((generatedUser) => {
        user1 = generatedUser;
        return cy.task('generateUser');
      })
      .then((generatedUser) => {
        user2 = generatedUser;
      });
  });

  beforeEach(() => {
    return cy.then(() => {
      if (!user1 || !user2) {
        throw new Error('Users not properly initialized');
      }

      cy.task('db:clear');
      cy.register(user1.email, user1.username, user1.password);
      cy.register(user2.email, user2.username, user2.password);
    });
  });

  it('should be able to follow another user', () => {
    signInPage.visit();
    signInPage.typeEmail(user1.email);
    signInPage.typePassword(user1.password);
    signInPage.clickSignInBtn();

    cy.url().should('not.contain', '/login');

    cy.visit(`/#/@${user2.username}`);

    userProfilePage.clickFollowBtn();

    userProfilePage.assertFollowingText(`Follow ${user2.username}`);
  });

  it('should be able to unfollow a user', () => {
    signInPage.visit();
    signInPage.typeEmail(user1.email);
    signInPage.typePassword(user1.password);
    signInPage.clickSignInBtn();

    cy.url().should('not.contain', '/login');

    cy.visit(`/#/@${user2.username}`);

    userProfilePage.clickFollowBtn();

    userProfilePage.assertFollowingText(`Follow ${user2.username}`);

    userProfilePage.clickFollowBtn();

    userProfilePage.assertFollowingText('Follow');
  });
});
