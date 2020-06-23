# Desafio 09: Relacionamentos com banco de dados no Node.js
- Link do desafio: https://github.com/Rocketseat/bootcamp-gostack-desafios/tree/master/desafio-database-relations

</br>

## Permitir criação de clientes

<table>
 <tr>  costumer  </tr>
  <tr>
    <td> id  </td>
    <td> name </td>
    <td> email </td>
    <td> created_at </td>
    <td> updated_at </td>
  </tr>
</table>
<br>

**RF**

- Cliente pode gerar novos pedidos de compra;
- Enviar name e email na requisição;

**RN**

- Verificar antes de cadastrar um novo costomer se existe o email;
- Espero que, se exister um email já cadastrado com o mesmo que estou enviando, retorne um erro;

## Permitir criação de produtos

**RF**

- Espero que o produto seja cadastrado no banco de dados ao enviar a requisição com name, price e quantity

**RN**

- Espero que retorne um erro, se ao cadastrar o produto ele ja exista no banco;
- Utilizar o type decimal na migration para o campo price, passando as propriedades (precision, scaling);

<table>
 <tr>  products  </tr>
  <tr>
    <td> id  </td>
    <td> name </td>
    <td> price </td>
    <td> quantity </td>
    <td> created_at </td>
    <td> updated_at </td>
  </tr>
</table>

## Permitir criação de pedidos (orders)

**RF**

- Espero receber no corpo da request o customer_id;
- Espero receber no corpo da request um array de produtos com a quantidade e o id;

<table>
 <tr>  orders  </tr>
  <tr>
    <td> id  </td>
    <td> customer_id </td>
    <td> created_at </td>
    <td> updated_at </td>
  </tr>
</table>
<br>

<br>
<table>
 <tr>  orders_products  </tr>
  <tr>
    <td> id  </td>
    <td> product_id</td>
    <td> order_id </td>
    <td> price </td>
    <td> quantity </td>
    <td> created_at </td>
    <td> updated_at </td>
  </tr>
</table>

## TO DO
[ X ] Criar migrations
[   ] Criar entidades e relacionar
[   ] Criar rota para salvar o usuário
[   ] Criar rota para salvar o produto
[   ] Criar rota para salvar o pedido e itens do pedido
