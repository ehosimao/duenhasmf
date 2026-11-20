/* Duenhas Moda Fitness — scripts do site */

/* CONFIGURAÇÃO: coloque aqui o número do WhatsApp da loja, só números,
   com DDI e DDD. Exemplo: '5519999999999'. Enquanto estiver vazio,
   os botões de WhatsApp levam para o Instagram da loja. */
var WHATSAPP_NUMERO = '';
var INSTAGRAM_URL = 'https://www.instagram.com/duenhasmf/';

function linkWhatsApp(texto) {
  if (!WHATSAPP_NUMERO) return INSTAGRAM_URL;
  return 'https://wa.me/' + WHATSAPP_NUMERO + '?text=' + encodeURIComponent(texto || 'Olá! Vim pelo site da Duenhas.');
}

document.querySelectorAll('[data-wa]').forEach(function (a) {
  a.href = linkWhatsApp(a.getAttribute('data-wa'));
  a.target = '_blank';
  a.rel = 'noopener';
});

var ano = document.getElementById('ano');
if (ano) ano.textContent = new Date().getFullYear();

/* Loja: filtro por categoria */
(function () {
  var grade = document.getElementById('grade');
  if (!grade) return;
  var chips = document.querySelectorAll('[data-cat-chip]');
  var titulo = document.getElementById('titulo-loja');
  var contagem = document.getElementById('contagem');
  function filtrar(cat) {
    var n = 0;
    grade.querySelectorAll('[data-cat]').forEach(function (card) {
      var on = cat === 'Todos' || card.getAttribute('data-cat') === cat;
      card.hidden = !on;
      if (on) n++;
    });
    chips.forEach(function (c) { c.setAttribute('aria-pressed', c.getAttribute('data-cat-chip') === cat ? 'true' : 'false'); });
    titulo.textContent = cat === 'Todos' ? 'Loja' : cat;
    contagem.textContent = n + (n === 1 ? ' peça' : ' peças');
  }
  chips.forEach(function (c) { c.addEventListener('click', function () { filtrar(c.getAttribute('data-cat-chip')); }); });
  var inicial = new URLSearchParams(location.search).get('cat');
  filtrar(inicial || 'Todos');
})();

/* Página de produto */
(function () {
  var pdp = document.getElementById('pdp');
  if (!pdp) return;
  var produto = pdp.getAttribute('data-produto');
  var cores = [
    { nome: 'Verde-floresta', bg: '#2F4636', fotos: { 0: 'assets/img/fundadora-verde.jpg', 1: 'assets/img/conjunto-verde-costas.jpg', 4: 'assets/img/flat-verde.jpg' } },
    { nome: 'Vinho', bg: '#5A1E2B', fotos: {} },
    { nome: 'Chocolate', bg: '#4B3029', fotos: {} }
  ];
  var vistas = ['frente', 'costas', 'lateral', 'detalhe do cós', 'foto sobre o tecido', 'vídeo do agachamento'];
  var tamanhos = { P: '', M: '', G: 'Poucas unidades neste tamanho.', GG: 'Esgotado neste tamanho. Fale com a gente para ser avisada quando voltar.' };
  var st = { cor: 0, vista: 0, tam: '' };

  var principal = document.getElementById('foto-principal');
  var imgPrincipal = principal.querySelector('img');
  var legenda = principal.querySelector('[data-legenda]');
  var play = principal.querySelector('[data-play]');
  var thumbs = document.querySelectorAll('[data-vista]');
  var swatches = document.querySelectorAll('[data-cor]');
  var sizes = document.querySelectorAll('[data-tam]');
  var nomeCor = document.getElementById('nome-cor');
  var nomeTam = document.getElementById('nome-tam');
  var aviso = document.getElementById('aviso-estoque');
  var comprar = document.getElementById('comprar');
  var msg = document.getElementById('msg-compra');
  var parImg = document.getElementById('par-img');
  var parLegenda = document.getElementById('par-legenda');
  var parCor = document.getElementById('par-cor');

  function render() {
    var cor = cores[st.cor];
    var foto = cor.fotos[st.vista];
    var video = st.vista === 5;
    principal.style.background = video ? '#2B2022' : cor.bg;
    if (foto) { imgPrincipal.src = foto; imgPrincipal.alt = produto + ' ' + cor.nome.toLowerCase() + ', ' + vistas[st.vista]; imgPrincipal.hidden = false; legenda.hidden = true; }
    else {
      imgPrincipal.hidden = true; legenda.hidden = false;
      legenda.textContent = video ? 'Vídeo a gravar: agachamento de costas, em luz forte · 5 segundos' : 'Foto a produzir: ' + produto + ' ' + cor.nome.toLowerCase() + ', ' + vistas[st.vista];
    }
    play.hidden = !video;
    thumbs.forEach(function (t) {
      var i = +t.getAttribute('data-vista');
      t.setAttribute('aria-pressed', i === st.vista ? 'true' : 'false');
      t.style.setProperty('--cor', i === 5 ? '#2B2022' : cor.bg);
      var im = t.querySelector('img');
      var f = cor.fotos[i];
      if (f) { im.src = f; im.hidden = false; } else { im.hidden = true; }
    });
    swatches.forEach(function (s) { s.setAttribute('aria-pressed', +s.getAttribute('data-cor') === st.cor ? 'true' : 'false'); });
    sizes.forEach(function (s) { s.setAttribute('aria-pressed', s.getAttribute('data-tam') === st.tam ? 'true' : 'false'); });
    nomeCor.textContent = cor.nome;
    nomeTam.textContent = st.tam || 'escolha';
    aviso.textContent = st.tam ? tamanhos[st.tam] : '';
    aviso.hidden = !aviso.textContent;
    var esgotado = st.tam === 'GG';
    comprar.textContent = esgotado ? 'Avise-me quando voltar' : 'Comprar pelo WhatsApp';
    var texto = esgotado
      ? 'Olá! Quero ser avisada quando a ' + produto + ' ' + cor.nome.toLowerCase() + ' tamanho GG voltar.'
      : 'Olá! Quero a ' + produto + ', cor ' + cor.nome.toLowerCase() + ', tamanho ' + st.tam + '.';
    comprar.href = linkWhatsApp(texto);
    if (parImg) {
      parImg.hidden = st.cor !== 0;
      parLegenda.hidden = st.cor === 0;
      parCor.textContent = cor.nome;
      parImg.parentNode.style.background = cor.bg;
    }
  }

  thumbs.forEach(function (t) { t.addEventListener('click', function () { st.vista = +t.getAttribute('data-vista'); render(); }); });
  swatches.forEach(function (s) { s.addEventListener('click', function () { st.cor = +s.getAttribute('data-cor'); render(); }); });
  sizes.forEach(function (s) { s.addEventListener('click', function () { st.tam = s.getAttribute('data-tam'); msg.hidden = true; render(); }); });
  comprar.addEventListener('click', function (e) {
    if (!st.tam) { e.preventDefault(); msg.textContent = 'Escolha um tamanho primeiro.'; msg.hidden = false; }
  });
  comprar.target = '_blank';
  comprar.rel = 'noopener';
  render();
})();
