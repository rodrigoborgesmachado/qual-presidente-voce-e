import { useState } from "react";
import { Link } from "react-router-dom";
import InfoPage from "../components/InfoPage";
import { useQuiz } from "../context/QuizContext";
import { company } from "../data/company";

export default function Privacy() {
  const { reset, session, storageUnavailable } = useQuiz();
  const [cleared, setCleared] = useState(false);
  return (
    <InfoPage
      eyebrow="SEUS DADOS, COM CLAREZA"
      title="Política de privacidade"
      intro="Uma explicação do que acontece com suas respostas, quais recursos do navegador são usados e o que muda quando você abre um serviço externo."
    >
      <p className="policy-date">
        Atualizada em 6 de outubro de 2026 · Aplicável a esta versão do projeto
      </p>
      <section>
        <h2>Sobre esta política</h2>
        <p>
          Esta política descreve o funcionamento do “Qual Presidente é Você?”,
          desenvolvido pela {company.name}. O quiz funciona no navegador, sem
          cadastro, autenticação ou banco de dados de respostas no código da
          aplicação. Para dúvidas sobre privacidade ou sobre esta explicação,
          utilize os canais da <Link to="/contato">página de contato</Link>.
        </p>
        <p>
          Uma opinião sobre propostas políticas é uma informação pessoal que
          merece cuidado. Você pode usar o quiz sem informar nome, documento,
          endereço de e-mail, telefone ou qualquer identificação. O resultado
          serve à sua reflexão; você decide se deseja divulgá-lo.
        </p>
      </section>
      <section>
        <h2>Informações utilizadas durante o quiz</h2>
        <p>
          Para apresentar as perguntas e calcular o resultado, a aplicação
          utiliza o modo escolhido, os identificadores das perguntas
          selecionadas, suas alternativas escolhidas, a posição atual no quiz e
          a indicação de conclusão. A versão da base também é registrada, para
          que uma sessão incompatível com conteúdo atualizado possa ser
          descartada.
        </p>
        <p>
          Essas informações permitem voltar a uma pergunta, mudar uma resposta e
          recuperar o andamento ao recarregar. Elas não são enviadas pelo código
          do quiz a uma API de resultados, a um cadastro de usuários ou a um
          sistema de campanhas. O cálculo ocorre no próprio navegador.
        </p>
        <p>
          A lista de candidatos, os temas, as perguntas, os pesos e as
          referências são conteúdo da aplicação carregado para realizar a
          comparação. Eles não são um perfil individual do visitante.
        </p>
      </section>
      <section>
        <h2>Armazenamento na aba do navegador</h2>
        <p>
          O andamento é salvo em <code>sessionStorage</code>, um recurso de
          armazenamento do navegador vinculado à sessão da aba e à origem do
          site. Isso permite recarregar a página e continuar. Não se trata de um
          cadastro na empresa ou de sincronização entre dispositivos.
        </p>
        <p>
          Em condições normais, fechar a aba encerra essa sessão. Alguns
          navegadores podem restaurar abas e seus dados depois de uma
          reabertura; por isso, fechar a janela não é a única forma de controlar
          o armazenamento. Para apagar o progresso de forma explícita, use o
          botão abaixo ou os controles de dados do site no seu navegador.
        </p>
        <p>
          Iniciar um novo quiz substitui a sessão anterior. “Refazer quiz” limpa
          a sessão antes de levar à escolha de modo. Se o armazenamento estiver
          bloqueado, as respostas continuam apenas em memória enquanto a página
          estiver aberta, e a interface informa a limitação.
        </p>
        <button
          className="button secondary"
          disabled={!session}
          onClick={() => {
            reset();
            setCleared(true);
          }}
        >
          Apagar minha sessão do quiz
        </button>
        <p className="privacy-feedback" role="status">
          {cleared
            ? storageUnavailable
              ? "A sessão em memória foi apagada, mas o navegador não permitiu remover o armazenamento. Use os controles de dados do site no navegador."
              : "Sessão apagada. O andamento e o resultado anteriores foram removidos deste quiz."
            : !session
              ? "Não há uma sessão ativa do quiz nesta aba."
              : "Esta ação remove o andamento e o resultado desta aba."}
        </p>
      </section>
      <section>
        <h2>Cookies e ferramentas de acompanhamento</h2>
        <p>
          O código atual do quiz não instala cookies de publicidade, não inclui
          ferramentas de análise de audiência e não cria identificadores de
          rastreamento. O armazenamento de andamento descrito acima utiliza a
          sessão do navegador, não um cookie de publicidade.
        </p>
        <p>
          Esta descrição se refere à aplicação. Ela não significa que toda a
          infraestrutura da internet deixa de processar informações técnicas. O
          servidor de hospedagem, a rede de distribuição de conteúdo ou o
          provedor de imagens podem receber dados necessários para entregar uma
          página ou arquivo, como endereço IP, data e hora da requisição,
          endereço solicitado e informações técnicas do navegador. O projeto não
          estabelece nesta página prazos de retenção para serviços externos que
          não controla.
        </p>
      </section>
      <section>
        <h2>Imagens e endereços externos</h2>
        <p>
          As fotos dos candidatos podem ser carregadas de endereços externos
          cadastrados na base. Quando isso acontece, seu navegador solicita a
          imagem ao respectivo servidor. Essa requisição pode transmitir
          informações técnicas usuais de navegação; ela não inclui o conjunto de
          respostas do quiz enviado pela aplicação.
        </p>
        <p>
          Fontes documentais, o site da {company.name}, LinkedIn e WhatsApp são
          destinos externos. Ao abrir esses links, você passa a utilizar
          serviços com suas próprias práticas e políticas. A aplicação não
          controla o armazenamento, os registros ou o tratamento realizado por
          esses serviços.
        </p>
      </section>
      <section>
        <h2>Compartilhamento do resultado</h2>
        <p>
          Compartilhar é uma ação opcional, iniciada por você. Quando o
          navegador oferece compartilhamento nativo, o projeto solicita a
          abertura do menu do dispositivo. Você escolhe o aplicativo, o
          destinatário e se deseja concluir o envio. Cancelar esse menu não é
          tratado como erro pelo quiz.
        </p>
        <p>
          O conteúdo preparado contém o nome do projeto, os nomes e percentuais
          dos três primeiros candidatos no ranking (ou dos disponíveis), a
          quantidade total de respostas, o modo escolhido e a URL pública. Pode
          incluir um aviso de empate ou de ausência de afinidade, além de
          explicar que o resultado não é recomendação de voto. Não inclui
          respostas individuais, o texto das perguntas respondidas, histórico,
          identificador de usuário ou a lista completa de candidatos. O endereço
          público não transporta sua sessão de respostas.
        </p>
        <p>
          Sem suporte ao menu nativo, ou em caso de falha real, a aplicação
          tenta copiar esse texto para a área de transferência. O navegador pode
          pedir permissão ou bloquear a operação. O conteúdo copiado fica
          sujeito aos controles da área de transferência do seu dispositivo, que
          pode ter histórico ou sincronização habilitados. Você pode
          substituí-lo copiando outro texto ou apagá-lo pelos controles do
          sistema.
        </p>
        <p>
          Depois de enviar a mensagem, o tratamento pelo aplicativo e pelos
          destinatários depende do serviço escolhido. Pense em quem poderá
          visualizar ou encaminhar o conteúdo antes de compartilhar uma
          afinidade política.
        </p>
      </section>
      <section>
        <h2>Contato e informações enviadas por você</h2>
        <p>
          A página de contato oferece links para canais da empresa, sem
          formulário de envio dentro do quiz. Apenas abrir essa página não envia
          suas respostas. Se você entrar em contato por WhatsApp, LinkedIn ou
          outro canal institucional, as informações que escrever serão
          encaminhadas por aquele serviço.
        </p>
        <p>
          Para relatar um problema, normalmente basta indicar a tela, a
          pergunta, o comportamento esperado e o que aconteceu. Não é necessário
          enviar todas as respostas, o resultado completo ou informações de
          identificação. Se optar por enviar uma captura de tela, confira antes
          se ela revela dados que você prefere manter privados.
        </p>
      </section>
      <section>
        <h2>Suas opções e atualizações</h2>
        <p>
          Você pode não responder a um tema, encerrar o quiz, apagar a sessão da
          aba, recusar permissões de compartilhamento ou clipboard e não abrir
          serviços externos. Também pode consultar esta página antes de iniciar
          a comparação e entrar em contato para pedir esclarecimentos sobre o
          funcionamento.
        </p>
        <p>
          Esta política descreve a versão atual. Caso novos recursos alterem o
          uso de dados — por exemplo, cadastro, análise de audiência ou envio de
          resultados a um servidor — a explicação deverá ser atualizada para
          refletir esse comportamento. A data no início da página indica a
          revisão deste texto.
        </p>
      </section>
    </InfoPage>
  );
}
