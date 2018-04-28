import clientFactory from './clientFactory';
import { Asset, Entry, EntryCollection } from 'contentful';

type GetEntriesOfType = <T>(typeId: string) => Promise<EntryCollection<T>>;

const getEntriesOfType2: GetEntriesOfType = (typeId: string) => {
  const client = clientFactory();

  const query = {
    content_type: typeId,
    include: 10,
  };

  return client.getEntries(query);
};

type GetEntryOfType = <T>(entryId: string) => Promise<Entry<T>>;
const getEntry2: GetEntryOfType = (entryId: string) => {
  const client = clientFactory();
  return client.getEntry(entryId, { include: 10 });
};


const getAssetById2: (assetId: string) => Promise<Asset> = (assetId) => {
  const client = clientFactory();
  return client.getAsset(assetId);
};

// noinspection JSUnusedGlobalSymbols
export const getAssetById = getAssetById2;
export const getEntry = getEntry2;
export const getEntriesOfType = getEntriesOfType2;
