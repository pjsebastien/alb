const fs = require('fs');
const path = require('path');
const BASE = path.join(__dirname, 'albmaitredoeuvre');

const LOGO_WHITE = 'images/8000 A 02 RECTO calibrage nouvelle carte recto HAUT 350 gr by pass   -07.png';
const LOGO_DARK = 'images/LOGO ENTETE.jpg';

function header(root, active) {
  return `<header class="site-header" id="header">
    <div class="header-inner">
      <a href="${root}" class="logo"><img src="${root}${LOGO_WHITE}" alt="ALB Maître d'œuvre" class="logo-img"></a>
      <nav class="nav" id="nav">
        <ul class="nav-list">
          <li class="nav-item"><a href="${root}" class="nav-link${active==='accueil'?' nav-link--active':''}">Accueil</a></li>
          <li class="nav-item"><a href="${root}prestations/" class="nav-link${active==='prestations'?' nav-link--active':''}">Prestations</a>
            <ul class="nav-dropdown">
              <li><a href="${root}prestations/#etudes" class="nav-link">Études & Conception</a></li>
              <li><a href="${root}prestations/#permis" class="nav-link">Permis de Construire</a></li>
              <li><a href="${root}prestations/#preparation" class="nav-link">Préparation du Projet</a></li>
              <li><a href="${root}prestations/#suivi" class="nav-link">Suivi de Chantier</a></li>
            </ul>
          </li>
          <li class="nav-item"><a href="${root}realisations/" class="nav-link${active==='realisations'?' nav-link--active':''}">Réalisations</a></li>
          <li class="nav-item"><a href="${root}blog/" class="nav-link${active==='blog'?' nav-link--active':''}">Blog</a></li>
          <li class="nav-item nav-cta"><a href="${root}contact/" class="btn btn--primary">Devis Gratuit</a></li>
        </ul>
      </nav>
      <button class="nav-toggle" id="nav-toggle" aria-label="Menu"><svg class="menu-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 12h18M3 6h18M3 18h18"/></svg><svg class="close-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 6L6 18M6 6l12 12"/></svg></button>
    </div>
  </header>`;
}

function footer(root) {
  return `<footer class="site-footer">
    <div class="container">
      <div class="footer-grid">
        <div class="footer-brand">
          <div class="logo" style="margin-bottom:0.5rem;"><img src="${root}${LOGO_DARK}" alt="ALB Maître d'œuvre" class="footer-logo-img"></div>
          <p>Maître d'œuvre sur l'île de La Réunion. Accompagnement sur mesure de vos projets immobiliers, de la conception à la livraison.</p>
          <div class="social-links">
            <a href="https://www.facebook.com/Albmoe" class="social-link" target="_blank" rel="noopener" aria-label="Facebook"><svg viewBox="0 0 24 24"><path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/></svg></a>
            <a href="https://www.linkedin.com/in/alan-le-bail-389934104/" class="social-link" target="_blank" rel="noopener" aria-label="LinkedIn"><svg viewBox="0 0 24 24"><path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2zM4 6a2 2 0 100-4 2 2 0 000 4z"/></svg></a>
          </div>
        </div>
        <div><div class="footer-title">Navigation</div><ul class="footer-links"><li><a href="${root}">Accueil</a></li><li><a href="${root}prestations/">Prestations</a></li><li><a href="${root}realisations/">Réalisations</a></li><li><a href="${root}blog/">Blog</a></li><li><a href="${root}contact/">Devis gratuit</a></li></ul></div>
        <div><div class="footer-title">Nos services</div><ul class="footer-links"><li><a href="${root}prestations/#etudes">Études & Conception</a></li><li><a href="${root}prestations/#permis">Permis de Construire</a></li><li><a href="${root}prestations/#preparation">Préparation du Projet</a></li><li><a href="${root}prestations/#suivi">Suivi de Chantier</a></li></ul></div>
        <div><div class="footer-title">Contact</div>
          <div class="footer-contact-item"><svg viewBox="0 0 24 24"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg><span>87 chemin George Thenor<br>97424 Piton Saint-Leu</span></div>
          <div class="footer-contact-item"><svg viewBox="0 0 24 24"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/></svg><a href="tel:+262693881521">0693 88 15 21</a></div>
          <div class="footer-contact-item"><svg viewBox="0 0 24 24"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><path d="M22 6l-10 7L2 6"/></svg><a href="mailto:alb-moe@outlook.com">alb-moe@outlook.com</a></div>
        </div>
      </div>
      <div class="footer-bottom"><span>&copy; 2025 ALB Maître d'œuvre · SIREN 910 413 277 000 13</span><div class="footer-legal"><a href="${root}mentions-legales/">Mentions légales</a><a href="${root}politique-de-confidentialite/">Politique de confidentialité</a></div></div>
    </div>
  </footer>`;
}

