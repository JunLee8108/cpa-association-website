import React from "react";
import { useNavigate, useLocation } from "react-router";
import { Phone, Mail, ChevronRight } from "lucide-react";
import useTranslation from "../../hooks/useTranslation";
import "./Footer.css";

const Footer = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const currentYear = new Date().getFullYear();

  // 다국어 훅 사용
  const { t } = useTranslation();

  const handleNavigation = (path) => {
    // 이미 같은 경로에 있으면 무시
    if (pathname === path) return;
    navigate(path);
  };

  return (
    <footer className="footer">
      {/* Main Footer */}
      <div className="footer-main">
        <div className="container">
          <div className="footer-grid">
            {/* Company Info */}
            <div className="footer-section footer-company">
              <div className="footer-logo">
                <h3 className="footer-logo-text">
                  {t("common.companyNameFull")}
                </h3>
                <span className="footer-logo-tagline">
                  {t("common.tagline")}
                </span>
              </div>
              <p className="footer-description">{t("footer.description")}</p>
              <div className="footer-certifications">
                <div className="footer-badge">
                  <span>Licensed CPA</span>
                </div>
                <div className="footer-badge">
                  <span>IRS Authorized</span>
                </div>
              </div>
            </div>

            {/* Services */}
            <div className="footer-section">
              <h4 className="footer-title">{t("footer.mainServices")}</h4>
              <ul className="footer-links">
                <li>
                  <a href="#" className="footer-link">
                    <ChevronRight size={14} />
                    <span>{t("footer.servicesList.incorporation")}</span>
                  </a>
                </li>
                <li>
                  <a href="#" className="footer-link">
                    <ChevronRight size={14} />
                    <span>{t("footer.servicesList.tax")}</span>
                  </a>
                </li>
                <li>
                  <a href="#" className="footer-link">
                    <ChevronRight size={14} />
                    <span>{t("footer.servicesList.accounting")}</span>
                  </a>
                </li>
                <li>
                  <a href="#" className="footer-link">
                    <ChevronRight size={14} />
                    <span>{t("footer.servicesList.consulting")}</span>
                  </a>
                </li>
                <li>
                  <a href="#" className="footer-link">
                    <ChevronRight size={14} />
                    <span>{t("footer.servicesList.it")}</span>
                  </a>
                </li>
              </ul>
            </div>

            {/* Quick Links */}
            <div className="footer-section">
              <h4 className="footer-title">{t("footer.quickLinks")}</h4>
              <ul className="footer-links">
                <li>
                  <a href="#" className="footer-link">
                    <ChevronRight size={14} />
                    <span>{t("footer.aboutUs")}</span>
                  </a>
                </li>
                <li>
                  <span
                    onClick={() => handleNavigation("/services")}
                    className="footer-link"
                  >
                    <ChevronRight size={14} />
                    <span>{t("footer.servicesOverview")}</span>
                  </span>
                </li>
                <li>
                  <a href="#" className="footer-link">
                    <ChevronRight size={14} />
                    <span>{t("footer.process")}</span>
                  </a>
                </li>
                <li>
                  <span
                    onClick={() => handleNavigation("/contact")}
                    className="footer-link"
                  >
                    <ChevronRight size={14} />
                    <span>{t("footer.contactUs")}</span>
                  </span>
                </li>
              </ul>
            </div>

            {/* Contact Info */}
            <div className="footer-section">
              <h4 className="footer-title">{t("footer.contactInfo")}</h4>
              <div className="footer-contact">
                <div className="footer-contact-item">
                  <Phone size={18} />
                  <div>
                    <p className="footer-contact-title">{t("common.phone")}</p>
                    <p className="footer-contact-text">
                      +1 (123) 456-7890
                      <br />
                      +1 (123) 456-7890
                    </p>
                  </div>
                </div>
                <div className="footer-contact-item">
                  <Mail size={18} />
                  <div>
                    <p className="footer-contact-title">{t("common.email")}</p>
                    <p className="footer-contact-text">
                      admin@chkby.com
                      <br />
                      support@cpagroupusa.com
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Newsletter Section */}
          <div className="footer-newsletter">
            <div className="footer-newsletter-content">
              <div className="footer-newsletter-text">
                <h3>{t("footer.newsletter.title")}</h3>
                <p>{t("footer.newsletter.description")}</p>
              </div>
              <form className="footer-newsletter-form">
                <input
                  type="email"
                  placeholder={t("footer.newsletter.placeholder")}
                  className="footer-newsletter-input"
                />
                <button type="submit" className="footer-newsletter-button">
                  {t("footer.newsletter.button")}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="footer-bottom">
        <div className="container">
          <div className="footer-bottom-content">
            <div className="footer-copyright">
              <p>{t("footer.legal.copyright", { year: currentYear })}</p>
              <div className="footer-legal">
                <a href="#">{t("footer.legal.privacy")}</a>
                <span className="footer-divider">|</span>
                <a href="#">{t("footer.legal.terms")}</a>
                <span className="footer-divider">|</span>
                <a href="#">{t("footer.legal.cookies")}</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
