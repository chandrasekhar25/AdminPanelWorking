var gamesparks = new GameSparks();
var angularMessageListner;

/*if( localStorage.gamesparks ){
	var gamesparks = JSON.parse(localStorage.gamesparks);
}*/

var gamesparksFunctions = (function () {
  var gameConfigs;

  function onNonce(nonce) {
    return CryptoJS.enc.Base64.stringify(CryptoJS.HmacSHA256(nonce, gameConfigs.preview));
  }

  function onInit(callback) {
    //console.log("Initialized");
    // localStorage.gamesparks = JSON.stringify(gamesparks);
    if (callback)
      callback();
  }

  function onMessage(message) {
    if( angularMessageListner ){
      angularMessageListner( message );
    }
  }

  function getConfigData(callback) {
    /*$.getJSON("./jsons/Config.json", function( configData ){
    	gameConfigs = configData;
    });*/
    /*gameConfigs = {
      "live": "wfU1rqdl9ZE9lplfh04iAqyb55FsFKsT",
      "preview": "wfU1rqdl9ZE9lplfh04iAqyb55FsFKsT",
      "gameCode": "h391398vKUeK",
      "usingLive": false
    };*/
    gameConfigs = {
      "live": "wfU1rqdl9ZE9lplfh04iAqyb55FsFKsT",
      "preview": "wfU1rqdl9ZE9lplfh04iAqyb55FsFKsT",
      "gameCode": "h391398vKUeK",
      "usingLive": false
    };
    callback(gameConfigs);
  }

  function eventCalls(requestType, requestObj, callback, isSelfCall) {
    if (isSelfCall)
      gamesparks.sendWithData(requestType, requestObj, callback);
    else {
      gamesparks.sendWithData(requestType, requestObj, function (eventResponse) {
        if (eventResponse.error && eventResponse.error.authentication) {
          if (localStorage.uname && localStorage.password) {
            exportVaribles.authenticationRequest(localStorage.uname, localStorage.password, function (loginResponse) {
              if (!loginResponse.error){
                if( requestType != "LeaderboardDataRequest")
                  exportVaribles.LogEventRequest(requestObj, true, callback);
                else
                  exportVaribles.LeaderboardEventRequest(requestObj, true, callback);
              }else {
                //TODO: show popup to get userName and password or redirect to login page
                callback(eventResponse);
              }
            });
          } else {
            //TODO: show popup to get userName and password or redirect to login page
            callback(eventResponse);
          }
        } else
          callback(eventResponse);
      });
    }
  }

  var exportVaribles = {
    gamesparks: function () {
      return gamesparks;
    },
    isInitialized: function () {
      return gamesparks.isConnected();
    },
    initializeSDK: function (initCallback, messageCallback) {
      angularMessageListner = messageCallback;

      getConfigData(function () {
        var isLive = gameConfigs.usingLive;

        var sdkInitialize = {
          key: gameConfigs.gameCode,
          secret: isLive ? gameConfigs.live : gameConfigs.preview,
          onNonce: onNonce,
          onInit: onInit(initCallback),
          onMessage: onMessage,
          logger: console.log
        };

        if (isLive)
          gamesparks.initLive(sdkInitialize);
        else
          gamesparks.initPreview(sdkInitialize);
      });
    },
    authenticationRequest: function (userName, password, scriptData, callback) {
      gamesparks.authenticationRequest(password, userName, scriptData, callback);
    },
    registrationRequest: function (userName, password, displayName, scriptData, callback) {
      gamesparks.registrationRequest(displayName, password, userName, scriptData, callback);
    },
    LogEventRequest: function (requestObject, isSelfCall, callback) {
      eventCalls("LogEventRequest", requestObject, callback, isSelfCall);
    },
    LogChallengeEventRequest: function (requestObject, isSelfCall, callback) {
      eventCalls("LogChallengeEventRequest", requestObject, callback, isSelfCall);
    },
    LeaderboardEventRequest: function(requestObject, isSelfCall, callback){
      eventCalls("LeaderboardDataRequest", requestObject, callback, isSelfCall);
    },
    // GameSparksScriptMessages(): function(isSelfCall, callback){
    //     gamesparks.onMessage(callback, isSelfCall)
    // }
  };

  return exportVaribles;
})();