function page(root, cssPath, scriptPath, title, desc, active, body) {
  return `<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${title}</title>
  <meta name="description" content="${desc}">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Playfair+Display:wght@700&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="${cssPath}">
</head>
<body>
  ${header(root, active)}
  ${body}
  ${footer(root)}
  <script src="${scriptPath}"></script>
</body>
</html>`;
}

// === PRESTATIONS ===
const prestationsBody = `
  <section class="page-header"><div class="container"><div class="breadcrumb"><a href="../">Accueil</a> <span>/</span> <span>Prestations</span></div><h1>Nos Prestations</h1><p>Un accompagnement complet pour tous vos projets immobiliers à La Réunion</p></div></section>

  <section class="section"><div class="container"><div class="split">
    <div class="split-image"><img src="https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=800&q=80" alt="Plans d'architecture maître d'œuvre" loading="lazy"></div>
    <div class="split-content"><div class="section-label">Notre approche</div><h2>Un interlocuteur unique pour votre projet</h2><p>En tant que maître d'œuvre, nous assurons la coordination complète de votre projet de construction ou de rénovation. De l'étude initiale à la remise des clés, nous veillons au respect du budget, des délais et de la qualité.</p><p>Notre mission : <strong>vous simplifier la vie</strong> en prenant en charge l'ensemble des aspects techniques, administratifs et financiers.</p></div>
  </div></div></section>

  <section class="section section--light" id="etudes"><div class="container"><div class="prestation-number">01</div><div class="section-header"><div class="section-label">Prestation 1</div><h2>Études & Conception de Projet</h2></div>
    <div class="split split--reverse"><div class="split-image"><img src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80" alt="Conception de projet immobilier" loading="lazy"></div>
    <div class="split-content">
      <h3>En construction neuve</h3>
      <ul class="check-list"><li><svg viewBox="0 0 24 24"><path d="M22 11.08V12a10 10 0 11-5.93-9.14"/><path d="M22 4L12 14.01l-3-3"/></svg>Étude de faisabilité du projet</li><li><svg viewBox="0 0 24 24"><path d="M22 11.08V12a10 10 0 11-5.93-9.14"/><path d="M22 4L12 14.01l-3-3"/></svg>Définition du gabarit et emplacement (PLU)</li><li><svg viewBox="0 0 24 24"><path d="M22 11.08V12a10 10 0 11-5.93-9.14"/><path d="M22 4L12 14.01l-3-3"/></svg>Budgétisation prévisionnelle</li><li><svg viewBox="0 0 24 24"><path d="M22 11.08V12a10 10 0 11-5.93-9.14"/><path d="M22 4L12 14.01l-3-3"/></svg>Plans 2D / 3D (en option)</li></ul>
      <p><strong>Documents nécessaires :</strong> adresse du terrain, numéro cadastral, descriptif ou plan, PPR.</p>
      <h3 style="margin-top:2rem;">En rénovation</h3>
      <ul class="check-list"><li><svg viewBox="0 0 24 24"><path d="M22 11.08V12a10 10 0 11-5.93-9.14"/><path d="M22 4L12 14.01l-3-3"/></svg>Expertise du bâtiment existant</li><li><svg viewBox="0 0 24 24"><path d="M22 11.08V12a10 10 0 11-5.93-9.14"/><path d="M22 4L12 14.01l-3-3"/></svg>Listing exhaustif des travaux</li><li><svg viewBox="0 0 24 24"><path d="M22 11.08V12a10 10 0 11-5.93-9.14"/><path d="M22 4L12 14.01l-3-3"/></svg>Relevé général des mesures</li><li><svg viewBox="0 0 24 24"><path d="M22 11.08V12a10 10 0 11-5.93-9.14"/><path d="M22 4L12 14.01l-3-3"/></svg>Budget prévisionnel chiffré (±10%)</li></ul>
    </div></div>
  </div></section>

  <section class="section" id="permis"><div class="container"><div class="prestation-number">02</div><div class="section-header"><div class="section-label">Prestation 2</div><h2>Permis de Construire & Déclaration Préalable</h2></div>
    <div class="split"><div class="split-image"><img src="https://images.unsplash.com/photo-1554469384-e58fac16e23a?w=800&q=80" alt="Dossier permis de construire" loading="lazy"></div>
    <div class="split-content">
      <h3>Permis de Construire (PC)</h3><p>Pour les projets de surface de plancher inférieure à 150 m² :</p>
      <ul class="check-list"><li><svg viewBox="0 0 24 24"><path d="M22 11.08V12a10 10 0 11-5.93-9.14"/><path d="M22 4L12 14.01l-3-3"/></svg>Analyse des besoins et souhaits architecturaux</li><li><svg viewBox="0 0 24 24"><path d="M22 11.08V12a10 10 0 11-5.93-9.14"/><path d="M22 4L12 14.01l-3-3"/></svg>Aménagement intérieur et visuels 3D</li><li><svg viewBox="0 0 24 24"><path d="M22 11.08V12a10 10 0 11-5.93-9.14"/><path d="M22 4L12 14.01l-3-3"/></svg>Dépôt du dossier en mairie</li><li><svg viewBox="0 0 24 24"><path d="M22 11.08V12a10 10 0 11-5.93-9.14"/><path d="M22 4L12 14.01l-3-3"/></svg>Suivi jusqu'à l'obtention du permis</li></ul>
      <p class="text-muted" style="font-size:0.9rem;">Au-delà de 150 m², le recours à un architecte est obligatoire.</p>
      <h3 style="margin-top:2rem;">Déclaration Préalable (DP)</h3><p>Pour les modifications de l'aspect extérieur d'un bâtiment existant.</p>
      <a href="../permis-de-construire-la-reunion/" class="btn btn--outline-dark" style="margin-top:1rem;">Guide : obtenir un permis de construire</a>
    </div></div>
  </div></section>

  <section class="section section--light" id="preparation"><div class="container"><div class="prestation-number">03</div><div class="section-header"><div class="section-label">Prestation 3</div><h2>Préparation du Projet</h2></div>
    <div class="split split--reverse"><div class="split-image"><img src="https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=800&q=80" alt="Préparation projet construction" loading="lazy"></div>
    <div class="split-content"><p>Une fois le permis obtenu, nous préparons le lancement des travaux :</p>
      <ul class="check-list"><li><svg viewBox="0 0 24 24"><path d="M22 11.08V12a10 10 0 11-5.93-9.14"/><path d="M22 4L12 14.01l-3-3"/></svg>Constitution du Dossier de Consultation (DCE)</li><li><svg viewBox="0 0 24 24"><path d="M22 11.08V12a10 10 0 11-5.93-9.14"/><path d="M22 4L12 14.01l-3-3"/></svg>Décomposition du prix global par lots</li><li><svg viewBox="0 0 24 24"><path d="M22 11.08V12a10 10 0 11-5.93-9.14"/><path d="M22 4L12 14.01l-3-3"/></svg>Plans de référence et planning prévisionnel</li><li><svg viewBox="0 0 24 24"><path d="M22 11.08V12a10 10 0 11-5.93-9.14"/><path d="M22 4L12 14.01l-3-3"/></svg>Analyse des offres et sélection des entreprises</li><li><svg viewBox="0 0 24 24"><path d="M22 11.08V12a10 10 0 11-5.93-9.14"/><path d="M22 4L12 14.01l-3-3"/></svg>Arbitrage budgétaire et mise en place des contrats</li></ul>
      <div class="quote-block"><p>Les entreprises sont sélectionnées selon des critères stricts : budget, assurances, localisation, disponibilité et réputation.</p></div>
    </div></div>
  </div></section>

  <section class="section" id="suivi"><div class="container"><div class="prestation-number">04</div><div class="section-header"><div class="section-label">Prestation 4</div><h2>Suivi de Chantier</h2></div>
    <div class="split"><div class="split-image"><img src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&q=80" alt="Suivi de chantier La Réunion" loading="lazy"></div>
    <div class="split-content"><p>Le suivi de chantier assure la bonne exécution des travaux :</p>
      <ul class="check-list"><li><svg viewBox="0 0 24 24"><path d="M22 11.08V12a10 10 0 11-5.93-9.14"/><path d="M22 4L12 14.01l-3-3"/></svg>Ouverture du chantier</li><li><svg viewBox="0 0 24 24"><path d="M22 11.08V12a10 10 0 11-5.93-9.14"/><path d="M22 4L12 14.01l-3-3"/></svg>Réunions de chantier hebdomadaires</li><li><svg viewBox="0 0 24 24"><path d="M22 11.08V12a10 10 0 11-5.93-9.14"/><path d="M22 4L12 14.01l-3-3"/></svg>Suivi du planning et comptes-rendus</li><li><svg viewBox="0 0 24 24"><path d="M22 11.08V12a10 10 0 11-5.93-9.14"/><path d="M22 4L12 14.01l-3-3"/></svg>Validation des situations de travaux</li><li><svg viewBox="0 0 24 24"><path d="M22 11.08V12a10 10 0 11-5.93-9.14"/><path d="M22 4L12 14.01l-3-3"/></svg>Réception des travaux et levée de réserves</li></ul>
    </div></div>
  </div></section>

  <section class="cta-banner"><div class="container text-center"><h2>Prêt à lancer votre projet ?</h2><p>Contactez-nous pour une première consultation gratuite et sans engagement.</p><div style="display:flex;gap:1rem;justify-content:center;flex-wrap:wrap;"><a href="../contact/" class="btn btn--primary btn--lg">Demander un devis gratuit</a><a href="tel:+262693881521" class="btn btn--outline btn--lg">0693 88 15 21</a></div></div></section>`;

