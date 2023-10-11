class ModalObject {
  get title() {
    return cy.get('.swal-title');
  }

  get text() {
    return cy.get('.swal-text');
  }

  get okButton() {
    return cy.get('.swal-button--confirm');
  }

  clickOkButton() {
    this.okButton.click();
  }

  assertPageContainsCredsErrorMessage() {
    this.text.should('contain.text', 'Invalid user credentials.');
  }

  assertPageContainsUnvalidEmailMessage() {
    this.text.should('contain.text', 'Email must be a valid email.');
  }

  assertPageContainsEmailTakenMessage() {
    this.text.should('contain.text', 'Email already taken.');
  }

  assertPageContainsPasswordErrorMessage() {
    this.text.should(
      'contain.text',
      'Password must be 8 characters long and include 1 number,' +
        '1 uppercase letter, and 1 lowercase letter.'
    );
  }

  assertPageContainsRegistrationSuccessMessage() {
    this.text.should('contain.text', 'Your registration was successful!');
  }

  assertPageContainsUpdateSuccessMessage() {
    this.title.should('contain.text', 'Update successful!');
  }
}

export default ModalObject;
