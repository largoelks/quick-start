function cacheBust(loader) {
    var buildNumber = loader.buildNumber;

    // stash the locate function
    var locate = loader.locate;

    loader.locate = function (load) {
        return Promise.resolve(locate.call(this, load)).then(function (proposedAddress) {
            console.log("promise resolved", proposedAddress);
            return proposedAddress + "?v=" + buildNumber;
        }, function() {
            console.log("ERROR", arguments);
        });
    };
}

if (typeof System === "object" && System.env === "production") {
    cacheBust(System);
}
