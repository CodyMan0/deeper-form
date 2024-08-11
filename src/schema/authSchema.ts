import { z } from "zod";

// export const MIN_PASSWORD_LENGTH = 8;

export const errorMessageMap = {
  EMAIL_REQUIRED: '이메일을 입력해 주세요',
  EMAIL_FORMAT_INCORRECT: '이메일 형식을 확인해 주세요',
  PASSWORD_REQUIRED: '비밀번호를 입력해 주세요',
  PASSWORD_LENGTH_INCORRECT : '비밀번호는 8자 이상 입력해 주세요',
  PASSWORD_LOWERCASE_NO_EXIST : '비밀번호는 최소 한 개의 소문자를 포함해야 합니다',
  PASSWORD_UPPERCASE_NO_EXIST : '비밀번호는 최소 한 개의 대문자를 포함해야 합니다',
  PASSWORD_NUMBER_NO_EXIST : '비밀번호에 숫자가 포함되어야 합니다',
  PASSWORD_SPECIAL_NO_EXIST : '비밀번호에 특수문자가 포함되어야 합니다',
  CONSENT_NO_CHECKED : "이용약관 및 개인정보 보호 정책에 동의해야 합니다",
  AFFILIATE_EXCHANGE_NO_EXIST:'존재하지 않는 거래소 입니다'
};

export const successMessageMap = {
  EMAIL_SEND_VALIDATION_SUCCESS: '인증 번호 발송이 되었습니다.',
  LOGOUT_SUCESS: '로그아웃이 되었습니다'
};


const loginSchemaObject = {
  email: z.string().email(errorMessageMap.EMAIL_FORMAT_INCORRECT), // 이메일 유효성 검사
  password: z.string()
      .min(8, errorMessageMap.PASSWORD_LENGTH_INCORRECT) // 최소 길이 검사
      .refine((val) => /[a-z]/.test(val), errorMessageMap.PASSWORD_LOWERCASE_NO_EXIST) // 소문자 검사
      // .refine((val) => /[A-Z]/.test(val),  errorMessageMap.PASSWORD_UPPERCASE_NO_EXIST) // 대문자 검사
      .refine((val) => /[0-9]/.test(val), errorMessageMap.PASSWORD_NUMBER_NO_EXIST) // 숫자 검사
      .refine((val) => /[^a-zA-Z0-9]/.test(val), errorMessageMap.PASSWORD_SPECIAL_NO_EXIST) // 특수문자 검사
}

export const loginSchema = z.object(loginSchemaObject);
export const signUpSchema = z.object({
  ...loginSchemaObject,
  referenceCode: z.string().nullable().default(null),
  hasAgreedWithTerms: z.boolean().refine((value => value === true),errorMessageMap.CONSENT_NO_CHECKED)
});

//TODO : 존재하지 않는 추천인 코드 정리 필요!
