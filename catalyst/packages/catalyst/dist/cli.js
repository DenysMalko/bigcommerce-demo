#!/usr/bin/env node

// src/cli/lib/crash-report.ts
import { confirm } from "@inquirer/prompts";

// package.json
var package_default = {
  name: "@bigcommerce/catalyst",
  version: "1.6.0",
  type: "module",
  repository: {
    type: "git",
    url: "https://github.com/bigcommerce/catalyst",
    directory: "packages/catalyst"
  },
  bin: {
    catalyst: "dist/cli.js"
  },
  files: [
    "dist",
    "templates"
  ],
  scripts: {
    dev: "tsup --watch",
    typecheck: "tsc --noEmit",
    lint: "eslint . --max-warnings 0",
    test: "vitest run",
    "test:watch": "vitest",
    "test:coverage": "vitest run --coverage",
    build: "tsup"
  },
  engines: {
    node: "^22.0.0 || ^24.0.0"
  },
  dependencies: {
    "@commander-js/extra-typings": "^14.0.0",
    "@inquirer/prompts": "^7.5.3",
    "@segment/analytics-node": "^2.2.1",
    "adm-zip": "^0.5.16",
    commander: "^14.0.0",
    conf: "^13.1.0",
    consola: "^3.4.2",
    "cross-spawn": "^7.0.6",
    dotenv: "^16.5.0",
    "dotenv-expand": "^10.0.0",
    execa: "^9.6.0",
    "fs-extra": "^11.3.0",
    "lodash.kebabcase": "^4.1.1",
    nypm: "^0.5.4",
    open: "^10.1.0",
    semver: "^7.7.4",
    "std-env": "^3.9.0",
    tar: "^7.5.7",
    tldts: "^7.4.12",
    "yocto-spinner": "^1.0.0",
    zod: "^4.0.5"
  },
  devDependencies: {
    "@bigcommerce/eslint-config": "^2.11.0",
    "@bigcommerce/eslint-config-catalyst": "workspace:^",
    "@types/adm-zip": "^0.5.7",
    "@types/cross-spawn": "^6.0.6",
    "@types/fs-extra": "^11.0.4",
    "@types/lodash.kebabcase": "^4.1.9",
    "@types/node": "^22.15.30",
    "@types/semver": "^7.7.0",
    "@vitest/coverage-v8": "^3.2.4",
    "@vitest/ui": "^3.2.4",
    eslint: "^8.57.1",
    msw: "^2.9.0",
    prettier: "^3.6.2",
    tsup: "^8.5.0",
    typescript: "^5.8.3",
    vitest: "^3.2.4"
  },
  peerDependencies: {
    "@opennextjs/cloudflare": "^1.20.15"
  },
  peerDependenciesMeta: {
    "@opennextjs/cloudflare": {
      optional: true
    }
  }
};

// src/cli/lib/can-prompt.ts
function canPrompt() {
  return Boolean(process.stdin.isTTY) && !process.env.CI;
}

// src/cli/lib/command-path.ts
function getCommandPath(cmd) {
  const parts = [];
  let current = cmd;
  while (current.parent) {
    parts.unshift(current.name());
    current = current.parent;
  }
  return parts.join(" ");
}

// src/cli/lib/diagnostics-section.ts
import { homedir } from "os";

// src/cli/lib/collect-diagnostics.ts
import { parse } from "dotenv";
import { existsSync as existsSync2, readFileSync as readFileSync2 } from "fs";
import { release } from "os";
import { dirname, join as join3 } from "path";
import { z as z2 } from "zod";

// src/cli/lib/detect-package-manager.ts
import { access } from "fs/promises";
import { join } from "path";
import { detectPackageManager as detectFromDir } from "nypm";
var PROJECT_LOCKFILES = [
  ["pnpm-lock.yaml", "pnpm"],
  ["yarn.lock", "yarn"],
  ["bun.lock", "bun"],
  ["bun.lockb", "bun"],
  ["package-lock.json", "npm"]
];
var detectLockfileManager = async (dir) => {
  const found = await Promise.all(
    PROJECT_LOCKFILES.map(
      async ([file, manager]) => access(join(dir, file)).then(() => manager).catch(() => null)
    )
  );
  return found.find((manager) => manager !== null) ?? null;
};
var detectPackageManager = () => {
  const userAgent = process.env.npm_config_user_agent ?? "";
  const name = userAgent.split(" ")[0]?.split("/")[0];
  if (name === "pnpm" || name === "yarn" || name === "bun") {
    return name;
  }
  if (process.versions.bun) {
    return "bun";
  }
  return "npm";
};
var detectProjectPackageManager = async (projectDir) => {
  const detected = await detectFromDir(projectDir);
  const name = detected?.name;
  if (name === "pnpm" || name === "yarn" || name === "bun" || name === "npm") {
    return name;
  }
  return "npm";
};

// src/cli/lib/project-state.ts
import { existsSync, readFileSync } from "fs";
import { join as join2 } from "path";
import { z } from "zod";
var projectJsonSchema = z.looseObject({
  projectUuid: z.string().optional()
});
var packageJsonSchema = z.looseObject({
  dependencies: z.record(z.string(), z.string()).optional()
});
var safeReadJson = (path) => {
  try {
    return JSON.parse(readFileSync(path, "utf-8"));
  } catch {
    return null;
  }
};
function getProjectState(cwd = process.cwd()) {
  const projectJson = projectJsonSchema.safeParse(
    safeReadJson(join2(cwd, ".bigcommerce", "project.json"))
  );
  const projectUuid = projectJson.success ? projectJson.data.projectUuid : void 0;
  const hasMiddleware = existsSync(join2(cwd, "middleware.ts"));
  const hasProxy = existsSync(join2(cwd, "proxy.ts"));
  const pkgJson = packageJsonSchema.safeParse(safeReadJson(join2(cwd, "package.json")));
  const hasOpenNextDep = pkgJson.success ? Boolean(pkgJson.data.dependencies?.["@opennextjs/cloudflare"]) : false;
  const isLinked = Boolean(projectUuid);
  const isTransformed = hasOpenNextDep;
  const isFullySetUp = isLinked && isTransformed;
  return {
    projectUuid,
    hasMiddleware,
    hasProxy,
    hasOpenNextDep,
    isLinked,
    isTransformed,
    isFullySetUp
  };
}

// src/cli/lib/telemetry.ts
import { Analytics } from "@segment/analytics-node";
import { randomBytes, randomUUID } from "crypto";

// src/cli/lib/user-config.ts
import Conf from "conf";
var userConfigInstance;
function getUserConfig() {
  userConfigInstance ?? (userConfigInstance = new Conf({
    projectName: "catalyst-cli",
    projectSuffix: "",
    configName: "config",
    schema: {
      telemetry: {
        type: "object",
        properties: {
          enabled: { type: "boolean" },
          anonymousId: { type: "string" }
        }
      },
      survey: {
        type: "object",
        properties: {
          lastShownAt: { type: "number" }
        }
      }
    }
  }));
  return userConfigInstance;
}

// src/cli/lib/telemetry.ts
var TELEMETRY_KEY_ENABLED = "telemetry.enabled";
var TELEMETRY_KEY_ID = `telemetry.anonymousId`;
var TELEMETRY_FLUSH_INTERVAL_MS = 200;
var TELEMETRY_HTTP_REQUEST_TIMEOUT_MS = 200;
var Telemetry = class {
  constructor() {
    this.commandName = "unknown";
    this.projectName = "catalyst-cli";
    this.projectVersion = package_default.version;
    this.setEnabled = (_enabled) => {
      const enabled = Boolean(_enabled);
      this.userConfig.set("telemetry.enabled", enabled);
    };
    this.CATALYST_TELEMETRY_DISABLED = process.env.CATALYST_TELEMETRY_DISABLED;
    this.userConfig = getUserConfig();
    this.correlationId = randomUUID();
    this.startTime = Date.now();
    this.analytics = new Analytics({
      writeKey: "not-a-valid-segment-write-key",
      flushInterval: TELEMETRY_FLUSH_INTERVAL_MS,
      httpRequestTimeout: TELEMETRY_HTTP_REQUEST_TIMEOUT_MS,
      maxRetries: 0
    });
  }
  durationMs() {
    return Date.now() - this.startTime;
  }
  async track(eventName, payload) {
    if (!this.isEnabled()) {
      return Promise.resolve(void 0);
    }
    this.analytics.track({
      event: eventName,
      anonymousId: this.getAnonymousId(),
      properties: {
        ...payload,
        correlationId: this.correlationId,
        nodeVersion: process.version,
        platform: process.platform,
        arch: process.arch,
        cliVersion: package_default.version
      },
      context: {
        app: {
          name: this.projectName,
          version: this.projectVersion
        }
      }
    });
  }
  async identify(storeHash) {
    if (!this.isEnabled()) {
      return Promise.resolve(void 0);
    }
    if (!storeHash) {
      return Promise.resolve(void 0);
    }
    this.analytics.identify({
      userId: storeHash,
      anonymousId: this.getAnonymousId(),
      context: {
        app: {
          name: this.projectName,
          version: this.projectVersion
        }
      }
    });
  }
  isEnabled() {
    return !this.CATALYST_TELEMETRY_DISABLED && this.userConfig.get(TELEMETRY_KEY_ENABLED, true);
  }
  getAnonymousId() {
    const val = this.userConfig.get(TELEMETRY_KEY_ID);
    if (val) {
      return val;
    }
    const generated = randomBytes(32).toString("hex");
    this.userConfig.set(TELEMETRY_KEY_ID, generated);
    return generated;
  }
};
var telemetryInstance;
function getTelemetry() {
  telemetryInstance ?? (telemetryInstance = new Telemetry());
  return telemetryInstance;
}

// src/cli/lib/collect-diagnostics.ts
var CLI_ENV_VARS = [
  "CATALYST_STORE_HASH",
  "CATALYST_ACCESS_TOKEN",
  "CATALYST_PROJECT_UUID",
  "CATALYST_API_HOST",
  "BIGCOMMERCE_LOGIN_URL",
  "CATALYST_TELEMETRY_DISABLED"
];
var BUILD_ENV_VARS = [
  "BIGCOMMERCE_STORE_HASH",
  "BIGCOMMERCE_STOREFRONT_TOKEN",
  "BIGCOMMERCE_CHANNEL_ID",
  "AUTH_SECRET"
];
var ENV_FILES = [".env.local", ".env"];
var PROJECT_LOCKFILES2 = [
  ["pnpm-lock.yaml", "pnpm"],
  ["yarn.lock", "yarn"],
  ["bun.lock", "bun"],
  ["bun.lockb", "bun"],
  ["package-lock.json", "npm"]
];
var hasValue = (value) => value !== void 0 && value.trim() !== "";
var buildEnvLayers = (cwd, env2) => {
  const layers = [{ source: "process.env", values: env2 }];
  ENV_FILES.forEach((file) => {
    const path = join3(cwd, file);
    if (!existsSync2(path)) {
      return;
    }
    try {
      layers.push({ source: file, values: parse(readFileSync2(path, "utf-8")) });
    } catch {
    }
  });
  return layers;
};
var resolveEnvSource = (layers, ...keys) => layers.find((layer) => keys.some((key) => hasValue(layer.values[key])))?.source;
var resolveEnvVars = (layers, names) => Object.fromEntries(names.map((name) => [name, resolveEnvSource(layers, name) ?? "unset"]));
var resolveValue = (envSource, configValue) => {
  if (envSource) {
    return { present: true, source: envSource };
  }
  if (hasValue(configValue)) {
    return { present: true, source: "project.json" };
  }
  return { present: false, source: "unset" };
};
var asString = (value) => typeof value === "string" ? value : void 0;
var lockfileManager = (dir) => PROJECT_LOCKFILES2.find(([file]) => existsSync2(join3(dir, file)))?.[1];
var detectProjectPackageManager2 = (cwd) => {
  let dir = cwd;
  for (; ; ) {
    const match = lockfileManager(dir);
    if (match) {
      return match;
    }
    const parent = dirname(dir);
    if (parent === dir) {
      return detectPackageManager();
    }
    dir = parent;
  }
};
var projectJsonSchema2 = z2.looseObject({});
var safeReadJson2 = (path) => {
  try {
    return JSON.parse(readFileSync2(path, "utf-8"));
  } catch {
    return null;
  }
};
var readProjectJson = (cwd) => {
  const result = projectJsonSchema2.safeParse(
    safeReadJson2(join3(cwd, ".bigcommerce", "project.json"))
  );
  return result.success ? result.data : null;
};
var storefrontPackageSchema = z2.looseObject({
  name: z2.string().optional(),
  version: z2.string().optional(),
  catalyst: z2.looseObject({ version: z2.string().optional() }).optional()
});
var readStorefrontInfo = (cwd) => {
  const result = storefrontPackageSchema.safeParse(safeReadJson2(join3(cwd, "package.json")));
  if (!result.success) {
    return { name: null, version: null };
  }
  return {
    name: result.data.name ?? null,
    version: result.data.catalyst?.version ?? result.data.version ?? null
  };
};
var readStoredEnvKeys = (projectJson) => {
  const env2 = projectJson?.env;
  if (typeof env2 === "object" && env2 !== null && !Array.isArray(env2)) {
    return Object.keys(env2).sort();
  }
  return [];
};
function collectDiagnostics({
  cwd = process.cwd(),
  env: env2 = process.env
} = {}) {
  const state = getProjectState(cwd);
  const telemetry2 = getTelemetry();
  const projectJson = readProjectJson(cwd);
  const storefront = readStorefrontInfo(cwd);
  const cliEnv = [{ source: "process.env", values: env2 }];
  const buildEnv = buildEnvLayers(cwd, env2);
  return {
    cli: {
      name: package_default.name,
      version: package_default.version
    },
    runtime: {
      node: process.version,
      platform: process.platform,
      arch: process.arch,
      osRelease: release(),
      packageManager: detectProjectPackageManager2(cwd)
    },
    project: {
      cwd,
      storefrontName: storefront.name,
      storefrontVersion: storefront.version,
      projectUuid: state.projectUuid ?? null,
      isLinked: state.isLinked,
      isTransformed: state.isTransformed,
      isFullySetUp: state.isFullySetUp,
      hasMiddleware: state.hasMiddleware,
      hasProxy: state.hasProxy,
      hasOpenNextDep: state.hasOpenNextDep
    },
    config: {
      storeHash: resolveValue(
        resolveEnvSource(cliEnv, "CATALYST_STORE_HASH", "BIGCOMMERCE_STORE_HASH"),
        asString(projectJson?.storeHash)
      ),
      accessToken: resolveValue(
        resolveEnvSource(cliEnv, "CATALYST_ACCESS_TOKEN"),
        asString(projectJson?.accessToken)
      ),
      projectUuid: resolveValue(
        resolveEnvSource(cliEnv, "CATALYST_PROJECT_UUID"),
        asString(projectJson?.projectUuid)
      ),
      apiHost: resolveValue(
        resolveEnvSource(cliEnv, "CATALYST_API_HOST"),
        asString(projectJson?.apiHost)
      ),
      projectJsonKeys: projectJson ? Object.keys(projectJson).sort() : [],
      storedEnvKeys: readStoredEnvKeys(projectJson),
      cliEnvVars: resolveEnvVars(cliEnv, CLI_ENV_VARS),
      buildEnvVars: resolveEnvVars(buildEnv, BUILD_ENV_VARS)
    },
    telemetry: {
      enabled: telemetry2.isEnabled(),
      correlationId: telemetry2.correlationId
    },
    files: {
      ".env.local": existsSync2(join3(cwd, ".env.local")),
      ".env": existsSync2(join3(cwd, ".env")),
      ".bigcommerce/project.json": existsSync2(join3(cwd, ".bigcommerce", "project.json")),
      ".bigcommerce/wrangler.jsonc": existsSync2(join3(cwd, ".bigcommerce", "wrangler.jsonc")),
      ".open-next/": existsSync2(join3(cwd, ".open-next")),
      "package.json": existsSync2(join3(cwd, "package.json"))
    }
  };
}

// src/cli/lib/format-diagnostics.ts
var yesNo = (value) => value ? "yes" : "no";
var presence = (value) => value ? "present" : "absent";
var formatResolved = (value) => value.present ? `present (source: ${value.source})` : "not set";
var formatSource = (source) => source === "unset" ? "not set" : `set (${source})`;
var formatStorefront = (name, version2) => {
  if (!version2) {
    return "(unknown)";
  }
  return name ? `${name}@${version2}` : version2;
};
var formatList = (values) => values.length > 0 ? values.join(", ") : "(none)";
var envVarLines = (vars) => Object.entries(vars).map(([name, source]) => `  ${name}: ${formatSource(source)}`);
var formatDiagnosticsReport = (d) => {
  const lines = [
    "Catalyst CLI Diagnostics",
    "",
    "CLI",
    `  Package:            ${d.cli.name}`,
    `  Version:            ${d.cli.version}`,
    "",
    "Runtime",
    `  Node:               ${d.runtime.node}`,
    `  Platform:           ${d.runtime.platform} (${d.runtime.arch})`,
    `  OS release:         ${d.runtime.osRelease}`,
    `  Package manager:    ${d.runtime.packageManager}`,
    "",
    "Project",
    `  Directory:          ${d.project.cwd}`,
    `  Storefront:         ${formatStorefront(d.project.storefrontName, d.project.storefrontVersion)}`,
    `  Project UUID:       ${d.project.projectUuid ?? "(not linked)"}`,
    `  Linked:             ${yesNo(d.project.isLinked)}`,
    `  Transformed:        ${yesNo(d.project.isTransformed)}`,
    `  Fully set up:       ${yesNo(d.project.isFullySetUp)}`,
    `  middleware.ts:      ${presence(d.project.hasMiddleware)}`,
    `  proxy.ts:           ${presence(d.project.hasProxy)}`,
    `  OpenNext dep:       ${d.project.hasOpenNextDep ? "installed" : "not installed"}`,
    "",
    "Config (resolved without secrets)",
    `  Store hash:         ${formatResolved(d.config.storeHash)}`,
    `  Access token:       ${formatResolved(d.config.accessToken)}`,
    `  Project UUID:       ${formatResolved(d.config.projectUuid)}`,
    `  API host:           ${d.config.apiHost.present ? formatResolved(d.config.apiHost) : "default (api.bigcommerce.com)"}`,
    `  project.json keys:  ${formatList(d.config.projectJsonKeys)}`,
    `  Stored env keys:    ${formatList(d.config.storedEnvKeys)}`,
    "",
    "CLI environment variables (used to run the CLI)",
    ...envVarLines(d.config.cliEnvVars),
    "",
    "Build environment variables (used to build the Next.js app)",
    ...envVarLines(d.config.buildEnvVars),
    "",
    "Telemetry",
    `  Enabled:            ${yesNo(d.telemetry.enabled)}`,
    `  Correlation ID:     ${d.telemetry.correlationId}`,
    "",
    "Files",
    ...Object.entries(d.files).map(([name, exists]) => `  ${name}: ${presence(exists)}`)
  ];
  return lines.join("\n");
};

// src/cli/lib/diagnostics-section.ts
function redactHome(text) {
  const home = homedir();
  return home ? text.split(home).join("~") : text;
}
function diagnosticsReportSection() {
  return {
    title: "Catalyst CLI diagnostics",
    body: redactHome(formatDiagnosticsReport(collectDiagnostics()))
  };
}

// src/cli/lib/errors.ts
var UserActionableError = class extends Error {
  constructor(message) {
    super(message);
    this.name = "UserActionableError";
  }
};

// src/cli/lib/auth-errors.ts
var UnauthorizedError = class extends UserActionableError {
  constructor() {
    super(
      "Your access token is invalid or has expired.\nRun `catalyst auth login` to re-authenticate."
    );
    this.name = "UnauthorizedError";
  }
};
function assertAuthorized(response) {
  if (response.status === 401) {
    throw new UnauthorizedError();
  }
}

// src/cli/lib/http-errors.ts
import { z as z3 } from "zod";
var apiErrorBodySchema = z3.object({
  title: z3.string().optional(),
  detail: z3.string().optional(),
  errors: z3.record(z3.string(), z3.string()).optional()
});
var FALLBACK_CLIENT_ERROR = "The request was rejected. Check your input \u2014 your access token may be missing a required scope, or the resource may not exist.";
var FALLBACK_SERVER_ERROR = "Something went wrong on our end. Please try again. If the issue persists, contact support.";
function extractApiErrorMessage(body) {
  const parsed = apiErrorBodySchema.safeParse(body);
  if (!parsed.success) return void 0;
  const { title, detail, errors } = parsed.data;
  const fieldErrors = errors && Object.keys(errors).length > 0 ? Object.entries(errors).map(([field, message]) => `${field}: ${message}`).join("; ") : void 0;
  const headline = detail ?? title;
  if (headline && fieldErrors) return `${headline} (${fieldErrors})`;
  return headline ?? fieldErrors;
}
async function httpError(response, action) {
  const body = await response.json().catch(() => null);
  const isServerError = response.status >= 500;
  const detail = extractApiErrorMessage(body) ?? (isServerError ? FALLBACK_SERVER_ERROR : FALLBACK_CLIENT_ERROR);
  const message = `${action}: ${detail}`;
  return isServerError ? new Error(message) : new UserActionableError(message);
}

// src/cli/lib/feedback.ts
var MAX_TITLE_LENGTH = 200;
var MAX_DESCRIPTION_LENGTH = 5e3;
var MAX_DIAGNOSTICS_BODY_LENGTH = 1e5;
function validateFeedbackField(field, value) {
  const maxLength = field === "Title" ? MAX_TITLE_LENGTH : MAX_DESCRIPTION_LENGTH;
  const length = Array.from(value.trim()).length;
  if (length === 0) {
    return `${field} is required.`;
  }
  if (length > maxLength) {
    return `${field} must be at most ${maxLength} characters (got ${length}).`;
  }
  return void 0;
}
async function submitFeedback(feedback2, storeHash, accessToken, apiHost, { source = "catalyst-cli", signal } = {}) {
  const response = await fetch(`https://${apiHost}/stores/${storeHash}/v3/feedback`, {
    method: "POST",
    signal,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "X-Auth-Token": accessToken,
      "X-Correlation-Id": getTelemetry().correlationId
    },
    body: JSON.stringify({ ...feedback2, source })
  });
  assertAuthorized(response);
  if (!response.ok) {
    throw await httpError(response, "Failed to submit feedback");
  }
}

// src/cli/lib/logger.ts
import { createConsola } from "consola";
var consola = createConsola({
  level: "3" ? parseInt("3", 10) : 3,
  // Drop the per-line timestamp. It adds noise for a short-lived CLI and, on
  // long lines, consola can't right-align it so it falls back to an inline
  // `[time]` prefix that breaks copy-pasteable command suggestions.
  formatOptions: { date: false }
});

// src/cli/lib/project-config.ts
import Conf2 from "conf";
import { join as join4 } from "path";
function getProjectConfig(cwd = process.cwd()) {
  return new Conf2({
    cwd: join4(cwd, ".bigcommerce"),
    projectSuffix: "",
    configName: "project",
    schema: {
      projectUuid: { type: "string", format: "uuid" },
      framework: {
        type: "string",
        enum: ["catalyst"],
        default: "catalyst"
      },
      storeHash: { type: "string" },
      accessToken: { type: "string" },
      apiHost: { type: "string" },
      env: {
        type: "object",
        additionalProperties: { type: "string" },
        default: {}
      },
      declinedSiteUrlChannels: {
        type: "array",
        items: { type: "number" }
      },
      declinedCheckoutUrlChannels: {
        type: "array",
        items: { type: "number" }
      }
    }
  });
}

// src/cli/lib/shared-options.ts
import { Option } from "commander";

// src/cli/lib/auth.ts
import { z as z4 } from "zod";
var DEVICE_OAUTH_CLIENT_ID = "b8063bu6hhml4e0lqh22yut63atsbyv";
var DEVICE_OAUTH_SCOPES = [
  "store_v2_information",
  "store_v2_products",
  "store_v2_content",
  "store_sites",
  "store_storefront_api",
  "store_infrastructure_deployments_manage",
  "store_infrastructure_logs_read_only",
  "store_infrastructure_projects_manage",
  "store_channel_settings"
].join(" ");
var DEFAULT_LOGIN_URL = "https://login.bigcommerce.com";
var DeviceCodeResponseSchema = z4.object({
  device_code: z4.string(),
  user_code: z4.string(),
  verification_uri: z4.string(),
  expires_in: z4.number(),
  interval: z4.number()
});
var DeviceCodeSuccessSchema = z4.object({
  access_token: z4.string(),
  store_hash: z4.string(),
  context: z4.string(),
  api_uri: z4.string()
});
async function requestDeviceCode(loginUrl) {
  const response = await fetch(`${loginUrl}/device/token`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      client_id: DEVICE_OAUTH_CLIENT_ID,
      scopes: DEVICE_OAUTH_SCOPES
    })
  });
  if (!response.ok) {
    throw await httpError(response, "Failed to request device code");
  }
  const res = await response.json();
  return DeviceCodeResponseSchema.parse(res);
}
async function pollDeviceToken(loginUrl, deviceCode) {
  const response = await fetch(`${loginUrl}/device/token`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      device_code: deviceCode,
      client_id: DEVICE_OAUTH_CLIENT_ID
    })
  });
  if (response.status !== 200) {
    return null;
  }
  const res = await response.json();
  return DeviceCodeSuccessSchema.parse(res);
}
async function waitForDeviceToken(loginUrl, deviceCode, interval) {
  const credentials = await pollDeviceToken(loginUrl, deviceCode);
  if (credentials) {
    return credentials;
  }
  await new Promise((resolve2) => {
    setTimeout(resolve2, interval * 1e3);
  });
  return waitForDeviceToken(loginUrl, deviceCode, interval);
}

// src/cli/lib/shared-options.ts
var DEFAULT_API_HOST = "api.bigcommerce.com";
var storeHashOption = () => new Option(
  "--store-hash <hash>",
  "BigCommerce store hash. Can be found in the URL of your store Control Panel. Read from CATALYST_STORE_HASH or .bigcommerce/project.json when not provided."
).env("CATALYST_STORE_HASH");
var accessTokenOption = () => new Option(
  "--access-token <token>",
  "BigCommerce access token. Can be found after creating a store-level API account. Read from CATALYST_ACCESS_TOKEN or .bigcommerce/project.json when not provided."
).env("CATALYST_ACCESS_TOKEN");
var apiHostOption = () => new Option(
  "--api-host <host>",
  "BigCommerce API host. Read from .bigcommerce/project.json or CATALYST_API_HOST when not provided. Defaults to api.bigcommerce.com."
).env("CATALYST_API_HOST").hideHelp();
var loginUrlOption = () => new Option("--login-url <url>", "BigCommerce login URL.").env("BIGCOMMERCE_LOGIN_URL").default(DEFAULT_LOGIN_URL).hideHelp();
var projectUuidOption = () => new Option(
  "--project-uuid <uuid>",
  "BigCommerce infrastructure project UUID. Read from CATALYST_PROJECT_UUID or .bigcommerce/project.json when not provided."
).env("CATALYST_PROJECT_UUID");
var envPathOption = () => new Option(
  "--env-path <path>",
  "Path to an environment file to load (relative to the current working directory). Its variables are used by the build and the deployed storefront. When omitted, .env.local and .env are auto-loaded from the current directory. CLI options such as --project-uuid are not read from it. Other commands never load env files."
);
var resolveProjectUuid = (options) => {
  const config2 = getProjectConfig();
  const projectUuid = options.projectUuid ?? config2.get("projectUuid");
  if (!projectUuid) {
    throw new Error(
      "Project UUID is required. Please run either `catalyst projects link` or `catalyst projects create` or this command again with --project-uuid <uuid>."
    );
  }
  return projectUuid;
};
var resolveApiHost = (options, config2) => options.apiHost ?? config2.get("apiHost") ?? DEFAULT_API_HOST;

// src/cli/lib/prompt-context.ts
var PROMPT_TIMEOUT_MS = 2 * 60 * 1e3;
var SUBMIT_TIMEOUT_MS = 5e3;
var QUIET_PROMPT_ERRORS = /* @__PURE__ */ new Set(["ExitPromptError", "AbortPromptError"]);
var isQuietPromptError = (error) => error instanceof Error && QUIET_PROMPT_ERRORS.has(error.name);
function hintsDisabled(program2) {
  const options = program2.opts();
  return options.hints === false || Boolean(process.env.CATALYST_NO_HINTS);
}
var asString2 = (value) => typeof value === "string" ? value : void 0;
function resolveCommandCredentials(command) {
  const options = command?.opts() ?? {};
  const config2 = getProjectConfig();
  const storeHash = asString2(options.storeHash) ?? config2.get("storeHash");
  const accessToken = asString2(options.accessToken) ?? config2.get("accessToken");
  if (!storeHash || !accessToken) {
    return void 0;
  }
  return {
    storeHash,
    accessToken,
    apiHost: resolveApiHost({ apiHost: asString2(options.apiHost) }, config2)
  };
}

// src/cli/lib/crash-report.ts
var REPORT_HINT = "To report this error, run `catalyst feedback`.";
var activeCommand;
var recordActiveCommand = (_program, command) => {
  activeCommand = command;
};
var truncate = (text, max) => {
  const chars = Array.from(text);
  return chars.length > max ? `${chars.slice(0, max - 1).join("")}\u2026` : text;
};
function buildCrashReport(error, correlationId, commandName) {
  const message = redactHome(error instanceof Error ? error.message : String(error)).trim() || "Unknown error";
  const stack = error instanceof Error && error.stack ? redactHome(error.stack) : message;
  const [firstLine = message] = message.split("\n");
  const prefix = commandName ? `CLI error in \`${commandName}\`` : "CLI error";
  return {
    title: truncate(`${prefix}: ${firstLine}`, MAX_TITLE_LENGTH),
    description: truncate(message, MAX_DESCRIPTION_LENGTH),
    diagnostics: [
      {
        title: "Error",
        body: truncate(
          [
            `Command: ${commandName ?? "(none)"}`,
            `Correlation ID: ${correlationId}`,
            `CLI version: ${package_default.version}`,
            "",
            stack
          ].join("\n"),
          MAX_DIAGNOSTICS_BODY_LENGTH
        )
      },
      diagnosticsReportSection()
    ]
  };
}
async function offerCrashReport({
  error,
  program: program2,
  correlationId
}) {
  try {
    if (isQuietPromptError(error) || hintsDisabled(program2)) {
      return;
    }
    const credentials = resolveCommandCredentials(activeCommand);
    if (!canPrompt() || !credentials) {
      consola.info(REPORT_HINT);
      return;
    }
    const send = await confirm(
      {
        message: "Send an error report to BigCommerce? It includes the error, the CLI version, and the `catalyst debug` report (no secret values).",
        default: false
      },
      { signal: AbortSignal.timeout(PROMPT_TIMEOUT_MS) }
    );
    if (!send) {
      return;
    }
    await submitFeedback(
      buildCrashReport(error, correlationId, activeCommand && getCommandPath(activeCommand)),
      credentials.storeHash,
      credentials.accessToken,
      credentials.apiHost,
      { source: "catalyst-cli-crash", signal: AbortSignal.timeout(SUBMIT_TIMEOUT_MS) }
    );
    consola.success("Error report sent. Thank you!");
  } catch (reportError) {
    if (isQuietPromptError(reportError)) {
      return;
    }
    consola.debug(reportError);
    consola.warn(`Could not send the error report. ${REPORT_HINT}`);
  }
}

// src/cli/program.ts
import { Command as Command16 } from "commander";
import { colorize as colorize14 } from "consola/utils";

// src/cli/commands/auth.ts
import { Command, Option as Option2 } from "commander";
import { z as z7 } from "zod";

// src/cli/lib/login.ts
import { confirm as confirm2, input, password } from "@inquirer/prompts";
import { colorize } from "consola/utils";
import open from "open";
import yoctoSpinner from "yocto-spinner";
import { z as z5 } from "zod";

// src/cli/lib/clipboard.ts
import { execa } from "execa";
function clipboardCommand() {
  switch (process.platform) {
    case "darwin":
      return { command: "pbcopy", args: [] };
    case "win32":
      return { command: "clip", args: [] };
    case "linux":
      return process.env.WAYLAND_DISPLAY ? { command: "wl-copy", args: [] } : { command: "xclip", args: ["-selection", "clipboard"] };
    default:
      return null;
  }
}
async function copyToClipboard(text) {
  const clipboard = clipboardCommand();
  if (!clipboard) {
    return false;
  }
  try {
    await execa(clipboard.command, clipboard.args, { input: text });
    return true;
  } catch {
    return false;
  }
}

// src/cli/lib/login.ts
var LoginAbortedError = class extends Error {
  constructor() {
    super("Login aborted by user.");
    this.name = "LoginAbortedError";
  }
};
var StoreProfileSchema = z5.object({
  data: z5.object({
    store_name: z5.string()
  })
});
async function fetchStoreProfile(storeHash, accessToken, apiHost) {
  const response = await fetch(`https://${apiHost}/stores/${storeHash}/v3/settings/store/profile`, {
    method: "GET",
    headers: {
      "X-Auth-Token": accessToken,
      Accept: "application/json"
    }
  });
  if (!response.ok) {
    throw new Error(`${response.status} ${response.statusText}`);
  }
  const res = await response.json();
  const result = StoreProfileSchema.safeParse(res);
  if (!result.success) {
    throw new Error("Unexpected response from store profile API");
  }
  return result.data.data;
}
async function deviceCodeLogin(loginUrl) {
  const deviceCode = await requestDeviceCode(loginUrl);
  consola.info(
    `${colorize("yellow", "Your one-time code:")} ${colorize("bold", deviceCode.user_code)}`
  );
  if (process.stdin.isTTY) {
    await input({ message: "Press Enter to open your browser and sign in" });
    const copied = await copyToClipboard(deviceCode.user_code);
    if (copied) {
      consola.info("Copied the code to your clipboard \u2014 paste it into the sign-in page.");
    }
  }
  try {
    await open(deviceCode.verification_uri);
    consola.info(`Opened ${deviceCode.verification_uri} in your browser.`);
  } catch {
    consola.info(`Open ${deviceCode.verification_uri} in your browser and enter the code above.`);
  }
  const spinner = yoctoSpinner().start("Waiting for authentication...");
  const credentials = await waitForDeviceToken(
    loginUrl,
    deviceCode.device_code,
    deviceCode.interval
  );
  spinner.success("Authentication complete.");
  return {
    storeHash: credentials.store_hash,
    accessToken: credentials.access_token
  };
}
async function manualLogin(apiHost) {
  consola.info(
    `Create a store-level API account from your BigCommerce Control Panel:
  Settings \u2192 API \u2192 Store-level API accounts \u2192 Create API account
Grant these OAuth scopes: ${DEVICE_OAUTH_SCOPES}`
  );
  const storeHashInput = await input({ message: "Store hash:" });
  const storeHash = storeHashInput.trim();
  if (!storeHash) {
    throw new UserActionableError("Store hash is required.");
  }
  const accessTokenInput = await password({ message: "Access token:", mask: true });
  const accessToken = accessTokenInput.trim();
  if (!accessToken) {
    throw new UserActionableError("Access token is required.");
  }
  const spinner = yoctoSpinner().start("Validating credentials...");
  try {
    const profile = await fetchStoreProfile(storeHash, accessToken, apiHost);
    spinner.success(`Validated credentials for ${profile.store_name} (${storeHash}).`);
  } catch (error) {
    spinner.error("Failed to validate credentials.");
    const message = error instanceof Error ? error.message : String(error);
    throw new UserActionableError(
      `Could not validate credentials (${message}). Double-check your store hash and access token, then try again.`
    );
  }
  return { storeHash, accessToken };
}
async function login(loginUrl, apiHost) {
  try {
    return await deviceCodeLogin(loginUrl);
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    consola.warn(`Browser login didn't work (${message}).`);
    const shouldFallback = await confirm2({
      message: "Try logging in manually with a store hash and access token instead?",
      default: true
    });
    if (!shouldFallback) {
      throw new LoginAbortedError();
    }
    return manualLogin(apiHost);
  }
}