fs.writeFileSync(path.join(BASE, 'prestations/index.html'), page('../', '../style.css', '../script.js', 'Prestations Maître d\'œuvre La Réunion | Études, Permis, Suivi - ALB MOE', 'Découvrez les prestations d\'ALB MOE : études, permis de construire, préparation de projet et suivi de chantier à La Réunion.', 'prestations', prestationsBody));
console.log('✓ prestations');

// === RÉALISATIONS ===
const realisationsBody = `
  <section class="page-header"><div class="container"><div class="breadcrumb"><a href="../">Accueil</a> <span>/</span> <span>Réalisations</span></div><h1>Nos Réalisations</h1><p>Découvrez nos projets de construction et rénovation à La Réunion</p></div></section>

  <section class="section"><div class="container">
    <div class="section-header text-center"><div class="section-label">Portfolio</div><h2>Des projets variés sur toute l'île</h2><p class="section-subtitle" style="margin:0 auto;">Construction neuve, rénovation, extension... Découvrez une sélection de nos projets réalisés à La Réunion.</p></div>
    <div class="portfolio-grid">
      <div class="portfolio-card"><img src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600&q=80" alt="Villa contemporaine La Réunion" loading="lazy"><div class="portfolio-overlay"><h3>Villa contemporaine</h3><span>Construction neuve · Saint-Leu</span></div></div>
      <div class="portfolio-card"><img src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&q=80" alt="Maison familiale construction" loading="lazy"><div class="portfolio-overlay"><h3>Maison familiale</h3><span>Construction neuve · Saint-Gilles</span></div></div>
      <div class="portfolio-card"><img src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=600&q=80" alt="Rénovation intérieure" loading="lazy"><div class="portfolio-overlay"><h3>Rénovation complète</h3><span>Rénovation · Saint-Denis</span></div></div>
      <div class="portfolio-card"><img src="https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=600&q=80" alt="Extension maison La Réunion" loading="lazy"><div class="portfolio-overlay"><h3>Extension habitation</h3><span>Extension · Le Tampon</span></div></div>
      <div class="portfolio-card"><img src="https://images.unsplash.com/photo-1600573472592-401b489a3cdc?w=600&q=80" alt="Aménagement extérieur" loading="lazy"><div class="portfolio-overlay"><h3>Aménagement extérieur</h3><span>Aménagement · Saint-Pierre</span></div></div>
      <div class="portfolio-card"><img src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=600&q=80" alt="Villa moderne La Réunion" loading="lazy"><div class="portfolio-overlay"><h3>Villa moderne</h3><span>Construction neuve · L'Étang-Salé</span></div></div>
    </div>
  </div></section>

  <section class="cta-banner"><div class="container text-center"><h2>Vous avez un projet similaire ?</h2><p>Contactez-nous pour discuter de votre projet et obtenir un devis gratuit.</p><div style="display:flex;gap:1rem;justify-content:center;flex-wrap:wrap;"><a href="../contact/" class="btn btn--primary btn--lg">Demander un devis gratuit</a><a href="tel:+262693881521" class="btn btn--outline btn--lg">0693 88 15 21</a></div></div></section>`;

