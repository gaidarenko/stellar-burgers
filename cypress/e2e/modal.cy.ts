describe('Модальные окна', () => {
  beforeEach(() => {
    cy.intercept('GET', '/api/ingredients', {
      fixture: 'ingredients.json'
    }).as('ingredients');

    cy.intercept('GET', '/api/auth/user', {
      fixture: 'user.json'
    }).as('user');

    cy.visit('http://localhost:4000/');
    cy.wait('@ingredients');
  });

  it('Открываются по клику на ингедиенте и закрываются по клику на Х', () => {
    let name = '';
    cy.get('[data-testid="ingredient-type-bun"]')
      .first()
      .within(() => {
        cy.get('[data-testid="ingredient-link"]').click();
      })
      .then(item => {
        name = item.find('[data-testid="ingredient-name"]').text();
      });

    cy.get('[data-testid="modal"]')
      .should('exist')
      .should('be.visible')
      .within(() => {
        cy.contains('Детали ингредиента').should('exist');
        cy.contains(name).should('exist');
        cy.get('[data-testid="modal-close"]').click();
      });

    cy.get('[data-testid="modal"]')
      .should('not.exist')
  })

  it('Открываются по клику на ингедиенте и закрываются по клику на оверлее', () => {
    let name = '';
    cy.get('[data-testid="ingredient-type-bun"]')
      .last()
      .within(() => {
        cy.get('[data-testid="ingredient-link"]').click();
      })
      .then(item => {
        name = item.find('[data-testid="ingredient-name"]').text();
      });

    cy.get('[data-testid="modal"]')
      .should('exist')
      .should('be.visible')
      .within(() => {
        cy.contains('Детали ингредиента').should('exist');
        cy.contains(name).should('exist');
      });

    cy.get('[data-testid="modal-overlay"]').click({ force: true });

    cy.get('[data-testid="modal"]')
      .should('not.exist')
  })

})