import React, { useState, useEffect, useRef } from "react";
import { Send, CheckCircle, MapPin } from "lucide-react";
import "./Contact.css";

const Contact = () => {
  // Form state
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

  // Animation refs
  const heroContentRef = useRef(null);
  const formSectionRef = useRef(null);

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitSuccess(true);

      // Reset form after 3 seconds
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

  // Animation setup
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

    // Observe elements
    if (heroContentRef.current) {
      observer.observe(heroContentRef.current);
    }

    if (formSectionRef.current) {
      observer.observe(formSectionRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div className="contact-page">
      {/* Hero Section */}
      <section className="contact-hero-section">
        <div className="contact-hero-bg"></div>
        <div className="container">
          <div ref={heroContentRef} className="contact-hero-content fade-up">
            <h1 className="contact-hero-heading">문의하기</h1>
            <p className="contact-hero-subheading">
              미국 진출의 모든 과정, 전문가가 함께합니다.
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
          <div className="contact-content ">
            <div className="contact-form-wrapper">
              <div className="contact-form-inner">
                <div className="form-header">
                  <h2 className="form-title">상담 신청</h2>
                  <p className="form-description">
                    귀사의 성공적인 미국 진출을 위한 첫 걸음을 시작하세요.
                  </p>
                  <p className="form-description">
                    전문 CPA 그룹이 영업일 기준 24시간 내에 연락드립니다.
                  </p>
                </div>

                <form className="contact-form" onSubmit={handleSubmit}>
                  {/* Personal Information */}
                  <div className="form-section">
                    <div className="form-row">
                      <div className="form-field">
                        <label className="form-label">
                          이름 <span className="required">*</span>
                        </label>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          className="form-input"
                          placeholder="홍길동"
                          required
                        />
                      </div>

                      <div className="form-field">
                        <label className="form-label">
                          이메일 <span className="required">*</span>
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
                          연락처 <span className="required">*</span>
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
                          거주 지역 <span className="required">*</span>
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
                            미국
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
                            해외 (한국 포함)
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Service Location */}
                  <div className="form-section">
                    <div className="form-field">
                      <label className="form-label">
                        희망 서비스 지역 <span className="required">*</span>
                      </label>
                      <div className="location-grid">
                        {[
                          { value: "nc", label: "노스캐롤라이나" },
                          { value: "ny-nj", label: "뉴욕 • 뉴저지" },
                          { value: "seattle", label: "시애틀" },
                          { value: "ca", label: "캘리포니아" },
                          { value: "tx", label: "텍사스" },
                          { value: "philadelphia", label: "필라델피아" },
                          { value: "other", label: "기타" },
                        ].map((location) => (
                          <button
                            key={location.value}
                            type="button"
                            className={`location-button ${
                              formData.location === location.value
                                ? "active"
                                : ""
                            }`}
                            onClick={() =>
                              handleInputChange({
                                target: {
                                  name: "location",
                                  value: location.value,
                                },
                              })
                            }
                          >
                            {location.label}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Message */}
                  <div className="form-section">
                    <div className="form-field">
                      <label className="form-label">
                        문의 내용 <span className="required">*</span>
                      </label>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        className="form-textarea"
                        rows="6"
                        placeholder="문의하실 내용을 자세히 작성해주세요.&#10;예: 사업 분야, 진출 시기, 필요한 서비스 등"
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
                          <span>전송 완료</span>
                        </>
                      ) : isSubmitting ? (
                        <>
                          <div className="button-spinner"></div>
                          <span>전송 중...</span>
                        </>
                      ) : (
                        <>
                          <Send size={20} />
                          <span>상담 신청하기</span>
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
                <h4>상담 프로세스</h4>
                <ol className="process-list">
                  <li>온라인 상담 신청</li>
                  <li>전문가 배정 (24시간 내)</li>
                  <li>초기 상담 진행</li>
                  <li>맞춤형 솔루션 제안</li>
                </ol>
              </div>

              <div className="info-card">
                <h4>주요 서비스</h4>
                <ul className="service-list">
                  <li>법인 설립 및 운영</li>
                  <li>세무 신고 및 전략</li>
                  <li>회계 및 재무 관리</li>
                  <li>비즈니스 컨설팅</li>
                  <li>HR 및 급여 관리</li>
                  <li>맞춤 IT 솔루션</li>
                </ul>
              </div>

              <div className="info-card">
                <h4>서비스 지역</h4>
                <ul className="service-location-list">
                  <li>
                    <MapPin /> 노스캐롤라이나
                  </li>
                  <li>
                    <MapPin /> 뉴욕 / 뉴저지
                  </li>
                  <li>
                    <MapPin /> 시애틀
                  </li>
                  <li>
                    <MapPin /> 캘리포니아
                  </li>
                  <li>
                    <MapPin /> 텍사스
                  </li>
                  <li>
                    <MapPin /> 필라델피아
                  </li>
                </ul>
              </div>

              <div className="info-card highlight">
                <h4 style={{ textAlign: "center" }}>왜 선택해야 할까요?</h4>
                <ul className="benefit-list">
                  <li>
                    <strong>15년+</strong> 전문 경험
                  </li>
                  <li>
                    <strong>500+</strong> 성공 사례
                  </li>
                  <li>
                    <strong>다수</strong> 전문 인력
                  </li>
                  <li>
                    <strong>24시간</strong> 응답 시간
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
