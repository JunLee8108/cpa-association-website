import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router";
import {
  Award,
  Building2,
  GraduationCap,
  FileText,
  MapPin,
  Shield,
  Package,
  Globe,
  CheckCircle,
} from "lucide-react";
import useTranslation from "../../hooks/useTranslation";
import "./Team.css";

const Team = () => {
  const navigate = useNavigate();
  const { currentLanguage } = useTranslation();

  const heroRef = useRef(null);
  const teamCardsRef = useRef([]);
  const whyChooseRef = useRef(null);
  const strengthCardsRef = useRef([]);
  const ctaRef = useRef(null);

  const teamMembers = [
    {
      id: 1,
      name: "Seong H. Kim, CPA",
      image: "/team-1.jpg",
      description:
        currentLanguage === "ko"
          ? "Seong은 2009년 11월 SHK Group, PLLC를 설립하여 다양한 산업의 고객들에게 회계 및 자문 서비스를 제공해 왔습니다. 비즈니스 컨설팅, 세무 신고 준비 및 세무 컴플라이언스 서비스를 전문으로 합니다."
          : "Seong founded SHK Group, PLLC in November 2009 and has since provided accounting and advisory services to clients across a wide range of industries. His areas of focus include business consulting, tax return preparation, and tax compliance services.",
      credentials: [
        { icon: Award, text: "AICPA Member" },
        { icon: Building2, text: "Washington Society of CPAs" },
        { icon: Award, text: "Tennessee State Board Licensed" },
      ],
      education: [
        { school: "Washington State University", location: "USA" },
        {
          school: currentLanguage === "ko" ? "서강대학교" : "Sogang University",
          location: currentLanguage === "ko" ? "한국" : "South Korea",
        },
      ],
    },
    {
      id: 2,
      name: "Chan H. Choi, CPA",
      image: "/team-2.jpg",
      description:
        currentLanguage === "ko"
          ? "Chan은 1989년 7월 CHC를 설립하여 다양한 산업의 고객들에게 서비스를 제공해 왔습니다. 다국적 고객을 위한 세무, 회계 및 세무 컴플라이언스 컨설팅 서비스를 전문으로 합니다. KASCPA(한미공인회계사회) 회장과 NY CPA 협회 임원을 역임했습니다."
          : "Chan founded CHC in July 1989 and has served clients from various industries. He specializes in consulting services in tax, accounting, and tax compliance services for multinational clients. He was a chairman of KASCPA (Korean American Society of CPAs) and NY CPA association.",
      credentials: [
        { icon: Award, text: "KASCPA Chairman" },
        { icon: Building2, text: "NY CPA Association" },
        { icon: Building2, text: "KPMG & PwC Alumni" },
      ],
      education: [
        {
          school:
            currentLanguage === "ko"
              ? "성균관대학교"
              : "Sungkyunkwan University",
          location: currentLanguage === "ko" ? "한국" : "South Korea",
        },
      ],
    },
    {
      id: 3,
      name: "Seung Min (Sean) Bae, CPA",
      image: "/team-3.jpg",
      description:
        currentLanguage === "ko"
          ? "Sean은 주요 기업들에게 회계, 세무 컨설팅 및 컴플라이언스 서비스를 제공합니다. 다양한 글로벌 아시아 기업들에 서비스를 제공해 왔으며, 고객 비즈니스와 관련된 복잡한 회계 및 세무 문제에 대한 풍부한 경험을 보유하고 있습니다."
          : "Sean provides accounting, tax consulting, and compliance services to major corporations. He has served a broad range of global Asian corporations. He has extensive experience with complex accounting and tax matters relating to his client's businesses.",
      credentials: [
        { icon: Building2, text: "Deloitte Anjin Alumni" },
        { icon: Award, text: "15 Years CFO Experience" },
      ],
      education: [
        { school: "Syracuse University MBA", location: "USA" },
        {
          school:
            currentLanguage === "ko"
              ? "성균관대학교"
              : "Sungkyunkwan University",
          location: currentLanguage === "ko" ? "한국" : "South Korea",
        },
      ],
    },
  ];

  const coverageAreas = [
    { name: currentLanguage === "ko" ? "노스캐롤라이나" : "North Carolina" },
    {
      name:
        currentLanguage === "ko" ? "뉴욕 • 뉴저지" : "New York • New Jersey",
    },
    { name: currentLanguage === "ko" ? "시애틀" : "Seattle" },
    { name: currentLanguage === "ko" ? "캘리포니아" : "California" },
    { name: currentLanguage === "ko" ? "텍사스" : "Texas" },
    { name: currentLanguage === "ko" ? "필라델피아" : "Philadelphia" },
  ];

  const strengths = [
    {
      icon: Shield,
      title: currentLanguage === "ko" ? "검증된 전문성" : "Proven Expertise",
      description:
        currentLanguage === "ko"
          ? "AICPA 멤버, Big4(KPMG, PwC, Deloitte) 출신, 다수의 공인회계사 보유"
          : "AICPA members, Big4 (KPMG, PwC, Deloitte) alumni, multiple licensed CPAs",
    },
    {
      icon: Package,
      title: currentLanguage === "ko" ? "원스톱 솔루션" : "One-Stop Solution",
      description:
        currentLanguage === "ko"
          ? "회계, 세무, HR, IT까지 모든 비즈니스 니즈를 한 곳에서 해결"
          : "All business needs from accounting, tax, HR to IT in one place",
    },
    {
      icon: Globe,
      title: currentLanguage === "ko" ? "글로벌 네트워크" : "Global Network",
      description:
        currentLanguage === "ko"
          ? "한국과 미국 양국의 비즈니스 환경을 이해하는 전문가 협력 체계"
          : "Expert collaboration understanding both Korean and U.S. business environments",
    },
  ];

  useEffect(() => {
    const observerOptions = { threshold: 0.1, rootMargin: "0px 0px -50px 0px" };

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

    if (heroRef.current) observer.observe(heroRef.current);
    if (whyChooseRef.current) observer.observe(whyChooseRef.current);
    if (ctaRef.current) observer.observe(ctaRef.current);

    teamCardsRef.current.forEach((card, index) => {
      if (card) {
        card.style.animationDelay = `${index * 0.15}s`;
        observer.observe(card);
      }
    });

    strengthCardsRef.current.forEach((card, index) => {
      if (card) {
        card.style.animationDelay = `${index * 0.1}s`;
        observer.observe(card);
      }
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="team-page">
      {/* Hero Section */}
      <section className="team-hero">
        <div className="team-hero-bg"></div>
        <div className="container">
          <div ref={heroRef} className="team-hero-content fade-up">
            <h1 className="team-hero-title">
              {currentLanguage === "ko" ? "전문가 소개" : "Our Team"}
            </h1>
            <p className="team-hero-description">
              {currentLanguage === "ko"
                ? "수십 년의 경험과 전문성을 갖춘 CPA들이 귀사의 성공적인 미국 비즈니스를 지원합니다."
                : "Our seasoned CPAs with decades of experience are here to support your successful U.S. business journey."}
            </p>
          </div>
        </div>
      </section>

      {/* Team Members Section */}
      <section className="team-members">
        <div className="container">
          <div className="team-grid">
            {teamMembers.map((member, index) => (
              <div
                key={member.id}
                ref={(el) => (teamCardsRef.current[index] = el)}
                className="team-card fade-up"
              >
                <div className="team-card-image-wrapper">
                  <div className="team-card-image-placeholder">
                    <span>
                      {member.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")
                        .slice(0, 2)}
                    </span>
                  </div>
                </div>
                <div className="team-card-content">
                  <div className="team-card-header">
                    <h3 className="team-card-name">{member.name}</h3>
                  </div>
                  <p className="team-card-description">{member.description}</p>
                  <div className="team-card-credentials">
                    <h4 className="team-card-section-title">
                      {currentLanguage === "ko"
                        ? "자격 및 경력"
                        : "Credentials"}
                    </h4>
                    <ul className="credentials-list">
                      {member.credentials.map((cred, idx) => (
                        <li key={idx}>
                          <cred.icon size={16} />
                          <span>{cred.text}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="team-card-education">
                    <h4 className="team-card-section-title">
                      {currentLanguage === "ko" ? "학력" : "Education"}
                    </h4>
                    <ul className="education-list">
                      {member.education.map((edu, idx) => (
                        <li key={idx}>
                          <GraduationCap size={16} />
                          <span>{edu.school}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Our Experts Section */}
      <section className="team-why-choose">
        <div className="container">
          <div ref={whyChooseRef} className="team-why-choose-header fade-up">
            <span className="team-section-tag">Why Choose Us</span>
            <h2 className="team-section-title">
              {currentLanguage === "ko"
                ? "미국 전역을 커버하는"
                : "Proven Network of"}
              <span className="team-section-highlight">
                {currentLanguage === "ko"
                  ? "검증된 전문가 그룹"
                  : "Experts Across the U.S"}
              </span>
            </h2>
            <p className="team-section-description">
              {currentLanguage === "ko"
                ? "단순한 회계 서비스가 아닙니다. 글로벌 회계법인 출신 전문가들의 노하우와 미국 현지 네트워크를 통해 귀사의 미국 비즈니스 성공을 설계합니다."
                : "More than just accounting services. We design your U.S. business success through the expertise of global firm alumni and our extensive local network across America."}
            </p>
          </div>

          {/* Coverage Area */}
          <div className="team-coverage">
            <div className="team-coverage-header">
              <MapPin size={20} />
              <span>
                {currentLanguage === "ko"
                  ? "서비스 커버리지"
                  : "Service Coverage"}
              </span>
            </div>
            <div className="team-coverage-grid">
              {coverageAreas.map((area, index) => (
                <div key={index} className="team-coverage-badge">
                  <CheckCircle size={16} />
                  <span>{area.name}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Strength Cards */}
          <div className="team-strengths-grid">
            {strengths.map((strength, index) => (
              <div
                key={index}
                ref={(el) => (strengthCardsRef.current[index] = el)}
                className="team-strength-card fade-up"
              >
                <div className="team-strength-icon">
                  <strength.icon size={28} />
                </div>
                <h3 className="team-strength-title">{strength.title}</h3>
                <p className="team-strength-description">
                  {strength.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="team-cta">
        <div className="container">
          <div ref={ctaRef} className="team-cta-content scale-in">
            <h2 className="team-cta-title">
              {currentLanguage === "ko"
                ? "지금 바로 전문가와 상담하세요"
                : "Consult with Experts Today"}
            </h2>
            <p className="team-cta-description">
              {currentLanguage === "ko" ? (
                <>
                  귀사의 성공적인 미국 진출을 위한 첫 걸음,
                  <br />
                  무료 상담으로 시작하세요
                </>
              ) : (
                <>
                  Take the first step toward successful U.S. expansion
                  <br />
                  with a free consultation
                </>
              )}
            </p>
            <div className="team-cta-buttons">
              <button
                className="team-cta-button"
                onClick={() => navigate("/contact")}
              >
                <FileText size={20} />
                {currentLanguage === "ko"
                  ? "상담 신청하기"
                  : "Schedule Consultation"}
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Team;
