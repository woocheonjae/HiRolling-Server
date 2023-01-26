enum LoginType {
  KAKAO = "KAKAO",
  NAVER = "NAVER",
  GOOGLE = "GOOGLE",
}

export interface User {
  userId: string;
  email: string;
  password: string | null;
  name: string;
  userProfileImage: string;
  loginType: LoginType;
}

export interface UserInputDTO {
  userId: string;
  email: string;
  name: string;
}

export interface TokenDTO {
  accessToken: string;
  refreshToken: string;
}
