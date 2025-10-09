class PageObject {
  visit(url) {
    cy.visit(url || this.url);
  }

  assertAlert(alertMessage) { // poprawiona literówka
    cy.on('window:alert', (alert) => {
      expect(alert).to.eq(alertMessage);
    });
  }
}

export default PageObject;