fs.writeFileSync(path.join(BASE, 'realisations/index.html'), page('../', '../style.css', '../script.js', 'Réalisations Maître d\'œuvre La Réunion | Projets Construction & Rénovation - ALB MOE', 'Découvrez les réalisations d\'ALB MOE : projets de construction neuve, rénovation et extension à La Réunion (974).', 'realisations', realisationsBody));
console.log('✓ realisations');

// === CONTACT ===
const contactBody = `
  <section class="page-header"><div class="container"><div class="breadcrumb"><a href="../">Accueil</a> <span>/</span> <span>Contact</span></div><h1>Contactez-nous</h1><p>Demandez un devis gratuit pour votre projet immobilier</p></div></section>

  <section class="section"><div class="container">
    <div class="contact-grid">
      <div>
        <div class="section-label">Nous contacter</div>
        <h2>Parlons de votre projet</h2>
        <p>Pour obtenir un devis gratuit ou pour toute question, contactez-nous par téléphone ou par e-mail. Nous vous répondrons dans les plus brefs délais.</p>

        <div style="display:flex;flex-direction:column;gap:1rem;margin:2rem 0;">
          <a href="tel:+262693881521" class="contact-info-card" style="text-decoration:none;color:inherit;">
            <div class="contact-icon"><svg viewBox="0 0 24 24"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/></svg></div>
            <div><h4>Téléphone</h4><p><strong>0693 88 15 21</strong><br>Lundi au vendredi · 8h - 17h</p></div>
          </a>
          <a href="mailto:alb-moe@outlook.com?subject=Demande%20de%20devis%20-%20Projet%20immobilier&body=Bonjour%2C%0A%0AJe%20souhaite%20obtenir%20un%20devis%20pour%20mon%20projet.%0A%0A---%20Décrivez%20votre%20projet%20ci-dessous%20---%0A%0AType%20de%20projet%20(construction%20neuve%20%2F%20rénovation%20%2F%20extension)%20%3A%0ALocalisation%20%3A%0ASurface%20estimée%20%3A%0ABudget%20envisagé%20%3A%0ADescription%20du%20projet%20%3A%0A%0A---%0A%0ACordialement%2C%0A" class="contact-info-card" style="text-decoration:none;color:inherit;">
            <div class="contact-icon"><svg viewBox="0 0 24 24"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><path d="M22 6l-10 7L2 6"/></svg></div>
            <div><h4>E-mail</h4><p><strong>alb-moe@outlook.com</strong><br>Réponse sous 24-48h</p></div>
          </a>
          <div class="contact-info-card">
            <div class="contact-icon"><svg viewBox="0 0 24 24"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg></div>
            <div><h4>Adresse</h4><p>87 chemin George Thenor<br>97424 Piton Saint-Leu<br><em>Intervention sur toute La Réunion</em></p></div>
          </div>
        </div>

        <div class="social-links" style="margin-top:1rem;">
          <a href="https://www.facebook.com/Albmoe" class="social-link" target="_blank" rel="noopener" aria-label="Facebook" style="background:var(--primary);"><svg viewBox="0 0 24 24"><path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/></svg></a>
          <a href="https://www.linkedin.com/in/alan-le-bail-389934104/" class="social-link" target="_blank" rel="noopener" aria-label="LinkedIn" style="background:var(--primary);"><svg viewBox="0 0 24 24"><path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2zM4 6a2 2 0 100-4 2 2 0 000 4z"/></svg></a>
        </div>
      </div>
      <div>
        <div class="mail-cta" id="formulaire-devis">
          <h3>Demandez votre devis gratuit par e-mail</h3>
          <p>Envoyez-nous un e-mail en décrivant votre projet. Pour que nous puissions vous répondre au mieux, merci de préciser :</p>
          <ul style="text-align:left;max-width:400px;margin:1.5rem auto;list-style:none;padding:0;">
            <li style="margin-bottom:0.75rem;display:flex;align-items:flex-start;gap:0.5rem;"><span style="color:var(--accent);font-weight:bold;">1.</span> Le <strong>type de projet</strong> (construction neuve, rénovation, extension...)</li>
            <li style="margin-bottom:0.75rem;display:flex;align-items:flex-start;gap:0.5rem;"><span style="color:var(--accent);font-weight:bold;">2.</span> La <strong>localisation</strong> du projet (commune, adresse)</li>
            <li style="margin-bottom:0.75rem;display:flex;align-items:flex-start;gap:0.5rem;"><span style="color:var(--accent);font-weight:bold;">3.</span> La <strong>surface estimée</strong> (m²)</li>
            <li style="margin-bottom:0.75rem;display:flex;align-items:flex-start;gap:0.5rem;"><span style="color:var(--accent);font-weight:bold;">4.</span> Le <strong>budget envisagé</strong></li>
            <li style="margin-bottom:0.75rem;display:flex;align-items:flex-start;gap:0.5rem;"><span style="color:var(--accent);font-weight:bold;">5.</span> Une <strong>description</strong> de votre projet</li>
          </ul>
          <a href="mailto:alb-moe@outlook.com?subject=Demande%20de%20devis%20-%20Projet%20immobilier&body=Bonjour%2C%0A%0AJe%20souhaite%20obtenir%20un%20devis%20pour%20mon%20projet.%0A%0AType%20de%20projet%20%3A%0ALocalisation%20%3A%0ASurface%20estimée%20%3A%0ABudget%20envisagé%20%3A%0ADescription%20%3A%0A%0ACordialement%2C%0A" class="btn btn--primary btn--lg">Envoyer un e-mail</a>
          <p class="mail-subject">L'e-mail s'ouvrira avec un modèle pré-rempli dans votre messagerie.</p>
        </div>
      </div>
    </div>
  </div></section>`;

