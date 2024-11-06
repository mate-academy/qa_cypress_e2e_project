/* eslint-disable */
/// <reference types='cypress' />
/// <reference types='../support' />

import SignUpPageObject from '../support/pages/signupPageObject'
import HomePageObject from '../support/pages/home.pageObject'

const signUpPage = new SignUpPageObject()
const homePage = new HomePageObject()

describe('Sign Up page', () => {
  let user
  let newUser

  before(() => {})

  beforeEach(() => {
    cy.task('db:clear')
    cy.task('generateUser').then((generatedUser) => {
      user = generatedUser
    })
    cy.task('generateUser').then((generatedUser) => {
      newUser = generatedUser
    })
    signUpPage.visit()
  })

  it('should provide an ability to sign up with valid credentials', () => {
    signUpPage.typeUsername(user.username)
    signUpPage.typeEmail(user.email)
    signUpPage.typePassword(user.password)
    signUpPage.clickSignUpBtn()
    signUpPage.assertSuccessfulMessage()

    homePage.assertHeaderContainUsername(user.username)
  })

  it('should not provide an ability to sign up with existing email', () => {
    cy.register(user.email, user.username, user.password)
    signUpPage.typeUsername(newUser.username)
    signUpPage.typeEmail(user.email)
    signUpPage.typePassword(newUser.password)
    signUpPage.clickSignUpBtn()
    signUpPage.assertErrorMessage()
    signUpPage.assertSignUpPage()
  })
})
