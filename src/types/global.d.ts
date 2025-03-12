declare global {
  interface Window {
    Appfolio?: {
      Listing: (options: {
        hostUrl: string;
        propertyGroup?: string;
        themeColor: string;
        height: string;
        width: string;
        defaultOrder: string;
        listingView?: string;
        listingCount?: number;
        columns?: number;
      }) => void;
    };
    initAppfolioListing?: () => void;
  }
}

export {};
