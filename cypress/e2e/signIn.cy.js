import SignInPageObject from '../support/pages/signIn.pageObject';

const page = new SignInPageObject();

describe('Sign in', () => {
  let user;

  beforeEach(() => {
    cy.task('generateUser').then((data) => {
      user = data;
      cy.register(user.email, user.username, user.password);
    });
    page.visit();
  });

  it('logs in with existing credentials', () => {
    page.signIn(user);
    page.assertHeaderContainUsername(user.username);
    page.reload();
    page.assertHeaderContainUsername(user.username);
  });

  it('rejects an incorrect password', () => {
    page.signIn({ ...user, password: 'IncorrectPassword1!' });
    page.assertErrors('Invalid user credentials.');
    page.dismissDialog();
    page.assertSignedOut();
    page.assertPath('#/login');
  });
});
