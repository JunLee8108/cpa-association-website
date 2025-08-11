import React, { useEffect, useRef } from "react";
import {
  Clock,
  Package,
  Globe,
  Users,
  Award,
  HeadphonesIcon,
} from "lucide-react";
import "./Home.css";

const Home = () => {
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
  const casesHeaderRef = useRef(null);
  const casesCardsRef = useRef([]);
  const casesCtaRef = useRef(null);

  useEffect(() => {
    // Intersection Observer 설정
    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    };

    // 애니메이션 클래스 추가 함수
    const handleIntersection = (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate-in");
          // 한 번만 애니메이션 실행
          observer.unobserve(entry.target);
        }
      });
    };

    const observer = new IntersectionObserver(
      handleIntersection,
      observerOptions
    );

    // Hero 섹션 요소들 관찰
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

    // About 섹션 헤더 관찰
    if (sectionHeaderRef.current) {
      observer.observe(sectionHeaderRef.current);
    }

    // About 카드들 관찰 (스태거 애니메이션)
    aboutCardsRef.current.forEach((card, index) => {
      if (card) {
        card.style.animationDelay = `${index * 0.08}s`;
        observer.observe(card);
      }
    });

    // CTA 섹션 관찰
    if (ctaSectionRef.current) {
      observer.observe(ctaSectionRef.current);
    }

    if (servicesHeaderRef.current) {
      observer.observe(servicesHeaderRef.current);
    }

    // Services 카드들 관찰 (스태거 애니메이션)
    servicesCardsRef.current.forEach((card, index) => {
      if (card) {
        card.style.animationDelay = `${index * 0.1}s`;
        observer.observe(card);
      }
    });

    if (casesHeaderRef.current) {
      observer.observe(casesHeaderRef.current);
    }

    // Process 섹션 헤더 관찰
    if (processHeaderRef.current) {
      observer.observe(processHeaderRef.current);
    }

    // Process 스텝들 관찰 (스태거 애니메이션)
    processStepsRef.current.forEach((step, index) => {
      if (step) {
        step.style.animationDelay = `${index * 0.12}s`;
        observer.observe(step);
      }
    });

    // Case Studies 카드들 관찰 (스태거 애니메이션)
    casesCardsRef.current.forEach((card, index) => {
      if (card) {
        card.style.animationDelay = `${index * 0.15}s`;
        observer.observe(card);
      }
    });

    // Case Studies CTA 관찰
    if (casesCtaRef.current) {
      observer.observe(casesCtaRef.current);
    }

    // Cleanup
    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div className="home-container">
      {/* Hero Section */}
      <section className="home-hero">
        <div className="home-hero-background">
          <div className="home-hero-overlay"></div>
        </div>
        <div className="home-hero-content">
          <div className="container">
            <div className="home-hero-inner">
              <div className="home-hero-left">
                <div className="home-hero-text-wrapper">
                  <h1 ref={heroTitleRef} className="home-hero-title fade-up">
                    미국 진출의{" "}
                    <span className="home-hero-highlight">든든한 파트너</span>
                  </h1>
                  <p
                    ref={heroSubtitleRef}
                    className="home-hero-subtitle fade-up"
                  >
                    한국 회계사 6인이 함께하는 전문 CPA 그룹
                  </p>
                  <p
                    ref={heroDescriptionRef}
                    className="home-hero-description fade-up"
                  >
                    복잡한 미국 세무·회계 문제를 명확하게 해결해드립니다.
                    <br />
                    한국 기업의 성공적인 미국 시장 진출을 위한 맞춤형 솔루션을
                    제공합니다.
                  </p>
                  <div
                    ref={heroCtaRef}
                    className="home-hero-cta-wrapper fade-up"
                  >
                    <button className="home-hero-cta-secondary">
                      서비스 소개 보기
                    </button>
                    <button className="home-hero-cta-primary">
                      무료 상담 신청하기
                    </button>
                  </div>
                </div>
                {/* <div className="home-hero-stats">
                  <div className="home-hero-stat-item">
                    <span className="home-hero-stat-number">500+</span>
                    <span className="home-hero-stat-label">
                      성공적인 미국 진출 기업
                    </span>
                  </div>
                  <div className="home-hero-stat-divider"></div>
                  <div className="home-hero-stat-item">
                    <span className="home-hero-stat-number">15년</span>
                    <span className="home-hero-stat-label">누적 전문 경험</span>
                  </div>
                  <div className="home-hero-stat-divider"></div>
                  <div className="home-hero-stat-item">
                    <span className="home-hero-stat-number">6명</span>
                    <span className="home-hero-stat-label">
                      전문 CPA 회계사
                    </span>
                  </div>
                </div> */}
              </div>
              <div className="home-hero-right">
                <div className="home-hero-image-wrapper">
                  <img
                    src="/hero.png"
                    alt="미국 비즈니스 컨설팅"
                    className="home-hero-image"
                  />
                  <div className="home-hero-image-decoration"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Us Section */}
      <section className="home-about">
        <div className="container">
          <div ref={sectionHeaderRef} className="home-about-header fade-up">
            <span className="home-section-tag">About Us</span>
            <h2 className="home-section-title">
              한국 기업을 위한
              <br />
              <span className="home-section-highlight">
                미국 비즈니스 전문가 그룹
              </span>
            </h2>
            <p className="home-section-description">
              한국 기업의 특성을 깊이 이해하고, 미국 비즈니스 환경에 정통한
              저희가
              <br />
              여러분의 성공적인 미국 진출을 위한 최적의 파트너가
              되어드리겠습니다.
            </p>
            <p className="home-section-description-mobile">
              한국 기업의 특성을 깊이 이해하고, 미국 비즈니스 환경에 정통한
              저희가 여러분의 성공적인 미국 진출을 위한 최적의 파트너가
              되어드리겠습니다.
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
              <h3 className="home-about-card-title">15년 이상의 전문성</h3>
              <p className="home-about-card-description">
                미국 시장에서 15년 이상 축적된 경험과 노하우로 한국 기업의
                특성에 맞는 맞춤형 서비스를 제공합니다.
              </p>
            </div>

            <div
              ref={(el) => (aboutCardsRef.current[1] = el)}
              className="home-about-card fade-up"
            >
              <div className="home-about-card-icon">
                <Package size={32} strokeWidth={1.5} />
              </div>
              <h3 className="home-about-card-title">원스톱 솔루션</h3>
              <p className="home-about-card-description">
                회사 설립부터 세무 신고, 회계 감사, 컨설팅까지 미국 비즈니스에
                필요한 모든 서비스를 한 곳에서 해결합니다.
              </p>
            </div>

            <div
              ref={(el) => (aboutCardsRef.current[2] = el)}
              className="home-about-card fade-up"
            >
              <div className="home-about-card-icon">
                <Globe size={32} strokeWidth={1.5} />
              </div>
              <h3 className="home-about-card-title">글로벌 네트워크</h3>
              <p className="home-about-card-description">
                뉴욕, LA, 실리콘밸리 등 미국 주요 도시의 전문가 네트워크를 통해
                현지 맞춤형 지원을 제공합니다.
              </p>
            </div>
          </div>

          <div ref={ctaSectionRef} className="home-about-cta scale-in">
            <h3 className="home-about-cta-title">
              지금 바로 미국 진출의 첫걸음을 시작하세요
            </h3>
            <p className="home-about-cta-description">
              무료 상담을 통해 귀사에 최적화된 미국 진출 전략을 제안해드립니다.
            </p>
            <button className="home-about-cta-button">전문가와 상담하기</button>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="home-services">
        <div className="container">
          <div ref={servicesHeaderRef} className="home-services-header fade-up">
            <span className="home-section-tag">Services</span>
            <h2 className="home-section-title">
              완벽한 서비스로
              <span className="home-section-highlight">함께하는 미국 진출</span>
            </h2>
            <p className="home-section-description">
              회사 설립부터 세무 관리까지, 각 분야의 전문가가 통합 솔루션을
              제공합니다.
            </p>
          </div>

          <div className="home-services-grid">
            <div
              ref={(el) => (servicesCardsRef.current[0] = el)}
              className="home-service-item fade-up"
            >
              <div className="home-service-image-wrapper">
                <img
                  src="/service-1.jpg"
                  alt="세무 서비스"
                  className="home-service-image"
                />
                <div className="home-service-overlay">
                  <span className="home-service-number">01</span>
                </div>
              </div>
              <div className="home-service-content">
                <h3 className="home-service-title">세무 신고 및 전략</h3>
                <p className="home-service-description">
                  연방세, 주세, 판매세 등 복잡한 미국 세무 체계를 완벽히
                  이해하고 최적의 절세 전략을 수립합니다.
                </p>
                <ul className="home-service-features">
                  <li>법인세 및 개인소득세 신고</li>
                  <li>세무 조사 대응</li>
                  <li>국제 조세 컨설팅</li>
                </ul>
                <a href="#" className="home-service-link">
                  자세히 보기
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

            <div
              ref={(el) => (servicesCardsRef.current[1] = el)}
              className="home-service-item fade-up"
            >
              <div className="home-service-image-wrapper">
                <img
                  src="/service-2.jpg"
                  alt="회계 서비스"
                  className="home-service-image"
                />
                <div className="home-service-overlay">
                  <span className="home-service-number">02</span>
                </div>
              </div>
              <div className="home-service-content">
                <h3 className="home-service-title">회계 및 재무 관리</h3>
                <p className="home-service-description">
                  GAAP 기준에 따른 정확한 재무제표 작성과 체계적인 회계 관리로
                  투명한 재무 운영을 지원합니다.
                </p>
                <ul className="home-service-features">
                  <li>재무제표 작성 및 감사</li>
                  <li>월별 회계 장부 정리</li>
                  <li>재무 분석 및 리포팅</li>
                </ul>
                <a href="#" className="home-service-link">
                  자세히 보기
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

            <div
              ref={(el) => (servicesCardsRef.current[2] = el)}
              className="home-service-item fade-up"
            >
              <div className="home-service-image-wrapper">
                <img
                  src="/service-3.jpg"
                  alt="법인 설립 서비스"
                  className="home-service-image"
                  style={{ objectPosition: "top" }}
                />
                <div className="home-service-overlay">
                  <span className="home-service-number">03</span>
                </div>
              </div>
              <div className="home-service-content">
                <h3 className="home-service-title">법인 설립 및 운영</h3>
                <p className="home-service-description">
                  비즈니스 목적에 맞는 최적의 법인 형태 선택부터 설립, 운영까지
                  전 과정을 지원합니다.
                </p>
                <ul className="home-service-features">
                  <li>LLC, C-Corp, S-Corp 설립</li>
                  <li>EIN 및 라이센스 취득</li>
                  <li>법인 유지 관리</li>
                </ul>
                <a href="#" className="home-service-link">
                  자세히 보기
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

            <div
              ref={(el) => (servicesCardsRef.current[3] = el)}
              className="home-service-item fade-up"
            >
              <div className="home-service-image-wrapper">
                <img
                  src="/service-4.jpg"
                  alt="비즈니스 컨설팅"
                  className="home-service-image"
                />
                <div className="home-service-overlay">
                  <span className="home-service-number">04</span>
                </div>
              </div>
              <div className="home-service-content">
                <h3 className="home-service-title">비즈니스 컨설팅</h3>
                <p className="home-service-description">
                  미국 시장 진출 전략 수립부터 현지화, 성장 전략까지 단계별 맞춤
                  컨설팅을 제공합니다.
                </p>
                <ul className="home-service-features">
                  <li>시장 진출 전략 수립</li>
                  <li>M&A 및 투자 자문</li>
                  <li>비즈니스 프로세스 최적화</li>
                </ul>
                <a href="#" className="home-service-link">
                  자세히 보기
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
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="home-process">
        <div className="container">
          <div ref={processHeaderRef} className="home-process-header fade-up">
            <span className="home-section-tag">Process</span>
            <h2 className="home-section-title">
              체계적인 4단계 프로세스
              <span className="home-section-highlight">
                확실한 성과를 보장합니다
              </span>
            </h2>
            <p className="home-section-description">
              초기 상담부터 지속적인 지원까지, 모든 단계에서 전문가가
              함께합니다.
            </p>
          </div>

          <div className="home-process-timeline">
            {/* Step 1 */}
            <div
              ref={(el) => (processStepsRef.current[0] = el)}
              className="home-process-step fade-up"
            >
              <div className="home-process-step-number">
                <span>01</span>
                <div className="home-process-step-line"></div>
              </div>

              <div className="home-process-step-content">
                <h3 className="home-process-step-title">무료 상담</h3>
                <p className="home-process-step-description">
                  귀사의 비즈니스 목표와 미국 진출 계획을 상세히 파악합니다.
                </p>

                <ul className="home-process-step-list">
                  <li>비즈니스 모델 분석</li>
                  <li>진출 목표 설정</li>
                  <li>예상 일정 수립</li>
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
                  <span>1-2일 소요</span>
                </div>
              </div>
            </div>

            {/* Step 2 */}
            <div
              ref={(el) => (processStepsRef.current[1] = el)}
              className="home-process-step fade-up"
            >
              <div className="home-process-step-number">
                <span>02</span>
                <div className="home-process-step-line"></div>
              </div>

              <div className="home-process-step-content">
                <h3 className="home-process-step-title">심층 분석</h3>
                <p className="home-process-step-description">
                  현재 상황을 정밀 분석하고 최적의 진출 전략을 수립합니다.
                </p>

                <ul className="home-process-step-list">
                  <li>세무 구조 분석</li>
                  <li>법인 형태 검토</li>
                  <li>리스크 평가</li>
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
                  <span>1-2주 소요</span>
                </div>
              </div>
            </div>

            {/* Step 3 */}
            <div
              ref={(el) => (processStepsRef.current[2] = el)}
              className="home-process-step fade-up"
            >
              <div className="home-process-step-number">
                <span>03</span>
                <div className="home-process-step-line"></div>
              </div>

              <div className="home-process-step-content">
                <h3 className="home-process-step-title">전략 실행</h3>
                <p className="home-process-step-description">
                  수립된 전략에 따라 법인 설립부터 운영까지 실행합니다.
                </p>

                <ul className="home-process-step-list">
                  <li>법인 설립 진행</li>
                  <li>세무 등록 완료</li>
                  <li>운영 체계 구축</li>
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
                  <span>2-4주 소요</span>
                </div>
              </div>
            </div>

            {/* Step 4 */}
            <div
              ref={(el) => (processStepsRef.current[3] = el)}
              className="home-process-step fade-up"
            >
              <div className="home-process-step-number">
                <span>04</span>
                <div className="home-process-step-line home-process-step-line-last"></div>
              </div>

              <div className="home-process-step-content">
                <h3 className="home-process-step-title">지속 지원</h3>
                <p className="home-process-step-description">
                  안정적인 운영을 위한 지속적인 관리와 지원을 제공합니다.
                </p>

                <ul className="home-process-step-list">
                  <li>정기 세무 신고</li>
                  <li>회계 관리 지원</li>
                  <li>컨설팅 서비스</li>
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
                  <span>연중 지속</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Case Studies Section */}
      <section className="home-cases">
        <div className="container">
          <div ref={casesHeaderRef} className="home-cases-header fade-up">
            <span className="home-section-tag">Stories</span>
            <h2 className="home-section-title">
              실제 고객사의
              <span className="home-section-highlight">
                성공적인 미국 진출 사례
              </span>
            </h2>
            <p className="home-section-description">
              다양한 산업군의 한국 기업들이 저희와 함께 미국 시장에서 성공을
              거두고 있습니다.
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
                  <h3 className="home-case-title">스타트업 A사</h3>
                  <p className="home-case-industry">
                    IT / SaaS · 실리콘밸리 진출
                  </p>
                </div>
              </div>

              <div className="home-case-comparison">
                <div className="home-case-before">
                  <span className="home-case-label">Before</span>
                  <ul className="home-case-list">
                    <li>복잡한 미국 세법으로 인한 과세</li>
                    <li>투자자 미팅 시 신뢰도 부족</li>
                    <li>현지 법인 운영 경험 부재</li>
                  </ul>
                </div>

                <div className="home-case-after">
                  <span className="home-case-label">After</span>
                  <ul className="home-case-list">
                    <li>최적화된 법인 구조로 절세 실현</li>
                    <li>Series A 투자 성공적 유치</li>
                    <li>안정적인 미국 법인 운영</li>
                  </ul>
                </div>
              </div>

              <div className="home-case-footer">
                <blockquote className="home-case-quote">
                  "전문적인 세무 전략과 투자 준비 과정 덕분에 성공적으로
                  자리잡을 수 있었습니다."
                </blockquote>
                <p className="home-case-author">- CEO, 테크 스타트업 A사</p>
              </div>
            </div>

            {/* Case Study 2 */}
            <div
              ref={(el) => (casesCardsRef.current[1] = el)}
              className="home-case-card fade-up"
            >
              <div className="home-case-header">
                <div className="home-case-info">
                  <h3 className="home-case-title">제조업 B사</h3>
                  <p className="home-case-industry">
                    제조업 · 텍사스 공장 설립
                  </p>
                </div>
              </div>

              <div className="home-case-comparison">
                <div className="home-case-before">
                  <span className="home-case-label">Before</span>
                  <ul className="home-case-list">
                    <li>높은 수입 관세 부담</li>
                    <li>물류 비용 과다 지출</li>
                    <li>미국 시장 대응 지연</li>
                  </ul>
                </div>

                <div className="home-case-after">
                  <span className="home-case-label">After</span>
                  <ul className="home-case-list">
                    <li>현지 생산으로 관세 회피</li>
                    <li>주정부 인센티브 획득</li>
                    <li>빠른 시장 대응 체계 구축</li>
                  </ul>
                </div>
              </div>

              <div className="home-case-footer">
                <blockquote className="home-case-quote">
                  "텍사스 진출 전략부터 공장 설립, 세무 최적화까지 모든 과정을
                  함께해 주셔서 감사합니다."
                </blockquote>
                <p className="home-case-author">- CFO, 제조업 B사</p>
              </div>
            </div>
          </div>

          <div ref={casesCtaRef} className="home-cases-cta scale-in">
            <p className="home-cases-cta-text">
              귀사도 미국 시장에서 성공 스토리를 만들어보세요
            </p>
            <button className="home-cases-cta-button">상담 시작하기</button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
