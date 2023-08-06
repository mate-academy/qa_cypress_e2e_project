import PageObject from '../PageObject';

class SettingsPageObject extends PageObject {
  url = '/#/settings';

  typeUsername(username) {
    cy.findByPlaceholder('Your username').type(username);
  }

  typeBio(bio) {
    cy.findByPlaceholder('Short bio about you').type(bio);
  }

  checkBio(bio) {
    cy.findByPlaceholder('Short bio about you').should('have.value', bio);
  }

  typeEmail(email) {
    cy.findByPlaceholder('Email').type(email);
  }

  checkEmail(email) {
    cy.findByPlaceholder('Email').should('have.value', email);
  }

  typePassword(password) {
    cy.findByPlaceholder('Password').type(password);
  }

  clearUserInfo(placeholder) {
    cy.findByPlaceholder(placeholder).clear();
  }

  UpdateSettingsButton() {
    cy.contains('.btn', 'Update Settings').click();
  }

  successAlert() {
    cy.contains('.swal-title', 'Update successful!').should('exist');
    cy.contains('.swal-button', 'OK').click();
  }

  signInWithNewEmail(email, password) {
    cy.contains('.btn', 'Or click here to logout.').click();
    cy.contains('a', 'Sign in').click();
    cy.findByPlaceholder('Email').type(email);
    cy.findByPlaceholder('Password').type(password);
    cy.contains('.btn', 'Sign in').click();
  }

  signInWithNewPassword(email, password) {
    cy.contains('.btn', 'Or click here to logout.').click();
    cy.contains('a', 'Sign in').click();
    cy.findByPlaceholder('Email').type(email);
    cy.findByPlaceholder('Password').type(password);
    cy.contains('.btn', 'Sign in').click();
  }

  logOutButton() {
    cy.contains('.btn', 'Or click here to logout.').click();
  }

  assertLogOut() {
    cy.get('a').should('contain', 'Sign in');
    cy.get('a').should('contain', 'Sign up');
  }
}

export default SettingsPageObject;
