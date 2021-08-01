import { UpdatedDocument } from "../generated/MetadataRegistry/MetadataRegistry";
import { WroteSignedText } from "../generated/SignedTextMetadataWriter/SignedTextMetadataWriter";

import { Hash, HashDocument } from "../generated/schema";
import { METADATA_REGISTRY, EMPTY_BYTES } from "./constants";
import { handleHashUpdatedMetadata } from "./hashHistory";

export function handleWriteDocument(event: UpdatedDocument): void {
  let hashTokenId = event.params.tokenId.toHexString();

  let hashDocumentId = hashTokenId + '/' + event.params.key.toHexString();
  let hashDocument = HashDocument.load(hashDocumentId);
  if (hashDocument == null) {
    hashDocument = new HashDocument(hashDocumentId);
  }
  hashDocument.key = event.params.key.toHexString();
  hashDocument.writer = event.params.writer;
  hashDocument.text = event.params.text;
  hashDocument.hash = hashTokenId;
  hashDocument.createdAt = event.block.timestamp;
  hashDocument.save();
  handleHashUpdatedMetadata(event.params.tokenId, METADATA_REGISTRY, event.params.key, event.params.text, event.params.writer, event.block.timestamp, event.block.number)
}

export function handleWroteSignedText(event: WroteSignedText): void {
  let hashTokenId = event.params.tokenId.toHexString();

  let hashDocumentId = hashTokenId + '/' + event.params.key.toHexString();
  let hashDocument = HashDocument.load(hashDocumentId);
  if (hashDocument == null) {
    hashDocument = new HashDocument(hashDocumentId);
  } 
  hashDocument.key = event.params.key.toHexString();
  hashDocument.writer = event.params.writer;
  hashDocument.text = event.params.text;
  hashDocument.hash = event.params.tokenId.toHexString();
  hashDocument.createdAt = event.block.timestamp;
  hashDocument.signature = event.params.signature;
  hashDocument.fee = event.params.fee;
  hashDocument.save();
  handleHashUpdatedMetadata(event.params.tokenId, METADATA_REGISTRY, event.params.key, event.params.text, event.params.writer, event.block.timestamp, event.block.number)
}