// src/cli/lib/project.ts
import { z as z6 } from "zod";
var InfrastructureProjectValidationError = class extends UserActionableError {
  constructor(message) {
    super(message);
    this.name = "InfrastructureProjectValidationError";
  }
};
var fetchProjectsSchema = z6.object({
  data: z6.array(
    z6.object({
      uuid: z6.string(),
      name: z6.string(),
      deployment_hostnames: z6.array(z6.string())
    })
  )
});
function projectsUrl(storeHash, apiHost) {
  return `https://${apiHost}/stores/${storeHash}/v3/infrastructure/projects`;
}
function authHeaders(accessToken) {
  return {
    "X-Auth-Token": accessToken,
    "X-Correlation-Id": getTelemetry().correlationId
  };
}
async function hasProjectsAccess(storeHash, accessToken, apiHost) {
  const response = await fetch(projectsUrl(storeHash, apiHost), {
    method: "GET",
    headers: authHeaders(accessToken)
  });
  assertAuthorized(response);
  if (response.status === 200) return true;
  if (response.status === 403) return false;
  throw await httpError(response, "Failed to check project access");
}
async function fetchProjects(storeHash, accessToken, apiHost) {
  const response = await fetch(projectsUrl(storeHash, apiHost), {
    method: "GET",
    headers: authHeaders(accessToken)
  });
  assertAuthorized(response);
  if (response.status === 403) {
    throw new UserActionableError(
      "Infrastructure Projects API not enabled. If you are part of the beta, contact support@bigcommerce.com to enable it."
    );
  }
  if (!response.ok) {
    throw await httpError(response, "Failed to fetch projects");
  }
  const res = await response.json();
  const { data } = fetchProjectsSchema.parse(res);
  return data;
}
var createProjectSchema = z6.object({
  data: z6.object({
    uuid: z6.string(),
    name: z6.string(),
    date_created: z6.coerce.date(),
    date_modified: z6.coerce.date()
  })
});
var validationErrorBodySchema = z6.object({
  title: z6.string().optional(),
  detail: z6.string().optional(),
  errors: z6.record(z6.string(), z6.string()).optional()
});
function extractValidationMessage(body) {
  const parsed = validationErrorBodySchema.safeParse(body);
  if (!parsed.success) return null;
  const { title, detail, errors } = parsed.data;
  if (errors && Object.keys(errors).length > 0) {
    return Object.values(errors).join("; ");
  }
  return detail ?? title ?? null;
}
async function createProject(name, storeHash, accessToken, apiHost) {
  const response = await fetch(projectsUrl(storeHash, apiHost), {
    method: "POST",
    headers: {
      ...authHeaders(accessToken),
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ name })
  });
  assertAuthorized(response);
  if (response.status === 400 || response.status === 422) {
    const body = await response.json().catch(() => null);
    const fallback = response.status === 422 ? "The project name you entered doesn't meet the requirements. It must be 3\u201332 characters long and use only letters, numbers, hyphens (-), underscores (_), and periods (.)" : response.statusText;
    const message = extractValidationMessage(body) ?? fallback;
    throw new InfrastructureProjectValidationError(message);
  }
  if (response.status === 403 || response.status === 404) {
    throw new UserActionableError(
      "Infrastructure Projects API not enabled. If you are part of the beta, contact support@bigcommerce.com to enable it."
    );
  }
  if (response.status === 502) {
    throw new Error("Failed to create project, is the name already in use?");
  }
  if (!response.ok) {
    throw await httpError(response, "Failed to create project");
  }
  const res = await response.json();
  const { data } = createProjectSchema.parse(res);
  return data;
}
async function deleteProject(projectUuid, storeHash, accessToken, apiHost) {
  const response = await fetch(`${projectsUrl(storeHash, apiHost)}/${projectUuid}`, {
    method: "DELETE",
    headers: authHeaders(accessToken)
  });
  assertAuthorized(response);
  if (response.status === 403) {
    throw new UserActionableError(
      "Infrastructure Projects API not enabled. If you are part of the beta, contact support@bigcommerce.com to enable it."
    );
  }
  if (response.status === 404) {
    throw new UserActionableError(`Project ${projectUuid} not found.`);
  }
  if (!response.ok) {
    throw await httpError(response, "Failed to delete project");
  }
}

// src/cli/commands/auth.ts
var StoreProfileSchema2 = z7.object({
  data: z7.object({
    store_name: z7.string()
  })
});
async function fetchStoreProfile2(storeHash, accessToken, apiHost) {
  const response = await fetch(`https://${apiHost}/stores/${storeHash}/v3/settings/store/profile`, {
    method: "GET",
    headers: {
      "X-Auth-Token": accessToken,
      Accept: "application/json"
    }
  });
  assertAuthorized(response);
  if (!response.ok) {
    throw new Error(`${response.status} ${response.statusText}`);
  }
  const res = await response.json();
  const result = StoreProfileSchema2.safeParse(res);
  if (!result.success) {
    throw new Error("Unexpected response from store profile API");
  }
  return result.data.data;
}
async function checkCredentials(storeHash, accessToken, apiHost) {
  try {
    const { store_name: storeName } = await fetchStoreProfile2(storeHash, accessToken, apiHost);
    return { valid: true, storeName };
  } catch (error) {
    if (error instanceof UnauthorizedError) return { valid: false, reason: "unauthorized" };
    return {
      valid: false,
      reason: "unverifiable",
      message: error instanceof Error ? error.message : String(error)
    };
  }
}
var whoami = new Command("whoami").configureHelp({ showGlobalOptions: true }).description("Verify stored credentials and display store/project info.").addHelpText(
  "after",
  `
Example:
  $ catalyst auth whoami

  Logged in to My Store (abc123), connected to project my-project (43eba682-0c48-11f1-9bd5-827a48b0ce1e)`
).addOption(storeHashOption()).addOption(accessTokenOption()).addOption(apiHostOption()).action(async (options) => {
  try {
    const config2 = getProjectConfig();
    const apiHost = resolveApiHost(options, config2);
    const storeHash = options.storeHash ?? config2.get("storeHash");
    const accessToken = options.accessToken ?? config2.get("accessToken");
    if (!storeHash || !accessToken) {
      consola.info("Not logged in: no credentials found.");
      consola.info(
        "Run `catalyst auth login`, or provide --store-hash and --access-token flags (or set CATALYST_STORE_HASH and CATALYST_ACCESS_TOKEN environment variables)."
      );
      process.exit(1);
      return;
    }
    const store = await fetchStoreProfile2(storeHash, accessToken, apiHost);
    const projectUuid = config2.get("projectUuid");
    if (projectUuid) {
      const projects2 = await fetchProjects(storeHash, accessToken, apiHost);
      const linkedProject = projects2.find((p) => p.uuid === projectUuid);
      if (linkedProject) {
        consola.info(
          `Logged in to ${store.store_name} (${storeHash}), connected to project ${linkedProject.name} (${projectUuid})`
        );
      } else {
        consola.info(
          `Logged in to ${store.store_name} (${storeHash}), project ${projectUuid} not found`
        );
      }
    } else {
      consola.info(`Logged in to ${store.store_name} (${storeHash})`);
    }
    process.exit(0);
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    if (error instanceof UnauthorizedError) {
      consola.error(
        "Not logged in: your access token is invalid or has expired. Run `catalyst auth login`."
      );
    } else if (message.includes("401") || message.includes("403")) {
      consola.error(`Not logged in: invalid credentials (${message})`);
    } else {
      consola.error(`Failed to verify credentials: ${message}`);
    }
    process.exit(1);
  }
});
var login2 = new Command("login").configureHelp({ showGlobalOptions: true }).description(
  "Authenticate via browser using the OAuth device code flow. Falls back to an interactive store hash + access token prompt if the browser flow is unavailable. Passing --store-hash and --access-token verifies and stores those credentials instead. If already logged in with credentials that still work, displays them and suggests `catalyst auth logout`; if the stored token has expired or been revoked, re-authenticates in place."
).addHelpText(
  "after",
  `
Examples:
  # Login interactively (browser, with manual fallback)
  $ catalyst auth login

  # Login with existing credentials (skips interactive flow)
  $ catalyst auth login --store-hash <STORE_HASH> --access-token <ACCESS_TOKEN>

  # Re-authenticate without checking the stored credentials first
  $ catalyst auth login --force`
).addOption(storeHashOption()).addOption(accessTokenOption()).addOption(apiHostOption()).addOption(loginUrlOption()).addOption(
  new Option2(
    "--force",
    "Skip the check on any credentials already stored and re-authenticate regardless."
  )
).action(async (options, command) => {
  try {
    const config2 = getProjectConfig();
    const apiHost = resolveApiHost(options, config2);
    const storeHash = options.storeHash ?? config2.get("storeHash");
    const accessToken = options.accessToken ?? config2.get("accessToken");
    const suppliedOnCli = command.getOptionValueSource("storeHash") === "cli" && command.getOptionValueSource("accessToken") === "cli";
    if (suppliedOnCli && storeHash && accessToken) {
      if (!options.force) {
        const status = await checkCredentials(storeHash, accessToken, apiHost);
        if (!status.valid && status.reason === "unauthorized") {
          consola.error(`The credentials provided for store ${storeHash} were rejected.`);
          consola.info(
            "Check the store hash and access token, or run `catalyst auth login` without them to authenticate in the browser."
          );
          process.exit(1);
          return;
        }
        if (!status.valid) {
          consola.warn(`Couldn't verify the credentials provided: ${status.message}`);
        }
      }
      config2.set("storeHash", storeHash);
      config2.set("accessToken", accessToken);
      consola.success(`Logged in to store ${storeHash}.`);
      process.exit(0);
      return;
    }
    if (storeHash && accessToken && !options.force) {
      const status = await checkCredentials(storeHash, accessToken, apiHost);
      if (status.valid) {
        consola.info(`Already logged in to ${status.storeName} (${storeHash}).`);
        consola.info(
          "Run `catalyst auth logout` first to re-authenticate, or `catalyst auth login --force` to skip this check."
        );
        process.exit(0);
        return;
      }
      if (status.reason === "unverifiable") {
        consola.warn(
          `Found credentials for store ${storeHash} but couldn't verify them: ${status.message}`
        );
        consola.info(
          "Keeping them. Re-run once the API is reachable, or `catalyst auth login --force` to re-authenticate regardless."
        );
        process.exit(0);
        return;
      }
      consola.warn(
        `Stored credentials for store ${storeHash} are no longer valid \u2014 re-authenticating.`
      );
    }
    const credentials = await login(options.loginUrl, apiHost);
    config2.set("storeHash", credentials.storeHash);
    config2.set("accessToken", credentials.accessToken);
    consola.success(`Logged in to store ${credentials.storeHash}.`);
    process.exit(0);
  } catch (error) {
    if (error instanceof LoginAbortedError) {
      consola.info(
        "Login aborted. Re-run `catalyst auth login` when you have your credentials ready."
      );
      process.exit(0);
      return;
    }
    const message = error instanceof Error ? error.message : String(error);
    consola.error(`Login failed: ${message}`);
    process.exit(1);
  }
});
var logout = new Command("logout").configureHelp({ showGlobalOptions: true }).description("Remove stored credentials for the current project.").addHelpText(
  "after",
  `
Example:
  $ catalyst auth logout`
).action(() => {
  try {
    const config2 = getProjectConfig();
    const storeHash = config2.get("storeHash");
    const accessToken = config2.get("accessToken");
    if (!storeHash && !accessToken) {
      consola.info("Not logged in: no credentials found.");
      process.exit(0);
      return;
    }
    config2.delete("storeHash");
    config2.delete("accessToken");
    consola.success(`Logged out from store ${storeHash ?? "unknown"}.`);
    process.exit(0);
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    consola.error(`Logout failed: ${message}`);
    process.exit(1);
  }
});
var auth = new Command("auth").configureHelp({ showGlobalOptions: true }).description("Manage authentication for the BigCommerce CLI.").addCommand(whoami).addCommand(login2).addCommand(logout);

// src/cli/commands/build.ts
import { Command as Command2, InvalidArgumentError, Option as Option3 } from "commander";
import { execa as execa2 } from "execa";
import { copyFile, cp, rm, writeFile } from "fs/promises";
import { join as join7 } from "path";
import { valid as validSemver } from "semver";

// src/cli/lib/build-env.ts
import { colorize as colorize2 } from "consola/utils";
import { config } from "dotenv";
import { expand } from "dotenv-expand";
import { existsSync as existsSync3 } from "fs";
import { resolve } from "path";
var AUTO_ENV_FILES = [".env.local", ".env"];
function loadBuildEnv({
  envPath,
  cwd = process.cwd()
}) {
  if (envPath !== void 0) {
    const envFilePath = resolve(cwd, envPath);
    const result = config({ path: envFilePath, override: true });
    if (result.error) {
      const errCode = "code" in result.error && typeof result.error.code === "string" ? result.error.code : void 0;
      const message = errCode === "ENOENT" ? `Env file not found: ${envFilePath}` : `Failed to load --env-path ${envPath}: ${result.error.message}`;
      throw new UserActionableError(message);
    }
    const { parsed = {} } = expand({ parsed: result.parsed ?? {} });
    consola.log(colorize2("cyanBright", `Loaded environment variables from ${envFilePath}
`));
    return parsed;
  }
  const loaded = AUTO_ENV_FILES.filter((file) => {
    const envFilePath = resolve(cwd, file);
    if (!existsSync3(envFilePath)) {
      return false;
    }
    return !config({ path: envFilePath, override: false }).error;
  });
  if (loaded.length > 0) {
    consola.log(colorize2("cyanBright", `Loaded environment variables from ${loaded.join(", ")}
`));
  }
  return void 0;
}

// src/cli/lib/commerce-hosting.ts
import { confirm as confirm3, input as input2, select, Separator } from "@inquirer/prompts";
import { colorize as colorize3 } from "consola/utils";
import { existsSync as existsSync4, mkdirSync, readFileSync as readFileSync3, unlinkSync, writeFileSync } from "fs";
import { dirname as dirname2, join as join5 } from "path";
import { minVersion, satisfies, lt as semverLt, validRange } from "semver";
import { z as z8 } from "zod";

// src/cli/lib/sort-package-json.ts
var FIELD_ORDER = [
  "name",
  "description",
  "version",
  "private",
  "engines",
  "scripts",
  "dependencies",
  "devDependencies"
];
function sortPackageJsonFields(pkg) {
  const ordered = {};
  FIELD_ORDER.forEach((field) => {
    if (field in pkg) {
      ordered[field] = pkg[field];
    }
  });
  Object.keys(pkg).forEach((key) => {
    if (!(key in ordered)) {
      ordered[key] = pkg[key];
    }
  });
  return ordered;
}

// src/cli/lib/commerce-hosting.ts
var OPENNEXT_CLOUDFLARE_VERSION = "1.20.15";
var OPENNEXT_REQUIRED_NEXT_RANGE = ">=15.5.28 <16 || >=16.4.1";
var corePackageJsonSchema = z8.looseObject({
  dependencies: z8.record(z8.string(), z8.string()).optional()
});
var projectJsonSchema3 = z8.looseObject({});
var readProjectJson2 = (path) => {
  if (!existsSync4(path)) return {};
  try {
    const parsed = projectJsonSchema3.safeParse(JSON.parse(readFileSync3(path, "utf-8")));
    return parsed.success ? parsed.data : {};
  } catch {
    return {};
  }
};
var writeJson = (path, value) => {
  mkdirSync(dirname2(path), { recursive: true });
  writeFileSync(path, `${JSON.stringify(value, null, 2)}
`);
};
var cleanupCloudflareIncompatibilities = async (projectDir) => {
  const instrumentationPath = join5(projectDir, "instrumentation.ts");
  if (!existsSync4(instrumentationPath)) return;
  if (readFileSync3(instrumentationPath, "utf-8").includes("registerWorkersTracing")) return;
  if (!process.stdin.isTTY) {
    consola.warn(
      "instrumentation.ts is present and may be incompatible with the Cloudflare Workers bundle (the default @vercel/otel scaffolding throws at cold start under workerd). Skipping automatic cleanup in non-interactive mode \u2014 re-run interactively to remove it, or delete/gate it manually."
    );
    return;
  }
  const shouldRemove = await confirm3({
    message: 'Catalyst found instrumentation.ts, which is incompatible with the Cloudflare Workers bundle when it uses @vercel/otel (causes "Failed to prepare server" at cold start).\nRemove it and drop @vercel/otel from package.json? (required for Storefront Hosting)',
    default: true
  });
  if (!shouldRemove) {
    consola.info(
      'Leaving instrumentation.ts in place. The Cloudflare worker will continue to log "Failed to prepare server" at cold start until this is resolved manually.'
    );
    return;
  }
  unlinkSync(instrumentationPath);
  consola.info("Removed instrumentation.ts (incompatible with Cloudflare Workers).");
  const corePackageJsonPath = join5(projectDir, "package.json");
  if (existsSync4(corePackageJsonPath)) {
    const pkg = corePackageJsonSchema.parse(JSON.parse(readFileSync3(corePackageJsonPath, "utf-8")));
    if (pkg.dependencies && "@vercel/otel" in pkg.dependencies) {
      const { "@vercel/otel": _removedVercelOtel, ...preservedDeps } = pkg.dependencies;
      pkg.dependencies = preservedDeps;
      writeJson(corePackageJsonPath, sortPackageJsonFields(pkg));
      consola.info("Dropped @vercel/otel from package.json.");
    }
  }
};
var LEGACY_MIDDLEWARE_ERROR = "Found both proxy.ts and middleware.ts, and Next.js fails to build when both exist. Older Catalyst CLIs generated middleware.ts from proxy.ts: move any changes you made in middleware.ts into proxy.ts, then delete middleware.ts.";
var removeLegacyMiddleware = async (projectDir) => {
  const middlewarePath = join5(projectDir, "middleware.ts");
  if (!existsSync4(middlewarePath) || !existsSync4(join5(projectDir, "proxy.ts"))) return;
  if (!process.stdin.isTTY) throw new Error(LEGACY_MIDDLEWARE_ERROR);
  const shouldRemove = await confirm3({
    message: "Catalyst found both proxy.ts and middleware.ts. middleware.ts was generated by an older Catalyst CLI, and Next.js fails to build when both exist.\nDelete middleware.ts and keep proxy.ts? (move any changes you made in middleware.ts into proxy.ts first)",
    default: true
  });
  if (!shouldRemove) throw new Error(LEGACY_MIDDLEWARE_ERROR);
  unlinkSync(middlewarePath);
  consola.info("Removed middleware.ts (generated by an older Catalyst CLI).");
};
var reconcileOpenNextVersion = async (projectDir, packageManager, { canUpgrade }) => {
  const corePackageJsonPath = join5(projectDir, "package.json");
  if (!existsSync4(corePackageJsonPath)) return false;
  const pkg = corePackageJsonSchema.parse(JSON.parse(readFileSync3(corePackageJsonPath, "utf-8")));
  const range = pkg.dependencies?.["@opennextjs/cloudflare"];
  if (range === void 0) return false;
  if (!validRange(range)) return false;
  if (satisfies(OPENNEXT_CLOUDFLARE_VERSION, range)) return false;
  const current = minVersion(range)?.version;
  if (current === void 0 || !semverLt(current, OPENNEXT_CLOUDFLARE_VERSION)) return false;
  const manualStep = `\`${packageManager} add @opennextjs/cloudflare@${OPENNEXT_CLOUDFLARE_VERSION}\``;
  const behind = `This project pins @opennextjs/cloudflare ${current}, but this CLI targets ${OPENNEXT_CLOUDFLARE_VERSION}.`;
  const nextRange = pkg.dependencies?.next;
  const nextVersion = nextRange !== void 0 && validRange(nextRange) ? minVersion(nextRange) : null;
  if (nextVersion !== null && !satisfies(nextVersion.version, OPENNEXT_REQUIRED_NEXT_RANGE)) {
    consola.warn(
      `${behind} That release needs Next.js ${OPENNEXT_REQUIRED_NEXT_RANGE}, but this project is on ${nextVersion.version}. Run \`catalyst upgrade\` to move core and Next first, then re-run the deploy to pick up the adapter.`
    );
    return false;
  }
  if (!canUpgrade) {
    consola.warn(
      `${behind} The deploy will use the existing build output. Re-run without \`--prebuilt\`, or update it with ${manualStep}, to pick up adapter fixes released since then.`
    );
    return false;
  }
  if (!process.stdin.isTTY) {
    consola.warn(
      `${behind} Skipping the upgrade prompt in a non-interactive environment. Update it with ${manualStep} and commit the lockfile to pick up adapter fixes released since then.`
    );
    return false;
  }
  const shouldUpgrade = await confirm3({
    message: `${behind} Adapter fixes released since then are not applied. Update it to ${OPENNEXT_CLOUDFLARE_VERSION} and reinstall now?`,
    default: true
  });
  if (!shouldUpgrade) {
    consola.info(`Keeping @opennextjs/cloudflare ${current}. Update it later with ${manualStep}.`);
    return false;
  }
  pkg.dependencies = {
    ...pkg.dependencies,
    "@opennextjs/cloudflare": OPENNEXT_CLOUDFLARE_VERSION
  };
  writeJson(corePackageJsonPath, sortPackageJsonFields(pkg));
  consola.info(`Updated @opennextjs/cloudflare to ${OPENNEXT_CLOUDFLARE_VERSION}.`);
  return true;
};
var setupCommerceHosting = async ({
  projectDir,
  projectUuid,
  storeHash,
  accessToken
}) => {
  await cleanupCloudflareIncompatibilities(projectDir);
  await removeLegacyMiddleware(projectDir);
  const corePackageJsonPath = join5(projectDir, "package.json");
  const pkg = corePackageJsonSchema.parse(JSON.parse(readFileSync3(corePackageJsonPath, "utf-8")));
  pkg.dependencies = {
    ...pkg.dependencies,
    "@opennextjs/cloudflare": OPENNEXT_CLOUDFLARE_VERSION
  };
  writeJson(corePackageJsonPath, sortPackageJsonFields(pkg));
  const projectJsonPath = join5(projectDir, ".bigcommerce", "project.json");
  const projectJson = {
    ...readProjectJson2(projectJsonPath),
    projectUuid,
    framework: "catalyst"
  };
  if (storeHash) projectJson.storeHash = storeHash;
  if (accessToken) projectJson.accessToken = accessToken;
  writeJson(projectJsonPath, projectJson);
};
var NoLinkedProjectError = class extends Error {
  constructor() {
    super("No infrastructure project linked: user declined to create one.");
    this.name = "NoLinkedProjectError";
  }
};
async function promptForNewProjectName(api) {
  const newProjectName = await input2({ message: "Enter a name for the new project:" });
  const data = await createProject(newProjectName, api.storeHash, api.accessToken, api.apiHost);
  consola.success(`Project "${data.name}" created successfully.`);
  return { uuid: data.uuid, name: data.name, deployment_hostnames: [] };
}
async function selectOrCreateInfrastructureProject(api, linkedProjectUuid) {
  consola.start("Fetching projects...");
  const existingProjects = await fetchProjects(api.storeHash, api.accessToken, api.apiHost);
  consola.success("Projects fetched.");
  if (existingProjects.length === 0) {
    const shouldCreate = await confirm3({
      message: "There are not any hosting projects that you can link to yet. Would you like to create one?",
      default: true
    });
    if (!shouldCreate) {
      throw new NoLinkedProjectError();
    }
    return promptForNewProjectName(api);
  }
  const choices = [
    ...existingProjects.map((p) => ({
      name: p.uuid === linkedProjectUuid ? `${p.name} ${colorize3("green", "[linked]")}` : p.name,
      value: p.uuid,
      description: p.uuid
    })),
    {
      name: "Create a new project",
      value: "create",
      description: "Create a new hosting project for this Catalyst storefront."
    }
  ];
  const selected = await select({
    message: "Select a project or create a new project (Press <enter> to select).",
    choices
  });
  if (selected === "create") {
    return promptForNewProjectName(api);
  }
  const matched = existingProjects.find((p) => p.uuid === selected);
  if (!matched) {
    throw new Error(`Selected project ${String(selected)} not found in fetched list.`);
  }
  return matched;
}
async function promptForCommerceHostingProject(api, defaultName, autoUseDefaultName, useExistingOnCollision) {
  const existingProjects = await fetchProjects(api.storeHash, api.accessToken, api.apiHost);
  const takenNames = existingProjects.map((project) => project.name);
  if (autoUseDefaultName) {
    return autoCreateCommerceHostingProject(
      api,
      defaultName,
      existingProjects,
      useExistingOnCollision
    );
  }
  const conflict = existingProjects.find(
    (project) => project.name.toLowerCase() === defaultName.toLowerCase()
  );
  if (!conflict) {
    return autoCreateCommerceHostingProject(
      api,
      defaultName,
      existingProjects,
      useExistingOnCollision
    );
  }
  const hasOtherProjects = existingProjects.length > 1;
  const choices = [
    { name: `Use "${conflict.name}"`, value: "use-named" }
  ];
  if (hasOtherProjects) {
    choices.push({ name: "Select from my projects", value: "select-from-list" });
  }
  choices.push({ name: "Create a new project", value: "create" });
  const action = await select({
    message: hasOtherProjects ? `It looks like you already have an existing Storefront Hosting project named "${conflict.name}". Would you like to use it, select from your projects, or create a new one?` : `It looks like you already have an existing Storefront Hosting project named "${conflict.name}". Would you like to use it, or create a new one?`,
    choices
  });
  if (action === "use-named") {
    consola.success(`Using existing Storefront Hosting project "${conflict.name}"`);
    return conflict;
  }
  if (action === "create") {
    return promptAndCreateCommerceHostingProject(api, takenNames, defaultName);
  }
  const selected = await select({
    message: "Which Storefront Hosting project would you like to use?",
    choices: [
      ...existingProjects.map((project) => ({
        name: project.name,
        value: project,
        description: project.uuid
      })),
      new Separator(),
      { name: "Create a new project", value: "create-new" }
    ]
  });
  if (selected === "create-new") {
    return promptAndCreateCommerceHostingProject(api, takenNames, defaultName);
  }
  consola.success(`Using existing Storefront Hosting project "${selected.name}"`);
  return selected;
}
async function promptAndCreateCommerceHostingProject(api, takenNames, defaultName) {
  const projectName = await input2({
    message: "What would you like to name your Storefront Hosting project?",
    default: defaultName,
    validate: (value) => {
      const trimmed = value.trim();
      if (!trimmed) return "Project name is required";
      const conflict = takenNames.find((taken) => taken.toLowerCase() === trimmed.toLowerCase());
      if (conflict) {
        return `A Storefront Hosting project named "${conflict}" already exists`;
      }
      return true;
    },
    theme: {
      style: {
        help: () => colorize3(
          "dim",
          "(The project that hosts your storefront on Commerce \u2014 often matches your folder name.)"
        )
      }
    }
  });
  try {
    const created = await createProject(
      projectName.trim(),
      api.storeHash,
      api.accessToken,
      api.apiHost
    );
    consola.success(`Storefront Hosting project "${created.name}" created successfully`);
    return { uuid: created.uuid, name: created.name, deployment_hostnames: [] };
  } catch (error) {
    if (error instanceof InfrastructureProjectValidationError) {
      consola.error(error.message);
      return promptAndCreateCommerceHostingProject(api, takenNames, defaultName);
    }
    throw error;
  }
}
async function resolveCollisionChoice(existingName, useExistingOnCollision) {
  if (useExistingOnCollision === true) return true;
  if (!process.stdin.isTTY) return false;
  return select({
    message: `A Storefront Hosting project named "${existingName}" already exists. Use the existing project?`,
    choices: [
      { name: "Yes", value: true },
      { name: "No", value: false }
    ]
  });
}
async function autoCreateCommerceHostingProject(api, name, existingProjects, useExistingOnCollision) {
  const existing = existingProjects.find(
    (project) => project.name.toLowerCase() === name.toLowerCase()
  );
  if (existing) {
    const shouldUseExisting = await resolveCollisionChoice(existing.name, useExistingOnCollision);
    if (shouldUseExisting) {
      consola.success(`Using existing Storefront Hosting project "${existing.name}"`);
      return existing;
    }
    consola.error(
      "Not reusing the existing project. Re-run with a different --project-name, or pass --use-existing to reuse it."
    );
    process.exit(1);
  }
  try {
    const created = await createProject(name, api.storeHash, api.accessToken, api.apiHost);
    consola.success(`Storefront Hosting project "${created.name}" created successfully`);
    return { uuid: created.uuid, name: created.name, deployment_hostnames: [] };
  } catch (error) {
    if (error instanceof InfrastructureProjectValidationError) {
      consola.error(
        `Failed to create Storefront Hosting project "${name}": ${error.message}
Re-run with a different --project-name.`
      );
      process.exit(1);
    }
    throw error;
  }
}

// src/cli/lib/get-module-cli-path.ts
import { dirname as dirname3, join as join6 } from "path";
import { fileURLToPath } from "url";
function getModuleCliPath() {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = dirname3(__filename);
  return join6(__dirname, "..");
}

// src/cli/lib/install-dependencies.ts
import { installDependencies as installDeps } from "nypm";
import yoctoSpinner2 from "yocto-spinner";
var restoreEnv = (key, previous) => {
  if (previous === void 0) {
    Reflect.deleteProperty(process.env, key);
  } else {
    process.env[key] = previous;
  }
};
var withQuietInstallEnv = async (run2) => {
  var _a, _b;
  const prevNodeNoWarnings = process.env.NODE_NO_WARNINGS;
  const prevDownloadPrompt = process.env.COREPACK_ENABLE_DOWNLOAD_PROMPT;
  (_a = process.env).NODE_NO_WARNINGS ?? (_a.NODE_NO_WARNINGS = "1");
  (_b = process.env).COREPACK_ENABLE_DOWNLOAD_PROMPT ?? (_b.COREPACK_ENABLE_DOWNLOAD_PROMPT = "0");
  try {
    return await run2();
  } finally {
    restoreEnv("NODE_NO_WARNINGS", prevNodeNoWarnings);
    restoreEnv("COREPACK_ENABLE_DOWNLOAD_PROMPT", prevDownloadPrompt);
  }
};
var installDependencies = async (projectDir, packageManager = "pnpm") => {
  const spinner = yoctoSpinner2().start(
    `Installing dependencies with ${packageManager}. This could take a minute...`
  );
  try {
    await withQuietInstallEnv(() => installDeps({ cwd: projectDir, silent: true, packageManager }));
    spinner.success("Dependencies installed successfully.");
  } catch (error) {
    const message = error instanceof Error ? error.message : "unknown error";
    spinner.error(`Failed to install dependencies: ${message}`);
    throw error;
  }
};

// src/cli/lib/required-build-env.ts
var REQUIRED_BUILD_ENV_VARS = [
  "BIGCOMMERCE_STORE_HASH",
  "BIGCOMMERCE_STOREFRONT_TOKEN",
  "BIGCOMMERCE_CHANNEL_ID",
  "AUTH_SECRET"
];
var findMissingBuildEnv = (env2 = process.env) => {
  return REQUIRED_BUILD_ENV_VARS.filter((name) => {
    const value = env2[name];
    return value === void 0 || value.trim() === "";
  });
};
var assertRequiredBuildEnv = (env2 = process.env) => {
  const missing = findMissingBuildEnv(env2);
  if (missing.length === 0) {
    return;
  }
  const missingList = missing.map((name) => `  - ${name}`).join("\n");
  throw new UserActionableError(
    `Missing required environment variable${missing.length === 1 ? "" : "s"} for the build:
${missingList}

These are read by the build itself, so they must be set before it runs. The build automatically loads \`.env.local\` and \`.env\` from the current directory (${process.cwd()}) \u2014 add the variables above to one of those files (\`.env.local\` takes precedence).
To load an env file from a different location, pass \`--env-path <path>\` (for example \`--env-path ../.env.local\` when running from a subdirectory).`
  );
};

// src/cli/lib/wrangler-config.ts
function getCompatibilityDate(now = /* @__PURE__ */ new Date()) {
  const date = new Date(now);
  date.setUTCMonth(date.getUTCMonth() - 1);
  return date.toISOString().slice(0, 10);
}
var LOCAL_ROUTES_KV_NAMESPACE_ID = "catalyst-routes-kv-local";
function getWranglerConfig(projectUuid) {
  return {
    $schema: "node_modules/wrangler/config-schema.json",
    main: "../.open-next/worker.js",
    name: `project-${projectUuid}`,
    compatibility_date: getCompatibilityDate(),
    compatibility_flags: ["nodejs_compat", "global_fetch_strictly_public"],
    observability: {
      enabled: true,
      head_sampling_rate: 0.05,
      logs: {
        enabled: true,
        head_sampling_rate: 1,
        invocation_logs: false
      }
    },
    assets: {
      directory: "../.open-next/assets",
      binding: "ASSETS"
    },
    services: [
      {
        binding: "WORKER_SELF_REFERENCE",
        service: `project-${projectUuid}`
      }
    ],
    r2_buckets: [
      {
        binding: "NEXT_INC_CACHE_R2_BUCKET",
        bucket_name: `project-${projectUuid}`
      }
    ],
    kv_namespaces: [
      {
        binding: "CATALYST_ROUTES_KV",
        id: LOCAL_ROUTES_KV_NAMESPACE_ID
      }
    ],
    durable_objects: {
      bindings: [
        {
          name: "NEXT_CACHE_DO_QUEUE",
          class_name: "DOQueueHandler"
        },
        {
          name: "NEXT_TAG_CACHE_DO_SHARDED",
          class_name: "DOShardedTagCache"
        },
        {
          name: "NEXT_CACHE_DO_PURGE",
          class_name: "BucketCachePurge"
        }
      ]
    },
    migrations: [
      {
        tag: "v1",
        new_sqlite_classes: ["DOQueueHandler", "DOShardedTagCache", "BucketCachePurge"]
      }
    ]
  };
}

