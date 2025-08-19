import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router";
import { Menu, X, ChevronDown, Globe } from "lucide-react";
import "./Navbar.css";

// Name Changed
const Navbar = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);

  const lastScrollY = useRef(0);
  const scrollTimeout = useRef(null);
  const hideDelay = 250; // Delay before hiding navbar (ms)

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Add background when scrolled more than 50px
      setIsScrolled(currentScrollY > 50);

      // Show/hide logic with sensitivity control
      if (currentScrollY < lastScrollY.current) {
        // Scrolling up - show immediately
        setIsVisible(true);
        if (scrollTimeout.current) {
          clearTimeout(scrollTimeout.current);
        }
      } else if (currentScrollY > lastScrollY.current && currentScrollY > 100) {
        // Scrolling down - hide with delay
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

  // Prevent body scroll when mobile menu is open
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

  const navItems = [
    {
      label: "회사소개",
      href: "#about",
      dropdown: [
        { label: "전문가 소개", href: "#team", path: "" },
        { label: "우리의 가치", href: "#values", path: "" },
        { label: "연혁", href: "#history", path: "" },
      ],
    },
    {
      label: "서비스",
      href: "",
      path: "/services",
      dropdown: [
        { label: "법인 설립", href: "#incorporation", path: "" },
        { label: "세무 신고", href: "#audit", path: "" },
        { label: "회계 & 재무 관리", href: "#cfo", path: "" },
        { label: "비즈니스 컨설팅", href: "#payroll", path: "" },
        { label: "HR 및 급여 관리", href: "#payroll", path: "" },
        { label: "IT 솔루션", href: "#payroll", path: "" },
      ],
    },
    { label: "프로세스", href: "#process", path: "" },
    { label: "성공사례", href: "#cases", path: "" },
    { label: "문의하기", href: "#contact", isButton: true, path: "/contact" },
  ];

  const handleMobileMenuToggle = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleNavigation = (path) => {
    // 이미 같은 경로에 있으면 무시
    if (pathname === path) return;

    navigate(path);
  };

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
            <span className="navbar-logo-text">CPA</span>
            <span className="navbar-logo-accent">Group</span>
          </div>
        </div>

        {/* Desktop Navigation */}
        <div className="navbar-desktop">
          <ul className="navbar-menu">
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
                      onClick={() => handleNavigation(item.path)}
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
                            href={dropItem.href}
                            className="navbar-dropdown-item"
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
                          href={dropItem.href}
                          className="navbar-mobile-dropdown-item"
                          onClick={() => {
                            setIsMobileMenuOpen(false);
                            handleNavigation(item.path);
                          }}
                        >
                          {dropItem.label}
                        </a>
                      ))}
                    </div>
                  </div>
                ) : item.isButton ? (
                  <a
                    href={item.href}
                    className="navbar-mobile-cta"
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      handleNavigation(item.path);
                    }}
                  >
                    {item.label}
                  </a>
                ) : (
                  <a
                    href={item.href}
                    className="navbar-mobile-link"
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      handleNavigation(item.path);
                    }}
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
