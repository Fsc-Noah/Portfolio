// ── Curseur personnalisé ──────────────────────────────────────────
const cursor = document.getElementById('cursor');

document.addEventListener('mousemove', e => {
  cursor.style.left = (e.clientX - 4) + 'px';
  cursor.style.top  = (e.clientY - 4) + 'px';
});

document.querySelectorAll('a, button, .project-card').forEach(el => {
  el.addEventListener('mouseenter', () => cursor.classList.add('expand'));
  el.addEventListener('mouseleave', () => cursor.classList.remove('expand'));
});

// ── Révélation au scroll ──────────────────────────────────────────
const observer = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      observer.unobserve(e.target);
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

// ── Données des projets ───────────────────────────────────────────
const projects = {

  sobel: {
    year: '2026',
    context: 'Carte : PYNQ-Z1 (SoC Zynq-7000) &nbsp;·&nbsp; Vivado, VHDL, Jupyter / Python',
    title: "Accélérateur de traitement d'image — Sobel sur FPGA",
    desc: "Introduction aux architectures SoC dans le cadre du Master. Conception d'une IP de détection de contours (Sobel) en VHDL pour étudier les mécanismes de communication AXI et le flux de données entre logiciel et matériel. Échange pixel à pixel entre le Processing System ARM et la logique programmable. Projet conçu pour servir de support pédagogique aux futures promotions.",
    details: [
      { label: 'Hardware — PL', text: "Unité de calcul de gradients Sobel en VHDL. Mise en œuvre du protocole AXI-Stream pour l'échange avec le Processing System. Block Design Vivado avec toutes les interconnexions nécessaires entre PS et PL." },
      { label: 'Software — PS', text: "Pilotage du FPGA en Python via l'environnement Jupyter/PYNQ. Envoi et réception séquentielle des pixels pour analyser en détail le comportement du bus de communication AXI." }
    ],
    images: [
      { src: 'assets/result_contour.png', caption: 'Résultat — détection de contours sur image réelle' },
      { src: 'assets/design_sobel.png',   caption: 'Architecture Block Design — Zynq-7000' }
    ],
    outcomes: ['Maîtrise du co-design HW/SW complet', 'Validation protocole AXI-Stream', 'Support pédagogique Master']
  },

  usb: {
    year: '2025',
    context: 'Cible : Kit Olimex SAM9-L9260 (ARM9) &nbsp;·&nbsp; Linux Embarqué (Debian / BusyBox)',
    title: "Pilote de périphérique USB & contrôle LED sur ARM",
    desc: "Conception d'un système Linux embarqué complet, de la compilation du bootloader jusqu'à l'écriture d'un pilote noyau sur mesure. Détournement d'une souris USB standard pour piloter directement les registres matériels (PIO) du microcontrôleur ARM9 via des interruptions USB (URB).",
    details: [
      { label: 'Infrastructure Système', text: "Compilation de U-Boot et d'un noyau Linux 2.6.31. RootFS personnalisé avec BusyBox pour minimiser l'empreinte mémoire. Mise en place d'une chaîne de compilation croisée complète (Codesourcery)." },
      { label: 'Driver USB — Noyau',     text: "Module usb_driver gérant la détection du périphérique (Probe) et la récupération des données via URB (USB Request Blocks). Accès aux registres de contrôle LED via ioremap. Synchronisation par files d'attente (wait_queue)." }
    ],
    images: [],
    outcomes: ['Clic gauche → LED STAT', 'Clic droit → LED PWR', 'Pont complet espace utilisateur / noyau']
  },

  riscv: {
    year: '2025',
    context: 'Lieu : Thales AVS (Mérignac) &nbsp;·&nbsp; FPGA Intel MAX 10 (DE10-Lite) &nbsp;·&nbsp; Quartus, ModelSim, UVM',
    title: "Conception d'un processeur soft-core RISC-V — Thales AVS",
    desc: "Dans le cadre de l'évolution des architectures avioniques vers plus de modularité, implémentation et validation d'un processeur soft-core RISC-V (RV32I). Portage d'une architecture open-source CVE2 vers un modèle VHDL optimisé nommé tinyv, avec construction d'un écosystème SoC bare-metal complet autour du cœur.",
    details: [
      { label: 'Architecture Processeur', text: "Implémentation du jeu d'instructions RV32I comprenant ALU, unité de contrôle et 32 registres × 32 bits. Portage et réécriture complète de l'unité de contrôle depuis Verilog (OpenHW Group) vers VHDL." },
      { label: 'Écosystème SoC',          text: "Intégration du cœur dans un environnement complet — bus APB, mémoires ROM/RAM, UART et GPIO. Vérification UVM par comparaison cycle à cycle avec un modèle de référence Verilog." },
      { label: 'Validation & Optim.',     text: "Simulation via suites de tests assembleur (riscv-none-embed-gcc). Optimisation de l'empreinte FPGA par Register File en Block RAM. Benchmarking par tests de charge." }
    ],
    images: [
      { src: 'assets/files_softcore.png', caption: 'Hiérarchie tinyV — Quartus' },
      { src: 'assets/soc_on_fpga.png',    caption: 'Architecture SoC — RAM, ROM, GPIO, UART, APB' },
      { src: 'assets/cible_altera.png',   caption: 'Cible — DE10-Lite (Intel MAX 10)' }
    ],
    outcomes: ['Processeur RV32I fonctionnel sur FPGA', 'Validation UVM cycle à cycle', 'SoC bare-metal complet']
  },

  vga: {
    year: '2025',
    context: 'Carte : Basys 3 (Artix-7) &nbsp;·&nbsp; Vivado',
    title: "Contrôleur d'affichage vidéo VGA sur FPGA",
    desc: "Conception d'un contrôleur graphique complet en VHDL pilotant un écran en 640×480 @ 60 Hz. Génération avec précision nanoseconde des signaux de synchronisation vidéo (HSync/VSync) pour transformer une logique numérique en un affichage analogique stable. Interaction en temps réel via switchs et boutons de la carte.",
    details: [
      { label: 'VGA_SYNC — Le Moteur',    text: "Gestion rigoureuse des timings (Pulse, Back/Front Porch). Génération des coordonnées (X, Y) des pixels à 25 MHz. Contraintes XDC pour le mapping des ports vers le connecteur VGA physique." },
      { label: 'VGA_DISPLAY — Le Rendu',  text: "Logique combinatoire gérant les couleurs RGB. Implémentation de mires de test et formes géométriques mobiles pilotées par les boutons de la carte. Affichage stable sans scintillement." }
    ],
    images: [
      { src: 'assets/VGA_design.png', caption: 'Architecture — VGA_SYNC + VGA_DISPLAY' },
      { src: 'assets/VGA_simu.png',   caption: 'Simulation — timings HSync / VSync' },
      { src: 'assets/VGA_aff.png',    caption: 'Résultat — affichage sur écran réel' }
    ],
    outcomes: ['Image stable 640×480 @ 60 Hz', 'Ressources FPGA < 15 %', 'Interaction temps réel boutons/switchs']
  },

  stm32: {
    year: '2025',
    context: 'Cible : STM32H747I-DISCO (Cortex-M7 @ 480 MHz + Cortex-M4 @ 240 MHz) &nbsp;·&nbsp; VS Code, GCC ARM, Makefiles',
    title: "Développement Bare-Metal — Architecture Dual-Core STM32H7",
    desc: "Prise en main d'une des plateformes les plus puissantes de STMicroelectronics pour maîtriser le démarrage et la gestion d'un système à deux cœurs asymétriques. Navigation entre toutes les couches d'abstraction (HAL, BSP, CMSIS) avec descente au niveau des registres pour un contrôle total du système.",
    details: [
      { label: 'Architecture Multi-cœur', text: "Analyse du démarrage asymétrique — cohabitation et synchronisation Cortex-M7 / Cortex-M4. Exploitation des Makefiles, fichiers assembleur de démarrage (Startup) et Linker Scripts pour comprendre la construction et le placement du binaire en mémoire." },
      { label: 'Stack Logicielle',        text: "BSP pour ressources externes (LEDs, boutons). HAL pour périphériques ST internes. CMSIS : programmation directe des registres GPIO (MODER, OTYPER) via adresses mémoires et masques de bits pour s'affranchir des abstractions." }
    ],
    images: [
      { src: 'assets/stm32.png',           caption: 'Cible — STM32H747I-DISCO' },
      { src: 'assets/files_stm32_mcu.png', caption: 'Architecture fichiers — VS Code' }
    ],
    outcomes: ['Toolchain VS Code sans IDE propriétaire', 'Maîtrise datasheets complexes (registres)', 'Validation HW GPIO confirmée']
  },

  arcade: {
    year: '2025',
    context: 'Outils : Java, VS Code &nbsp;·&nbsp; Conception Logicielle & POO',
    title: "Plateforme de jeux d'arcade multi-jeux",
    desc: "Conception d'une plateforme de jeux d'arcade évolutive hébergeant deux classiques : Pong et Space Invaders. Architecture commune robuste via le design pattern MVC (Modèle-Vue-Contrôleur) pour séparer la logique métier du rendu visuel, permettant de passer d'un jeu à l'autre en réutilisant les mêmes composants structurels.",
    details: [
      { label: 'Architecture MVC',    text: "Séparation stricte entre physique du jeu (Modèle) et rendu graphique (Vue). Gestion des rebonds et scores pour Pong. Gestion des nuées d'ennemis et tirs multiples pour Space Invaders." },
      { label: 'Mécaniques avancées', text: "Système de 3 vies (cœurs), manches progressives et sauvegarde des High Scores. Multithreading pour gestion simultanée physique/rendu. Algorithmique de collision optimisée." }
    ],
    images: [
      { src: 'assets/extrait_code_AG.png', caption: "Architecture MVC — extrait de code" },
      { src: 'assets/acceuil_AG.png',      caption: "Écran d'accueil — sélection du jeu" },
      { src: 'assets/Pong_SI.png',         caption: 'Pong & Space Invaders en jeu' }
    ],
    outcomes: ['Architecture MVC réutilisable', '2 jeux complets avec High Score', 'Design Patterns appliqués']
  },

  imageprocessing: {
    year: '2024',
    context: 'Outils : C++, OpenCV &nbsp;·&nbsp; Vision industrielle, POO',
    title: "Traitement d'images pour contrôle de pièces en bois — C++ & OpenCV",
    desc: "Développement d'une application C++ de traitement vidéo en temps réel pour analyser des pièces en bois sur tapis roulant. L'architecture repose sur une classe abstraite filtre avec fonctions virtuelles pures, dont héritent 13 filtres spécialisés. Ce projet illustre concrètement l'héritage, le polymorphisme et les classes abstraites en C++, tout en exploitant la bibliothèque OpenCV pour des traitements avancés.",
    details: [
      { label: 'Architecture POO — Héritage & Polymorphisme', text: "Classe abstraite filtre définissant l'interface commune (méthode virtuelle pure traitement()). Chaque filtre (bleu, rouge, vert, gaussien, Sobel, Laplacien, seuillage, cropping, plage, inertie, inertie axis, détection de contours, finding) hérite de cette classe. Appel polymorphique dans une boucle unique sur un vector<filtre*>, sans conditionnel." },
      { label: '13 Filtres OpenCV implémentés', text: "Filtres couleur RGB (manipulation directe des pixels Mat). Flou gaussien (GaussianBlur), gradients Sobel et Laplacien pour la détection de contours. Seuillage binaire (cvtColor + threshold). Cropping par ROI (Rect). Filtre de plage HSV (inRange + bitwise_and). Détection du centre d'inertie par moments OpenCV. Détection de contours par algorithme de Canny (findContours + drawContours)." }
    ],
    images: [
      { src: 'assets/Cpp_exemple_filtre.png',         caption: 'Exemple — résultat du filtre bleu sur vidéo' },
      { src: 'assets/Cpp_terminal_select_filtre.png', caption: 'Terminal — sélection interactive du filtre' }
    ],
    outcomes: ['13 filtres OpenCV polymorphiques', 'Architecture extensible sans modification du main', 'Traitement vidéo temps réel sur tapis roulant']
  },

  cem: {
    year: '2024',
    context: 'Contexte : Projet M1 IMSAT &nbsp;·&nbsp; Python (PyVISA, PySerial), RS-232',
    title: "Automatisation & rétro-ingénierie — Banc de test CEM",
    desc: "Développement d'un outil de contrôle pour un brasseur de modes en chambre réverbérante (CRBM) afin d'automatiser des tests CEM. En l'absence totale de documentation technique, travail de rétro-ingénierie pour identifier le protocole de communication et développer une bibliothèque Python complète de pilotage à distance.",
    details: [
      { label: 'Rétro-ingénierie Protocole', text: "Analyse des signaux à l'oscilloscope pour identifier les paramètres RS-232. Wireshark (sniffing de bus) pour capturer et décoder les trames hexadécimales de l'ancien logiciel propriétaire — déduction des commandes mouvement, vitesse et position." },
      { label: 'Développement Python POO',   text: "Architecture orientée objet pour modéliser le brasseur et faciliter l'intégration future d'autres instruments. PyVISA et PySerial pour une communication robuste. Remplacement d'une solution obsolète par un outil moderne open-source et documenté." }
    ],
    images: [
      { src: 'assets/lib_py_brasseur.png',    caption: 'Bibliothèque Python — contrôle RS-232' },
      { src: 'assets/CRBM_brasseur.png',      caption: 'CRBM et brasseur de modes' },
      { src: 'assets/Tab_fonct_brasseur.png', caption: 'Commandes hexadécimales décodées' }
    ],
    outcomes: ['Pilotage précis pas à pas ou continu', 'Protocole RS-232 entièrement décodé', 'Gain de temps majeur en campagnes CEM']
  },

  ems: {
    year: '2023',
    context: 'Cible : Basys 3 (Artix-7) &nbsp;·&nbsp; CST Studio Suite, Chambre Siepel Eole 1000, Analyseur de spectre, Pmod ALS',
    title: "Immunité & susceptibilité électromagnétique — FPGA en CRBM",
    desc: "Évaluation de la robustesse d'un système numérique face à des agressions électromagnétiques en milieu saturé. L'étude combine une modélisation physique complexe (75 %) et le développement d'une architecture de monitoring en VHDL sur FPGA (25 %) pour détecter en temps réel les erreurs induites par le champ électrique.",
    details: [
      { label: 'CEM & Métrologie (75 %)',   text: "Simulation EM 3D sous CST Studio — modélisation chambre Siepel 1000 et antenne cornet 1–18 GHz. Caractérisation du brassage de mode pour un champ statistiquement homogène. Facteur d'amplification E ≈ 200 V/m pour 1 W. Protocole d'injection de puissance pour identifier les seuils de rupture de service." },
      { label: 'Développement VHDL (25 %)', text: 'Logique de contrôle pour Basys 3 avec acquisition via Pmod ALS (SPI). Interface vers terminal PC (Hterm) pour observer corruptions ou gels de machine d\'état. FPGA utilisé comme "témoin actif" pour différencier erreurs internes et couplages parasites.' }
    ],
    images: [
      { src: 'assets/cible_FPGA_CEM.png', caption: 'Cible — Basys 3 + Pmod ALS + UART' },
      { src: 'assets/CRBM_int_ext.png',   caption: 'Chambre Siepel Eole 1000' },
      { src: 'assets/CRBM_3D.png',        caption: 'Modélisation 3D CST Studio' },
      { src: 'assets/Sim_3D_CRBM.png',    caption: 'Simulation — champ électrique (CST)' }
    ],
    outcomes: ['Cartographie des fréquences critiques FPGA', 'Corrélation simulation CST / mesures réelles', 'Monitoring VHDL temps réel']
  },

  ascenseur: {
    year: '2021',
    context: "Cible : Arduino UNO &nbsp;·&nbsp; C, Automatisme, Machine d'état",
    title: "Commande d'ascenseur didactique — Arduino",
    desc: "Mise en place de la commande d'un ascenseur didactique TERGANE 40300 à 2 étages, modélisé sous forme de machine d'état et implémenté sur carte Arduino. Le projet couvre l'état des lieux complet des entrées/sorties, la vérification de compatibilité matérielle, puis le développement progressif jusqu'à un automate complet gérant montée, descente, éclairage, témoins d'étage et arrêt d'urgence.",
    details: [
      { label: 'Cahier des charges & I/O', text: "Inventaire exhaustif du système : 2 boutons d'appel, 2 contacteurs de position, 1 capteur de fermeture de porte, 1 bouton d'arrêt d'urgence côté entrées ; moteur montée, moteur descente, éclairage cabine et 2 témoins d'étage côté sorties. Vérification pin par pin de la compatibilité avec la carte Arduino." },
      { label: "Machine d'état — 4 états", text: "Conception d'un organigramme à 4 états (Étage 1 au repos, Montée, Étage 2 au repos, Descente) avec transitions conditionnées par les boutons, les contacteurs de position et le capteur de porte. Éclairage activé lors des déplacements. Implémentation via switch/case en C pour un code lisible et extensible." }
    ],
    images: [
      { src: 'assets/cablage_arduino_ascencor.png',     caption: 'Câblage Arduino — panneau de commande TERGANE' },
      { src: 'assets/Ascenseur_miniaturuse.png',         caption: 'Ascenseur didactique miniaturisé' },
      { src: 'assets/Extrait_code_arduino_ascencor.png', caption: "Extrait du code Arduino — machine d'état" }
    ],
    outcomes: ["Machine d'état 4 états fonctionnelle", 'Gestion sécurités (porte, urgence)', 'Validation hardware complète Arduino']
  }

};

