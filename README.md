# Cadastro de carro

**RF** 
Deve ser possível cadastrar um novo carro.

**RN**
Não deve ser possível cadastrar um carro uma placa já existente.
O carro deve ser cadastrado, por padrão, como disponivel.
O usuário responsável pelo cadastro deve ser um usuários administrador.

# Listagem de carros

**RF**
Deve ser possível listar todos os carros disponíveis.
Deve ser possível listar todos os carros disponíveis pelo nome da categoria.
Deve ser possível listar todos os carros disponíveis pelo nome da marca.
Deve ser possível listar todos os carros disponíveis pelo nome do carro.


**RN**
O usuário não precisa estar logado no sistema. 

# Cadastro de especificação no carro

**RF**
Deve ser possível cadastrar um especificação para um carro.


**RN**
Não deve ser possível cadastrar uma especificação para um carro não cadastrado.
Não deve ser possível cadastrar uma especificação já existente para um mesmo carro.
O usuário responsável pelo cadastro deve ser um usuários administrador.

# Cadastro de imagens do carro

**RF**
Deve ser possível cadastrar a imagem do carro.

**RNF**
Utilizar o multer para upload dos arquivos.

**RN**
O usuário deve poder cadastrar mais de uma imagem o mesmo carro.
O usuário responsável pelo cadastro deve ser um usuários administrador.

# Alugel de carro

**RF**
Deve ser possível cadastrar um aluguel

**RNF**

**RN**
O aluguel deve ter duração mínima de 1 hora 
Não deve ser possível cadastrar um novo aluguel caso já existe um aberto para o mesmo usuário.
Não deve ser possível cadastrar um novo aluguel caso já existe um aberto para o mesmo carro..