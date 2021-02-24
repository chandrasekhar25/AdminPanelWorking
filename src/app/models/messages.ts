export interface ProfileData {
    displayName?: string;
    newPlayer?: boolean;
    scriptData?: {
        redirectUri?: string;
        flowData?: string;
        statusCode?: string;
        url?: string;
        nextUrl?: string;
        rulesPDF?: string;
    };
    userId?: string;
}
