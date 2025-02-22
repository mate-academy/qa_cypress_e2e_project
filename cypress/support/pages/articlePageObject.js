/* eslint-disable */

import PageObject from '../PageObject'

class ArticlePageObject extends PageObject {
  url = '/#/editor'

  get titleField() {
    return cy.getByDataCy('article-title-field')
  }

  get descriptionField() {
    return cy.getByDataCy('article-description-field')
  }

  get bodyArticleField() {
    return cy.getByDataCy('article-body-textarea')
  }

  get tagField() {
    return cy.getByDataCy('enter-tags-field')
  }

  get publishArticleBtn() {
    return cy.getByDataCy('publish-article-btn')
  }

  get editArticleBtn() {
    return cy.getByDataCy('edit-article-btn')
  }

  get deleteArticleBtn() {
    return cy.getByDataCy('delete-article-btn')
  }

  get titleArticlePage() {
    return cy.get('h1')
  }

  typeTitle(title) {
    this.titleField.type(title)
  }

  typeDescription(description) {
    this.descriptionField.type(description)
  }

  typeBodyArticle(body) {
    this.bodyArticleField.type(body)
  }

  typeTag(tag) {
    this.tagField.first().type(tag)
  }

  typeNewTitle(title) {
    this.titleField.clear().type(title)
  }

  typeNewDescription(description) {
    this.descriptionField.clear().type(description)
  }

  typeNewBodyArticle(body) {
    this.bodyArticleField.clear().type(body)
  }

  clickPublishBtn() {
    this.publishArticleBtn.click()
  }

  clickEditArticleBtn() {
    this.editArticleBtn.first().click()
  }

  clickDeleteArticleBtn() {
    this.deleteArticleBtn.first().click()
  }

  assertArticlePage(title) {
    cy.url().should('include', title)
  }

  assertTitleArticlePage(title) {
    this.titleArticlePage.should('contain', title)
  }
}

export default ArticlePageObject
