---
title: "REPO: NOVA_Mock_Service"
state: "ACHIEVED"
date: "2025-10-25T03:05:10Z"
description: "This project serves as a Mock Service for the Nova 2025 Information Integration Tool Collaboration Project, aligning with the design of the \"Collaboration Integration Plan (Draft)\" to facilitate parallel development and integration testing between frontend, backend, and various teams."
githubUrl: "https://github.com/ChouYuanjue/NOVA_Mock_Service"
---

# Nova Mock Service User Guide

## Directory Structure
- `contracts/`         —— OpenAPI contract files (openapi.yaml)
- `samples/`           —— Golden JSON sample data for each endpoint
- `samples/ndjson/`    —— NDJSON samples for batch import
- `server/`            —— FastAPI mock service code
- `tools/`             —— Scripts for validation and checks

## Quick Start

### Method 1: Prism (Recommended, Automatic Contract-Based Mocking)
1. Install Node.js.
2. Install Prism globally:
   ```pwsh
   npm i -g @stoplight/prism-cli
   ```
3. Start the mock service (in the mock-service directory):
   ```pwsh
   prism mock contracts/openapi.yaml --port 4010
   ```
4. Access the endpoints:
   - http://localhost:4010/api/v1/docs
   - http://localhost:4010/api/v1/ai/summary
   - ... (All endpoints defined in the contract are accessible)

### Method 2: FastAPI Lightweight Mock
1. Install Python 3.10+.
2. Install dependencies:
   ```pwsh
   pip install fastapi uvicorn pydantic
   ```
3. Start the service (in the mock-service/server directory):
   ```pwsh
   uvicorn server:app --port 4011
   ```
4. Access the endpoints:
   - http://localhost:4011/api/v1/docs
   - http://localhost:4011/api/v1/ai/summary
   - http://localhost:4011/api/v1/preprocess/clean
   - http://localhost:4011/api/v1/imports/imp_123
   - http://localhost:4011/api/v1/bot/send
   - http://localhost:4011/graphql
   - ...

## How to Extend
- Add new endpoints:
  - Update the `contracts/openapi.yaml` file with new endpoints and schemas.
  - Add corresponding JSON samples in the `samples/` directory.
  - For the FastAPI method, add routes in `server/server.py`.
- Add new batch import samples:
  - Add NDJSON files in the `samples/ndjson/` directory.

## Debugging Guide

It is recommended to use [Apifox](https://apifox.com/) for API debugging and testing.

### Steps
1. **Import OpenAPI Contract**:
   - Open Apifox, create or select a project.
   - Import the `contracts/openapi.yaml` file.
2. **Validate Endpoints**:
   - View and test all defined endpoints in Apifox.
   - Ensure the API responses match the contract.
3. **Mock Data Testing**:
   - Use Apifox's mock functionality to quickly validate API responses.

Apifox enables efficient API debugging and contract validation, improving development and integration efficiency.

## Validation and Checks (Repository Scripts)
Some colleagues reported errors during execution (which I didn't notice as it worked fine locally). To improve the robustness of the mock service, I used an LLM to generate a batch of validation scripts. These may be added to CI in the future.

The `tools` directory contains simple scripts for quickly checking the quality of OpenAPI contracts locally:

- Check for duplicate mapping keys in YAML (using a strict loader):
   ```pwsh
   python tools/check_dup_yaml.py contracts/openapi.yaml
   ```

- Lint the contract using Spectral (requires installation or npx):
   ```pwsh
   # Using npx (no global installation required)
   npx @stoplight/spectral lint contracts/openapi.yaml --ruleset .spectral.yaml
   ```

## Notes
- All API response structures, fields, and examples align with the "Collaboration Integration Plan (Draft)".
- The Prism method is recommended for contract-driven development with automatic mocking.
- The FastAPI method is suitable for scenarios requiring custom logic or special responses.

If you encounter issues or need to add endpoints, feel free to supplement samples, contracts, or scripts in this directory and update the main documentation accordingly.
