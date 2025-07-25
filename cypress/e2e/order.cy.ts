import { SELECTOR_MODAL, SELECTOR_INGREDIENT_NAME, SELECTOR_INGREDIENT_TYPE_BUN } from './constants';

describe('Заказ', () => {
  beforeEach(() => {
    cy.intercept('GET', '/api/ingredients', {
      fixture: 'ingredients.json'
    }).as('ingredients');

    cy.intercept('GET', '/api/auth/user', {
      fixture: 'user.json'
    }).as('user');

    cy.intercept('POST', '/api/orders', {
      fixture: 'order.json'
    }).as('order');

    cy.setCookie('accessToken', 'accessToken');
    localStorage.setItem('refreshToken', 'refreshToken');

    cy.visit('/');
    cy.wait('@ingredients');
  });

  it('Создание заказа', () => {
    cy.get(SELECTOR_INGREDIENT_TYPE_BUN)
      .first()
      .within(() => {
        cy.get('button').click();
      })

    cy.get('[data-testid="ingredient-type-main"]')
      .first()
      .within(() => {
        cy.get('button').click();
      })

    cy.get('[data-testid="ingredient-type-sauce"]')
      .first()
      .within(() => {
        cy.get('button').click();
      })

    cy.get('[data-testid="make-order"]').click();
    cy.wait('@order');

    cy.get(SELECTOR_MODAL)
      .should('exist')
      .should('be.visible')
      .within(() => {
        cy.contains('идентификатор заказа').should('exist');
        cy.contains('85056').should('exist');
        cy.get('[data-testid="modal-close"]').click();
      });

    cy.get(SELECTOR_MODAL).should('not.exist');
    cy.get('[data-testid="burger-top"]').should('not.exist');
    cy.get('[data-testid="burger-bottom"]').should('not.exist');
    cy.get('[data-testid="burger-no-middle"]').should('exist');

  })
})