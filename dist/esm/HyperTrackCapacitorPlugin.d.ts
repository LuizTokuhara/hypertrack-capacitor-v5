import { EVENT_ERRORS, EVENT_IS_AVAILABLE, EVENT_IS_TRACKING, EVENT_LOCATE, EVENT_LOCATION } from "./HyperTrack";
import { Subscription } from "./Subscription";
import { Result } from "./data_types/Result";
import { DeviceId } from "./data_types/internal/DeviceId";
import { HyperTrackErrorInternal } from "./data_types/internal/HyperTrackErrorInternal";
import { IsAvailable } from "./data_types/internal/IsAvailable";
import { IsTracking } from "./data_types/internal/IsTracking";
import { LocationErrorInternal } from "./data_types/internal/LocationErrorInternal";
import { LocationInternal } from "./data_types/internal/LocationInternal";
import { Metadata } from "./data_types/internal/Metadata";
import { Name } from "./data_types/internal/Name";
export type Errors = {
    "errors": HyperTrackErrorInternal[];
};
export interface HyperTrackCapacitorPlugin {
    addGeotag(...args: any[]): Promise<any>;
    getDeviceId(): Promise<DeviceId>;
    getErrors(): Promise<Errors>;
    getIsAvailable(): Promise<IsAvailable>;
    getIsTracking(): Promise<IsTracking>;
    getLocation(): Promise<Result<LocationInternal, LocationErrorInternal>>;
    getMetadata(): Promise<Metadata>;
    getName(): Promise<Name>;
    setIsAvailable(isAvailable: IsAvailable): Promise<void>;
    setIsTracking(isTracking: IsTracking): Promise<void>;
    setMetadata(data: Metadata): Promise<void>;
    setName(name: Name): Promise<void>;
    onSubscribedToErrors(): Promise<void>;
    onSubscribedToIsAvailable(): Promise<void>;
    onSubscribedToIsTracking(): Promise<void>;
    onSubscribedToLocate(): Promise<void>;
    onSubscribedToLocation(): Promise<void>;
    addListener(eventName: typeof EVENT_ERRORS, listenerFunc: (error: any) => void): Subscription;
    addListener(eventName: typeof EVENT_IS_AVAILABLE, listenerFunc: (isAvailable: IsAvailable) => void): Subscription;
    addListener(eventName: typeof EVENT_IS_TRACKING, listenerFunc: (isTracking: IsTracking) => void): Subscription;
    addListener(eventName: typeof EVENT_LOCATE, listenerFunc: (locateResult: Result<LocationInternal, HyperTrackErrorInternal[]>) => void): Subscription;
    addListener(eventName: typeof EVENT_LOCATION, listenerFunc: (location: Result<LocationInternal, LocationErrorInternal>) => void): Subscription;
}
