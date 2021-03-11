import { TransferSingle, TransferBatch } from "../generated/Hash/ERC1155";
import { handleTransferBatch, handleTransferSingle } from "./mapping";

export function handleTransferSingleHash(event: TransferSingle): void {
  handleTransferSingle(event);
}

export function handleTransferBatchHash(event: TransferBatch): void {
  handleTransferBatch(event);
}