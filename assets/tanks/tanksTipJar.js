(function() {
	var tablet = Tablet.getTablet("com.highfidelity.interface.tablet.system");
	var uuid = Uuid.generate();

	function webEventReceived(json) {
		try { json = JSON.parse(json);
		} catch(err) {}
		
		if (json.uuid != uuid) return;
		if (typeof json.amount != "number") return;
		if (typeof json.message != "string") return;

		tablet.loadQMLSource("hifi/commerce/common/sendAsset/SendAsset.qml");
        tablet.sendToQml({method: 'updateSendAssetQML',
            amount: json.amount,
            message: json.message,
            username: "ThomasPasieka",
        });
	}

	function openTablet() {
		tablet.gotoWebScreen(Script.resolvePath("tanksTipJar.html")+"?uuid="+uuid);
	}

	this.preload = function() {
		tablet.webEventReceived.connect(webEventReceived);
	}

	this.unload = function() {
		tablet.webEventReceived.disconnect(webEventReceived);
	}

	this.clickDownOnEntity = openTablet;
	this.startFarTrigger = openTablet;
	this.startNearTrigger = openTablet;
})