// src/cli/commands/build.ts
var WRANGLER_VERSION = "4.156.0";
var DIST_TAG_PATTERN = /^[a-zA-Z0-9][a-zA-Z0-9._-]*$/;
var parseWranglerVersion = (value) => {
  if (!validSemver(value) && !DIST_TAG_PATTERN.test(value)) {
    throw new InvalidArgumentError(
      `"${value}" is not a valid Wrangler version or dist-tag (e.g. 4.90.0 or latest).`
    );
  }
  return value;
};
var skipNextEnvFiles = (envFileVars) => envFileVars ? { __NEXT_PROCESSED_ENV: "true" } : {};
async function buildCatalystProject(projectUuid, wranglerVersion = WRANGLER_VERSION, envFileVars) {
  assertRequiredBuildEnv();
  const coreDir = process.cwd();
  await removeLegacyMiddleware(coreDir);
  const projectPackageManager = await detectProjectPackageManager(coreDir);
  if (await reconcileOpenNextVersion(coreDir, projectPackageManager, { canUpgrade: true })) {
    await installDependencies(coreDir, projectPackageManager);
  }
  const openNextOutDir = join7(coreDir, ".open-next");
  const bigcommerceDistDir = join7(coreDir, ".bigcommerce", "dist");
  consola.start("Generating GraphQL types...");
  await execa2("node", [join7(coreDir, "scripts", "generate.cjs")], {
    stdio: "inherit",
    cwd: coreDir
  });
  consola.success("GraphQL types generated");
  const wranglerConfig = getWranglerConfig(projectUuid);
  await rm(bigcommerceDistDir, { recursive: true, force: true });
  consola.start("Copying templates...");
  await copyFile(
    join7(getModuleCliPath(), "templates", "open-next.config.ts"),
    join7(coreDir, ".bigcommerce", "open-next.config.ts")
  );
  await writeFile(
    join7(coreDir, ".bigcommerce", "wrangler.jsonc"),
    JSON.stringify(wranglerConfig, null, 2)
  );
  consola.success("Templates copied");
  consola.start("Building project...");
  await execa2(
    "pnpm",
    [
      "exec",
      "opennextjs-cloudflare",
      "build",
      "--skipWranglerConfigCheck",
      "--openNextConfigPath",
      join7(coreDir, ".bigcommerce", "open-next.config.ts")
    ],
    {
      stdout: ["pipe", "inherit"],
      cwd: coreDir,
      env: skipNextEnvFiles(envFileVars)
    }
  );
  if (envFileVars) {
    const vars = JSON.stringify(envFileVars);
    await writeFile(
      join7(openNextOutDir, "cloudflare", "next-env.mjs"),
      ["production", "development", "test"].map((mode) => `export const ${mode} = ${vars};
`).join("")
    );
  }
  await copyFile(
    join7(getModuleCliPath(), "templates", "public_headers"),
    join7(openNextOutDir, "assets", "_headers")
  );
  await execa2(
    "pnpm",
    [
      "dlx",
      "--allow-build=esbuild",
      "--allow-build=workerd",
      `wrangler@${wranglerVersion}`,
      "deploy",
      "--config",
      join7(coreDir, ".bigcommerce", "wrangler.jsonc"),
      "--keep-vars",
      "--outdir",
      bigcommerceDistDir,
      "--dry-run"
    ],
    {
      stdout: ["pipe", "inherit"],
      cwd: coreDir
    }
  );
  consola.success("Project built");
  await cp(join7(openNextOutDir, "assets"), join7(bigcommerceDistDir, "assets"), {
    recursive: true,
    force: true
  });
}
var build = new Command2("build").configureHelp({ showGlobalOptions: true }).description(
  "Build your Catalyst project using the OpenNext/Cloudflare build pipeline. Also runs a Wrangler dry-run to generate deployment artifacts."
).addHelpText(
  "after",
  `
Examples:
  $ catalyst build

  # Include project UUID
  $ catalyst build --project-uuid <UUID>

  # Build with a specific Wrangler version
  $ catalyst build --wrangler-version 4.24.3`
).addOption(
  new Option3(
    "--project-uuid <uuid>",
    "Project UUID to be included in the deployment configuration."
  ).env("CATALYST_PROJECT_UUID")
).addOption(
  new Option3(
    "--wrangler-version <version>",
    `Wrangler version or dist-tag to build with. Defaults to ${WRANGLER_VERSION}.`
  ).argParser(parseWranglerVersion)
).addOption(envPathOption()).action(async (options) => {
  const envFileVars = loadBuildEnv({ envPath: options.envPath });
  const state = getProjectState();
  if (!state.isTransformed) {
    consola.info("Project is not set up for Storefront Hosting \u2014 running `next build`.");
    consola.info("To deploy to Storefront Hosting, run `catalyst deploy`.");
    assertRequiredBuildEnv();
    await execa2("pnpm", ["exec", "next", "build"], {
      stdio: "inherit",
      cwd: process.cwd(),
      env: skipNextEnvFiles(envFileVars)
    });
    return;
  }
  const config2 = getProjectConfig();
  const projectUuid = options.projectUuid ?? config2.get("projectUuid");
  if (!projectUuid) {
    throw new Error(
      "Project UUID is required. Please run `catalyst projects create` or `catalyst projects link` or this command again with --project-uuid <uuid>."
    );
  }
  await buildCatalystProject(projectUuid, options.wranglerVersion, envFileVars);
});

// src/cli/commands/channels.ts
import { confirm as confirm5, select as select4 } from "@inquirer/prompts";
import { Command as Command3, InvalidArgumentError as InvalidArgumentError2, Option as Option4 } from "commander";
import { colorize as colorize5 } from "consola/utils";

// src/cli/lib/channel-checkout-url-flow.ts
import { confirm as confirm4, input as input3 } from "@inquirer/prompts";

// src/cli/lib/channel-site-flow.ts
import { select as select2 } from "@inquirer/prompts";

// src/cli/lib/channels.ts
import { z as z9 } from "zod";
var cliApiUrl = (origin, storeHash, path) => `${origin}/stores/${storeHash}/cli-api/v3${path}`;
var channelsUrl = (storeHash, apiHost, query2 = {}) => {
  const params = new URLSearchParams(query2).toString();
  return `https://${apiHost}/stores/${storeHash}/v3/channels${params ? `?${params}` : ""}`;
};
var authHeaders2 = (accessToken) => ({
  "X-Auth-Token": accessToken,
  "X-Correlation-Id": getTelemetry().correlationId,
  Accept: "application/json"
});
var envVarsSchema = z9.record(z9.string(), z9.coerce.string());
var channelSchema = z9.object({
  id: z9.number(),
  name: z9.string(),
  platform: z9.string()
});
var channelsResponseSchema = z9.object({
  data: z9.array(channelSchema)
});
var CHANNEL_PLATFORM_ORDER = ["catalyst", "next", "bigcommerce"];
function sortChannelsByPlatform(channels2) {
  return [...channels2].sort((a, b) => {
    const aIndex = CHANNEL_PLATFORM_ORDER.indexOf(a.platform);
    const bIndex = CHANNEL_PLATFORM_ORDER.indexOf(b.platform);
    if (aIndex === -1 && bIndex === -1) return 0;
    if (aIndex === -1) return 1;
    if (bIndex === -1) return -1;
    return aIndex - bIndex;
  });
}
function channelPlatformLabel(platform) {
  return platform === "bigcommerce" ? "Stencil" : platform.charAt(0).toUpperCase() + platform.slice(1);
}
var initResponseSchema = z9.object({
  data: z9.object({
    storefront_api_token: z9.string(),
    envVars: envVarsSchema
  })
});
var createChannelResponseSchema = z9.object({
  data: z9.object({
    id: z9.number(),
    storefront_api_token: z9.string(),
    envVars: envVarsSchema
  })
});
var eligibilityResponseSchema = z9.object({
  data: z9.object({
    eligible: z9.boolean(),
    message: z9.string()
  })
});
var siteUrlSchema = z9.object({
  url: z9.string(),
  type: z9.string()
});
var channelSiteSchema = z9.object({
  data: z9.object({
    id: z9.number(),
    url: z9.string(),
    channel_id: z9.number(),
    ssl_status: z9.string().nullable().optional(),
    is_checkout_url_customized: z9.boolean().optional(),
    urls: z9.array(siteUrlSchema).optional()
  })
});
function assertChannelSettingsAuthorized(response, action) {
  if (response.status === 401 || response.status === 403) {
    throw new UserActionableError(
      `${action} (${response.status}). Re-run \`catalyst auth login\` to refresh your access token with the store_channel_settings and store_sites scopes.`
    );
  }
}
async function getChannelInit(channelId, storeHash, accessToken, origin) {
  const response = await fetch(cliApiUrl(origin, storeHash, `/channels/${channelId}/init`), {
    method: "GET",
    headers: authHeaders2(accessToken)
  });
  if (!response.ok) {
    throw await httpError(response, "Failed to initialize channel");
  }
  const { data } = initResponseSchema.parse(await response.json());
  return { storefrontToken: data.storefront_api_token, envVars: data.envVars };
}
async function checkChannelEligibility(storeHash, accessToken, origin) {
  const response = await fetch(cliApiUrl(origin, storeHash, "/channels/catalyst/eligibility"), {
    method: "GET",
    headers: authHeaders2(accessToken)
  });
  if (!response.ok) {
    throw await httpError(response, "Failed to check Catalyst eligibility");
  }
  return eligibilityResponseSchema.parse(await response.json()).data;
}
async function createChannel(name, storefrontLocale, additionalLocales, installSampleData, storeHash, accessToken, origin) {
  const response = await fetch(cliApiUrl(origin, storeHash, "/channels/catalyst"), {
    method: "POST",
    headers: { ...authHeaders2(accessToken), "Content-Type": "application/json" },
    body: JSON.stringify({
      name,
      initialData: { type: installSampleData ? "sample" : "none" },
      deployStorefront: true,
      devOrigin: "http://localhost:3000",
      storefrontLanguage: storefrontLocale,
      additionalLocales
    })
  });
  if (!response.ok) {
    throw await httpError(response, "Failed to create channel");
  }
  const { data } = createChannelResponseSchema.parse(await response.json());
  return {
    channelId: data.id,
    storefrontToken: data.storefront_api_token,
    envVars: data.envVars
  };
}
async function fetchAvailableChannels(storeHash, accessToken, apiHost) {
  const response = await fetch(
    channelsUrl(storeHash, apiHost, { available: "true", type: "storefront" }),
    {
      method: "GET",
      headers: {
        "X-Auth-Token": accessToken,
        "X-Correlation-Id": getTelemetry().correlationId,
        Accept: "application/json"
      }
    }
  );
  assertAuthorized(response);
  if (!response.ok) {
    throw await httpError(response, "Failed to fetch channels");
  }
  return channelsResponseSchema.parse(await response.json()).data;
}
async function updateChannelSiteUrl(channelId, siteUrl, storeHash, accessToken, apiHost) {
  const response = await fetch(
    `https://${apiHost}/stores/${storeHash}/v3/channels/${channelId}/site`,
    {
      method: "PUT",
      headers: {
        "X-Auth-Token": accessToken,
        "Content-Type": "application/json",
        Accept: "application/json",
        "X-Correlation-Id": getTelemetry().correlationId
      },
      body: JSON.stringify({ url: siteUrl })
    }
  );
  assertChannelSettingsAuthorized(response, "Failed to update channel site");
  if (!response.ok) {
    throw await httpError(response, "Failed to update channel site");
  }
  const res = await response.json();
  const { data } = channelSiteSchema.parse(res);
  return { id: data.id, url: data.url, channelId: data.channel_id };
}
var toChannelSiteDetails = (data) => ({
  id: data.id,
  url: data.url,
  channelId: data.channel_id,
  sslStatus: data.ssl_status ?? null,
  isCheckoutUrlCustomized: data.is_checkout_url_customized ?? false,
  urls: data.urls ?? []
});
function findChannelSiteUrl(site, type) {
  return site.urls.find((entry) => entry.type === type)?.url;
}
async function getChannelSite(channelId, storeHash, accessToken, apiHost) {
  const response = await fetch(
    `https://${apiHost}/stores/${storeHash}/v3/channels/${channelId}/site`,
    { method: "GET", headers: authHeaders2(accessToken) }
  );
  assertChannelSettingsAuthorized(response, "Failed to fetch channel site");
  if (!response.ok) {
    throw await httpError(response, "Failed to fetch channel site");
  }
  const res = await response.json();
  return toChannelSiteDetails(channelSiteSchema.parse(res).data);
}
var checkoutUrlPath = (storeHash, apiHost, channelId) => `https://${apiHost}/stores/${storeHash}/v3/channels/${channelId}/site/checkout-url`;
async function updateChannelCheckoutUrl(channelId, checkoutUrl, storeHash, accessToken, apiHost) {
  const response = await fetch(checkoutUrlPath(storeHash, apiHost, channelId), {
    method: "PUT",
    headers: { ...authHeaders2(accessToken), "Content-Type": "application/json" },
    body: JSON.stringify({ url: checkoutUrl })
  });
  assertChannelSettingsAuthorized(response, "Failed to update channel checkout URL");
  if (!response.ok) {
    throw await httpError(response, "Failed to update channel checkout URL");
  }
  const res = await response.json();
  return toChannelSiteDetails(channelSiteSchema.parse(res).data);
}
async function deleteChannelCheckoutUrl(channelId, storeHash, accessToken, apiHost) {
  const response = await fetch(checkoutUrlPath(storeHash, apiHost, channelId), {
    method: "DELETE",
    headers: authHeaders2(accessToken)
  });
  assertChannelSettingsAuthorized(response, "Failed to remove channel checkout URL");
  if (!response.ok) {
    throw await httpError(response, "Failed to remove channel checkout URL");
  }
}

// src/cli/lib/checkout-url.ts
import { getDomain } from "tldts";
var normalizeHostname = (hostname) => hostname.toLowerCase().replace(/\.$/, "");
var isSubdomainOf = (hostname, parent) => hostname.endsWith(`.${parent}`);
function hostnameOf(url) {
  try {
    return new URL(url).hostname;
  } catch {
    return void 0;
  }
}
function sharesMainDomain(a, b) {
  const first = getDomain(normalizeHostname(a));
  return first !== null && first === getDomain(normalizeHostname(b));
}
var MANAGED_ZONE_CHECKOUT_PREFIX = "c.";
var MAX_HOSTNAME_LENGTH = 64;
var CHECKOUT_HOSTNAME_READY_TIMEOUT_MS = 6 * 60 * 1e3;
var CHECKOUT_HOSTNAME_POLL_INTERVAL_MS = 10 * 1e3;
function managedCheckoutHostname(storefrontHostname) {
  const hostname = MANAGED_ZONE_CHECKOUT_PREFIX + normalizeHostname(storefrontHostname);
  return hostname.length <= MAX_HOSTNAME_LENGTH ? hostname : void 0;
}
async function checkoutHostnameIsServing(hostname) {
  try {
    await fetch(`https://${hostname}/`, {
      method: "HEAD",
      redirect: "manual",
      signal: AbortSignal.timeout(1e4)
    });
    return true;
  } catch {
    return false;
  }
}
async function waitForCheckoutHostname(hostname, { timeoutMs = CHECKOUT_HOSTNAME_READY_TIMEOUT_MS, onWait } = {}) {
  const deadline = Date.now() + timeoutMs;
  let waited = false;
  for (; ; ) {
    if (await checkoutHostnameIsServing(hostname)) return true;
    if (Date.now() + CHECKOUT_HOSTNAME_POLL_INTERVAL_MS >= deadline) return false;
    if (!waited) {
      waited = true;
      onWait?.();
    }
    await new Promise((resolve2) => setTimeout(resolve2, CHECKOUT_HOSTNAME_POLL_INTERVAL_MS));
  }
}
function suggestCheckoutUrl(storefrontUrl, { managedZone = false } = {}) {
  const host = hostnameOf(storefrontUrl);
  if (!host) return void 0;
  const normalized = normalizeHostname(host);
  if (managedZone) return `https://${MANAGED_ZONE_CHECKOUT_PREFIX}${normalized}`;
  return `https://checkout.${normalized.replace(/^www\./, "")}`;
}
function normalizeCheckoutUrl(value) {
  const withScheme = /^[a-z][a-z\d+.-]*:\/\//i.test(value) ? value : `https://${value}`;
  let parsed;
  try {
    parsed = new URL(withScheme);
  } catch {
    throw new UserActionableError(
      `"${value}" is not a valid URL. Pass a hostname or an https URL, e.g. https://checkout.example.com.`
    );
  }
  if (parsed.protocol !== "https:") {
    throw new UserActionableError(
      `The checkout URL must use https, but "${value}" uses ${parsed.protocol.replace(":", "")}.`
    );
  }
  return parsed.origin;
}
var NATIVE_HOSTING_ZONES = [
  "catalyst-sandbox.store",
  "catalyst-sandbox-dev.store",
  "catalyst-sandbox-staging.store",
  "catalyst-sandbox-integration.store",
  "ignition-demo.store"
];
function isManagedHostingHostname(hostname) {
  const host = normalizeHostname(hostname);
  return NATIVE_HOSTING_ZONES.some((zone) => isSubdomainOf(host, zone));
}
function isCrossDomainCheckout(site) {
  const storefrontHost = hostnameOf(findChannelSiteUrl(site, "primary") ?? site.url);
  const checkoutUrl = findChannelSiteUrl(site, "checkout");
  const checkoutHost = checkoutUrl ? hostnameOf(checkoutUrl) : void 0;
  return Boolean(storefrontHost && checkoutHost && !sharesMainDomain(storefrontHost, checkoutHost));
}
function warnOnCrossDomainCheckout(site) {
  const storefrontUrl = findChannelSiteUrl(site, "primary") ?? site.url;
  const storefrontHost = hostnameOf(storefrontUrl);
  const checkoutUrl = findChannelSiteUrl(site, "checkout");
  if (!storefrontHost) return { crossDomain: false };
  const suggestion = suggestCheckoutUrl(storefrontUrl);
  const checkoutHost = checkoutUrl ? hostnameOf(checkoutUrl) : void 0;
  if (!checkoutHost || sharesMainDomain(storefrontHost, checkoutHost)) {
    return { crossDomain: false, suggestion };
  }
  if (site.isCheckoutUrlCustomized) {
    consola.warn(
      `This channel's checkout URL (${checkoutHost}) is on a different domain than its storefront (${storefrontHost}) \u2014 most likely a storefront URL change left it behind.`
    );
  } else {
    consola.warn(
      `Checkout is on the default channel's domain (${checkoutHost}), not this channel's storefront (${storefrontHost}).`
    );
  }
  consola.info(
    "Shopper sessions and carts may not carry into checkout in browsers that restrict cross-domain cookies."
  );
  const storefrontOnManagedZone = isManagedHostingHostname(storefrontHost);
  const report = {
    crossDomain: true,
    storefrontOnManagedZone,
    suggestion: storefrontOnManagedZone ? suggestCheckoutUrl(storefrontUrl, { managedZone: true }) : suggestion
  };
  if (storefrontOnManagedZone) {
    consola.info(
      `${storefrontHost} is an auto-generated deployment hostname, so its checkout hostname is ${MANAGED_ZONE_CHECKOUT_PREFIX}${storefrontHost}. BigCommerce provisions it when it's set as the checkout URL, and its certificate takes a few minutes to issue. Set it with:`
    );
    consola.log(
      `  catalyst channels update --channel-id ${site.channelId} --checkout-url ${report.suggestion ?? "<domain>"}`
    );
    return report;
  }
  consola.info(
    `To put checkout on this channel's own domain, point ${suggestion?.replace("https://", "") ?? "your checkout subdomain"} at BigCommerce and provision a certificate for it there.`
  );
  return report;
}

// src/cli/lib/channel-site-flow.ts
function preservableCheckoutUrl(site, hostname) {
  if (!site.isCheckoutUrlCustomized) return void 0;
  const checkoutUrl = findChannelSiteUrl(site, "checkout");
  const checkoutHost = checkoutUrl ? hostnameOf(checkoutUrl) : void 0;
  if (!checkoutUrl || !checkoutHost || isManagedHostingHostname(checkoutHost)) return void 0;
  return sharesMainDomain(checkoutHost, hostname) ? checkoutUrl : void 0;
}
async function resolveProject(options) {
  const api = {
    storeHash: options.storeHash,
    accessToken: options.accessToken,
    apiHost: options.apiHost
  };
  if (options.projectUuid) {
    const projects2 = await fetchProjects(api.storeHash, api.accessToken, api.apiHost);
    const matched = projects2.find((p) => p.uuid === options.projectUuid);
    if (matched) return matched;
    consola.warn(
      `Project ${options.projectUuid} not found on this store. Pick another to continue.`
    );
  }
  return selectOrCreateInfrastructureProject(api, options.projectUuid);
}
async function resolveChannel(options) {
  if (options.channelId !== void 0) {
    return { id: options.channelId };
  }
  consola.start("Fetching channels...");
  const channels2 = await fetchAvailableChannels(
    options.storeHash,
    options.accessToken,
    options.apiHost
  );
  consola.success("Channels fetched.");
  const catalystChannels = channels2.filter((c) => c.platform === "catalyst");
  if (catalystChannels.length === 0) {
    throw new Error(
      "No Catalyst channels found on this store. Create one with `catalyst create` and try again."
    );
  }
  const id = await select2({
    message: options.message ?? "Select the channel to update.",
    choices: catalystChannels.map((c) => ({
      name: c.name,
      value: c.id,
      description: `id: ${c.id}`
    }))
  });
  const matched = catalystChannels.find((c) => c.id === id);
  return { id, name: matched?.name };
}
async function resolveHostname(project, options) {
  if (options.hostname) {
    return options.hostname;
  }
  if (project.deployment_hostnames.length === 0) {
    throw new Error(
      `Project "${project.name}" has no deployment hostnames yet. Run \`catalyst deploy\` first to create one.`
    );
  }
  const ordered = options.preferHostname ? [
    ...project.deployment_hostnames.filter((h) => h === options.preferHostname),
    ...project.deployment_hostnames.filter((h) => h !== options.preferHostname)
  ] : project.deployment_hostnames;
  const selected = await select2({
    message: "Select the hostname to point the channel at.",
    choices: ordered.map((h) => ({ name: h, value: h }))
  });
  return selected;
}
async function runChannelSiteUrlFlow(options) {
  const project = await resolveProject(options);
  const channel = await resolveChannel(options);
  const hostname = await resolveHostname(project, options);
  const siteUrl = hostname.startsWith("https://") ? hostname : `https://${hostname}`;
  const channelLabel = channel.name ? `"${channel.name}" (${channel.id})` : String(channel.id);
  const current = await getChannelSite(
    channel.id,
    options.storeHash,
    options.accessToken,
    options.apiHost
  ).catch(() => void 0);
  if (current && (findChannelSiteUrl(current, "primary") ?? current.url).replace(/\/$/, "") === siteUrl) {
    consola.info(`Channel ${channelLabel} site URL is already ${siteUrl}.`);
  } else {
    await updateChannelSiteUrl(
      channel.id,
      siteUrl,
      options.storeHash,
      options.accessToken,
      options.apiHost
    );
    consola.success(`Updated channel ${channelLabel} site URL to ${siteUrl}.`);
    const checkoutUrl = current && options.preserveCheckoutUrl !== false ? preservableCheckoutUrl(current, hostnameOf(siteUrl) ?? hostname) : void 0;
    if (checkoutUrl) {
      try {
        await updateChannelCheckoutUrl(
          channel.id,
          checkoutUrl,
          options.storeHash,
          options.accessToken,
          options.apiHost
        );
        consola.success(`Kept channel ${channelLabel} checkout URL ${checkoutUrl}.`);
      } catch {
        consola.warn(`Couldn't restore channel ${channelLabel} checkout URL ${checkoutUrl}.`);
        consola.log(
          `  catalyst channels update --channel-id ${channel.id} --checkout-url ${checkoutUrl}`
        );
      }
    }
  }
  if (options.diagnoseCheckout === false) return { channelId: channel.id, hostname };
  try {
    const site = await getChannelSite(
      channel.id,
      options.storeHash,
      options.accessToken,
      options.apiHost
    );
    const report = warnOnCrossDomainCheckout(site);
    if (report.crossDomain && report.storefrontOnManagedZone !== true) {
      consola.info("Set a checkout URL for this channel with:");
      consola.log(
        `  catalyst channels update --channel-id ${channel.id} --checkout-url ${report.suggestion ?? "<domain>"}`
      );
    }
  } catch {
  }
  return { channelId: channel.id, hostname };
}

// src/cli/lib/channel-checkout-url-flow.ts
async function runChannelCheckoutUrlFlow(options) {
  const channel = options.channelId !== void 0 ? { id: options.channelId, name: options.channelName } : await resolveChannel(options);
  const label = channel.name ? `"${channel.name}" (${channel.id})` : String(channel.id);
  if (options.storefrontHostname !== void 0 && await setManagedCheckoutUrl({
    ...options,
    channelId: channel.id,
    label,
    storefrontHostname: options.storefrontHostname,
    timeoutMs: options.certificateTimeoutMs
  })) {
    return;
  }
  let storefrontUrl = options.storefrontUrl;
  if (!storefrontUrl) {
    const site = await getChannelSite(
      channel.id,
      options.storeHash,
      options.accessToken,
      options.apiHost
    );
    storefrontUrl = findChannelSiteUrl(site, "primary") ?? site.url;
    const currentCheckoutUrl = findChannelSiteUrl(site, "checkout");
    consola.info(`Channel ${label} storefront is ${storefrontUrl}.`);
    if (currentCheckoutUrl) {
      consola.info(
        `Checkout is currently ${currentCheckoutUrl}${site.isCheckoutUrlCustomized ? "" : ", inherited from the default channel"}.`
      );
    }
  }
  const storefrontHostname = hostnameOf(storefrontUrl);
  if (options.url === void 0 && options.storefrontHostname === void 0 && storefrontHostname !== void 0 && await setManagedCheckoutUrl({
    ...options,
    channelId: channel.id,
    label,
    storefrontHostname,
    timeoutMs: options.certificateTimeoutMs
  })) {
    return;
  }
  const answer = options.url ?? await input3({
    message: "Checkout URL for this channel (must share a main domain with the storefront)",
    default: suggestCheckoutUrl(storefrontUrl)
  });
  const checkoutUrl = normalizeCheckoutUrl(answer);
  await updateChannelCheckoutUrl(
    channel.id,
    checkoutUrl,
    options.storeHash,
    options.accessToken,
    options.apiHost
  );
  consola.success(`Updated channel ${label} checkout URL to ${checkoutUrl}.`);
  await confirmCheckoutCertificate(checkoutUrl, {
    channelId: channel.id,
    timeoutMs: options.certificateTimeoutMs
  });
}
async function waitForManagedCheckoutCertificate(hostname, timeoutMs) {
  const ready = await waitForCheckoutHostname(hostname, {
    timeoutMs,
    onWait: () => consola.info(
      `Waiting for ${hostname} to be issued a certificate. This usually takes a minute or two...`
    )
  });
  if (ready) consola.success(`${hostname} is serving checkout.`);
  return ready;
}
async function confirmCheckoutCertificate(checkoutUrl, { channelId, timeoutMs }) {
  const { hostname } = new URL(checkoutUrl);
  if (isManagedHostingHostname(hostname)) {
    if (await waitForManagedCheckoutCertificate(hostname, timeoutMs)) return;
    consola.warn(
      `${hostname} wasn't issued a certificate in time, so checkout won't load until it is. To fall back to the default channel's checkout, run \`catalyst channels update --channel-id ${channelId} --remove-checkout-url\`.`
    );
    return;
  }
  if (await waitForCheckoutHostname(hostname, { timeoutMs: 0 })) return;
  consola.warn(
    `${hostname} isn't serving a certificate yet, so checkout won't load until it does. Point it at BigCommerce and provision its certificate there.`
  );
}
async function setManagedCheckoutUrl(options) {
  const { storeHash, accessToken, apiHost, channelId, label, storefrontHostname } = options;
  if (!isManagedHostingHostname(storefrontHostname)) return false;
  const hostname = managedCheckoutHostname(storefrontHostname);
  if (!hostname) {
    consola.warn(
      `${storefrontHostname} is too long to take a checkout prefix, so it has no checkout hostname. Checkout keeps its current URL.`
    );
    return true;
  }
  const checkoutUrl = `https://${hostname}`;
  const site = await getChannelSite(channelId, storeHash, accessToken, apiHost);
  if (site.isCheckoutUrlCustomized) {
    const alreadySet = site.urls.some(
      (entry) => entry.type === "checkout" && entry.url.replace(/\/$/, "") === checkoutUrl
    );
    if (!alreadySet) {
      consola.info(
        `Channel ${label} already has a custom checkout URL, so it was left alone. To replace it, run \`catalyst channels update --channel-id ${channelId} --checkout-url ${checkoutUrl}\`.`
      );
      return true;
    }
  } else {
    await updateChannelCheckoutUrl(channelId, checkoutUrl, storeHash, accessToken, apiHost);
    consola.success(`Updated channel ${label} checkout URL to ${checkoutUrl}.`);
  }
  if (await waitForManagedCheckoutCertificate(hostname, options.timeoutMs)) return true;
  await deleteChannelCheckoutUrl(channelId, storeHash, accessToken, apiHost);
  consola.warn(
    `${hostname} wasn't issued a certificate in time, so the checkout URL was removed and checkout falls back to the default channel's. Re-run with \`--update-checkout-url\` to try again.`
  );
  return true;
}
async function offerManagedCheckoutUrl(options) {
  const { storeHash, accessToken, apiHost, channelId, storefrontHostname, config: config2 } = options;
  const declined = config2.get("declinedCheckoutUrlChannels") ?? [];
  if (!isManagedHostingHostname(storefrontHostname)) return false;
  if (options.respectOptOut && declined.includes(channelId)) return false;
  const site = await getChannelSite(channelId, storeHash, accessToken, apiHost);
  if (site.isCheckoutUrlCustomized || !isCrossDomainCheckout(site)) return false;
  const shouldMove = await confirm4({
    message: `Checkout is on ${findChannelSiteUrl(site, "checkout") ?? "another domain"}. Move it to https://${MANAGED_ZONE_CHECKOUT_PREFIX}${storefrontHostname} so shoppers stay on this domain through payment?`,
    default: options.defaultAnswer
  });
  if (!shouldMove) {
    if (!declined.includes(channelId)) {
      config2.set("declinedCheckoutUrlChannels", [...declined, channelId]);
    }
    warnOnCrossDomainCheckout(site);
    consola.info(
      `Won't ask again after deploys for channel ${channelId}. To set it later, run \`catalyst channels update --channel-id ${channelId} --checkout-url https://${MANAGED_ZONE_CHECKOUT_PREFIX}${storefrontHostname}\`.`
    );
    return true;
  }
  await runChannelCheckoutUrlFlow({
    storeHash,
    accessToken,
    apiHost,
    channelId,
    storefrontHostname
  });
  return true;
}

// src/cli/lib/create-channel-flow.ts
import { checkbox, input as input4, select as select3 } from "@inquirer/prompts";
import { colorize as colorize4 } from "consola/utils";

// src/cli/lib/localization.ts
import { z as z10 } from "zod";
var allowedLocales = [
  "en",
  "da",
  "es-AR",
  "es-CL",
  "es-CO",
  "es-MX",
  "es-PE",
  "es-419",
  "es",
  "it",
  "nl",
  "pl",
  "pt",
  "de",
  "fr",
  "ja",
  "no",
  "pt-BR",
  "sv"
];
var AvailableLocalesSuccessSchema = z10.object({
  data: z10.array(
    z10.object({
      id: z10.string(),
      name: z10.string(),
      fallback: z10.string().nullable(),
      is_supported: z10.boolean()
    })
  )
});
var getAvailableLocales = async (storeHash, accessToken, apiHost) => {
  const response = await fetch(
    `https://${apiHost}/stores/${storeHash}/v3/settings/store/available-locales`,
    {
      method: "GET",
      headers: {
        "X-Auth-Token": accessToken,
        "X-Correlation-Id": getTelemetry().correlationId,
        Accept: "application/json"
      }
    }
  );
  assertAuthorized(response);
  if (!response.ok) {
    throw await httpError(response, "Failed to fetch available locales");
  }
  return AvailableLocalesSuccessSchema.parse(await response.json()).data.filter(({ id }) => allowedLocales.includes(id)).map(({ name, id }) => ({ name: `${name} (${id})`, value: id }));
};

// src/cli/lib/create-channel-flow.ts
var ALLOWED_CHANNEL_NAME_CHARS = "letters, numbers, spaces, hyphens (-), and underscores (_)";
var CHANNEL_NAME_PATTERN = /^[\p{L}\p{N} _-]+$/u;
function getChannelNameError(name) {
  if (name.trim().length === 0) {
    return "Channel name cannot be empty.";
  }
  if (!CHANNEL_NAME_PATTERN.test(name)) {
    return `"${name}" is not a valid channel name. Channel names may contain only ${ALLOWED_CHANNEL_NAME_CHARS}.`;
  }
  return void 0;
}
async function runCreateChannelFlow(options) {
  const { storeHash, accessToken, apiHost, cliApiOrigin } = options;
  if (options.name !== void 0) {
    const nameError = getChannelNameError(options.name);
    if (nameError) {
      throw new UserActionableError(nameError);
    }
  }
  const name = options.name ?? await input4({
    message: "What would you like to name your new channel?",
    validate: (value) => getChannelNameError(value) ?? true
  });
  let availableLocales;
  const loadLocales = async () => {
    availableLocales ?? (availableLocales = await getAvailableLocales(storeHash, accessToken, apiHost));
    return availableLocales;
  };
  const storefrontLocale = options.locale ?? await select3({
    message: "Which default language would you like to set for your channel?",
    default: "en",
    choices: await loadLocales(),
    theme: {
      style: {
        help: () => colorize4("dim", "(Select locale from the list or start typing the name)")
      }
    }
  });
  let additionalLocales = options.additionalLocales;
  if (additionalLocales === void 0) {
    const shouldAddAdditionalLocales = await select3({
      message: "Would you like to add additional languages?",
      choices: [
        { name: "Yes", value: true },
        { name: "No", value: false }
      ]
    });
    additionalLocales = [];
    if (shouldAddAdditionalLocales) {
      const localeChoices = (await loadLocales()).filter(({ value }) => value !== storefrontLocale).map(({ name: localeName, value }) => ({ name: localeName, value, description: value }));
      additionalLocales = await checkbox({
        message: "Which additional languages would you like to add to your channel?",
        choices: localeChoices,
        validate: (items) => items.length <= 4 || "You can only select up to 4 additional languages."
      });
    }
  }
  const shouldInstallSampleData = options.sampleData ?? await select3({
    message: "Would you like to install sample data?",
    choices: [
      { name: "Yes", value: true },
      { name: "No", value: false }
    ]
  });
  consola.start("Creating channel...");
  const channel = await createChannel(
    name,
    storefrontLocale,
    additionalLocales,
    shouldInstallSampleData,
    storeHash,
    accessToken,
    cliApiOrigin
  );
  consola.success("Channel created.");
  return channel;
}

// src/cli/lib/env-config.ts
var ENV_KEY_PATTERN = /^[A-Za-z_][A-Za-z0-9_]*$/;
var parseEnvAssignment = (input9) => {
  const separatorIndex = input9.indexOf("=");
  if (separatorIndex === -1) {
    throw new Error(`Invalid env var format: ${input9}. Expected format: KEY=VALUE`);
  }
  const key = input9.slice(0, separatorIndex).trim();
  const value = input9.slice(separatorIndex + 1).trim();
  if (!key || !value) {
    throw new Error(`Invalid env var format: ${input9}. Expected format: KEY=VALUE`);
  }
  if (!ENV_KEY_PATTERN.test(key)) {
    throw new Error(
      `Invalid env var name: ${key}. Names must start with a letter or underscore and contain only letters, numbers, and underscores.`
    );
  }
  return { key, value };
};
var getStoredEnv = (config2) => {
  return config2.get("env") ?? {};
};
var toDeploymentSecrets = (envVars) => {
  return Object.entries(envVars).map(([key, value]) => ({ type: "secret", key, value }));
};
var toEnvFileSecrets = (envVars) => {
  return toDeploymentSecrets(envVars).filter(
    ({ key, value }) => value !== "" && ENV_KEY_PATTERN.test(key)
  );
};
var mergeDeploymentSecrets = (...layers) => {
  const byKey = /* @__PURE__ */ new Map();
  layers.flat().forEach((secret) => byKey.set(secret.key, secret));
  return Array.from(byKey.values());
};

