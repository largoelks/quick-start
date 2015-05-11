function cacheBust(loader) {
    var buildNumber = loader.buildNumber;

    // stash the locate function
    var locate = loader.locate;

    loader.locate = function (load) {
        console.log("loader.locate executed");

        return Promise.resolve(locate.call(this, loader)).then(function (proposedAddress) {
            console.log("promise resolved", proposedAddress + "?v=" + buildNumber);
            return proposedAddress + "?v=" + buildNumber;
        }, function() {
            console.log("ERROR", arguments);
        });
    };
}

if (typeof System === "object" && System.env === "production") {
    cacheBust(System);
}
