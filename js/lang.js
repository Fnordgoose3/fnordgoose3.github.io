// lang.js - versão que também traduz About, contatos, portfolio e cards
document.addEventListener('DOMContentLoaded', () => {
  const langBtn = document.getElementById('lang-btn');
  if (!langBtn) {
    console.error('lang.js: botão de idioma (#lang-btn) não encontrado no DOM.');
    return;
  }

  const navLinks = document.querySelectorAll('.nav-list a');
  const homeTitle = document.querySelector('#home h2');
  const homeDesc  = document.querySelector('#home p');
  const contatoP  = document.querySelector('#contato p');
  const contactItems = document.querySelectorAll('.contact-list a, .contact-list li');
  const cvBtn     = document.querySelector('.cv-btn');
  const aboutTitle = document.querySelector('#sobre h2');
  const aboutP     = document.querySelector('#sobre p');
  const portfolioTitle = document.querySelector('#portfolio h2');
  const portfolioP     = document.querySelector('#portfolio p');
  const footerText = document.querySelector('footer p');

  // Avisos
  if (!navLinks.length) console.warn('lang.js: nenhum link com .nav-list a encontrado (verifica os data-pt/data-en/data-jp).');
  if (!homeTitle) console.warn('lang.js: #home h2 não encontrado.');
  if (!homeDesc)  console.warn('lang.js: #home p não encontrado.');
  if (!contatoP)  console.warn('lang.js: #contato p não encontrado.');
  if (!cvBtn)     console.warn('lang.js: botão do currículo (.cv-btn) não encontrado.');
  if (!aboutTitle) console.warn('lang.js: #sobre h2 não encontrado.');
  if (!portfolioTitle) console.warn('lang.js: #portfolio h2 não encontrado.');

  const languages = ['pt', 'en', 'jp'];
  let currentIndex = 0;

  const texts = {
    pt: {
      heroTitle: "Olá, eu sou o Gabriel 👋",
      heroDesc: "Sou apaixonado por tecnologia e criação de jogos. <br> Atualmente estou focado em aprender programação e desenvolver meus próprios projetos.",
      contato: "Entre em contato comigo:",
      cv: "Veja meu currículo aqui",
      sobreTitle: "Sobre mim",
      sobreP: "Sou Gabriel Machado — estudante de programação e criador de jogos. Gosto de aprender fazendo e de transformar ideias em protótipos jogáveis.",
      portfolioTitle: "Portfólio",
      portfolioP: "Aqui vão alguns projetos (jogos, sites e outros).",
      footer: "© 2025 Gabriel da Silva Machado. Todos os direitos reservados.",
      flag: "🇧🇷 PT"
    },
    en: {
      heroTitle: "Hi, I'm Gabriel 👋",
      heroDesc: "I'm passionate about technology and game development. <br> I'm currently focused on learning programming and creating my own projects.",
      contato: "Get in touch with me:",
      cv: "See my resume here",
      sobreTitle: "About me",
      sobreP: "I'm Gabriel Machado — a programming student and game creator. I like learning by doing and turning ideas into playable prototypes.",
      portfolioTitle: "Portfolio",
      portfolioP: "Here are some projects (games, websites and others).",
      footer: "© 2025 Gabriel da Silva Machado. All rights reserved.",
      flag: "🇺🇸 EN"
    },
    jp: {
      heroTitle: "こんにちは、ガブリエルです 👋",
      heroDesc: "テクノロジーとゲーム開発が大好きです。<br> 現在はプログラミングを学び、自分のプロジェクトを作ることに集中しています。",
      contato: "ご連絡はこちらから：",
      cv: "履歴書を見る",
      sobreTitle: "自己紹介",
      sobreP: "私はガブリエル・マシャードです。プログラミングを学び、ゲームを制作しています。アイデアをプレイできるプロトタイプに変えるのが好きです。",
      portfolioTitle: "ポートフォリオ",
      portfolioP: "ここにいくつかのプロジェクト（ゲーム、サイトなど）を載せます。",
      footer: "© 2025 Gabriel da Silva Machado。全著作権所有。",
      flag: "🇯🇵 日本語"
    }
  };

  // Função que aplica o idioma
  function applyLanguage(lang) {
    langBtn.textContent = "🌐 " + texts[lang].flag;
    langBtn.setAttribute('data-lang', lang);

    // menu (usa os atributos data-pt/data-en/data-jp)
    navLinks.forEach(link => {
      const key = link.dataset[lang];
      if (key) link.textContent = key;
    });

    // seções principais via texts
    if (homeTitle) homeTitle.innerHTML = texts[lang].heroTitle;
    if (homeDesc)  homeDesc.innerHTML  = texts[lang].heroDesc;
    if (contatoP)  contatoP.textContent = texts[lang].contato;

    // Sobre
    if (aboutTitle) aboutTitle.textContent = texts[lang].sobreTitle;
    if (aboutP)     aboutP.textContent     = texts[lang].sobreP;

    // Portfolio
    if (portfolioTitle) portfolioTitle.textContent = texts[lang].portfolioTitle;
    if (portfolioP)     portfolioP.textContent     = texts[lang].portfolioP;

    // ===== Tradução de cards do portfólio =====
    // Traduz títulos
    document.querySelectorAll('.card-title').forEach(el => {
      if (el.dataset && el.dataset[lang]) {
        el.textContent = el.dataset[lang];
      }
    });

    // Traduz descrições
    document.querySelectorAll('.card-desc').forEach(el => {
      if (el.dataset && el.dataset[lang]) {
        el.textContent = el.dataset[lang];
      }
    });

    // Traduz tags (cada <span> tem seus data-pt/data-en/data-jp)
    document.querySelectorAll('.card-tags span').forEach(span => {
      if (span.dataset && span.dataset[lang]) {
        span.textContent = span.dataset[lang];
      }
    });

    // ===== Tradução/atualização dos botões "Código" nos cards =====
    document.querySelectorAll('.btn-code').forEach(btn => {
      // texto (preserva HTML interno)
      if (btn.dataset && btn.dataset[lang]) {
        const span = btn.querySelector('span');
        if (span) {
          span.textContent = btn.dataset[lang];
        } else {
          // mantém ícones se existirem, substitui só texto
          btn.innerHTML = btn.dataset[lang];
        }
      }

      // href (procura data-href-pt / data-href-en / data-href-jp)
      const mapHref = { pt: 'hrefPt', en: 'hrefEn', jp: 'hrefJp' };
      if (btn.dataset && btn.dataset[mapHref[lang]]) {
        const newHref = btn.dataset[mapHref[lang]];
        btn.href = newHref;
        // define download somente para arquivos (ex.: termina com .pdf .zip .tar .gz)
        const fileMatch = newHref.match(/\.(pdf|zip|tar|gz|rar|7z|exe|msi|deb|apk)(\?|$)/i);
        if (fileMatch) {
          btn.download = newHref.split('/').pop();
        } else {
          btn.removeAttribute('download');
        }
      }
    });

    // CV - atualização segura (não apaga HTML interno do botão)
    if (cvBtn) {
      // texto (prioriza data-* se existir)
      const key = cvBtn.dataset && cvBtn.dataset[lang];
      if (key) {
        cvBtn.innerHTML = key;   // usa innerHTML para preservar elementos internos (ícones/spans)
      } else {
        cvBtn.innerHTML = texts[lang].cv;
      }

      // href (procura data-href-pt / data-href-en / data-href-jp)
      const map = { pt: 'hrefPt', en: 'hrefEn', jp: 'hrefJp' };
      if (cvBtn.dataset && cvBtn.dataset[map[lang]]) {
        const newHref = cvBtn.dataset[map[lang]];
        cvBtn.href = newHref;
        // define download automaticamente com o nome do arquivo
        cvBtn.download = newHref.split('/').pop();
      }
    }

    // contatos (traduz rótulos se estiverem em data-*)
    if (contactItems && contactItems.length) {
      contactItems.forEach(item => {
        if (item.dataset) {
          const k = item.dataset[lang];
          if (k) {
            item.textContent = k;
          }
        }
      });
    }

    // Rodapé
    if (footerText) footerText.textContent = texts[lang].footer;
  }

  // Inicializa com o idioma atual (se tiver atributo no botão)
  const initialLang = langBtn.getAttribute('data-lang');
  if (initialLang && languages.includes(initialLang)) {
    currentIndex = languages.indexOf(initialLang);
  } else {
    langBtn.setAttribute('data-lang', languages[currentIndex]);
  }

  applyLanguage(languages[currentIndex]);

  // Clique no botão -> ciclo entre idiomas
  langBtn.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % languages.length;
    applyLanguage(languages[currentIndex]);
  });
});
