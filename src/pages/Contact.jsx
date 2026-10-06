import InfoPage from "../components/InfoPage";
import { company } from "../data/company";

export default function Contact() {
  return (
    <InfoPage
      eyebrow="VAMOS CONVERSAR"
      title="Contato"
      intro="Encontrou algo que merece revisão, precisa de ajuda ou quer conhecer quem desenvolveu o projeto? Estes são os canais da SunSale System."
    >
      <section>
        <h2>Fale com a SunSale System</h2>
        <p>
          A {company.name} é a empresa responsável pelo desenvolvimento deste
          projeto. As referências abaixo são os canais institucionais utilizados
          no projeto SunSaleWebSite. Você pode usá-los para dúvidas sobre o
          funcionamento, sugestões de melhoria, acessibilidade e esclarecimentos
          sobre privacidade.
        </p>
        <div className="contact-grid">
          <a href={company.whatsapp} target="_blank" rel="noopener noreferrer">
            <span className="eyebrow">CONVERSA DIRETA</span>
            <h3>WhatsApp ↗</h3>
            <p>Abra o canal de contato da empresa e escreva sua mensagem.</p>
          </a>
          <a href={company.website} target="_blank" rel="noopener noreferrer">
            <span className="eyebrow">CONHEÇA A EMPRESA</span>
            <h3>Site institucional ↗</h3>
            <p>
              Veja informações sobre a SunSale System, seus serviços e projetos.
            </p>
          </a>
          <a href={company.linkedin} target="_blank" rel="noopener noreferrer">
            <span className="eyebrow">CANAL INSTITUCIONAL</span>
            <h3>LinkedIn ↗</h3>
            <p>Acesse a página da empresa e seus recursos de contato.</p>
          </a>
        </div>
        <p>
          Esses links abrem serviços externos. A mensagem é escrita e enviada
          por você no canal escolhido; esta página não envia automaticamente
          seus dados ou suas respostas do quiz. Não há um formulário de
          atendimento dentro da aplicação.
        </p>
      </section>
      <section>
        <h2>Correções de questões e fontes</h2>
        <p>
          As questões desta edição foram elaboradas a partir das propostas dos
          candidatos reunidas para o projeto. A transformação de um programa em
          alternativas comparáveis envolve resumo e interpretação, e pode
          precisar de revisão quando uma referência estiver incompleta ou houver
          mudança no material de origem.
        </p>
        <p>
          Para sugerir uma correção, indique o texto da pergunta, a alternativa
          ou associação questionada e o candidato relacionado. Se possível,
          inclua o documento, o endereço público e a página ou trecho que
          sustentam sua observação. Explique qual informação merece ser revista
          e por quê. Uma referência específica ajuda a avaliar o conteúdo sem
          depender de uma impressão sobre o percentual final.
        </p>
        <p>
          Também são úteis avisos sobre documentos sem link, páginas não
          identificadas, nomes incorretos, imagens indisponíveis ou propostas
          que não correspondam ao material citado. Não é necessário enviar seu
          histórico de respostas para apontar esses problemas.
        </p>
      </section>
      <section>
        <h2>Problemas técnicos e acessibilidade</h2>
        <p>
          Se algo não funcionar, diga em qual tela aconteceu, qual ação você
          realizou e o que apareceu. Informe se estava no celular, tablet ou
          computador e, se souber, o navegador utilizado. Para erros de
          navegação ou compartilhamento, mencione se o problema ocorreu ao
          recarregar, voltar a uma pergunta, copiar o resultado ou abrir o menu
          de compartilhamento.
        </p>
        <p>
          Se a dificuldade envolver leitura, contraste, navegação por teclado,
          leitor de tela ou tamanho dos controles, descreva o ponto que impediu
          ou dificultou o uso. Relatos concretos ajudam a priorizar ajustes para
          tornar a comparação mais confortável e acessível.
        </p>
      </section>
      <section>
        <h2>Dúvidas sobre seus dados</h2>
        <p>
          O quiz calcula a compatibilidade no navegador e mantém o andamento na
          sessão da aba. Para entender o armazenamento, as imagens externas ou o
          conteúdo compartilhado, consulte a política de privacidade disponível
          nos links desta página. Você também pode falar com a empresa para
          pedir esclarecimentos.
        </p>
        <p>
          Ao enviar uma mensagem, compartilhe apenas as informações necessárias
          para explicar sua dúvida. Capturas de tela podem mostrar suas
          preferências; revise o conteúdo antes de encaminhá-las. Não envie
          documentos pessoais, senhas ou dados de outras pessoas para relatar um
          problema do quiz.
        </p>
      </section>
      <section>
        <h2>Sugestões para o projeto</h2>
        <p>
          Você pode sugerir novos temas, melhorias de apresentação, referências
          mais claras e formas de explicar o resultado. Propostas de conteúdo
          são mais úteis quando acompanhadas de documentos e justificativas que
          permitam uma comparação consistente entre os candidatos.
        </p>
        <p>
          O objetivo do contato é melhorar a clareza, a qualidade do conteúdo e
          a experiência de uso. O resultado continua sendo uma comparação
          limitada às propostas e respostas da sessão, sem recomendação de voto.
          A página não estabelece prazo de resposta nem atendimento automático;
          o retorno depende do canal e da disponibilidade da empresa.
        </p>
      </section>
    </InfoPage>
  );
}
