// __d(function (e, n, t, r) {
//     var u = n(18).NativeModules.RNDeviceInfo;
//     t.exports = {
//         getUniqueID: function () {
//             return u.uniqueId
//         },
//         getInstanceID: function () {
//             return u.instanceId
//         },
//         getSerialNumber: function () {
//             return u.serialNumber
//         },
//         getIPAddress: function () {
//             return u.getIpAddress()
//         },
//         getMACAddress: function () {
//             return u.getMacAddress()
//         },
//         getDeviceId: function () {
//             return u.deviceId
//         },
//         getManufacturer: function () {
//             return u.systemManufacturer
//         },
//         getModel: function () {
//             return u.model
//         },
//         getBrand: function () {
//             return u.brand
//         },
//         getSystemName: function () {
//             return u.systemName
//         },
//         getSystemVersion: function () {
//             console.log("U是什么东西", u);
//             return u.systemVersion
//         },
//         getAPILevel: function () {
//             return u.apiLevel
//         },
//         getBundleId: function () {
//             return u.bundleId
//         },
//         getBuildNumber: function () {
//             return u.buildNumber
//         },
//         getVersion: function () {
//             return u.appVersion
//         },
//         getReadableVersion: function () {
//             return u.appVersion + '.' + u.buildNumber
//         },
//         getDeviceName: function () {
//             return u.deviceName
//         },
//         getUserAgent: function () {
//             return u.userAgent
//         },
//         getDeviceLocale: function () {
//             return u.deviceLocale
//         },
//         getDeviceCountry: function () {
//             return u.deviceCountry
//         },
//         getTimezone: function () {
//             return u.timezone
//         },
//         isEmulator: function () {
//             return u.isEmulator
//         },
//         isTablet: function () {
//             return u.isTablet
//         },
//         is24Hour: function () {
//             return u.is24Hour
//         },
//         isPinOrFingerprintSet: function () {
//             return u.isPinOrFingerprintSet
//         },
//         getFirstInstallTime: function () {
//             return u.firstInstallTime
//         },
//         getLastUpdateTime: function () {
//             return u.lastUpdateTime
//         },
//         getPhoneNumber: function () {
//             return u.phoneNumber
//         },
//         getCarrier: function () {
//             return u.carrier
//         }
//     }
// }, 367);

class Foo {
    print() {
        console.log(this.x);
    }

    constructor() {
        this.x = 1;
    }
}

let foo = new Foo();
foo.print.call({x: 2});
