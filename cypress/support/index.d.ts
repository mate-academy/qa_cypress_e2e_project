/// <reference types="cypress" />

interface SignUpUser {
  email: string,
  username: string,
  password: string,
}

declare namespace Cypress {
  interface Chainable<Subject> {
    getByDataCy(selector: string): Chainable<any>
    register(user: SignUpUser): Chainable<any>
    findByPlaceholder(placeholder: string): Chainable<any>
    login(user: SignUpUser): Chainable<any>
    assertPageURL(url: string): Chainable<any>
  }
}
