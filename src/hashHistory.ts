import { Address, BigInt, Bytes } from "@graphprotocol/graph-ts";
import { Hash, HashHistoryUpdatedMetdata } from "../generated/schema";

export function handleHashUpdatedMetadata(id: BigInt, metadataRepository: Address, key: Bytes, text: string, writer: Address, timestamp: BigInt, blockNumber: BigInt): void {
  let hashUpdatedMetadataId = id.toHexString() + '/' + key.toHexString() + '/' + timestamp.toString();
  let hashUpdatedMetadata = HashHistoryUpdatedMetdata.load(hashUpdatedMetadataId);
  if (hashUpdatedMetadata == null) {
    hashUpdatedMetadata = new HashHistoryUpdatedMetdata(hashUpdatedMetadataId);
  }
  hashUpdatedMetadata.key = key.toHexString();
  hashUpdatedMetadata.writer = writer;
  hashUpdatedMetadata.metadataRepository = metadataRepository;
  hashUpdatedMetadata.text = text;
  hashUpdatedMetadata.hash = id.toHexString();
  hashUpdatedMetadata.createdAt = timestamp;
  hashUpdatedMetadata.createdAtBlockNum = blockNumber;
  hashUpdatedMetadata.save();
}