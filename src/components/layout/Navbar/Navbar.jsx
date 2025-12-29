import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router";
import { Menu, X, ChevronDown, Globe } from "lucide-react";
import useLanguageStore from "../../stores/useLanguageStore";
import useTranslation from "../../hooks/useTranslation";
import "./Navbar.css";

const Navbar = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const { t, currentLanguage } = useTranslation();
  const { getCurrentLanguageInfo } = useLanguageStore();

  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [isLanguageOpen, setIsLanguageOpen] = useState(false);

  const lastScrollY = useRef(0);
  const scrollTimeout = useRef(null);
  const languageDropdownRef = useRef(null);
  const hideDelay = 250;

  useEffect(() => {
    const { initializeLanguage } = useLanguageStore.getState();
    initializeLanguage();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsScrolled(currentScrollY > 50);

      if (currentScrollY < lastScrollY.current) {
        setIsVisible(true);
        if (scrollTimeout.current) {
          clearTimeout(scrollTimeout.current);
        }
      } else if (currentScrollY > lastScrollY.current && currentScrollY > 100) {
        if (scrollTimeout.current) {
          clearTimeout(scrollTimeout.current);
        }
        scrollTimeout.current = setTimeout(() => {
          setIsVisible(false);
        }, hideDelay);
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (scrollTimeout.current) {
        clearTimeout(scrollTimeout.current);
      }
    };
  }, []);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMobileMenuOpen]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        languageDropdownRef.current &&
        !languageDropdownRef.current.contains(event.target)
      ) {
        setIsLanguageOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const navItems = [
    {
      label: t("nav.about"),
      href: "#about",
      dropdown: [
        { label: t("nav.dropdown.team"), path: "/team" },
        { label: t("nav.dropdown.values"), href: "#values" },
      ],
    },
    {
      label: t("nav.services"),
      path: "/services",
      dropdown: [
        { label: t("nav.dropdown.serviceOverview"), path: "/services" },
        {
          label: t("nav.dropdown.ADP"),
          href: "https://online.adp.com/signin/v1/?APPID=RUN&productId=80e309c3-70c3-bae1-e053-3505430b5495",
          external: true,
        },
        {
          label: t("nav.dropdown.Xero"),
          href: "https://www.xero.com/us/login",
          external: true,
        },
      ],
    },
    { label: t("nav.contact"), isButton: true, path: "/contact" },
  ];

  const handleMobileMenuToggle = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleNavigation = (path) => {
    setIsMobileMenuOpen(false);
    setActiveDropdown(null);
    if (pathname === path) return;
    navigate(path);
  };

  const handleDropdownClick = (dropItem, e) => {
    if (dropItem.external) {
      window.open(dropItem.href, "_blank", "noopener,noreferrer");
    } else if (dropItem.path) {
      e.preventDefault();
      handleNavigation(dropItem.path);
    }
  };

  const handleLanguageChange = (lang) => {
    const { setLanguage } = useLanguageStore.getState();
    setLanguage(lang);
    setIsLanguageOpen(false);
  };

  const currentLanguageInfo = getCurrentLanguageInfo();

  return (
    <nav
      className={`navbar ${isScrolled ? "navbar-scrolled" : ""} ${
        isVisible ? "navbar-visible" : "navbar-hidden"
      }`}
    >
      <div className="navbar-container">
        {/* Logo */}
        <div className="navbar-logo">
          <div
            onClick={() => handleNavigation("/")}
            className="navbar-logo-link"
          >
            <span className="navbar-logo-text">CHKby</span>
            <span className="navbar-logo-accent">Advisory</span>
          </div>
        </div>

        {/* Desktop Navigation */}
        <div className="navbar-desktop">
          <ul className="navbar-menu">
            {/* Language Selector */}
            <li
              className="navbar-menu-item language-selector-wrapper"
              ref={languageDropdownRef}
            >
              <button
                className="navbar-language-button"
                onClick={() => setIsLanguageOpen(!isLanguageOpen)}
                aria-label="Change language"
              >
                <Globe size={18} />
                <span>{currentLanguageInfo?.shortLabel}</span>
                <ChevronDown
                  size={14}
                  className={`navbar-language-icon ${
                    isLanguageOpen ? "active" : ""
                  }`}
                />
              </button>

              <div
                className={`navbar-language-dropdown ${
                  isLanguageOpen ? "active" : ""
                }`}
              >
                <button
                  className={`navbar-language-option ${
                    currentLanguage === "ko" ? "active" : ""
                  }`}
                  onClick={() => handleLanguageChange("ko")}
                >
                  <span className="language-flag">🇰🇷</span>
                  <span>한국어</span>
                </button>
                <button
                  className={`navbar-language-option ${
                    currentLanguage === "en" ? "active" : ""
                  }`}
                  onClick={() => handleLanguageChange("en")}
                >
                  <span className="language-flag">🇺🇸</span>
                  <span>English</span>
                </button>
              </div>
            </li>

            {navItems.map((item, index) => (
              <li
                key={index}
                className={`navbar-menu-item ${
                  item.dropdown ? "has-dropdown" : ""
                }`}
                onMouseEnter={() => item.dropdown && setActiveDropdown(index)}
                onMouseLeave={() => item.dropdown && setActiveDropdown(null)}
              >
                {item.isButton ? (
                  <a
                    onClick={() => handleNavigation(item.path)}
                    className="navbar-cta-button"
                  >
                    {item.label}
                  </a>
                ) : (
                  <>
                    <a
                      onClick={() => item.path && handleNavigation(item.path)}
                      className="navbar-menu-link"
                    >
                      {item.label}
                      {item.dropdown && (
                        <ChevronDown
                          size={16}
                          className={`navbar-dropdown-icon ${
                            activeDropdown === index ? "active" : ""
                          }`}
                        />
                      )}
                    </a>
                    {item.dropdown && (
                      <div
                        className={`navbar-dropdown ${
                          activeDropdown === index ? "active" : ""
                        }`}
                      >
                        {item.dropdown.map((dropItem, dropIndex) => (
                          <a
                            key={dropIndex}
                            href={dropItem.href || "#"}
                            className="navbar-dropdown-item"
                            onClick={(e) => handleDropdownClick(dropItem, e)}
                          >
                            {dropItem.label}
                          </a>
                        ))}
                      </div>
                    )}
                  </>
                )}
              </li>
            ))}
          </ul>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="navbar-menu-toggle"
          onClick={handleMobileMenuToggle}
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      <div className={`navbar-mobile-menu ${isMobileMenuOpen ? "active" : ""}`}>
        <div className="navbar-mobile-content">
          {/* Mobile Language Selector */}
          <div className="navbar-mobile-language">
            <div className="navbar-mobile-language-header">
              <Globe size={20} />
              <span>{currentLanguage === "ko" ? "언어 선택" : "Language"}</span>
            </div>
            <div className="navbar-mobile-language-buttons">
              <button
                className={`navbar-mobile-language-btn ${
                  currentLanguage === "ko" ? "active" : ""
                }`}
                onClick={() => handleLanguageChange("ko")}
              >
                한국어
              </button>
              <button
                className={`navbar-mobile-language-btn ${
                  currentLanguage === "en" ? "active" : ""
                }`}
                onClick={() => handleLanguageChange("en")}
              >
                English
              </button>
            </div>
          </div>

          {/* Mobile Menu Items */}
          <ul className="navbar-mobile-nav">
            {navItems.map((item, index) => (
              <li key={index} className="navbar-mobile-item">
                {item.dropdown ? (
                  <div className="navbar-mobile-dropdown">
                    <button
                      className="navbar-mobile-dropdown-toggle"
                      onClick={() =>
                        setActiveDropdown(
                          activeDropdown === index ? null : index
                        )
                      }
                    >
                      {item.label}
                      <ChevronDown
                        size={18}
                        className={`navbar-mobile-dropdown-icon ${
                          activeDropdown === index ? "active" : ""
                        }`}
                      />
                    </button>
                    <div
                      className={`navbar-mobile-dropdown-content ${
                        activeDropdown === index ? "active" : ""
                      }`}
                    >
                      {item.dropdown.map((dropItem, dropIndex) => (
                        <a
                          key={dropIndex}
                          href={dropItem.href || "#"}
                          className="navbar-mobile-dropdown-item"
                          onClick={(e) => handleDropdownClick(dropItem, e)}
                        >
                          {dropItem.label}
                        </a>
                      ))}
                    </div>
                  </div>
                ) : item.isButton ? (
                  <a
                    className="navbar-mobile-cta"
                    onClick={() => handleNavigation(item.path)}
                  >
                    {item.label}
                  </a>
                ) : (
                  <a
                    href={item.href}
                    className="navbar-mobile-link"
                    onClick={() => handleNavigation(item.path)}
                  >
                    {item.label}
                  </a>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
