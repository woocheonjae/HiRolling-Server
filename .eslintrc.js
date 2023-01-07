// .eslintrc.js
module.exports = {
  // 현재 eslintrc 파일을 기준으로 ESLint 규칙을 적용
  root: true,

  // 추가적인 규칙들을 적용
  extends: [
    "eslint:recommended",
    "prettier",
    "plugin:prettier/recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:import/typescript",
    "plugin:import/recommended",
  ],

  // 코드 정리 플러그인 추가
  plugins: ["prettier", "@typescript-eslint"],

  // linter가 파일을 분석할 때, 미리 정의된 전역변수에 무엇이 있는지 명시하는 속성
  env: {
    es6: true,
    // 브라우저의 document와 같은 객체 사용 여부
    browser: false,
    // node.js에서 console과 같은 전역변수 사용 여부
    node: true,
  },

  parser: "@typescript-eslint/parser",

  parserOptions: {
    ecmaVersion: 6,
    sourceType: "module",
  },

  settings: {
    "import/resolver": {
      node: {},
      typescript: {
        directory: "./src",
      },
    },
    "import/parsers": { "@typescript-eslint/parser": [".ts", ".tsx"] },
  },

  // ESLint가 무시할 디렉토리, 파일을 설정
  ignorePatterns: ["node_modules/", "dist/"],

  // 사용자 편의 규칙 추가
  rules: {
    "@typescript-eslint/explicit-member-accessibility": 0,
    "@typescript-eslint/explicit-function-return-type": 0,
    "@typescript-eslint/no-parameter-properties": 0,
    "@typescript-eslint/interface-name-prefix": 0,
    "import/no-unresolved": "off",
    "import/export": "off",
    "import/order": [
      "error",
      {
        groups: ["builtin", "external", "parent", "sibling", "index"],
        alphabetize: {
          order: "asc",
          caseInsensitive: true,
        },
        "newlines-between": "always",
      },
    ],
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
        importOrder: ["^@/(.*)$", "^[./]"],
        importOrderParserPlugins: ["typescript", "decorators-legacy"],
        importOrderSeparation: true,
        importOrderSortSpecifiers: true,
      },
    ],
  },
};
