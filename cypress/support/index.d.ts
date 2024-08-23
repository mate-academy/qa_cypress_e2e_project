/// <reference types="cypress" />

declare namespace Cypress {
  interface Chainable<Subject> {
    getByDataQa(selector: string): Chainable<any>
    register(userData: Object): Chainable<any>
    login(email: string, password: string): Chainable<any>
    authorization(userData: Object): Chainable<any>
    createArticle(articleData: Object, id: number): Chainable<any>
    followUser(username: string): Chainable<any>
  }
}
