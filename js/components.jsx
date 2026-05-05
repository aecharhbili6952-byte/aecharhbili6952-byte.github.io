/* js/components.jsx — Composants React du CV */

/* Données des projets */
const projectsData = [
  {
    title      : "Texas Runner",
    description: "Jeu 2D développé en C++ avec la bibliothèque SFML. Gestion des sprites, collisions, score et boucle de jeu complète.",
    tech       : ["C++", "SFML", "POO", "Code::Blocks"],
    link       : "https://github.com/aecharhbili6952-byte",
    linkLabel  : "Voir sur GitHub"
  },
  {
    title      : "Gide.ma",
    description: "Site web statique réalisé en équipe avec des camarades. Interface responsive, navigation multi-pages et mise en page soignée.",
    tech       : ["HTML5", "CSS3", "JavaScript"],
    link       : "https://tarikaittoubdirte.github.io/GIDE-ma/index.html",
    linkLabel  : "Voir la démo"
  }
];


/* Composant 1 : Badge */
function Badge({ label, color = "accent" }) {
  const colorMap = {
    accent : "badge-accent",
    blue   : "badge-blue",
    neutral: "badge-neutral"
  };

  return (
    <span className={`badge ${colorMap[color] ?? "badge-accent"}`}>
      {label}
    </span>
  );
}


/* Composant 2 : ProjectCard */
function ProjectCard({ title, description, tech, link, linkLabel }) {
  return (
    <article className="project-card">

      <h3 className="project-card-title">{title}</h3>

      <p className="project-card-desc">{description}</p>

      {/* Badges technologiques */}
      <div className="project-card-tech">
        {tech.map((t, index) => (
          <Badge key={index} label={t} color="accent" />
        ))}
      </div>

      {/* Lien externe */}
      <a
        href={link}
        target="_blank"
        rel="noreferrer"
        className="project-card-link"
      >
        <i className="fa-brands fa-github"></i>
        {linkLabel}
      </a>

    </article>
  );
}


/* Composant 3 : ProjectList */
function ProjectList({ projects }) {
  if (!projects || projects.length === 0) {
    return <p style={{ color: "var(--muted)" }}>Aucun projet à afficher.</p>;
  }

  return (
    <div className="projects-grid">
      {projects.map((project, index) => (
        <ProjectCard key={index} {...project} />
      ))}
    </div>
  );
}


/* Composant 4 : ContactForm */
function ContactForm() {

  /* État des champs */
  const [fields, setFields] = React.useState({
    name   : "",
    email  : "",
    message: ""
  });

  /* État des erreurs */
  const [errors, setErrors] = React.useState({});

  /* Formulaire envoyé */
  const [sent, setSent] = React.useState(false);


  /* Validation jQuery */
  function validate() {
    const errs = {};

    if ($.trim(fields.name) === "") {
      errs.name = "Le nom est obligatoire.";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test($.trim(fields.email))) {
      errs.email = "Adresse e-mail invalide.";
    }

    if ($.trim(fields.message).length < 10) {
      errs.message = "Le message doit contenir au moins 10 caractères.";
    }

    return errs;
  }


  /* Mise à jour d'un champ */
  function handleChange(e) {
    const { name, value } = e.target;

    setFields(prev => ({ ...prev, [name]: value }));

    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  }


  /* Soumission */
  function handleSubmit() {
    const errs = validate();

    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }

    setSent(true);

    showToast("Message envoyé avec succès !");
  }


  /* Affichage après envoi */
  if (sent) {
    return (
      <div className="form-success">
        <i className="fa-solid fa-circle-check"></i>
        <span>
          Merci <strong>{fields.name}</strong> ! Votre message a bien été reçu.
        </span>
      </div>
    );
  }


  /* Formulaire */
  return (
    <div className="contact-form-wrapper">
      <div className="cv-form">

        {/* Champ Nom */}
        <div className="form-group">
          <label className="form-label">Nom</label>
          <input
            type="text"
            name="name"
            placeholder="Votre nom complet"
            value={fields.name}
            onChange={handleChange}
            className={`form-input${errors.name ? " error" : ""}`}
          />
          {errors.name && (
            <span className="form-error">{errors.name}</span>
          )}
        </div>

        {/* Champ Email */}
        <div className="form-group">
          <label className="form-label">E-mail</label>
          <input
            type="email"
            name="email"
            placeholder="votre@email.com"
            value={fields.email}
            onChange={handleChange}
            className={`form-input${errors.email ? " error" : ""}`}
          />
          {errors.email && (
            <span className="form-error">{errors.email}</span>
          )}
        </div>

        {/* Champ Message */}
        <div className="form-group">
          <label className="form-label">Message</label>
          <textarea
            name="message"
            rows="5"
            placeholder="Votre message (minimum 10 caractères)..."
            value={fields.message}
            onChange={handleChange}
            className={`form-textarea${errors.message ? " error" : ""}`}
          />
          {errors.message && (
            <span className="form-error">{errors.message}</span>
          )}
        </div>

        {/* Bouton d'envoi */}
        <button
          type="button"
          className="btn-submit"
          onClick={handleSubmit}
        >
          Envoyer
          <i className="fa-solid fa-paper-plane"></i>
        </button>

      </div>
    </div>
  );
}


/* Montage des composants React */

const projectsRoot = ReactDOM.createRoot(
  document.getElementById("react-projects")
);
projectsRoot.render(<ProjectList projects={projectsData} />);

const contactRoot = ReactDOM.createRoot(
  document.getElementById("react-contact")
);
contactRoot.render(<ContactForm />);
