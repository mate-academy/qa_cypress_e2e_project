/* eslint-disable */
/// <reference types='cypress' />
/// <reference types='../support' />

import ArticlePageObject from '../support/pages/articlePageObject'

const articlePage = new ArticlePageObject()

describe('Article', () => {
  let user
  let article
  let newArticle

  before(() => {
    cy.task('generateUser').then((generateUser) => {
      user = generateUser
    })

    cy.task('generateArticle').then((generateArticle) => {
      article = generateArticle
    })

    cy.task('generateArticle').then((generateArticle) => {
      newArticle = generateArticle
    })
  })

  beforeEach(() => {
    cy.task('db:clear')
    cy.visit('/')
    cy.registerAndLogin(user.email, user.username, user.password)
    articlePage.visit()
  })

  it('should be created using New Article form', () => {
    articlePage.typeTitle(article.title)
    articlePage.typeDescription(article.description)
    articlePage.typeBodyArticle(article.body)
    articlePage.typeTag(article.tag)
    articlePage.clickPublishBtn()
    articlePage.assertArticlePage(article.title)
  })

  it('should be edited using Edit button', () => {
    cy.createArticle(
      article.title,
      article.description,
      article.body,
      article.tag
    )
    articlePage.assertArticlePage(article.title)
    articlePage.clickEditArticleBtn()

    articlePage.typeNewTitle(newArticle.title)
    articlePage.typeNewDescription(newArticle.description)
    articlePage.typeNewBodyArticle(newArticle.body)
    articlePage.typeTag(newArticle.tag)
    articlePage.clickPublishBtn()
    articlePage.assertTitleArticlePage(newArticle.title)
  })

  it('should be deleted using Delete button', () => {
    cy.createArticle(
      article.title,
      article.description,
      article.body,
      article.tag
    )
    articlePage.assertArticlePage(article.title)
    articlePage.clickDeleteArticleBtn()
  })
})
