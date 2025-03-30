class PageObject {
  visit(url) {
    cy.visit(url || this.url);
  }

  get warmMesageText(){
    return cy.get('.swal-modal');
}

warmMesageTextContain(text){
    this.warmMesageText.should('contain.text', text);
}


warmMesageClickOk(text){
    this.warmMesageText.get('.swal-button-container').click();
}


get assertAllertMesageText(){
  return cy.get('[aria-modal="true"]');
}

assertAllertTextContain(text){
  this.assertAllertMesageText.should('contain.text', text);
}


}

export default PageObject;
