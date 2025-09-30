// stores/useLanguageStore.js
import { create } from "zustand";
import { persist } from "zustand/middleware";

const useLanguageStore = create(
  persist(
    (set, get) => ({
      // 현재 선택된 언어
      currentLanguage: "ko",

      // 지원하는 언어 목록
      availableLanguages: [
        {
          code: "ko",
          label: "한국어",
          shortLabel: "KO",
          flag: "🇰🇷",
        },
        {
          code: "en",
          label: "English",
          shortLabel: "EN",
          flag: "🇺🇸",
        },
      ],

      // 언어 설정 함수
      setLanguage: (language) => {
        const validLanguages = ["ko", "en"];
        if (validLanguages.includes(language)) {
          set({ currentLanguage: language });
          // HTML lang 속성도 변경
          document.documentElement.lang = language;
        }
      },

      // 언어 토글 함수 (ko <-> en)
      toggleLanguage: () => {
        const newLang = get().currentLanguage === "ko" ? "en" : "ko";
        get().setLanguage(newLang);
      },

      // 현재 언어 정보 가져오기
      getCurrentLanguageInfo: () => {
        const currentLang = get().currentLanguage;
        return get().availableLanguages.find(
          (lang) => lang.code === currentLang
        );
      },

      // 브라우저 언어 감지 및 초기화
      initializeLanguage: () => {
        // localStorage에 저장된 언어가 있으면 그대로 사용
        const storedLang = localStorage.getItem("language-storage");
        if (storedLang) {
          const parsed = JSON.parse(storedLang);
          if (parsed.state?.currentLanguage) {
            document.documentElement.lang = parsed.state.currentLanguage;
            return;
          }
        }

        // 브라우저 언어 감지
        const browserLang = navigator.language || navigator.languages[0];
        const langCode = browserLang.toLowerCase().substring(0, 2);

        // 한국어 감지 (ko, ko-KR 등)
        if (langCode === "ko") {
          set({ currentLanguage: "ko" });
          document.documentElement.lang = "ko";
        } else {
          // 그 외는 영어를 기본값으로
          set({ currentLanguage: "en" });
          document.documentElement.lang = "en";
        }
      },

      // 언어별 텍스트 방향 (향후 아랍어 등 RTL 언어 지원 시 사용)
      getTextDirection: () => {
        const rtlLanguages = ["ar", "he", "fa", "ur"];
        const currentLang = get().currentLanguage;
        return rtlLanguages.includes(currentLang) ? "rtl" : "ltr";
      },

      // 언어별 날짜 포맷
      getDateFormat: () => {
        const formats = {
          ko: "YYYY년 MM월 DD일",
          en: "MMM DD, YYYY",
        };
        return formats[get().currentLanguage] || formats.en;
      },

      // 언어별 숫자 포맷 (천 단위 구분)
      formatNumber: (number) => {
        const currentLang = get().currentLanguage;
        const locales = {
          ko: "ko-KR",
          en: "en-US",
        };
        return new Intl.NumberFormat(locales[currentLang]).format(number);
      },

      // 언어별 통화 포맷
      formatCurrency: (amount, currency = "USD") => {
        const currentLang = get().currentLanguage;
        const locales = {
          ko: "ko-KR",
          en: "en-US",
        };
        return new Intl.NumberFormat(locales[currentLang], {
          style: "currency",
          currency: currency,
        }).format(amount);
      },
    }),
    {
      name: "language-storage", // localStorage key 이름

      // storage 옵션
      getStorage: () => localStorage,

      // 특정 필드만 저장 (불필요한 함수는 제외)
      partialize: (state) => ({
        currentLanguage: state.currentLanguage,
      }),

      // 스토리지에서 로드 후 실행
      onRehydrateStorage: () => (state) => {
        if (state) {
          // HTML lang 속성 동기화
          document.documentElement.lang = state.currentLanguage;
        }
      },
    }
  )
);

export default useLanguageStore;
