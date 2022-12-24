// .eslintrc.js
export default {
  // 현재 eslintrc 파일을 기준으로 ESLint 규칙을 적용
  root: true,

  // 추가적인 규칙들을 적용
  extends: ["eslint:recommended", "prettier", "plugin:prettier/recommended"],

  // 코드 정리 플러그인 추가
  plugins: ["prettier"],

  // linter가 파일을 분석할 때, 미리 정의된 전역변수에 무엇이 있는지 명시하는 속성
  env: {
    es6: true,
    // 브라우저의 document와 같은 객체 사용 여부
    browser: false,
    // node.js에서 console과 같은 전역변수 사용 여부
    node: true,
  },

  parserOptions: {
    ecmaVersion: 6,
    sourceType: "module",
  },

  // ESLint가 무시할 디렉토리, 파일을 설정
  ignorePatterns: ["node_modules/"],

  // 사용자 편의 규칙 추가
  rules: {
    "prettier/prettier": [
      "error",
      // 아래 규칙들은 개인 선호에 따라 prettier 문법 적용
      // https://prettier.io/docs/en/options.html
      {
        singleQuote: false,
        semi: true,
        useTabs: false,
        tabWidth: 2,
        trailingComma: "all",
        printWidth: 80,
        bracketSpacing: true,
        arrowParens: "always",
        importOrder: ["^@core/(.*)$", "^@server/(.*)$", "^@ui/(.*)$", "^[./]"],
        importOrderSeparation: true,
        importOrderSortSpecifiers: true,
      },
    ],
  },
};
