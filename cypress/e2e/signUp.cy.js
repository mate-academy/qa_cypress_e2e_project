import SignUpPageObject from '../support/pages/signUp.pageObject';

const page = new SignUpPageObject();

describe('Sign up', () => {
  let user;

  beforeEach(() => {
    cy.task('generateUser').then((data) => { user = data; });
    page.visit();
  });

  it('registers a new user', () => {
    page.signUp(user);
    page.assertHeaderContainUsername(user.username);
    page.dismissDialog();
    page.reload();
    page.assertHeaderContainUsername(user.username);
  });

  it('rejects an already registered email', () => {
    cy.register(user.email, user.username, user.password);
    page.signUp({ ...user, username: `${user.username}other` });
    page.assertErrors('Email already taken.');
    page.dismissDialog();
    page.assertSignedOut();
    page.assertPath('#/register');
  });

  it('rejects an invalid email', () => {
    page.signUp({ ...user, email: 'invalid-email' });
    page.assertErrors('Email must be a valid email.');
    page.dismissDialog();
    page.assertSignedOut();
  });
});