// src/cli/lib/resolve-credentials.ts
function resolveCredentials(options, config2) {
  const storeHash = options.storeHash ?? config2.get("storeHash");
  const accessToken = options.accessToken ?? config2.get("accessToken");
  if (!storeHash || !accessToken) {
    consola.error("Missing credentials.");
    consola.info(
      "Run `catalyst auth login`, or provide --store-hash and --access-token flags (or set CATALYST_STORE_HASH and CATALYST_ACCESS_TOKEN environment variables)."
    );
    process.exit(1);
    throw new Error("Missing credentials");
  }
  return { storeHash, accessToken };
}

// src/cli/lib/write-env.ts
import { outputFileSync } from "fs-extra/esm";
import { existsSync as existsSync5, readFileSync as readFileSync4 } from "fs";
import { join as join8 } from "path";
var ACTIVE_KEY_LINE = /^([A-Za-z_][A-Za-z0-9_]*)=(.*)$/;
var keyFromLine = (line) => {
  const match = ACTIVE_KEY_LINE.exec(line);
  return match ? match[1] : null;
};
var parseEnvValues = (contents) => {
  const values = /* @__PURE__ */ new Map();
  contents.split("\n").forEach((line) => {
    const match = ACTIVE_KEY_LINE.exec(line);
    if (match) {
      values.set(match[1], match[2]);
    }
  });
  return values;
};
var writeEnv = (projectDir, envVars) => {
  const examplePath = join8(projectDir, ".env.example");
  const localPath = join8(projectDir, ".env.local");
  const existingLocal = existsSync5(localPath) ? parseEnvValues(readFileSync4(localPath, "utf-8")) : /* @__PURE__ */ new Map();
  const resolve2 = (key) => {
    if (key in envVars && envVars[key] !== "") {
      return envVars[key];
    }
    return existingLocal.get(key);
  };
  if (!existsSync5(examplePath)) {
    const keys = [.../* @__PURE__ */ new Set([...existingLocal.keys(), ...Object.keys(envVars)])];
    outputFileSync(localPath, `${keys.map((key) => `${key}=${resolve2(key) ?? ""}`).join("\n")}
`);
    return;
  }
  const exampleLines = readFileSync4(examplePath, "utf-8").replace(/\n$/, "").split("\n");
  const exampleKeys = /* @__PURE__ */ new Set();
  const lines = exampleLines.map((line) => {
    const key = keyFromLine(line);
    if (key === null) {
      return line;
    }
    exampleKeys.add(key);
    const value = resolve2(key);
    return value === void 0 ? line : `${key}=${value}`;
  });
  const extraKeys = [];
  [...existingLocal.keys()].forEach((key) => {
    if (!exampleKeys.has(key)) {
      extraKeys.push(key);
    }
  });
  Object.keys(envVars).forEach((key) => {
    if (!exampleKeys.has(key) && !extraKeys.includes(key)) {
      extraKeys.push(key);
    }
  });
  if (extraKeys.length > 0) {
    lines.push("", "# Additional variables set by the Catalyst CLI (not in .env.example).");
    extraKeys.forEach((key) => {
      lines.push(`${key}=${resolve2(key) ?? ""}`);
    });
  }
  outputFileSync(localPath, `${lines.join("\n")}
`);
};

// src/cli/commands/channels.ts
var parseChannelId = (value) => {
  const parsed = Number.parseInt(value, 10);
  if (Number.isNaN(parsed)) {
    throw new InvalidArgumentError2(`"${value}" is not a valid channel ID (expected a number).`);
  }
  return parsed;
};
var parseCheckoutUrl = (value) => {
  try {
    return normalizeCheckoutUrl(value);
  } catch (error) {
    throw new InvalidArgumentError2(error instanceof Error ? error.message : String(error));
  }
};
var CHECKOUT_URL_NOTES = `
Checkout is hosted by BigCommerce, so a checkout URL must be a domain you have
pointed at BigCommerce with a certificate provisioned there \u2014 not one added with
\`catalyst domains add\`, which only routes traffic to this project.

BigCommerce also requires the checkout URL to share a main domain with the
channel's storefront URL, so that sessions carry between the two. A storefront
on an auto-generated deployment hostname uses its \`c.\` subdomain for checkout;
BigCommerce issues its certificate when it's set, which takes a few minutes, and
the command waits for it.`;
async function resolveCredentialsWithLogin(options, config2, apiHost) {
  const storeHash = options.storeHash ?? config2.get("storeHash");
  const accessToken = options.accessToken ?? config2.get("accessToken");
  if (storeHash && accessToken) {
    return { storeHash, accessToken };
  }
  try {
    const credentials = await login(options.loginUrl, apiHost);
    config2.set("storeHash", credentials.storeHash);
    config2.set("accessToken", credentials.accessToken);
    return credentials;
  } catch (error) {
    if (error instanceof LoginAbortedError) {
      return null;
    }
    throw error;
  }
}
var update = new Command3("update").configureHelp({ showGlobalOptions: true }).description("Update a BigCommerce channel's storefront and checkout URLs.").addHelpText(
  "after",
  `${CHECKOUT_URL_NOTES}

With no flags, this updates the storefront URL and prompts for the hostname.
Pass a checkout flag on its own to change only the checkout URL, leaving the
storefront URL alone.

Examples:
  # Pick a channel and hostname interactively
  $ catalyst channels update

  # Point the storefront at a deployment hostname
  $ catalyst channels update --channel-id 123 --hostname my-storefront.example.com

  # Set both at once
  $ catalyst channels update --channel-id 123 --hostname my-storefront.example.com --checkout-url checkout.example.com

  # Change only the checkout URL
  $ catalyst channels update --channel-id 123 --checkout-url checkout.example.com

  # Fall back to the shared checkout domain
  $ catalyst channels update --channel-id 123 --remove-checkout-url`
).addOption(storeHashOption()).addOption(accessTokenOption()).addOption(apiHostOption()).addOption(projectUuidOption()).addOption(
  new Option4(
    "--channel-id <id>",
    "Skip the channel prompt and target this channel directly."
  ).argParser((value) => Number(value))
).addOption(
  new Option4(
    "--hostname <hostname>",
    "Skip the hostname prompt and use this hostname directly. Must be one of the project's deployment_hostnames."
  )
).addOption(
  new Option4(
    "--checkout-url <url>",
    "Set the channel's checkout URL. Must share a main domain with the storefront URL."
  ).argParser(parseCheckoutUrl)
).addOption(
  new Option4(
    "--remove-checkout-url",
    "Remove the channel's custom checkout URL so checkout falls back to the shared checkout domain."
  ).conflicts("checkoutUrl")
).action(async (options) => {
  const config2 = getProjectConfig();
  const apiHost = resolveApiHost(options, config2);
  const { storeHash, accessToken } = resolveCredentials(options, config2);
  await getTelemetry().identify(storeHash);
  const touchesCheckout = options.checkoutUrl !== void 0 || options.removeCheckoutUrl === true;
  const updatesSiteUrl = options.hostname !== void 0 || !touchesCheckout;
  const offersCheckout = updatesSiteUrl && !touchesCheckout && canPrompt();
  let channelId = options.channelId;
  let siteHostname;
  if (updatesSiteUrl) {
    try {
      ({ channelId, hostname: siteHostname } = await runChannelSiteUrlFlow({
        storeHash,
        accessToken,
        apiHost,
        projectUuid: options.projectUuid ?? config2.get("projectUuid"),
        channelId: options.channelId,
        hostname: options.hostname,
        diagnoseCheckout: !offersCheckout,
        preserveCheckoutUrl: !touchesCheckout
      }));
    } catch (error) {
      if (error instanceof NoLinkedProjectError) {
        consola.info(
          "When you're ready to create a project, run `catalyst projects create` or re-run `catalyst channels update`."
        );
        process.exit(0);
        return;
      }
      throw error;
    }
  }
  if (offersCheckout && channelId !== void 0 && siteHostname !== void 0) {
    const offered = await offerManagedCheckoutUrl({
      storeHash,
      accessToken,
      apiHost,
      channelId,
      storefrontHostname: siteHostname,
      config: config2,
      // Explicit command, so an earlier decline doesn't silence it.
      respectOptOut: false,
      defaultAnswer: true
    });
    if (!offered) {
      warnOnCrossDomainCheckout(await getChannelSite(channelId, storeHash, accessToken, apiHost));
    }
  }
  if (touchesCheckout) {
    const channel = channelId === void 0 ? await resolveChannel({ storeHash, accessToken, apiHost }) : { id: channelId, name: void 0 };
    const label = channel.name ? `"${channel.name}" (${channel.id})` : String(channel.id);
    if (options.checkoutUrl !== void 0) {
      const updated = await updateChannelCheckoutUrl(
        channel.id,
        options.checkoutUrl,
        storeHash,
        accessToken,
        apiHost
      );
      consola.success(`Updated channel ${label} checkout URL to ${options.checkoutUrl}.`);
      reportChannelSite(updated);
      warnOnCrossDomainCheckout(updated);
      await confirmCheckoutCertificate(options.checkoutUrl, { channelId: channel.id });
    } else {
      await deleteChannelCheckoutUrl(channel.id, storeHash, accessToken, apiHost);
      consola.success(
        `Removed the custom checkout URL from channel ${label}. Checkout now uses the shared checkout domain.`
      );
      const reverted = await getChannelSite(channel.id, storeHash, accessToken, apiHost);
      reportChannelSite(reverted);
      warnOnCrossDomainCheckout(reverted);
    }
  }
  process.exit(0);
});
var link = new Command3("link").configureHelp({ showGlobalOptions: true }).description(
  "Link this Catalyst project to a BigCommerce channel and write its credentials to .env.local."
).addHelpText(
  "after",
  `
Examples:
  # Pick a channel interactively (logs you in if needed)
  $ catalyst channels link

  # Non-interactive
  $ catalyst channels link --store-hash <hash> --access-token <token> --channel-id 123

  # Append extra environment variables to .env.local
  $ catalyst channels link --channel-id 123 --env MY_FLAG=1`
).addOption(storeHashOption()).addOption(accessTokenOption()).addOption(apiHostOption()).addOption(loginUrlOption()).addOption(
  new Option4("--channel-id <id>", "Link this channel directly, skipping the picker.").argParser(
    parseChannelId
  )
).option(
  "--env <vars...>",
  "Arbitrary environment variables to set in .env.local. Format: KEY=VALUE (repeatable)."
).addOption(
  new Option4("--cli-api-origin <origin>", "Catalyst CLI API origin").default("https://cxm-prd.bigcommerceapp.com").hideHelp()
).action(async (options) => {
  const config2 = getProjectConfig();
  const apiHost = resolveApiHost(options, config2);
  const credentials = await resolveCredentialsWithLogin(options, config2, apiHost);
  if (!credentials) {
    consola.info(
      "Login aborted. Re-run `catalyst channels link` when you have your credentials ready."
    );
    process.exit(0);
    return;
  }
  const { storeHash, accessToken } = credentials;
  await getTelemetry().identify(storeHash);
  let channelId = options.channelId;
  let channelName;
  if (channelId === void 0) {
    const availableChannels = await fetchAvailableChannels(storeHash, accessToken, apiHost);
    if (availableChannels.length === 0) {
      consola.info(
        "No storefront channels found on this store. Create one with `catalyst create` and try again."
      );
      process.exit(0);
      return;
    }
    channelId = await select4({
      message: "Which channel would you like to link?",
      choices: sortChannelsByPlatform(availableChannels).map((c) => ({
        name: c.name,
        value: c.id,
        description: channelPlatformLabel(c.platform)
      }))
    });
    channelName = availableChannels.find((c) => c.id === channelId)?.name;
  }
  const initData = await getChannelInit(channelId, storeHash, accessToken, options.cliApiOrigin);
  const envVars = { ...initData.envVars };
  if (options.env) {
    options.env.forEach((entry) => {
      const { key, value } = parseEnvAssignment(entry);
      envVars[key] = value;
    });
  }
  writeEnv(process.cwd(), envVars);
  const label = channelName ? `"${channelName}" (${channelId})` : `${channelId}`;
  consola.success(
    `Linked to channel ${label} and wrote ${colorize5("cyanBright", ".env.local")}.`
  );
  consola.log(`Next steps:

  ${colorize5("yellow", "pnpm run dev")}`);
  process.exit(0);
});
var create = new Command3("create").configureHelp({ showGlobalOptions: true }).description("Create a new Catalyst storefront channel on your BigCommerce store.").addHelpText(
  "after",
  `
Examples:
  # Create a channel interactively (logs you in if needed)
  $ catalyst channels create

  # Non-interactive, and link it to this project afterwards
  $ catalyst channels create --name "My Store" --locale en --no-sample-data --link

  # Add additional storefront languages (max 4)
  $ catalyst channels create --name "My Store" --additional-locales es fr`
).addOption(storeHashOption()).addOption(accessTokenOption()).addOption(apiHostOption()).addOption(loginUrlOption()).option("--name <name>", "Name for the new channel. Skips the name prompt.").option(
  "--locale <locale>",
  'Default storefront locale (e.g. "en"). Skips the default-language prompt.'
).option(
  "--additional-locales <locales...>",
  "Additional storefront locales, max 4 (e.g. --additional-locales es fr). Skips the additional-languages prompt."
).addOption(new Option4("--sample-data", "Install sample data on the new channel.")).addOption(new Option4("--no-sample-data", "Create the channel without sample data.")).option(
  "--link",
  "Link the new channel to this project \u2014 write its credentials to .env.local without prompting."
).addOption(
  new Option4("--cli-api-origin <origin>", "Catalyst CLI API origin").default("https://cxm-prd.bigcommerceapp.com").hideHelp()
).action(async (options) => {
  if (options.additionalLocales && options.additionalLocales.length > 4) {
    consola.error("You can only set up to 4 additional locales.");
    process.exit(1);
    return;
  }
  const config2 = getProjectConfig();
  const apiHost = resolveApiHost(options, config2);
  const credentials = await resolveCredentialsWithLogin(options, config2, apiHost);
  if (!credentials) {
    consola.info(
      "Login aborted. Re-run `catalyst channels create` when you have your credentials ready."
    );
    process.exit(0);
    return;
  }
  const { storeHash, accessToken } = credentials;
  await getTelemetry().identify(storeHash);
  const eligibility = await checkChannelEligibility(storeHash, accessToken, options.cliApiOrigin);
  if (!eligibility.eligible) {
    consola.warn(eligibility.message);
    process.exit(0);
    return;
  }
  const channelData = await runCreateChannelFlow({
    storeHash,
    accessToken,
    apiHost,
    cliApiOrigin: options.cliApiOrigin,
    name: options.name,
    locale: options.locale,
    additionalLocales: options.additionalLocales,
    sampleData: options.sampleData
  });
  consola.success(`Created channel ${channelData.channelId}.`);
  consola.warn(
    "A preview storefront has been deployed in your BigCommerce control panel. This preview may look different from your local environment as it may be running different code. Additionally, it may take a few minutes for the channel storefront to be accessible."
  );
  const shouldLink = options.link ? true : await select4({
    message: "Would you like to link this channel to your project?",
    choices: [
      { name: "Yes", value: true },
      { name: "No", value: false }
    ]
  });
  if (shouldLink) {
    writeEnv(process.cwd(), channelData.envVars);
    consola.success(
      `Linked to channel ${channelData.channelId} and wrote ${colorize5("cyanBright", ".env.local")}.`
    );
    consola.log(`Next steps:

  ${colorize5("yellow", "pnpm run dev")}`);
  }
  process.exit(0);
});
var CHECKOUT_LABEL_WIDTH = "Storefront".length;
var row = (label, value) => `  ${label.padEnd(CHECKOUT_LABEL_WIDTH)}  ${value}`;
function reportChannelSite(site) {
  const canonical = findChannelSiteUrl(site, "canonical");
  const checkout = findChannelSiteUrl(site, "checkout");
  consola.log(row("Storefront", findChannelSiteUrl(site, "primary") ?? site.url));
  if (canonical) {
    consola.log(row("Canonical", canonical));
  }
  consola.log(row("Checkout", checkout ?? "(none)"));
  if (!site.isCheckoutUrlCustomized) {
    consola.info(
      "This channel has no checkout URL of its own, so checkout uses the default channel's primary URL."
    );
  }
}
async function resolveChannelTarget(options) {
  const config2 = getProjectConfig();
  const apiHost = resolveApiHost(options, config2);
  const { storeHash, accessToken } = resolveCredentials(options, config2);
  await getTelemetry().identify(storeHash);
  const channel = await resolveChannel({
    storeHash,
    accessToken,
    apiHost,
    channelId: options.channelId,
    // Read-only: these commands report on a channel, so the picker must not
    // say "to update" — the shared default is written for `channels update`.
    message: "Select a channel."
  });
  return {
    config: config2,
    apiHost,
    storeHash,
    accessToken,
    channel,
    label: channel.name ? `"${channel.name}" (${channel.id})` : String(channel.id)
  };
}
var info = new Command3("info").configureHelp({ showGlobalOptions: true }).description("Show a channel's site URLs \u2014 storefront, canonical and checkout.").addHelpText(
  "after",
  `${CHECKOUT_URL_NOTES}

Examples:
  # Pick a channel interactively; the same as bare \`catalyst channels\`
  $ catalyst channels info

  # Target a channel directly
  $ catalyst channels info --channel-id 123`
).addOption(storeHashOption()).addOption(accessTokenOption()).addOption(apiHostOption()).addOption(
  new Option4(
    "--channel-id <id>",
    "Skip the channel prompt and target this channel directly."
  ).argParser(parseChannelId)
).action(async (options) => {
  const { apiHost, storeHash, accessToken, channel, label } = await resolveChannelTarget(options);
  consola.start("Fetching channel site...");
  const site = await getChannelSite(channel.id, storeHash, accessToken, apiHost);
  consola.success(`Channel ${label}:`);
  reportChannelSite(site);
  const report = warnOnCrossDomainCheckout(site);
  if (report.crossDomain && report.storefrontOnManagedZone !== true) {
    const suggested = report.suggestion ?? "<domain>";
    if (!process.stdin.isTTY) {
      consola.info(
        `Set one with \`catalyst channels update --channel-id ${channel.id} --checkout-url ${suggested}\`.`
      );
      process.exit(0);
      return;
    }
    const shouldSet = await confirm5({
      message: "Set a checkout URL for this channel now?",
      default: true
    });
    if (shouldSet) {
      await runChannelCheckoutUrlFlow({
        storeHash,
        accessToken,
        apiHost,
        // Already chosen above; don't ask again.
        channelId: channel.id,
        channelName: channel.name,
        storefrontUrl: findChannelSiteUrl(site, "primary") ?? site.url
      });
      process.exit(0);
      return;
    }
    consola.info(
      `When you're ready, run \`catalyst channels update --channel-id ${channel.id} --checkout-url <domain>\`.`
    );
  }
  process.exit(0);
});
var channels = new Command3("channels").alias("channel").configureHelp({ showGlobalOptions: true }).description("Manage BigCommerce channels.").addCommand(info, { isDefault: true }).addCommand(create).addCommand(link).addCommand(update);

// src/cli/commands/create.ts
import { Command as Command4, InvalidArgumentError as InvalidArgumentError3, Option as Option5 } from "@commander-js/extra-typings";
import { input as input5, select as select5 } from "@inquirer/prompts";
import { execSync as execSync2 } from "child_process";
import { colorize as colorize6 } from "consola/utils";
import { pathExistsSync } from "fs-extra/esm";
import kebabCase from "lodash.kebabcase";
import { join as join12 } from "path";

// src/cli/lib/extract-catalyst.ts
import { mkdirSync as mkdirSync2 } from "fs";
import { Readable } from "stream";
import { pipeline } from "stream/promises";
import { x } from "tar";
var SUBDIR = "core";
var MAX_ATTEMPTS = 3;
var codeloadUrl = (repository, ref) => `https://codeload.github.com/${repository}/tar.gz/${encodeURIComponent(ref)}`;
var wait = (ms) => new Promise((resolve2) => {
  setTimeout(resolve2, ms);
});
var downloadAndExtract = async (repository, ref, projectDir) => {
  const url = codeloadUrl(repository, ref);
  const response = await fetch(url);
  if (!response.ok || !response.body) {
    throw new Error(`Failed to download ${url} (HTTP ${response.status})`);
  }
  await pipeline(
    // Node's global fetch types `body` as the DOM ReadableStream; it is the same
    // object Readable.fromWeb expects at runtime.
    // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
    Readable.fromWeb(response.body),
    x({
      cwd: projectDir,
      strip: 2,
      filter: (path) => path.split("/")[1] === SUBDIR
    })
  );
};
var attemptDownload = async (repository, ref, projectDir, attempt = 1) => {
  try {
    await downloadAndExtract(repository, ref, projectDir);
  } catch (error) {
    const message = error instanceof Error ? error.message : "unknown error";
    if (attempt >= MAX_ATTEMPTS) {
      throw new Error(`Failed to download Catalyst after ${MAX_ATTEMPTS} attempts: ${message}`);
    }
    consola.warn(`Download attempt ${attempt} failed (${message}). Retrying...`);
    await wait(attempt * 1e3);
    return attemptDownload(repository, ref, projectDir, attempt + 1);
  }
};
var extractCatalyst = async ({
  repository,
  ref,
  projectDir
}) => {
  consola.info(`Downloading ${repository}#${ref}...`);
  mkdirSync2(projectDir, { recursive: true });
  await attemptDownload(repository, ref, projectDir);
};

// src/cli/lib/init-git-repo.ts
import { execSync } from "child_process";
import { rmSync } from "fs";
import { join as join9 } from "path";
var run = (command, cwd) => execSync(command, { cwd, stdio: "ignore" });
var initGitRepo = (projectDir) => {
  try {
    run("git init", projectDir);
    run("git add -A", projectDir);
    run('git commit -m "Initial commit from Catalyst"', projectDir);
    consola.success("Initialized a git repository.");
  } catch {
    rmSync(join9(projectDir, ".git"), { recursive: true, force: true });
    consola.warn("Could not initialize a git repository. Skipping.");
  }
};

// src/cli/lib/rewrite-core-package.ts
import { readFileSync as readFileSync5, writeFileSync as writeFileSync2 } from "fs";
import { join as join10 } from "path";
import { z as z11 } from "zod";
var NATIVE_BUILD_ALLOWLIST = [
  "@parcel/watcher",
  "@swc/core",
  "@vercel/speed-insights",
  "esbuild",
  "msw",
  "protobufjs",
  "puppeteer",
  "sharp",
  "workerd"
];
var DEP_FIELDS = [
  "dependencies",
  "devDependencies",
  "optionalDependencies",
  "peerDependencies"
];
var corePackageJsonSchema2 = z11.looseObject({
  version: z11.string().optional(),
  private: z11.boolean().optional(),
  scripts: z11.record(z11.string(), z11.string()).optional(),
  dependencies: z11.record(z11.string(), z11.string()).optional(),
  devDependencies: z11.record(z11.string(), z11.string()).optional(),
  optionalDependencies: z11.record(z11.string(), z11.string()).optional(),
  peerDependencies: z11.record(z11.string(), z11.string()).optional(),
  pnpm: z11.looseObject({}).optional(),
  catalyst: z11.looseObject({}).optional()
});
var registryVersionSchema = z11.object({ version: z11.string() });
var resolvePublishedVersion = async (pkgName) => {
  const response = await fetch(`https://registry.npmjs.org/${pkgName}/latest`);
  if (!response.ok) {
    throw new Error(
      `Could not resolve a published version for "${pkgName}" (HTTP ${response.status}). The extracted project still references it via the workspace protocol and cannot be installed.`
    );
  }
  const { version: version2 } = registryVersionSchema.parse(await response.json());
  return `^${version2}`;
};
var rewriteCorePackage = async (projectDir, ref) => {
  const packageJsonPath = join10(projectDir, "package.json");
  const pkg = corePackageJsonSchema2.parse(JSON.parse(readFileSync5(packageJsonPath, "utf-8")));
  const workspaceDeps = DEP_FIELDS.flatMap((field) => {
    const deps = pkg[field];
    if (!deps) return [];
    return Object.entries(deps).filter(([, range]) => range.startsWith("workspace:")).map(([name]) => ({ deps, name }));
  });
  await Promise.all(
    workspaceDeps.map(async ({ deps, name }) => {
      const resolved = await resolvePublishedVersion(name);
      deps[name] = resolved;
      consola.info(`Resolved ${name} to ${resolved}`);
    })
  );
  delete pkg.private;
  if (pkg.scripts) {
    pkg.scripts = Object.fromEntries(
      Object.entries(pkg.scripts).filter(([, command]) => !command.includes("turbo"))
    );
  }
  pkg.pnpm = { ...pkg.pnpm, onlyBuiltDependencies: NATIVE_BUILD_ALLOWLIST };
  pkg.trustedDependencies = NATIVE_BUILD_ALLOWLIST;
  pkg.catalyst = { ...pkg.catalyst, version: pkg.version, ref };
  writeFileSync2(packageJsonPath, `${JSON.stringify(sortPackageJsonFields(pkg), null, 2)}
`);
  writeFileSync2(join10(projectDir, ".npmrc"), "legacy-peer-deps=true\n");
};

// src/cli/lib/setup-core-project.ts
import { mkdirSync as mkdirSync3, readFileSync as readFileSync6, writeFileSync as writeFileSync3 } from "fs";
import { dirname as dirname4, join as join11 } from "path";
import { z as z12 } from "zod";
var corePackageJsonSchema3 = z12.looseObject({
  scripts: z12.record(z12.string(), z12.string()).optional(),
  devDependencies: z12.record(z12.string(), z12.string()).optional()
});
var writeJson2 = (path, value) => {
  mkdirSync3(dirname4(path), { recursive: true });
  writeFileSync3(path, `${JSON.stringify(value, null, 2)}
`);
};
var setupCoreProject = (projectDir) => {
  const corePackageJsonPath = join11(projectDir, "package.json");
  const pkg = corePackageJsonSchema3.parse(JSON.parse(readFileSync6(corePackageJsonPath, "utf-8")));
  pkg.scripts = {
    ...pkg.scripts,
    build: "npm run generate && catalyst build",
    start: "catalyst start",
    deploy: "npm run generate && catalyst deploy"
  };
  pkg.devDependencies = {
    ...pkg.devDependencies,
    "@bigcommerce/catalyst": package_default.version
  };
  writeJson2(corePackageJsonPath, sortPackageJsonFields(pkg));
};

// src/cli/commands/create.ts
function getPlatformCheckCommand(command) {
  const isWindows = process.platform === "win32";
  return isWindows ? `where.exe ${command}` : `which ${command}`;
}
function parseChannelId2(value) {
  const parsed = parseInt(value, 10);
  if (Number.isNaN(parsed)) {
    throw new InvalidArgumentError3(`"${value}" is not a valid channel ID (expected a number).`);
  }
  return parsed;
}
function parseHosting(value) {
  if (value === "self-hosted" || value === "bigcommerce") {
    return value;
  }
  if (value === "commerce") {
    consola.warn("`--hosting commerce` is deprecated. Use `--hosting bigcommerce` instead.");
    return "bigcommerce";
  }
  throw new InvalidArgumentError3("Allowed choices are self-hosted, bigcommerce.");
}
function parseEnvFlag(value, previous = {}) {
  const eqIdx = value.indexOf("=");
  if (eqIdx <= 0) {
    throw new InvalidArgumentError3(`Expected KEY=VALUE, got "${value}".`);
  }
  const key = value.substring(0, eqIdx);
  const val = value.substring(eqIdx + 1);
  if (!val) {
    throw new InvalidArgumentError3(`Expected KEY=VALUE with non-empty value, got "${value}".`);
  }
  return { ...previous, [key]: val };
}
async function handleChannelSelection(storeHash, accessToken, apiHost) {
  const channels2 = await fetchAvailableChannels(storeHash, accessToken, apiHost);
  const existingChannel = await select5({
    message: "Which channel would you like to use?",
    choices: sortChannelsByPlatform(channels2).map((ch) => ({
      name: ch.name,
      value: ch,
      description: `Channel Platform: ${channelPlatformLabel(ch.platform)}`
    }))
  });
  return existingChannel.id;
}
async function setupProject(options) {
  let { projectName, projectDir } = options;
  if (!pathExistsSync(projectDir)) {
    consola.error(`--project-dir ${projectDir} is not a valid path`);
    process.exit(1);
  }
  if (projectName) {
    projectName = kebabCase(projectName);
    projectDir = join12(options.projectDir, projectName);
    if (pathExistsSync(projectDir)) {
      consola.error(`${projectDir} already exists`);
      process.exit(1);
    }
  }
  if (!projectName) {
    const validateProjectName = (i) => {
      const formatted = kebabCase(i);
      if (!formatted) return "Project name is required";
      const targetDir = join12(options.projectDir, formatted);
      if (pathExistsSync(targetDir)) return `Destination '${targetDir}' already exists`;
      projectName = formatted;
      projectDir = targetDir;
      return true;
    };
    await input5({
      message: "What do you want to name your project directory?",
      default: "my-catalyst-app",
      validate: validateProjectName
    });
  }
  if (!projectName) throw new Error("Something went wrong, projectName is not defined");
  if (!projectDir) throw new Error("Something went wrong, projectDir is not defined");
  return { projectName, projectDir };
}
function checkRequiredTools() {
  try {
    execSync2(getPlatformCheckCommand("git"), { stdio: "ignore" });
  } catch {
    consola.error("git is required to create a Catalyst project");
    process.exit(1);
  }
}
var create2 = new Command4("create").configureHelp({ showGlobalOptions: true }).description("Scaffold and connect a Catalyst storefront to your BigCommerce store.").addHelpText(
  "after",
  `
Examples:
  # Interactive scaffold (default \u2014 self-hosted, no hosting prompt)
  $ catalyst create

  # Non-interactive: skip the project-name prompt
  $ catalyst create --project-name my-store

  # Eagerly set up Storefront Hosting at create time
  $ catalyst create --project-name my-store --hosting bigcommerce`
).option("--project-name <name>", "Name of your Catalyst project").option("--project-dir <dir>", "Directory in which to create your project", process.cwd()).addOption(storeHashOption()).addOption(accessTokenOption()).option("--channel-id <id>", "BigCommerce channel ID", parseChannelId2).option("--storefront-token <token>", "BigCommerce storefront token").option(
  "--gh-ref <ref>",
  "Extract a specific ref (tag, branch, or commit) from the source repository",
  "@bigcommerce/catalyst-core@latest"
).option("--repository <repository>", "GitHub repository to extract from", "bigcommerce/catalyst").option(
  "--env <vars...>",
  "Arbitrary environment variables to set in .env.local. Format: KEY=VALUE (repeatable).",
  parseEnvFlag
).option(
  "--hosting <mode>",
  'Hosting mode: "self-hosted" (default) or "bigcommerce" to set up Storefront Hosting at create time. When omitted, scaffolding is hosting-agnostic; run `catalyst deploy` later to opt in.',
  parseHosting
).option(
  "--use-existing",
  "Only used with --hosting bigcommerce and --project-name. When the named project already exists on the store, reuse it instead of prompting. Has no effect without --hosting bigcommerce."
).addOption(
  new Option5("--bigcommerce-hostname <hostname>", "BigCommerce hostname").default("bigcommerce.com").hideHelp()
).addOption(
  new Option5("--login-url <url>", "BigCommerce login URL.").env("BIGCOMMERCE_LOGIN_URL").default(DEFAULT_LOGIN_URL).hideHelp()
).addOption(
  new Option5("--cli-api-origin <origin>", "Catalyst CLI API origin").default("https://cxm-prd.bigcommerceapp.com").hideHelp()
).action(async (options) => {
  const { ghRef, repository } = options;
  if (options.useExisting && options.hosting !== "bigcommerce") {
    consola.warn("--use-existing has no effect without --hosting bigcommerce. Ignoring.");
  }
  checkRequiredTools();
  const { projectName, projectDir } = await setupProject({
    projectName: options.projectName,
    projectDir: options.projectDir
  });
  let storeHash = options.storeHash;
  let accessToken = options.accessToken;
  let channelId = options.channelId;
  let storefrontToken = options.storefrontToken;
  let envVars = {};
  if (!storeHash || !accessToken) {
    const apiHost = `api.${options.bigcommerceHostname}`;
    try {
      const credentials = await login(options.loginUrl, apiHost);
      storeHash = credentials.storeHash;
      accessToken = credentials.accessToken;
    } catch (error) {
      if (error instanceof LoginAbortedError) {
        consola.info(
          "Login aborted. Re-run `catalyst create` when you have your credentials ready."
        );
        process.exit(0);
        return;
      }
      throw error;
    }
  }
  const useCommerceHosting = options.hosting === "bigcommerce";
  await getTelemetry().identify(storeHash);
  if (storeHash && channelId && storefrontToken) {
    envVars.BIGCOMMERCE_STORE_HASH = storeHash;
    envVars.BIGCOMMERCE_CHANNEL_ID = channelId.toString();
    envVars.BIGCOMMERCE_STOREFRONT_TOKEN = storefrontToken;
  }
  if (storeHash && accessToken && (!channelId || !storefrontToken)) {
    const apiHost = `api.${options.bigcommerceHostname}`;
    const cliApiOrigin = options.cliApiOrigin;
    if (channelId && !storefrontToken) {
      const initData = await getChannelInit(channelId, storeHash, accessToken, cliApiOrigin);
      envVars = { ...initData.envVars };
      storefrontToken = initData.storefrontToken;
    } else if (!channelId) {
      const eligibility = await checkChannelEligibility(storeHash, accessToken, cliApiOrigin);
      if (!eligibility.eligible) {
        consola.warn(eligibility.message);
      }
      let shouldCreateChannel;
      if (eligibility.eligible) {
        shouldCreateChannel = await select5({
          message: "Would you like to create a new channel?",
          choices: [
            { name: "Yes", value: true },
            { name: "No", value: false }
          ]
        });
      }
      if (shouldCreateChannel) {
        const channelData = await runCreateChannelFlow({
          storeHash,
          accessToken,
          apiHost,
          cliApiOrigin
        });
        channelId = channelData.channelId;
        storefrontToken = channelData.storefrontToken;
        envVars = { ...channelData.envVars };
        consola.success("Channel created successfully.");
        consola.warn(
          "A preview storefront has been deployed in your BigCommerce control panel. This preview may look different from your local environment as it may be running different code. Additionally, it may take a few minutes for the channel storefront to be accessible."
        );
      }
      if (!shouldCreateChannel) {
        channelId = await handleChannelSelection(storeHash, accessToken, apiHost);
        const initData = await getChannelInit(channelId, storeHash, accessToken, cliApiOrigin);
        envVars = { ...initData.envVars };
        storefrontToken = initData.storefrontToken;
      }
    }
  }
  if (options.env) {
    Object.assign(envVars, options.env);
  }
  if (options.storeHash) envVars.BIGCOMMERCE_STORE_HASH = options.storeHash;
  if (options.channelId) envVars.BIGCOMMERCE_CHANNEL_ID = options.channelId.toString();
  if (options.storefrontToken) envVars.BIGCOMMERCE_STOREFRONT_TOKEN = options.storefrontToken;
  if (useCommerceHosting && accessToken) {
    envVars.BIGCOMMERCE_ACCESS_TOKEN = accessToken;
  }
  let commerceHostingProject;
  if (useCommerceHosting && storeHash && accessToken) {
    const apiHost = `api.${options.bigcommerceHostname}`;
    const hasAccess = await hasProjectsAccess(storeHash, accessToken, apiHost);
    if (!hasAccess) {
      consola.error(
        "This store does not have access to the Infrastructure Projects API. Contact support@bigcommerce.com to enable it."
      );
      process.exit(1);
    }
    commerceHostingProject = await promptForCommerceHostingProject(
      { storeHash, accessToken, apiHost },
      projectName,
      !!options.projectName,
      options.useExisting
    );
  }
  consola.info(`Creating '${projectName}' at '${projectDir}'`);
  const packageManager = detectPackageManager();
  try {
    await extractCatalyst({ repository, ref: ghRef, projectDir });
    await rewriteCorePackage(projectDir, ghRef);
    setupCoreProject(projectDir);
    if (useCommerceHosting && commerceHostingProject && storeHash && accessToken) {
      await setupCommerceHosting({
        projectDir,
        projectUuid: commerceHostingProject.uuid,
        storeHash,
        accessToken
      });
    }
    if (storeHash && accessToken) {
      const projectConfig = getProjectConfig(projectDir);
      projectConfig.set("storeHash", storeHash);
      projectConfig.set("accessToken", accessToken);
    }
    writeEnv(projectDir, envVars);
    await installDependencies(projectDir, packageManager);
    initGitRepo(projectDir);
  } catch (error) {
    if (pathExistsSync(projectDir)) {
      consola.warn(
        `Setup failed before completion. '${projectDir}' may be in a partial state \u2014 review and delete it before re-running 'catalyst create'.`
      );
    }
    throw error;
  }
  consola.success(`Created '${projectName}' at '${projectDir}'`);
  const steps = [`cd ${projectName} && ${packageManager} run dev`];
  if (useCommerceHosting) {
    steps.push(
      `Run 'cd ${projectName} && ${packageManager} run deploy' when ready to deploy to Storefront Hosting.`
    );
  }
  consola.log(
    `Next steps:

${steps.map((step) => `  ${colorize6("yellow", step)}`).join("\n")}`
  );
});