fs.writeFileSync(path.join(BASE, 'contact/index.html'), page('../', '../style.css', '../script.js', 'Contact & Devis Gratuit | ALB Maître d\'œuvre La Réunion', 'Contactez ALB MOE pour un devis gratuit. Maître d\'œuvre à La Réunion : construction, rénovation, permis de construire. Tél : 0693 88 15 21.', 'contact', contactBody));
console.log('✓ contact');

// === BLOG ===
const blogBody = `
  <section class="page-header"><div class="container"><div class="breadcrumb"><a href="../">Accueil</a> <span>/</span> <span>Blog</span></div><h1>Blog & Actualités</h1><p>Conseils et informations sur la construction et la maîtrise d'œuvre à La Réunion</p></div></section>

  <section class="section"><div class="container">
    <div class="blog-grid">
      <a href="../permis-de-construire-la-reunion/" class="blog-card" style="text-decoration:none;color:inherit;">
        <div class="blog-card-image"><img src="https://images.unsplash.com/photo-1554469384-e58fac16e23a?w=600&q=80" alt="Permis de construire La Réunion" loading="lazy"></div>
        <div class="blog-card-content">
          <div class="blog-card-tag">Guide pratique</div>
          <h3><span>Comment obtenir un permis de construire à La Réunion ?</span></h3>
          <p>Découvrez les étapes clés, les documents nécessaires et les démarches à suivre pour obtenir votre permis de construire à La Réunion (974).</p>
        </div>
      </a>
    </div>
  </div></section>

  <section class="cta-banner"><div class="container text-center"><h2>Vous avez un projet ?</h2><p>Contactez-nous pour une première consultation gratuite.</p><a href="../contact/" class="btn btn--primary btn--lg">Demander un devis gratuit</a></div></section>`;

