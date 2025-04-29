# Jardim Botânico - Site Institucional

Este é o repositório do site institucional do Jardim Botânico, desenvolvido como parte do projeto de software da disciplina de Engenharia de Software.

## 📋 Sobre o Projeto

O site foi desenvolvido para apresentar o Jardim Botânico, suas espécies e história. O projeto utiliza tecnologias web modernas e boas práticas de desenvolvimento para criar uma experiência interativa e informativa para os visitantes.

### Funcionalidades Principais

- 🏠 Página inicial com carrossel de imagens e apresentação do jardim
- 🌿 Galeria de espécies com categorização (fauna, flora e fungos)
- 📱 Páginas detalhadas para cada espécie com informações científicas
- 📜 Seção "Nossa História" com timeline interativa
- 🔍 Sistema de QR Code para acesso rápido às informações das espécies
- 📱 Design responsivo para todos os dispositivos
- 🌳 Dicas ambientais para conscientização dos visitantes
- 📝 Regras de visitação para orientação dos visitantes
- 📞 Página de contato com informações para comunicação
- 🍃 Menu de navegação intuitivo com animações fluidas
- 🖼️ Pré-carregamento de imagens para melhor performance
- 🔄 Carrossel com controles de navegação e autoplay

## 🛠️ Tecnologias Utilizadas

- HTML5 (estrutura semântica)
- CSS3 (com variáveis CSS, Flexbox/Grid e animações)
- JavaScript (Vanilla)
- Fontes Google (Quicksand)
- Sistema de QR Code para informações das espécies
- Lazy-loading de imagens para otimização da performance
- Design responsivo com breakpoints para diferentes dispositivos

## 📁 Estrutura do Projeto

```
projetoDeSoftware1/
├── index.html              # Página inicial
├── galeria.html            # Galeria de espécies
├── nossa-historia.html     # Página sobre a história
├── dicas-ambientais.html   # Dicas de preservação ambiental
├── regras.html             # Regras de visitação do jardim
├── contato.html            # Informações de contato
├── especie-*.html          # Páginas de espécies individuais
│   ├── especie-amanita.html           # Fungo Amanita muscaria
│   ├── especie-bugio-ruivo.html       # Bugio-ruivo (Alouatta guariba)
│   ├── especie-capivara.html          # Capivara
│   ├── especie-cryptotrama.html       # Fungo Cryptotrama aspartata
│   ├── especie-cymatoderma.html       # Fungo Cymatoderma caperatum
│   ├── especie-eugenia-myrcianthes.html # Planta Eugenia myrcianthes
│   ├── especie-kusaghiporia.html      # Fungo Kusaghiporia
│   ├── especie-pica-pau.html          # Pica-pau-de-barriga-verde
│   ├── especie-quero-quero.html       # Quero-quero (Vanellus chilensis)
│   ├── especie-tartaruga.html         # Tartaruga Tigre D'água
│   └── especie-tatu-mulita.html       # Tatu-mulita
├── styles.css              # Estilos do site
├── script.js               # Funcionalidades JavaScript
├── imagens/                # Diretório de imagens
│   ├── logo.jpg            # Logo do site
│   ├── paisagem-*.jpg      # Imagens do carrossel
│   ├── individuos/         # Imagens das espécies
│   │   ├── Alouatta-guariba.jpg      # Bugio-ruivo
│   │   ├── Colaptes-melanochloros.jpg # Pica-pau
│   │   ├── Trachemys-dorbigni.jpg    # Tartaruga
│   │   ├── Vanellus-chilensis.jpg    # Quero-quero
│   │   └── ...
│   └── leaf.svg            # Elemento decorativo
└── README.md              # Este arquivo
```

## 🚀 Como Executar

1. Clone o repositório:
```bash
git clone https://github.com/seu-usuario/jardim-botanico.git
```

2. Abra o arquivo `index.html` em seu navegador ou utilize um servidor local.

## 💻 Requisitos do Sistema

- Navegador web moderno com suporte a:
  - CSS Grid e Flexbox
  - JavaScript ES6+
  - Intersection Observer API (para lazy-loading)
  - Fontes web
  - Animações CSS
  - Variáveis CSS

## 📱 Responsividade

O site é totalmente responsivo e se adapta aos seguintes breakpoints:
- Desktop: > 1200px (layout completo)
- Tablet: 768px-1200px (layout adaptado)
- Mobile: < 768px (layout simplificado com menu hambúrguer)

## 🌟 Destaques do Projeto

- **Acessibilidade**: Uso de atributos ARIA para melhor navegação por leitores de tela
- **Performance**: Carregamento otimizado com lazy-loading de imagens
- **UX**: Navegação intuitiva com feedback visual para interações
- **Design**: Interface limpa e moderna com paleta de cores naturais
- **Interatividade**: Elementos interativos como carrossel e timeline
- **Educação**: Conteúdo informativo sobre fauna, flora e educação ambiental

## 📞 Contato

Para mais informações sobre o projeto, entre em contato através do email: euqseimeunome@gmail.com
