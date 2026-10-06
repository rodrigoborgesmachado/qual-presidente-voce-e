import { Link } from "react-router-dom";
import InfoPage from "../components/InfoPage";
import { useQuiz } from "../context/QuizContext";
import { company } from "../data/company";
import { proposalUrl } from "../utils/proposalUrl";

export default function About() {
  const { data } = useQuiz();
  const documents = new Map();
  for (const source of data.questions.flatMap(
    (question) => question.sources ?? [],
  )) {
    const title = source.document || source.title;
    if (!title) continue;
    const candidate = data.candidates.find(
      (candidate) => candidate.id === source.candidateId,
    );
    const url = proposalUrl(source, candidate);
    if (!documents.has(title) || url) documents.set(title, url);
  }
  return (
    <InfoPage
      eyebrow="IDEIAS, FONTES E TRANSPARÊNCIA"
      title="Sobre o projeto"
      intro="Entenda de onde vêm as perguntas, como suas respostas se transformam em uma comparação e o que o resultado significa."
    >
      <section>
        <h2>Uma reflexão sobre o país que você quer</h2>
        <p>
          O “Qual Presidente é Você?” é um quiz de compatibilidade entre suas
          opiniões e as propostas dos candidatos à Presidência da República na
          edição eleitoral de {data.election.year}. A ideia é facilitar o
          primeiro contato com os programas e estimular uma conversa sobre temas
          que afetam a vida em sociedade: educação, saúde, economia, trabalho,
          meio ambiente e muitos outros.
        </p>
        <p>
          Durante as perguntas, os nomes, partidos e fotos dos candidatos ficam
          fora das alternativas. Você escolhe a ideia mais próxima do que pensa,
          sem receber a identificação de quem está associado a ela. Essa
          apresentação procura dar espaço à reflexão sobre o conteúdo das
          propostas antes de revelar as afinidades do resultado.
        </p>
        <p>
          O projeto foi desenvolvido pela{" "}
          <a href={company.website} target="_blank" rel="noopener noreferrer">
            {company.name}
          </a>
          . É uma ferramenta de consulta e reflexão: o percentual não substitui
          a leitura dos programas nem a avaliação pessoal de cada candidatura.
        </p>
      </section>
      <section>
        <h2>De onde vêm as questões</h2>
        <p>
          Todas as questões da base desta edição foram elaboradas a partir das
          propostas dos candidatos reunidas para o projeto de{" "}
          {data.election.year}. Os planos de governo fornecidos à curadoria
          servem de base para os temas, alternativas e associações entre uma
          resposta e um candidato.
        </p>
        <p>
          As perguntas são uma adaptação desse material para o formato de quiz.
          Uma alternativa pode resumir uma ideia, reunir elementos de um
          documento ou expressar uma posição compartilhada por mais de um
          programa. Por isso, o texto de uma resposta não deve ser interpretado
          como uma citação literal de um candidato.
        </p>
        <p>
          As referências cadastradas acompanham as questões. Na tela de
          resultado, a seção “Por que este resultado?” reúne sua resposta, as
          associações e as fontes disponíveis. Alguns registros têm apenas o
          nome do documento: quando não há endereço público ou página informada,
          o projeto não oferece esses detalhes como se estivessem verificados. A
          indicação de um arquivo também não comprova, por si só, a data de
          publicação ou a situação oficial de uma candidatura.
        </p>
        <p>
          Conhecer a origem de uma associação ajuda a colocar o resultado em
          contexto. Se você encontrar uma interpretação que merece revisão, uma
          fonte incompleta ou uma proposta que mudou,{" "}
          <Link to="/contato">entre em contato</Link> com o texto da questão e a
          referência que fundamenta sua observação.
        </p>
      </section>
      <section>
        <h2>O que está na base atual</h2>
        <div className="info-stats">
          <div>
            <strong>{data.questions.length}</strong>
            <span>questões disponíveis</span>
          </div>
          <div>
            <strong>{data.categories.length}</strong>
            <span>temas cadastrados</span>
          </div>
          <div>
            <strong>{data.candidates.length}</strong>
            <span>candidatos na comparação</span>
          </div>
        </div>
        <p>
          Essas quantidades representam o conteúdo cadastrado, e não a
          quantidade de perguntas que toda pessoa responderá. Os modos utilizam
          subconjuntos dessa base. A inclusão de um candidato depende dos dados
          presentes no projeto; a lista não constitui uma confirmação de
          registro eleitoral nem uma lista oficial de todos os participantes da
          eleição.
        </p>
        <div className="topic-tags">
          {data.categories.map((category) => (
            <span key={category.id}>{category.name}</span>
          ))}
        </div>
      </section>
      <section>
        <h2>Três ritmos para explorar suas opiniões</h2>
        <p>
          Você escolhe a profundidade da comparação antes de começar. Os modos e
          suas quantidades são definidos na própria base de conteúdo:
        </p>
        <ul>
          {Object.entries(data.quizModes).map(([id, mode]) => (
            <li key={id}>
              <strong>
                {mode.name}: até {mode.questionCount} perguntas.
              </strong>{" "}
              {mode.description}
            </li>
          ))}
        </ul>
        <p>
          O modo rápido utiliza questões de nível simples; o equilibrado
          acrescenta questões intermediárias; e o completo inclui também as de
          maior profundidade. Se a quantidade disponível para um modo for menor
          que a prevista, a tela de escolha informa quantas perguntas serão
          apresentadas.
        </p>
        <p>
          As perguntas são selecionadas aleatoriamente, sem repetição, com
          distribuição entre os temas disponíveis. A seleção percorre as
          categorias em rodadas para evitar concentração excessiva em um único
          assunto. Duas sessões podem apresentar perguntas diferentes; por isso,
          seus resultados também podem variar mesmo quando algumas respostas são
          parecidas.
        </p>
      </section>
      <section>
        <h2>Como responder</h2>
        <p>
          Leia cada pergunta e escolha a alternativa mais próxima da sua
          opinião. Você pode avançar, voltar e mudar uma resposta enquanto o
          quiz estiver em andamento. Não é necessário concordar integralmente
          com uma frase: a escolha representa a aproximação possível entre sua
          opinião e as alternativas disponíveis.
        </p>
        <p>
          A opção “Não sei / Não tenho opinião” permite seguir sem atribuir
          pontos a nenhum candidato. Não há obrigação de opinar sobre todos os
          temas. Quando todas as respostas são neutras, os percentuais ficam em
          zero e a aplicação informa que não identificou uma afinidade.
        </p>
        <p>
          As respostas ficam na sessão da aba do navegador, para que você possa
          recarregar a página sem perder o andamento. Iniciar outro quiz
          substitui essa sessão. Saiba mais na{" "}
          <Link to="/privacidade">política de privacidade</Link>.
        </p>
      </section>
      <section>
        <h2>Como a compatibilidade é calculada</h2>
        <p>
          Cada alternativa pode estar associada a um ou mais candidatos. Cada
          associação recebe um peso que representa a proximidade registrada na
          base. Ao responder, o cálculo soma esses pesos para os candidatos
          associados e aplica também o peso da pergunta. Não há tratamento
          especial no código para um candidato específico.
        </p>
        <p>
          O percentual exibido compara os pontos obtidos com a maior pontuação
          possível nas perguntas selecionadas. A base de comparação é a mesma
          para todos os candidatos. Na análise por tema, o cálculo considera
          apenas as perguntas daquela categoria. Os percentuais não são uma
          divisão de votos e não precisam somar 100%.
        </p>
        <p>
          Uma resposta neutra soma zero, mas sua pergunta continua na base do
          percentual. Uma alternativa sem associação também não pontua. A
          ausência de pontos não deve ser lida automaticamente como oposição do
          candidato à sua opinião: pode refletir ausência de uma posição
          documentada naquela alternativa.
        </p>
        <p>
          Os resultados são ordenados pela pontuação calculada. Em um empate, a
          interface avisa que há candidatos com a mesma maior compatibilidade; a
          ordem de cadastro determina a apresentação entre pontuações iguais. O
          primeiro item de um ranking empatado não possui, por essa posição
          visual, uma afinidade superior aos demais empatados.
        </p>
      </section>
      <section>
        <h2>Como interpretar seu resultado</h2>
        <p>
          Compatibilidade é uma medida limitada às perguntas, alternativas e
          associações utilizadas nesta sessão. Ela não avalia todo o programa de
          governo, a viabilidade das propostas, a trajetória dos candidatos,
          alianças, conduta ou todos os fatores relevantes para uma decisão de
          voto. Um percentual alto não significa concordância integral; um
          percentual baixo não resume toda a relação entre suas ideias e um
          programa.
        </p>
        <p>
          O quiz também não é pesquisa eleitoral: não mede intenção de voto, não
          utiliza amostra representativa e não estima desempenho nas urnas. A
          seleção aleatória e as diferenças de cobertura documental entre
          candidatos podem influenciar a comparação. Use as barras por tema e as
          referências para entender o que o número representa.
        </p>
        <p>
          O compartilhamento é opcional e inclui o nome do projeto, os nomes e
          percentuais dos três primeiros candidatos do ranking (ou dos
          disponíveis), a quantidade de respostas, o modo escolhido e o endereço
          público do projeto. Suas respostas individuais não acompanham esse
          texto. Considere que divulgar uma afinidade política pode revelar algo
          pessoal sobre você.
        </p>
      </section>
      {documents.size > 0 && (
        <section>
          <h2>Referências documentais cadastradas</h2>
          <p>
            Os nomes abaixo são extraídos das referências das questões. Essa
            lista permite identificar o material citado na base, mas não
            substitui os documentos completos. Nem todas as referências possuem
            URL ou número de página disponível.
          </p>
          <ul className="document-list">
            {[...documents].map(([document, url]) => (
              <li key={document}>
                {url ? (
                  <a href={url} target="_blank" rel="noopener noreferrer">
                    {document} ↗
                  </a>
                ) : (
                  document
                )}
              </li>
            ))}
          </ul>
        </section>
      )}
      <aside className="reflection-note">
        <span aria-hidden="true">ⓘ</span>
        <div>
          <strong>Sua escolha continua sendo sua.</strong>
          <p>
            Compare ideias, consulte as fontes e conheça os programas completos.
            Este projeto não oferece recomendação de voto.
          </p>
        </div>
      </aside>
      <Link className="button primary" to="/modos">
        Explorar minhas afinidades →
      </Link>
    </InfoPage>
  );
}
