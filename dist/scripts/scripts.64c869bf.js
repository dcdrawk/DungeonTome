"use strict";angular.module("dCraftApp",["ngAnimate","ngCookies","ngResource","ngRoute","ngSanitize","ngTouch","ngMaterial","ngMessages"]).config(["$mdThemingProvider",function(a){a.theme("default").primaryPalette("light-blue",{"default":"800","hue-1":"300","hue-2":"500","hue-3":"A100"}).accentPalette("grey",{"default":"600"})}]).config(["$routeProvider",function(a){a.when("/",{templateUrl:"views/main.html",controller:"MainCtrl",controllerAs:"main"}).when("/about",{templateUrl:"views/about.html",controller:"AboutCtrl",controllerAs:"about"}).when("/new-character",{templateUrl:"views/new-character.html",controller:"NewCharCtrl",controllerAs:"newChar"}).when("/character",{templateUrl:"views/character/home.html",controller:"CharacterCtrl",controllerAs:"character"}).when("/character/profile",{templateUrl:"views/character/profile/index.html",controller:"CharacterCtrl",controllerAs:"character"}).when("/character/profile/basic-info",{templateUrl:"views/character/profile/basic.html",controller:"CharacterCtrl",controllerAs:"character"}).when("/character/profile/appearance",{templateUrl:"views/character/profile/appearance.html",controller:"CharacterCtrl",controllerAs:"character"}).when("/character/profile/history",{templateUrl:"views/character/profile/history.html",controller:"CharacterCtrl",controllerAs:"character"}).when("/character/profile/proficiency",{templateUrl:"views/character/profile/proficiency.html",controller:"CharacterCtrl",controllerAs:"character"}).when("/character/profile/traits",{templateUrl:"views/character/profile/traits.html",controller:"CharacterCtrl",controllerAs:"character"}).when("/character/profile/feats",{templateUrl:"views/character/profile/feats.html",controller:"CharacterCtrl",controllerAs:"character"}).when("/character/stats",{templateUrl:"views/character/stats/index.html",controller:"CharacterCtrl",controllerAs:"character"}).when("/character/stats/base",{templateUrl:"views/character/stats/base.html",controller:"CharacterCtrl",controllerAs:"character"}).when("/character/stats/saving-throws",{templateUrl:"views/character/stats/saving-throws.html",controller:"CharacterCtrl",controllerAs:"character"}).when("/character/stats/skills",{templateUrl:"views/character/stats/skills.html",controller:"CharacterCtrl",controllerAs:"character"}).when("/character/stats/combat",{templateUrl:"views/character/stats/combat.html",controller:"CharacterCtrl",controllerAs:"character"}).when("/character/spells",{templateUrl:"views/character/spells/index.html",controller:"CharacterCtrl",controllerAs:"character"}).when("/character/spells/my-spells",{templateUrl:"views/character/spells/my-spells.html",controller:"CharacterCtrl",controllerAs:"character"}).when("/character/spells/class-spells",{templateUrl:"views/character/spells/class-spells.html",controller:"CharacterCtrl",controllerAs:"character"}).when("/character/spells/all-spells",{templateUrl:"views/character/spells/all-spells.html",controller:"CharacterCtrl",controllerAs:"character"}).when("/character/equipment",{templateUrl:"views/character/equipment/index.html",controller:"CharacterCtrl",controllerAs:"character"}).when("/character/equipment/weapons",{templateUrl:"views/character/equipment/weapons.html",controller:"CharacterCtrl",controllerAs:"character"}).when("/character/equipment/armor",{templateUrl:"views/character/equipment/armor.html",controller:"CharacterCtrl",controllerAs:"character"}).when("/character/equipment/inventory",{templateUrl:"views/character/equipment/inventory.html",controller:"CharacterCtrl",controllerAs:"character"}).when("/character/equipment/currency",{templateUrl:"views/character/equipment/currency.html",controller:"CharacterCtrl",controllerAs:"character"}).when("/settings",{templateUrl:"views/settings.html",controller:"AdminCtrl",controllerAs:"settings"}).otherwise({redirectTo:"/"})}]).run(["$rootScope","$location",function(a,b){console.log("running!");localStorage;Storage.prototype.setObject=function(a,b){this.setItem(a,JSON.stringify(b))},Storage.prototype.getObject=function(a){var b=this.getItem(a);return b},a.$on("$locationChangeStart",function(a,c,d,e){console.log("Location change start!"),console.log("path: "+b.path())}),a.$on("$locationChangeSuccess",function(b,c,d,e){console.log("Location change success!"),console.log("old URL: "+d),console.log("new URL: "+c),a.scrollTo("top"),a.lastPage=d});var c=new Dexie("test-database");c.version(1).stores({charClasses:"name",characters:"id++,name,race,subrace,class,level,gender",race:"id++,name,subraces",gender:"name"}),c.open(),a.populate=function(){c.on("populate",function(){c.charClasses.add({name:"Barbarian"}),c.charClasses.add({name:"Bard"}),c.charClasses.add({name:"Cleric"}),c.charClasses.add({name:"Druid"}),c.charClasses.add({name:"Fighter"}),c.charClasses.add({name:"Monk"}),c.charClasses.add({name:"Paladin"}),c.charClasses.add({name:"Ranger"}),c.charClasses.add({name:"Rogue"}),c.charClasses.add({name:"Sorcerer"}),c.charClasses.add({name:"Warlock"}),c.charClasses.add({name:"Wizard"}),c.race.add({name:"Dwarf",subraces:"Hill Dwarf,Mountain Dwarf"}),c.race.add({name:"Elf",subraces:"High Elf,Wood Elf,Dark Elf"}),c.race.add({name:"Halfling",subraces:"Lightfoot,Stout"}),c.race.add({name:"Human",subraces:"Calishite,Chondathan,Damaran,Mulan,Rashemi,Shou,Tethyrian,Turami"}),c.race.add({name:"Dragonborn",subraces:"Black,Blue,Brass,Bronze,Copper,Gold,Green,Red,Silver,White"}),c.race.add({name:"Gnome",subraces:"Forest Gnome,Rock Gnome"}),c.race.add({name:"Half-Elf",subraces:"None"}),c.race.add({name:"Half-Orc",subraces:"None"}),c.race.add({name:"Tiefling",subraces:"None"}),c.gender.add({name:"Male"}),c.gender.add({name:"Female"}),c.gender.add({name:"None"})})},a.populate(),a.deleteDB=function(){console.log("Deleting the DB"),c["delete"](),c.close(),c.open()},a.selectCharacter=function(b){c.open(),c.characters.where("id").equals(b).each(function(b){console.log("selected character: "+b.name),a.selectedCharacter=b,a.$digest()}).then(function(){localStorage.setObject("character",a.selectedCharacter),console.log(localStorage.getObject("character"))})["catch"](function(a){console.error(a)}),c.close(),a.go("/character")},c.close()}]).controller("AppCtrl",["$scope","$rootScope","$location","$timeout","$mdSidenav","$mdUtil","$log","$mdDialog","$anchorScroll",function(a,b,c,d,e,f,g,h,i){function j(a){var b=f.debounce(function(){e(a).toggle().then(function(){g.debug("toggle "+a+" is done")})},200);return b}b.selectedID="",a.toggleLeft=j("left"),a.toggleRight=j("right"),a.toggleLeft=function(){e("left").toggle().then(function(){g.debug("toggle left is done")})},b.go=function(a){c.path(a)},b.goBack=function(){window.history.back()},b.scrollTo=function(a){i(a)};var k;this.openMenu=function(a,b){k=b,a(b)},this.announceClick=function(a){h.show(h.alert().title("You clicked!").content("You clicked the menu item at index "+a).ok("Nice").targetEvent(k)),k=null},a.menu=[{text:"Characters",icon:"people",href:"/"},{text:"Settings",icon:"settings",href:"/settings"}]}]).controller("LeftCtrl",["$scope","$timeout","$mdSidenav","$log",function(a,b,c,d){a.close=function(){c("left").close().then(function(){d.debug("close LEFT is done")})}}]),angular.module("dCraftApp").controller("MainCtrl",["$scope","$rootScope",function(a,b){this.awesomeThings=["HTML5 Boilerplate","AngularJS","Karma"],b.characterList||(b.characterList=[]);var c=new Dexie("test-database");c.version(1).stores({characters:"name,class"}),c.open(),a.showCharacters=!1,a.getCharacters=function(){console.log("charList:"),console.log(b.characterList.length),void 0==b.characterList||0==b.characterList.length?(console.log("EMPTY!!!"),a.gettingCharacters=!0,b.characterList=[],c.characters.each(function(a){console.log("runnisng!"),console.log("class: "+JSON.stringify(a["class"])),b.characterList.push({id:a.id,name:a.name,race:a.race,"class":a["class"]}),console.log(b.characterList)}).then(function(){a.showCharacters=!0,a.gettingCharacters=!1,b.$digest()})):(a.showCharacters=!0,a.gettingCharacters=!1)},a.getCharacters()}]),angular.module("dCraftApp").controller("AboutCtrl",function(){this.awesomeThings=["HTML5 Boilerplate","AngularJS","Karma"]}),angular.module("dCraftApp").controller("NewCharCtrl",["$scope","$rootScope","$mdDialog",function(a,b,c){function d(a,b,c){a.hide=function(){c.hide(),b["char"]["class"]=""},a.cancel=function(a){c.cancel(),b["char"][a]=""},a.answer=function(a){c.hide(a)},a.addCustomClass=function(a,d){f.charClasses.add({name:a,description:d}),b.getClasses(),b["char"]["class"]=a,c.hide()},a.addCustomRace=function(a,d,g){f.race.add({name:a,description:d,subraces:g}),e.push({name:a,description:d,subraces:g}),b.getRaces(),b["char"].race=a,b.updateSubrace(a),c.hide()},a.addCustomSubrace=function(a,d){console.log("new subrace:"+a+" for: "+d),f.race.where("name").equalsIgnoreCase(d).each(function(g){g.subraces+=","+a,console.log("subraces: "+g.subraces),f.race.update(g.id,{subraces:g.subraces}).then(function(){for(var f in e)console.log("the "+f),f.name==d&&(console.log("update "+f),f.subraces=g.subraces);b.updateSubrace(d),b["char"].subrace=a,c.hide()})})},a.addCustomGenger=function(a){f.gender.add({name:a}),b.getGenders(),b["char"].gender=a,c.hide()}}a.classArray=[];var e=[];a.characterArray=[],b.raceArray=[],b.genderArray=[];var f=new Dexie("test-database");f.version(1).stores({charClasses:"name,description",characters:"name,race,subrace,class,level,gender",race:"id++,name,subraces",gender:"name"}),f.open(),b.getRaces=function(){b.raceArray=[],f.race.each(function(a){b.raceArray.push({name:a.name,subraces:a.subraces})}).then(function(a){e=b.raceArray})},b.getClasses=function(){a.classArray=[],f.charClasses.each(function(b){a.classArray.push(b.name)})},b.getGenders=function(){b.genderArray=[],f.gender.each(function(a){b.genderArray.push({name:a.name})})},b.getRaces(),b.getClasses(),b.getGenders(),a.addCharacter=function(a,c,d,e,g,h){f.characters.add({name:a,race:c,subrace:d,"class":e,level:g,gender:h}),b.characterList=[]},b.updateSubrace=function(a){for(var c in e)c.name==a&&c.subraces&&(b.subraceArray=c.subraces.split(","))},b["char"]={name:"","class":"",race:"",subrace:"",level:1,gender:""},a.showDialog=function(a,b){var e="";switch(b){case"race":e="/views/templates/dialog/custom-race.html";break;case"subrace":e="/views/templates/dialog/custom-subrace.html";break;case"class":e="/views/templates/dialog/custom-class.html";break;case"gender":e="/views/templates/dialog/custom-gender.html"}c.show({controller:d,templateUrl:e,parent:angular.element(document.body),targetEvent:a,clickOutsideToClose:!1})},d.$inject=["$scope","$rootScope","$mdDialog"],f.close()}]),angular.module("dCraftApp").controller("CharacterCtrl",["$scope","$rootScope",function(a,b){var c=new Dexie("test-database");c.version(1).stores({charClasses:"name,description",characters:"name,race,subrace,class,level,gender",race:"id++,name,subraces",gender:"name"}),b.getRaces=function(){c.open(),b.raceArray=[],c.race.each(function(a){b.raceArray.push({name:a.name,subraces:a.subraces})}).then(function(a){b.$digest()}),c.close()};var d=JSON.parse(localStorage.getObject("character"));"undefined"==d?(console.log("adding character to localstorage"),localStorage.setObject("character",b.selectedCharacter)):void 0==b.selectedCharacter&&(console.log("character is undefined"),console.log(d),b.selectedCharacter=d),a["char"]=b.selectedCharacter,b.getRaces()}]),angular.module("dCraftApp").controller("AdminCtrl",["$scope","$rootScope",function(a,b){this.awesomeThings=["HTML5 Boilerplate","AngularJS","Karma"],console.log("test");var c=new Dexie("test-database");c.version(1).stores({charClasses:"name,description",characters:"name,class"})}]),angular.module("dCraftApp").run(["$templateCache",function(a){a.put("views/about.html","<p>This is the about view.</p>"),a.put("views/character-details.html",'<div class="page-title"> <div class="container md-padding"> <h2>{{selectedCharacter.name}}</h2> </div> </div> <div class="content-wrapper"> <div class="container md-padding"> <p>Name: {{selectedCharacter.name}}</p> <p>{{selectedCharacter.race}}</p> <p>{{selectedCharacter.subrace}}</p> <p>{{selectedCharacter.class}}</p> <p>{{selectedCharacter.level}}</p> <p>{{selectedCharacter.gender}}</p> </div> </div>'),a.put("views/character/equipment/armor.html",'<!-- Title --> <div id="top" class="page-title"> <div class="container md-padding"> <h2>{{selectedCharacter.name}} - Armor</h2> <h3>Level {{selectedCharacter.level}} {{selectedCharacter.race}} {{selectedCharacter.class}}</h3> </div> </div> <!-- Content --> <div class="content-wrapper"> <div class="container md-padding"> </div> </div>'),a.put("views/character/equipment/currency.html",'<!-- Title --> <div id="top" class="page-title"> <div class="container md-padding"> <h2>{{selectedCharacter.name}} - Currency</h2> <h3>Level {{selectedCharacter.level}} {{selectedCharacter.race}} {{selectedCharacter.class}}</h3> </div> </div> <!-- Content --> <div class="content-wrapper"> <div class="container md-padding"> </div> </div>'),a.put("views/character/equipment/index.html",'<!-- Title --> <div id="top" class="page-title"> <div class="container md-padding"> <h2>{{selectedCharacter.name}} - Equipment</h2> <h3>Level {{selectedCharacter.level}} {{selectedCharacter.race}} {{selectedCharacter.class}}</h3> </div> </div> <!-- Menu Options --> <!-- Content --> <div class="content-wrapper"> <div class="container"> <!--  Character Home Nav --> <md-list> <md-list-item class="md-3-line" ng-click="go(\'/character/equipment/weapons\')"> <div class="md-list-item-text"> <h3>Weapons</h3> <h4>List of weapons in your inventory</h4> </div> <md-divider ng-if="!$last"></md-divider> </md-list-item> <md-list-item class="md-3-line" ng-click="go(\'/character/equipment/armor\')"> <div class="md-list-item-text"> <h3>Armor</h3> <h4>List of armor in your inventory</h4> </div> <md-divider ng-if="!$last"></md-divider> </md-list-item> <md-list-item class="md-3-line" ng-click="go(\'/character/equipment/inventory\')"> <div class="md-list-item-text"> <h3>Inventory</h3> <h4>List of your character\'s items</h4> </div> <md-divider ng-if="!$last"></md-divider> </md-list-item> <md-list-item class="md-3-line" ng-click="go(\'/character/equipment/currency\')"> <div class="md-list-item-text"> <h3>Currency</h3> <h4>Your character\'s wealth</h4> </div> <md-divider ng-if="!$last"></md-divider> </md-list-item> </md-list> </div> </div>'),a.put("views/character/equipment/inventory.html",'<!-- Title --> <div id="top" class="page-title"> <div class="container md-padding"> <h2>{{selectedCharacter.name}} - Inventory</h2> <h3>Level {{selectedCharacter.level}} {{selectedCharacter.race}} {{selectedCharacter.class}}</h3> </div> </div> <!-- Content --> <div class="content-wrapper"> <div class="container md-padding"> </div> </div>'),a.put("views/character/equipment/weapons.html",'<!-- Title --> <div id="top" class="page-title"> <div class="container md-padding"> <h2>{{selectedCharacter.name}} - Weapons</h2> <h3>Level {{selectedCharacter.level}} {{selectedCharacter.race}} {{selectedCharacter.class}}</h3> </div> </div> <!-- Content --> <div class="content-wrapper"> <div class="container md-padding"> </div> </div>'),a.put("views/character/home.html",'<!-- Title --> <div id="top" class="page-title"> <div class="container md-padding"> <h2>{{selectedCharacter.name}}</h2> <h3>Level {{selectedCharacter.level}} {{selectedCharacter.race}} {{selectedCharacter.class}}</h3> </div> </div> <!-- Menu Options --> <!-- Content --> <div class="content-wrapper"> <div class="container"> <!--  Character Home Nav --> <md-list id="homeNav" class="animate-test"> <md-list-item class="md-3-line" ng-click="go(\'/character/profile\')"> <div class="md-list-item-text"> <h3>Character Profile</h3> <h4>Profile, Appearance, History, Proficiency, Traits, Feats</h4> </div> <md-divider ng-if="!$last"></md-divider> </md-list-item> <md-list-item class="md-3-line" ng-click="go(\'/character/stats\')"> <div class="md-list-item-text"> <h3>Stats</h3> <h4>Base Stats, Saving Throws, Skills</h4> </div> <md-divider ng-if="!$last"></md-divider> </md-list-item> <md-list-item class="md-3-line" ng-click="go(\'/character/spells\')"> <div class="md-list-item-text"> <h3>Spells & Abilities</h3> <h4>My Spells, Class Spells, All Spells</h4> </div> <md-divider ng-if="!$last"></md-divider> </md-list-item> <md-list-item class="md-3-line" ng-click="go(\'/character/equipment\')"> <div class="md-list-item-text"> <h3>Equipment</h3> <h4>Weapons, Armor, Inventory, Currency</h4> </div> <md-divider ng-if="!$last"></md-divider> </md-list-item> </md-list> </div> </div>'),a.put("views/character/profile/appearance.html",'<!-- Title --> <div id="top" class="page-title"> <div class="container md-padding"> <h2>{{selectedCharacter.name}} - Appearance</h2> <h3>Level {{selectedCharacter.level}} {{selectedCharacter.race}} {{selectedCharacter.class}}</h3> </div> </div> <!-- Content --> <div class="content-wrapper"> <div class="container md-padding"> </div> </div>'),a.put("views/character/profile/basic.html",'<!-- Title --> <div id="top" class="page-title"> <div class="container md-padding"> <h2>{{selectedCharacter.name}} - Basic Info</h2> <h3>Level {{selectedCharacter.level}} {{selectedCharacter.race}} {{selectedCharacter.class}}</h3> </div> </div> <!-- Content --> <div class="content-wrapper"> <div class="container md-padding"> <!-- Character Name --> <md-input-container> <label>Name</label> <input type="text" ng-model="char.name"> </md-input-container> <!-- Character Race --> <md-input-container> <label>Race</label> <md-select name="race" ng-model="char.race" ng-model="size" ng-change="updateSubrace(char.race)" required> <md-option ng-repeat="race in raceArray" value="{{race.name}}">{{race.name}}</md-option> <md-option ng-click="showDialog($event, \'race\')" value="custom">Add Custom Race...</md-option> </md-select> </md-input-container> </div> </div>'),a.put("views/character/profile/feats.html",'<!-- Title --> <div id="top" class="page-title"> <div class="container md-padding"> <h2>{{selectedCharacter.name}} - Feats</h2> <h3>Level {{selectedCharacter.level}} {{selectedCharacter.race}} {{selectedCharacter.class}}</h3> </div> </div> <!-- Content --> <div class="content-wrapper"> <div class="container md-padding"> </div> </div>'),a.put("views/character/profile/history.html",'<!-- Title --> <div id="top" class="page-title"> <div class="container md-padding"> <h2>{{selectedCharacter.name}} - History</h2> <h3>Level {{selectedCharacter.level}} {{selectedCharacter.race}} {{selectedCharacter.class}}</h3> </div> </div> <!-- Content --> <div class="content-wrapper"> <div class="container md-padding"> </div> </div>'),a.put("views/character/profile/index.html",'<!-- Title --> <div id="top" class="page-title"> <div class="container md-padding"> <h2>{{selectedCharacter.name}} - Profile</h2> <h3>Level {{selectedCharacter.level}} {{selectedCharacter.race}} {{selectedCharacter.class}}</h3> </div> </div> <!-- Menu Options --> <!-- Content --> <div class="content-wrapper"> <div class="container"> <!--  Character Home Nav --> <md-list id="homeNav" class="animate-test"> <md-list-item class="md-3-line" ng-click="go(\'/character/profile/basic-info\')"> <div class="md-list-item-text"> <h3>Basic Info</h3> <h4>Name, Level, Race, Class, Alignment, Gender</h4> </div> <md-divider ng-if="!$last"></md-divider> </md-list-item> <md-list-item class="md-3-line" ng-click="go(\'/character/profile/appearance\')"> <div class="md-list-item-text"> <h3>Appearance</h3> <h4>Description, Height, Weight</h4> </div> <md-divider ng-if="!$last"></md-divider> </md-list-item> <md-list-item class="md-3-line" ng-click="go(\'/character/profile/history\')"> <div class="md-list-item-text"> <h3>History</h3> <h4>Backgrond, Ideals, Bonds, Flaws, Past</h4> </div> <md-divider ng-if="!$last"></md-divider> </md-list-item> <md-list-item class="md-3-line" ng-click="go(\'/character/profile/proficiency\')"> <div class="md-list-item-text"> <h3>Proficiency</h3> <h4>Proficiency Bonus, Weapons, Armor, Tools, Equipment, Saving Throws, Skills</h4> </div> <md-divider ng-if="!$last"></md-divider> </md-list-item> <md-list-item class="md-3-line" ng-click="go(\'/character/profile/traits\')"> <div class="md-list-item-text"> <h3>Traits</h3> <h4>Racial Traits, Class Traits</h4> </div> <md-divider ng-if="!$last"></md-divider> </md-list-item> <md-list-item class="md-3-line" ng-click="go(\'/character/profile/feats\')"> <div class="md-list-item-text"> <h3>Feats</h3> <h4>My Feats, All Feats</h4> </div> <md-divider ng-if="!$last"></md-divider> </md-list-item> </md-list> </div> </div>'),a.put("views/character/profile/proficiency.html",'<!-- Title --> <div id="top" class="page-title"> <div class="container md-padding"> <h2>{{selectedCharacter.name}} - Proficiency</h2> <h3>Level {{selectedCharacter.level}} {{selectedCharacter.race}} {{selectedCharacter.class}}</h3> </div> </div> <!-- Content --> <div class="content-wrapper"> <div class="container md-padding"> </div> </div>'),a.put("views/character/profile/traits.html",'<!-- Title --> <div id="top" class="page-title"> <div class="container md-padding"> <h2>{{selectedCharacter.name}} - Traits</h2> <h3>Level {{selectedCharacter.level}} {{selectedCharacter.race}} {{selectedCharacter.class}}</h3> </div> </div> <!-- Content --> <div class="content-wrapper"> <div class="container md-padding"> </div> </div>'),a.put("views/character/spells/all-spells.html",'<!-- Title --> <div id="top" class="page-title"> <div class="container md-padding"> <h2>All Spells</h2> </div> </div> <!-- Content --> <div class="content-wrapper"> <div class="container md-padding"> </div> </div>'),a.put("views/character/spells/class-spells.html",'<!-- Title --> <div id="top" class="page-title"> <div class="container md-padding"> <h2>{{selectedCharacter.name}} - Class Spells</h2> <h3>Level {{selectedCharacter.level}} {{selectedCharacter.race}} {{selectedCharacter.class}}</h3> </div> </div> <!-- Content --> <div class="content-wrapper"> <div class="container md-padding"> </div> </div>'),a.put("views/character/spells/index.html",'<!-- Title --> <div id="top" class="page-title"> <div class="container md-padding"> <h2>{{selectedCharacter.name}} - Spells &amp; Abilities</h2> <h3>Level {{selectedCharacter.level}} {{selectedCharacter.race}} {{selectedCharacter.class}}</h3> </div> </div> <!-- Menu Options --> <!-- Content --> <div class="content-wrapper"> <div class="container"> <!--  Character Home Nav --> <md-list id="homeNav" class="animate-test"> <md-list-item class="md-3-line" ng-click="go(\'/character/spells/my-spells\')"> <div class="md-list-item-text"> <h3>My Spells</h3> <h4>A list of all known spells</h4> </div> <md-divider ng-if="!$last"></md-divider> </md-list-item> <md-list-item class="md-3-line" ng-click="go(\'/character/spells/class-spells\')"> <div class="md-list-item-text"> <h3>Class Spells</h3> <h4>Spells for your character\'s class</h4> </div> <md-divider ng-if="!$last"></md-divider> </md-list-item> <md-list-item class="md-3-line" ng-click="go(\'/character/spells/all-spells\')"> <div class="md-list-item-text"> <h3>All Spells</h3> <h4>Browse a list of all spells</h4> </div> <md-divider ng-if="!$last"></md-divider> </md-list-item> </md-list> </div> </div>'),a.put("views/character/spells/my-spells.html",'<!-- Title --> <div id="top" class="page-title"> <div class="container md-padding"> <h2>{{selectedCharacter.name}} - My Spells</h2> <h3>Level {{selectedCharacter.level}} {{selectedCharacter.race}} {{selectedCharacter.class}}</h3> </div> </div> <!-- Content --> <div class="content-wrapper"> <div class="container md-padding"> </div> </div>'),a.put("views/character/stats/base.html",'<!-- Title --> <div id="top" class="page-title"> <div class="container md-padding"> <h2>{{selectedCharacter.name}} - Base Stats</h2> <h3>Level {{selectedCharacter.level}} {{selectedCharacter.race}} {{selectedCharacter.class}}</h3> </div> </div> <!-- Content --> <div class="content-wrapper"> <div class="container md-padding"> </div> </div>'),a.put("views/character/stats/combat.html",'<!-- Title --> <div id="top" class="page-title"> <div class="container md-padding"> <h2>{{selectedCharacter.name}} - Combat</h2> <h3>Level {{selectedCharacter.level}} {{selectedCharacter.race}} {{selectedCharacter.class}}</h3> </div> </div> <!-- Content --> <div class="content-wrapper"> <div class="container md-padding"> </div> </div>'),a.put("views/character/stats/index.html",'<!-- Title --> <div id="top" class="page-title"> <div class="container md-padding"> <h2>{{selectedCharacter.name}} - Stats</h2> <h3>Level {{selectedCharacter.level}} {{selectedCharacter.race}} {{selectedCharacter.class}}</h3> </div> </div> <!-- Menu Options --> <!-- Content --> <div class="content-wrapper"> <div class="container"> <!--  Character Home Nav --> <md-list id="homeNav" class="animate-test"> <md-list-item class="md-3-line" ng-click="go(\'/character/stats/base\')"> <div class="md-list-item-text"> <h3>Base Stats</h3> <h4>Str, Dex, Con, Int, Wis, Cha</h4> </div> <md-divider ng-if="!$last"></md-divider> </md-list-item> <md-list-item class="md-3-line" ng-click="go(\'/character/stats/saving-throws\')"> <div class="md-list-item-text"> <h3>Saving Throws</h3> <h4>Str, Dex, Con, Int, Wis, Cha</h4> </div> <md-divider ng-if="!$last"></md-divider> </md-list-item> <md-list-item class="md-3-line" ng-click="go(\'/character/stats/skills\')"> <div class="md-list-item-text"> <h3>Skills</h3> <h4>Test label please ignore</h4> </div> <md-divider ng-if="!$last"></md-divider> </md-list-item> <md-list-item class="md-3-line" ng-click="go(\'/character/stats/combat\')"> <div class="md-list-item-text"> <h3>Combat</h3> <h4>AC, Initiative, Speed, HP, Death Saves</h4> </div> <md-divider ng-if="!$last"></md-divider> </md-list-item> </md-list> </div> </div>'),a.put("views/character/stats/saving-throws.html",'<!-- Title --> <div id="top" class="page-title"> <div class="container md-padding"> <h2>{{selectedCharacter.name}} - Saving Throws</h2> <h3>Level {{selectedCharacter.level}} {{selectedCharacter.race}} {{selectedCharacter.class}}</h3> </div> </div> <!-- Content --> <div class="content-wrapper"> <div class="container md-padding"> </div> </div>'),a.put("views/character/stats/skills.html",'<!-- Title --> <div id="top" class="page-title"> <div class="container md-padding"> <h2>{{selectedCharacter.name}} - Skills</h2> <h3>Level {{selectedCharacter.level}} {{selectedCharacter.race}} {{selectedCharacter.class}}</h3> </div> </div> <!-- Content --> <div class="content-wrapper"> <div class="container md-padding"> </div> </div>'),a.put("views/main.html",'<!-- Title --> <div id="top" class="page-title"> <div class="container md-padding"> <h2>DragonCraft 5e</h2> </div> </div> <!-- Content --> <div class="content-wrapper"> <div class="container"> <!--  <p>Select a character to view/edit information.</p>--> <!-- Loading Circle--> <div layout="row" layout-sm="column" layout-align="space-around" ng-hide="!gettingCharacters"> <md-progress-circular md-mode="indeterminate"></md-progress-circular> </div> <!--  Character List --> <md-list id="characterList" ng-if="showCharacters" class="animate-test"> <p>Build 0.0.003</p> <h3 class="md-padding">Characters</h3> <md-list-item class="md-3-line" ng-repeat="character in characterList" ng-click="selectCharacter(character.id)"> <div class="md-list-item-text"> <h3>{{character.id}} {{character.name}}</h3> <h4>{{character.race}} {{character.class}}</h4> </div> <md-divider ng-if="!$last"></md-divider> </md-list-item> <!--      <md-button id="toTop" ng-controller="AppCtrl" class="md-raised md-primary" ng-click="scrollTo(\'top\')">To Top</md-button>--> <md-button id="newChar" ng-controller="AppCtrl" class="md-raised md-primary" ng-click="go(\'/new-character\', \'modal\')">New Character</md-button> </md-list> </div> </div>'),a.put("views/new-character.html",'<div id="top" class="page-title"> <div class="container md-padding"> <h2>New Character</h2> </div> </div> <div class="content-wrapper"> <div class="container md-padding"> <p>Let\'s get started by filling out some basic information about your character. You can edit this information later.</p> <form name="newCharacter"> <md-input-container> <label class="md-accent">Character Name</label> <input class="md-accent" name="name" ng-model="char.name" type="text" required> <div ng-messages="newCharacter.name.$error" ng-if="newCharacter.name.$dirty"> <div ng-message="required">This is required.</div> </div> </md-input-container> <md-input-container> <label>Race</label> <md-select name="race" ng-model="char.race" ng-model="size" ng-change="updateSubrace(char.race)" required> <md-option ng-repeat="race in raceArray" value="{{race.name}}">{{race.name}}</md-option> <md-option ng-click="showDialog($event, \'race\')" value="custom">Add Custom Race...</md-option> </md-select> <div ng-messages="newCharacter.race.$error" ng-if="newCharacter.race.$dirty"> <div ng-message="required">This is required.</div> </div> </md-input-container> <md-input-container ng-hide="!char.race || char.race == \'Tiefling\' || char.race == \'Half-Orc\' || char.race == \'Half-Elf\'"> <label>Subrace</label> <md-select ng-model="char.subrace" ng-model="size"> <md-option ng-repeat="subrace in subraceArray" value="{{subrace}}">{{subrace}}</md-option> <md-option ng-click="showDialog($event, \'subrace\')" value="custom">Add Custom Subrace...</md-option> </md-select> </md-input-container> <md-input-container> <label>Class</label> <md-select name="class" ng-model="char.class" ng-model="size" required> <md-option ng-repeat="class in classArray" value="{{class}}">{{class}}</md-option> <md-option ng-click="showDialog($event, \'class\')" value="custom">Add Custom Class...</md-option> </md-select> <div ng-messages="newCharacter.class.$error" ng-if="newCharacter.class.$dirty"> <div ng-message="required">This is required.</div> </div> </md-input-container> <md-input-container> <label>Level</label> <input name="level" class="md-accent" ng-model="char.level" type="number" min="0" max="20" placeholder="1" required> <div ng-messages="newCharacter.level.$error" ng-if="newCharacter.level.$dirty"> <div ng-message="required">This is required.</div> </div> </md-input-container> <md-input-container> <label>Gender</label> <md-select name="gender" ng-model="char.gender" ng-model="size" required> <md-option ng-repeat="gender in genderArray" value="{{gender.name}}">{{gender.name}}</md-option> <md-option ng-click="showDialog($event, \'gender\')" value="custom">Add Custom Gender...</md-option> </md-select> <div ng-messages="newCharacter.gender.$error" ng-if="newCharacter.gender.$dirty"> <div ng-message="required">This is required.</div> </div> </md-input-container> </form> <md-button ng-disabled="newCharacter.$invalid" ng-controller="AppCtrl" class="md-primary md-raised" ng-click="addCharacter(char.name, char.race, char.subrace, char.class, char.level, char.gender); go(\'/\')">Create Character</md-button> <md-button ng-controller="AppCtrl" class="md-primary" ng-click="go(\'/\');">Cancel</md-button> </div> </div>'),a.put("views/settings.html",'<div class="page-title"> <div class="container md-padding"> <h2>Settings</h2> </div> </div> <div class="container"> <md-button ng-click="deleteDB()">Clear Saved Data</md-button> </div>'),a.put("views/templates/dialog/custom-class.html",'<md-dialog aria-label="Add Custom Class"> <form> <md-toolbar> <div class="md-toolbar-tools"> <h2>Add Custom Class</h2> <span flex></span> <md-button class="md-icon-button" ng-click="cancel(\'class\')"> <i class="material-icons">close</i> </md-button> </div> </md-toolbar> <md-dialog-content style="max-width:800px;max-height:810px"> <div> <md-input-container> <label class="md-accent">Class Name</label> <input class="md-accent" ng-model="customClass.name" type="text"> </md-input-container> <md-input-container> <label class="md-accent">Description (optional)</label> <textarea class="md-accent" ng-model="customClass.description" type="text" md-maxlength="200"></textarea> </md-input-container> </div> </md-dialog-content> <div class="md-actions" layout="row"> <md-button ng-click="cancel(\'class\')"> Cancel </md-button> <md-button ng-click="addCustomClass(customClass.name, customClass.description)" style="margin-right:20px"> Confirm </md-button> </div> </form> </md-dialog>'),
a.put("views/templates/dialog/custom-gender.html",'<md-dialog aria-label="Add Custom Race"> <form> <md-toolbar> <div class="md-toolbar-tools"> <h2>Add Custom Gender</h2> <span flex></span> <md-button class="md-icon-button" ng-click="cancel(\'gender\')"> <i class="material-icons">close</i> </md-button> </div> </md-toolbar> <md-dialog-content style="max-width:800px;max-height:810px"> <div> <md-input-container> <label class="md-accent">Gender Name</label> <input class="md-accent" ng-model="customGender.name" type="text"> </md-input-container> </div> </md-dialog-content> <div class="md-actions" layout="row"> <md-button ng-click="cancel(\'gender\')"> Cancel </md-button> <md-button ng-click="addCustomGender(customGender.name)"> Confirm </md-button> </div> </form> </md-dialog>'),a.put("views/templates/dialog/custom-race.html",'<md-dialog aria-label="Add Custom Race"> <form> <md-toolbar> <div class="md-toolbar-tools"> <h2>Add Custom Race</h2> <span flex></span> <md-button class="md-icon-button" ng-click="cancel(\'race\')"> <i class="material-icons">close</i> </md-button> </div> </md-toolbar> <md-dialog-content style="max-width:800px;max-height:810px"> <div> <md-input-container> <label class="md-accent">Race Name</label> <input class="md-accent" ng-model="customRace.name" type="text"> </md-input-container> <md-input-container> <label class="md-accent">Description (optional)</label> <textarea class="md-accent" ng-model="customRace.description" type="text" md-maxlength="200"></textarea> </md-input-container> <md-input-container> <label class="md-accent">Subraces (optional)*</label> <textarea class="md-accent" ng-model="customRace.subraces" type="text" md-maxlength="200"></textarea> </md-input-container> <p class="sub-text">*Seperate subraces with a \',\' (no spaces).</p> </div> </md-dialog-content> <div class="md-actions" layout="row"> <md-button ng-click="cancel(\'race\')"> Cancel </md-button> <md-button ng-click="addCustomRace(customRace.name, customRace.description, customRace.subraces)"> Confirm </md-button> </div> </form> </md-dialog>'),a.put("views/templates/dialog/custom-subrace.html",'<md-dialog aria-label="Add Custom Race"> <form> <md-toolbar> <div class="md-toolbar-tools"> <h2>Add Custom Subrace</h2> <span flex></span> <md-button class="md-icon-button" ng-click="cancel(\'subrace\')"> <i class="material-icons">close</i> </md-button> </div> </md-toolbar> <md-dialog-content style="max-width:800px;max-height:810px"> <div> <p>Add a new {{$root.char.race}} subrace.</p> <md-input-container> <label class="md-accent">Subrace Name</label> <input class="md-accent" ng-model="customSubrace.name" type="text"> </md-input-container> </div> </md-dialog-content> <div class="md-actions" layout="row"> <md-button ng-click="cancel(\'subrace\')"> Cancel </md-button> <md-button ng-click="addCustomSubrace(customSubrace.name, $root.char.race)"> Confirm </md-button> </div> </form> </md-dialog>'),a.put("views/test.html",'<h3>testing</h3> <script>//\r\n    // Define your database\r\n    //\r\n    var db = new Dexie("friends-database");\r\n    db.version(1).stores({\r\n        friends: \'name,shoeSize\',\r\n        // ...add more stores (tables) here...\r\n    });\r\n\r\n    //\r\n    // Open it\r\n    //\r\n    db.open();\r\n\r\n    //\r\n    // Put some data into it\r\n    //\r\n    db.friends.put({name: "Nicolas", shoeSize: 8}).then (function(){\r\n        //\r\n        // Then when data is stored, read from it\r\n        //\r\n        return db.friends.get(\'Nicolas\');\r\n    }).then(function (friend) {\r\n        //\r\n        // Display the result\r\n        //\r\n        alert ("Nicolas has shoe size " + friend.shoeSize);\r\n    }).catch(function(error) {\r\n       //\r\n       // Finally don\'t forget to catch any error\r\n       // that could have happened anywhere in the\r\n       // code blocks above.\r\n       //\r\n       alert ("Ooops: " + error);\r\n    });</script>')}]);