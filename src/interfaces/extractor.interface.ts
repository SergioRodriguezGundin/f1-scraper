export interface Extractor<T> {
	f1Object: T;
	retrieveAdditionalData?: (f1Object: T, env: Env) => Promise<void>;
}
