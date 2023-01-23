
export interface Group {
    groupId: string;
    userId: string;
    groupName: string;
    inviteUrl: string;
    
}

export interface GroupMember{
    groupMemberId: string;
    groupId: string;
    userId: string;
    groupRollingPaperId: string;
}
export interface GroupInputDTO{
    groupId: string;
}

export interface GroupMemberInputDTO{
    groupMemberId: string;
}

export interface GroupDTO {
    userId: string;
    groupName: string;
    inviteUrl: string; 
}

export interface GroupMemberDTO{
    groupId: string;
    userId: string;
    groupRollingPaperId: string;
}