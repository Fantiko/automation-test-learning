
/// <reference types="Cypress" />


describe('US 66294 Template de Vaga - Pesquisar', () => {
  beforeEach('passes', ()=>{
    cy.clearCookies()
    cy.getCookies().should('be.empty')
    cy.visit('https://app.dev.recrutamento.itixti-lab.com.br/?vid=c0c57cefce721e119b155b441e1722d6')

    cy.get('.ci-settings').click()
    cy.get('.sub-menu > :nth-child(15)').click()

  })


  it.skip('TC001 - tela de template de vagas', () => {
    cy.get('.form-wrapper > :nth-child(1) > :nth-child(1) > h3').should("be.visible").and("have.text","Template de Vagas")

    cy.get('.secondary').should("be.visible").and("have.text", " Adicionar Template ")

    cy.get('.grow > .ng-untouched').should("be.visible")

    cy.get('.primary').should("be.visible")

    cy.get('.cluster-filter table tbody tr').its('length').should('be.at.most', 11);

    cy.get('.cluster-filter-select')

    cy.get('.cluster-filter-select > header > :nth-child(1) > h3').should("be.visible").and("have.text", 'Filtros')

    cy.get('.cluster-filter-select').should('contain.text', 'Área de Trabalho')

    cy.get('#areaTrabalho > .custom > .ng-select-container').should("exist")
    .and("have.text", 'Selecione')

    cy.get('.cluster-filter-select').should('contain.text','Área de Trabalho')
    cy.get('.cluster-filter-select').should('contain.text','Período de Criação')
    cy.get('.cluster-filter-select').should('contain.text','Criado por')
    cy.get('.cluster-filter-select').should('contain.text','Status')

    cy.get(':nth-child(2) > date-picker.ng-untouched > .input-date-picker').should("exist")
    cy.get('.mt-2 > date-picker.ng-untouched > .input-date-picker').should('exist')

  })

  it.skip("TC002 - nome de template válido na barra de pesquisa", ()=>{
    cy.fazPesquisa('.grow > .ng-untouched', ".primary", "abc")


  })

  it.skip("TC003 - nome de template não existente", ()=>{
    cy.fazPesquisa('.grow > .ng-valid', ".primary", "dabaca")


  })

  it.skip("TC004 - nome de template vazio", ()=>{
    
    cy.fazPesquisa('.grow > .ng-untouched', ".primary", "abc")
    cy.get('.grow > .ng-valid').clear()
    cy.get('.primary').click()


  })

  it.skip('TC005 - filtro "área de trabalho"', () => {
    
    cy.get('#areaTrabalho > .custom > .ng-select-container').click()
    cy.get(`div.ng-option:nth(0)`).click();
    cy.get('.primary').click();
    cy.get('.cluster-filter table tbody tr').its('length').should('be.at.most', 11);
    cy.get('#areaTrabalho > .custom > .ng-select-container').click();
    cy.contains('Limpar filtros').click();

  })

  it.skip('TC006 - filtro "criado por"', () => {


  })

  it.skip('TC007 - filtro "status" - ativo',()=>{
    cy.comparaFiltro("#status > .custom > .ng-select-container", 'div.ng-option:nth(0)', ':nth-child(3)')

  })

  it.skip('TC007 - filtro "status" - inativo',()=>{
    cy.comparaFiltro("#status > .custom > .ng-select-container", 'div.ng-option:nth(1)', ':nth-child(3)')

  })

  it.skip('TC008 - filtro "período de criação"',()=>{
    cy.get('.filters > :nth-child(2) > :nth-child(1)')
    .find(".input-date-picker")
    .eq(0)
    .find(":nth-child(2)").click({force: true})
    cy.get('.ngb-dp-header').find('[aria-label="Select month"]').select('jan.')
    cy.get('.ngb-dp-header').find('[aria-label="Select year"]').select('2023')
    cy.get('[aria-label="quinta-feira, 12 de janeiro de 2023"] > .btn-light').click()

    cy.get('.filters > :nth-child(2) > :nth-child(1)')
    .find(".input-date-picker")
    .eq(1)
    .find(":nth-child(2)").click({force: true})
    cy.get('.ngb-dp-header').find('[aria-label="Select month"]').select('fev.')
    cy.get('.ngb-dp-header').find('[aria-label="Select year"]').select('2023')
    cy.get('[aria-label="domingo, 12 de fevereiro de 2023"] > .btn-light').click()

    cy.get('.primary').click()

    

  })

  it.skip("TC009 - indice de resultados", ()=>{
		cy.get('.ci-chevron_right').click()
		cy.get('.ci-chevron_left').click()


	})

  it.skip("TC010 - limpar filtros", ()=>{
    cy.comparaFiltro("#status > .custom > .ng-select-container", 'div.ng-option:nth(1)', ':nth-child(3)')

		cy.get('div.cluster-filter-select').find('span:first').click()


	})


})

