/// <reference types="Cypress" />

describe('US68312', () => {
  beforeEach('passes', () => {
	cy.clearCookies()
    cy.getCookies().should('be.empty')
    cy.visit('https://app.dev.recrutamento.itixti-lab.com.br/?vid=c0c57cefce721e119b155b441e1722d6')

    cy.get('.ci-settings').click()
    // cy.get(':nth-child(3) > .menu > .sub-menu').scrollTo('bottom')
    cy.get('.sub-menu > :nth-child(10)').click()
  })

  it('TC001 -  tela de "Motivos de Contratação/Demissão"',()=>{
    cy.get('#title-section > h1').should('be.visible')
      	.and('have.text','Setup da Empresa')
    cy.get('.form-wrapper > :nth-child(1) > :nth-child(1) > h3').should('be.visible')
      	.and('have.text','Cadastrar Motivos de Contratação/Demissão')


	cy.get('.btn').should('be.visible').and('have.text', ' Adicionar ')
	cy.get('.primary').should('be.visible').and('have.text', 'Filtrar')

	cy.get('.grow > .ng-untouched').should('be.visible').invoke('attr', 'placeholder')
	.should('contain', 'Ex: Projeto Novo')

	cy.get('.cluster-filter-select').should('be.visible')

	cy.get('table tbody tr').its('length').should('be.at.most', 11);

	let descricao =['Motivo', 'Tipo', 'Status']
	for (let index = 1; index <= descricao.length ; index++) {
		cy.get(`thead > tr > :nth-child(${index})`).should('be.visible').and('have.text', descricao[index-1])
	}

	cy.get('#tipo > .custom').should('be.visible')
    cy.get('#status > .custom').should('be.visible')

	cy.get('.pages').should('be.visible')

  })

  it('TC002 - entrada válida em barra de pesquisa',()=>{
	cy.fazPesquisa('.grow > .ng-valid', ".primary", 'a')
  })

  it('TC003 - entrada inválida em barra de pesquisa', ()=>{
	cy.fazPesquisa('.grow > .ng-untouched', ".primary", 'bla')

  })

  it("TC004 - pesquisa com filtros tipo", () => {
		
		cy.comparaFiltro('#tipo > .custom > .ng-select-container', 'div.ng-option:nth(1)', ':nth-child(2)')
		cy.comparaFiltro('#tipo > .custom > .ng-select-container', 'div.ng-option:nth(0)', ':nth-child(2)')

	})

	it("TC005 - pesquisa com filtros status", () => {
		cy.comparaFiltro('#status > .custom > .ng-select-container', 'div.ng-option:nth(1)', ':nth-child(3)')
		cy.comparaFiltro('#status > .custom > .ng-select-container', 'div.ng-option:nth(0)', ':nth-child(3)')


	})

	it("TC008 - limpar filtros", ()=>{
		cy.comparaFiltro('#status > .custom > .ng-select-container', 'div.ng-option:nth(1)', ':nth-child(3)')
		cy.get('header > :nth-child(2) > span').click()
		cy.get('.primary')


	})

	it("TC009 - navegação pelo index", ()=>{
		cy.get('.ci-chevron_right').click()
		cy.get('.ci-chevron_left').click()


	})



})

