# Bloco 6 dias 1 e 2

## HTML & CSS - Forms / dia 1

### Criando um formulário de currículo.
- Crie um arquivo HTML chamado form.html para o formulário.
- Caso julgue necessário, crie estilos CSS para o seu formulário, de acordo com a sua imaginação. Coloque-os em um arquivo styles.css .
- Crie também um arquivo script.js para seu código JavaScript .

Vamos criar um formulário de cadastro de currículo com base na especificação a seguir:

1. Crie um ```<fieldset>``` para os seguintes dados pessoais:
    - Nome - Texto
        - Limite de 40 caracteres
        - Campo obrigatório
    - Email - Texto
        - Limite de 50 caracteres
        - Campo obrigatório
    - CPF - Texto
        - Limite de 11 caracteres
        - Campo obrigatório
    - Endereço - Texto
        - Limite de 200 caracteres
        - Campo obrigatório
    - Cidade - Texto
        -Limite de 28 caracteres
        - Campo obrigatório
    - Estado - ComboBox
        - Todos os estados do Brasil
        - Utilize estruturas de repetição via JavaScript para gerar os <option>
        - Campo obrigatório
    - Tipo - Radio Button
        - Casa, Apartamento
        - Campo obrigatório

2. Crie outro ```<fieldset>``` para dados do seu último emprego
    - Resumo do currículo - TextArea
        - Limite de 1000 caracteres
        - Campo obrigatório
    - Cargo - Texto
        - Limite de 40 caracteres
        - Campo obrigatório
    - Descrição do cargo - Texto
        - Limite de 500 caracteres
        - Campo obrigatório
    - Data de início - Texto
        - Verificar o formato da data dd/mm/aaaa .
        - O dia deve ser > 0 e <= 31.
        - O mês deve ser > 0 e <= 12.
        - O ano não pode ser negativo.
        - Caso alguma das condições for inválida no momento do envio do formulário, exibir mensagem de erro contextualizada.
        - Campo obrigatório
3. Logo abaixo do formulário, crie um botão que:
    - Chame uma função JavaScript e interrompa o fluxo automático do form utilizando o preventDefault() .
    - Execute as validações que foram pedidas ao longo da montagem do formulário.
    - Monte uma <div> com o consolidado dos dados que foram inseridos no formulário.
4. Crie um botão Limpar que limpa todos os campos do formulário e a <div> com seu currículo também.

## Bibliotecas JavaScript e Frameworks CSS / dia 2

1. Adicione um framework CSS de sua escolha ao formulário que você construiu na última aula e o utilize para estilizar o formulário.
    - Sugestões: [Bulma](https://bulma.io/), [Bootstrap](https://getbootstrap.com/) , [Semantic UI](https://semantic-ui.com/) e [Materialize](https://materializecss.com/).
2. Adicione uma biblioteca JavaScript de date picker ao formulário que você construiu na última aula. Utilize essa biblioteca no campo "Data de início" do formulário. Você pode remover as validações de data que adicionou, uma vez que a biblioteca se encarregará de permitir somente datas válidas.
    - Sugestões: [DatePickerX(https://github.com/AlexKrupko/DatePickerX)] e [Pickaday](https://github.com/Pikaday/Pikaday).
3. Adicione uma biblioteca JavaScript de validações ao formulário que você construiu na última aula. Utilize essa biblioteca para substituir as validações que você fez manualmente.
    - Sugestões: Just-validate e popup-validation

## Resultado final

O Exercicício acima foi feito com o framework CSS [Bootstrap](https://getbootstrap.com/) e [Pickaday](https://github.com/Pikaday/Pikaday), e as validações atravez do html do Bootstrap.

Clique [aqui](https://saulokirchmaier.github.io/forms_bootstrap/) para testar o resultado final.

![Imagem](img_forms.png)

