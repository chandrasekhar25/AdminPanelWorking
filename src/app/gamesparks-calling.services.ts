import {
    Injectable
  } from '@angular/core';
  @Injectable({
    providedIn: 'root'
  })
  export class GamesparksCallingService {
    // tslint:disable
    private _gameSparksFunctions: any;
    private _isGameSparksSDKInitialized: boolean;
    private _gameSparksSDKOnInitialized: any;
    scriptMessage = [];
    constructor() {
      // tslint:disable-next-line: no-string-literal
      this._gameSparksFunctions = window['gamesparksFunctions'];
  
      this.initializeGameSparksSDK();
    }
  
    initializeGameSparksSDK() {
      if (this.gameSparksFunctions && !this.gameSparksFunctions.isInitialized()) {
        this.isGameSparksSDKInitialized = false;
        this.gameSparksFunctions.initializeSDK(this.onGameSparksSDKInitialized.bind(this),
          this.onGameSparksMessageRecieved.bind(this));
      } else {
        this.isGameSparksSDKInitialized = true;
      }
    }
  
    onGameSparksSDKInitialized() {
      this.isGameSparksSDKInitialized = true;
  
      if (typeof this.gameSparksSDKOnInitialized === 'function') {
        this.gameSparksSDKOnInitialized();
      }
    }
  
    setSDKInitialisationCallback(callback: any) {
      this.gameSparksSDKOnInitialized = callback;
  
      if (this.isGameSparksSDKInitialized) {
        this.gameSparksSDKOnInitialized();
      }
    }
  
    onGameSparksMessageRecieved(message: any) {
      // TODO: Sample code to list to socket message
      if ( message && message['@class'] === '.ScriptMessage' &&
                  message.extCode  &&
                  message.data) {
                this.scriptMessage.push(message);
                  }
                  return this.scriptMessage;
    }
      onMatchNotFoundMessageListner(message: any) {
          throw new Error('Method not implemented.');
      }
  
    callGameSparksRegistration(displayName,password,username,callback: any) {
      this._gameSparksFunctions.registrationRequest(displayName,
        password,
        username,
        callback);
    }
  
    callGameSparksAuthentication(userName, password,callback: any) {
      this._gameSparksFunctions.authenticationRequest(userName,
        password,
        callback);
    }
  
    callGameSparksLogEvent(requestObj: any, callback: any) {
      this._gameSparksFunctions.LogEventRequest(requestObj, false, callback);
    }
  
    callGameSparksLeaderboardEvent(requestObj: any, callback: any) {
      this._gameSparksFunctions.LeaderboardEventRequest(requestObj, false, callback);
    }
  
    set isGameSparksSDKInitialized(value) {
      this._isGameSparksSDKInitialized = value;
    }
  
    get isGameSparksSDKInitialized() {
      return this._isGameSparksSDKInitialized;
    }
  
    get gameSparksSDKOnInitialized() {
      return this._gameSparksSDKOnInitialized;
    }
  
    set gameSparksSDKOnInitialized(callback: any) {
      this._gameSparksSDKOnInitialized = callback;
    }
  
    get gameSparksFunctions() {
      return this._gameSparksFunctions;
    }
  
    set gameSparksFunctions(value: any) {
      this._gameSparksFunctions = value;
    }
  }
  