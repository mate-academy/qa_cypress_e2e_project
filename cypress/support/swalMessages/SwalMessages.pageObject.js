import PageObject from '../PageObject';

class SwalMessagePageObject extends PageObject {
  get swal() {
    return cy.get('.swal-modal');
  }

  get swalTitle() {
    return cy.get('.swal-title');
  }

  get swalText() {
    return cy.get('.swal-text');
  }

  registrationFailed(message) {
    this.swal.within(() => {
      this.swalTitle.should('contain', 'Registration failed!');
      this.swalText.should('contain', message);
    });
  }

  loginFailed(message = 'Invalid user credentials.') {
    this.swal.within(() => {
      this.swalTitle.should('contain', 'Login failed!');
      this.swalText.should('contain', message);
    });
  }

  registrationSuccess() {
    this.swal.within(() => {
      this.swalTitle.should('contain', 'Welcome!');
      this.swalText.should('contain', 'Your registration was successful!');
    });
  }

  updatingSuccess() {
    this.swal.within(() => {
      this.swalTitle.should('contain', 'Update successful!');
    });
  }
}

export default SwalMessagePageObject;
