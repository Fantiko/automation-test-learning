/// <reference types="Cypress" />


describe('US 66295 Template de Vaga - Cadastrar ', ()=>{
  beforeEach('passes', ()=>{
    cy.clearCookies()
    cy.getCookies().should('be.empty')
    cy.visit('https://app.dev.recrutamento.itixti-lab.com.br/?vid=c0c57cefce721e119b155b441e1722d6')

    cy.get('.ci-settings').click()
    cy.get('.sub-menu > :nth-child(14)').click()
    cy.get('.secondary').click()

  })

  it(('TC001- Template vaga'), ()=> {
    
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

  it('TC002-Template Vaga Adicionar Vazio', () =>{
    cy.get('.btn-primary')


  })

  it('TC003- Validação Nome da Vaga', ()=>{
    cy.get('#nomeVaga').testaCampo(100, true)


  })

  it('TC004- Validação Cargo',() => {
		cy.get('#cargo > .ng-select-container').type('Analista de')
		cy.get('#cargo .ng-option-label').contains('Analista de').click()

	})

	it('TC005- Validação Cargo lista de opções', () => {
		cy.get('#cargo > .ng-select-container').type('daadascacsaca')
		cy.contains('Item não encontrado!').should('exist')

	})

	it('TC006- Validação Área de Trabalho Caracteres', () =>{
		cy.get('#areaTrabalho').testaCampo(100, true)

	})

	it('TC007- Validação Tipo de Vaga', () =>{
		cy.get('#tipoVaga > .ng-select-container').type('CLT')
		cy.get('#tipoVaga .ng-option-label').contains('CLT').click()

	})

	it('TC008- Validação Tipo de Vaga lista de opções', () => {
		cy.get('#tipoVaga > .ng-select-container').type('daadascacsaca')
		cy.contains('Item não encontrado!').should('exist')

	})

	it('TC009- Local da Vaga Caracteres', ()=>{
		cy.get('#localVaga').testaCampo(100, true)

	})

	it('TC010- Validação Modelo de trabalho', ()=>{
		cy.get('#modeloTrabalho > .ng-select-container').type('daadascacsaca')
		cy.contains('Item não encontrado!').should('exist')

	})
	it('TC011- Validação Modelo de trabalho lista de opções', ()=>{
		cy.get('#modeloTrabalho > .ng-select-container').type('Presencial')
		cy.get('#modeloTrabalho .ng-option-label').contains('Presencial').click()

	})

	it("TC012- Botão 'Vaga para PCD?'",()=>{
		cy.get('.col-1').find('.toggle').click().click()

	})

	it('TC13- Adicionar template Vagas',()=>{
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

	it('TC014- Todos Preenchidos Exceto "Nome Vaga"',()=>{
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

	it('TC015-Todos Preenchidos Exceto "Cargo"',()=>{
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

	it('TC016-Todos Preenchidos Exceto "Área de Trabalho"',()=>{
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

	it('TC017-Todos Preenchidos Exceto "Tipo de Vaga"',()=>{

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

	it('TC018-Todos Preenchidos Exceto "Local da Vaga"',()=>{

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

	it('TC019-Todos Preenchidos Exceto "Modelo de trabalho"',()=>{




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

	it('TC020- Botão "Voltar"',()=>{
		cy.get('#nomeVaga').type("exist")

		cy.get('.btn-secondary').click()

		cy.get('.swal2-popup').should('be.visible')

		cy.get('#swal2-title').should('be.visible').and('have.text',"Os dados serão perdidos, deseja continuar?")

		cy.get('.swal2-confirm').should('be.visible')
		cy.get('.swal2-cancel').should('be.visible')



	})

	it('TC021- Botão Não janela de Confirmação', ()=>{
		cy.get('#nomeVaga').type("exist")

		cy.get('.btn-secondary').click()

		cy.get('.swal2-popup').should('be.visible')
		
		cy.get('.swal2-cancel').should('be.visible').click()
		cy.get('#nomeVaga').should('have.value', 'exist');
		
	} )

	it('TC22- Botão "Sim" janela de Confirmação', ()=>{
		cy.get('#nomeVaga').type("exist")

		cy.get('.btn-secondary').click()

		cy.get('.swal2-popup').should('be.visible')
		
		cy.get('.swal2-confirm').should('be.visible').click()

	})

	it('TC023- Validação Descrição da Vaga Caracteres', ()=>{
		cy.get('.btn-primary').click({force:true})
		cy.testaCampoQuill('#descricaoVaga > .ql-container > .ql-editor',501)
		cy.get('#requisitosText > .ql-container > .ql-editor').click()
		cy.get('.error-msg').should('be.visible')

	})

	it('TC024- Validação Responsabilidades e Atribuições Caracteres', ()=>{
		cy.get('.btn-primary').click({force:true})
		cy.testaCampoQuill('#responsabilidadesText > .ql-container > .ql-editor',501)
		cy.get('#requisitosText > .ql-container > .ql-editor').click()
		cy.get('.error-msg').should('be.visible')


	})
	
	it('TC025- Validação Requisitos e Qualificações Caracteres', ()=>{
		cy.get('.btn-primary').click({force:true})
		cy.testaCampoQuill('#requisitosText > .ql-container > .ql-editor',501)
		cy.get('#informacoesText > .ql-container > .ql-editor').click()
		cy.get('.error-msg').should('be.visible')

	})

	it('TC026 - Validação Requisitos e Qualificações Caracteres', ()=>{
		cy.get('.btn-primary').click({force:true})
		cy.testaCampoQuill('#informacoesText > .ql-container > .ql-editor',501)
		cy.get('#requisitosText > .ql-container > .ql-editor').click()
		cy.get('.error-msg').should('be.visible')

	})

  it.skip('TC027 -  Validação Imagem',()=>{



  })

  it('TC028- Validação Campos Vazios', () => {
    cy.get('.btn-primary').click({force:true})
    cy.get('#descricaoVaga > .ql-container > .ql-editor').click()
    cy.get('#responsabilidadesText > .ql-container > .ql-editor').click()
    cy.get('.error-msg').should('exist').and('be.visible')
    cy.get('.btn-primary').should('be.disabled')

  })

  it('TC029- Botão Preview',() => {
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
    
    cy.testaCampoQuill('#descricaoVaga > .ql-container > .ql-editor',12)

    cy.testaCampoQuill('#responsabilidadesText > .ql-container > .ql-editor',12)

    cy.testaCampoQuill('#requisitosText > .ql-container > .ql-editor',12)

		cy.testaCampoQuill('#informacoesText > .ql-container > .ql-editor',12)

    cy.get('.d-flex > .btn-secondary').click()
    cy.get('app-template-vaga-preview').should('be.visible')

  })

  it.only('TC030- Botão Salvar', ()=>{
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
    
    cy.testaCampoQuill('#descricaoVaga > .ql-container > .ql-editor',12)

    cy.testaCampoQuill('#responsabilidadesText > .ql-container > .ql-editor',12)

    cy.testaCampoQuill('#requisitosText > .ql-container > .ql-editor',12)

		cy.testaCampoQuill('#informacoesText > .ql-container > .ql-editor',12)

    cy.get('.btn-primary').should('be.enabled')


  })
  


})