fs.writeFileSync(path.join(BASE, 'blog/index.html'), page('../', '../style.css', '../script.js', 'Blog Maître d\'œuvre La Réunion | Conseils Construction & Rénovation - ALB MOE', 'Blog ALB MOE : conseils, guides et actualités sur la construction, rénovation et permis de construire à La Réunion.', 'blog', blogBody));
console.log('✓ blog');

// === PERMIS DE CONSTRUIRE ===
// permis-de-construire-la-reunion/index.html is maintained as a standalone file (interactive quiz, checklist, accordion)
console.log('⊘ permis-de-construire (standalone, skipped)');

// === MENTIONS LÉGALES ===
const mentionsBody = `
  <section class="page-header"><div class="container"><div class="breadcrumb"><a href="../">Accueil</a> <span>/</span> <span>Mentions légales</span></div><h1>Mentions Légales</h1></div></section>

  <section class="section"><div class="container"><div class="legal-content">
    <h2>1. Édition du site</h2>
    <p><strong>Propriétaire :</strong> Le Bail Alan<br><strong>E-mail :</strong> <a href="mailto:alb-moe@outlook.com">alb-moe@outlook.com</a><br><strong>Téléphone :</strong> 0693 88 15 21<br><strong>Adresse :</strong> 87 chemin George Thenor, 97424 Piton Saint-Leu</p>

    <h2>2. Identification de l'entreprise</h2>
    <p><strong>Raison sociale :</strong> Le Bail Alan<br><strong>SIREN :</strong> 910 413 277 000 13<br><strong>Adresse :</strong> 87 chemin George Thenor, 97424 Piton Saint-Leu<br><strong>Directeur de la publication :</strong> Alan Le Bail</p>

    <h2>3. Hébergement</h2>
    <p><strong>Hébergeur :</strong> OVH SAS<br>2 rue Kellermann – BP 80157 – 59053 Roubaix Cedex 1<br>Téléphone : 1007</p>

    <h2>4. Propriété intellectuelle</h2>
    <p>L'ensemble du contenu de ce site (textes, images, graphismes, logo, etc.) est la propriété exclusive de Le Bail Alan. Toute reproduction, même partielle, est interdite sans autorisation écrite préalable.</p>

    <h2>5. Limitation de responsabilité</h2>
    <p>ALB MOE ne saurait être tenu responsable des dommages directs ou indirects causés au matériel de l'utilisateur lors de l'accès au site. ALB MOE décline toute responsabilité quant à l'utilisation qui pourrait être faite des informations et contenus présents sur le site.</p>

    <h2>6. Données personnelles (CNIL)</h2>
    <p>Conformément à la loi n°78-17 du 6 janvier 1978, vous disposez d'un droit d'accès, de rectification et de suppression de vos données personnelles.</p>
    <p><strong>Délégué à la protection des données (DPO) :</strong> Alan Le Bail — <a href="mailto:alb-moe@outlook.com">alb-moe@outlook.com</a></p>

    <h2>7. Cookies</h2>
    <p>Ce site peut utiliser des cookies pour améliorer l'expérience utilisateur. La durée de conservation maximale est d'un mois. Vous pouvez configurer votre navigateur pour accepter ou refuser les cookies.</p>

    <h2>8. Droit applicable</h2>
    <p>Le présent site est soumis au droit français. En cas de litige, les tribunaux de Saint-Pierre sont seuls compétents.</p>

    <p style="margin-top:3rem;padding:1.5rem;background:var(--light-bg);border-radius:var(--radius-md);font-size:0.9rem;"><em>Ce site a été financé avec l'aide du FEDER (REACT-UE), dans le cadre de la réponse de l'Union européenne à la pandémie COVID-19. L'Europe s'engage à La Réunion.</em></p>
  </div></div></section>`;

