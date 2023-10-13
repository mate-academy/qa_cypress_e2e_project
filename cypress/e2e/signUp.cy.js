/// <reference types='cypress' />
/// <reference types='../support' />

describe('Sign Up page', () => {

  beforeEach(() => {
    cy.task('db:clear');
    cy.visit('/#/register');
  });
  
  const validEmail = 'test_val_email@gmail.com';
  const validUsername = 'testvalusername';
  const validPassword = 'Testvalpassword123';
  const shortPassword = 'Test1';
  const withoutNumberPass = 'TestTest';
  const withoutCapLetPass = 'test1234';
  const withoutSmallLetPass = 'TEST1234';

  it('should provide an ability to sign up with valid data', () => {
    let user;

cy.task('generateUser').then((generateUser) => {
  user = generateUser;

  cy.getByDataCy('register-username-input').type(user.username);
  cy.getByDataCy('register-email-input').type(user.email);
  cy.getByDataCy('register-password-input').type(user.password);
  cy.getByDataCy('signup-button').click();

  cy.get('.swal-modal')
  .should('contain', 'Your registration was successful!');
  cy.get('.swal-button').click();

  cy.getByDataCy('username-link').should('contain', user.username);
});
});

  it('should not provide an ability to sign up with taking email', () => {
    let user;

    cy.task('generateUser').then((generateUser) => {
      user = generateUser;
      cy.request('POST', 'http://localhost:1668/users', {
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

});describe('Sign Up page', () => {

  beforeEach(() => {
    cy.task('db:clear');
    cy.visit('/#/register');
  });
  
  const validEmail = 'test_val_email@gmail.com';
  const validUsername = 'testvalusername';
  const validPassword = 'Testvalpassword123';
  const shortPassword = 'Test1';
  const withoutNumberPass = 'TestTest';
  const withoutCapLetPass = 'test1234';
  const withoutSmallLetPass = 'TEST1234';

  it('should provide an ability to sign up with valid data', () => {
    let user;

cy.task('generateUser').then((generateUser) => {
  user = generateUser;

  cy.getByDataCy('register-username-input').type(user.username);
  cy.getByDataCy('register-email-input').type(user.email);
  cy.getByDataCy('register-password-input').type(user.password);
  cy.getByDataCy('signup-button').click();

  cy.get('.swal-modal')
  .should('contain', 'Your registration was successful!');
  cy.get('.swal-button').click();

  cy.getByDataCy('username-link').should('contain', user.username);
});
});

  it('should not provide an ability to sign up with taking email', () => {
    let user;

    cy.task('generateUser').then((generateUser) => {
      user = generateUser;
      cy.request('POST', 'http://localhost:1668/users', {
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