import React from "react";
import { useNavigate, useLocation } from "react-router";
import { Phone, Mail, ChevronRight } from "lucide-react";
import "./Footer.css";

const Footer = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const currentYear = new Date().getFullYear();

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
                <h3 className="footer-logo-text">CHKBY Advisory</h3>
                <span className="footer-logo-tagline">한인 CPA 전문 그룹</span>
              </div>
              <p className="footer-description">
                15년 이상의 전문 경험으로 한국 기업의 성공적인 미국 진출을
                지원하는 믿을 수 있는 파트너입니다.
              </p>
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
              <h4 className="footer-title">주요 서비스</h4>
              <ul className="footer-links">
                <li>
                  <a href="#" className="footer-link">
                    <ChevronRight size={14} />
                    <span>법인 설립 및 운영</span>
                  </a>
                </li>
                <li>
                  <a href="#" className="footer-link">
                    <ChevronRight size={14} />
                    <span>세무 신고 및 전략</span>
                  </a>
                </li>
                <li>
                  <a href="#" className="footer-link">
                    <ChevronRight size={14} />
                    <span>회계 및 재무 관리</span>
                  </a>
                </li>
                <li>
                  <a href="#" className="footer-link">
                    <ChevronRight size={14} />
                    <span>비즈니스 컨설팅</span>
                  </a>
                </li>
                <li>
                  <a href="#" className="footer-link">
                    <ChevronRight size={14} />
                    <span>IT 솔루션</span>
                  </a>
                </li>
              </ul>
            </div>

            {/* Quick Links */}
            <div className="footer-section">
              <h4 className="footer-title">빠른 링크</h4>
              <ul className="footer-links">
                <li>
                  <a href="#" className="footer-link">
                    <ChevronRight size={14} />
                    <span>회사 소개</span>
                  </a>
                </li>
                <li>
                  <span
                    onClick={() => handleNavigation("/services")}
                    className="footer-link"
                  >
                    <ChevronRight size={14} />
                    <span>서비스 개요</span>
                  </span>
                </li>
                <li>
                  <a href="#" className="footer-link">
                    <ChevronRight size={14} />
                    <span>프로세스</span>
                  </a>
                </li>
                <li>
                  <a href="#" className="footer-link">
                    <ChevronRight size={14} />
                    <span>성공사례</span>
                  </a>
                </li>
                <li>
                  <span
                    onClick={() => handleNavigation("/contact")}
                    className="footer-link"
                  >
                    <ChevronRight size={14} />
                    <span>문의하기</span>
                  </span>
                </li>
              </ul>
            </div>

            {/* Contact Info */}
            <div className="footer-section">
              <h4 className="footer-title">연락처 정보</h4>
              <div className="footer-contact">
                <div className="footer-contact-item">
                  <Phone size={18} />
                  <div>
                    <p className="footer-contact-title">전화</p>
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
                    <p className="footer-contact-title">이메일</p>
                    <p className="footer-contact-text">
                      info@cpagroupusa.com
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
                <h3>미국 비즈니스 인사이트를 받아보세요</h3>
                <p>최신 세무 정보와 비즈니스 팁을 이메일로 전달해드립니다.</p>
              </div>
              <form className="footer-newsletter-form">
                <input
                  type="email"
                  placeholder="이메일 주소를 입력하세요"
                  className="footer-newsletter-input"
                />
                <button type="submit" className="footer-newsletter-button">
                  구독하기
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
              <p>© {currentYear} CHKBY Advisory PLLC. All rights reserved.</p>
              <div className="footer-legal">
                <a href="#">개인정보처리방침</a>
                <span className="footer-divider">|</span>
                <a href="#">이용약관</a>
                <span className="footer-divider">|</span>
                <a href="#">쿠키 정책</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
