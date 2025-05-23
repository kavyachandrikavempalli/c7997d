const fs = require("fs");
const path = require("path");
const axios = require("axios");

const BASE_URL = "https://api.avantos-dev.io/api/v1";

const config = {
  tenant_id: "123",
  action_blueprint_id: "bp_456",
  blueprint_version_id: "bpv_123",
  outputFile: "blueprint.json",
};

async function fetchBlueprintGraph({ tenant_id, action_blueprint_id, blueprint_version_id, outputFile }) {
  const url = `${BASE_URL}/${tenant_id}/actions/blueprints/${action_blueprint_id}/${blueprint_version_id}/graph`;

  try {
    const response = await axios.get(url, {
      headers: {
        Accept: "application/json, application/problem+json",
      },
    });

    const outputPath = path.join(__dirname, outputFile);
    fs.writeFileSync(outputPath, JSON.stringify(response.data, null, 2));
    console.log(`Blueprint graph saved to ${outputPath}`);
  } catch (error) {
    console.error("Failed to fetch blueprint graph:", error.message);
  }
}

fetchBlueprintGraph(config);
