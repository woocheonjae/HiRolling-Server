enum AnonymousType {
  친구 = "친구",
  동료 = "동료",
  애인 = "애인",
  가족 = "가족",
}

// TODO 이모지도 enum으로 

export interface PersonalPost {
  personalPostId: string;
  personalRollingPaperId: string;
  userId: string | null;
  content: string | null;
  anonymousType: AnonymousType | null;
  postColor: string;
  emojiType: string | null;
  nonMemberPassword: string | null;
}

export interface PersonalPostInputDTO {
  personalPostId: string;
}

export interface PersonalPostDTO {
  personalRollingPaperId: string;
  userId: string | null;
  content: string | null;
  anonymousType: AnonymousType | null;
  postColor: string;
  nonMemberPassword: string | null;
}

export interface PersonalPostEmojiDTO {
  emojiType: string | null;
}