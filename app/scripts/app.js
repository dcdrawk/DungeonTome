'use strict';

/**
 * @ngdoc overview
 * @name dCraft
 * @description
 * # dCraftApp
 *
 * Main module of the application.
 */
/* jshint ignore:start */
angular
  .module('dCraftApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'ngMaterial',
    'ngMessages',
    'angularScreenfull',
    'ngRouteAnimationManager'
  ])  
  
  .run(function($rootScope, $location, transitionSrv){
    console.log('running!');
    
    //set up the local storage for the selected Character
    var myStorage = localStorage;
    
    //local storage stringify solution for objects in localstorage
//    Storage.prototype.setObject = function(key, value) {
//      this.setItem(key, JSON.stringify(value));
//    }
//
//    Storage.prototype.getObject = function(key) {
//      var value = this.getItem(key);
//      return value;
//    }
    
    Storage.prototype.setObj = function(key, obj) {
    return this.setItem(key, JSON.stringify(obj))
    }
    Storage.prototype.getObj = function(key) {
        return JSON.parse(this.getItem(key))
    }
    
//    $rootScope.$on('$stateChangeSuccess', function() {
//      console.log('test!');
//       document.body.scrollTop = document.documentElement.scrollTop = 0;
//    });
    
    var mainContent = document.getElementById('main-content');
    //var enter = document.getElementsByClassName('ng-enter');
    
    $rootScope.$on('$locationChangeSuccess', function(event, current, next) {
      var enter = document.getElementsByClassName('ng-enter');
       console.log(enter);
      
      mainContent.scrollTop = 0;
      if($location.path() == '/'){
        $rootScope.home = true;
      } else {
        $rootScope.home = false;
      }
    });

    
  });
  /* jshint ignore:end */
