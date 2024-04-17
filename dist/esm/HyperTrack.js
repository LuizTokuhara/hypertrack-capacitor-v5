import { HyperTrackError } from './data_types/HyperTrackError';
import { registerPlugin } from '@capacitor/core';
export const EVENT_ERRORS = 'errors';
export const EVENT_IS_AVAILABLE = 'isAvailable';
export const EVENT_IS_TRACKING = 'isTracking';
export const EVENT_LOCATE = 'locate';
export const EVENT_LOCATION = 'location';
const hyperTrackPlugin = registerPlugin('HyperTrackCapacitorPlugin', {
// web: () => import('./web').then(m => new m.HyperTrackSdkWeb()),
});
export default class HyperTrack {
    static async addGeotag(...args) {
        if (args.length === 1 && typeof args[0] === 'object') {
            return hyperTrackPlugin
                .addGeotag({
                data: args[0],
                expectedLocation: undefined,
            })
                .then((locationResponse) => {
                return this.deserializeLocationResponse(locationResponse);
            });
        }
        else if (args.length === 2 && typeof args[0] === 'object' && HyperTrack.isLocation(args[1])) {
            let expectedLocation = args[1];
            return hyperTrackPlugin
                .addGeotag({
                data: args[0],
                expectedLocation: {
                    type: 'location',
                    value: {
                        latitude: expectedLocation.latitude,
                        longitude: expectedLocation.longitude,
                    },
                },
            })
                .then((locationResponse) => {
                return this.deserializeLocationWithDeviationResponse(locationResponse);
            });
        }
        else {
            throw new Error('Invalid arguments');
        }
    }
    /**
     * Returns a string that is used to uniquely identify the device
     *
     * @returns {string} Device ID
     */
    static async getDeviceId() {
        return hyperTrackPlugin.getDeviceId().then((deviceId) => deviceId.value);
    }
    /**
     * Returns a list of errors that blocks SDK from tracking
     *
     * @returns {HyperTrackError[]} List of errors
     */
    static async getErrors() {
        return hyperTrackPlugin.getErrors().then((errors) => {
            return this.deserializeHyperTrackErrors(errors.errors);
        });
    }
    /**
     * Reflects availability of the device for the Nearby search
     *
     * @returns true when is available or false when unavailable
     */
    static async getIsAvailable() {
        return hyperTrackPlugin.getIsAvailable().then((isAvailable) => isAvailable.value);
    }
    /**
     * Reflects the tracking intent for the device
     *
     * @returns {boolean} Whether the user's movement data is getting tracked or not.
     */
    static async getIsTracking() {
        return hyperTrackPlugin.getIsTracking().then((isTracking) => isTracking.value);
    }
    /**
     * Reflects the current location of the user or an outage reason
     */
    static async getLocation() {
        return hyperTrackPlugin.getLocation().then((locationResponse) => {
            return this.deserializeLocationResponse(locationResponse);
        });
    }
    /**
     * Gets the metadata that is set for the device
     *
     * @returns {Object} Metadata JSON
     */
    static async getMetadata() {
        return hyperTrackPlugin.getMetadata().then((metadata) => {
            return this.deserializeMetadata(metadata);
        });
    }
    /**
     * Gets the name that is set for the device
     *
     * @returns {string} Device name
     */
    static async getName() {
        return hyperTrackPlugin.getName().then((name) => {
            return this.deserializeName(name);
        });
    }
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
    static locate(callback) {
        var _a;
        // this call doesn't work on iOS for some reason
        (_a = this.locateSubscription) === null || _a === void 0 ? void 0 : _a.remove();
        this.locateSubscription = hyperTrackPlugin.addListener(EVENT_LOCATE, (location) => {
            var _a;
            callback(this.deserializeLocateResponse(location));
            // so we remove the subscription here (locate should return only one event)
            (_a = this.locateSubscription) === null || _a === void 0 ? void 0 : _a.remove();
        });
        hyperTrackPlugin.onSubscribedToLocate();
        return this.locateSubscription;
    }
    /**
     * Sets the availability of the device for the Nearby search
     *
     * @param availability true when is available or false when unavailable
     */
    static async setIsAvailable(isAvailable) {
        hyperTrackPlugin.setIsAvailable({
            type: 'isAvailable',
            value: isAvailable,
        });
    }
    /**
     * Sets the tracking intent for the device
     *
     * @param {boolean} isTracking
     */
    static async setIsTracking(isTracking) {
        hyperTrackPlugin.setIsTracking({
            type: 'isTracking',
            value: isTracking,
        });
    }
    /**
     * Sets the metadata for the device
     *
     * @param {Object} data - Metadata JSON
     */
    static async setMetadata(data) {
        hyperTrackPlugin.setMetadata({
            type: 'metadata',
            value: data,
        });
    }
    /**
     * Sets the name for the device
     *
     * @param {string} name
     */
    static async setName(name) {
        hyperTrackPlugin.setName({
            type: 'name',
            value: name,
        });
    }
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
    static subscribeToErrors(listener) {
        const result = hyperTrackPlugin.addListener(EVENT_ERRORS, (info) => {
            listener(this.deserializeHyperTrackErrors(info.errors));
        });
        hyperTrackPlugin.onSubscribedToErrors();
        return result;
    }
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
    static subscribeToIsAvailable(listener) {
        const result = hyperTrackPlugin.addListener(EVENT_IS_AVAILABLE, (isAvailable) => {
            listener(isAvailable.value);
        });
        hyperTrackPlugin.onSubscribedToIsAvailable();
        return result;
    }
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
    static subscribeToIsTracking(listener) {
        const result = hyperTrackPlugin.addListener(EVENT_IS_TRACKING, (isTracking) => {
            listener(isTracking.value);
        });
        hyperTrackPlugin.onSubscribedToIsTracking();
        return result;
    }
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
    static subscribeToLocation(listener) {
        const result = hyperTrackPlugin.addListener(EVENT_LOCATION, (location) => {
            listener(this.deserializeLocationResponse(location));
        });
        hyperTrackPlugin.onSubscribedToLocation();
        return result;
    }
    /** @ignore */
    static deserializeHyperTrackErrors(errors) {
        let res = errors.map((error) => {
            if (error.type != 'error') {
                throw new Error('Invalid error type');
            }
            return Object.keys(HyperTrackError).find((key) => HyperTrackError[key] === error.value);
        });
        return res;
    }
    /** @ignore */
    static deserializeLocateResponse(response) {
        switch (response.type) {
            case 'success':
                return {
                    type: 'success',
                    value: response.value.value,
                };
            case 'failure':
                return {
                    type: 'failure',
                    value: this.deserializeHyperTrackErrors(response.value),
                };
        }
    }
    /** @ignore */
    static deserializeLocationError(locationError) {
        switch (locationError.type) {
            case 'notRunning':
            case 'starting':
                return locationError;
            case 'errors':
                return {
                    type: 'errors',
                    value: this.deserializeHyperTrackErrors(locationError.value),
                };
        }
    }
    /** @ignore */
    static deserializeLocationResponse(response) {
        switch (response.type) {
            case 'success':
                return {
                    type: 'success',
                    value: response.value.value,
                };
            case 'failure':
                return {
                    type: 'failure',
                    value: this.deserializeLocationError(response.value),
                };
        }
    }
    /** @ignore */
    static deserializeLocationWithDeviationResponse(response) {
        switch (response.type) {
            case 'success':
                const locationWithDeviationInternal = response.value;
                const locationInternal = locationWithDeviationInternal.value.location;
                return {
                    type: 'success',
                    value: {
                        location: locationInternal.value,
                        deviation: locationWithDeviationInternal.value.deviation,
                    },
                };
            case 'failure':
                return {
                    type: 'failure',
                    value: this.deserializeLocationError(response.value),
                };
        }
    }
    /** @ignore */
    static deserializeMetadata(metadata) {
        if (metadata.type != 'metadata') {
            throw new Error(`Invalid metadata: ${JSON.stringify(metadata)}`);
        }
        return metadata.value;
    }
    /** @ignore */
    static deserializeName(name) {
        if (name.type != 'name') {
            throw new Error(`Invalid name: ${JSON.stringify(name)}`);
        }
        return name.value;
    }
    /** @ignore */
    static isLocation(obj) {
        return ('latitude' in obj && typeof obj.latitude == 'number' && 'longitude' in obj && typeof obj.longitude == 'number');
    }
}
//# sourceMappingURL=HyperTrack.js.map