fs.writeFileSync(path.join(BASE, 'mentions-legales/index.html'), page('../', '../style.css', '../script.js', 'Mentions Légales | ALB Maître d\'œuvre La Réunion', 'Mentions légales du site ALB Maître d\'œuvre. Informations sur l\'entreprise, l\'hébergeur et la protection des données.', '', mentionsBody));
console.log('✓ mentions-legales');

// === POLITIQUE DE CONFIDENTIALITÉ ===
const privacyBody = `
  <section class="page-header"><div class="container"><div class="breadcrumb"><a href="../">Accueil</a> <span>/</span> <span>Politique de confidentialité</span></div><h1>Politique de Confidentialité</h1></div></section>

  <section class="section"><div class="container"><div class="legal-content">
    <h2>Qui sommes-nous ?</h2>
    <p>L'adresse de notre site web est : <strong>https://albmaitredoeuvre.fr</strong>. Ce site est édité par ALB MOE — Le Bail Alan, maître d'œuvre à La Réunion.</p>

    <h2>Données personnelles collectées</h2>
    <p>Lorsque vous nous contactez par e-mail, nous collectons les informations que vous nous transmettez volontairement (nom, e-mail, téléphone, description du projet). Ces données sont utilisées uniquement pour répondre à votre demande.</p>

    <h2>Cookies</h2>
    <p>Ce site n'utilise pas de cookies de tracking ou de publicité. Des cookies techniques peuvent être utilisés pour le bon fonctionnement du site.</p>

    <h2>Contenu embarqué depuis d'autres sites</h2>
    <p>Les pages de ce site peuvent inclure du contenu intégré depuis d'autres sites. Ce contenu se comporte de la même manière que si vous visitiez ces sites directement.</p>

    <h2>Durée de conservation des données</h2>
    <p>Les données personnelles transmises par e-mail sont conservées le temps nécessaire au traitement de votre demande, puis supprimées.</p>

    <h2>Vos droits sur vos données</h2>
    <p>Vous pouvez demander à tout moment la consultation, la modification ou la suppression de vos données personnelles en nous contactant à : <a href="mailto:alb-moe@outlook.com">alb-moe@outlook.com</a>.</p>

    <h2>Contact</h2>
    <p><strong>Délégué à la protection des données :</strong> Alan Le Bail<br><strong>E-mail :</strong> <a href="mailto:alb-moe@outlook.com">alb-moe@outlook.com</a></p>
  </div></div></section>`;

