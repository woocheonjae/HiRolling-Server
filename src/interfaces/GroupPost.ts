enum AnonymousType {
  친구 = "친구",
  동료 = "동료",
  애인 = "애인",
  가족 = "가족",
}

export interface GroupPost {
  group_post_id: string;
  group_rolling_paper_id: string;
  user_id: string | null;
  content: string | null;
  post_color: string;
  anonymous_type: AnonymousType | null;
  emoji_type: string | null;
}

export interface GroupPostInputDTO {
  groupPostId: string;
}

export interface GroupPostDTO {
  group_rolling_paper_id: string;
  user_id: string | null;
  content: string | null;
  anonymous_type: AnonymousType | null;
  post_color: string;
}
