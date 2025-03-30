import PageObject from '../PageObject';

class ArticlePageObject extends PageObject {
 url = '/#/editor';

 get titleField() {
   return cy.getByDataQa('article-title');
 }

 get descriptionField() {
   return cy.getByDataQa('article-decription');
 }

 get bodyField() {
   return cy.getByDataQa('article-body');
 }


 get tagsField() {
   return cy.getByDataQa('article-taguser').eq(0);
 }

 get publishBtn() {
   return cy.getByDataQa('article-btn-submit');
 }

 get bannerTittle() {
   return cy.getByDataQa('banner-main');
 }

 get textBody() {
   return cy.get('.article-page')
 }

 get linkArticle() {
   return cy.getByDataQa("article-edit");
 }

 get EditArticleBtn() {
   return cy.getByDataQa("edit-article-btn").eq(0);
 }

 get DeleteArticleBtn() {
   return cy.getByDataQa("delete-article-btn").eq(0);
 }

 clickOnBtnEdit() {
   this.EditArticleBtn.click();
 }

 clickOnDeleteArticle() {
   this.DeleteArticleBtn.click();
 }

 clickOnEditArticle() {
   this.linkArticle.click();
 }

 typeTitle(text) {
   this.titleField
     .type(text);
 }

 typeDescription(text) {
   this.descriptionField
     .type(text);
 }

 typeBody(text) {
   this.bodyField
     .type(text);
 }

 typeTags(text) {
   this.tagsField
     .type(text);
 }

 clickPublishBtn() {
   this.publishBtn.click();
 }

 textCheckBody(text) {
   this.textBody.should('contain', text);
 }

 textCheckTitle(text) {
   this.bannerTittle.should('contain', text);
 }

 clearTitleField() {
   this.titleField.clear();
 }

}
export default ArticlePageObject;
