import { UpdatedDocument } from "../generated/PermissionedTokenMetadataRegistry/PermissionedTokenMetadataRegistry";
import { Affirmed, Tipped } from "../generated/SnapshotAffirmationVerifier/SnapshotAffirmationVerifier";

import { HashTip, Hash, HashAffirmation, HashAffirmedDocument } from "../generated/schema";
import { handleHashUpdatedMetadata } from "./hashHistory";
import { HISTORIAN_METADATA_REGISTRY } from "./constants";

export function handleUpdatedDocument(event: UpdatedDocument): void {
  let hashTokenId = event.params.tokenId.toHexString();
  let hash = Hash.load(hashTokenId);
  if (hash == null) {
    throw new Error("Hash does not exist");
  }
  let hashDocumentId = hashTokenId + '/' + event.params.key.toHexString();
  let hashDocument = HashAffirmedDocument.load(hashDocumentId);
  if (hashDocument == null) {
    hashDocument = new HashAffirmedDocument(hashDocumentId);
  } 
  hashDocument.key = event.params.key.toHexString();
  hashDocument.writer = event.params.writer;
  hashDocument.text = event.params.text;
  hashDocument.hash = event.params.tokenId.toHexString();
  hashDocument.createdAt = event.block.timestamp;
  hashDocument.save();
  handleHashUpdatedMetadata(event.params.tokenId, HISTORIAN_METADATA_REGISTRY, event.params.key, event.params.text, event.transaction.from, event.block.timestamp, event.block.number)
}

export function handleAffirmation(event: Affirmed): void {
  let hashDocumentId = event.params.tokenId.toHexString() + '/' + event.params.key.toHexString();

  let affirmationId = event.params.affirmationHash.toHexString();
  let affirmed = HashAffirmation.load(affirmationId);
  if (affirmed == null) {
    affirmed = new HashAffirmation(affirmationId);
  } 

  affirmed.signer = event.params.signer;
  affirmed.salt = event.params.salt;
  affirmed.signature = event.params.signature;
  affirmed.document = hashDocumentId;
  affirmed.createdAt = event.block.timestamp;
  affirmed.save();
}


export function handleTip(event: Tipped): void {
  let tip = HashTip.load(event.params.writeHash.toHexString());
  if (tip == null) {
    tip = new HashTip(event.params.writeHash.toHexString());
  } 

  tip.tipper = event.params.tipper;
  tip.value = event.params.value;
  tip.save();
}