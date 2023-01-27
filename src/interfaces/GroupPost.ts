enum AnonymousType {
  친구 = "친구",
  동료 = "동료",
  애인 = "애인",
  가족 = "가족",
}

export interface GroupPost {
  groupPostId: string;
  groupRollingPaperId: string;
  userId: string | null;
  content: string | null;
  postColor: string;
  anonymousType: AnonymousType | null;
  emojiType: string | null;
}

export interface GroupPostInputDTO {
  groupPostId: string;
}

export interface GroupPostDTO {
  groupRollingPaperId: string;
  userId: string | null;
  content: string | null;
  anonymousType: AnonymousType | null;
  postColor: string;
}


export interface GroupPostEmojiDTO {
  emojiType: string | null;
}

