export interface PersonalRollingPaper {
  personal_rolling_paper_id: string;
  user_id: string;
  title: string | null;
  export_url: string;
  public_type: boolean;
}

export interface PersonalRollingPaperInputDTO {
  personalRollingPaperId: string;
}

export interface PersonalRollingPaperDTO {
  user_id: string;
  title: string | null;
  export_url: string;
  public_type: boolean;
}
