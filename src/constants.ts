import { BigDecimal, BigInt, Address, ByteArray, Bytes } from "@graphprotocol/graph-ts";

// Platform contract addresses
export let ZERO_ADDRESS = Address.fromString("0x0000000000000000000000000000000000000000");
export let BIGINT_ZERO = BigInt.fromI32(0);
export let EMPTY_BYTES = Bytes.fromHexString("0x00");
export let BIGINT_ONE = BigInt.fromI32(1);
export let BIGDECIMAL_ZERO = new BigDecimal(BIGINT_ZERO);

export let METADATA_REGISTRY = Address.fromString("0x468Cd53A86a5F00261487888aa0C5d48f25901d0");
export let HISTORIAN_METADATA_REGISTRY = Address.fromString("0x7e79289de44392982a84380A764CCFA86c8C0E79");