// src/cli/commands/debug.ts
import { Command as Command5, Option as Option6 } from "commander";
var debug = new Command5("debug").configureHelp({ showGlobalOptions: true }).description(
  "Print a diagnostic report (CLI, runtime, project, and config state) to include when filing a bug report. Never prints secret values \u2014 credentials and env vars are reported by presence only."
).addHelpText(
  "after",
  `
Examples:
  # Print a human-readable report
  $ catalyst debug

  # Print machine-readable JSON (useful for copy/paste or piping)
  $ catalyst debug --json`
).addOption(new Option6("--json", "Output the report as JSON.")).action((options) => {
  const diagnostics = collectDiagnostics();
  if (options.json) {
    consola.log(JSON.stringify(diagnostics, null, 2));
    return;
  }
  consola.log(formatDiagnosticsReport(diagnostics));
});

// src/cli/commands/deploy.ts
import { confirm as confirm7 } from "@inquirer/prompts";
import AdmZip from "adm-zip";
import { Command as Command6, Option as Option7 } from "commander";
import { colorize as colorize7 } from "consola/utils";
import { access as access2, readdir, readFile } from "fs/promises";
import { join as join13 } from "path";
import yoctoSpinner3 from "yocto-spinner";
import { z as z13 } from "zod";

// src/cli/lib/deploy-channel-urls.ts
import { confirm as confirm6 } from "@inquirer/prompts";
function deployedChannelId(secrets) {
  const raw = secrets.find((secret) => secret.key === "BIGCOMMERCE_CHANNEL_ID")?.value ?? process.env.BIGCOMMERCE_CHANNEL_ID;
  const id = Number(raw);
  return Number.isInteger(id) && id > 0 ? id : void 0;
}
async function offerChannelUrlUpdates(options) {
  const { storeHash, accessToken, apiHost, projectUuid, config: config2, channelId } = options;
  if (!canPrompt() || channelId === void 0) return;
  const [site, projects2] = await Promise.all([
    getChannelSite(channelId, storeHash, accessToken, apiHost),
    fetchProjects(storeHash, accessToken, apiHost)
  ]);
  const deploymentHostnames = projects2.find((project) => project.uuid === projectUuid)?.deployment_hostnames ?? [];
  const storefrontUrl = (findChannelSiteUrl(site, "primary") ?? site.url).replace(/\/$/, "");
  let storefrontHostname = deploymentHostnames.find(
    (deployed) => storefrontUrl === `https://${deployed}`
  );
  storefrontHostname ?? (storefrontHostname = await offerSiteUrl({ ...options, channelId }, storefrontUrl));
  if (storefrontHostname === void 0) return;
  await offerManagedCheckoutUrl({
    storeHash,
    accessToken,
    apiHost,
    channelId,
    storefrontHostname,
    config: config2,
    respectOptOut: true,
    defaultAnswer: false
  });
}
async function offerSiteUrl(options, storefrontUrl) {
  const { storeHash, accessToken, apiHost, projectUuid, config: config2, channelId } = options;
  const declined = config2.get("declinedSiteUrlChannels") ?? [];
  if (declined.includes(channelId)) return void 0;
  const shouldUpdate = await confirm6({
    message: `Channel ${channelId}'s site URL is ${storefrontUrl}. Point it at this deployment?`,
    // Unasked-for after a deploy, so Enter mustn't change a live channel.
    default: false
  });
  if (!shouldUpdate) {
    config2.set("declinedSiteUrlChannels", [...declined, channelId]);
    consola.info(
      `Won't ask again for channel ${channelId}. To change it later, run \`catalyst channels update --channel-id ${channelId}\`.`
    );
    return void 0;
  }
  const { hostname } = await runChannelSiteUrlFlow({
    storeHash,
    accessToken,
    apiHost,
    projectUuid,
    // The deploy knows both; the hostname picker only shows if it reported none.
    channelId,
    hostname: options.deploymentHostname,
    // On the managed zone the checkout offer follows; elsewhere, warn instead.
    diagnoseCheckout: !isManagedHostingHostname(options.deploymentHostname ?? "")
  });
  return hostname;
}

// src/cli/lib/deployment-errors.ts
var ERROR_MESSAGES = {
  10: "Something went wrong on our end. Please try again. If the issue persists, contact support.",
  20: "We couldn't retrieve your bundle. This is usually a temporary issue \u2014 please try deploying again. If the problem continues, contact support.",
  30: "Your bundle could not be extracted. This may mean your build output is too large (max 64 MB compressed / 512 MB uncompressed) or the archive is corrupted. Try reducing your build size or rebuilding your project and deploying again.",
  40: `There's a problem with your build output. This could be caused by:
- A worker.js file larger than 40 MB
- An individual asset file larger than 25 MB
- More than 1,000 total files in the bundle`,
  50: "Deployment failed. This is usually a temporary issue \u2014 please try again. If the problem persists, contact support.",
  60: "Your code was deployed, but we couldn't determine your deployment URL. Please try deploying again. If the issue persists, contact support."
};
function getDeploymentErrorMessage(code) {
  return ERROR_MESSAGES[code] ?? `Deployment failed with an unexpected error (code: ${code}). Please try again. If the issue persists, contact support.`;
}

// src/cli/commands/deploy.ts
var stepsEnum = z13.enum([
  "initializing",
  "downloading",
  "unzipping",
  "processing",
  "deploying",
  "finalizing",
  "complete"
]);
var STEPS = {
  initializing: "Initializing...",
  downloading: "Downloading...",
  unzipping: "Unzipping...",
  processing: "Processing...",
  deploying: "Deploying...",
  finalizing: "Finalizing...",
  complete: "Complete"
};
var UploadSignatureSchema = z13.object({
  data: z13.object({
    upload_url: z13.url(),
    upload_uuid: z13.string()
  })
});
var CreateDeploymentSchema = z13.object({
  data: z13.object({
    deployment_uuid: z13.uuid()
  })
});
var ProjectSchema = z13.object({
  data: z13.array(
    z13.object({
      uuid: z13.uuid(),
      name: z13.string()
    })
  )
});
var DeploymentStatusSchema = z13.object({
  deployment_uuid: z13.uuid(),
  deployment_status: z13.enum(["queued", "in_progress", "failed", "completed"]),
  event: z13.object({
    step: stepsEnum,
    progress: z13.number()
  }).nullable(),
  deployment_hostnames: z13.array(z13.string()).optional(),
  error: z13.object({
    code: z13.number()
  }).optional()
});
var generateBundleZip = async () => {
  consola.info("Generating bundle...");
  const bigcommerceDir = join13(process.cwd(), ".bigcommerce");
  const distDir = join13(process.cwd(), ".bigcommerce", "dist");
  try {
    await access2(distDir);
  } catch {
    throw new Error(`Dist directory not found: ${distDir}`);
  }
  const buildDirContents = await readdir(distDir);
  if (buildDirContents.length === 0) {
    throw new Error(`Dist directory is empty: ${distDir}`);
  }
  const outputZip = join13(bigcommerceDir, "bundle.zip");
  const zip = new AdmZip();
  zip.addLocalFolder(distDir, "output");
  zip.writeZip(outputZip);
  consola.success(`Bundle created at: ${outputZip}`);
};
var generateUploadSignature = async (storeHash, accessToken, apiHost) => {
  consola.info("Generating upload signature...");
  const response = await fetch(
    `https://${apiHost}/stores/${storeHash}/v3/infrastructure/deployments/uploads`,
    {
      method: "POST",
      headers: {
        "X-Auth-Token": accessToken,
        "Content-Type": "application/json",
        Accept: "application/json",
        "X-Correlation-Id": getTelemetry().correlationId
      },
      body: JSON.stringify({})
    }
  );
  assertAuthorized(response);
  if (!response.ok) {
    throw await httpError(response, "Failed to generate upload signature");
  }
  const res = await response.json();
  const { data } = UploadSignatureSchema.parse(res);
  consola.success("Upload signature generated.");
  return data;
};
var uploadBundleZip = async (uploadUrl) => {
  consola.info("Uploading bundle...");
  const zipPath = join13(process.cwd(), ".bigcommerce", "bundle.zip");
  const fileBuffer = await readFile(zipPath);
  const response = await fetch(uploadUrl, {
    method: "PUT",
    headers: {
      "Content-Type": "application/zip"
    },
    body: fileBuffer
  });
  if (!response.ok) {
    throw await httpError(response, "Failed to upload bundle");
  }
  consola.success("Bundle uploaded successfully.");
  return true;
};
var NATIVE_HOSTING_ENV = {
  type: "plain_text",
  key: "CATALYST_HOSTING",
  value: "native"
};
var parseEnvironmentVariables = (secretOption) => {
  return secretOption?.map((envVar) => {
    const { key, value } = parseEnvAssignment(envVar);
    return {
      type: "secret",
      key,
      value
    };
  });
};
var createDeployment = async (projectUuid, uploadUuid, storeHash, accessToken, apiHost, environmentVariables) => {
  consola.info("Creating deployment...");
  const response = await fetch(
    `https://${apiHost}/stores/${storeHash}/v3/infrastructure/deployments`,
    {
      method: "POST",
      headers: {
        "X-Auth-Token": accessToken,
        "Content-Type": "application/json",
        Accept: "application/json",
        "X-Correlation-Id": getTelemetry().correlationId
      },
      body: JSON.stringify({
        project_uuid: projectUuid,
        upload_uuid: uploadUuid,
        environment_variables: environmentVariables
      })
    }
  );
  assertAuthorized(response);
  if (!response.ok) {
    throw await httpError(response, "Failed to create deployment");
  }
  const res = await response.json();
  const { data } = CreateDeploymentSchema.parse(res);
  consola.success("Deployment started...");
  return data;
};
var DEPLOYMENT_STATUS_TIMEOUT_MS = 15 * 60 * 1e3;
var RECONNECT_DELAY_MS = 1e3;
var isNetworkError = (error) => error instanceof TypeError;
var timeoutError = () => new Error(
  "Timed out waiting for the deployment to finish. It may still complete in the background."
);
var normalizeLineEndings = (text, { keepTrailingCr = false } = {}) => text.replace(keepTrailingCr ? /\r\n|\r(?!$)/g : /\r\n?/g, "\n");
var frameData = (frame) => frame.split("\n").filter((line) => line.startsWith("data:")).map((line) => line.slice("data:".length).trim()).join("\n");
var readDeploymentEvents = async (deploymentUuid, storeHash, accessToken, apiHost, signal, onEvent) => {
  const response = await fetch(
    `https://${apiHost}/stores/${storeHash}/v3/infrastructure/deployments/${deploymentUuid}/events`,
    {
      method: "GET",
      headers: {
        "X-Auth-Token": accessToken,
        Accept: "text/event-stream",
        Connection: "keep-alive",
        "X-Correlation-Id": getTelemetry().correlationId
      },
      signal
    }
  );
  assertAuthorized(response);
  if (!response.ok) {
    throw await httpError(response, "Failed to open deployment event stream");
  }
  const reader = response.body?.getReader();
  if (!reader) {
    throw new Error("Failed to read event stream.");
  }
  signal.addEventListener(
    "abort",
    () => {
      reader.cancel().catch(() => void 0);
    },
    { once: true }
  );
  const decoder = new TextDecoder();
  let buffer = "";
  const processFrame = (frame) => {
    const event = frameData(frame);
    if (!event) {
      return;
    }
    let json;
    try {
      json = JSON.parse(event);
    } catch (error) {
      consola.warn(`Failed to parse event, dropping from stream. Event: ${event}`, error);
      return;
    }
    onEvent(DeploymentStatusSchema.parse(json));
  };
  while (true) {
    const { value, done } = await reader.read();
    if (done) {
      processFrame(normalizeLineEndings(buffer + decoder.decode()));
      break;
    }
    const frames = normalizeLineEndings(buffer + decoder.decode(value, { stream: true }), {
      keepTrailingCr: true
    }).split("\n\n");
    buffer = frames.pop() ?? "";
    frames.forEach(processFrame);
  }
};
var getDeploymentStatus = async (deploymentUuid, storeHash, accessToken, apiHost, { timeoutMs = DEPLOYMENT_STATUS_TIMEOUT_MS, reconnectDelayMs = RECONNECT_DELAY_MS } = {}) => {
  consola.info("Fetching deployment status...");
  const spinner = yoctoSpinner3().start("Fetching...");
  const deadline = Date.now() + timeoutMs;
  let status;
  let deploymentHostname;
  const onEvent = (data) => {
    if (data.error) {
      throw new Error(
        `Deployment failed (error code ${data.error.code}): ${getDeploymentErrorMessage(data.error.code)}`
      );
    }
    if (data.deployment_status === "failed") {
      throw new Error("Deployment failed.");
    }
    if (data.event && STEPS[data.event.step] !== spinner.text) {
      spinner.text = STEPS[data.event.step];
    }
    if (data.deployment_hostnames && data.deployment_hostnames.length > 0) {
      deploymentHostname = data.deployment_hostnames[0];
    }
    status = data.deployment_status;
  };
  while (true) {
    const signal = AbortSignal.timeout(Math.max(deadline - Date.now(), 0));
    try {
      await readDeploymentEvents(deploymentUuid, storeHash, accessToken, apiHost, signal, onEvent);
    } catch (error) {
      if (status !== "completed") {
        if (signal.aborted) {
          throw timeoutError();
        }
        if (!isNetworkError(error)) {
          throw error;
        }
        consola.debug("Deployment event stream disconnected.", error);
      }
    }
    if (status === "completed") {
      break;
    }
    if (Date.now() >= deadline) {
      throw timeoutError();
    }
    consola.debug("Reconnecting to the deployment event stream...");
    await new Promise((resolve2) => setTimeout(resolve2, reconnectDelayMs));
  }
  spinner.success("Deployment completed successfully.");
  if (deploymentHostname) {
    consola.success(
      `View your deployment at: ${colorize7("blue", `https://${deploymentHostname}`)}`
    );
  }
  return deploymentHostname;
};
var resolveDeploymentSecrets = (storedEnv, envFileVars, flagSecrets) => {
  const envFileSecrets = toEnvFileSecrets(envFileVars ?? {});
  const overriddenKeys = envFileSecrets.filter(({ key, value }) => key in storedEnv && storedEnv[key] !== value).filter(({ key }) => !flagSecrets.some((secret) => secret.key === key)).map(({ key }) => key);
  if (overriddenKeys.length > 0) {
    consola.info(
      `--env-path overrides values saved with \`catalyst env add\`: ${overriddenKeys.join(", ")}`
    );
  }
  return mergeDeploymentSecrets(toDeploymentSecrets(storedEnv), envFileSecrets, flagSecrets);
};
var fetchProject = async (projectUuid, storeHash, accessToken, apiHost) => {
  const response = await fetch(
    `https://${apiHost}/stores/${storeHash}/v3/infrastructure/projects`,
    {
      method: "GET",
      headers: {
        "X-Auth-Token": accessToken,
        "Content-Type": "application/json",
        Accept: "application/json",
        "X-Correlation-Id": getTelemetry().correlationId
      }
    }
  );
  assertAuthorized(response);
  if (!response.ok) {
    throw await httpError(response, "Failed to fetch projects");
  }
  const res = await response.json();
  const { data } = ProjectSchema.parse(res);
  return data.find((project) => project.uuid === projectUuid);
};
var deploy = new Command6("deploy").configureHelp({ showGlobalOptions: true }).description("Deploy your application to Cloudflare.").addHelpText(
  "after",
  `
Environment variables saved with \`catalyst env add\` are sent automatically on every deploy.
\`--env-path <file>\` overrides them with that file's variables, and \`--secret\` sets or
overrides a single variable for this run (it wins over both).

Without \`--update-site-url\` or \`--update-checkout-url\`, an interactive deploy offers to
point the channel's site URL at the deployment and to move its checkout onto the same domain.
Each is checked on every deploy; declining either is saved in .bigcommerce/project.json.

Example:
  $ catalyst deploy --secret BIGCOMMERCE_STORE_HASH=<YOUR_STORE_HASH> --secret BIGCOMMERCE_STOREFRONT_TOKEN=<YOUR_STOREFRONT_TOKEN>`
).addOption(storeHashOption()).addOption(accessTokenOption()).addOption(apiHostOption()).addOption(projectUuidOption()).option(
  "--update-site-url",
  "After a successful deploy, prompt to update a channel's site URL to the new hostname."
).option(
  "--update-checkout-url",
  "After a successful deploy, prompt to update a channel's checkout URL."
).addOption(
  new Option7(
    "--secret <value>",
    "Secret to set for this deployment (repeatable). Overrides a stored value for the same key. Format: --secret KEY=VALUE"
  ).argParser((value, previous = []) => {
    return previous.concat([value]);
  })
).option("--dry-run", "Run the command to generate the bundle without uploading or deploying.").option(
  "--prebuilt",
  "Skip the build step. Requires .bigcommerce/dist/ to already contain build output."
).addOption(
  new Option7(
    "--wrangler-version <version>",
    `Wrangler version or dist-tag to build with. Ignored with --prebuilt. Defaults to ${WRANGLER_VERSION}.`
  ).argParser(parseWranglerVersion)
).addOption(envPathOption()).action(async (options) => {
  const config2 = getProjectConfig();
  const apiHost = resolveApiHost(options, config2);
  const { storeHash, accessToken } = resolveCredentials(options, config2);
  const telemetry2 = getTelemetry();
  await telemetry2.identify(storeHash);
  const linkedProjectUuid = options.projectUuid ?? config2.get("projectUuid");
  let projectUuid;
  const promptForProject = async () => {
    try {
      return await selectOrCreateInfrastructureProject({
        storeHash,
        accessToken,
        apiHost
      });
    } catch (error) {
      if (error instanceof NoLinkedProjectError) {
        consola.info(
          "When you're ready to create a project, run `catalyst projects create` or re-run `catalyst deploy`."
        );
        process.exit(0);
      }
      throw error;
    }
  };
  if (linkedProjectUuid) {
    const existing = await fetchProject(linkedProjectUuid, storeHash, accessToken, apiHost);
    if (existing) {
      projectUuid = linkedProjectUuid;
    } else {
      consola.warn(
        `The linked project (${linkedProjectUuid}) no longer exists on this store. It may have been deleted.`
      );
      const selected = await promptForProject();
      projectUuid = selected.uuid;
      config2.set("projectUuid", projectUuid);
      consola.success(`Linked project "${selected.name}".`);
    }
  } else {
    consola.info("No project is currently linked.");
    const selected = await promptForProject();
    projectUuid = selected.uuid;
    config2.set("projectUuid", projectUuid);
    consola.success(`Linked project "${selected.name}".`);
  }
  if (!getProjectState().isTransformed) {
    const shouldSetup = await confirm7({
      message: "Your project is not yet set up for Storefront Hosting deployments. Would you like to run the Storefront Hosting setup now?",
      default: true
    });
    if (!shouldSetup) {
      consola.info("When you're ready to deploy, re-run `catalyst deploy` to complete setup.");
      process.exit(0);
    }
    const projectDir = process.cwd();
    await setupCommerceHosting({ projectDir, projectUuid, storeHash, accessToken });
    consola.success("Storefront Hosting setup complete.");
    const packageManager = await detectProjectPackageManager(projectDir);
    await installDependencies(projectDir, packageManager);
  } else {
    await cleanupCloudflareIncompatibilities(process.cwd());
    if (options.prebuilt) {
      const projectDir = process.cwd();
      await reconcileOpenNextVersion(projectDir, await detectProjectPackageManager(projectDir), {
        canUpgrade: false
      });
    }
  }
  let envFileVars;
  if (options.prebuilt) {
    const distDir = join13(process.cwd(), ".bigcommerce", "dist");
    try {
      await access2(distDir);
    } catch {
      throw new Error(
        "No build output found at .bigcommerce/dist/. Run `catalyst build` first or remove `--prebuilt` to build automatically."
      );
    }
    const contents = await readdir(distDir);
    if (contents.length === 0) {
      throw new Error(
        "No build output found at .bigcommerce/dist/. Run `catalyst build` first or remove `--prebuilt` to build automatically."
      );
    }
    consola.info("Using existing build output (--prebuilt).");
    if (options.envPath !== void 0) {
      envFileVars = loadBuildEnv({ envPath: options.envPath });
    }
  } else {
    envFileVars = loadBuildEnv({ envPath: options.envPath });
    await buildCatalystProject(projectUuid, options.wranglerVersion, envFileVars);
  }
  const mergedSecrets = resolveDeploymentSecrets(
    getStoredEnv(config2),
    envFileVars,
    parseEnvironmentVariables(options.secret) ?? []
  );
  const environmentVariables = [...mergedSecrets, NATIVE_HOSTING_ENV];
  await generateBundleZip();
  if (options.dryRun) {
    consola.info("Dry run enabled \u2014 skipping upload and deployment steps.");
    consola.info("Next steps (skipped):");
    consola.info("- Generate upload signature");
    consola.info("- Upload bundle.zip");
    consola.info("- Create deployment");
    process.exit(0);
  }
  const uploadSignature = await generateUploadSignature(storeHash, accessToken, apiHost);
  await uploadBundleZip(uploadSignature.upload_url);
  const { deployment_uuid: deploymentUuid } = await createDeployment(
    projectUuid,
    uploadSignature.upload_uuid,
    storeHash,
    accessToken,
    apiHost,
    environmentVariables
  );
  const deploymentHostname = await getDeploymentStatus(
    deploymentUuid,
    storeHash,
    accessToken,
    apiHost
  );
  const warnChannelFlowFailed = (what, error) => {
    consola.warn(
      `Failed to update channel ${what}: ${error instanceof Error ? error.message : String(error)}`
    );
    consola.info(
      "Update it manually in the control panel, or re-run `catalyst auth login` if the token is missing the store_channel_settings scope."
    );
  };
  let resolvedChannelId;
  let siteHostname;
  if (options.updateSiteUrl) {
    try {
      ({ channelId: resolvedChannelId, hostname: siteHostname } = await runChannelSiteUrlFlow({
        storeHash,
        accessToken,
        apiHost,
        projectUuid,
        preferHostname: deploymentHostname
      }));
    } catch (error) {
      warnChannelFlowFailed("site URL", error);
    }
  }
  if (options.updateCheckoutUrl) {
    try {
      await runChannelCheckoutUrlFlow({
        storeHash,
        accessToken,
        apiHost,
        channelId: resolvedChannelId,
        storefrontHostname: siteHostname
      });
    } catch (error) {
      warnChannelFlowFailed("checkout URL", error);
    }
  }
  if (!options.updateSiteUrl && !options.updateCheckoutUrl) {
    try {
      await offerChannelUrlUpdates({
        storeHash,
        accessToken,
        apiHost,
        projectUuid,
        config: config2,
        deploymentHostname,
        channelId: deployedChannelId(mergedSecrets)
      });
    } catch (error) {
      warnChannelFlowFailed("URLs", error);
    }
  }
});

// src/cli/commands/domains.ts
import { confirm as confirm8, select as select6 } from "@inquirer/prompts";
import { Command as Command7, Option as Option8 } from "commander";
import { colorize as colorize9 } from "consola/utils";

// src/cli/lib/domains.ts
import { z as z15 } from "zod";

// src/cli/lib/observability.ts
import { colorize as colorize8 } from "consola/utils";
import { z as z14 } from "zod";
var LOG_LEVELS = ["debug", "info", "warn", "error"];
var SEVEN_DAYS_MS = 7 * 24 * 60 * 60 * 1e3;
var logEntrySchema = z14.object({
  timestamp: z14.string().nullable().optional(),
  entry_type: z14.string().optional(),
  level: z14.string().optional(),
  messages: z14.array(z14.unknown()).optional(),
  is_exception: z14.boolean().optional(),
  exception_name: z14.string().optional(),
  request: z14.object({
    method: z14.string().optional(),
    url: z14.string().optional(),
    status_code: z14.number().optional()
  }).nullable().optional()
});
var queryLogsSchema = z14.object({
  data: z14.array(logEntrySchema),
  meta: z14.object({
    cursor_pagination: z14.object({
      // The REST proxy exposes page availability via links, while the
      // gRPC response uses has_next_page/has_prev_page. Accept both while
      // the API contract is transitioning.
      has_next_page: z14.boolean().optional(),
      has_prev_page: z14.boolean().optional(),
      start_cursor: z14.string().nullable().optional(),
      end_cursor: z14.string().nullable().optional(),
      links: z14.object({
        next: z14.string().optional(),
        previous: z14.string().optional()
      }).optional()
    }).optional()
  }).optional()
});
var v3ErrorSchema = z14.object({
  title: z14.string().optional(),
  errors: z14.record(z14.string(), z14.string()).optional()
});
function formatV3Error(body) {
  const parsed = v3ErrorSchema.safeParse(body);
  if (!parsed.success) return void 0;
  const { title, errors } = parsed.data;
  const fieldErrors = errors && Object.keys(errors).length > 0 ? Object.entries(errors).map(([field, message]) => `${field}: ${message}`).join("; ") : void 0;
  if (title && fieldErrors) return `${title} (${fieldErrors})`;
  return title ?? fieldErrors;
}
function parseTimeInput(value) {
  const trimmed = value.trim();
  if (/^\d+$/.test(trimmed)) {
    return Number(trimmed) * 1e3;
  }
  const ms = Date.parse(trimmed);
  return Number.isNaN(ms) ? null : ms;
}
var DURATION_UNIT_MS = {
  s: 1e3,
  m: 60 * 1e3,
  h: 60 * 60 * 1e3,
  d: 24 * 60 * 60 * 1e3
};
function parseDuration(value) {
  const match = /^(\d+)([smhd])$/.exec(value.trim());
  if (!match) return null;
  return Number(match[1]) * DURATION_UNIT_MS[match[2]];
}
function resolveTimeWindow(opts, nowMs = Date.now()) {
  const { since } = opts;
  let { start: start2, end } = opts;
  let startMs;
  let endMs;
  if (end) {
    endMs = parseTimeInput(end);
    if (endMs === null) {
      throw new UserActionableError(
        `Invalid --end value "${end}". Provide an ISO-8601 timestamp or a Unix epoch (seconds).`
      );
    }
  } else {
    endMs = nowMs;
    end = new Date(endMs).toISOString();
  }
  if (since) {
    const durationMs = parseDuration(since);
    if (durationMs === null) {
      throw new UserActionableError(
        `Invalid --since value "${since}". Provide a duration like 30m, 6h, or 2d (units: s, m, h, d).`
      );
    }
    startMs = endMs - durationMs;
    start2 = new Date(startMs).toISOString();
  } else if (start2) {
    startMs = parseTimeInput(start2);
    if (startMs === null) {
      throw new UserActionableError(
        `Invalid --start value "${start2}". Provide an ISO-8601 timestamp or a Unix epoch (seconds).`
      );
    }
  } else {
    throw new UserActionableError(
      "Provide a time window with --since <duration> or --start <time>."
    );
  }
  if (startMs > endMs) {
    throw new UserActionableError("Invalid time window: --start must be before or equal to --end.");
  }
  if (endMs - startMs > SEVEN_DAYS_MS) {
    throw new UserActionableError("Invalid time window: the range must not exceed 7 days.");
  }
  return { start: start2, end };
}
var LEVEL_COLORS = {
  debug: "gray",
  info: "green",
  warn: "yellow",
  error: "red"
};
var UNKNOWN_TIME = "unknown";
function isRedundantExceptionName(name, message) {
  const parts = name.split("<*>").map((part) => part.trim()).filter((part) => part.length > 0);
  return parts.length > 0 && parts.every((part) => message.includes(part));
}
var stringifyMessage = (message) => typeof message === "string" ? message : JSON.stringify(message);
var joinMessages = (messages) => (messages ?? []).map(stringifyMessage).join(" ").replace(/\s+/g, " ").trim();
function isRequestLogEntry(entry) {
  if (entry.entry_type != null) return entry.entry_type === "request";
  const method = entry.request?.method;
  const url = entry.request?.url;
  if (!method || !url) return false;
  return joinMessages(entry.messages) === `${method} ${url}`;
}
function formatLogEntry(entry, format = "default") {
  const message = joinMessages(entry.messages);
  if (format === "short") return message;
  const level = entry.level ?? "unknown";
  const coloredLevel = colorize8(LEVEL_COLORS[level.toLowerCase()] ?? "white", level.toUpperCase());
  const exceptionStr = entry.is_exception && entry.exception_name && !isRedundantExceptionName(entry.exception_name, message) ? ` ${colorize8("red", `[${entry.exception_name}]`)}` : "";
  let requestStr = "";
  if (format === "request" && entry.request) {
    const parts = [];
    if (entry.request.method) parts.push(entry.request.method);
    if (entry.request.url) parts.push(entry.request.url);
    const status = entry.request.status_code ? ` (${entry.request.status_code})` : "";
    if (parts.length > 0) requestStr = ` ${parts.join(" ")}${status}`;
  }
  if (format === "request" && isRequestLogEntry(entry)) {
    return `[${entry.timestamp ?? UNKNOWN_TIME}]${requestStr}`;
  }
  return `[${entry.timestamp ?? UNKNOWN_TIME}]${requestStr} [${coloredLevel}]${exceptionStr} ${message}`;
}
async function queryLogs(projectUuid, storeHash, accessToken, apiHost, params) {
  const search = new URLSearchParams();
  search.set("start", params.start);
  search.set("end", params.end);
  if (params.entryType) search.set("entry_type", params.entryType);
  if (params.method) search.set("method", params.method);
  if (params.statusCode != null) search.set("status_code", String(params.statusCode));
  if (params.urlLike) search.set("url:like", params.urlLike);
  if (params.levelMin) search.set("level:min", params.levelMin);
  if (params.limit != null) search.set("limit", String(params.limit));
  if (params.after) search.set("after", params.after);
  if (params.before) search.set("before", params.before);
  const response = await fetch(
    `https://${apiHost}/stores/${storeHash}/v3/infrastructure/logs/${projectUuid}?${search.toString()}`,
    {
      method: "GET",
      headers: {
        "X-Auth-Token": accessToken,
        "X-Correlation-Id": getTelemetry().correlationId,
        Accept: "application/json"
      }
    }
  );
  assertAuthorized(response);
  if (response.status === 403) {
    throw new UserActionableError(
      "Infrastructure Logs API not enabled. If you are part of the beta, contact support@bigcommerce.com to enable it."
    );
  }
  if (response.status === 404) {
    throw new UserActionableError(
      "Project not found. Check the project UUID, and that --store-hash and --access-token belong to the store that owns the project."
    );
  }
  if (response.status === 400 || response.status === 422) {
    const body = await response.json().catch(() => null);
    throw new UserActionableError(formatV3Error(body) ?? "Invalid log query.");
  }
  if (!response.ok) {
    throw await httpError(response, "Failed to fetch logs");
  }
  const res = await response.json();
  return queryLogsSchema.parse(res);
}

