class ModalWindow {
  get title() {
    return cy.get('[role="dialog"] .swal-title');
  }

  get infoText() {
    return cy.get('[role="dialog"] .swal-text');
  }

  get submitFormBtn() {
    return cy.contains('button', 'OK');
  }
}

export default ModalWindow;
