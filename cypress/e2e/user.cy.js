/* eslint-disable */

/// <reference types='cypress' />
/// <reference types='../support' />

import ArticlePageObject from '../support/pages/articlePageObject'

const articlePage1 = new ArticlePageObject()

describe('User', () => {
  let user
  let article
  let secondUser

  before(() => {
    cy.task('generateUser').then((generateUser) => {
      user = generateUser
    })

    cy.task('generateArticle').then((generateArticle) => {
      article = generateArticle
    })

    cy.task('generateUser').then((generateUser) => {
      secondUser = generateUser
    })
  })

  beforeEach(() => {
    cy.task('db:clear')
    cy.visit('/')
    cy.registerAndLogin(user.email, user.username, user.password)
    articlePage1.visit()
    cy.createArticle(
      article.title,
      article.description,
      article.body,
      article.tag
    )
    cy.registerAndLogin(
      secondUser.email,
      secondUser.username,
      secondUser.password
    )
  })

  it('should be able to follow the another user', () => {
    cy.visit(`/#/@${user.username}`)
    cy.getByDataCy('follow-unfollow-btn').click()
    cy.getByDataCy('follow-unfollow-btn').should('contain', 'Unfollow')
  })
})
