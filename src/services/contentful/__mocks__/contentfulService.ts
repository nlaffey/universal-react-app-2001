import { Asset, Entry } from 'contentful';

export function getEntriesOfType<T>(content_type: string, include: number = 10) {
  const mockEntry: any = { isMock: true };
  return Promise.resolve(mockEntry);
}

export function getEntry<T>(entryId: string): Promise<Entry<T>> {
  const mockEntry: any = { isGetEntryMock: true };
  return Promise.resolve(mockEntry);
}

export function getAssetById(assetId: string): Promise<Asset> {
  const mockEntry: any = { isGetAssetByIdMock: true };
  return Promise.resolve(mockEntry);
}
