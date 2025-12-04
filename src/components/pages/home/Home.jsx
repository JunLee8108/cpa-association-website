import React, { useEffect, useRef, useMemo } from "react";
import { useNavigate, useLocation } from "react-router";
import { Clock, Package, Globe, MapPin, Check } from "lucide-react";
import useTranslation from "../../hooks/useTranslation";
import "./Home.css";

const Home = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { t, currentLanguage } = useTranslation();

  const handleNavigation = (path) => {
    if (pathname === path) return;
    navigate(path);
  };

  // Refs for animated elements
  const heroTitleRef = useRef(null);
  const heroSubtitleRef = useRef(null);
  const heroDescriptionRef = useRef(null);
  const heroCtaRef = useRef(null);
  const sectionHeaderRef = useRef(null);
  const aboutCardsRef = useRef([]);
  const ctaSectionRef = useRef(null);
  const servicesHeaderRef = useRef(null);
  const servicesCardsRef = useRef([]);
  const processHeaderRef = useRef(null);
  const processStepsRef = useRef([]);
  const locationHeaderRef = useRef(null);
  const locationMapRef = useRef(null);
  const locationInfoRef = useRef(null);
  const casesHeaderRef = useRef(null);
  const casesCardsRef = useRef([]);
  const casesCtaRef = useRef(null);

  // Memoized service items to avoid re-rendering
  const serviceItems = useMemo(() => {
    return ["incorporation", "tax", "accounting", "consulting", "hr", "it"].map(
      (key, index) => ({
        key,
        number: String(index + 1).padStart(2, "0"),
        title: t(`home.services.items.${key}.title`),
        description: t(`home.services.items.${key}.description`),
        features: t(`home.services.items.${key}.features`) || [],
        image: `/service-${
          index === 0 ? 3 : index === 4 ? 6 : index === 5 ? 5 : index + 1
        }.jpg`,
        imagePosition:
          index === 0 || index === 4 || index === 5 ? "top" : "center",
      })
    );
  }, [t, currentLanguage]);

  // Process steps data
  const processSteps = useMemo(() => {
    return ["consultation", "analysis", "execution", "support"].map((key) => ({
      key,
      number: t(`home.process.steps.${key}.number`),
      title: t(`home.process.steps.${key}.title`),
      description: t(`home.process.steps.${key}.description`),
      items: t(`home.process.steps.${key}.items`) || [],
      duration: t(`home.process.steps.${key}.duration`),
    }));
  }, [t, currentLanguage]);

  // Location states
  const locationStates = useMemo(() => {
    return t("home.location.states") || [];
  }, [t, currentLanguage]);

  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    };

    const handleIntersection = (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate-in");
          observer.unobserve(entry.target);
        }
      });
    };

    const observer = new IntersectionObserver(
      handleIntersection,
      observerOptions
    );

    // Observe all elements
    const heroElements = [
      heroTitleRef.current,
      heroSubtitleRef.current,
      heroDescriptionRef.current,
      heroCtaRef.current,
    ];

    heroElements.forEach((el, index) => {
      if (el) {
        el.style.animationDelay = `${index * 0.1}s`;
        observer.observe(el);
      }
    });

    if (sectionHeaderRef.current) observer.observe(sectionHeaderRef.current);
    if (servicesHeaderRef.current) observer.observe(servicesHeaderRef.current);
    if (processHeaderRef.current) observer.observe(processHeaderRef.current);
    if (locationHeaderRef.current) observer.observe(locationHeaderRef.current);
    if (casesHeaderRef.current) observer.observe(casesHeaderRef.current);
    if (ctaSectionRef.current) observer.observe(ctaSectionRef.current);
    if (casesCtaRef.current) observer.observe(casesCtaRef.current);
    if (locationMapRef.current) {
      locationMapRef.current.style.animationDelay = "0.1s";
      observer.observe(locationMapRef.current);
    }
    if (locationInfoRef.current) {
      locationInfoRef.current.style.animationDelay = "0.2s";
      observer.observe(locationInfoRef.current);
    }

    aboutCardsRef.current.forEach((card, index) => {
      if (card) {
        card.style.animationDelay = `${index * 0.08}s`;
        observer.observe(card);
      }
    });

    servicesCardsRef.current.forEach((card, index) => {
      if (card) {
        card.style.animationDelay = `${index * 0.1}s`;
        observer.observe(card);
      }
    });

    processStepsRef.current.forEach((step, index) => {
      if (step) {
        step.style.animationDelay = `${index * 0.12}s`;
        observer.observe(step);
      }
    });

    casesCardsRef.current.forEach((card, index) => {
      if (card) {
        card.style.animationDelay = `${index * 0.15}s`;
        observer.observe(card);
      }
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  // Parse hero title for highlighting
  const heroTitle = t("home.hero.title");
  const titleParts = heroTitle.split(" ");
  const highlightIndex =
    currentLanguage === "ko"
      ? 2
      : titleParts.findIndex((word) => word.toLowerCase().includes("partner"));

  return (
    <div className="home-container">
      {/* Hero Section - 기존 코드를 이걸로 교체 */}
      <section className="home-hero">
        <div className="home-hero-background">
          <img
            src="/hero.png"
            alt={
              currentLanguage === "ko"
                ? "미국 비즈니스 컨설팅"
                : "US Business Consulting"
            }
            className="home-hero-background-image"
          />
          <div className="home-hero-overlay"></div>
        </div>

        <div className="home-hero-content">
          <div className="container">
            <div className="home-hero-inner">
              <div className="home-hero-text-wrapper">
                <h1 ref={heroSubtitleRef} className="home-hero-title fade-up">
                  {currentLanguage === "ko" ? (
                    <>
                      <span className="home-hero-title-line">미국 진출의</span>
                      <span className="home-hero-title-line">
                        <span className="home-hero-highlight">
                          든든한 파트너
                        </span>
                      </span>
                    </>
                  ) : (
                    <>
                      <span className="home-hero-title-line">Your Trusted</span>
                      <span className="home-hero-title-line">
                        <span className="home-hero-highlight">
                          Business Partner
                        </span>
                      </span>
                    </>
                  )}
                </h1>

                <p
                  ref={heroDescriptionRef}
                  className="home-hero-description fade-up"
                >
                  {t("home.hero.description")}
                </p>

                <div ref={heroCtaRef} className="home-hero-cta-wrapper fade-up">
                  <button
                    className="home-hero-cta-primary"
                    onClick={() => handleNavigation("/contact")}
                  >
                    {t("home.hero.cta.primary")}
                  </button>
                  <button
                    className="home-hero-cta-secondary"
                    onClick={() => handleNavigation("/services")}
                  >
                    {t("home.hero.cta.secondary")}
                  </button>
                </div>
              </div>

              <div className="home-hero-trust-bar">
                <div className="home-hero-trust-item">
                  <span className="home-hero-trust-number">15+</span>
                  <span className="home-hero-trust-label">
                    {currentLanguage === "ko" ? "년 경력" : "Years Experience"}
                  </span>
                </div>
                <div className="home-hero-trust-divider"></div>
                <div className="home-hero-trust-item">
                  <span className="home-hero-trust-number">1000+</span>
                  <span className="home-hero-trust-label">
                    {currentLanguage === "ko" ? "고객사" : "Clients Served"}
                  </span>
                </div>
                <div className="home-hero-trust-divider"></div>
                <div className="home-hero-trust-item">
                  <span className="home-hero-trust-number">6</span>
                  <span className="home-hero-trust-label">
                    {currentLanguage === "ko"
                      ? "개 주 서비스"
                      : "States Coverage"}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Us Section */}
      <section id="about" className="home-about">
        <div className="container">
          <div ref={sectionHeaderRef} className="home-about-header fade-up">
            <span className="home-section-tag">{t("home.about.tag")}</span>
            <h2 className="home-section-title">
              {t("home.about.title")}
              <br />
              <span className="home-section-highlight">
                {t("home.about.titleHighlight")}
              </span>
            </h2>
            <p className="home-section-description">
              {currentLanguage === "ko" ? (
                <>
                  {t("home.about.description").split(", ")[0]},
                  <br />
                  {t("home.about.description").split(", ").slice(1).join(", ")}
                </>
              ) : (
                t("home.about.description")
              )}
            </p>
            <p className="home-section-description-mobile">
              {t("home.about.description")}
            </p>
          </div>

          <div className="home-about-grid">
            <div
              ref={(el) => (aboutCardsRef.current[0] = el)}
              className="home-about-card fade-up"
            >
              <div className="home-about-card-icon">
                <Clock size={32} strokeWidth={1.5} />
              </div>
              <h3 className="home-about-card-title">
                {t("home.about.cards.experience.title")}
              </h3>
              <p className="home-about-card-description">
                {t("home.about.cards.experience.description")}
              </p>
            </div>

            <div
              ref={(el) => (aboutCardsRef.current[1] = el)}
              className="home-about-card fade-up"
            >
              <div className="home-about-card-icon">
                <Package size={32} strokeWidth={1.5} />
              </div>
              <h3 className="home-about-card-title">
                {t("home.about.cards.onestop.title")}
              </h3>
              <p className="home-about-card-description">
                {t("home.about.cards.onestop.description")}
              </p>
            </div>

            <div
              ref={(el) => (aboutCardsRef.current[2] = el)}
              className="home-about-card fade-up"
            >
              <div className="home-about-card-icon">
                <Globe size={32} strokeWidth={1.5} />
              </div>
              <h3 className="home-about-card-title">
                {t("home.about.cards.network.title")}
              </h3>
              <p className="home-about-card-description">
                {t("home.about.cards.network.description")}
              </p>
            </div>
          </div>

          <div ref={ctaSectionRef} className="home-about-cta scale-in">
            <h3 className="home-about-cta-title">
              {t("home.about.cta.title")}
            </h3>
            <p className="home-about-cta-description">
              {t("home.about.cta.description")}
            </p>
            <button
              className="home-about-cta-button"
              onClick={() => handleNavigation("/contact")}
            >
              {t("home.about.cta.button")}
            </button>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="home-services">
        <div className="container">
          <div ref={servicesHeaderRef} className="home-services-header fade-up">
            <span className="home-section-tag">{t("home.services.tag")}</span>
            <h2 className="home-section-title">
              {t("home.services.title")}
              <span className="home-section-highlight">
                {t("home.services.titleHighlight")}
              </span>
            </h2>
            <p className="home-section-description">
              {t("home.services.description")}
            </p>
          </div>

          <div className="home-services-grid">
            {serviceItems.map((service, index) => (
              <div
                key={service.key}
                ref={(el) => (servicesCardsRef.current[index] = el)}
                className="home-service-item fade-up"
              >
                <div className="home-service-image-wrapper">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="home-service-image"
                    style={{ objectPosition: service.imagePosition }}
                  />
                  <div className="home-service-overlay">
                    <span className="home-service-number">
                      {service.number}
                    </span>
                  </div>
                </div>
                <div className="home-service-content">
                  <h3 className="home-service-title">{service.title}</h3>
                  <p className="home-service-description">
                    {service.description}
                  </p>
                  <ul className="home-service-features">
                    {service.features.map((feature, idx) => (
                      <li key={idx}>{feature}</li>
                    ))}
                  </ul>
                  <a
                    href="#"
                    className="home-service-link"
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavigation("/services");
                    }}
                  >
                    {t("home.services.viewMore")}
                    <svg
                      className="home-service-arrow"
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                    >
                      <path
                        d="M7.5 5L12.5 10L7.5 15"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="home-process">
        <div className="container">
          <div ref={processHeaderRef} className="home-process-header fade-up">
            <span className="home-section-tag">{t("home.process.tag")}</span>
            <h2 className="home-section-title">
              {t("home.process.title")}
              <span className="home-section-highlight">
                {t("home.process.titleHighlight")}
              </span>
            </h2>
            <p className="home-section-description">
              {t("home.process.description")}
            </p>
          </div>

          <div className="home-process-timeline">
            {processSteps.map((step, index) => (
              <div
                key={step.key}
                ref={(el) => (processStepsRef.current[index] = el)}
                className="home-process-step fade-up"
              >
                <div className="home-process-step-number">
                  <span>{step.number}</span>
                  <div className="home-process-step-line"></div>
                </div>

                <div className="home-process-step-content">
                  <h3 className="home-process-step-title">{step.title}</h3>
                  <p className="home-process-step-description">
                    {step.description}
                  </p>

                  <ul className="home-process-step-list">
                    {step.items.map((item, idx) => (
                      <li key={idx}>{item}</li>
                    ))}
                  </ul>

                  <div className="home-process-step-duration">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <circle
                        cx="8"
                        cy="8"
                        r="7"
                        stroke="var(--gray-400)"
                        strokeWidth="1.5"
                      />
                      <path
                        d="M8 4V8L10.5 10.5"
                        stroke="var(--gray-400)"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                      />
                    </svg>
                    <span>{step.duration}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Location Section */}
      <section className="home-location">
        <div className="container">
          <div ref={locationHeaderRef} className="home-location-header fade-up">
            <span className="home-section-tag">{t("home.location.tag")}</span>
            <h2 className="home-section-title">
              {t("home.location.title")}
              <span className="home-section-highlight">
                {t("home.location.titleHighlight")}
              </span>
            </h2>
            <p className="home-section-description">
              {currentLanguage === "ko" ? (
                <>
                  {t("home.location.description").split("? ")[0]}?
                  <br />
                  {t("home.location.description").split("? ")[1]}
                </>
              ) : (
                t("home.location.description")
              )}
            </p>
          </div>

          <div className="home-location-content">
            <div ref={locationMapRef} className="home-location-map fade-up">
              <img
                src="/service-1.jpg"
                alt={
                  currentLanguage === "ko"
                    ? "미국 서비스 지역"
                    : "US Service Areas"
                }
                className="home-location-map-image"
              />
            </div>

            <div ref={locationInfoRef} className="home-location-info fade-up">
              <div>
                <div className="home-location-badge">
                  <MapPin size={16} />
                  <span>{t("home.location.badge")}</span>
                </div>
                <p className="home-location-description-main">
                  {t("home.location.mainDescription")}
                </p>
              </div>

              <div className="home-location-states">
                {locationStates.map((state, index) => (
                  <div key={index} className="home-location-state">
                    <span className="home-location-state-icon">
                      <Check size={12} strokeWidth={3} />
                    </span>
                    <span className="home-location-state-name">{state}</span>
                  </div>
                ))}
              </div>

              <div className="home-location-cta-wrapper">
                <button
                  className="home-location-cta-primary"
                  onClick={() => handleNavigation("/contact")}
                >
                  {t("home.location.cta.primary")}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Case Studies Section */}
      <section id="case" className="home-cases">
        <div className="container">
          <div ref={casesHeaderRef} className="home-cases-header fade-up">
            <span className="home-section-tag">{t("home.cases.tag")}</span>
            <h2 className="home-section-title">
              {t("home.cases.title")}
              <span className="home-section-highlight">
                {t("home.cases.titleHighlight")}
              </span>
            </h2>
            <p className="home-section-description">
              {t("home.cases.description")}
            </p>
          </div>

          <div className="home-cases-grid">
            {/* Case Study 1 */}
            <div
              ref={(el) => (casesCardsRef.current[0] = el)}
              className="home-case-card fade-up"
            >
              <div className="home-case-header">
                <div className="home-case-info">
                  <h3 className="home-case-title">
                    {t("home.cases.case1.title")}
                  </h3>
                  <p className="home-case-industry">
                    {t("home.cases.case1.industry")}
                  </p>
                </div>
              </div>

              <div className="home-case-comparison">
                <div className="home-case-before">
                  <span className="home-case-label">
                    {t("home.cases.case1.before.label")}
                  </span>
                  <ul className="home-case-list">
                    {(t("home.cases.case1.before.items") || []).map(
                      (item, idx) => (
                        <li key={idx}>{item}</li>
                      )
                    )}
                  </ul>
                </div>

                <div className="home-case-after">
                  <span className="home-case-label">
                    {t("home.cases.case1.after.label")}
                  </span>
                  <ul className="home-case-list">
                    {(t("home.cases.case1.after.items") || []).map(
                      (item, idx) => (
                        <li key={idx}>{item}</li>
                      )
                    )}
                  </ul>
                </div>
              </div>

              <div className="home-case-footer">
                <blockquote className="home-case-quote">
                  {t("home.cases.case1.quote")}
                </blockquote>
                <p className="home-case-author">
                  {t("home.cases.case1.author")}
                </p>
              </div>
            </div>

            {/* Case Study 2 */}
            <div
              ref={(el) => (casesCardsRef.current[1] = el)}
              className="home-case-card fade-up"
            >
              <div className="home-case-header">
                <div className="home-case-info">
                  <h3 className="home-case-title">
                    {t("home.cases.case2.title")}
                  </h3>
                  <p className="home-case-industry">
                    {t("home.cases.case2.industry")}
                  </p>
                </div>
              </div>

              <div className="home-case-comparison">
                <div className="home-case-before">
                  <span className="home-case-label">
                    {t("home.cases.case2.before.label")}
                  </span>
                  <ul className="home-case-list">
                    {(t("home.cases.case2.before.items") || []).map(
                      (item, idx) => (
                        <li key={idx}>{item}</li>
                      )
                    )}
                  </ul>
                </div>

                <div className="home-case-after">
                  <span className="home-case-label">
                    {t("home.cases.case2.after.label")}
                  </span>
                  <ul className="home-case-list">
                    {(t("home.cases.case2.after.items") || []).map(
                      (item, idx) => (
                        <li key={idx}>{item}</li>
                      )
                    )}
                  </ul>
                </div>
              </div>

              <div className="home-case-footer">
                <blockquote className="home-case-quote">
                  {t("home.cases.case2.quote")}
                </blockquote>
                <p className="home-case-author">
                  {t("home.cases.case2.author")}
                </p>
              </div>
            </div>
          </div>

          <div ref={casesCtaRef} className="home-cases-cta scale-in">
            <p className="home-cases-cta-text">{t("home.cases.cta.text")}</p>
            <button
              className="home-cases-cta-button"
              onClick={() => handleNavigation("/contact")}
            >
              {t("home.cases.cta.button")}
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
