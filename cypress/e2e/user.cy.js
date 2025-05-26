import SignInPageObject from '../support/pages/signIn.pageObject';

const signInPage = new SignInPageObject();

describe('User', () => {
  let userTarget;
  let userFollower;

  before(() => {
    return cy.task('db:clear').then(() => {
      return cy.task('generateUser').then((generateUser) => {
        userTarget = generateUser;
        return cy.register(userTarget.email, userTarget.username, userTarget.password).then(() => {
          userFollower = generateUser;
          userFollower.email += 'world';
          userFollower.username += 'follower';
          return cy.register(
            userFollower.email,
            userFollower.username,
            userFollower.password
          );
        })
      });
    })
  });

  it('should be able to follow the another user', () => {
    signInPage.visit();
    signInPage.typeEmail(userFollower.email);
    signInPage.typePassword(userFollower.password);
    signInPage.clickSignInBtn();

    // eslint-disable-next-line cypress/no-unnecessary-waiting
    cy.wait(1000);

    cy.visit(`/#/@${userTarget.username.replace('follower', '')}`);

    cy.contains('button', `Follow ${userTarget.username.replace('follower', '')}`).click();
  });
});
