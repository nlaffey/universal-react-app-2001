export interface BookQueryResponseJson {
  kind: string;
  totalItems: number;
  items: ({
    kind: string;
    id: string;
    etag: string;
    selfLink: string;
    volumeInfo: {
      title: string;
      subtitle: string;
      authors: string[];
      publisher: string;
      publishedDate: string;
      description: string;
      industryIdentifiers: ({
        type: string;
        identifier: string
      })[];
      readingModes: {
        text: boolean;
        image: boolean
      };
      pageCount: number;
      printType: string;
      categories: string[];
      maturityRating: string;
      allowAnonLogging: boolean;
      contentVersion: string;
      language: string;
      previewLink: string;
      infoLink: string;
      canonicalVolumeLink: string
    };
    saleInfo: {
      country: string;
      saleability: string;
      isEbook: boolean
    };
    accessInfo: {
      country: string;
      viewability: string;
      embeddable: boolean;
      publicDomain: boolean;
      textToSpeechPermission: string;
      epub: { isAvailable: boolean };
      pdf: { isAvailable: boolean };
      webReaderLink: string;
      accessViewStatus: string;
      quoteSharingAllowed: boolean
    };
    searchInfo: { textSnippet: string }
  } | {
    kind: string;
    id: string;
    etag: string;
    selfLink: string;
    volumeInfo: {
      title: string;
      subtitle: string;
      authors: string[];
      publisher: string;
      publishedDate: string;
      description: string;
      industryIdentifiers: ({
        type: string;
        identifier: string
      })[];
      readingModes: {
        text: boolean;
        image: boolean
      };
      pageCount: number;
      printType: string;
      categories: string[];
      averageRating: number;
      ratingsCount: number;
      maturityRating: string;
      allowAnonLogging: boolean;
      contentVersion: string;
      panelizationSummary: {
        containsEpubBubbles: boolean;
        containsImageBubbles: boolean
      };
      imageLinks: {
        smallThumbnail: string;
        thumbnail: string
      };
      language: string;
      previewLink: string;
      infoLink: string;
      canonicalVolumeLink: string
    };
    saleInfo: {
      country: string;
      saleability: string;
      isEbook: boolean;
      listPrice: {
        amount: number;
        currencyCode: string
      };
      retailPrice: {
        amount: number;
        currencyCode: string
      };
      buyLink: string;
      offers: {
        finskyOfferType: number;
        listPrice: {
          amountInMicros: number;
          currencyCode: string
        };
        retailPrice: {
          amountInMicros: number;
          currencyCode: string
        };
        giftable: boolean
      }[]
    };
    accessInfo: {
      country: string;
      viewability: string;
      embeddable: boolean;
      publicDomain: boolean;
      textToSpeechPermission: string;
      epub: {
        isAvailable: boolean;
        acsTokenLink: string
      };
      pdf: { isAvailable: boolean };
      webReaderLink: string;
      accessViewStatus: string;
      quoteSharingAllowed: boolean
    };
    searchInfo: { textSnippet: string }
  } | {
    kind: string;
    id: string;
    etag: string;
    selfLink: string;
    volumeInfo: {
      title: string;
      authors: string[];
      publisher: string;
      publishedDate: string;
      description: string;
      industryIdentifiers: ({
        type: string;
        identifier: string
      })[];
      readingModes: {
        text: boolean;
        image: boolean
      };
      pageCount: number;
      printType: string;
      categories: string[];
      averageRating: number;
      ratingsCount: number;
      maturityRating: string;
      allowAnonLogging: boolean;
      contentVersion: string;
      imageLinks: {
        smallThumbnail: string;
        thumbnail: string
      };
      language: string;
      previewLink: string;
      infoLink: string;
      canonicalVolumeLink: string
    };
    saleInfo: {
      country: string;
      saleability: string;
      isEbook: boolean
    };
    accessInfo: {
      country: string;
      viewability: string;
      embeddable: boolean;
      publicDomain: boolean;
      textToSpeechPermission: string;
      epub: { isAvailable: boolean };
      pdf: { isAvailable: boolean };
      webReaderLink: string;
      accessViewStatus: string;
      quoteSharingAllowed: boolean
    };
    searchInfo: { textSnippet: string }
  } | {
    kind: string;
    id: string;
    etag: string;
    selfLink: string;
    volumeInfo: {
      title: string;
      subtitle: string;
      authors: string[];
      publisher: string;
      publishedDate: string;
      description: string;
      industryIdentifiers: ({
        type: string;
        identifier: string
      })[];
      readingModes: {
        text: boolean;
        image: boolean
      };
      pageCount: number;
      printType: string;
      categories: string[];
      averageRating: number;
      ratingsCount: number;
      maturityRating: string;
      allowAnonLogging: boolean;
      contentVersion: string;
      imageLinks: {
        smallThumbnail: string;
        thumbnail: string
      };
      language: string;
      previewLink: string;
      infoLink: string;
      canonicalVolumeLink: string
    };
    saleInfo: {
      country: string;
      saleability: string;
      isEbook: boolean
    };
    accessInfo: {
      country: string;
      viewability: string;
      embeddable: boolean;
      publicDomain: boolean;
      textToSpeechPermission: string;
      epub: {
        isAvailable: boolean;
        acsTokenLink: string
      };
      pdf: { isAvailable: boolean };
      webReaderLink: string;
      accessViewStatus: string;
      quoteSharingAllowed: boolean
    };
    searchInfo: { textSnippet: string }
  } | {
    kind: string;
    id: string;
    etag: string;
    selfLink: string;
    volumeInfo: {
      title: string;
      authors: string[];
      publisher: string;
      publishedDate: string;
      description: string;
      industryIdentifiers: ({
        type: string;
        identifier: string
      })[];
      readingModes: {
        text: boolean;
        image: boolean
      };
      pageCount: number;
      printType: string;
      categories: string[];
      maturityRating: string;
      allowAnonLogging: boolean;
      contentVersion: string;
      imageLinks: {
        smallThumbnail: string;
        thumbnail: string
      };
      language: string;
      previewLink: string;
      infoLink: string;
      canonicalVolumeLink: string
    };
    saleInfo: {
      country: string;
      saleability: string;
      isEbook: boolean
    };
    accessInfo: {
      country: string;
      viewability: string;
      embeddable: boolean;
      publicDomain: boolean;
      textToSpeechPermission: string;
      epub: { isAvailable: boolean };
      pdf: { isAvailable: boolean };
      webReaderLink: string;
      accessViewStatus: string;
      quoteSharingAllowed: boolean
    };
    searchInfo: { textSnippet: string }
  } | {
    kind: string;
    id: string;
    etag: string;
    selfLink: string;
    volumeInfo: {
      title: string;
      subtitle: string;
      authors: string[];
      publisher: string;
      publishedDate: string;
      description: string;
      industryIdentifiers: ({
        type: string;
        identifier: string
      })[];
      readingModes: {
        text: boolean;
        image: boolean
      };
      pageCount: number;
      printType: string;
      categories: string[];
      averageRating: number;
      ratingsCount: number;
      maturityRating: string;
      allowAnonLogging: boolean;
      contentVersion: string;
      panelizationSummary: {
        containsEpubBubbles: boolean;
        containsImageBubbles: boolean
      };
      imageLinks: {
        smallThumbnail: string;
        thumbnail: string
      };
      language: string;
      previewLink: string;
      infoLink: string;
      canonicalVolumeLink: string
    };
    saleInfo: {
      country: string;
      saleability: string;
      isEbook: boolean;
      listPrice: {
        amount: number;
        currencyCode: string
      };
      retailPrice: {
        amount: number;
        currencyCode: string
      };
      buyLink: string;
      offers: {
        finskyOfferType: number;
        listPrice: {
          amountInMicros: number;
          currencyCode: string
        };
        retailPrice: {
          amountInMicros: number;
          currencyCode: string
        };
        giftable: boolean
      }[]
    };
    accessInfo: {
      country: string;
      viewability: string;
      embeddable: boolean;
      publicDomain: boolean;
      textToSpeechPermission: string;
      epub: {
        isAvailable: boolean;
        acsTokenLink: string
      };
      pdf: {
        isAvailable: boolean;
        acsTokenLink: string
      };
      webReaderLink: string;
      accessViewStatus: string;
      quoteSharingAllowed: boolean
    };
    searchInfo: { textSnippet: string }
  } | {
    kind: string;
    id: string;
    etag: string;
    selfLink: string;
    volumeInfo: {
      title: string;
      subtitle: string;
      authors: string[];
      publisher: string;
      publishedDate: string;
      description: string;
      industryIdentifiers: ({
        type: string;
        identifier: string
      })[];
      readingModes: {
        text: boolean;
        image: boolean
      };
      pageCount: number;
      printType: string;
      categories: string[];
      maturityRating: string;
      allowAnonLogging: boolean;
      contentVersion: string;
      imageLinks: {
        smallThumbnail: string;
        thumbnail: string
      };
      language: string;
      previewLink: string;
      infoLink: string;
      canonicalVolumeLink: string
    };
    saleInfo: {
      country: string;
      saleability: string;
      isEbook: boolean
    };
    accessInfo: {
      country: string;
      viewability: string;
      embeddable: boolean;
      publicDomain: boolean;
      textToSpeechPermission: string;
      epub: { isAvailable: boolean };
      pdf: { isAvailable: boolean };
      webReaderLink: string;
      accessViewStatus: string;
      quoteSharingAllowed: boolean
    };
    searchInfo: { textSnippet: string }
  } | {
    kind: string;
    id: string;
    etag: string;
    selfLink: string;
    volumeInfo: {
      title: string;
      publisher: string;
      industryIdentifiers: ({
        type: string;
        identifier: string
      })[];
      readingModes: {
        text: boolean;
        image: boolean
      };
      printType: string;
      maturityRating: string;
      allowAnonLogging: boolean;
      contentVersion: string;
      panelizationSummary: {
        containsEpubBubbles: boolean;
        containsImageBubbles: boolean
      };
      imageLinks: {
        smallThumbnail: string;
        thumbnail: string
      };
      language: string;
      previewLink: string;
      infoLink: string;
      canonicalVolumeLink: string
    };
    saleInfo: {
      country: string;
      saleability: string;
      isEbook: boolean;
      listPrice: {
        amount: number;
        currencyCode: string
      };
      retailPrice: {
        amount: number;
        currencyCode: string
      };
      buyLink: string;
      offers: {
        finskyOfferType: number;
        listPrice: {
          amountInMicros: number;
          currencyCode: string
        };
        retailPrice: {
          amountInMicros: number;
          currencyCode: string
        };
        giftable: boolean
      }[]
    };
    accessInfo: {
      country: string;
      viewability: string;
      embeddable: boolean;
      publicDomain: boolean;
      textToSpeechPermission: string;
      epub: { isAvailable: boolean };
      pdf: { isAvailable: boolean };
      webReaderLink: string;
      accessViewStatus: string;
      quoteSharingAllowed: boolean
    }
  } | {
    kind: string;
    id: string;
    etag: string;
    selfLink: string;
    volumeInfo: {
      title: string;
      subtitle: string;
      authors: string[];
      publisher: string;
      publishedDate: string;
      description: string;
      industryIdentifiers: ({
        type: string;
        identifier: string
      })[];
      readingModes: {
        text: boolean;
        image: boolean
      };
      pageCount: number;
      printType: string;
      categories: string[];
      maturityRating: string;
      allowAnonLogging: boolean;
      contentVersion: string;
      imageLinks: {
        smallThumbnail: string;
        thumbnail: string
      };
      language: string;
      previewLink: string;
      infoLink: string;
      canonicalVolumeLink: string
    };
    saleInfo: {
      country: string;
      saleability: string;
      isEbook: boolean;
      listPrice: {
        amount: number;
        currencyCode: string
      };
      retailPrice: {
        amount: number;
        currencyCode: string
      };
      buyLink: string;
      offers: ({
        finskyOfferType: number;
        listPrice: {
          amountInMicros: number;
          currencyCode: string
        };
        retailPrice: {
          amountInMicros: number;
          currencyCode: string
        };
        giftable: boolean
      } | {
        finskyOfferType: number;
        listPrice: {
          amountInMicros: number;
          currencyCode: string
        };
        retailPrice: {
          amountInMicros: number;
          currencyCode: string
        };
        rentalDuration: {
          unit: string;
          count: number
        }
      })[]
    };
    accessInfo: {
      country: string;
      viewability: string;
      embeddable: boolean;
      publicDomain: boolean;
      textToSpeechPermission: string;
      epub: { isAvailable: boolean };
      pdf: {
        isAvailable: boolean;
        acsTokenLink: string
      };
      webReaderLink: string;
      accessViewStatus: string;
      quoteSharingAllowed: boolean
    };
    searchInfo: { textSnippet: string }
  } | {
    kind: string;
    id: string;
    etag: string;
    selfLink: string;
    volumeInfo: {
      title: string;
      subtitle: string;
      authors: string[];
      publisher: string;
      publishedDate: string;
      description: string;
      industryIdentifiers: ({
        type: string;
        identifier: string
      })[];
      readingModes: {
        text: boolean;
        image: boolean
      };
      pageCount: number;
      printType: string;
      categories: string[];
      averageRating: number;
      ratingsCount: number;
      maturityRating: string;
      allowAnonLogging: boolean;
      contentVersion: string;
      imageLinks: {
        smallThumbnail: string;
        thumbnail: string
      };
      language: string;
      previewLink: string;
      infoLink: string;
      canonicalVolumeLink: string
    };
    saleInfo: {
      country: string;
      saleability: string;
      isEbook: boolean
    };
    accessInfo: {
      country: string;
      viewability: string;
      embeddable: boolean;
      publicDomain: boolean;
      textToSpeechPermission: string;
      epub: { isAvailable: boolean };
      pdf: { isAvailable: boolean };
      webReaderLink: string;
      accessViewStatus: string;
      quoteSharingAllowed: boolean
    };
    searchInfo: { textSnippet: string }
  })[];
}