fs.writeFileSync(path.join(BASE, 'politique-de-confidentialite/index.html'), page('../', '../style.css', '../script.js', 'Politique de Confidentialité | ALB Maître d\'œuvre La Réunion', 'Politique de confidentialité du site ALB Maître d\'œuvre. Informations sur le traitement des données personnelles.', '', privacyBody));
console.log('✓ politique-de-confidentialite');

// === CATEGORY (redirect to blog) ===
const categoryBody = `
  <section class="page-header"><div class="container"><div class="breadcrumb"><a href="../../">Accueil</a> <span>/</span> <a href="../../blog/">Blog</a> <span>/</span> <span>Articles</span></div><h1>Tous nos articles</h1></div></section>

  <section class="section"><div class="container">
    <div class="blog-grid">
      <a href="../../permis-de-construire-la-reunion/" class="blog-card" style="text-decoration:none;color:inherit;">
        <div class="blog-card-image"><img src="https://images.unsplash.com/photo-1554469384-e58fac16e23a?w=600&q=80" alt="Permis de construire La Réunion" loading="lazy"></div>
        <div class="blog-card-content">
          <div class="blog-card-tag">Guide pratique</div>
          <h3><span>Comment obtenir un permis de construire à La Réunion ?</span></h3>
          <p>Découvrez les étapes clés et les démarches pour votre permis de construire à La Réunion.</p>
        </div>
      </a>
    </div>
  </div></section>`;

fs.writeFileSync(path.join(BASE, 'category/non-classe/index.html'), page('../../', '../../style.css', '../../script.js', 'Articles | ALB Maître d\'œuvre La Réunion', 'Tous les articles du blog ALB MOE : guides et conseils sur la construction à La Réunion.', 'blog', categoryBody));
console.log('✓ category/non-classe');

console.log('\n=== All pages generated! ===');
