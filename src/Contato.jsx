export default function Contato() {
  const email = "SEU_EMAIL@dominio.com";
  const subject = encodeURIComponent("Projeto / Parceria — Portfólio");
  const body = encodeURIComponent(
    "Oi Helamã! Vi seu portfólio e queria falar sobre:\n\n• Contexto:\n• Objetivo:\n• Prazo/urgência:\n• Stack/ambiente atual:\n\nPode me responder por aqui. Obrigado!"
  );

  const mailto = `mailto:${email}?subject=${subject}&body=${body}`;

  return (
    <section id="contato" className="section contactSection">
      <div className="contactGrid">
        <div className="contactText">
          <h2 className="sectionTitle">Vamos construir algo útil</h2>
          <p className="sectionLead">
            Se você tem um produto, uma operação ou um fluxo gerando fricção, eu
            ajudo a transformar isso em interface + automação com
            previsibilidade.
          </p>

          <div className="contactCtas">
            <a className="btn primary" href={mailto}>
              Enviar e-mail
            </a>
            <a className="btn" href="#projetos">
              Ver cases
            </a>
          </div>

          <div className="contactNote">
            Foco em React (Vite), integrações, webhooks e bots Telegram — com
            preocupação real de UX e produção.
          </div>
        </div>

        <div className="contactCards">
          <a className="contactCard" href={mailto}>
            <div className="contactCardTop">
              <span className="contactLabel">Email</span>
              <span className="contactHint">resposta mais rápida</span>
            </div>
            <div className="contactValue">{email}</div>
            <div className="contactMeta">
              Clique para abrir com assunto pronto.
            </div>
          </a>

          <a
            className="contactCard"
            href="https://github.com/SEU_USER"
            target="_blank"
            rel="noreferrer"
          >
            <div className="contactCardTop">
              <span className="contactLabel">GitHub</span>
              <span className="contactHint">código e projetos</span>
            </div>
            <div className="contactValue">github.com/SEU_USER</div>
            <div className="contactMeta">Repositórios, bots e integrações.</div>
          </a>

          <a
            className="contactCard"
            href="https://www.linkedin.com/in/SEU_USER/"
            target="_blank"
            rel="noreferrer"
          >
            <div className="contactCardTop">
              <span className="contactLabel">LinkedIn</span>
              <span className="contactHint">networking</span>
            </div>
            <div className="contactValue">linkedin.com/in/SEU_USER</div>
            <div className="contactMeta">Vamos conversar por lá também.</div>
          </a>

          <div className="contactCard subtle">
            <div className="contactCardTop">
              <span className="contactLabel">Assunto sugerido</span>
              <span className="contactHint">pra agilizar</span>
            </div>
            <div className="contactValue">“Projeto / Parceria — Portfólio”</div>
            <div className="contactMeta">
              Inclua: contexto, objetivo, prazo e stack atual.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
