export interface Patient {
    id: string;
    firstName: string;
    lastName: string;
    phoneNumber: string;
    tenantId: string;
    createdAt: string; // ISO date string
    primaryBranchId?: string;
}
