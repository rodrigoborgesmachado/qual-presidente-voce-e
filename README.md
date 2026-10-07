# Qual Presidente é Você?

Quiz inteiramente frontend com React, Vite, JavaScript e React Router. Nenhum cadastro, backend ou API é necessário.

Endereço oficial: https://qual-presidente.netlify.app/. Configurado em `quiz.json` (`projectURL`) para compartilhamento e em `index.html` para URL canônica e Open Graph. Ao mudar de domínio, atualize os dois arquivos.

## Executar

```sh
npm install
npm run dev
npm run build
npm run preview
```

Em uma hospedagem estática, configure o fallback das rotas (`/modos`, `/quiz`, `/resultado`) para `index.html`.

## Conteúdo e dados de desenvolvimento

`src/data/quiz.json` é o contrato da aplicação. A estrutura original foi preservada: `version`, `election`, `quizModes`, `categories`, `candidates` e `questions`.

O conteúdo inicial contém quatro candidatos e seis perguntas **inteiramente fictícios**, sem propostas políticas. Os campos adicionais `development` e `developmentNote` identificam os exemplos; cada candidato e pergunta também possui `development: true`. A primeira imagem está propositalmente indisponível para demonstrar o fallback. Não publique esses exemplos como conteúdo eleitoral.

Para preencher o conteúdo real:

1. Substitua candidatos e perguntas, removendo todos os exemplos `dev-*`.
2. Use IDs únicos para candidatos, categorias, perguntas e alternativas de uma mesma pergunta. Cadastre a alternativa “Não sei / Não tenho opinião” no JSON com `id: "neutral"` e `matches: []`. A aplicação exibe somente as alternativas do JSON e não adiciona uma opção automática.
3. Em `matches`, associe somente IDs de candidatos cadastrados, com pesos numéricos não negativos. `question.weight` também deve ser numérico e não negativo; quando ausente, vale 1.
4. Mantenha `quizModes[modo].questionCount` como inteiro positivo e `levels` como array de níveis permitidos.
5. Preencha `sources` com as referências que sustentam as associações. URLs de fontes podem ser nulas; links externos aceitam HTTP e HTTPS.
6. Remova ou desative os campos `development` e remova `developmentNote` após substituir os exemplos. Incremente `version` ao atualizar o conteúdo para invalidar sessões anteriores.

`imageUrl` é usado diretamente, com fallback de iniciais se a imagem estiver ausente ou quebrada. `website` é opcional e reservado no contrato. Nenhum candidato é definido fora do JSON.

Preencha `candidates[].propostaUrl` com a URL pública das propostas de cada candidato. O link aparece no card de resultado, nas fontes das questões e nas referências da página Sobre. Para uma referência específica, use `questions[].sources[].propostaUrl` (prioridade sobre `sources[].url` e sobre a URL do candidato). Campos vazios, ausentes ou que não sejam URLs HTTP/HTTPS não geram links.

O compartilhamento inclui até três candidatos na ordem do resultado, seus percentuais já calculados, quantidade de respostas e modo escolhido. Não inclui respostas individuais. Empates na maior compatibilidade e ausência de afinidade recebem uma observação. A URL pública usa `projectURL` da raiz, com fallback para a origem do site.

## Seleção das perguntas

`selectQuestions` filtra pelos níveis do modo e elimina IDs duplicados. Embaralha as perguntas dentro de cada categoria, visita todas as categorias disponíveis por rodada em ordem aleatória e embaralha a seleção final. Categorias esgotadas saem das rodadas seguintes. Se faltarem perguntas, utiliza todas as elegíveis e informa a quantidade disponível na escolha de modo.

## Percentuais

`calculateResult` soma os pesos das associações da alternativa escolhida e multiplica pelo peso da pergunta. Associações repetidas do mesmo candidato na mesma opção são somadas.

Para cada pergunta, a base é a maior soma de associações de um único candidato entre as alternativas, multiplicada pelo peso da pergunta. O denominador geral soma essas bases; o denominador por categoria considera apenas as perguntas daquela categoria. Todos os candidatos usam os mesmos denominadores, permitindo comparação direta. IDs de candidatos desconhecidos e pesos inválidos de associações não pontuam.

`percentual = pontos obtidos / pontos máximos possíveis × 100`

Os percentuais têm uma casa decimal, não precisam somar 100% e expressam apenas afinidade com as perguntas selecionadas. Não representam probabilidade nem recomendação de voto. Perguntas com base zero não aumentam o denominador. Respostas neutras somam zero, mas mantêm a pergunta no denominador. Se todas as respostas forem neutras, todos recebem zero e a interface explica a ausência de afinidade. Empates seguem a ordem dos candidatos no JSON, sem destacar um vencedor.

## Sessão e navegação

Resultados concluídos são preservados em `localStorage`, na chave `qual-presidente-resultados-v1`, como JSON `{ version: 1, results: [...] }`. Cada registro guarda ID da sessão, data de conclusão, versão da base, edição, modo, contagem de respostas e uma cópia do ranking com os dados de apresentação e percentuais por tema. Não guarda respostas individuais. Os valores históricos não são recalculados após atualizar o quiz.

A rota `/resultados-anteriores`, acessível pelo canto superior direito da home, permite consultar, excluir um registro ou limpar todos. Recarregar e abrir uma nova aba preservam o histórico no mesmo navegador e origem; refazer o quiz limpa somente a sessão atual. Um ID por sessão evita duplicações ao recarregar. Uma sessão concluída antiga pode ser incorporada uma vez ao carregar esta versão, com a data do registro quando a original não está disponível. Falhas de armazenamento são informadas, com resultado disponível em memória enquanto a página permanecer aberta.

O contexto armazena IDs das perguntas, respostas, modo, posição e conclusão em `sessionStorage`. A sessão persiste ao recarregar na mesma aba. Um novo quiz substitui a sessão anterior, e “Refazer quiz” a limpa. Quando o navegador bloqueia o armazenamento, o quiz continua em memória e informa essa limitação.

Sessões incompatíveis com a versão ou com os IDs atuais são descartadas. O resultado sem sessão leva à escolha de modo; uma sessão incompleta leva à pergunta atual. As perguntas mostram somente texto e categoria; associações e fontes aparecem apenas na explicação do resultado.

## Organização

- `src/pages`: início, modos, quiz e resultado.
- `src/components`: layout, alternativas, progresso e resultados.
- `src/context`: estado e persistência da sessão.
- `src/utils`: seleção balanceada, embaralhamento e cálculo.
- `src/style.css`: visual responsivo, foco por teclado e suporte a movimento reduzido.

Não há suíte de testes unitários, conforme solicitado.