describe('US 66295 Template de Vaga - Cadastrar ', ()=>{
  beforeEach('passes', ()=>{
    cy.clearCookies()
    cy.getCookies().should('be.empty')
    cy.visit('https://app.dev.recrutamento.itixti-lab.com.br/?vid=c0c57cefce721e119b155b441e1722d6')

    cy.get('.ci-settings').click()
    cy.get('.sub-menu > :nth-child(14)').click()
    cy.get('.secondary').click()

  })

  it.skip(('TC001- Template vaga'), ()=> {
    
    cy.get('#nomeVaga').should("exist").and('be.visible')
    cy.get('#areaTrabalho').should("exist").and('be.visible')
    cy.get('#localVaga').should("exist").and('be.visible')

    cy.get('#cargo').should("exist").and('be.visible')
    cy.get('#tipoVaga').should("exist").and('be.visible')
    cy.get('#modeloTrabalho').should("exist").and('be.visible')

    cy.get('.col-1').should("exist").and('be.visible')
    cy.get('.btn-secondary').should("exist").and('be.visible')
    cy.get('.btn-primary').should("exist").and('be.visible')


      
  })

  it.skip('TC002-Template Vaga Adicionar Vazio', () =>{
    cy.get('.btn-primary')


  })

  it.skip('TC003- Validação Nome da Vaga', ()=>{
    cy.get('#nomeVaga').testaCampo(100, true)


  })

  it.skip('TC004- Validação Cargo',() => {
		cy.get('#cargo > .ng-select-container').type('Analista de')
		cy.get('#cargo .ng-option-label').contains('Analista de').click()

	})

	it.skip('TC005- Validação Cargo lista de opções', () => {
		cy.get('#cargo > .ng-select-container').type('daadascacsaca')
		cy.contains('Item não encontrado!').should('exist')

	})

	it.skip('TC006- Validação Área de Trabalho Caracteres', () =>{
		cy.get('#areaTrabalho').testaCampo(100, true)

	})

	it.skip('TC007- Validação Tipo de Vaga', () =>{
		cy.get('#tipoVaga > .ng-select-container').type('CLT')
		cy.get('#tipoVaga .ng-option-label').contains('CLT').click()

	})

	it.skip('TC008- Validação Tipo de Vaga lista de opções', () => {
		cy.get('#tipoVaga > .ng-select-container').type('daadascacsaca')
		cy.contains('Item não encontrado!').should('exist')

	})

	it.skip('TC009- Local da Vaga Caracteres', ()=>{
		cy.get('#localVaga').testaCampo(100, true)

	})

	it.skip('TC010- Validação Modelo de trabalho', ()=>{
		cy.get('#modeloTrabalho > .ng-select-container').type('daadascacsaca')
		cy.contains('Item não encontrado!').should('exist')

	})
	it.skip('TC011- Validação Modelo de trabalho lista de opções', ()=>{
		cy.get('#modeloTrabalho > .ng-select-container').type('Presencial')
		cy.get('#modeloTrabalho .ng-option-label').contains('Presencial').click()

	})

	it.skip("TC012- Botão 'Vaga para PCD?'",()=>{
		cy.get('.col-1').find('.toggle').click().click()

	})

	it.skip('TC13- Adicionar template Vagas',()=>{
		cy.get('#nomeVaga').type("exist")
		cy.get('#areaTrabalho').type("exist")
		cy.get('#localVaga').type("exist")

		cy.get('#cargo > .ng-select-container').type('Analista de')
		cy.get('#cargo .ng-option-label').contains('Analista de').click()

		cy.get('#tipoVaga > .ng-select-container').type('CLT')
		cy.get('#tipoVaga .ng-option-label').contains('CLT').click()

		cy.get('#modeloTrabalho > .ng-select-container').type('Presencial')
		cy.get('#modeloTrabalho .ng-option-label').contains('Presencial').click()

		cy.get('.btn-primary').click()

		let lista = ['#descricaoVaga', '#responsabilidadesText','#requisitosText','#informacoesText']
		for (let index = 1; index < lista.length+1; index++) {
			cy.get(`:nth-child(${index}) > .form-group`).should('exist')
			cy.get(lista[index-1]).should("exist").find('.ql-container > .ql-editor').type('dabaca')

			
		}


	})

	it.skip('TC014- Todos Preenchidos Exceto "Nome Vaga"',()=>{
		cy.get('#nomeVaga').focus().blur()
		cy.get('form.ng-pristine > :nth-child(1) > :nth-child(1) > :nth-child(3)').should('exist').and('be.visible')

		cy.get('#areaTrabalho').type("exist")
		cy.get('#localVaga').type("exist")

		cy.get('#cargo > .ng-select-container').type('Analista de')
		cy.get('#cargo .ng-option-label').contains('Analista de').click()

		cy.get('#tipoVaga > .ng-select-container').type('CLT')
		cy.get('#tipoVaga .ng-option-label').contains('CLT').click()

		cy.get('#modeloTrabalho > .ng-select-container').type('Presencial')
		cy.get('#modeloTrabalho .ng-option-label').contains('Presencial').click()

		cy.get('.btn-primary').should('be.disabled')


	})

	it.skip('TC015-Todos Preenchidos Exceto "Cargo"',()=>{
		cy.get('#nomeVaga').type("exist")
		cy.get('#areaTrabalho').type("exist")
		cy.get('#localVaga').type("exist")

		cy.get('#cargo > .ng-select-container').type('Analista de')
		cy.get('#cargo .ng-option-label').contains('Analista de').click()
		cy.get('#cargo > .ng-select-container > .ng-clear-wrapper').click()

		cy.get('#tipoVaga > .ng-select-container').type('CLT')
		cy.get('#tipoVaga .ng-option-label').contains('CLT').click()

		cy.get('#modeloTrabalho > .ng-select-container').type('Presencial')
		cy.get('#modeloTrabalho .ng-option-label').contains('Presencial').click()

		cy.get('.btn-primary').should('be.disabled')


	})

	it.skip('TC016-Todos Preenchidos Exceto "Área de Trabalho"',()=>{
		cy.get('#nomeVaga').type("exist")
		cy.get('#areaTrabalho').focus().blur()
		cy.get('#localVaga').type("exist")

		cy.get('#cargo > .ng-select-container').type('Analista de')
		cy.get('#cargo .ng-option-label').contains('Analista de').click()

		cy.get('#tipoVaga > .ng-select-container').type('CLT')
		cy.get('#tipoVaga .ng-option-label').contains('CLT').click()

		cy.get('#modeloTrabalho > .ng-select-container').type('Presencial')
		cy.get('#modeloTrabalho .ng-option-label').contains('Presencial').click()

		cy.get('.btn-primary').should('be.disabled')




	})

	it.skip('TC017-Todos Preenchidos Exceto "Tipo de Vaga"',()=>{

		cy.get('#nomeVaga').type("exist")
		cy.get('#areaTrabalho').type("exist")
		cy.get('#localVaga').type("exist")

		cy.get('#cargo > .ng-select-container').type('Analista de')
		cy.get('#cargo .ng-option-label').contains('Analista de').click()

		cy.get('#tipoVaga > .ng-select-container').type('CLT')
		cy.get('#tipoVaga .ng-option-label').contains('CLT').click()
		cy.get('#tipoVaga > .ng-select-container > .ng-clear-wrapper').click()

		cy.get('#modeloTrabalho > .ng-select-container').type('Presencial')
		cy.get('#modeloTrabalho .ng-option-label').contains('Presencial').click()

		cy.get('.btn-primary').should('be.disabled')


	})

	it.skip('TC018-Todos Preenchidos Exceto "Local da Vaga"',()=>{

		cy.get('#nomeVaga').type("exist")
		cy.get('#areaTrabalho').type("exist")
		cy.get('#localVaga').focus().blur()

		cy.get('#cargo > .ng-select-container').type('Analista de')
		cy.get('#cargo .ng-option-label').contains('Analista de').click()

		cy.get('#tipoVaga > .ng-select-container').type('CLT')
		cy.get('#tipoVaga .ng-option-label').contains('CLT').click()

		cy.get('#modeloTrabalho > .ng-select-container').type('Presencial')
		cy.get('#modeloTrabalho .ng-option-label').contains('Presencial').click()


		cy.get('.btn-primary').should('be.disabled')

	})

	it.skip('TC019-Todos Preenchidos Exceto "Modelo de trabalho"',()=>{




		cy.get('#nomeVaga').type("exist")
		cy.get('#areaTrabalho').type("exist")
		cy.get('#localVaga').type("exist")

		cy.get('#cargo > .ng-select-container').type('Analista de')
		cy.get('#cargo .ng-option-label').contains('Analista de').click()

		cy.get('#tipoVaga > .ng-select-container').type('CLT')
		cy.get('#tipoVaga .ng-option-label').contains('CLT').click()

		cy.get('#modeloTrabalho > .ng-select-container').type('Presencial')
		cy.get('#modeloTrabalho .ng-option-label').contains('Presencial').click()
		cy.get('#modeloTrabalho > .ng-select-container > .ng-clear-wrapper').click()


		cy.get('.btn-primary').should('be.disabled')

	})

	it.skip('TC020- Botão "Voltar"',()=>{
		cy.get('#nomeVaga').type("exist")

		cy.get('.btn-secondary').click()

		cy.get('.swal2-popup').should('be.visible')

		cy.get('#swal2-title').should('be.visible').and('have.text',"ATENÇÃO!")

		cy.get('.swal2-confirm').should('be.visible')
		cy.get('.swal2-cancel').should('be.visible')



	})

	it.skip('TC021- Botão Não janela de Confirmação', ()=>{
		cy.get('#nomeVaga').type("exist")

		cy.get('.btn-secondary').click()

		cy.get('.swal2-popup').should('be.visible')
		
		cy.get('.swal2-cancel').should('be.visible').click()
		cy.get('#nomeVaga').should('have.value', 'exist');
		
	} )

	it.skip('TC22- Botão "Sim" janela de Confirmação', ()=>{
		cy.get('#nomeVaga').type("exist")

		cy.get('.btn-secondary').click()

		cy.get('.swal2-popup').should('be.visible')
		
		cy.get('.swal2-confirm').should('be.visible').click()

	})

	it('TC023- Validação Descrição da Vaga Caracteres', ()=>{
		cy.get('.btn-primary').click({force:true})
		cy.testaCampoQuill('#descricaoVaga > .ql-container > .ql-editor',501)

	})


})