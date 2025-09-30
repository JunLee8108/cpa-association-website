// hooks/useTranslation.js
import React from "react";
import useLanguageStore from "../stores/useLanguageStore";
import ko from "../translations/ko.json";
import en from "../translations/en.json";

// 번역 데이터
const translations = {
  ko,
  en,
};

/**
 * 번역 시스템을 위한 커스텀 훅
 * @param {string} namespace - 옵션: 특정 네임스페이스 (예: 'home', 'services')
 * @returns {Object} 번역 함수와 유틸리티
 */
const useTranslation = (namespace = null) => {
  const {
    currentLanguage,
    toggleLanguage,
    setLanguage,
    getCurrentLanguageInfo,
    formatNumber,
    formatCurrency,
  } = useLanguageStore();

  /**
   * 중첩된 키를 통해 번역 값을 가져오는 함수
   * 문자열, 배열, 객체 등 모든 타입을 처리 가능
   * @param {string} key - 번역 키 (예: 'home.hero.title')
   * @param {Object} variables - 동적 변수 치환용 (예: { year: 2024 })
   * @returns {any} 번역된 값 (문자열, 배열, 객체 등)
   */
  const t = React.useCallback(
    (key, variables = {}) => {
      // 전체 키 생성 (namespace가 있으면 prefix로 추가)
      const fullKey = namespace ? `${namespace}.${key}` : key;

      // 키를 점(.)으로 분리
      const keys = fullKey.split(".");

      // 현재 언어의 번역 데이터에서 값 찾기
      let value = translations[currentLanguage];

      for (const k of keys) {
        if (value && typeof value === "object" && k in value) {
          value = value[k];
        } else {
          // 값을 찾을 수 없는 경우
          console.warn(
            `Translation missing for key: ${fullKey} in language: ${currentLanguage}`
          );

          // 배열이 예상되는 키에 대해서는 빈 배열 반환
          if (fullKey.includes(".features") || fullKey.includes(".items")) {
            return [];
          }

          return fullKey; // 키를 그대로 반환 (개발 시 확인 용이)
        }
      }

      // 배열인 경우 그대로 반환
      if (Array.isArray(value)) {
        return value;
      }

      // 객체인 경우 그대로 반환 (필요한 경우)
      if (typeof value === "object" && value !== null) {
        return value;
      }

      // 문자열인 경우 변수 치환 처리
      if (typeof value === "string") {
        let translatedText = value;
        Object.keys(variables).forEach((variable) => {
          const regex = new RegExp(`{${variable}}`, "g");
          translatedText = translatedText.replace(regex, variables[variable]);
        });
        return translatedText;
      }

      // 숫자나 불린 등 다른 타입은 그대로 반환
      return value;
    },
    [currentLanguage, namespace]
  );

  /**
   * 특정 네임스페이스의 모든 번역을 가져오는 함수
   * @param {string} ns - 네임스페이스 (예: 'nav', 'footer')
   * @returns {Object} 해당 네임스페이스의 번역 객체
   */
  const getNamespace = React.useCallback(
    (ns) => {
      const namespacePath = namespace ? `${namespace}.${ns}` : ns;
      const keys = namespacePath.split(".");
      let value = translations[currentLanguage];

      for (const k of keys) {
        if (value && typeof value === "object") {
          value = value[k];
        } else {
          return {};
        }
      }

      return value || {};
    },
    [currentLanguage, namespace]
  );

  /**
   * 배열 형태의 번역 리스트를 가져오는 함수 (하위 호환성을 위해 유지)
   * @param {string} key - 번역 키
   * @returns {Array} 번역된 배열
   */
  const tList = React.useCallback(
    (key) => {
      const value = t(key);
      return Array.isArray(value) ? value : [];
    },
    [t]
  );

  /**
   * 복수형 처리 함수
   * @param {string} key - 번역 키
   * @param {number} count - 수량
   * @returns {string} 복수형 처리된 텍스트
   */
  const tPlural = React.useCallback(
    (key, count) => {
      // 영어의 경우 복수형 처리
      if (currentLanguage === "en") {
        const singular = t(key);
        const plural =
          t(`${key}Plural`) ||
          (typeof singular === "string" ? singular + "s" : singular);
        return count === 1 ? singular : plural;
      }
      // 한국어는 복수형 구분 없음
      return t(key);
    },
    [currentLanguage, t]
  );

  /**
   * 언어별 조건부 렌더링을 위한 함수
   * @param {*} koValue - 한국어일 때 반환할 값
   * @param {*} enValue - 영어일 때 반환할 값
   * @returns {*} 현재 언어에 맞는 값
   */
  const langConditional = React.useCallback(
    (koValue, enValue) => {
      return currentLanguage === "ko" ? koValue : enValue;
    },
    [currentLanguage]
  );

  /**
   * 번역 키가 존재하는지 확인
   * @param {string} key - 확인할 번역 키
   * @returns {boolean} 존재 여부
   */
  const hasTranslation = React.useCallback(
    (key) => {
      const fullKey = namespace ? `${namespace}.${key}` : key;
      const keys = fullKey.split(".");
      let value = translations[currentLanguage];

      for (const k of keys) {
        if (value && typeof value === "object" && k in value) {
          value = value[k];
        } else {
          return false;
        }
      }

      return value !== undefined;
    },
    [currentLanguage, namespace]
  );

  // 반환 객체 메모이제이션
  return React.useMemo(
    () => ({
      // 핵심 번역 함수
      t,

      // 언어 관련 정보
      currentLanguage,
      isKorean: currentLanguage === "ko",
      isEnglish: currentLanguage === "en",

      // 언어 변경 함수
      toggleLanguage,
      setLanguage,
      changeLanguage: setLanguage, // alias

      // 유틸리티 함수
      getNamespace,
      tList,
      tPlural,
      langConditional,
      hasTranslation,

      // 언어 정보
      getCurrentLanguageInfo,

      // 포맷팅 함수
      formatNumber,
      formatCurrency,

      // 언어별 스타일 클래스 (폰트 등)
      languageClass: `lang-${currentLanguage}`,

      // 언어별 속성 (HTML lang 등)
      languageAttributes: {
        lang: currentLanguage,
        dir:
          currentLanguage === "ar" || currentLanguage === "he" ? "rtl" : "ltr",
      },
    }),
    [
      t,
      currentLanguage,
      toggleLanguage,
      setLanguage,
      getNamespace,
      tList,
      tPlural,
      langConditional,
      hasTranslation,
      getCurrentLanguageInfo,
      formatNumber,
      formatCurrency,
    ]
  );
};

export default useTranslation;

/**
 * 특정 네임스페이스를 위한 훅 생성 헬퍼
 * @param {string} namespace - 네임스페이스
 * @returns {Function} 네임스페이스가 설정된 훅
 */
export const createNamespacedHook = (namespace) => {
  return () => useTranslation(namespace);
};

// 자주 사용되는 네임스페이스별 훅 (선택적 사용)
export const useHomeTranslation = createNamespacedHook("home");
export const useServicesTranslation = createNamespacedHook("services");
export const useContactTranslation = createNamespacedHook("contact");
export const useCommonTranslation = createNamespacedHook("common");
