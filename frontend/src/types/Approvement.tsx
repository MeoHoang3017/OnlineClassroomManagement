export interface Approvement {
    _id: string;
    userId: string;
    classId: string;
    isRead: boolean;
    isAllowed: boolean;
    approvedBy: string;
    approvedAt: Date;
}

export interface CreateApprovementData {
    userId: string;
    classId: string;
}