# SPEC — Agent-Cards v1.0.0

## 1. Purpose

Bind canonical verbs to real agents with:
- Identity
- Runtime entrypoints
- Integrity guarantees

## 2. Conformance

An agent **conforms** if:
- Its card validates fully
- ENS TXT pointers resolve correctly
- Entry points support the declared verbs

## 3. x402 Alignment

Entry MUST be:
x402://<ens-name>/<verb>/v1


## 4. Trace Guarantees

Receipt MUST echo request trace.

## 5. Security

Cards MUST NOT include:
- Private URLs
- Credentials
- PII

---

Status: **Stable**







