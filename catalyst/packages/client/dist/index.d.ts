declare class BigCommerceAPIError extends Error {
    status: number;
    graphqlErrors: unknown[];
    constructor(status: number, graphqlErrors?: unknown[]);
    static createFromResponse(response: Response): Promise<BigCommerceAPIError>;
}

declare enum GQLErrorCode {
    INVALID_CAT = "INVALID_CUSTOMER_ACCESS_TOKEN",
    MISSING_CAT = "MISSING_CUSTOMER_ACCESS_TOKEN"
}
interface GQLError {
    message: string;
    path: string[];
    locations: Array<{
        line: number;
        column: number;
    }>;
    extensions?: {
        [key: string]: unknown;
        code?: GQLErrorCode;
    };
}
declare class BigCommerceGQLError extends Error {
    errors: GQLError[];
    constructor(errors?: GQLError[]);
}

declare class BigCommerceAuthError extends BigCommerceGQLError {
    errors: GQLError[];
    readonly code: GQLErrorCode;
    constructor(errorCode: GQLErrorCode, errors?: GQLError[]);
}

declare class MissingCustomerAccessTokenError extends BigCommerceAuthError {
    errors: GQLError[];
    constructor(errors?: GQLError[]);
}

declare class InvalidCustomerAccessTokenError extends BigCommerceAuthError {
    errors: GQLError[];
    constructor(errors?: GQLError[]);
}

declare class InvalidStorefrontTokenError extends BigCommerceAPIError {
    status: number;
    constructor(status: number, graphqlErrors?: unknown[]);
}

interface DocumentDecoration<Result = Record<string, any>, Variables = Record<string, any>> {
    /** Type to support `@graphql-typed-document-node/core`
     * @internal
     */
    __apiType?: (variables: Variables) => Result;
    /** Type to support `TypedQueryDocumentNode` from `graphql`
     * @internal
     */
    __ensureTypesOfVariablesAndResultMatching?: (variables: Variables) => Result;
}

interface Config<FetcherRequestInit extends RequestInit = RequestInit> {
    storeHash: string;
    storefrontToken: string;
    channelId?: string;
    platform?: string;
    backendUserAgentExtensions?: string;
    logger?: boolean;
    getChannelId?: (defaultChannelId: string) => Promise<string> | string;
    beforeRequest?: (fetchOptions?: FetcherRequestInit) => Promise<Partial<FetcherRequestInit> | undefined> | Partial<FetcherRequestInit> | undefined;
    onError?: (error: BigCommerceGQLError, queryType: 'query' | 'mutation' | 'subscription') => Promise<void> | void;
}
interface BigCommerceResponseError {
    message: string;
    locations: Array<{
        line: number;
        column: number;
    }>;
    path: string[];
}
interface BigCommerceResponse<T> {
    data: T;
    errors?: BigCommerceResponseError[];
}
type GraphQLErrorPolicy = 'none' | 'all' | 'auth' | 'ignore';
declare class Client<FetcherRequestInit extends RequestInit = RequestInit> {
    private config;
    private backendUserAgent;
    private readonly defaultChannelId;
    private getChannelId;
    private beforeRequest?;
    private onError?;
    private trustedProxySecret;
    constructor(config: Config<FetcherRequestInit>);
    fetch<TResult, TVariables extends Record<string, unknown>>(config: {
        document: DocumentDecoration<TResult, TVariables>;
        variables: TVariables;
        customerAccessToken?: string;
        fetchOptions?: FetcherRequestInit;
        channelId?: string;
        errorPolicy?: GraphQLErrorPolicy;
        validateCustomerAccessToken?: boolean;
    }): Promise<BigCommerceResponse<TResult>>;
    fetch<TResult>(config: {
        document: DocumentDecoration<TResult, Record<string, never>>;
        variables?: undefined;
        customerAccessToken?: string;
        fetchOptions?: FetcherRequestInit;
        channelId?: string;
        errorPolicy?: GraphQLErrorPolicy;
        validateCustomerAccessToken?: boolean;
    }): Promise<BigCommerceResponse<TResult>>;
    fetchSitemapIndex(channelId?: string): Promise<string>;
    private getCanonicalUrl;
    private getGraphQLEndpoint;
    private requestLogger;
}
declare function createClient<FetcherRequestInit extends RequestInit = RequestInit>(config: Config<FetcherRequestInit>): Client<FetcherRequestInit>;

type Maybe<T> = T | null;
interface Connection<T> {
    edges?: Maybe<Array<Maybe<Edge<T>>>> | undefined;
}
interface Edge<T> {
    node: T;
}
declare const removeEdgesAndNodes: <T>(array: Connection<T>) => T[];

export { BigCommerceAPIError, BigCommerceAuthError, BigCommerceGQLError, InvalidCustomerAccessTokenError, InvalidStorefrontTokenError, MissingCustomerAccessTokenError, createClient, removeEdgesAndNodes };
