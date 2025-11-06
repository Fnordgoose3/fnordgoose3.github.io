// lang.js - versão resistente a erros e com inicialização automática
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
  const cvBtn     = document.querySelector('.cv-btn');

  // Verificações básicas
  if (!navLinks.length) console.warn('lang.js: nenhum link com .nav-list a encontrado (verifica os data-pt/data-en/data-jp).');
  if (!homeTitle) console.warn('lang.js: #home h2 não encontrado.');
  if (!homeDesc)  console.warn('lang.js: #home p não encontrado.');
  if (!contatoP)  console.warn('lang.js: #contato p não encontrado.');
  if (!cvBtn)     console.warn('lang.js: botão do currículo (.cv-btn) não encontrado.');

  const languages = ['pt', 'en', 'jp'];
  let currentIndex = 0;

  const texts = {
    pt: {
      heroTitle: "Olá, eu sou o Gabriel 👋",
      heroDesc: "Sou apaixonado por tecnologia e criação de jogos. <br> Atualmente estou focado em aprender programação e desenvolver meus próprios projetos.",
      contato: "Entre em contato comigo:",
      cv: "Veja meu currículo aqui",
      flag: "🇧🇷 PT"
    },
    en: {
      heroTitle: "Hi, I'm Gabriel 👋",
      heroDesc: "I'm passionate about technology and game development. <br> I'm currently focused on learning programming and creating my own projects.",
      contato: "Get in touch with me:",
      cv: "See my resume here",
      flag: "🇺🇸 EN"
    },
    jp: {
      heroTitle: "こんにちは、ガブリエルです 👋",
      heroDesc: "テクノロジーとゲーム開発が大好きです。<br> 現在はプログラミングを学び、自分のプロジェクトを作ることに集中しています。",
      contato: "ご連絡はこちらから：",
      cv: "履歴書を見る",
      flag: "🇯🇵 日本語"
    }
  };

  // Função que aplica o idioma
  function applyLanguage(lang) {
    // botão de idioma
    langBtn.textContent = "🌐 " + texts[lang].flag;
    langBtn.setAttribute('data-lang', lang);

    // menu (usa os atributos data-pt/data-en/data-jp)
    navLinks.forEach(link => {
      const key = link.dataset[lang];
      if (key) link.textContent = key;
      else console.warn(`lang.js: link sem data-${lang} encontrado ->`, link);
    });

    // seções principais
    if (homeTitle) homeTitle.innerHTML = texts[lang].heroTitle;
    if (homeDesc)  homeDesc.innerHTML  = texts[lang].heroDesc;
    if (contatoP)  contatoP.textContent = texts[lang].contato;

    // botão do currículo (se existir)
    if (cvBtn) cvBtn.textContent = texts[lang].cv;
  }

  // Inicializa com o idioma atual (se tiver atributo no botão)
  const initialLang = langBtn.getAttribute('data-lang');
  if (initialLang && languages.includes(initialLang)) {
    currentIndex = languages.indexOf(initialLang);
  } else {
    langBtn.setAttribute('data-lang', languages[currentIndex]);
  }

  // Aplica idioma inicial
  applyLanguage(languages[currentIndex]);

  // Clique no botão -> ciclo entre idiomas
  langBtn.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % languages.length;
    applyLanguage(languages[currentIndex]);
  });
});