// src/cli/lib/domains.ts
var domainStatusSchema = z15.enum(["pending", "verified", "failed", "unknown"]);
var pointingRecordsSchema = z15.object({
  a_record_value: z15.string().nullish(),
  cname_record_value: z15.string().nullish()
});
var domainSchema = z15.object({
  domain: z15.string(),
  project_uuid: z15.string(),
  verification_status: domainStatusSchema
});
var createdDomainSchema = domainSchema.extend({
  pointing_records: pointingRecordsSchema.nullish()
});
var ownershipVerificationSchema = z15.object({
  type: z15.string(),
  name: z15.string(),
  value: z15.string().optional()
});
var ownershipVerificationMetaSchema = z15.object({
  meta: z15.object({
    ownership_verification: ownershipVerificationSchema
  })
});
var DomainOwnershipVerificationError = class extends UserActionableError {
  constructor(message, ownershipVerification) {
    super(message);
    this.name = "DomainOwnershipVerificationError";
    this.ownershipVerification = ownershipVerification;
  }
};
function parseOwnershipVerification(body) {
  const parsed = ownershipVerificationMetaSchema.safeParse(body);
  return parsed.success ? parsed.data.meta.ownership_verification : void 0;
}
var boundProjectMetaSchema = z15.object({
  meta: z15.object({
    project_uuid: z15.string()
  })
});
var DomainBoundToProjectError = class extends UserActionableError {
  constructor(message, projectUuid) {
    super(message);
    this.name = "DomainBoundToProjectError";
    this.projectUuid = projectUuid;
  }
};
function parseBoundProjectUuid(body) {
  const parsed = boundProjectMetaSchema.safeParse(body);
  return parsed.success ? parsed.data.meta.project_uuid : void 0;
}
var domainResponseSchema = z15.object({
  data: domainSchema
});
var createdDomainResponseSchema = z15.object({
  data: createdDomainSchema
});
var domainListResponseSchema = z15.object({
  data: z15.array(domainSchema)
});
var DOMAINS_API_NOT_ENABLED = "Infrastructure Domains API not enabled. If you are part of the beta, contact support@bigcommerce.com to enable it.";
function domainsUrl(storeHash, projectUuid, apiHost) {
  return `https://${apiHost}/stores/${storeHash}/v3/infrastructure/projects/${projectUuid}/domains`;
}
function domainUrl(storeHash, projectUuid, domain, apiHost) {
  return `${domainsUrl(storeHash, projectUuid, apiHost)}/${encodeURIComponent(domain)}`;
}
function domainClaimUrl(storeHash, projectUuid, domain, apiHost) {
  return `${domainUrl(storeHash, projectUuid, domain, apiHost)}/claim`;
}
function domainTransferUrl(storeHash, projectUuid, domain, apiHost) {
  return `${domainUrl(storeHash, projectUuid, domain, apiHost)}/transfer`;
}
function authHeaders3(accessToken) {
  return {
    Accept: "application/json",
    "X-Auth-Token": accessToken,
    "X-Correlation-Id": getTelemetry().correlationId
  };
}
function formatResponseStatus(response, message) {
  return [response.status, response.statusText || message].filter(Boolean).join(" ");
}
function buildErrorMessage(response, body, action) {
  const message = formatV3Error(body);
  if (response.status >= 500) {
    const status = formatResponseStatus(response, message);
    return `${action}: ${status}. This is a server-side response from the Domains API.`;
  }
  return message ?? `${action}: ${response.statusText}`;
}
async function assertDomainResponse(response, action) {
  assertAuthorized(response);
  if (response.status === 403) {
    throw new UserActionableError(DOMAINS_API_NOT_ENABLED);
  }
  if (response.ok) {
    return;
  }
  const body = await response.json().catch(() => null);
  const message = buildErrorMessage(response, body, action);
  const ownershipVerification = parseOwnershipVerification(body);
  if (ownershipVerification) {
    throw new DomainOwnershipVerificationError(message, ownershipVerification);
  }
  const boundProjectUuid = parseBoundProjectUuid(body);
  if (boundProjectUuid) {
    throw new DomainBoundToProjectError(message, boundProjectUuid);
  }
  if (response.status >= 500) {
    throw new Error(message);
  }
  throw new UserActionableError(message);
}
async function createDomain(domain, projectUuid, storeHash, accessToken, apiHost) {
  const response = await fetch(domainsUrl(storeHash, projectUuid, apiHost), {
    method: "POST",
    headers: {
      ...authHeaders3(accessToken),
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ domain })
  });
  await assertDomainResponse(response, "Failed to add domain");
  const result = await response.json();
  return createdDomainResponseSchema.parse(result).data;
}
async function getDomain2(domain, projectUuid, storeHash, accessToken, apiHost) {
  const response = await fetch(domainUrl(storeHash, projectUuid, domain, apiHost), {
    method: "GET",
    headers: authHeaders3(accessToken)
  });
  await assertDomainResponse(response, "Failed to fetch domain");
  const result = await response.json();
  return domainResponseSchema.parse(result).data;
}
async function findDomain(domain, projectUuid, storeHash, accessToken, apiHost) {
  const response = await fetch(domainUrl(storeHash, projectUuid, domain, apiHost), {
    method: "GET",
    headers: authHeaders3(accessToken)
  });
  if (response.status === 404) {
    return null;
  }
  await assertDomainResponse(response, "Failed to fetch domain");
  const result = await response.json();
  return domainResponseSchema.parse(result).data;
}
async function listDomains(projectUuid, storeHash, accessToken, apiHost, filters = {}) {
  const search = new URLSearchParams();
  if (filters.domains && filters.domains.length > 0) {
    search.set("domain:in", filters.domains.join(","));
  }
  if (filters.verificationStatus) {
    search.set("verification_status", filters.verificationStatus);
  }
  const query2 = search.toString();
  const url = `${domainsUrl(storeHash, projectUuid, apiHost)}${query2 ? `?${query2}` : ""}`;
  const response = await fetch(url, {
    method: "GET",
    headers: authHeaders3(accessToken)
  });
  await assertDomainResponse(response, "Failed to fetch domains");
  const result = await response.json();
  return domainListResponseSchema.parse(result).data;
}
async function deleteDomain(domain, projectUuid, storeHash, accessToken, apiHost) {
  const response = await fetch(domainUrl(storeHash, projectUuid, domain, apiHost), {
    method: "DELETE",
    headers: authHeaders3(accessToken)
  });
  await assertDomainResponse(response, `Failed to remove domain: ${response.statusText}`);
}
async function claimDomain(domain, projectUuid, storeHash, accessToken, apiHost) {
  const response = await fetch(domainClaimUrl(storeHash, projectUuid, domain, apiHost), {
    method: "POST",
    headers: authHeaders3(accessToken)
  });
  await assertDomainResponse(response, "Failed to claim domain");
}
async function transferDomain(domain, projectUuid, newProjectUuid, storeHash, accessToken, apiHost) {
  const response = await fetch(domainTransferUrl(storeHash, projectUuid, domain, apiHost), {
    method: "POST",
    headers: {
      ...authHeaders3(accessToken),
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ new_project_uuid: newProjectUuid })
  });
  await assertDomainResponse(response, "Failed to transfer domain");
}

// src/cli/commands/domains.ts
var WAIT_INTERVAL_MS = 5e3;
var WAIT_TIMEOUT_MS = 5 * 60 * 1e3;
var DOMAIN_STATUS_FILTERS = ["pending", "verified", "failed"];
var RECORD_TYPE_WIDTH = "CNAME".length;
var STATUS_COLORS = {
  pending: "yellow",
  verified: "green",
  failed: "red",
  unknown: "gray"
};
var STATUS_LABELS = {
  pending: "pending",
  verified: "active",
  failed: "failed",
  unknown: "unknown"
};
var sleep = (ms) => new Promise((resolve2) => setTimeout(resolve2, ms));
function resolveDomainCommandContext(options) {
  const config2 = getProjectConfig();
  const apiHost = resolveApiHost(options, config2);
  const { storeHash, accessToken } = resolveCredentials(options, config2);
  const projectUuid = resolveProjectUuid(options);
  return {
    projectUuid,
    storeHash,
    accessToken,
    apiHost
  };
}
async function resolveDestinationProject(domain, context, toProjectUuid) {
  if (toProjectUuid) {
    if (toProjectUuid === context.projectUuid) {
      throw new UserActionableError("The destination project must differ from the source project.");
    }
    return toProjectUuid;
  }
  consola.start("Fetching projects...");
  const projects2 = await fetchProjects(context.storeHash, context.accessToken, context.apiHost);
  consola.success("Projects fetched.");
  const destinations = projects2.filter((project) => project.uuid !== context.projectUuid);
  if (destinations.length === 0) {
    throw new UserActionableError(
      "No other projects to transfer to. Create another project with `catalyst projects create` first."
    );
  }
  return select6({
    message: `Select the project to transfer ${domain} to (Press <enter> to select).`,
    choices: destinations.map((project) => ({
      name: project.name,
      value: project.uuid,
      description: project.uuid
    }))
  });
}
function formatDomainStatus(status) {
  return colorize9(STATUS_COLORS[status], STATUS_LABELS[status]);
}
function formatDomain(domain) {
  return `${domain.domain} ${formatDomainStatus(domain.verification_status)}`;
}
function formatPointingRecords(records) {
  const rows = [];
  if (records?.a_record_value) {
    rows.push(`${"A".padEnd(RECORD_TYPE_WIDTH)}  ${records.a_record_value}`);
  }
  if (records?.cname_record_value) {
    rows.push(`${"CNAME".padEnd(RECORD_TYPE_WIDTH)}  ${records.cname_record_value}`);
  }
  if (rows.length === 0) {
    return null;
  }
  return rows.map((row2) => `  ${row2}`).join("\n");
}
function formatOwnershipVerification(record) {
  const lines = [
    "Add this DNS record to verify ownership:",
    `  Type:  ${record.type}`,
    `  Name:  ${record.name}`
  ];
  if (record.value) {
    lines.push(`  Value: ${record.value}`);
  }
  return lines.join("\n");
}
async function waitForDomainVerification({
  domain,
  projectUuid,
  storeHash,
  accessToken,
  apiHost,
  intervalMs = WAIT_INTERVAL_MS,
  timeoutMs = WAIT_TIMEOUT_MS
}) {
  const startedAt = Date.now();
  let current = await getDomain2(domain, projectUuid, storeHash, accessToken, apiHost);
  while (current.verification_status === "pending" && Date.now() - startedAt < timeoutMs) {
    await sleep(intervalMs);
    current = await getDomain2(domain, projectUuid, storeHash, accessToken, apiHost);
  }
  return current;
}
var add = new Command7("add").configureHelp({ showGlobalOptions: true }).description("Add a custom domain to the current Storefront Hosting project.").argument("<domain>", "Custom domain to add.").addHelpText(
  "after",
  `
The DNS records that point the domain at this project are printed once the domain
is added. They are returned only by this command, so save them: publish the CNAME
for a subdomain, or the A record for an apex domain.

Examples:
  $ catalyst domains add www.example.com

  # Wait until the domain leaves pending verification
  $ catalyst domains add www.example.com --wait`
).addOption(storeHashOption()).addOption(accessTokenOption()).addOption(apiHostOption()).addOption(projectUuidOption()).option("--wait", "Poll until domain verification completes or times out.").action(async (domain, options) => {
  const context = resolveDomainCommandContext(options);
  await getTelemetry().identify(context.storeHash);
  consola.start(`Adding domain ${domain}...`);
  let created;
  try {
    created = await createDomain(
      domain,
      context.projectUuid,
      context.storeHash,
      context.accessToken,
      context.apiHost
    );
  } catch (error) {
    if (error instanceof DomainOwnershipVerificationError) {
      consola.warn(`${domain} is already in use on another store.`);
      consola.log(formatOwnershipVerification(error.ownershipVerification));
      consola.info("Once the record is live, claim it with:");
      consola.log(`  catalyst domains claim ${domain}`);
      process.exit(1);
      return;
    }
    if (error instanceof DomainBoundToProjectError) {
      consola.warn(`${domain} is already bound to another project in this store.`);
      consola.info("To move it to this project, run:");
      consola.log(
        `  catalyst domains transfer ${domain} --project-uuid ${error.projectUuid} --to-project-uuid ${context.projectUuid}`
      );
      process.exit(1);
      return;
    }
    throw error;
  }
  consola.success(`Domain ${created.domain} added.`);
  const records = formatPointingRecords(created.pointing_records);
  let result = created;
  if (options.wait && result.verification_status === "pending") {
    consola.start(`Waiting for ${result.domain} to verify...`);
    result = await waitForDomainVerification({ domain: result.domain, ...context });
  }
  consola.log(formatDomain(result));
  if (records) {
    consola.info(`Point ${created.domain} at this project with one of these DNS records:`);
    consola.log(records);
    consola.info(
      "Use the CNAME for a subdomain, or the A record for an apex domain. Save them now \u2014 only `domains add` returns them."
    );
  }
  if (result.verification_status === "pending") {
    consola.info(
      `Run \`catalyst domains status ${result.domain}\` to check verification progress.`
    );
  }
  process.exit(0);
});
var list = new Command7("list").configureHelp({ showGlobalOptions: true }).description("List custom domains for the current Storefront Hosting project.").addHelpText(
  "after",
  `
Examples:
  $ catalyst domains list

  # Show pending domains only
  $ catalyst domains list --status pending`
).addOption(storeHashOption()).addOption(accessTokenOption()).addOption(apiHostOption()).addOption(projectUuidOption()).option("--domain <domain>", "Only show a specific domain.").addOption(
  new Option8("--status <status>", "Filter by verification status.").choices(
    DOMAIN_STATUS_FILTERS
  )
).action(async (options) => {
  const context = resolveDomainCommandContext(options);
  await getTelemetry().identify(context.storeHash);
  consola.start("Fetching domains...");
  const result = await listDomains(
    context.projectUuid,
    context.storeHash,
    context.accessToken,
    context.apiHost,
    {
      domains: options.domain ? [options.domain] : void 0,
      verificationStatus: options.status
    }
  );
  consola.success("Domains fetched.");
  if (result.length === 0) {
    consola.info("No custom domains found.");
    process.exit(0);
    return;
  }
  result.forEach((item) => consola.log(formatDomain(item)));
  process.exit(0);
});
var showStatus = new Command7("status").configureHelp({ showGlobalOptions: true }).description("Show the status of a custom domain on the current Storefront Hosting project.").argument("<domain>", "Custom domain to check.").addHelpText(
  "after",
  `
Examples:
  $ catalyst domains status www.example.com

  # Wait until the domain leaves pending verification
  $ catalyst domains status www.example.com --wait`
).addOption(storeHashOption()).addOption(accessTokenOption()).addOption(apiHostOption()).addOption(projectUuidOption()).option("--wait", "Poll until domain verification completes or times out.").action(async (domain, options) => {
  const context = resolveDomainCommandContext(options);
  await getTelemetry().identify(context.storeHash);
  consola.start(`Fetching status for ${domain}...`);
  let result = await getDomain2(
    domain,
    context.projectUuid,
    context.storeHash,
    context.accessToken,
    context.apiHost
  );
  consola.success("Domain status fetched.");
  if (options.wait && result.verification_status === "pending") {
    consola.start(`Waiting for ${result.domain} to verify...`);
    result = await waitForDomainVerification({ domain: result.domain, ...context });
  }
  consola.log(formatDomain(result));
  process.exit(0);
});
var claim = new Command7("claim").configureHelp({ showGlobalOptions: true }).description("Claim a custom domain that is currently in use on another store.").argument("<domain>", "Custom domain to claim.").addHelpText(
  "after",
  `
Claiming requires publishing the ownership-verification TXT record returned when
you try to add a domain that is already in use on another store. Publish the
record with your DNS provider, then run this command to complete the claim.

Examples:
  $ catalyst domains claim www.example.com

  # Wait until the claimed domain leaves pending verification
  $ catalyst domains claim www.example.com --wait`
).addOption(storeHashOption()).addOption(accessTokenOption()).addOption(apiHostOption()).addOption(projectUuidOption()).option("--wait", "Poll until domain verification completes or times out.").action(async (domain, options) => {
  const context = resolveDomainCommandContext(options);
  await getTelemetry().identify(context.storeHash);
  consola.start(`Claiming domain ${domain}...`);
  try {
    await claimDomain(
      domain,
      context.projectUuid,
      context.storeHash,
      context.accessToken,
      context.apiHost
    );
  } catch (error) {
    if (error instanceof DomainOwnershipVerificationError) {
      consola.warn(`Ownership of ${domain} could not be verified yet.`);
      consola.log(formatOwnershipVerification(error.ownershipVerification));
      consola.info("Once the record is live, run the claim again:");
      consola.log(`  catalyst domains claim ${domain}`);
      process.exit(1);
      return;
    }
    throw error;
  }
  consola.success(`Domain ${domain} claimed.`);
  let result = await getDomain2(
    domain,
    context.projectUuid,
    context.storeHash,
    context.accessToken,
    context.apiHost
  );
  if (options.wait && result.verification_status === "pending") {
    consola.start(`Waiting for ${result.domain} to verify...`);
    result = await waitForDomainVerification({ domain: result.domain, ...context });
  }
  consola.log(formatDomain(result));
  process.exit(0);
});
var transfer = new Command7("transfer").configureHelp({ showGlobalOptions: true }).description("Transfer a custom domain to another project in the same store.").argument("<domain>", "Custom domain to transfer.").addHelpText(
  "after",
  `
The domain is transferred from the current project to the destination project.
Omit --to-project-uuid to pick the destination from a list of your projects.

Examples:
  # Pick the destination project interactively
  $ catalyst domains transfer www.example.com

  # Transfer to a specific project
  $ catalyst domains transfer www.example.com --to-project-uuid <uuid>`
).addOption(storeHashOption()).addOption(accessTokenOption()).addOption(apiHostOption()).addOption(projectUuidOption()).option("--to-project-uuid <uuid>", "Destination project UUID. Prompts to choose one if omitted.").option("--wait", "Poll until domain verification completes or times out.").action(async (domain, options) => {
  const context = resolveDomainCommandContext(options);
  await getTelemetry().identify(context.storeHash);
  consola.start(`Checking ${domain} on the current project...`);
  const owned = await findDomain(
    domain,
    context.projectUuid,
    context.storeHash,
    context.accessToken,
    context.apiHost
  );
  if (!owned) {
    consola.start(`Locating the project that owns ${domain}...`);
    const projects2 = await fetchProjects(context.storeHash, context.accessToken, context.apiHost);
    const candidates = projects2.filter((project) => project.uuid !== context.projectUuid);
    const matches = await Promise.all(
      candidates.map(async (project) => ({
        project,
        found: await findDomain(
          domain,
          project.uuid,
          context.storeHash,
          context.accessToken,
          context.apiHost
        )
      }))
    );
    const owner = matches.find((match) => match.found)?.project;
    if (!owner) {
      throw new UserActionableError(
        `${domain} isn't on any project in this store. If it's in use on another store, claim it with \`catalyst domains claim ${domain}\`; otherwise double-check the domain name.`
      );
    }
    const toSuffix = options.toProjectUuid ? ` --to-project-uuid ${options.toProjectUuid}` : "";
    consola.warn(
      `${domain} is on project "${owner.name}" (${owner.uuid}), not the current project.`
    );
    consola.info("Re-run the transfer from that project:");
    consola.log(`  catalyst domains transfer ${domain} --project-uuid ${owner.uuid}${toSuffix}`);
    process.exit(1);
    return;
  }
  consola.success(`${domain} found on the current project.`);
  const newProjectUuid = await resolveDestinationProject(domain, context, options.toProjectUuid);
  consola.start(`Transferring domain ${domain}...`);
  await transferDomain(
    domain,
    context.projectUuid,
    newProjectUuid,
    context.storeHash,
    context.accessToken,
    context.apiHost
  );
  consola.success(`Domain ${domain} transferred.`);
  let result = await getDomain2(
    domain,
    newProjectUuid,
    context.storeHash,
    context.accessToken,
    context.apiHost
  );
  if (options.wait && result.verification_status === "pending") {
    consola.start(`Waiting for ${result.domain} to verify...`);
    result = await waitForDomainVerification({
      domain: result.domain,
      projectUuid: newProjectUuid,
      storeHash: context.storeHash,
      accessToken: context.accessToken,
      apiHost: context.apiHost
    });
  }
  consola.log(formatDomain(result));
  process.exit(0);
});
var remove = new Command7("remove").configureHelp({ showGlobalOptions: true }).description("Remove a custom domain from the current Storefront Hosting project.").argument("<domain>", "Custom domain to remove.").addHelpText(
  "after",
  `
Examples:
  $ catalyst domains remove www.example.com

  # Skip confirmation for an active domain
  $ catalyst domains remove www.example.com --force`
).addOption(storeHashOption()).addOption(accessTokenOption()).addOption(apiHostOption()).addOption(projectUuidOption()).option("--force", "Skip the confirmation prompt before removing an active domain.").action(async (domain, options) => {
  const context = resolveDomainCommandContext(options);
  await getTelemetry().identify(context.storeHash);
  consola.start(`Fetching status for ${domain}...`);
  const current = await getDomain2(
    domain,
    context.projectUuid,
    context.storeHash,
    context.accessToken,
    context.apiHost
  );
  if (current.verification_status === "verified" && !options.force) {
    const confirmed = await confirm8({
      message: `Remove active domain ${current.domain}? Traffic may stop routing to this project.`,
      default: false
    });
    if (!confirmed) {
      consola.info("Aborted. No domain was removed.");
      process.exit(0);
      return;
    }
  }
  consola.start(`Removing domain ${current.domain}...`);
  await deleteDomain(
    current.domain,
    context.projectUuid,
    context.storeHash,
    context.accessToken,
    context.apiHost
  );
  consola.success(`Domain ${current.domain} removed.`);
  process.exit(0);
});
var domains = new Command7("domains").alias("domain").configureHelp({ showGlobalOptions: true }).description("Manage custom domains for the current Storefront Hosting project.").addCommand(add).addCommand(list).addCommand(showStatus).addCommand(claim).addCommand(transfer).addCommand(remove);

// src/cli/commands/env.ts
import { Command as Command8 } from "commander";
var MASK = "\u2022\u2022\u2022\u2022\u2022\u2022";
var add2 = new Command8("add").configureHelp({ showGlobalOptions: true }).description(
  "Add or update one or more deployment environment variables. Stored in .bigcommerce/project.json and sent as secrets on every `catalyst deploy`."
).argument("<vars...>", "One or more environment variables in KEY=VALUE format.").addHelpText(
  "after",
  `
Example:
  $ catalyst env add BIGCOMMERCE_STORE_HASH=abc123 BIGCOMMERCE_STOREFRONT_TOKEN=ey...`
).action((vars) => {
  const config2 = getProjectConfig();
  const stored = { ...getStoredEnv(config2) };
  const parsed = vars.map((entry) => parseEnvAssignment(entry));
  parsed.forEach(({ key, value }) => {
    stored[key] = value;
  });
  config2.set("env", stored);
  const keys = parsed.map(({ key }) => key);
  consola.success(
    `Saved ${keys.length} environment variable${keys.length === 1 ? "" : "s"} to .bigcommerce/project.json:`
  );
  keys.forEach((key) => consola.log(`  ${key}=${MASK}`));
  process.exit(0);
});
var remove2 = new Command8("remove").configureHelp({ showGlobalOptions: true }).description("Remove one or more stored deployment environment variables.").argument("<keys...>", "One or more environment variable names to remove.").addHelpText(
  "after",
  `
Example:
  $ catalyst env remove BIGCOMMERCE_STORE_HASH BIGCOMMERCE_STOREFRONT_TOKEN`
).action((keys) => {
  const config2 = getProjectConfig();
  const stored = getStoredEnv(config2);
  const toRemove = /* @__PURE__ */ new Set();
  keys.forEach((key) => {
    if (key in stored) {
      toRemove.add(key);
    } else {
      consola.warn(`No stored environment variable named "${key}". Skipping.`);
    }
  });
  const next = Object.fromEntries(Object.entries(stored).filter(([key]) => !toRemove.has(key)));
  config2.set("env", next);
  const removed = Array.from(toRemove);
  if (removed.length > 0) {
    consola.success(
      `Removed ${removed.length} environment variable${removed.length === 1 ? "" : "s"}: ${removed.join(", ")}.`
    );
  }
  process.exit(0);
});
var list2 = new Command8("list").configureHelp({ showGlobalOptions: true }).description("List stored deployment environment variables (values are masked).").addHelpText(
  "after",
  `
Example:
  $ catalyst env list`
).action(() => {
  const config2 = getProjectConfig();
  const stored = getStoredEnv(config2);
  const keys = Object.keys(stored).sort();
  if (keys.length === 0) {
    consola.info("No environment variables stored. Add one with `catalyst env add KEY=VALUE`.");
    process.exit(0);
    return;
  }
  keys.forEach((key) => consola.log(`${key}=${MASK}`));
  process.exit(0);
});
var env = new Command8("env").configureHelp({ showGlobalOptions: true }).description(
  "Manage persistent deployment environment variables. These are sent as secrets on every `catalyst deploy`, so you no longer need to pass `--secret` each time."
).addCommand(add2).addCommand(remove2).addCommand(list2);

// src/cli/commands/feedback.ts
import { input as input6 } from "@inquirer/prompts";
import { Command as Command9, Option as Option9 } from "commander";
var FIELDS = {
  Title: { flag: "--title", prompt: "Title (a short summary):" },
  Description: {
    flag: "--description",
    prompt: "Description (what happened, and what you expected):"
  }
};
async function resolveField(field, value) {
  if (value !== void 0) {
    const error = validateFeedbackField(field, value);
    if (error) {
      throw new UserActionableError(error);
    }
    return value.trim();
  }
  if (!canPrompt()) {
    throw new UserActionableError(
      `${FIELDS[field].flag} is required when the CLI cannot prompt (no TTY or CI).`
    );
  }
  const answer = await input6({
    message: FIELDS[field].prompt,
    validate: (text) => validateFeedbackField(field, text) ?? true
  });
  return answer.trim();
}
var feedback = new Command9("feedback").configureHelp({ showGlobalOptions: true }).description(
  "Send feedback, a bug report, or a feature request to the BigCommerce team. A diagnostic report (the same as `catalyst debug`, with no secret values) is attached unless you use --no-diagnostics."
).addHelpText(
  "after",
  `
Examples:
  # Answer prompts for the title and description
  $ catalyst feedback

  # Send without prompts
  $ catalyst feedback --title "Deploy hangs" --description "catalyst deploy stops at 'Uploading bundle'."

  # Do not attach the diagnostic report
  $ catalyst feedback --no-diagnostics`
).addOption(new Option9("--title <title>", "A short summary of the feedback.")).addOption(new Option9("--description <text>", "The details of the feedback.")).addOption(new Option9("--no-diagnostics", "Do not attach the diagnostic report.")).addOption(storeHashOption()).addOption(accessTokenOption()).addOption(apiHostOption()).action(
  async (options) => {
    const config2 = getProjectConfig();
    const apiHost = resolveApiHost(options, config2);
    const { storeHash, accessToken } = resolveCredentials(options, config2);
    await getTelemetry().identify(storeHash);
    const title = await resolveField("Title", options.title);
    const description = await resolveField("Description", options.description);
    if (options.diagnostics) {
      consola.info("Attaching the diagnostic report (see `catalyst debug`).");
    }
    consola.start("Sending feedback...");
    await submitFeedback(
      {
        title,
        description,
        diagnostics: options.diagnostics ? [diagnosticsReportSection()] : []
      },
      storeHash,
      accessToken,
      apiHost
    );
    consola.success("Feedback sent. Thank you!");
  }
);

// src/cli/commands/logs.ts
import { Command as Command10, InvalidArgumentError as InvalidArgumentError4, Option as Option10 } from "commander";
import { colorize as colorize10 } from "consola/utils";
import { z as z16 } from "zod";
var DEFAULT_CONNECTION_TTL_MS = 1 * 60 * 1e3;
var MAX_RETRIES = 5;
var MAX_SEEN_EVENT_IDS = 1e4;
var isFatalStatusCode = (status) => status >= 400 && status < 500;
var LEVEL_COLORS2 = {
  INFO: "green",
  WARN: "yellow",
  ERROR: "red",
  DEBUG: "gray"
};
var LogEventSchema = z16.object({
  uuid: z16.string(),
  project_uuid: z16.string(),
  request: z16.object({
    method: z16.string(),
    url: z16.string(),
    status_code: z16.number()
  }),
  logs: z16.array(
    z16.object({
      timestamp: z16.string(),
      level: z16.string(),
      messages: z16.array(z16.unknown())
    })
  ),
  exceptions: z16.array(z16.unknown()),
  timestamp: z16.string()
}).loose();
var StreamError = class extends Error {
  constructor(message, fatal) {
    super(message);
    this.fatal = fatal;
  }
};
var formatMessages = (messages) => messages.map((m) => typeof m === "string" ? m : JSON.stringify(m)).join(" ");
var formatRequestLine = (event, entry) => {
  const { request } = event;
  const msg = entry ? formatMessages(entry.messages) : "";
  const msgPart = msg ? ` ${msg}` : "";
  const level = msg ? entry?.level.toUpperCase() : void 0;
  const levelPart = level ? ` [${colorize10(LEVEL_COLORS2[level] ?? "white", level)}]` : "";
  return `[${entry?.timestamp ?? event.timestamp}] ${request.method} ${request.url} (${request.status_code})${levelPart}${msgPart}`;
};
var formatLogEvent = (event, format) => {
  const { logs: logEntries, exceptions } = event;
  if (format === "request" && logEntries.length === 0) {
    consola.log(formatRequestLine(event));
  }
  logEntries.forEach((entry) => {
    const msg = formatMessages(entry.messages);
    const level = entry.level.toUpperCase();
    const coloredLevel = colorize10(LEVEL_COLORS2[level] ?? "white", level);
    switch (format) {
      case "short":
        consola.log(msg);
        break;
      case "request":
        consola.log(formatRequestLine(event, entry));
        break;
      default:
        consola.log(`[${entry.timestamp}] [${coloredLevel}] ${msg}`);
        break;
    }
  });
  exceptions.forEach((exception) => {
    consola.error(`[${event.timestamp}] EXCEPTION`, exception);
  });
};
var parseSSEEvent = (raw) => {
  const joined = raw.split("\n").flatMap((line) => line.startsWith("data:") ? [line.slice(5).trim()] : []).join("\n");
  return joined.length > 0 ? joined : null;
};
var processLogEvent = (event, format) => {
  if (format === "json") {
    process.stdout.write(`${event}
`);
    return;
  }
  try {
    const parsed = JSON.parse(event);
    const logEvent = LogEventSchema.parse(parsed);
    if (format === "pretty") {
      consola.log(JSON.stringify(logEvent, null, 2));
    } else {
      formatLogEvent(logEvent, format);
    }
  } catch {
    consola.warn(`Failed to parse log event: ${event}`);
  }
};
var EventIdSchema = z16.object({ uuid: z16.string().min(1) });
var parseEventId = (event) => {
  try {
    const result = EventIdSchema.safeParse(JSON.parse(event));
    return result.success ? result.data.uuid : void 0;
  } catch {
    return void 0;
  }
};
var createEventDeduper = () => {
  const seen = /* @__PURE__ */ new Set();
  return (event) => {
    const id = parseEventId(event);
    if (id === void 0) return true;
    if (seen.has(id)) return false;
    seen.add(id);
    if (seen.size > MAX_SEEN_EVENT_IDS) {
      const oldest = seen.values().next().value;
      if (oldest !== void 0) seen.delete(oldest);
    }
    return true;
  };
};
var createTimer = (ms) => {
  let handle;
  const promise = new Promise((resolve2) => {
    handle = setTimeout(resolve2, ms);
  });
  return { promise, clear: () => clearTimeout(handle) };
};
var openLogStream = async (projectUuid, storeHash, accessToken, apiHost) => {
  const response = await fetch(
    `https://${apiHost}/stores/${storeHash}/v3/infrastructure/logs/${projectUuid}/tail`,
    {
      method: "GET",
      headers: {
        "X-Auth-Token": accessToken,
        Accept: "text/event-stream",
        Connection: "keep-alive"
      }
    }
  );
  if (response.status === 401) {
    throw new StreamError(new UnauthorizedError().message, true);
  }
  if (!response.ok) {
    const error = await httpError(response, "Failed to open log stream");
    throw new StreamError(error.message, isFatalStatusCode(response.status));
  }
  const reader = response.body?.getReader();
  if (!reader) {
    throw new StreamError("Failed to read log stream.", true);
  }
  return reader;
};
var STOPPED = Symbol("stopped");
var createEventPump = (reader, onEvent) => {
  const decoder = new TextDecoder();
  let buffer = "";
  let pendingRead;
  let receivedData = false;
  const pumpUntil = async (stop) => {
    const stopState = { stopped: false };
    const onStop = () => {
      stopState.stopped = true;
      stopState.wake?.();
    };
    const nextRead = (read) => new Promise((resolve2, reject) => {
      stopState.wake = () => resolve2(STOPPED);
      read.then(resolve2, reject);
    });
    void stop.then(onStop, onStop);
    while (true) {
      if (stopState.stopped) return "stopped";
      pendingRead ?? (pendingRead = reader.read());
      const result = await nextRead(pendingRead);
      stopState.wake = void 0;
      if (result === STOPPED) return "stopped";
      pendingRead = void 0;
      const { value, done } = result;
      if (value) {
        receivedData = true;
        buffer += decoder.decode(value, { stream: true });
        const parts = buffer.split("\n\n");
        buffer = parts.pop() ?? "";
        parts.map((raw) => parseSSEEvent(raw)).filter((event) => event !== null).forEach(onEvent);
      }
      if (done) return "stream-done";
    }
  };
  return { pumpUntil, receivedData: () => receivedData };
};
var tailLogs = async (projectUuid, storeHash, accessToken, apiHost, format, connectionTtlMs = DEFAULT_CONNECTION_TTL_MS) => {
  consola.info("Tailing logs...");
  const isNewEvent = createEventDeduper();
  const onEvent = (event) => {
    if (isNewEvent(event)) processLogEvent(event, format);
  };
  const open2 = () => openLogStream(projectUuid, storeHash, accessToken, apiHost);
  let retries = 0;
  let nextStream;
  const recordStreamError = (error) => {
    if (error instanceof StreamError && error.fatal) {
      throw error;
    }
    const isServerDisconnect = error instanceof TypeError && error.message === "terminated";
    if (isServerDisconnect) {
      consola.warn("Log stream closed by server, reconnecting...");
      return;
    }
    retries += 1;
    if (retries >= MAX_RETRIES) {
      throw new StreamError(`Failed to connect to log stream after ${MAX_RETRIES} retries.`, true);
    }
    consola.warn(
      `Log stream disconnected, reconnecting (attempt ${retries}/${MAX_RETRIES})...`,
      error
    );
  };
  const handOff = async (pump) => {
    while (true) {
      const next = open2();
      try {
        const result = await pump.pumpUntil(next);
        if (result === "stream-done") return { next };
      } catch {
        return { next };
      }
      try {
        await next;
        return { next };
      } catch (error) {
        recordStreamError(error);
      }
    }
  };
  while (true) {
    let reader;
    try {
      const pendingStream = nextStream;
      nextStream = void 0;
      reader = await (pendingStream ?? open2());
      retries = 0;
      const pump = createEventPump(reader, onEvent);
      const ttl = createTimer(connectionTtlMs);
      const result = await pump.pumpUntil(ttl.promise).finally(ttl.clear);
      if (result === "stopped") {
        if (!pump.receivedData()) consola.warn("Log stream idle, reconnecting...");
        ({ next: nextStream } = await handOff(pump));
      }
    } catch (error) {
      recordStreamError(error);
    } finally {
      reader?.cancel().catch(() => void 0);
    }
  }
};
var tail = new Command10("tail").configureHelp({ showGlobalOptions: true }).description("Tail live logs from your deployed application.").addHelpText(
  "after",
  `
Formats:
  default  One line per log message: timestamp, level, and message.
  short    Message text only.
  request  One line per log message: timestamp, request method, URL, status
           code, level, and message. Requests that logged no messages are
           printed too, without the level and message.
  pretty   Indented JSON of the whole event.
  json     Raw JSON, one event per line (useful for piping to other tools).

The \`default\` and \`short\` formats only print requests that produced a log
message. Use \`--format request\` (or \`json\`/\`pretty\`) to see every request,
including ones with no message body.

Examples:
  $ catalyst logs tail

  # Tail logs with request format
  $ catalyst logs tail --format request

  # Tail logs as raw JSON (useful for piping to other tools)
  $ catalyst logs tail --format json`
).addOption(storeHashOption()).addOption(accessTokenOption()).addOption(apiHostOption()).addOption(projectUuidOption()).addOption(
  new Option10("--format <format>", "Output format for log events.").choices(["json", "pretty", "default", "short", "request"]).default("default")
).action(async (options) => {
  try {
    const config2 = getProjectConfig();
    const apiHost = resolveApiHost(options, config2);
    const { storeHash, accessToken } = resolveCredentials(options, config2);
    await getTelemetry().identify(storeHash);
    const projectUuid = resolveProjectUuid(options);
    await tailLogs(projectUuid, storeHash, accessToken, apiHost, options.format);
  } catch (error) {
    consola.error(error);
    process.exit(1);
  }
});
var parseIntInRange = (flag, min, max) => (value) => {
  const parsed = Number(value);
  if (!Number.isInteger(parsed) || parsed < min || parsed > max) {
    throw new InvalidArgumentError4(`${flag} must be an integer between ${min} and ${max}.`);
  }
  return parsed;
};
function invocationPrefix() {
  const packageManager = process.env.npm_config_user_agent?.split("/")[0];
  switch (packageManager) {
    case "pnpm":
    case "yarn":
      return `${packageManager} catalyst`;
    case "bun":
      return "bunx catalyst";
    case "npm":
      return "npx catalyst";
    default:
      return "catalyst";
  }
}
function printPaginationHints(pagination, start2, end, options) {
  const hasNextPage = Boolean(pagination?.links?.next) || pagination?.has_next_page === true;
  const hasPrevPage = Boolean(pagination?.links?.previous) || pagination?.has_prev_page === true;
  const endCursor = pagination?.end_cursor;
  const startCursor = pagination?.start_cursor;
  if (!(hasNextPage && endCursor) && !(hasPrevPage && startCursor)) return;
  const quoteArg = (value) => /\s/.test(value) ? `'${value}'` : value;
  const baseFlags = [
    `--start ${quoteArg(start2)}`,
    `--end ${quoteArg(end)}`,
    ...options.method ? [`--method ${quoteArg(options.method)}`] : [],
    ...options.statusCode != null ? [`--status-code ${options.statusCode}`] : [],
    ...options.urlLike ? [`--url-like ${quoteArg(options.urlLike)}`] : [],
    ...options.levelMin ? [`--level-min ${options.levelMin}`] : [],
    ...options.limit != null ? [`--limit ${options.limit}`] : [],
    // The entry_type filter derives from --format (default/short request only
    // application logs), so echoing --format is enough to reproduce it.
    ...options.format !== "default" ? [`--format ${options.format}`] : []
  ];
  const command = `${invocationPrefix()} logs query ${baseFlags.join(" ")}`;
  if (hasNextPage && endCursor) {
    consola.info(`More results available. Next page:
  ${command} --after ${quoteArg(endCursor)}`);
  }
  if (hasPrevPage && startCursor) {
    consola.info(
      `Newer results available. Previous page:
  ${command} --before ${quoteArg(startCursor)}`
    );
  }
}
var query = new Command10("query").configureHelp({ showGlobalOptions: true }).description("Query historical logs from your deployed application.").addHelpText(
  "after",
  `
Specify a time window with \`--since\` (relative to now) or \`--start\`/\`--end\`
(ISO-8601 timestamps or Unix epoch seconds, UTC). The window may not exceed
7 days. Entries print oldest-first; timestamps are UTC. Page toward older
entries by passing a previous page's end cursor to \`--after\` (the CLI prints
a ready-to-run command when more entries are available), or toward newer
entries with \`--before\`. Cursors are only valid with the same window and
filters they came from. With \`--format json\`, the pagination cursors are
emitted as a final \`{"meta": ...}\` line after the entries.

The \`default\` and \`short\` formats show only application log output,
excluding Cloudflare's auto-generated per-request rows. Use
\`--format request\` (or \`json\`/\`pretty\`) to include them.

Examples:
  # Last hour of logs
  $ catalyst logs query --since 1h

  # Newest 20 errors in the window (follow the printed --after hint for more)
  $ catalyst logs query --since 24h --level-min error --limit 20

  # Everything from today (UTC)
  $ catalyst logs query --start 2026-06-11T00:00:00Z

  # Errors only for a specific path
  $ catalyst logs query --since 24h --level-min error --url-like /cart

  # Errors with request details (method, URL, status)
  $ catalyst logs query --since 1h --level-min error --format request

  # Raw JSON (NDJSON) for piping to other tools
  $ catalyst logs query --since 2d --format json`
).addOption(storeHashOption()).addOption(accessTokenOption()).addOption(apiHostOption()).addOption(projectUuidOption()).addOption(
  new Option10(
    "--since <duration>",
    "Relative window ending at --end (default: now), e.g. 30m, 6h, 2d (units: s, m, h, d)."
  ).conflicts("start")
).option("--start <time>", "Window start: ISO-8601 timestamp or Unix epoch (seconds).").option(
  "--end <time>",
  "Window end: ISO-8601 timestamp or Unix epoch (seconds). Defaults to now. The window must not exceed 7 days."
).option("--method <method>", "Filter by request HTTP method (case-insensitive).").addOption(
  new Option10("--status-code <code>", "Filter by response status code (100-599).").argParser(
    parseIntInRange("--status-code", 100, 599)
  )
).option("--url-like <substring>", "Filter by URL substring (case-sensitive).").addOption(
  new Option10("--level-min <level>", "Minimum log level.").choices(Array.from(LOG_LEVELS))
).addOption(
  new Option10(
    "--limit <count>",
    "Maximum entries per page (1-500). Defaults to the API default (100)."
  ).argParser(parseIntInRange("--limit", 1, 500))
).addOption(
  new Option10(
    "--after <cursor>",
    "Return the page after (older than) this cursor, from a previous page's end_cursor."
  ).conflicts("before")
).addOption(
  new Option10(
    "--before <cursor>",
    "Return the page before (newer than) this cursor, from a previous page's start_cursor."
  )
).addOption(
  new Option10("--format <format>", "Output format for log entries.").choices(["json", "pretty", "default", "short", "request"]).default("default")
).action(async (options) => {
  try {
    const config2 = getProjectConfig();
    const apiHost = resolveApiHost(options, config2);
    const { storeHash, accessToken } = resolveCredentials(options, config2);
    await getTelemetry().identify(storeHash);
    const projectUuid = resolveProjectUuid(options);
    const { start: start2, end } = resolveTimeWindow(options);
    const hideRequestRows = options.format === "default" || options.format === "short";
    const result = await queryLogs(projectUuid, storeHash, accessToken, apiHost, {
      start: start2,
      end,
      entryType: hideRequestRows ? "log" : void 0,
      method: options.method,
      statusCode: options.statusCode,
      urlLike: options.urlLike,
      levelMin: options.levelMin,
      limit: options.limit,
      after: options.after,
      before: options.before
    });
    const entries = result.data;
    const ordered = [...entries].reverse();
    if (options.format === "json") {
      ordered.forEach((entry) => process.stdout.write(`${JSON.stringify(entry)}
`));
      const cursorPagination = result.meta?.cursor_pagination;
      if (cursorPagination) {
        process.stdout.write(
          `${JSON.stringify({ meta: { cursor_pagination: cursorPagination } })}
`
        );
      }
      return;
    }
    if (options.format === "pretty") {
      ordered.forEach((entry) => consola.log(JSON.stringify(entry, null, 2)));
      return;
    }
    if (entries.length === 0) {
      consola.info("No log entries found for the given window and filters.");
      return;
    }
    const lineFormat = options.format;
    const visible = hideRequestRows ? ordered.filter((entry) => !isRequestLogEntry(entry)) : ordered;
    const hiddenCount = ordered.length - visible.length;
    visible.forEach((entry) => consola.log(formatLogEntry(entry, lineFormat)));
    const shownPart = `${visible.length} ${visible.length === 1 ? "entry" : "entries"} shown`;
    consola.info(
      hiddenCount > 0 ? `${shownPart}, ${hiddenCount} request ${hiddenCount === 1 ? "row" : "rows"} hidden (oldest first, times in UTC). Use --format request to see request rows.` : `${shownPart} (oldest first, times in UTC).`
    );
    printPaginationHints(result.meta?.cursor_pagination, start2, end, options);
  } catch (error) {
    consola.error(error instanceof Error ? error.message : error);
    process.exit(1);
  }
});
var logs = new Command10("logs").alias("log").configureHelp({ showGlobalOptions: true }).description("View logs from your deployed application.").addCommand(tail, { isDefault: true }).addCommand(query);

