"use strict";angular.module("dunTomeApp",["ngAnimate","ngCookies","ngResource","ngRoute","ngSanitize","ngTouch","ngMaterial","ngMessages"]).config(["$mdThemingProvider",function(a){a.theme("default").primaryPalette("light-blue",{"default":"800","hue-1":"300","hue-2":"500","hue-3":"A100"}).accentPalette("grey",{"default":"600"})}]).config(["$routeProvider",function(a){a.when("/",{templateUrl:"views/main.html",controller:"MainCtrl",controllerAs:"main"}).when("/about",{templateUrl:"views/about.html",controller:"AboutCtrl",controllerAs:"about"}).when("/new-character",{templateUrl:"views/new-character.html",controller:"NewCharCtrl",controllerAs:"newChar"}).when("/character-details",{templateUrl:"views/character-details.html",controller:"TestCtrl",controllerAs:"test"}).when("/settings",{templateUrl:"views/settings.html",controller:"AdminCtrl",controllerAs:"settings"}).otherwise({redirectTo:"/"})}]).run(["$rootScope","$location",function(a,b){console.log("running!");localStorage;Storage.prototype.setObject=function(a,b){this.setItem(a,JSON.stringify(b))},Storage.prototype.getObject=function(a){var b=this.getItem(a);return b},a.$on("$locationChangeSuccess",function(b,c,d){console.log("location changed to: "+c),a.scrollTo("top")});var c=new Dexie("test-database");c.version(1).stores({charClasses:"name",characters:"id++,name,race,subrace,class,level,gender",race:"id++,name,subraces",gender:"name"}),c.open(),a.populate=function(){c.on("populate",function(){c.charClasses.add({name:"Barbarian"}),c.charClasses.add({name:"Bard"}),c.charClasses.add({name:"Cleric"}),c.charClasses.add({name:"Druid"}),c.charClasses.add({name:"Fighter"}),c.charClasses.add({name:"Monk"}),c.charClasses.add({name:"Paladin"}),c.charClasses.add({name:"Ranger"}),c.charClasses.add({name:"Rogue"}),c.charClasses.add({name:"Sorcerer"}),c.charClasses.add({name:"Warlock"}),c.charClasses.add({name:"Wizard"}),c.race.add({name:"Dwarf",subraces:"Hill Dwarf,Mountain Dwarf"}),c.race.add({name:"Elf",subraces:"High Elf,Wood Elf,Dark Elf"}),c.race.add({name:"Halfling",subraces:"Lightfoot,Stout"}),c.race.add({name:"Human",subraces:"Calishite,Chondathan,Damaran,Mulan,Rashemi,Shou,Tethyrian,Turami"}),c.race.add({name:"Dragonborn",subraces:"Black,Blue,Brass,Bronze,Copper,Gold,Green,Red,Silver,White"}),c.race.add({name:"Gnome",subraces:"Forest Gnome,Rock Gnome"}),c.race.add({name:"Half-Elf",subraces:"None"}),c.race.add({name:"Half-Orc",subraces:"None"}),c.race.add({name:"Tiefling",subraces:"None"}),c.gender.add({name:"Male"}),c.gender.add({name:"Female"}),c.gender.add({name:"None"})})},a.populate(),a.deleteDB=function(){console.log("Deleting the DB"),c["delete"](),c.close(),c.open()},a.selectCharacter=function(b){c.open(),c.characters.where("id").equals(b).each(function(b){console.log("selected character: "+b.name),a.selectedCharacter=b,a.$digest()})["catch"](function(a){console.error(a)}),c.close(),a.go("/character-details")},c.close()}]).controller("AppCtrl",["$scope","$rootScope","$location","$timeout","$mdSidenav","$mdUtil","$log","$mdDialog","$anchorScroll",function(a,b,c,d,e,f,g,h,i){function j(a){var b=f.debounce(function(){e(a).toggle().then(function(){g.debug("toggle "+a+" is done")})},200);return b}b.selectedID="",a.toggleLeft=j("left"),a.toggleRight=j("right"),a.toggleLeft=function(){e("left").toggle().then(function(){g.debug("toggle left is done")})},b.go=function(a){c.path(a)},b.scrollTo=function(a){i(a)};var k;this.openMenu=function(a,b){k=b,a(b)},this.announceClick=function(a){h.show(h.alert().title("You clicked!").content("You clicked the menu item at index "+a).ok("Nice").targetEvent(k)),k=null},a.menu=[{text:"Characters",icon:"people",href:"/"},{text:"Settings",icon:"settings",href:"/settings"}]}]).controller("LeftCtrl",["$scope","$timeout","$mdSidenav","$log",function(a,b,c,d){a.close=function(){c("left").close().then(function(){d.debug("close LEFT is done")})}}]),angular.module("dunTomeApp").controller("MainCtrl",["$scope","$rootScope",function(a,b){this.awesomeThings=["HTML5 Boilerplate","AngularJS","Karma"],b.characterList||(b.characterList=[]);var c=new Dexie("test-database");c.version(1).stores({characters:"name,class"}),c.open(),a.showCharacters=!1,a.getCharacters=function(){console.log("charList:"),console.log(b.characterList.length),void 0==b.characterList||0==b.characterList.length?(console.log("EMPTY!!!"),a.gettingCharacters=!0,b.characterList=[],c.characters.each(function(a){console.log("runnisng!"),console.log("class: "+JSON.stringify(a["class"])),b.characterList.push({id:a.id,name:a.name,race:a.race,"class":a["class"]}),console.log(b.characterList)}).then(function(){a.showCharacters=!0,a.gettingCharacters=!1,b.$digest()})):(a.showCharacters=!0,a.gettingCharacters=!1)},a.getCharacters()}]),angular.module("dunTomeApp").controller("AboutCtrl",function(){this.awesomeThings=["HTML5 Boilerplate","AngularJS","Karma"]}),angular.module("dunTomeApp").controller("NewCharCtrl",["$scope","$rootScope","$mdDialog",function(a,b,c){function d(a,b,c){a.hide=function(){c.hide(),b["char"]["class"]=""},a.cancel=function(a){c.cancel(),b["char"][a]=""},a.answer=function(a){c.hide(a)},a.addCustomClass=function(a,d){f.charClasses.add({name:a,description:d}),b.getClasses(),b["char"]["class"]=a,c.hide()},a.addCustomRace=function(a,d,g){f.race.add({name:a,description:d,subraces:g}),e.push({name:a,description:d,subraces:g}),b.getRaces(),b["char"].race=a,b.updateSubrace(a),c.hide()},a.addCustomSubrace=function(a,d){console.log("new subrace:"+a+" for: "+d),f.race.where("name").equalsIgnoreCase(d).each(function(g){g.subraces+=","+a,console.log("subraces: "+g.subraces),f.race.update(g.id,{subraces:g.subraces}).then(function(){for(var f in e)console.log("the "+f),f.name==d&&(console.log("update "+f),f.subraces=g.subraces);b.updateSubrace(d),b["char"].subrace=a,c.hide()})})},a.addCustomGenger=function(a){f.gender.add({name:a}),b.getGenders(),b["char"].gender=a,c.hide()}}a.classArray=[];var e=[];a.characterArray=[],b.raceArray=[],b.genderArray=[];var f=new Dexie("test-database");f.version(1).stores({charClasses:"name,description",characters:"name,race,subrace,class,level,gender",race:"id++,name,subraces",gender:"name"}),f.open(),b.getRaces=function(){b.raceArray=[],f.race.each(function(a){b.raceArray.push({name:a.name,subraces:a.subraces})}).then(function(a){e=b.raceArray})},b.getClasses=function(){a.classArray=[],f.charClasses.each(function(b){a.classArray.push(b.name)})},b.getGenders=function(){b.genderArray=[],f.gender.each(function(a){b.genderArray.push({name:a.name})})},b.getRaces(),b.getClasses(),b.getGenders(),a.addCharacter=function(a,c,d,e,g,h){f.characters.add({name:a,race:c,subrace:d,"class":e,level:g,gender:h}),b.characterList=[]},b.updateSubrace=function(a){for(var c in e)c.name==a&&c.subraces&&(b.subraceArray=c.subraces.split(","))},b["char"]={name:"","class":"",race:"",subrace:"",level:1,gender:""},a.showDialog=function(a,b){var e="";switch(b){case"race":e="../templates/dialog/custom-race.tmpl.html";break;case"subrace":e="../templates/dialog/custom-subrace.tmpl.html";break;case"class":e="../templates/dialog/custom-class.tmpl.html";break;case"gender":e="../templates/dialog/custom-gender.tmpl.html"}c.show({controller:d,templateUrl:e,parent:angular.element(document.body),targetEvent:a,clickOutsideToClose:!1})},d.$inject=["$scope","$rootScope","$mdDialog"],f.close()}]),angular.module("dunTomeApp").controller("TestCtrl",["$scope","$rootScope",function(a,b){this.awesomeThings=["HTML5 Boilerplate","AngularJS","Karma"];var c=JSON.parse(localStorage.getObject("character"));"undefined"==c?(console.log("adding character to localstorage"),localStorage.setObject("character",b.selectedCharacter)):void 0==b.selectedCharacter&&(console.log("character is undefined"),console.log(c),b.selectedCharacter=c)}]),angular.module("dunTomeApp").controller("AdminCtrl",["$scope","$rootScope",function(a,b){this.awesomeThings=["HTML5 Boilerplate","AngularJS","Karma"],console.log("test");var c=new Dexie("test-database");c.version(1).stores({charClasses:"name,description",characters:"name,class"})}]),angular.module("dunTomeApp").run(["$templateCache",function(a){a.put("views/about.html","<p>This is the about view.</p>"),a.put("views/character-details.html",'<div class="page-title"> <div class="container md-padding"> <h2>Character Details</h2> </div> </div> <div class="content-wrapper"> <div class="container md-padding"> <p>Name: {{selectedCharacter.name}}</p> <p>{{selectedCharacter.race}}</p> <p>{{selectedCharacter.subrace}}</p> <p>{{selectedCharacter.class}}</p> <p>{{selectedCharacter.level}}</p> <p>{{selectedCharacter.gender}}</p> </div> </div>'),a.put("views/main.html",'<!-- Title --> <div id="top" class="page-title"> <div class="container md-padding"> <h2>Characters</h2> </div> </div> <div class="content-wrapper"> <div class="container"> <!--  <p>Select a character to view/edit information.</p>--> <!-- Loading Circle--> <div layout="row" layout-sm="column" layout-align="space-around" ng-hide="!gettingCharacters"> <md-progress-circular md-mode="indeterminate"></md-progress-circular> </div> <!--  Character List --> <md-list id="characterList" ng-if="showCharacters" class="animate-test"> <p class="md-padding">Select a character for more details, tap and hold for options.</p> <md-list-item class="md-3-line" ng-repeat="character in characterList" ng-click="selectCharacter(character.id)"> <div class="md-list-item-text"> <h3>{{character.id}} {{character.name}}</h3> <h4>{{character.race}} {{character.class}}</h4> </div> <md-divider ng-if="!$last"></md-divider> </md-list-item> <!--      <md-button id="toTop" ng-controller="AppCtrl" class="md-raised md-primary" ng-click="scrollTo(\'top\')">To Top</md-button>--> <md-button id="newChar" ng-controller="AppCtrl" class="md-raised md-primary" ng-click="go(\'/new-character\', \'modal\')">New Character</md-button> </md-list> </div> </div>'),a.put("views/new-character.html",'<div id="top" class="page-title"> <div class="container md-padding"> <h2>New Character</h2> </div> </div> <div class="content-wrapper"> <div class="container md-padding"> <p>Let\'s get started by filling out some basic information about your character. You can edit this information later.</p> <form name="newCharacter"> <md-input-container> <label class="md-accent">Character Name</label> <input class="md-accent" name="name" ng-model="char.name" type="text" required> <div ng-messages="newCharacter.name.$error" ng-if="newCharacter.name.$dirty"> <div ng-message="required">This is required.</div> </div> </md-input-container> <md-input-container> <label>Race</label> <md-select name="race" ng-model="char.race" ng-model="size" ng-change="updateSubrace(char.race)" required> <md-option ng-repeat="race in raceArray" value="{{race.name}}">{{race.name}}</md-option> <md-option ng-click="showDialog($event, \'race\')" value="custom">Add Custom Race...</md-option> </md-select> <div ng-messages="newCharacter.race.$error" ng-if="newCharacter.race.$dirty"> <div ng-message="required">This is required.</div> </div> </md-input-container> <md-input-container ng-hide="!char.race || char.race == \'Tiefling\' || char.race == \'Half-Orc\' || char.race == \'Half-Elf\'"> <label>Subrace</label> <md-select ng-model="char.subrace" ng-model="size"> <md-option ng-repeat="subrace in subraceArray" value="{{subrace}}">{{subrace}}</md-option> <md-option ng-click="showDialog($event, \'subrace\')" value="custom">Add Custom Subrace...</md-option> </md-select> </md-input-container> <md-input-container> <label>Class</label> <md-select name="class" ng-model="char.class" ng-model="size" required> <md-option ng-repeat="class in classArray" value="{{class}}">{{class}}</md-option> <md-option ng-click="showDialog($event, \'class\')" value="custom">Add Custom Class...</md-option> </md-select> <div ng-messages="newCharacter.class.$error" ng-if="newCharacter.class.$dirty"> <div ng-message="required">This is required.</div> </div> </md-input-container> <md-input-container> <label>Level</label> <input name="level" class="md-accent" ng-model="char.level" type="number" min="0" max="20" placeholder="1" required> <div ng-messages="newCharacter.level.$error" ng-if="newCharacter.level.$dirty"> <div ng-message="required">This is required.</div> </div> </md-input-container> <md-input-container> <label>Gender</label> <md-select name="gender" ng-model="char.gender" ng-model="size" required> <md-option ng-repeat="gender in genderArray" value="{{gender.name}}">{{gender.name}}</md-option> <md-option ng-click="showDialog($event, \'gender\')" value="custom">Add Custom Gender...</md-option> </md-select> <div ng-messages="newCharacter.gender.$error" ng-if="newCharacter.gender.$dirty"> <div ng-message="required">This is required.</div> </div> </md-input-container> </form> <md-button ng-disabled="newCharacter.$invalid" ng-controller="AppCtrl" class="md-primary md-raised" ng-click="addCharacter(char.name, char.race, char.subrace, char.class, char.level, char.gender); go(\'/\')">Create Character</md-button> <md-button ng-controller="AppCtrl" class="md-primary" ng-click="go(\'/\');">Cancel</md-button> </div> </div>'),a.put("views/settings.html",'<div class="page-title"> <div class="container md-padding"> <h2>Settings</h2> </div> </div> <div class="container"> <md-button ng-click="deleteDB()">Clear Saved Data</md-button> </div>'),a.put("views/test.html",'<h3>testing</h3> <script>//\r\n    // Define your database\r\n    //\r\n    var db = new Dexie("friends-database");\r\n    db.version(1).stores({\r\n        friends: \'name,shoeSize\',\r\n        // ...add more stores (tables) here...\r\n    });\r\n\r\n    //\r\n    // Open it\r\n    //\r\n    db.open();\r\n\r\n    //\r\n    // Put some data into it\r\n    //\r\n    db.friends.put({name: "Nicolas", shoeSize: 8}).then (function(){\r\n        //\r\n        // Then when data is stored, read from it\r\n        //\r\n        return db.friends.get(\'Nicolas\');\r\n    }).then(function (friend) {\r\n        //\r\n        // Display the result\r\n        //\r\n        alert ("Nicolas has shoe size " + friend.shoeSize);\r\n    }).catch(function(error) {\r\n       //\r\n       // Finally don\'t forget to catch any error\r\n       // that could have happened anywhere in the\r\n       // code blocks above.\r\n       //\r\n       alert ("Ooops: " + error);\r\n    });</script>')}]);