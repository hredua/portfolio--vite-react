export default function Sobre() {
  return (
    <section id="sobre" className="section aboutSection">
      <div className="aboutGrid">
        <div className="aboutText">
          <h2 className="sectionTitle">Como eu penso e trabalho</h2>

          <p>
            Trabalho como desenvolvedor front-end com foco em React, atuando
            também no back-end quando o problema exige automação, integrações ou
            bots.
          </p>

          <p>
            Meu interesse não está apenas em construir interfaces bonitas, mas
            em resolver fricções reais: processos manuais, fluxos confusos,
            integrações frágeis e experiências que geram erro ou retrabalho.
          </p>

          <h3>Meu método</h3>
          <p>
            Antes de escrever código, eu observo o sistema. Procuro entender
            onde as decisões são tomadas, onde o fluxo quebra e onde a
            tecnologia pode reduzir esforço humano — não apenas adicionar
            camadas.
          </p>

          <h3>Front-end com consciência de bastidor</h3>
          <p>
            No front-end, priorizo clareza, performance e feedback. No back-end,
            busco simplicidade, eventos bem definidos e respostas consistentes.
          </p>

          <h3>O que me atrai</h3>
          <ul>
            <li>Sistemas que cresceram no improviso</li>
            <li>Processos manuais que consomem tempo e atenção</li>
            <li>Interfaces conectadas a integrações reais</li>
            <li>Produtos que exigem decisões técnicas</li>
          </ul>
        </div>

        <div className="aboutCards">
          <div className="aboutCard">
            <span className="aboutCardTitle">Pensamento</span>
            <p>Pensar antes de codar evita soluções frágeis.</p>
          </div>

          <div className="aboutCard">
            <span className="aboutCardTitle">Execução</span>
            <p>Menos magia, mais previsibilidade em produção.</p>
          </div>

          <div className="aboutCard">
            <span className="aboutCardTitle">Produto</span>
            <p>UX não termina na interface.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