// src/cli/commands/projects.ts
import { confirm as confirm9, input as input7, select as select7 } from "@inquirer/prompts";
import { Command as Command11 } from "commander";
import { colorize as colorize11 } from "consola/utils";
async function offerCommerceHostingSetup(projectUuid, credentials) {
  const projectDir = process.cwd();
  if (getProjectState().isTransformed) {
    await cleanupCloudflareIncompatibilities(projectDir);
    return;
  }
  const shouldSetup = await confirm9({
    message: "Your project has been linked, but is not fully set up for Storefront Hosting deployments yet. Would you like to run the setup now?",
    default: true
  });
  if (!shouldSetup) return;
  await setupCommerceHosting({
    projectDir,
    projectUuid,
    storeHash: credentials?.storeHash,
    accessToken: credentials?.accessToken
  });
  consola.success("Storefront Hosting setup complete.");
  const packageManager = await detectProjectPackageManager(projectDir);
  await installDependencies(projectDir, packageManager);
}
var list3 = new Command11("list").configureHelp({ showGlobalOptions: true }).description("List BigCommerce infrastructure projects for your store.").addHelpText(
  "after",
  `
Example:
  $ catalyst projects list`
).addOption(storeHashOption()).addOption(accessTokenOption()).addOption(apiHostOption()).action(async (options) => {
  const config2 = getProjectConfig();
  const apiHost = resolveApiHost(options, config2);
  const { storeHash, accessToken } = resolveCredentials(options, config2);
  await getTelemetry().identify(storeHash);
  consola.start("Fetching projects...");
  const storeProjects = await fetchProjects(storeHash, accessToken, apiHost);
  consola.success("Projects fetched.");
  if (storeProjects.length === 0) {
    consola.info("No projects found.");
    process.exit(0);
    return;
  }
  const linkedProjectUuid = config2.get("projectUuid");
  const projectList = storeProjects.map((p) => {
    const marker = p.uuid === linkedProjectUuid ? ` ${colorize11("green", "[linked]")}` : "";
    const hostnames = p.deployment_hostnames.length === 0 ? ["  (not deployed)"] : p.deployment_hostnames.map(
      (hostname) => `  ${colorize11("blue", `https://${hostname}`)}`
    );
    return [`${p.name} (${p.uuid})${marker}`, ...hostnames].join("\n");
  });
  consola.log(projectList.join("\n\n"));
  process.exit(0);
});
var create3 = new Command11("create").configureHelp({ showGlobalOptions: true }).description(
  "Create a new BigCommerce infrastructure project and link it to your local Catalyst project. Walks you through logging in if you are not authenticated yet."
).addHelpText(
  "after",
  `
Example:
  $ catalyst projects create`
).addOption(storeHashOption()).addOption(accessTokenOption()).addOption(apiHostOption()).addOption(loginUrlOption()).action(async (options) => {
  const config2 = getProjectConfig();
  const apiHost = resolveApiHost(options, config2);
  let storeHash = options.storeHash ?? config2.get("storeHash");
  let accessToken = options.accessToken ?? config2.get("accessToken");
  if (!storeHash || !accessToken) {
    consola.info(
      "You're not logged in yet. Let's get you authenticated before creating a project."
    );
    try {
      const credentials = await login(options.loginUrl, apiHost);
      storeHash = credentials.storeHash;
      accessToken = credentials.accessToken;
      config2.set("storeHash", storeHash);
      config2.set("accessToken", accessToken);
      consola.success(`Logged in to store ${storeHash}.`);
    } catch (error) {
      if (error instanceof LoginAbortedError) {
        consola.info(
          "Login aborted. Re-run `catalyst projects create` when you have your credentials ready."
        );
        process.exit(0);
        return;
      }
      throw error;
    }
  }
  await getTelemetry().identify(storeHash);
  const newProjectName = await input7({ message: "Enter a name for the new project:" });
  const data = await createProject(newProjectName, storeHash, accessToken, apiHost);
  consola.success(`Project "${data.name}" created successfully.`);
  consola.start("Writing project UUID to .bigcommerce/project.json...");
  config2.set("projectUuid", data.uuid);
  config2.set("storeHash", storeHash);
  config2.set("accessToken", accessToken);
  consola.success("Project UUID written to .bigcommerce/project.json.");
  process.exit(0);
});
var link2 = new Command11("link").configureHelp({ showGlobalOptions: true }).description(
  "Link your local Catalyst project to a BigCommerce infrastructure project. You can provide a project UUID directly, or fetch and select from available projects using your store credentials."
).addHelpText(
  "after",
  `
Examples:
  # Link interactively (prompts to select or create)
  $ catalyst projects link

  # Link using a project UUID directly
  $ catalyst projects link --project-uuid <UUID>`
).addOption(storeHashOption()).addOption(accessTokenOption()).addOption(apiHostOption()).addOption(projectUuidOption()).action(async (options) => {
  const config2 = getProjectConfig();
  const apiHost = resolveApiHost(options, config2);
  const writeProjectConfig = (uuid, credentials) => {
    consola.start("Writing project UUID to .bigcommerce/project.json...");
    config2.set("projectUuid", uuid);
    if (credentials) {
      config2.set("storeHash", credentials.storeHash);
      config2.set("accessToken", credentials.accessToken);
    }
    consola.success("Project UUID written to .bigcommerce/project.json.");
  };
  if (options.projectUuid) {
    writeProjectConfig(options.projectUuid);
    await offerCommerceHostingSetup(options.projectUuid);
    process.exit(0);
    return;
  }
  const { storeHash, accessToken } = resolveCredentials(options, config2);
  await getTelemetry().identify(storeHash);
  let selected;
  try {
    selected = await selectOrCreateInfrastructureProject(
      { storeHash, accessToken, apiHost },
      config2.get("projectUuid")
    );
  } catch (error) {
    if (error instanceof NoLinkedProjectError) {
      consola.info(
        "When you're ready to create a project, run `catalyst projects create` or re-run `catalyst projects link`."
      );
      process.exit(0);
      throw error;
    }
    throw error;
  }
  writeProjectConfig(selected.uuid, { storeHash, accessToken });
  await offerCommerceHostingSetup(selected.uuid, { storeHash, accessToken });
  process.exit(0);
});
var del = new Command11("delete").configureHelp({ showGlobalOptions: true }).description(
  "Permanently delete a BigCommerce infrastructure project. This action is irreversible."
).addHelpText(
  "after",
  `
Examples:
  # Select a project to delete interactively
  $ catalyst projects delete

  # Delete a specific project (still prompts for confirmation)
  $ catalyst projects delete --project-uuid <UUID>

  # Skip the confirmation prompt
  $ catalyst projects delete --project-uuid <UUID> --force`
).addOption(storeHashOption()).addOption(accessTokenOption()).addOption(apiHostOption()).addOption(projectUuidOption()).option("--force", "Skip the confirmation prompt before deleting.").action(async (options) => {
  const config2 = getProjectConfig();
  const apiHost = resolveApiHost(options, config2);
  const { storeHash, accessToken } = resolveCredentials(options, config2);
  await getTelemetry().identify(storeHash);
  let targetUuid = options.projectUuid;
  let targetName;
  if (!targetUuid) {
    consola.start("Fetching projects...");
    const storeProjects = await fetchProjects(storeHash, accessToken, apiHost);
    consola.success("Projects fetched.");
    if (storeProjects.length === 0) {
      consola.info("No projects found.");
      process.exit(0);
      return;
    }
    const linkedProjectUuid = config2.get("projectUuid");
    const selected = await select7({
      message: "Select a project to delete (Press <enter> to select).",
      choices: [
        ...storeProjects.map((p) => ({
          name: p.uuid === linkedProjectUuid ? `${p.name} ${colorize11("green", "[linked]")}` : p.name,
          value: p.uuid,
          description: p.uuid
        })),
        { name: "Cancel", value: "cancel", description: "Exit without deleting any project." }
      ]
    });
    if (selected === "cancel") {
      consola.info("Aborted. No project was deleted.");
      process.exit(0);
      return;
    }
    const matched = storeProjects.find((p) => p.uuid === selected);
    if (!matched) {
      throw new Error(`Selected project ${String(selected)} not found in fetched list.`);
    }
    targetUuid = matched.uuid;
    targetName = matched.name;
  }
  if (!options.force) {
    const label = targetName ? `"${targetName}" (${targetUuid})` : targetUuid;
    const confirmed = await confirm9({
      message: `Are you sure you want to delete project ${label}? This action is irreversible and will permanently destroy the project and all of its data.`,
      default: false
    });
    if (!confirmed) {
      consola.info("Aborted. No project was deleted.");
      process.exit(0);
      return;
    }
  }
  consola.start(`Deleting project ${targetUuid}...`);
  await deleteProject(targetUuid, storeHash, accessToken, apiHost);
  consola.success(`Project ${targetUuid} deleted.`);
  if (config2.get("projectUuid") === targetUuid) {
    config2.delete("projectUuid");
    consola.info("Removed project UUID from .bigcommerce/project.json.");
  }
  process.exit(0);
});
var projects = new Command11("projects").alias("project").configureHelp({ showGlobalOptions: true }).description("Manage your BigCommerce infrastructure projects.").addCommand(create3).addCommand(list3).addCommand(link2).addCommand(del);

// src/cli/commands/start.ts
import { Command as Command12 } from "commander";
import { execa as execa3 } from "execa";
import { existsSync as existsSync6, lstatSync, symlinkSync } from "fs";
import { join as join14, relative } from "path";
var start = new Command12("start").configureHelp({ showGlobalOptions: true }).description(
  "Start a local preview of your Catalyst storefront using the OpenNext Cloudflare adapter."
).addHelpText(
  "after",
  `
Example:
  $ catalyst start`
).action(async () => {
  const state = getProjectState();
  if (!state.isTransformed) {
    consola.info("Project is not set up for Storefront Hosting \u2014 running `next start`.");
    await execa3("pnpm", ["exec", "next", "start"], {
      stdio: "inherit",
      cwd: process.cwd()
    });
    return;
  }
  const envLocal = join14(process.cwd(), ".env.local");
  const devVars = join14(process.cwd(), ".bigcommerce", ".dev.vars");
  if (existsSync6(envLocal)) {
    if (!existsSync6(devVars)) {
      const target = relative(join14(process.cwd(), ".bigcommerce"), envLocal);
      symlinkSync(target, devVars);
      consola.success("Symlinked .bigcommerce/.dev.vars \u2192 .env.local");
    } else if (!lstatSync(devVars).isSymbolicLink()) {
      consola.warn(
        ".bigcommerce/.dev.vars already exists and is not a symlink. Wrangler will use it instead of .env.local."
      );
    }
  } else {
    consola.warn(
      "No .env.local file found. The preview server may fail without environment variables.\nCreate a .env.local file in your project root with the required variables."
    );
  }
  await execa3(
    "pnpm",
    [
      "exec",
      "opennextjs-cloudflare",
      "preview",
      "--config",
      join14(".bigcommerce", "wrangler.jsonc")
    ],
    {
      stdio: "inherit",
      cwd: process.cwd()
    }
  );
});

// src/cli/commands/telemetry.ts
import { Argument, Command as Command13, Option as Option11 } from "commander";
import { colorize as colorize12 } from "consola/utils";
var telemetryService = getTelemetry();
var isEnabled = telemetryService.isEnabled();
var telemetry = new Command13("telemetry").configureHelp({ showGlobalOptions: true }).description(
  "View or change CLI telemetry collection status. Enabling telemetry helps BigCommerce support diagnose and troubleshoot errors you encounter when using the CLI."
).addHelpText(
  "after",
  `
Examples:
  # Show telemetry status
  $ catalyst telemetry

  # Enable telemetry collection
  $ catalyst telemetry enable

  # Disable telemetry collection
  $ catalyst telemetry --disable`
).addArgument(new Argument("[arg]").choices(["disable", "enable", "status"])).addOption(new Option11("--enable", `Enables CLI telemetry collection.`).conflicts("disable")).option("--disable", `Disables CLI telemetry collection.`).action((arg, options) => {
  if (options.enable || arg === "enable") {
    telemetryService.setEnabled(true);
    isEnabled = true;
    consola.success("Success!\n");
  } else if (options.disable || arg === "disable") {
    telemetryService.setEnabled(false);
    if (isEnabled) {
      consola.success("Your preference has been saved.");
    } else {
      consola.info(`Catalyst CLI telemetry collection is already disabled.`);
    }
    isEnabled = false;
  } else {
    consola.info("Catalyst CLI Telemetry\n");
  }
  consola.info(
    `Status: ${colorize12("bold", isEnabled ? colorize12("green", "Enabled") : colorize12("red", "Disabled"))}`
  );
  if (!isEnabled) {
    consola.info(
      `You have opted-out of Catalyst CLI telemetry. No data will be collected from your machine.`
    );
  }
});

