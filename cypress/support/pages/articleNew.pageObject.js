import PageObject from '../PageObject';

class ArticleNewPageObject extends PageObject {
  url = '/#/editor';

  get articleTitleField() {
    return cy.getByDataCy('article-title');
  }

  get articleDescriptionField() {
    return cy.getByDataCy('article-description');
  }

  get articleBodyField() {
    return cy.getByDataCy('article-body');
  }

  get publishArticleBtn() {
    return cy.getByDataCy('publish-article-btn');
  }

  typeArticleTitle(title){
    this.articleTitleField.type(title);
  }

  typeArticleDescription(description){
    this.articleDescriptionField.type(description);
  }

  typeArticleBody(text){
    this.articleBodyField.type(text);
  }

  clearArticleBody(){
    this.articleBodyField.clear();
  }

  clickPublishBtn(){
    this.publishArticleBtn.click();
  }
}

export default ArticleNewPageObject;