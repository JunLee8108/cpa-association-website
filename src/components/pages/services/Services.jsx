import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router";
import {
  Building2,
  Calculator,
  BookOpen,
  TrendingUp,
  Users,
  Monitor,
  Shield,
  FileText,
  Globe,
  Briefcase,
  Award,
  CheckCircle,
  ArrowRight,
  Clock,
  DollarSign,
  ChevronRight,
} from "lucide-react";
import "./Services.css";

const Services = () => {
  const navigate = useNavigate();

  // Animation refs
  const heroContentRef = useRef(null);
  const servicesGridRef = useRef([]);
  const featuresRef = useRef(null);
  const processRef = useRef(null);
  const pricingRef = useRef([]);
  const ctaRef = useRef(null);

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

    // Observe hero
    if (heroContentRef.current) {
      observer.observe(heroContentRef.current);
    }

    // Observe service cards
    servicesGridRef.current.forEach((card, index) => {
      if (card) {
        card.style.animationDelay = `${index * 0.1}s`;
        observer.observe(card);
      }
    });

    // Observe features
    if (featuresRef.current) {
      observer.observe(featuresRef.current);
    }

    // Observe process
    if (processRef.current) {
      observer.observe(processRef.current);
    }

    // Observe pricing cards
    pricingRef.current.forEach((card, index) => {
      if (card) {
        card.style.animationDelay = `${index * 0.15}s`;
        observer.observe(card);
      }
    });

    // Observe CTA
    if (ctaRef.current) {
      observer.observe(ctaRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  const services = [
    {
      title: "법인 설립 및 운영",
      subtitle: "Business Formation & Operations",
      description:
        "비즈니스 목적에 맞는 최적의 법인 형태 선택부터 설립, 운영까지 전 과정을 지원합니다.",
      features: [
        "LLC, C-Corp, S-Corp 설립 컨설팅",
        "EIN 및 비즈니스 라이센스 취득",
        "법인 정관 및 운영계약서 작성",
        "Annual Report 및 법인 유지 관리",
      ],
      highlight: true,
    },
    {
      title: "세무 신고 및 전략",
      subtitle: "Tax Planning & Compliance",
      description:
        "연방세, 주세, 판매세 등 복잡한 미국 세무 체계를 완벽히 이해하고 최적의 절세 전략을 수립합니다.",
      features: [
        "법인세 및 개인소득세 신고",
        "연방세, 주세, 판매세 관리",
        "세무 조사 대응 및 IRS 협상",
        "국제 조세 및 이전가격 컨설팅",
      ],
    },
    {
      title: "회계 및 재무 관리",
      subtitle: "Accounting & Financial Management",
      description:
        "GAAP 기준에 따른 정확한 재무제표 작성과 체계적인 회계 관리로 투명한 재무 운영을 지원합니다.",
      features: [
        "월별/분기별 재무제표 작성",
        "Bookkeeping 및 장부 정리",
        "재무 감사 및 Review 서비스",
        "Cash Flow 관리 및 예측",
      ],
    },
    {
      title: "비즈니스 컨설팅",
      subtitle: "Business Consulting",
      description:
        "미국 시장 진출 전략 수립부터 현지화, 성장 전략까지 단계별 맞춤 컨설팅을 제공합니다.",
      features: [
        "시장 진출 전략 수립",
        "M&A 및 투자 자문",
        "비즈니스 프로세스 최적화",
        "리스크 관리 및 내부통제",
      ],
    },
    {
      title: "HR 및 급여 관리",
      subtitle: "HR & Payroll Management",
      description:
        "미국 노동법 준수와 체계적인 인사 관리로 안정적인 조직 운영과 성장을 지원합니다.",
      features: [
        "HR 정책 수립 및 Employee Handbook",
        "Payroll 처리 및 시스템 운영",
        "401(k) 및 복리후생 설계",
        "Worker's Comp 및 보험 관리",
      ],
    },
    {
      title: "IT 솔루션 구축",
      subtitle: "IT Solutions & Integration",
      description:
        "효율적인 비즈니스 운영을 위한 핵심 시스템 도입과 최적화를 통해 업무 생산성을 극대화합니다.",
      features: [
        "Microsoft 365 라이센스 공급 및 관리",
        "CRM 시스템 구축",
        "ERP 시스템 컨설팅",
        "업무 프로세스 자동화",
      ],
    },
  ];

  const pricingPlans = [
    {
      name: "Startup",
      description: "스타트업 및 소규모 비즈니스",
      price: "$500",
      period: "/월부터",
      features: [
        "법인 설립 지원",
        "기본 세무 신고",
        "월별 장부 정리",
        "이메일 지원",
        "분기별 리뷰",
      ],
      cta: "시작하기",
      popular: false,
    },
    {
      name: "Growth",
      description: "성장 단계 기업",
      price: "$1,500",
      period: "/월부터",
      features: [
        "Startup 플랜 모든 혜택",
        "세무 전략 컨설팅",
        "재무제표 작성",
        "HR 지원 서비스",
        "우선 지원",
        "월별 리뷰 미팅",
      ],
      cta: "문의하기",
      popular: true,
    },
    {
      name: "Enterprise",
      description: "대규모 기업",
      price: "맞춤 견적",
      period: "",
      features: [
        "Growth 플랜 모든 혜택",
        "전담 매니저 배정",
        "M&A 자문",
        "국제 조세 컨설팅",
        "24/7 지원",
        "맞춤형 솔루션",
      ],
      cta: "문의하기",
      popular: false,
    },
  ];

  return (
    <div className="service-page">
      {/* Hero Section */}
      <section className="service-hero">
        <div className="service-hero-bg"></div>
        <div className="container">
          <div ref={heroContentRef} className="service-hero-content fade-up">
            <h1 className="service-hero-title">원스톱 토탈 솔루션</h1>
            <p className="service-hero-description">
              법인 설립부터 세무, 회계, HR, IT 솔루션까지
              <br />각 분야 전문가가 통합 솔루션으로 지원합니다.
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid Section */}
      <section className="service-main">
        <div className="container">
          <div className="service-main-header">
            <span className="service-section-tag">Our Services</span>
            <h2 className="service-section-title">
              전문 분야별
              <span className="service-section-highlight">
                통합 서비스 제공
              </span>
            </h2>
            <p className="service-section-description">
              각 분야의 전문가들이 유기적으로 협력하여 귀사의 미국 비즈니스를
              완벽하게 지원합니다
            </p>
          </div>

          <div className="service-grid">
            {services.map((service, index) => (
              <div
                key={index}
                ref={(el) => (servicesGridRef.current[index] = el)}
                className={`service-card fade-up ${
                  service.highlight ? "highlight" : ""
                }`}
              >
                <div className="service-card-header">
                  <div className="service-card-badge">
                    {service.highlight ? "Most Popular" : `0${index + 1}`}
                  </div>
                </div>
                <h3 className="service-card-title">{service.title}</h3>
                <p className="service-card-subtitle">{service.subtitle}</p>
                <p className="service-card-description">
                  {service.description}
                </p>
                <ul className="service-card-features">
                  {service.features.map((feature, idx) => (
                    <li key={idx}>
                      <CheckCircle size={16} />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <button
                  className="service-card-cta"
                  onClick={() => navigate("/contact")}
                >
                  <span>자세히 알아보기</span>
                  <ArrowRight size={18} />
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="service-features">
        <div className="container">
          <div ref={featuresRef} className="service-features-content fade-up">
            <div className="service-features-left">
              <span className="service-section-tag">Why Choose Us</span>
              <h2 className="service-features-title">
                왜 우리를 선택해야 할까요?
              </h2>
              <p className="service-features-description">
                15년 이상의 경험과 전문성과 각 분야 전문가가 제공하는 맞춤 토탈
                솔루션으로 한국 기업의 성공적인 미국 진출을 보장합니다.
              </p>

              <div className="service-features-grid">
                <div className="service-feature-item">
                  <div className="service-feature-icon">
                    <Shield size={24} />
                  </div>
                  <div className="service-feature-content">
                    <h4>법률 준수</h4>
                    <p>미국 법률 및 규정을 완벽 준수하여 리스크 제로</p>
                  </div>
                </div>

                <div className="service-feature-item">
                  <div className="service-feature-icon">
                    <Clock size={24} />
                  </div>
                  <div className="service-feature-content">
                    <h4>빠른 응답</h4>
                    <p>어떠한 상황이 발생해도 즉각 대응 가능한 시스템</p>
                  </div>
                </div>

                <div className="service-feature-item">
                  <div className="service-feature-icon">
                    <Globe size={24} />
                  </div>
                  <div className="service-feature-content">
                    <h4>글로벌 네트워크</h4>
                    <p>미국 전역 6개 주요 도시 전문가 네트워크</p>
                  </div>
                </div>

                <div className="service-feature-item">
                  <div className="service-feature-icon">
                    <Award size={24} />
                  </div>
                  <div className="service-feature-content">
                    <h4>검증된 전문성</h4>
                    <p>다수의 CPA 보유, 500+ 성공 사례</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="service-features-right">
              <div className="service-features-image">
                <img src="/service-1.jpg" alt="전문 서비스" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="service-process">
        <div className="container">
          <div ref={processRef} className="service-process-content fade-up">
            <div className="service-process-header">
              <span className="service-section-tag">Our Process</span>
              <h2 className="service-section-title">
                체계적인 서비스 프로세스
              </h2>
            </div>

            <div className="service-process-timeline">
              <div className="service-process-item">
                <div className="service-process-icon">
                  <FileText size={40} />
                </div>
                <h4>초기 상담</h4>
                <p>비즈니스 현황 파악 및 니즈 분석</p>
              </div>

              <div className="service-process-arrow">
                <ChevronRight size={44} />
              </div>

              <div className="service-process-item">
                <div className="service-process-icon">
                  <Briefcase size={40} />
                </div>
                <h4>전략 수립</h4>
                <p>맞춤형 솔루션 설계 및 제안</p>
              </div>

              <div className="service-process-arrow">
                <ChevronRight size={40} />
              </div>

              <div className="service-process-item">
                <div className="service-process-icon">
                  <TrendingUp size={44} />
                </div>
                <h4>실행 및 관리</h4>
                <p>단계별 실행 및 지속적 모니터링</p>
              </div>

              <div className="service-process-arrow">
                <ChevronRight size={40} />
              </div>

              <div className="service-process-item">
                <div className="service-process-icon">
                  <Award size={44} />
                </div>
                <h4>성과 달성</h4>
                <p>목표 달성 및 지속 성장 지원</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="service-pricing">
        <div className="container">
          <div className="service-pricing-header">
            <span className="service-section-tag">Pricing Plans</span>
            <h2 className="service-section-title">
              비즈니스 규모에 맞는
              <span className="service-section-highlight">합리적인 요금제</span>
            </h2>
            <p className="service-section-description">
              투명하고 합리적인 가격으로 최고의 서비스를 제공합니다
            </p>
          </div>

          <div className="service-pricing-grid">
            {pricingPlans.map((plan, index) => (
              <div
                key={index}
                ref={(el) => (pricingRef.current[index] = el)}
                className={`service-pricing-card fade-up ${
                  plan.popular ? "popular" : ""
                }`}
              >
                {plan.popular && (
                  <div className="pricing-badge">Most Popular</div>
                )}
                <div className="pricing-header">
                  <h3 className="pricing-name">{plan.name}</h3>
                  <p className="pricing-description">{plan.description}</p>
                  <div className="pricing-price">
                    <span className="price-amount">{plan.price}</span>
                    <span className="price-period">{plan.period}</span>
                  </div>
                </div>
                <ul className="pricing-features">
                  {plan.features.map((feature, idx) => (
                    <li key={idx}>
                      <CheckCircle size={16} />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <button
                  className={`pricing-cta ${plan.popular ? "primary" : ""}`}
                  onClick={() => navigate("/contact")}
                >
                  {plan.cta}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="service-cta">
        <div className="container">
          <div ref={ctaRef} className="service-cta-content scale-in">
            <h2 className="service-cta-title">지금 바로 전문가와 상담하세요</h2>
            <p className="service-cta-description">
              귀사의 성공적인 미국 진출을 위한 첫 걸음,
              <br />
              무료 상담으로 시작하세요
            </p>
            <div className="service-cta-buttons">
              <button
                className="service-cta-secondary"
                onClick={() => navigate("/contact")}
              >
                <FileText size={20} />
                상담 신청하기
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Services;
