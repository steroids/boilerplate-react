/** Parameters for getting currency ratios contained in the URL. */
export interface CurrencyQueryParams {
    /** Current base currency. */
    readonly base: string;

    /** List of currency codes. */
    readonly symbols: readonly string[];
}
