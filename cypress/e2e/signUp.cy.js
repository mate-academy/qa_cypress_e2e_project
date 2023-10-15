/// <reference types='cypress' />
/// <reference types='../support' />

describe('Sign Up page', () => {

  beforeEach(() => {
    cy.task('db:clear');
    cy.visit('/#/register');
  });
  
  const validEmail = 'rozmazninmihail@gmail.com';
  const validUsername = 'Mykhailo';
  const validPassword = 'MykhailoValidPass1!';
  const shortPassword = 'Short';
  const withoutNumberPass = 'ftyhiFui';
  const withoutCapLetPass = 'rtyukh12';
  const withoutSmallLetPass = 'QWERFVH5';

  it('should provide an ability to sign up with valid data', () => {
    let user;

cy.task('generateUser').then((generateUser) => {
  user = generateUser;

  cy.getByDataCy('register-username-input').type(user.username);
  cy.getByDataCy('register-email-input').type(validEmail);
  cy.getByDataCy('register-password-input').type(user.password);
  cy.getByDataCy('signup-button').click();

  cy.get('.swal-modal')
  .should('contain', 'Your registration was successful!');
  cy.get('.swal-button').click();

  cy.getByDataCy('navbar-username').should('contain', user.username);
});
});

  it('should not provide an ability to sign up with taking email', () => {
    let user;

    cy.task('generateUser').then((generateUser) => {
      user = generateUser;
      cy.request('POST', 'http://localhost:1667/users', {
        email: user.email,
        username: user.username,
        password: user.password
      });
    
      cy.getByDataCy('register-username-input').type(validUsername);
      cy.getByDataCy('register-email-input').type(user.email);
      cy.getByDataCy('register-password-input').type(validPassword);
      cy.getByDataCy('signup-button').click();
    
      cy.get('.swal-modal')
      .should('contain', 'Email already taken.');
    });
});

it('should not provide an ability to sign up with passw shorter than 8 ch', () => {
  let user;

  cy.task('generateUser').then((generateUser) => {
    user = generateUser;
  
    cy.getByDataCy('register-username-input').type(user.username);
    cy.getByDataCy('register-email-input').type(user.email);
    cy.getByDataCy('register-password-input').type(shortPassword);
    cy.getByDataCy('signup-button').click();
  
    cy.get('.swal-modal')
    .should('contain', 'Password must be 8 characters');
  });
});
    
it('should not provide an ability to sign up with passw without number', () => {
  let user;

  cy.task('generateUser').then((generateUser) => {
    user = generateUser;
  
    cy.getByDataCy('register-username-input').type(user.username);
    cy.getByDataCy('register-email-input').type(user.email);
    cy.getByDataCy('register-password-input').type(withoutNumberPass);
    cy.getByDataCy('signup-button').click();
  
    cy.get('.swal-modal')
    .should('contain', 'Password must be 8 characters');
  });
});

it('should not provide an ability to sign up with passw without capital letter', () => {
  let user;

  cy.task('generateUser').then((generateUser) => {
    user = generateUser;
  
    cy.getByDataCy('register-username-input').type(user.username);
    cy.getByDataCy('register-email-input').type(user.email);
    cy.getByDataCy('register-password-input').type(withoutCapLetPass);
    cy.getByDataCy('signup-button').click();
  
    cy.get('.swal-modal')
    .should('contain', 'Password must be 8 characters');
  });
});

it('should not provide an ability to sign up with passw without small letter', () => {
  let user;

  cy.task('generateUser').then((generateUser) => {
    user = generateUser;
  
    cy.getByDataCy('register-username-input').type(user.username);
    cy.getByDataCy('register-email-input').type(user.email);
    cy.getByDataCy('register-password-input').type(withoutSmallLetPass);
    cy.getByDataCy('signup-button').click();
  
    cy.get('.swal-modal')
    .should('contain', 'Password must be 8 characters');
  });
});

});