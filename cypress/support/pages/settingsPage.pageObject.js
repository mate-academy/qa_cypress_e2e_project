import PageObject from '../PageObject';

class settingsPage extends PageObject {

  get articlePreview() {
    return cy.getByDataCy('article-preview')
  }
  get articleDesc(){
    return cy.get('.preview-link > p')
  }
}

export default settingsPage;