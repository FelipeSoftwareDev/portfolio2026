import PlexusBackground from '../components/PlexusBackground';
import GlassCard from '../components/GlassCard';
import './Home.css';
import eu from '../assets/eu.png';
import { translations } from '../translations';

const Home = () => {
    const userLang = typeof window !== 'undefined' ? (navigator.language.startsWith('pt') ? 'pt' : 'en') : 'en';
    const t = translations[userLang as keyof typeof translations];

    return (
        <div className="home">
            <PlexusBackground />

            {/* Hero Section */}
            <section className="hero-section">
                <div className="hero-content">
                    <div className="hero-text">
                        <p className="greeting">{t.hero.greeting}</p>
                        <h1 className="title">
                            {t.hero.title1}<br />
                            <span className="highlight">{t.hero.title2}</span>
                        </h1>
                        <p className="description">
                            {t.hero.description}
                        </p>
                        <div className="cta-buttons">
                            <button className="btn-primary">{t.hero.btnAbout}</button>
                            <button className="btn-secondary">{t.hero.btnProjects}</button>
                        </div>
                    </div>

                    <div className="hero-image">
                        <img src={eu} alt="Foto do Felipe" className="image-style" />
                    </div>
                </div>

                {/* Stats Cards */}
                <div className="stats-grid">
                    <GlassCard className="stat-card">
                        <h3 className="stat-number">5+</h3>
                        <p className="stat-label">{t.stats.experience}</p>
                    </GlassCard>

                    <GlassCard className="stat-card">
                        <h3 className="stat-number">40+</h3>
                        <p className="stat-label">{t.stats.projects}</p>
                    </GlassCard>

                    <GlassCard className="stat-card">
                        <h3 className="stat-number">85+</h3>
                        <p className="stat-label">{t.stats.clients}</p>
                    </GlassCard>

                    <GlassCard className="stat-card">
                        <h3 className="stat-number">12</h3>
                        <p className="stat-label">{t.stats.awards}</p>
                    </GlassCard>
                </div>
            </section>

            {/* About Section */}
            <section className="about-section">
                <GlassCard>
                    <h2 className="section-title">{t.about.title}</h2>
                    <p className="section-text">
                        {t.about.text}
                    </p>
                </GlassCard>
            </section>

            {/* Hard Skills Section */}
            <section className="skills-section">
                <GlassCard>
                    <h2 className="section-title">{t.skills.title}</h2>
                    <p className="section-text">
                        {t.skills.description}
                    </p>
                    <div className="tech-stack">
                        <div className="tech-category">
                            <h4 className="category-title">{t.skills.categories.frontend}</h4>
                            <p className="category-items">React, TypeScript, HTML, CSS, JavaScript, Tailwind CSS, Bootstrap</p>
                        </div>
                        <div className="tech-category">
                            <h4 className="category-title">{t.skills.categories.backend}</h4>
                            <p className="category-items">Node.js, Express, Python, Django</p>
                        </div>
                        <div className="tech-category">
                            <h4 className="category-title">{t.skills.categories.data}</h4>
                            <p className="category-items">MongoDB, Docker, AWS, Google Cloud Platform, Firebase</p>
                        </div>
                        <div className="tech-category">
                            <h4 className="category-title">{t.skills.categories.tools}</h4>
                            <p className="category-items">Git, GitHub</p>
                        </div>
                    </div>
                </GlassCard>
            </section>

            {/* Projects Section */}
            <section className="projects-section">
                <h2 className="section-title">{t.projects.title}</h2>
                <div className="projects-grid">
                    <GlassCard className="project-card">
                        <div className="project-image-placeholder">{t.projects.aida.title}</div>
                        <h3 className="project-title">{t.projects.aida.title}</h3>
                        <p className="project-description">
                            {t.projects.aida.description}
                        </p>
                        <div className="project-tags">
                            {t.projects.aida.tags.map(tag => (
                                <span key={tag} className="tag">{tag}</span>
                            ))}
                        </div>
                    </GlassCard>

                    <GlassCard className="project-card">
                        <div className="project-image-placeholder">{t.projects.portfolio.title}</div>
                        <h3 className="project-title">{t.projects.portfolio.title}</h3>
                        <p className="project-description">
                            {t.projects.portfolio.description}
                        </p>
                        <div className="project-tags">
                            {t.projects.portfolio.tags.map(tag => (
                                <span key={tag} className="tag">{tag}</span>
                            ))}
                        </div>
                    </GlassCard>

                    <GlassCard className="project-card">
                        <div className="project-image-placeholder">{t.projects.dashboard.title}</div>
                        <h3 className="project-title">{t.projects.dashboard.title}</h3>
                        <p className="project-description">
                            {t.projects.dashboard.description}
                        </p>
                        <div className="project-tags">
                            {t.projects.dashboard.tags.map(tag => (
                                <span key={tag} className="tag">{tag}</span>
                            ))}
                        </div>
                    </GlassCard>
                </div>
            </section>

            {/* Contact Section */}
            <section className="contact-section">
                <GlassCard className="contact-card">
                    <h2 className="section-title">{t.contact.title}</h2>
                    <p className="section-text">
                        {t.contact.description}
                    </p>
                    <button className="btn-primary contact-btn">{t.contact.button}</button>
                </GlassCard>
            </section>
        </div>
    );
};

export default Home;