// ── Ouvrir le panel de détails ────────────────────────────────────
function openProject(id) {
  const p = projects[id];
  if (!p) return;

  const imagesHTML = p.images.length ? `
    <div class="panel-images">
      ${p.images.map(img => `
        <figure>
          <img src="${img.src}" alt="${img.caption}" loading="lazy"/>
          <figcaption>${img.caption}</figcaption>
        </figure>`).join('')}
    </div>` : '';

  const detailsHTML = p.details.map(d => `
    <div class="detail-block">
      <span class="detail-label">${d.label}</span>
      <p>${d.text}</p>
    </div>`).join('');

  const outcomesHTML = p.outcomes.map(o => `<span class="outcome">✦ ${o}</span>`).join('');

  document.getElementById('panelContent').innerHTML = `
    <p class="panel-context">${p.year} &nbsp;·&nbsp; ${p.context}</p>
    <h2 class="panel-title">${p.title}</h2>
    <p class="panel-desc">${p.desc}</p>
    <div class="panel-details">${detailsHTML}</div>
    ${imagesHTML}
    <div class="panel-outcomes">${outcomesHTML}</div>
  `;

  // Rendre les images cliquables pour le lightbox
  document.querySelectorAll('.panel-images figure').forEach((fig, i) => {
    fig.addEventListener('click', (e) => {
      e.stopPropagation();
      const img = fig.querySelector('img');
      const cap = fig.querySelector('figcaption');
      openLightbox(img.src, cap ? cap.textContent : '');
    });
  });

  const overlay = document.getElementById('projectOverlay');
  overlay.classList.add('open');
  document.body.style.overflow = 'hidden';
  document.getElementById('projectPanel').scrollTop = 0;
  cursor.style.display = 'none';
}

// ── Lightbox ──────────────────────────────────────────────────────
function openLightbox(src, caption) {
  document.getElementById('lightboxImg').src = src;
  document.getElementById('lightboxCaption').textContent = caption;
  document.getElementById('lightbox').classList.add('open');
}

function closeLightbox() {
  document.getElementById('lightbox').classList.remove('open');
  document.getElementById('lightboxImg').src = '';
}

// ── Fermer le panel ───────────────────────────────────────────────
function closeProject() {
  document.getElementById('projectOverlay').classList.remove('open');
  document.body.style.overflow = '';
  cursor.style.display = 'block';
}

function handleOverlayClick(e) {
  if (e.target === document.getElementById('projectOverlay')) closeProject();
}

// ── Accordion cibles matérielles ─────────────────────────────────
function toggleTargets() {
  document.getElementById('targetsBlock').classList.toggle('open');
}

document.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    if (document.getElementById('lightbox').classList.contains('open')) {
      closeLightbox();
    } else {
      closeProject();
    }
  }
});
