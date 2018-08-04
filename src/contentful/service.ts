import { Asset, Entry, createClient, ContentfulClientApi } from 'contentful';

let contentfulClient;

function getClient(): ContentfulClientApi {
  if (contentfulClient) return contentfulClient;
  contentfulClient = createClient({
    space: 'pjukj3n70qtm',
    // TODO: Use env variable to pass in secure token. In the meantime feel free to hack my hello world app.
    accessToken: 'b6364846253f7f4bf9a7bab27f482f066582a7db44783779bbc96e797666c7fe'
  });
  return contentfulClient;
}

export function getEntriesOfType<T>(content_type: string, include: number = 10) {
  return getClient().getEntries({ content_type, include });
}

export function getEntry<T>(entryId: string): Promise<Entry<T>> {
  return getClient().getEntry(entryId, { include: 10 });
}

export function getAssetById(assetId: string): Promise<Asset> {
  return getClient().getAsset(assetId);
}