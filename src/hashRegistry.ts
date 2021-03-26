import { UpdatedRegistry } from "../generated/HashRegistry/HashRegistry";
import { Hash } from "../generated/schema";

function padHexString(str: string, length: number = 64): string {
  return `0x${str.slice(2).padStart(length, '0')}`;
}

export function handleUpdatedRegistry(event: UpdatedRegistry): void {
  let hashTokenId = event.params.tokenId.toHexString();
  let hash = Hash.load(hashTokenId);
  if (hash == null) {
    throw new Error("Hash does not exist");
  }
  hash.hash = event.params.txHash.toHexString();
  hash.save();
}