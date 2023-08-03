import PageObject from '../PageObject';

class SignUpPageObject extends PageObject {
  url = '/#/register';

  typeUsername(username) {
    cy.findByPlaceholder('Username').type(username);
  }

  typeEmailRegsrt(email) {
    cy.findByPlaceholder('Email').type(email);
  }

  typePasswordRegsrt(password) {
    cy.findByPlaceholder('Password').type(password);
  }

  clickSignUpBtn() {
    cy.contains('.btn', 'Sign up').click();
  }

  successMessage() {
    cy.contains('.swal-modal', 'Your registration was successful!')
      .should('exist');
    cy.get('.swal-button').click();
  }
};

export default SignUpPageObject;
