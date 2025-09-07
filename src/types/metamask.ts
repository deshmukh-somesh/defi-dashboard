export interface SDKOptions {
    logging?: {
        developerMode: boolean;
    };
    checkInstallationImmediately?: boolean;
    dappMetadata: {
        name: string,
        url: string,
        iconUrl?: string
    };
    infuraAPIKey?: string;
}