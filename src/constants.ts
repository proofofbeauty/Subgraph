import { BigDecimal, BigInt, Address } from "@graphprotocol/graph-ts";

// Platform contract addresses
export let TYPE_MASK = BigInt.fromString("0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF00000000000000000000000000000000");
export let ZERO_ADDRESS = Address.fromString("0x0000000000000000000000000000000000000000");
export let BIGINT_ZERO = BigInt.fromI32(0);
export let BIGINT_ONE = BigInt.fromI32(1);
export let BIGDECIMAL_ZERO = new BigDecimal(BIGINT_ZERO);