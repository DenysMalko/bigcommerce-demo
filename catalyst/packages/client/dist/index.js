"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name2 in all)
    __defProp(target, name2, { get: all[name2], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var index_exports = {};
__export(index_exports, {
  BigCommerceAPIError: () => BigCommerceAPIError,
  BigCommerceAuthError: () => BigCommerceAuthError,
  BigCommerceGQLError: () => BigCommerceGQLError,
  InvalidCustomerAccessTokenError: () => InvalidCustomerAccessTokenError,
  InvalidStorefrontTokenError: () => InvalidStorefrontTokenError,
  MissingCustomerAccessTokenError: () => MissingCustomerAccessTokenError,
  createClient: () => createClient,
  removeEdgesAndNodes: () => removeEdgesAndNodes
});
module.exports = __toCommonJS(index_exports);

// src/api-error.ts
var BigCommerceAPIError = class _BigCommerceAPIError extends Error {
  constructor(status, graphqlErrors = []) {
    const message = `
    BigCommerce API returned ${status}
    ${graphqlErrors.map((error) => JSON.stringify(error, null, 2)).join("\n")}
    `;
    super(message);
    this.status = status;
    this.graphqlErrors = graphqlErrors;
    this.name = "BigCommerceAPIError";
  }
  static async createFromResponse(response) {
    try {
      const errorResponse = await response.json();
      assertIsErrorResponse(errorResponse);
      return new _BigCommerceAPIError(response.status, errorResponse.errors);
    } catch {
      return new _BigCommerceAPIError(response.status);
    }
  }
};
function assertIsErrorResponse(value) {
  if (typeof value !== "object" || value === null) {
    throw new Error("Expected maybeError to be an object");
  }
  if (!("errors" in value)) {
    throw new Error("Expected maybeError to have an errors property");
  }
}

// src/gql-error.ts
var BigCommerceGQLError = class extends Error {
  constructor(errors = []) {
    const message = errors.map((error) => JSON.stringify(error, null, 2)).join("\n");
    super(message);
    this.errors = errors;
    this.name = "BigCommerceGQLError";
  }
};

// src/gql-auth-error.ts
var BigCommerceAuthError = class extends BigCommerceGQLError {
  constructor(errorCode, errors = []) {
    super(errors);
    this.errors = errors;
    this.name = "BigCommerceAuthError";
    this.code = errorCode;
  }
  code;
};

// src/missing-cat-error.ts
var MissingCustomerAccessTokenError = class extends BigCommerceAuthError {
  constructor(errors = []) {
    super("MISSING_CUSTOMER_ACCESS_TOKEN" /* MISSING_CAT */, errors);
    this.errors = errors;
    this.name = "MissingCustomerAccessTokenError";
  }
};

// src/invalid-cat-error.ts
var InvalidCustomerAccessTokenError = class extends BigCommerceAuthError {
  constructor(errors = []) {
    super("INVALID_CUSTOMER_ACCESS_TOKEN" /* INVALID_CAT */, errors);
    this.errors = errors;
    this.name = "InvalidCustomerAccessTokenError";
  }
};

// src/invalid-storefront-token-error.ts
var InvalidStorefrontTokenError = class extends BigCommerceAPIError {
  constructor(status, graphqlErrors = []) {
    super(status, graphqlErrors);
    this.status = status;
    this.name = "InvalidStorefrontTokenError";
    this.message = [
      `BigCommerce API returned ${status}: the configured storefront token doesn't look like a JWT.`,
      "",
      "BIGCOMMERCE_STOREFRONT_TOKEN must be a storefront API JWT, not an OAuth access token or any other token type.",
      "Generate one via the Storefront API Token endpoint (POST /stores/{store_hash}/v3/storefront/api-token):",
      "https://developer.bigcommerce.com/docs/rest-authentication/tokens#create-a-token"
    ].join("\n");
  }
};

// src/lib/error.ts
function parseGraphQLError(result) {
  var _a;
  try {
    assertIsGQLErrorResponse(result);
    const extendedError = result.find((error) => error.extensions && "code" in error.extensions);
    if (extendedError) {
      switch ((_a = extendedError.extensions) == null ? void 0 : _a.code) {
        case "MISSING_CUSTOMER_ACCESS_TOKEN" /* MISSING_CAT */:
          return new MissingCustomerAccessTokenError(result);
        case "INVALID_CUSTOMER_ACCESS_TOKEN" /* INVALID_CAT */:
          return new InvalidCustomerAccessTokenError(result);
      }
    }
    return new BigCommerceGQLError(result);
  } catch {
    return new BigCommerceGQLError([{ message: "Unknown error", path: [], locations: [] }]);
  }
}
function assertIsGQLErrorResponse(value) {
  if (!Array.isArray(value)) {
    throw new Error("Expected maybeError to be an array");
  }
  if (value.some((error) => typeof error !== "object" || error === null)) {
    throw new Error("Expected maybeError to be an array of objects");
  }
  if (value.some((error) => !("message" in error))) {
    throw new Error("Expected maybeError to have a message property");
  }
}

// src/lib/storefront-token.ts
var BASE64URL_SEGMENT = /^[A-Za-z0-9_-]+$/;
function looksLikeJwt(token) {
  const segments = token.split(".");
  if (segments.length !== 3 || !segments.every((segment) => BASE64URL_SEGMENT.test(segment))) {
    return false;
  }
  try {
    const payload = segments[1].replace(/-/g, "+").replace(/_/g, "/");
    const decoded = JSON.parse(atob(payload));
    return typeof decoded === "object" && decoded !== null;
  } catch {
    return false;
  }
}

// src/utils/getOperationName.ts
var import_graphql = require("@0no-co/graphql.web");
function isOperationDefinitionNode(node) {
  return node.kind === "OperationDefinition";
}
var getOperationInfo = (document) => {
  const documentNode = (0, import_graphql.parse)(document);
  const operationInfo = documentNode.definitions.filter(isOperationDefinitionNode).map((def) => {
    var _a;
    return {
      name: (_a = def.name) == null ? void 0 : _a.value,
      type: def.operation
    };
  })[0];
  return operationInfo;
};

// src/utils/normalizeQuery.ts
var import_graphql2 = require("@0no-co/graphql.web");
function normalizeQuery(query) {
  if (typeof query === "string") {
    return query;
  }
  if (query instanceof String) {
    return query.toString();
  }
  if ("kind" in query) {
    return (0, import_graphql2.print)(query);
  }
  throw new Error("Invalid query type");
}

// src/utils/userAgent.ts
var import_std_env = require("std-env");

// package.json
var package_default = {
  name: "@bigcommerce/catalyst-client",
  description: "BigCommerce API client for Catalyst.",
  version: "1.0.4",
  repository: {
    type: "git",
    url: "https://github.com/bigcommerce/catalyst",
    directory: "packages/client"
  },
  main: "dist/index.js",
  types: "dist/index.d.ts",
  scripts: {
    build: "tsup",
    dev: "tsup --watch",
    typecheck: "tsc --noEmit",
    lint: "eslint . --ext .ts,.js,.cjs --max-warnings 0",
    "lint-fix": "eslint . --ext .ts,.js,.cjs --fix",
    test: "vitest run",
    "gen-types": "dotenv -e .env.local -- node scripts/types.js"
  },
  files: [
    "dist"
  ],
  dependencies: {
    "@0no-co/graphql.web": "^1.1.2",
    "std-env": "^3.9.0"
  },
  devDependencies: {
    "@bigcommerce/eslint-config": "^2.11.0",
    "@bigcommerce/eslint-config-catalyst": "workspace:^",
    "@types/node": "^22.15.30",
    "dotenv-cli": "^8.0.0",
    eslint: "^8.57.1",
    prettier: "^3.6.2",
    tsup: "^8.5.0",
    typescript: "^5.8.3",
    vitest: "^3.2.4"
  }
};

// src/utils/userAgent.ts
var { name, version } = package_default;
var getPlatform = () => {
  const keysOfInterest = [import_std_env.runtime, import_std_env.provider, import_std_env.nodeVersion, import_std_env.process.env.NODE_ENV].filter(Boolean);
  return keysOfInterest.join("; ");
};
var detectedPlatform = getPlatform();
var getBackendUserAgent = (platform, extensions) => {
  const userAgentParts = [`${name}/${version}`];
  const platformValue = platform ?? detectedPlatform;
  userAgentParts.push(`(${platformValue})`);
  if (extensions) {
    userAgentParts.push(extensions);
  }
  return userAgentParts.join(" ");
};

// src/client.ts
var graphqlApiDomain = process.env.BIGCOMMERCE_GRAPHQL_API_DOMAIN ?? "mybigcommerce.com";
var adminApiHostname = process.env.BIGCOMMERCE_ADMIN_API_HOST ?? "api.bigcommerce.com";
var RETRY_DELAYS_MS = [100, 300];
var RETRYABLE_STATUSES = /* @__PURE__ */ new Set([502, 503, 504]);
function isTransientError(error) {
  if (error instanceof BigCommerceAPIError) {
    return RETRYABLE_STATUSES.has(error.status);
  }
  return error instanceof TypeError;
}
function backoff(ms, signal) {
  return new Promise((resolve, reject) => {
    const timer = setTimeout(() => {
      signal == null ? void 0 : signal.removeEventListener("abort", onAbort);
      resolve();
    }, ms);
    function onAbort() {
      clearTimeout(timer);
      const reason = signal == null ? void 0 : signal.reason;
      reject(reason instanceof Error ? reason : new DOMException("Aborted", "AbortError"));
    }
    signal == null ? void 0 : signal.addEventListener("abort", onAbort, { once: true });
  });
}
function describeTransientError(error) {
  if (error instanceof BigCommerceAPIError) {
    return `HTTP ${error.status}`;
  }
  const message = error instanceof Error ? error.message : String(error);
  const cause = error instanceof Error ? error.cause : void 0;
  const code = cause && typeof cause === "object" && "code" in cause && typeof cause.code === "string" ? cause.code : void 0;
  return code ? `${message} (${code})` : message;
}
async function withRetries(maxAttempts, signal, operationLabel, attempt) {
  for (let attemptNumber = 1; ; attemptNumber += 1) {
    try {
      return await attempt();
    } catch (error) {
      if (attemptNumber >= maxAttempts || (signal == null ? void 0 : signal.aborted) || !isTransientError(error)) {
        throw error;
      }
      console.warn(
        `[BigCommerce] Retrying ${operationLabel} after ${describeTransientError(error)} (attempt ${attemptNumber + 1} of ${maxAttempts})`
      );
      await backoff(RETRY_DELAYS_MS[attemptNumber - 1] ?? 0, signal);
    }
  }
}
var Client = class {
  constructor(config) {
    this.config = config;
    if (!config.channelId) {
      throw new Error("Client configuration must include a channelId.");
    }
    this.defaultChannelId = config.channelId;
    this.backendUserAgent = getBackendUserAgent(config.platform, config.backendUserAgentExtensions);
    this.getChannelId = config.getChannelId ?? function defaultChannelIdFn(defaultChannelId) {
      return defaultChannelId;
    };
    this.beforeRequest = config.beforeRequest;
    this.onError = config.onError;
  }
  backendUserAgent;
  defaultChannelId;
  getChannelId;
  beforeRequest;
  onError;
  trustedProxySecret = process.env.BIGCOMMERCE_TRUSTED_PROXY_SECRET;
  async fetch({
    document,
    variables,
    customerAccessToken,
    fetchOptions = {},
    channelId,
    errorPolicy = "none",
    validateCustomerAccessToken = true
  }) {
    var _a, _b, _c;
    const { headers = {}, ...rest } = fetchOptions;
    const query = normalizeQuery(document);
    const log = this.requestLogger(query);
    const operationInfo = getOperationInfo(query);
    const graphqlUrl = await this.getGraphQLEndpoint(
      channelId,
      operationInfo.name,
      operationInfo.type
    );
    const { headers: additionalFetchHeaders = {}, ...additionalFetchOptions } = await ((_a = this.beforeRequest) == null ? void 0 : _a.call(this, fetchOptions)) ?? {};
    const requestHeaders = new Headers({
      "Content-Type": "application/json",
      Authorization: `Bearer ${this.config.storefrontToken}`,
      "User-Agent": this.backendUserAgent
    });
    if (customerAccessToken) {
      requestHeaders.set("X-Bc-Customer-Access-Token", customerAccessToken);
    }
    if (validateCustomerAccessToken) {
      requestHeaders.set("X-Bc-Error-On-Invalid-Customer-Access-Token", "true");
    }
    if (this.trustedProxySecret) {
      requestHeaders.set("X-BC-Trusted-Proxy-Secret", this.trustedProxySecret);
    }
    new Headers(additionalFetchHeaders).forEach((value, key) => {
      requestHeaders.set(key, value);
    });
    new Headers(headers).forEach((value, key) => {
      requestHeaders.set(key, value);
    });
    const requestInit = {
      method: "POST",
      headers: requestHeaders,
      body: JSON.stringify({
        query,
        ...variables && { variables }
      }),
      ...additionalFetchOptions,
      ...rest
    };
    const maxAttempts = operationInfo.type === "query" ? RETRY_DELAYS_MS.length + 1 : 1;
    const operationLabel = `${operationInfo.type} ${operationInfo.name ?? "anonymous"}`;
    const result = await withRetries(maxAttempts, requestInit.signal, operationLabel, async () => {
      const response = await fetch(graphqlUrl, requestInit);
      if (!response.ok) {
        if (response.status === 401 && !looksLikeJwt(this.config.storefrontToken)) {
          throw new InvalidStorefrontTokenError(response.status);
        }
        throw await BigCommerceAPIError.createFromResponse(response);
      }
      log(response);
      return await response.json();
    });
    const { errors, ...data } = result;
    if (errorPolicy === "none" && errors) {
      const error = parseGraphQLError(errors);
      await ((_b = this.onError) == null ? void 0 : _b.call(this, error, operationInfo.type));
      throw error;
    }
    if (errorPolicy === "auth" && errors) {
      const error = parseGraphQLError(errors);
      if (error instanceof BigCommerceAuthError) {
        await ((_c = this.onError) == null ? void 0 : _c.call(this, error, operationInfo.type));
        throw error;
      }
    }
    if (errorPolicy === "ignore") {
      return data;
    }
    return result;
  }
  async fetchSitemapIndex(channelId) {
    const sitemapIndexUrl = `${await this.getCanonicalUrl(channelId)}/xmlsitemap.php`;
    const response = await fetch(sitemapIndexUrl, {
      method: "GET",
      headers: {
        Accept: "application/xml",
        "Content-Type": "application/xml",
        "User-Agent": this.backendUserAgent,
        ...this.trustedProxySecret && { "X-BC-Trusted-Proxy-Secret": this.trustedProxySecret }
      }
    });
    if (!response.ok) {
      throw new Error(`Unable to get Sitemap Index: ${response.statusText}`);
    }
    return response.text();
  }
  async getCanonicalUrl(channelId) {
    const resolvedChannelId = channelId ?? await this.getChannelId(this.defaultChannelId);
    return `https://store-${this.config.storeHash}-${resolvedChannelId}.${graphqlApiDomain}`;
  }
  async getGraphQLEndpoint(channelId, operationName, operationType) {
    const baseUrl = new URL(`${await this.getCanonicalUrl(channelId)}/graphql`);
    if (operationName) {
      baseUrl.searchParams.set("operation", operationName);
    }
    if (operationType) {
      baseUrl.searchParams.set("type", operationType);
    }
    return baseUrl.toString();
  }
  requestLogger(document) {
    if (!this.config.logger) {
      return () => {
      };
    }
    const { name: name2, type } = getOperationInfo(document);
    const timeStart = performance.now();
    return (response) => {
      const timeEnd = performance.now();
      const duration = (timeEnd - timeStart).toFixed(2);
      const complexity = response.headers.get("x-bc-graphql-complexity");
      console.log(
        `[BigCommerce] ${type} ${name2 ?? "anonymous"} - ${duration}ms - complexity ${complexity ?? "unknown"}`
      );
    };
  }
};
function createClient(config) {
  return new Client(config);
}

// src/utils/removeEdgesAndNodes.ts
var removeEdgesAndNodes = (array) => {
  if (!array.edges) {
    return [];
  }
  return array.edges.filter((edge) => edge !== null).map((edge) => edge.node);
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  BigCommerceAPIError,
  BigCommerceAuthError,
  BigCommerceGQLError,
  InvalidCustomerAccessTokenError,
  InvalidStorefrontTokenError,
  MissingCustomerAccessTokenError,
  createClient,
  removeEdgesAndNodes
});
