import { HyperTrackError } from './data_types/HyperTrackError';
import type { Location } from './data_types/Location';
import type { LocationError } from './data_types/LocationError';
import type { LocationWithDeviation } from './data_types/LocationWithDeviation';
import type { Result } from './data_types/Result';
import { Subscription } from './Subscription';
export declare const EVENT_ERRORS = "errors";
export declare const EVENT_IS_AVAILABLE = "isAvailable";
export declare const EVENT_IS_TRACKING = "isTracking";
export declare const EVENT_LOCATE = "locate";
export declare const EVENT_LOCATION = "location";
export default class HyperTrack {
    private static locateSubscription;
    /**
     * Adds a new geotag
     *
     * @param {Object} data - Geotad data JSON
     * @returns current location if success or LocationError if failure
     */
    static addGeotag(data: Object): Promise<Result<Location, LocationError>>;
    /**
     * Adds a new geotag with expected location
     *
     * @param {Object} data - Geotad data JSON
     * @param {Location} expectedLocation - Expected location
     * @returns location with deviation if success or LocationError if failure
     */
    static addGeotag(data: Object, expectedLocation: Location): Promise<Result<LocationWithDeviation, LocationError>>;
    /**
     * Returns a string that is used to uniquely identify the device
     *
     * @returns {string} Device ID
     */
    static getDeviceId(): Promise<string>;
    /**
     * Returns a list of errors that blocks SDK from tracking
     *
     * @returns {HyperTrackError[]} List of errors
     */
    static getErrors(): Promise<HyperTrackError[]>;
    /**
     * Reflects availability of the device for the Nearby search
     *
     * @returns true when is available or false when unavailable
     */
    static getIsAvailable(): Promise<boolean>;
    /**
     * Reflects the tracking intent for the device
     *
     * @returns {boolean} Whether the user's movement data is getting tracked or not.
     */
    static getIsTracking(): Promise<boolean>;
    /**
     * Reflects the current location of the user or an outage reason
     */
    static getLocation(): Promise<Result<Location, LocationError>>;
    /**
     * Gets the metadata that is set for the device
     *
     * @returns {Object} Metadata JSON
     */
    static getMetadata(): Promise<Object>;
    /**
     * Gets the name that is set for the device
     *
     * @returns {string} Device name
     */
    static getName(): Promise<string>;
    /**
     * Requests one-time location update and returns the location once it is available, or error.
     *
     * Only one locate subscription can be active at a time. If you re-subscribe, the old Subscription
     * will be automaticaly removed.
     *
     * This method will start location tracking if called, and will stop it when the location is received or
     * the subscription is cancelled. If any other tracking intent is present (e.g. isAvailable is set to `true`),
     * the tracking will not be stopped.
     *
     * @param callback
     * @returns Subscription
     * @example
     * ```js
     * const subscription = HyperTrack.locate(location => {
     *  ...
     * })
     *
     * // to unsubscribe
     * subscription.remove()
     * ```
     */
    static locate(callback: (locateResult: Result<Location, HyperTrackError[]>) => void): Subscription;
    /**
     * Sets the availability of the device for the Nearby search
     *
     * @param availability true when is available or false when unavailable
     */
    static setIsAvailable(isAvailable: boolean): Promise<void>;
    /**
     * Sets the tracking intent for the device
     *
     * @param {boolean} isTracking
     */
    static setIsTracking(isTracking: boolean): Promise<void>;
    /**
     * Sets the metadata for the device
     *
     * @param {Object} data - Metadata JSON
     */
    static setMetadata(data: Object): Promise<void>;
    /**
     * Sets the name for the device
     *
     * @param {string} name
     */
    static setName(name: string): Promise<void>;
    /**
     * Subscribe to tracking errors
     *
     * @param listener
     * @returns Subscription
     * @example
     * ```js
     * const subscription = HyperTrack.subscribeToErrors(errors => {
     *   errors.forEach(error => {
     *     // ... error
     *   })
     * })
     *
     * // later, to stop listening
     * subscription.remove()
     * ```
     */
    static subscribeToErrors(listener: (errors: HyperTrackError[]) => void): Subscription;
    /**
     * Subscribe to availability changes
     *
     * @param listener
     * @returns Subscription
     * @example
     * ```js
     * const subscription = HyperTrack.subscribeToIsAvailable(isAvailable => {
     *   if (isAvailable) {
     *     // ... ready to go
     *   }
     * })
     *
     * // later, to stop listening
     * subscription.remove()
     * ```
     */
    static subscribeToIsAvailable(listener: (isAvailable: boolean) => void): Subscription;
    /**
     * Subscribe to tracking intent changes
     *
     * @param listener
     * @returns Subscription
     * @example
     * ```js
     * const subscription = HyperTrack.subscribeToIsTracking(isTracking => {
     *   if (isTracking) {
     *     // ... ready to go
     *   }
     * })
     *
     * // later, to stop listening
     * subscription.remove()
     * ```
     */
    static subscribeToIsTracking(listener: (isTracking: boolean) => void): Subscription;
    /**
     * Subscribe to location changes
     *
     * @param listener
     * @returns Subscription
     * @example
     * ```js
     * const subscription = HyperTrack.subscribeToLocation(location => {
     *   ...
     * })
     *
     * // later, to stop listening
     * subscription.remove()
     * ```
     */
    static subscribeToLocation(listener: (location: Result<Location, LocationError>) => void): Subscription;
    /** @ignore */
    private static deserializeHyperTrackErrors;
    /** @ignore */
    private static deserializeLocateResponse;
    /** @ignore */
    private static deserializeLocationError;
    /** @ignore */
    private static deserializeLocationResponse;
    /** @ignore */
    private static deserializeLocationWithDeviationResponse;
    /** @ignore */
    private static deserializeMetadata;
    /** @ignore */
    private static deserializeName;
    /** @ignore */
    private static isLocation;
}
