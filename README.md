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
Não deve ser possível cadastrar um novo aluguel caso já existe um aberto para o mesmo carro.
O usuário deve estar logado na aplicação.
Ao realizar um aluguel, o status do carro deverá ser alterado para indisponível.

# Devolução de carro

**RF**
Deve ser possível realizar a devolução de carro.

**RN**
Se o carro for devolvido com menos de 24 horas, deverá ser cobrado diária completa.
Ao realizar a devolução, o carro deverá se liberado para outro aluguel.
Ao realizar a devolução, o usuário deverá ser liberado para outro aluguel.
Ao realizar a devolução, deverá ser calculado o total do aluguel.
Caso o horário de devolução seja superior ao horário previsto de entrega, deverá ser cobrado multa proporcional ao dias de atraso.
Caso haja multa, deverá ser somada ao total do aluguel.

# Listagem de Alugueis para usuário

**RF**
Deve ser possível realizar a busca de todos os Alugueis para o usuário.

**RN**
O usuário deve estar çagado na aplicação

# Recuperar Senha

**RF**

- Deve ser possível o usuário recuperar a senha infomando o e-mail
- O usuário deve receber um e-mail com o passo a passo para a recuperação da senha
- O usuário deve conseguir enserir uma nova senha

**RN**

- O usuário precisa informar um nova senha
- O link enviada para a recuperação deve espirar em 3 horas
