// enum naming convention is ignored to make datatype sync
// across platforms easier
export var HyperTrackError;
(function (HyperTrackError) {
    /**
     * The SDK was remotely blocked from running.
     */
    HyperTrackError["blockedFromRunning"] = "blockedFromRunning";
    /**
     * The publishable key is invalid.
     */
    HyperTrackError["invalidPublishableKey"] = "invalidPublishableKey";
    /**
     * The user enabled mock location app while mocking locations is prohibited.
     */
    HyperTrackError["locationMocked"] = "location.mocked";
    /**
     * The user disabled location services systemwide.
     */
    HyperTrackError["locationServicesDisabled"] = "location.servicesDisabled";
    /**
     * [Android only] The device doesn't have location services.
     */
    HyperTrackError["locationServicesUnavailable"] = "location.servicesUnavailable";
    /**
     * GPS satellites are not in view.
     */
    HyperTrackError["locationSignalLost"] = "location.signalLost";
    /**
     * [Android only] The SDK wasn't able to start tracking because of the limitations imposed by the OS.
     * The exempt from background execution conditions weren't met.
     * {@link https://developer.android.com/guide/components/foreground-services#background-start-restriction-exemptions}
     */
    HyperTrackError["noExemptionFromBackgroundStartRestrictions"] = "noExemptionFromBackgroundStartRestrictions";
    /**
     * The user denied location permissions.
     */
    HyperTrackError["permissionsLocationDenied"] = "permissions.location.denied";
    /**
     * Can’t start tracking in background with When In Use location permissions.
     * SDK will automatically start tracking when app will return to foreground.
     */
    HyperTrackError["permissionsLocationInsufficientForBackground"] = "permissions.location.insufficientForBackground";
    /**
     * [iOS only] The user has not chosen whether the app can use location services.
     */
    HyperTrackError["permissionsLocationNotDetermined"] = "permissions.location.notDetermined";
    /**
     * [iOS only] The app is in Provisional Always authorization state, which stops sending locations when app is in background.
     */
    HyperTrackError["permissionsLocationProvisional"] = "permissions.location.provisional";
    /**
     * The user didn't grant precise location permissions or downgraded permissions to imprecise.
     */
    HyperTrackError["permissionsLocationReducedAccuracy"] = "permissions.location.reducedAccuracy";
    /**
     * [iOS only] The app is not authorized to use location services.
     */
    HyperTrackError["permissionsLocationRestricted"] = "permissions.location.restricted";
    /**
     * [Android only] The user denied notification permissions needed to display a persistent notification
     * needed for foreground location tracking.
     */
    HyperTrackError["permissionsNotificationsDenied"] = "permissions.notifications.denied";
})(HyperTrackError || (HyperTrackError = {}));
//# sourceMappingURL=HyperTrackError.js.map