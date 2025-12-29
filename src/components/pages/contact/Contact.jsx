import React, { useState, useEffect, useRef } from "react";
import { Send, CheckCircle, MapPin } from "lucide-react";
import useTranslation from "../../hooks/useTranslation";
import "./Contact.css";

const Contact = () => {
  const { t, currentLanguage } = useTranslation();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    residency: "",
    location: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const heroContentRef = useRef(null);
  const formSectionRef = useRef(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitSuccess(true);

      setTimeout(() => {
        setSubmitSuccess(false);
        setFormData({
          name: "",
          email: "",
          phone: "",
          residency: "",
          location: "",
          message: "",
        });
      }, 3000);
    }, 2000);
  };

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

    if (heroContentRef.current) observer.observe(heroContentRef.current);
    if (formSectionRef.current) observer.observe(formSectionRef.current);

    return () => observer.disconnect();
  }, []);

  const locations = [
    { value: "nc", labelKey: "nc" },
    { value: "ny-nj", labelKey: "ny-nj" },
    { value: "seattle", labelKey: "seattle" },
    { value: "ca", labelKey: "ca" },
    { value: "tx", labelKey: "tx" },
    { value: "philadelphia", labelKey: "philadelphia" },
    { value: "other", labelKey: "other" },
  ];

  const serviceLocations = [
    {
      key: "nc",
      label: currentLanguage === "ko" ? "노스캐롤라이나" : "North Carolina",
    },
    {
      key: "ny",
      label:
        currentLanguage === "ko" ? "뉴욕 / 뉴저지" : "New York / New Jersey",
    },
    { key: "seattle", label: currentLanguage === "ko" ? "시애틀" : "Seattle" },
    {
      key: "ca",
      label: currentLanguage === "ko" ? "캘리포니아" : "California",
    },
    { key: "tx", label: currentLanguage === "ko" ? "텍사스" : "Texas" },
    {
      key: "philadelphia",
      label: currentLanguage === "ko" ? "필라델피아" : "Philadelphia",
    },
  ];

  return (
    <div className="contact-page">
      {/* Hero Section */}
      <section className="contact-hero-section">
        <div className="contact-hero-bg"></div>
        <div className="container">
          <div ref={heroContentRef} className="contact-hero-content fade-up">
            <h1 className="contact-hero-heading">{t("contact.hero.title")}</h1>
            <p className="contact-hero-subheading">
              {t("contact.hero.subtitle")}
            </p>
          </div>
        </div>
      </section>

      {/* Form Section */}
      <section
        className="contact-form-section fade-up"
        ref={formSectionRef}
        style={{ animationDelay: "0.2s" }}
      >
        <div className="container">
          <div className="contact-content">
            <div className="contact-form-wrapper">
              <div className="contact-form-inner">
                <div className="form-header">
                  <h2 className="form-title">{t("contact.form.title")}</h2>
                  <p className="form-description">
                    {t("contact.form.description")}
                  </p>
                  <p className="form-description">
                    {t("contact.form.responseTime")}
                  </p>
                </div>

                <form className="contact-form" onSubmit={handleSubmit}>
                  {/* Personal Information */}
                  <div className="form-section">
                    <div className="form-row">
                      <div className="form-field">
                        <label className="form-label">
                          {t("contact.form.fields.name")}{" "}
                          <span className="required">*</span>
                        </label>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          className="form-input"
                          placeholder={
                            currentLanguage === "ko" ? "홍길동" : "John Doe"
                          }
                          required
                        />
                      </div>

                      <div className="form-field">
                        <label className="form-label">
                          {t("contact.form.fields.email")}{" "}
                          <span className="required">*</span>
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          className="form-input"
                          placeholder="example@company.com"
                          required
                        />
                      </div>
                    </div>

                    <div className="form-row">
                      <div className="form-field">
                        <label className="form-label">
                          {t("contact.form.fields.phone")}{" "}
                          <span className="required">*</span>
                        </label>
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          className="form-input"
                          placeholder="+1 (555) 000-0000"
                          required
                        />
                      </div>

                      <div className="form-field">
                        <label className="form-label">
                          {t("contact.form.fields.residency")}{" "}
                          <span className="required">*</span>
                        </label>
                        <div className="radio-button-group">
                          <button
                            type="button"
                            className={`radio-button ${
                              formData.residency === "us" ? "active" : ""
                            }`}
                            onClick={() =>
                              handleInputChange({
                                target: { name: "residency", value: "us" },
                              })
                            }
                          >
                            {t("contact.form.fields.residencyOptions.us")}
                          </button>
                          <button
                            type="button"
                            className={`radio-button ${
                              formData.residency === "overseas" ? "active" : ""
                            }`}
                            onClick={() =>
                              handleInputChange({
                                target: {
                                  name: "residency",
                                  value: "overseas",
                                },
                              })
                            }
                          >
                            {t("contact.form.fields.residencyOptions.overseas")}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Service Location */}
                  <div className="form-section">
                    <div className="form-field">
                      <label className="form-label">
                        {t("contact.form.fields.location")}{" "}
                        <span className="required">*</span>
                      </label>
                      <div className="location-grid">
                        {locations.map((loc) => (
                          <button
                            key={loc.value}
                            type="button"
                            className={`location-button ${
                              formData.location === loc.value ? "active" : ""
                            }`}
                            onClick={() =>
                              handleInputChange({
                                target: { name: "location", value: loc.value },
                              })
                            }
                          >
                            {t(`contact.form.fields.locations.${loc.labelKey}`)}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Message */}
                  <div className="form-section">
                    <div className="form-field">
                      <label className="form-label">
                        {t("contact.form.fields.message")}{" "}
                        <span className="required">*</span>
                      </label>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        className="form-textarea"
                        rows="6"
                        placeholder={t(
                          "contact.form.fields.messagePlaceholder"
                        )}
                        required
                      ></textarea>
                    </div>
                  </div>

                  {/* Submit */}
                  <div className="form-actions">
                    <button
                      type="submit"
                      className={`submit-button ${
                        isSubmitting ? "submitting" : ""
                      } ${submitSuccess ? "success" : ""}`}
                      disabled={
                        isSubmitting ||
                        submitSuccess ||
                        !formData.residency ||
                        !formData.location
                      }
                    >
                      {submitSuccess ? (
                        <>
                          <CheckCircle size={20} />
                          <span>{t("contact.form.submit.success")}</span>
                        </>
                      ) : isSubmitting ? (
                        <>
                          <div className="button-spinner"></div>
                          <span>{t("contact.form.submit.submitting")}</span>
                        </>
                      ) : (
                        <>
                          <Send size={20} />
                          <span>{t("contact.form.submit.button")}</span>
                        </>
                      )}
                    </button>
                  </div>
                </form>
              </div>
            </div>

            {/* Side Info */}
            <div className="contact-info-wrapper">
              <div className="info-card">
                <h4>{t("contact.info.process.title")}</h4>
                <ol className="process-list">
                  {(t("contact.info.process.steps") || []).map((step, idx) => (
                    <li key={idx}>{step}</li>
                  ))}
                </ol>
              </div>

              <div className="info-card">
                <h4>{t("contact.info.services.title")}</h4>
                <ul className="service-list">
                  {(t("contact.info.services.items") || []).map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
              </div>

              <div className="info-card">
                <h4>{t("contact.info.locations.title")}</h4>
                <ul className="service-location-list">
                  {serviceLocations.map((loc) => (
                    <li key={loc.key}>
                      <MapPin /> {loc.label}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="info-card highlight">
                <h4 style={{ textAlign: "center" }}>
                  {t("contact.info.benefits.title")}
                </h4>
                <ul className="benefit-list">
                  <li>
                    <strong>{t("contact.info.benefits.yearsPlus")}</strong>{" "}
                    {t("contact.info.benefits.experience")}
                  </li>
                  <li>
                    <strong>{t("contact.info.benefits.count")}</strong>{" "}
                    {t("contact.info.benefits.cases")}
                  </li>
                  <li>
                    <strong>{t("contact.info.benefits.multiple")}</strong>{" "}
                    {t("contact.info.benefits.experts")}
                  </li>
                  <li>
                    <strong>{t("contact.info.benefits.hours")}</strong>{" "}
                    {t("contact.info.benefits.response")}
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
