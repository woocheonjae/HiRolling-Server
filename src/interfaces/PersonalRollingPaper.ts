export interface PersonalRollingPaper {
  personalRollingPaperId: string;
  userId: string;
  title: string | null;
  exportUrl: string;
  publicType: boolean;
}

export interface PersonalRollingPaperInputDTO {
  paperId: string;
}

export interface PersonalRollingPaperDTO {
  userId: string;
  title: string | null;
  exportUrl: string;
  publicType: boolean;
}