// src/cli/commands/upgrade.ts
import { Command as Command14, Option as Option12 } from "@commander-js/extra-typings";
import { confirm as confirm10 } from "@inquirer/prompts";
import { execa as execa4 } from "execa";
import {
  access as access3,
  copyFile as copyFile2,
  cp as cp2,
  mkdir,
  mkdtemp,
  readdir as readdir2,
  readFile as readFile2,
  rename,
  rm as rm2,
  writeFile as writeFile2
} from "fs/promises";
import { homedir as homedir2, tmpdir } from "os";
import { dirname as dirname5, join as join15, relative as relative2 } from "path";
import { minVersion as minVersion2, satisfies as satisfies2, lt as semverLt2, validRange as validRange2, valid as validSemver2 } from "semver";
import yoctoSpinner4 from "yocto-spinner";
import { z as z17 } from "zod";
var CorePackageJson = z17.object({
  name: z17.string().optional(),
  version: z17.string(),
  catalyst: z17.object({ version: z17.string(), ref: z17.string() }).optional()
});
var DEP_FIELDS2 = [
  "dependencies",
  "devDependencies",
  "optionalDependencies",
  "peerDependencies"
];
var DepsPackageJson = z17.looseObject({
  dependencies: z17.record(z17.string(), z17.string()).optional(),
  devDependencies: z17.record(z17.string(), z17.string()).optional(),
  optionalDependencies: z17.record(z17.string(), z17.string()).optional(),
  peerDependencies: z17.record(z17.string(), z17.string()).optional()
});
var WorkspacePackageJson = z17.object({ name: z17.string(), version: z17.string() });
var CATALYST_CLI_PACKAGE = "@bigcommerce/catalyst";
var DEFAULT_REPOSITORY = "bigcommerce/catalyst";
var MOVING_TAGS = /* @__PURE__ */ new Set(["latest", "canary", "alpha"]);
var KNOWN_FAMILIES = /* @__PURE__ */ new Set([
  "@bigcommerce/catalyst-core",
  "@bigcommerce/catalyst-makeswift",
  "@bigcommerce/catalyst-b2b-makeswift",
  "@bigcommerce/catalyst-b2b"
]);
var CACHE_DIR = join15(homedir2(), ".cache", "catalyst-cli", "cores");
var pathExists = (p) => access3(p).then(() => true).catch(() => false);
async function listFiles(dir, prefix = "") {
  const entries = await readdir2(dir, { withFileTypes: true }).catch(() => []);
  const nested = await Promise.all(
    entries.map((entry) => {
      const rel = prefix ? `${prefix}/${entry.name}` : entry.name;
      return entry.isDirectory() ? listFiles(join15(dir, entry.name), rel) : Promise.resolve([rel]);
    })
  );
  return nested.flat();
}
async function filesEqual(a, b) {
  const [ba, bb] = await Promise.all([
    readFile2(a).catch(() => null),
    readFile2(b).catch(() => null)
  ]);
  return ba !== null && bb !== null && ba.equals(bb);
}
async function computeBaseSimilarity(baseDir, destDir) {
  const baseFiles = await listFiles(baseDir);
  if (baseFiles.length === 0) return 0;
  const matches = await Promise.all(
    baseFiles.map((rel) => filesEqual(join15(baseDir, rel), join15(destDir, rel)))
  );
  return matches.filter(Boolean).length / baseFiles.length;
}
async function isBinary(p) {
  const buf = await readFile2(p).catch(() => null);
  if (!buf) return false;
  return buf.subarray(0, 8e3).includes(0);
}
async function copyInto(src, dest) {
  await mkdir(dirname5(dest), { recursive: true });
  await copyFile2(src, dest);
}
function parseRef(ref) {
  const lastAt = ref.lastIndexOf("@");
  if (lastAt <= 0) throw new Error(`Cannot parse ref "${ref}" \u2014 expected <package>@<version>.`);
  return { packageName: ref.slice(0, lastAt), version: ref.slice(lastAt + 1) };
}
async function readResolvedVersion(coreDir) {
  const raw = await readFile2(join15(coreDir, "package.json"), "utf-8");
  const pkg = CorePackageJson.parse(JSON.parse(raw));
  return pkg.catalyst?.version ?? pkg.version;
}
var readDepSpecifiers = (raw) => {
  let parsed;
  try {
    parsed = DepsPackageJson.parse(JSON.parse(raw));
  } catch {
    return {};
  }
  return Object.fromEntries(DEP_FIELDS2.flatMap((field) => Object.entries(parsed[field] ?? {})));
};
var escapeRegExp = (value) => value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
var rewriteWorkspaceSpecifier = (raw, name, version2) => raw.replace(
  new RegExp(`("${escapeRegExp(name)}"\\s*:\\s*)"workspace:[^"]*"`, "g"),
  (_match, key) => `${key}"^${version2}"`
);
async function normalizeWorkspaceDeps(ourPkgRaw, baseDir, theirsDir, baseVersions, targetVersions) {
  const basePath = join15(baseDir, "package.json");
  const theirsPath = join15(theirsDir, "package.json");
  const [originalBase, originalTheirs] = await Promise.all([
    readFile2(basePath, "utf-8").catch(() => null),
    readFile2(theirsPath, "utf-8").catch(() => null)
  ]);
  if (originalBase === null || originalTheirs === null) return { workspace: [], bumped: [] };
  const ourSpecifiers = readDepSpecifiers(ourPkgRaw);
  const names = new Set(
    [
      ...Object.entries(readDepSpecifiers(originalBase)),
      ...Object.entries(readDepSpecifiers(originalTheirs))
    ].filter(([, range]) => range?.startsWith("workspace:")).map(([name]) => name)
  );
  const decisions = [...names].map((name) => ({
    name,
    ours: ourSpecifiers[name],
    baseVersion: baseVersions[name],
    targetVersion: targetVersions[name]
  }));
  const workspace = decisions.flatMap(
    ({ name, ours, targetVersion }) => ours?.startsWith("workspace:") && targetVersion !== void 0 ? [{ name, ours, version: targetVersion }] : []
  );
  const normalizable = decisions.filter(({ ours }) => !ours?.startsWith("workspace:"));
  const baseRaw = normalizable.reduce(
    (acc, { name, baseVersion }) => baseVersion === void 0 ? acc : rewriteWorkspaceSpecifier(acc, name, baseVersion),
    originalBase
  );
  const theirsRaw = normalizable.reduce(
    (acc, { name, targetVersion }) => targetVersion === void 0 ? acc : rewriteWorkspaceSpecifier(acc, name, targetVersion),
    originalTheirs
  );
  const bumped = normalizable.filter(
    ({ baseVersion, targetVersion }) => baseVersion !== void 0 && targetVersion !== void 0 && baseVersion !== targetVersion
  ).map(({ name }) => name);
  await Promise.all([
    baseRaw === originalBase ? null : writeFile2(basePath, baseRaw),
    theirsRaw === originalTheirs ? null : writeFile2(theirsPath, theirsRaw)
  ]);
  return { workspace, bumped };
}
var migrateWorkspaceDeps = (raw, findings) => findings.reduce((acc, { name, version: version2 }) => rewriteWorkspaceSpecifier(acc, name, version2), raw);
async function findStaleCli(pkgRaw) {
  const range = readDepSpecifiers(pkgRaw)[CATALYST_CLI_PACKAGE];
  if (range === void 0 || !validRange2(range)) return null;
  const body = await fetch(`https://registry.npmjs.org/${CATALYST_CLI_PACKAGE}/latest`, {
    // A hanging registry would otherwise stall the CLI indefinitely.
    signal: AbortSignal.timeout(5e3)
  }).then((res) => res.ok ? res.json() : null).catch(() => null);
  const latest = z17.object({ version: z17.string() }).safeParse(body).data?.version;
  if (latest === void 0 || !validSemver2(latest) || satisfies2(latest, range)) return null;
  const current = minVersion2(range)?.version;
  return current !== void 0 && semverLt2(current, latest) ? { current, latest } : null;
}
var CLI_MANAGED_SCRIPTS = ["build", "start", "deploy"];
var ScriptsPackageJson = z17.looseObject({
  scripts: z17.record(z17.string(), z17.string()).optional()
});
var readScripts = (raw) => {
  try {
    return ScriptsPackageJson.parse(JSON.parse(raw)).scripts ?? {};
  } catch {
    return {};
  }
};
var SCRIPTS_BLOCK = /"scripts"\s*:\s*\{(?:[^{}"]|"(?:[^"\\]|\\.)*")*\}/;
var rewriteScriptCommand = (raw, name, command) => {
  const block = SCRIPTS_BLOCK.exec(raw);
  if (!block) return raw;
  const splice = (replacement) => raw.slice(0, block.index) + replacement + raw.slice(block.index + block[0].length);
  const updated = block[0].replace(
    new RegExp(`("${escapeRegExp(name)}"\\s*:\\s*)"(?:[^"\\\\]|\\\\.)*"`),
    (_match, key) => `${key}${JSON.stringify(command)}`
  );
  if (updated !== block[0]) return splice(updated);
  const closeIdx = block[0].length - 1;
  const head = block[0].slice(0, closeIdx).replace(/\s+$/, "");
  const closeIndent = /\n([ \t]*)$/.exec(block[0].slice(0, closeIdx))?.[1] ?? "";
  const entryIndent = /\n([ \t]*)"/.exec(block[0])?.[1] ?? `${closeIndent}  `;
  const separator = head.endsWith("{") ? "" : ",";
  return splice(
    `${head}${separator}
${entryIndent}${JSON.stringify(name)}: ${JSON.stringify(command)}
${closeIndent}}`
  );
};
async function normalizeManagedScripts(ourPkgRaw, baseDir, theirsDir) {
  const basePath = join15(baseDir, "package.json");
  const theirsPath = join15(theirsDir, "package.json");
  const [originalBase, originalTheirs] = await Promise.all([
    readFile2(basePath, "utf-8").catch(() => null),
    readFile2(theirsPath, "utf-8").catch(() => null)
  ]);
  if (originalBase === null || originalTheirs === null) return { pinned: [], upstreamChanged: [] };
  const ourScripts = readScripts(ourPkgRaw);
  const baseScripts = readScripts(originalBase);
  const theirsScripts = readScripts(originalTheirs);
  const decisions = CLI_MANAGED_SCRIPTS.flatMap((name) => {
    const ours = ourScripts[name];
    return ours !== void 0 && ours !== baseScripts[name] ? [{ name, ours }] : [];
  });
  const upstreamChanged = decisions.flatMap(({ name }) => {
    const base = baseScripts[name] ?? null;
    const theirs = theirsScripts[name] ?? null;
    return base !== theirs ? [{ name, base, theirs }] : [];
  });
  const baseRaw = decisions.reduce(
    (acc, { name, ours }) => rewriteScriptCommand(acc, name, ours),
    originalBase
  );
  const theirsRaw = decisions.reduce(
    (acc, { name, ours }) => rewriteScriptCommand(acc, name, ours),
    originalTheirs
  );
  await Promise.all([
    baseRaw === originalBase ? null : writeFile2(basePath, baseRaw),
    theirsRaw === originalTheirs ? null : writeFile2(theirsPath, theirsRaw)
  ]);
  return { pinned: decisions.map(({ name }) => name), upstreamChanged };
}
async function mergeFile(oursPath, basePath, theirsPath) {
  const merged = await execa4(
    "git",
    [
      "merge-file",
      "-p",
      "-L",
      "ours",
      "-L",
      "base",
      "-L",
      "theirs",
      oursPath,
      basePath,
      theirsPath
    ],
    { reject: false, stripFinalNewline: false }
  );
  if (merged.stderr) throw new Error(`git merge-file failed: ${merged.stderr}`);
  await writeFile2(oursPath, merged.stdout);
  return (merged.exitCode ?? 0) > 0;
}
async function mergeModified(rel, baseDir, theirsDir, catalystRoot) {
  const basePath = join15(baseDir, rel);
  const theirsPath = join15(theirsDir, rel);
  const oursPath = join15(catalystRoot, rel);
  if (await filesEqual(basePath, theirsPath)) return null;
  if (!await pathExists(oursPath)) {
    await copyInto(theirsPath, oursPath);
    return "conflicted";
  }
  if (await isBinary(basePath) || await isBinary(theirsPath) || await isBinary(oursPath)) {
    if (await filesEqual(oursPath, basePath)) {
      await copyInto(theirsPath, oursPath);
      return "applied";
    }
    return "conflicted";
  }
  return await mergeFile(oursPath, basePath, theirsPath) ? "conflicted" : "applied";
}
async function mergeAdded(rel, theirsDir, catalystRoot, emptyFile) {
  const theirsPath = join15(theirsDir, rel);
  const oursPath = join15(catalystRoot, rel);
  if (!await pathExists(oursPath)) {
    await copyInto(theirsPath, oursPath);
    return "added";
  }
  if (await filesEqual(oursPath, theirsPath)) return "applied";
  if (await isBinary(oursPath) || await isBinary(theirsPath)) return "conflicted";
  const hadConflict = await mergeFile(oursPath, emptyFile, theirsPath);
  return hadConflict ? "conflicted" : "applied";
}
async function mergeDeleted(rel, baseDir, catalystRoot) {
  const basePath = join15(baseDir, rel);
  const oursPath = join15(catalystRoot, rel);
  if (!await pathExists(oursPath)) return null;
  if (await filesEqual(oursPath, basePath)) {
    await rm2(oursPath, { force: true });
    return "deleted";
  }
  return "conflicted";
}
async function mergeCorePerFile(baseDir, theirsDir, catalystRoot, emptyFile) {
  const baseFiles = new Set(await listFiles(baseDir));
  const theirsFiles = new Set(await listFiles(theirsDir));
  const result = { applied: [], added: [], deleted: [], conflicted: [] };
  const decide = async (rel) => {
    const inBase = baseFiles.has(rel);
    const inTheirs = theirsFiles.has(rel);
    let outcome;
    if (inBase && inTheirs) {
      outcome = await mergeModified(rel, baseDir, theirsDir, catalystRoot);
    } else if (inTheirs) {
      outcome = await mergeAdded(rel, theirsDir, catalystRoot, emptyFile);
    } else {
      outcome = await mergeDeleted(rel, baseDir, catalystRoot);
    }
    if (outcome) result[outcome].push(rel);
  };
  await Promise.all([.../* @__PURE__ */ new Set([...baseFiles, ...theirsFiles])].map(decide));
  return result;
}
function versionSupportsMergeTree(gitVersionOutput) {
  const match = /(\d+)\.(\d+)/.exec(gitVersionOutput);
  if (!match) return false;
  const [major, minor] = [Number(match[1]), Number(match[2])];
  return major > 2 || major === 2 && minor >= 40;
}
async function gitSupportsMergeTree() {
  try {
    const { stdout } = await execa4("git", ["--version"]);
    return versionSupportsMergeTree(stdout);
  } catch {
    return false;
  }
}
async function resolveStrategy(strategy) {
  if (strategy !== "auto") return strategy;
  if (await gitSupportsMergeTree()) return "tree";
  consola.warn(
    "git < 2.40 \u2014 using the per-file merge engine, which does not carry your edits across renamed files. Upgrade to git 2.40+ for a full-fidelity merge."
  );
  return "per-file";
}
async function mergeCoreTree(baseDir, theirsDir, catalystRoot) {
  const scratch = await mkdtemp(join15(tmpdir(), "catalyst-merge-"));
  try {
    await execa4("git", ["init", "-q", scratch]);
    await execa4("git", ["config", "core.autocrlf", "false"], {
      env: { ...process.env, GIT_DIR: join15(scratch, ".git") }
    });
    const env2 = {
      ...process.env,
      GIT_DIR: join15(scratch, ".git"),
      GIT_AUTHOR_NAME: "catalyst",
      GIT_AUTHOR_EMAIL: "catalyst@bigcommerce.com",
      GIT_COMMITTER_NAME: "catalyst",
      GIT_COMMITTER_EMAIL: "catalyst@bigcommerce.com"
    };
    const writeTree = async (workTree, tag) => {
      const sideEnv = {
        ...env2,
        GIT_WORK_TREE: workTree,
        GIT_INDEX_FILE: join15(scratch, `index.${tag}`)
      };
      await execa4("git", ["add", "-A"], { env: sideEnv });
      return (await execa4("git", ["write-tree"], { env: sideEnv })).stdout.trim();
    };
    const commitTree = (tree, parent) => execa4("git", ["commit-tree", tree, "-m", "x", ...parent ? ["-p", parent] : []], {
      env: env2
    }).then((r) => r.stdout.trim());
    const baseTree = await writeTree(baseDir, "base");
    const oursTree = await writeTree(catalystRoot, "ours");
    const theirsTree = await writeTree(theirsDir, "theirs");
    const baseCommit = await commitTree(baseTree);
    const [oursCommit, theirsCommit] = await Promise.all([
      commitTree(oursTree, baseCommit),
      commitTree(theirsTree, baseCommit)
    ]);
    await Promise.all([
      execa4("git", ["branch", "ours", oursCommit], { env: env2 }),
      execa4("git", ["branch", "theirs", theirsCommit], { env: env2 })
    ]);
    const merge = await execa4(
      "git",
      [
        "merge-tree",
        "--write-tree",
        "-z",
        "--name-only",
        `--merge-base=${baseCommit}`,
        "ours",
        "theirs"
      ],
      { env: env2, reject: false }
    );
    if ((merge.exitCode ?? 0) > 1)
      throw new Error(merge.stderr || merge.stdout.slice(0, 500) || "git merge-tree failed");
    const fields = merge.stdout.split("\0");
    const mergedTree = fields[0];
    const afterOid = fields.slice(1);
    const emptyAt = afterOid.indexOf("");
    const conflicted = afterOid.slice(0, emptyAt === -1 ? afterOid.length : emptyAt);
    const conflictedSet = new Set(conflicted);
    const outEnv = {
      ...env2,
      GIT_WORK_TREE: catalystRoot,
      GIT_INDEX_FILE: join15(scratch, "index.out")
    };
    await execa4("git", ["read-tree", mergedTree], { env: outEnv });
    await execa4("git", ["checkout-index", "-a", "-f"], { env: outEnv });
    const diff = await execa4(
      "git",
      ["diff", "-z", "--no-renames", "--name-status", oursTree, mergedTree],
      { env: env2 }
    );
    const tokens = diff.stdout.split("\0");
    const changes = [];
    for (let i = 0; i + 1 < tokens.length; i += 2) {
      const status = tokens[i];
      const path = tokens[i + 1];
      if (status && path && !conflictedSet.has(path)) {
        changes.push({ status, path });
      }
    }
    const deleted = changes.filter((change) => change.status === "D").map((change) => change.path);
    await Promise.all(deleted.map((path) => rm2(join15(catalystRoot, path), { force: true })));
    return {
      applied: changes.filter((change) => change.status !== "A" && change.status !== "D").map((change) => change.path),
      added: changes.filter((change) => change.status === "A").map((change) => change.path),
      deleted,
      conflicted
    };
  } finally {
    await rm2(scratch, { recursive: true, force: true, maxRetries: 10, retryDelay: 500 });
  }
}
async function applyIndexState(gitRoot, relDir, baseDir, theirsDir, result, stampedPkg) {
  const toRepoPath = (rel) => relDir === "." ? rel : `${relDir}/${rel}`;
  const pkgRel = "package.json";
  const stillConflicted = result.conflicted.filter((rel) => !(stampedPkg && rel === pkgRel));
  const conflictedRepoPaths = new Set(stillConflicted.map(toRepoPath));
  const clean = [...result.applied, ...result.added, ...result.deleted].map(toRepoPath);
  if (stampedPkg) clean.push(toRepoPath(pkgRel));
  const toStage = [...new Set(clean)].filter((path) => !conflictedRepoPaths.has(path));
  if (toStage.length) {
    await execa4("git", ["add", "-A", "--", ...toStage], { cwd: gitRoot });
  }
  if (stillConflicted.length === 0) return;
  const OID = /^[0-9a-f]{40,64}$/;
  const gitFormat = (await execa4("git", ["rev-parse", "--show-object-format"], { cwd: gitRoot, reject: false })).stdout.trim();
  const NULL_OID = gitFormat === "sha256" ? "0".repeat(64) : "0".repeat(40);
  const hashBlob = async (file) => {
    if (!await pathExists(file)) return null;
    const oid = (await execa4("git", ["hash-object", "-w", "--", file], { cwd: gitRoot })).stdout.trim();
    return OID.test(oid) ? oid : null;
  };
  const headEntry = async (repoPath) => {
    const { stdout } = await execa4("git", ["ls-tree", "HEAD", "--", repoPath], {
      cwd: gitRoot,
      reject: false
    });
    const match = /^(\d{6}) blob ([0-9a-f]+)\t/.exec(stdout);
    return match ? { mode: match[1], oid: match[2] } : null;
  };
  const records = await Promise.all(
    stillConflicted.map(async (rel) => {
      const repoPath = toRepoPath(rel);
      const [base, ours, theirs] = await Promise.all([
        hashBlob(join15(baseDir, rel)),
        headEntry(repoPath),
        hashBlob(join15(theirsDir, rel))
      ]);
      return [
        `0 ${NULL_OID}	${repoPath}`,
        ...base ? [`100644 ${base} 1	${repoPath}`] : [],
        ...ours ? [`${ours.mode} ${ours.oid} 2	${repoPath}`] : [],
        ...theirs ? [`100644 ${theirs} 3	${repoPath}`] : []
      ].join("\n");
    })
  );
  await execa4("git", ["update-index", "--index-info"], {
    cwd: gitRoot,
    input: `${records.join("\n")}
`
  });
}
async function resolveProject2(cwd) {
  let gitRoot;
  try {
    gitRoot = (await execa4("git", ["rev-parse", "--show-toplevel"], { cwd })).stdout.trim();
  } catch {
    return null;
  }
  const candidateDirs = [.../* @__PURE__ */ new Set([join15(gitRoot, "core"), gitRoot, join15(cwd, "core"), cwd])];
  const parsed = (await Promise.all(
    candidateDirs.map(async (dir) => {
      const pkgPath = join15(dir, "package.json");
      const raw = await readFile2(pkgPath, "utf-8").catch(() => null);
      if (!raw) return null;
      let pkgJson;
      try {
        pkgJson = JSON.parse(raw);
      } catch {
        return null;
      }
      const result = CorePackageJson.safeParse(pkgJson);
      return result.success ? { dir, pkgPath, raw, pkg: result.data } : null;
    })
  )).filter((entry) => entry !== null);
  if (parsed.length === 0) return null;
  const chosen = parsed.find((p) => p.pkg.catalyst?.ref) ?? parsed.find((p) => p.pkg.name !== void 0 && KNOWN_FAMILIES.has(p.pkg.name)) ?? parsed[0];
  return {
    gitRoot,
    catalystRoot: chosen.dir,
    relDir: relative2(gitRoot, chosen.dir) || ".",
    pkgPath: chosen.pkgPath,
    rawContent: chosen.raw,
    pkg: chosen.pkg
  };
}
var readWorkspaceVersions = async (repoDir) => {
  const packagesDir = join15(repoDir, "packages");
  const entries = await readdir2(packagesDir, { withFileTypes: true }).catch(() => []);
  const manifests = await Promise.all(
    entries.filter((entry) => entry.isDirectory()).map(async (entry) => {
      const raw = await readFile2(join15(packagesDir, entry.name, "package.json"), "utf-8").catch(
        () => null
      );
      if (raw === null) return null;
      try {
        return WorkspacePackageJson.parse(JSON.parse(raw));
      } catch {
        return null;
      }
    })
  );
  return Object.fromEntries(
    manifests.filter((pkg) => pkg !== null).map(({ name, version: version2 }) => [name, version2])
  );
};
var readCachedVersions = async (path) => {
  const raw = await readFile2(path, "utf-8").catch(() => null);
  if (raw === null) return null;
  try {
    return z17.record(z17.string(), z17.string()).parse(JSON.parse(raw));
  } catch {
    return null;
  }
};
async function downloadCore(repository, ref, destDir, token) {
  const cacheable = !MOVING_TAGS.has(parseRef(ref).version);
  const cacheKey = `${repository.replace(/[^a-zA-Z0-9._-]/g, "_")}__${ref.replace(/[^a-zA-Z0-9._-]/g, "_")}`;
  const cachePath = join15(CACHE_DIR, cacheKey);
  const versionsPath = `${cachePath}.versions.json`;
  const cachedVersions = cacheable && await pathExists(join15(cachePath, "package.json")) ? await readCachedVersions(versionsPath) : null;
  if (cachedVersions) {
    await cp2(cachePath, destDir, { recursive: true });
    return cachedVersions;
  }
  const url = `https://api.github.com/repos/${repository}/tarball/${encodeURIComponent(ref)}`;
  const headers = {
    "User-Agent": "catalyst-cli",
    Accept: "application/vnd.github+json"
  };
  if (token) headers.Authorization = `Bearer ${token}`;
  const res = await fetch(url, { headers });
  if (!res.ok) {
    let hint = "";
    if (res.status === 404) hint = ` \u2014 tag "${ref}" not found in ${repository}`;
    if (res.status === 403) hint = " \u2014 GitHub rate limit hit; set GITHUB_TOKEN to raise it";
    throw new Error(`GitHub returned ${res.status} for ${ref}${hint}`);
  }
  const tarballPath = `${destDir}.tgz`;
  const rawDir = `${destDir}.raw`;
  await writeFile2(tarballPath, Buffer.from(await res.arrayBuffer()));
  await mkdir(rawDir, { recursive: true });
  await execa4("tar", ["-xzf", tarballPath, "-C", rawDir, "--strip-components=1"]);
  const coreDir = join15(rawDir, "core");
  const sourceDir = await pathExists(coreDir) ? coreDir : rawDir;
  const workspaceVersions = await readWorkspaceVersions(rawDir);
  await rename(sourceDir, destDir);
  await rm2(tarballPath, { force: true });
  await rm2(rawDir, { recursive: true, force: true });
  if (cacheable) {
    await mkdir(CACHE_DIR, { recursive: true });
    await cp2(destDir, cachePath, { recursive: true }).then(() => writeFile2(versionsPath, JSON.stringify(workspaceVersions))).catch(() => {
    });
  }
  return workspaceVersions;
}
async function resolveBaseRef(project, fromOption, assumeYes) {
  if (project.pkg.catalyst?.ref) return project.pkg.catalyst.ref;
  if (fromOption) return fromOption;
  const family = project.pkg.name && KNOWN_FAMILIES.has(project.pkg.name) ? project.pkg.name : "@bigcommerce/catalyst-core";
  const guess = `${family}@${project.pkg.version}`;
  consola.warn(`No \`catalyst.ref\` found in package.json. Inferred base: ${guess}`);
  if (assumeYes) return guess;
  const ok = await confirm10({ message: `Upgrade from ${guess}?`, default: true }).catch(() => false);
  if (!ok) {
    consola.info("Re-run with `--from <ref>` to set the base version explicitly.");
    return null;
  }
  return guess;
}
function printWorkspaceFindings(findings) {
  if (findings.length === 0) return;
  const pad = Math.max(...findings.map((finding) => finding.name.length));
  const rows = findings.map((finding) => `  ${finding.name.padEnd(pad)}  ${finding.ours} \u2192 ^${finding.version}`).join("\n");
  consola.warn(
    `Catalyst dependencies still using the workspace protocol (${findings.length}):
${rows}

They resolve to your local packages/ copies, which \`catalyst upgrade\` does not update \u2014 so they never receive upgrades.`
  );
}
function printManagedScriptFindings(findings) {
  if (findings.length === 0) return;
  const pad = Math.max(...findings.map((finding) => finding.name.length));
  const show = (command) => command ?? "(absent)";
  const rows = findings.map(
    (finding) => `  ${finding.name.padEnd(pad)}  ${show(finding.base)} \u2192 ${show(finding.theirs)}`
  ).join("\n");
  consola.warn(
    `Core's own version of ${findings.length} npm script${findings.length === 1 ? "" : "s"} the CLI manages for you changed:
${rows}

Your project keeps its \`catalyst\`-backed command, which is almost always what you want \u2014 \`catalyst build\`/\`start\`/\`deploy\` wrap the equivalent \`next\` command. Apply the change by hand only if you have opted out of the CLI scripts.`
  );
}
function printSummary({
  result,
  relDir,
  stampedPkg,
  migratedDeps,
  packageManager,
  staleCli
}) {
  const unresolved = result.conflicted.filter((f) => !(stampedPkg && f === "package.json"));
  const parts = [
    `${result.applied.length} updated`,
    `${result.added.length} added`,
    `${result.deleted.length} removed`
  ];
  if (unresolved.length) parts.push(`${unresolved.length} with conflicts`);
  consola.log(`
${parts.join(", ")}`);
  const pkgConflicted = unresolved.includes("package.json");
  const depsChanged = migratedDeps > 0 || [...result.applied, ...result.added, ...result.conflicted].includes("package.json");
  if (depsChanged && !pkgConflicted) {
    consola.info(
      `Dependencies changed \u2014 run \`${packageManager} install\` to update your lockfile.`
    );
  }
  if (unresolved.length) {
    const files = unresolved.map((f) => `  ${f}`).join("\n");
    const install = depsChanged && pkgConflicted ? ` && ${packageManager} install` : "";
    consola.warn(
      `
Staged the clean changes. ${unresolved.length} file(s) need conflict resolution (the <<<ours/===/theirs>>> markers):
${files}

Resolve them, then: git add ${relDir} && git commit${install}`
    );
  } else {
    consola.success("Staged all changes \u2014 review with `git diff --cached`, then commit.");
  }
  if (staleCli) {
    consola.info(
      `Your Catalyst CLI is behind (${staleCli.current} \u2192 ${staleCli.latest}). Update it with \`${packageManager} add -D ${CATALYST_CLI_PACKAGE}@${staleCli.latest}\`.`
    );
  }
}
function recordDeletion(result, rel) {
  result.conflicted = result.conflicted.filter((path) => path !== rel);
  result.applied = result.applied.filter((path) => path !== rel);
  result.added = result.added.filter((path) => path !== rel);
  result.deleted = [.../* @__PURE__ */ new Set([...result.deleted, rel])];
}
async function reconcileNativeHosting(catalystRoot, result) {
  const state = getProjectState(catalystRoot);
  if (!state.isLinked && !state.isTransformed) return;
  const instrumentationRel = "instrumentation.ts";
  const instrumentationPath = join15(catalystRoot, instrumentationRel);
  const hadInstrumentation = await pathExists(instrumentationPath);
  try {
    await cleanupCloudflareIncompatibilities(catalystRoot);
  } catch (err) {
    consola.warn(
      `Couldn't fully reconcile Storefront Hosting files (${err instanceof Error ? err.message : String(err)}). Remove @vercel/otel from package.json by hand if the merge brought it back.`
    );
  }
  if (hadInstrumentation && !await pathExists(instrumentationPath)) {
    recordDeletion(result, instrumentationRel);
  }
  const middlewareRel = "middleware.ts";
  const middlewarePath = join15(catalystRoot, middlewareRel);
  const hadMiddleware = await pathExists(middlewarePath);
  try {
    await removeLegacyMiddleware(catalystRoot);
  } catch (err) {
    consola.warn(err instanceof Error ? err.message : String(err));
  }
  if (hadMiddleware && !await pathExists(middlewarePath)) {
    recordDeletion(result, middlewareRel);
  }
}
var upgrade = new Command14("upgrade").configureHelp({ showGlobalOptions: true }).aliases([
  "up",
  // These are hidden aliases
  "upgrayedd",
  "ugrad"
]).description("Upgrade your Catalyst project to a newer version by applying a 3-way merge.").argument("[version]", "Target version to upgrade to (default: latest)").addOption(
  new Option12(
    "--ref <ref>",
    "Full git tag to upgrade to, e.g. an integration family like @bigcommerce/catalyst-makeswift@1.7.0. Overrides [version]."
  )
).addOption(new Option12("--from <ref>", "Base ref to upgrade from (when catalyst.ref is missing)")).option("--dry-run", "Generate and display the diff without applying it").option("--yes", "Skip confirmation prompts (e.g. inferred base ref)").addOption(
  new Option12(
    "--strategy <strategy>",
    "Merge engine: tree (git merge-tree, full fidelity), per-file (git merge-file, no-history fallback), or auto (tree when git >= 2.40, else per-file)"
  ).choices(["auto", "tree", "per-file"]).default("auto").hideHelp()
).addOption(
  new Option12("--repository <owner/repo>", "GitHub repository to pull versions from").default(
    DEFAULT_REPOSITORY
  )
).addHelpText(
  "after",
  `
Examples:
  # Upgrade to the latest Catalyst version
  $ catalyst upgrade

  # Upgrade to a specific version
  $ catalyst upgrade 1.8.0

  # Preview what would change without applying
  $ catalyst upgrade --dry-run

  # Upgrade to an integration family (makeswift, b2b-makeswift, ...)
  $ catalyst upgrade --ref @bigcommerce/catalyst-makeswift@1.7.0

Conflicts are written as standard <<<ours/===/theirs>>> markers \u2014 the upgrade
never aborts. Versions are git tags on the repository (not npm). Set GITHUB_TOKEN
to raise the GitHub API rate limit.`
).action(async (version2, options) => {
  const project = await resolveProject2(process.cwd());
  if (!project) {
    consola.error(
      "Run `catalyst upgrade` from inside a Catalyst git repository (flat core/ repo or a project containing core/)."
    );
    process.exit(1);
  }
  const { gitRoot, catalystRoot, relDir, pkgPath } = project;
  const baseRef = await resolveBaseRef(project, options.from, options.yes ?? false);
  if (!baseRef) process.exit(1);
  let basePackage;
  let upstreamRef;
  let upstreamTagVersion;
  try {
    ({ packageName: basePackage } = parseRef(baseRef));
    upstreamRef = options.ref ?? `${basePackage}@${version2 ?? "latest"}`;
    ({ version: upstreamTagVersion } = parseRef(upstreamRef));
  } catch {
    consola.error(
      `Invalid ref format \u2014 expected <package>@<version> (e.g. @bigcommerce/catalyst-core@1.7.0). Got: "${baseRef}"`
    );
    process.exit(1);
  }
  if (upstreamRef === baseRef) {
    consola.success("Already up to date.");
    return;
  }
  if (!options.dryRun) {
    const statusArgs = relDir === "." ? [] : ["--", relDir];
    const status = await execa4("git", ["status", "--porcelain", ...statusArgs], {
      cwd: gitRoot,
      reject: false
    });
    if (status.stdout.trim()) {
      const where = relDir === "." ? "The repo" : `${relDir}/`;
      consola.error(
        `${where} has uncommitted changes. Commit or stash them before upgrading, so the upgrade is isolated and reversible:
  git add ${relDir} && git commit -m "snapshot before upgrade"
  # or: git stash`
      );
      process.exit(1);
    }
  }
  if (!project.pkg.catalyst?.ref && !options.from && !options.dryRun) {
    const { version: baseVersion } = parseRef(baseRef);
    const rawPkg = await readFile2(pkgPath, "utf-8");
    const parsedPkg = z17.record(z17.string(), z17.unknown()).parse(JSON.parse(rawPkg));
    parsedPkg.catalyst = { version: baseVersion, ref: baseRef };
    await writeFile2(pkgPath, `${JSON.stringify(parsedPkg, null, 2)}
`);
    await execa4("git", ["add", "--", pkgPath], { cwd: gitRoot });
    consola.success(`Added catalyst.ref \u2192 ${baseRef}`);
  }
  const token = process.env.GITHUB_TOKEN;
  const tmpDir = await mkdtemp(join15(tmpdir(), "catalyst-upgrade-"));
  try {
    const baseDir = join15(tmpDir, "base");
    const theirsDir = join15(tmpDir, "theirs");
    const emptyFile = join15(tmpDir, ".empty");
    await writeFile2(emptyFile, "");
    const staleCliCheck = findStaleCli(project.rawContent).catch(() => null);
    const downloadSpinner = yoctoSpinner4().start(`Downloading ${baseRef} and ${upstreamRef}...`);
    let baseVersions;
    let targetVersions;
    try {
      [baseVersions, targetVersions] = await Promise.all([
        downloadCore(options.repository, baseRef, baseDir, token),
        downloadCore(options.repository, upstreamRef, theirsDir, token)
      ]);
      downloadSpinner.success("Downloaded both versions.");
    } catch (err) {
      downloadSpinner.error("Download failed");
      throw err;
    }
    if (!project.pkg.catalyst?.ref && !options.from) {
      const similarity = await computeBaseSimilarity(baseDir, catalystRoot);
      const pct = Math.round(similarity * 100);
      if (similarity < 0.5) {
        consola.warn(
          `Low confidence in inferred base ${baseRef} (${pct}% of base files match your project). If the merge result looks off, re-run with \`--from <correct-version>\` to set the base explicitly.`
        );
      }
    }
    const resolvedVersion = MOVING_TAGS.has(upstreamTagVersion) ? await readResolvedVersion(theirsDir) : upstreamTagVersion;
    const newRef = MOVING_TAGS.has(upstreamTagVersion) ? `${basePackage}@${resolvedVersion}` : upstreamRef;
    const { workspace: workspaceDeps, bumped } = await normalizeWorkspaceDeps(
      project.rawContent,
      baseDir,
      theirsDir,
      baseVersions,
      targetVersions
    );
    const { upstreamChanged: managedScripts } = await normalizeManagedScripts(
      project.rawContent,
      baseDir,
      theirsDir
    );
    if (options.dryRun) {
      const diffSpinner = yoctoSpinner4().start("Generating diff...");
      const diff = await execa4(
        "git",
        ["diff", "--no-index", "--binary", "--diff-algorithm=histogram", "base", "theirs"],
        { cwd: tmpDir, reject: false, stripFinalNewline: false }
      );
      if ((diff.exitCode ?? 0) > 1) {
        diffSpinner.error("Failed to generate diff");
        throw new Error(diff.stderr);
      }
      if (!diff.stdout.trim()) {
        diffSpinner.success("No differences between versions \u2014 already up to date.");
        return;
      }
      const fileCount = (diff.stdout.match(/^diff --git /gm) ?? []).length;
      diffSpinner.success(`Diff ready \u2014 ${fileCount} file(s) affected.`);
      consola.log("\nDiff preview (--dry-run, not applied):\n");
      consola.log(diff.stdout);
      printWorkspaceFindings(workspaceDeps);
      printManagedScriptFindings(managedScripts);
      return;
    }
    const strategy = await resolveStrategy(options.strategy);
    const mergeSpinner = yoctoSpinner4().start(`Merging changes (${strategy})...`);
    const result = strategy === "tree" ? await mergeCoreTree(baseDir, theirsDir, catalystRoot) : await mergeCorePerFile(baseDir, theirsDir, catalystRoot, emptyFile);
    const total = result.applied.length + result.added.length + result.deleted.length + result.conflicted.length;
    if (total === 0) {
      mergeSpinner.success("No differences between versions \u2014 already up to date.");
      return;
    }
    if (result.conflicted.length) {
      mergeSpinner.warning("Merged with conflicts \u2014 resolve the markers, then commit.");
    } else {
      mergeSpinner.success("Merged cleanly.");
    }
    const patchedRaw = await readFile2(pkgPath, "utf-8");
    let stampedText = null;
    try {
      const patchedPkg = z17.record(z17.string(), z17.unknown()).parse(JSON.parse(patchedRaw));
      patchedPkg.catalyst = { version: resolvedVersion, ref: newRef };
      stampedText = `${JSON.stringify(patchedPkg, null, 2)}
`;
      await writeFile2(pkgPath, stampedText);
      consola.success(`catalyst.ref updated \u2192 ${newRef}`);
    } catch {
      const catalystReplacement = JSON.stringify(
        { version: resolvedVersion, ref: newRef },
        null,
        2
      ).split("\n").map((line, i) => i === 0 ? line : `  ${line}`).join("\n");
      const updated = patchedRaw.replace(
        /"catalyst":\s*\{[^}]*\}/,
        () => `"catalyst": ${catalystReplacement}`
      );
      if (updated !== patchedRaw) {
        await writeFile2(pkgPath, updated);
        consola.success(`catalyst.ref updated \u2192 ${newRef}`);
        consola.info(
          "package.json still has conflicts in other sections \u2014 resolve them, then: git add package.json"
        );
      } else {
        consola.warn(
          `package.json has conflicts \u2014 after resolving, add:
  "catalyst": { "version": "${resolvedVersion}", "ref": "${newRef}" }`
        );
      }
    }
    printManagedScriptFindings(managedScripts);
    printWorkspaceFindings(workspaceDeps);
    let migratedDeps = 0;
    if (workspaceDeps.length) {
      const accepted = stampedText !== null && (options.yes === true || Boolean(process.stdin.isTTY) && await confirm10({
        message: "Replace them with the published versions?",
        default: true
      }).catch(() => false));
      if (accepted && stampedText !== null) {
        await writeFile2(pkgPath, migrateWorkspaceDeps(stampedText, workspaceDeps));
        migratedDeps = workspaceDeps.length;
        consola.success(
          `Migrated ${migratedDeps} dependenc${migratedDeps === 1 ? "y" : "ies"} to published versions.`
        );
      } else {
        consola.info(
          "Keeping the workspace references. Switching abandons any local packages/ copy you've customized; otherwise apply the versions above in package.json and reinstall."
        );
      }
    }
    await reconcileNativeHosting(catalystRoot, result);
    try {
      await applyIndexState(gitRoot, relDir, baseDir, theirsDir, result, stampedText !== null);
    } catch (err) {
      consola.warn(
        `Couldn't auto-stage the changes (${err instanceof Error ? err.message : String(err)}). Your files are merged on disk \u2014 run \`git add ${relDir}\` yourself.`
      );
    }
    const gitVersion = await execa4("git", ["--version"]).then((r) => r.stdout.trim()).catch(() => "unknown");
    const packageManager = await detectLockfileManager(gitRoot) ?? "pnpm";
    const staleCli = await staleCliCheck;
    await getTelemetry().track("upgrade", {
      strategy,
      gitVersion,
      dryRun: Boolean(options.dryRun),
      applied: result.applied.length,
      added: result.added.length,
      deleted: result.deleted.length,
      conflicts: result.conflicted.length,
      hasConflicts: result.conflicted.length > 0,
      workspaceDepsFound: workspaceDeps.length,
      workspaceDepsMigrated: migratedDeps,
      catalystDepsBumped: bumped.length,
      cliOutdated: staleCli !== null
    });
    printSummary({
      result,
      relDir,
      stampedPkg: stampedText !== null,
      migratedDeps,
      packageManager,
      staleCli
    });
  } finally {
    await rm2(tmpDir, { recursive: true, force: true, maxRetries: 10, retryDelay: 500 });
  }
});

// src/cli/commands/version.ts
import { Command as Command15 } from "commander";
var version = new Command15("version").configureHelp({ showGlobalOptions: true }).description("Display detailed version information.").addHelpText(
  "after",
  `
Example:
  $ catalyst version`
).action(() => {
  consola.log("Version Information:");
  consola.log(`CLI Version: ${package_default.version}`);
  consola.log(`Node Version: ${process.version}`);
  consola.log(`Platform: ${process.platform} (${process.arch})`);
});

// src/cli/lib/survey.ts
import { input as input8 } from "@inquirer/prompts";
import { colorize as colorize13 } from "consola/utils";
var SURVEY_INTERVAL_MS = 90 * 24 * 60 * 60 * 1e3;
var SCORE_ANSWER = /^\s*(?:10|\d)?\s*$/;
function isSurveyDue() {
  const lastShownAt = getUserConfig().get("survey")?.lastShownAt;
  return lastShownAt === void 0 || Date.now() - lastShownAt >= SURVEY_INTERVAL_MS;
}
var ask = async (message, validate) => (await input8({ message, validate }, { signal: AbortSignal.timeout(PROMPT_TIMEOUT_MS) })).trim();
async function runSurvey({
  commandName,
  storeHash,
  accessToken,
  apiHost
}) {
  try {
    getUserConfig().set("survey", { lastShownAt: Date.now() });
    consola.log("");
    consola.log(colorize13("cyan", "Help us improve Catalyst. One question, and you can skip it."));
    const score = await ask(
      "How was your experience using the Catalyst CLI with Storefront Hosting? (0 = very poor, 10 = excellent, Enter to skip)",
      (value) => SCORE_ANSWER.test(value) || "Enter a whole number from 0 to 10, or press Enter to skip."
    );
    if (!score) {
      consola.info("Skipped. We will not ask again for at least three months.");
      return;
    }
    const comment = await ask(
      "What went well, or what could be better? (optional, Enter to skip)",
      (value) => !value.trim() || (validateFeedbackField("Description", value) ?? true)
    );
    await submitFeedback(
      {
        title: `CLI survey: ${score}/10`,
        description: comment || "No comment.",
        diagnostics: [
          {
            title: "Survey",
            body: `Score: ${score}/10
CLI version: ${package_default.version}
Command: ${commandName}`
          }
        ]
      },
      storeHash,
      accessToken,
      apiHost,
      { source: "catalyst-cli-survey", signal: AbortSignal.timeout(SUBMIT_TIMEOUT_MS) }
    );
    consola.success("Thank you for your feedback!");
  } catch (error) {
    if (isQuietPromptError(error)) {
      return;
    }
    consola.debug(error);
    consola.warn("Could not send your survey answer. Use `catalyst feedback` to send feedback.");
  }
}

// src/cli/hooks/survey.ts
var SURVEY_COMMANDS = /* @__PURE__ */ new Set(["deploy"]);
var surveyPostHook = async (program2, actionCommand) => {
  try {
    const commandName = getCommandPath(actionCommand);
    if (!SURVEY_COMMANDS.has(commandName) || hintsDisabled(program2) || !canPrompt() || !isSurveyDue()) {
      return;
    }
    const credentials = resolveCommandCredentials(actionCommand);
    if (credentials) {
      await runSurvey({ commandName, ...credentials });
    }
  } catch (error) {
    consola.debug(error);
  }
};

// src/cli/hooks/telemetry.ts
var allowlistArguments = ["--keep-temp-dir", "--api-host", "--project-uuid"];
function parseArguments(args) {
  return args.reduce((result, arg, index, array) => {
    if (arg.includes("=")) {
      const [key, value] = arg.split("=");
      if (allowlistArguments.includes(key)) {
        return {
          ...result,
          [key]: value
        };
      }
    }
    if (allowlistArguments.includes(arg)) {
      const nextValue = array[index + 1] && !array[index + 1].startsWith("--") ? array[index + 1] : null;
      if (nextValue && !nextValue.includes("--")) {
        return {
          ...result,
          [arg]: nextValue
        };
      }
    }
    return result;
  }, {});
}
var telemetryPreHook = async (thisCommand, actionCommand) => {
  const telemetry2 = getTelemetry();
  const commandName = getCommandPath(actionCommand);
  telemetry2.commandName = commandName;
  return await telemetry2.track(commandName, {
    ...parseArguments(thisCommand.args)
  });
};
var telemetryPostHook = async () => {
  const telemetry2 = getTelemetry();
  await telemetry2.track("command_completed", { durationMs: telemetry2.durationMs() });
  await telemetry2.analytics.closeAndFlush();
};

// src/cli/program.ts
if (!process.env.CATALYST_STORE_HASH && process.env.BIGCOMMERCE_STORE_HASH) {
  process.env.CATALYST_STORE_HASH = process.env.BIGCOMMERCE_STORE_HASH;
}
var program = new Command16();
consola.log(colorize14("cyanBright", `\u25E2 ${package_default.name} v${package_default.version}
`));
program.name(package_default.name).version(package_default.version).summary("CLI tool for Catalyst development").description(
  "CLI tool for Catalyst development.\n\nConfiguration priority: flags > process.env > .bigcommerce/project.json. `build` and `deploy` additionally load env files (--env-path, or an auto-loaded .env.local/.env) for the build.\n\nCATALYST_STORE_HASH falls back to BIGCOMMERCE_STORE_HASH if unset.\n\nRun `catalyst <command> --help` for details on a specific command."
).configureHelp({ showGlobalOptions: true }).option(
  "--no-hints",
  "Do not show the feedback survey or the error report prompt. Also off in CI, without a TTY, or when CATALYST_NO_HINTS is set."
).addCommand(version).addCommand(create2).addCommand(start).addCommand(build).addCommand(deploy).addCommand(domains).addCommand(logs).addCommand(projects).addCommand(env).addCommand(channels).addCommand(auth).addCommand(upgrade).addCommand(telemetry).addCommand(debug).addCommand(feedback).hook("preAction", recordActiveCommand).hook("preAction", telemetryPreHook).hook("postAction", telemetryPostHook).hook("postAction", surveyPostHook);

// src/cli/index.ts
var handleFatalError = async (error) => {
  const telemetry2 = getTelemetry();
  const errorMessage = error instanceof Error ? error.message : String(error);
  const errorStack = error instanceof Error ? error.stack : void 0;
  try {
    await telemetry2.track("error", {
      commandName: telemetry2.commandName,
      errorMessage,
      errorStack,
      durationMs: telemetry2.durationMs()
    });
    await telemetry2.analytics.closeAndFlush();
  } catch {
  }
  if (error instanceof UserActionableError) {
    consola.error(errorMessage);
    process.exit(1);
  }
  consola.error(errorMessage);
  if (telemetry2.isEnabled()) {
    consola.info(
      `Correlation ID: ${telemetry2.correlationId}
Share this Correlation ID with BigCommerce support.`
    );
  } else {
    consola.info(
      "Enable telemetry (`catalyst telemetry enable`) for improved troubleshooting with BigCommerce support."
    );
  }
  await offerCrashReport({ error, program, correlationId: telemetry2.correlationId });
  process.exit(1);
};
process.on("uncaughtException", (error) => {
  void handleFatalError(error);
});
process.on("unhandledRejection", (reason) => {
  void handleFatalError(reason);
});
void (async () => {
  try {
    await program.parseAsync(process.argv);
  } catch (error) {
    await handleFatalError(error);
  }
})();
//# sourceMappingURL=cli.js.map