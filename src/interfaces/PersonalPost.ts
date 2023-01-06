enum AnonymousType {
  친구 = "친구",
  동료 = "동료",
  애인 = "애인",
  가족 = "가족",
}

export interface PersonalPost {
  personal_post_id: string;
  personal_rolling_paper_id: string;
  user_id: string | null;
  content: string;
  anonymous_type: AnonymousType;
  post_color: string;
  emoji_type: string | null;
  non_member_password: string | null;
}

export interface PersonalPostInputDTO {
  personalPostId: string;
}
