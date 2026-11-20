# duenhasmf
Site de vendas da loja Duenhas Moda Fitness

Site estático (HTML, CSS e JavaScript puros), publicado pelo GitHub Pages.

## Páginas

- `index.html`: página inicial
- `loja.html`: vitrine com filtro por categoria (aceita `?cat=Tops`, por exemplo)
- `produto.html`: página da Legging Flare, com escolha de cor e tamanho e pedido pelo WhatsApp

## Como editar

- **Número do WhatsApp:** em `assets/js/site.js`, preencha `WHATSAPP_NUMERO` só com números, com DDI e DDD (ex.: `5519999999999`). Enquanto estiver vazio, os botões de WhatsApp levam ao Instagram.
- **Preços:** procure por `[preço]` nos arquivos `.html`.
- **Fotos:** ficam em `assets/img/`. Para trocar uma foto, substitua o arquivo mantendo o mesmo nome.
- **Cores e fontes:** em `assets/css/style.css` (variáveis no início do arquivo).

As vendas são finalizadas pelo WhatsApp; o carrinho e o checkout virão com a loja na Nuvemshop.
