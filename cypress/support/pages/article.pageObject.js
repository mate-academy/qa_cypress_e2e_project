import PageObject from "../PageObject";

class ArticlePageObject extends PageObject {
  url = "/#/editor";

  get publishBtn() {
    return cy.getByDataQa("publish-btn");
  }

  clickPublishBtn() {
    this.publishBtn.click();
  }

  get editArticleBtn() {
    return cy.getByDataQa("edit-btn");
  }
  clickEditArticleBtn() {
    this.editArticleBtn.eq(0).click();
  }

  get deleteArticleBtn() {
    return cy.getByDataQa("delete-btn");
  }
  clickDeleteBtn() {
    this.deleteArticleBtn.eq(0).click();
  }

  get articleTitle() {
    return cy.getByDataQa("title");
  }

  typeArticleTitle(title) {
    this.articleTitle.type('{selectAll}' + title);
  }

  get articleDescription() {
    return cy.getByDataQa("description");
  }

  typeArticleDescription(description) {
    this.articleDescription.type('{selectAll}' + description);
  }
  get articleBody() {
    return cy.getByDataQa("body");
  }

  typeArticleBody(body) {
    this.articleBody.type('{selectAll}' + body);
  }

  get articleTag() {
    return cy.get(".ti-input");
  }

  typeArticleTag(tag) {
    this.articleTag.type('{selectAll}' + tag);
  }
}

export default ArticlePageObject;
