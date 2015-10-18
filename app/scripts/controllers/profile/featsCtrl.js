'use strict';
angular.module('dCraftApp')  
  .controller('featsCtrl', function($scope, characterSrv, saveCharacterSrv, databaseSrv, $timeout, $filter, featInfoSrv, $mdDialog){
  
  //$scope.searchText = 'ac';
  $scope.character = characterSrv.getSelectedCharacter();
  
  $scope.featsSearchResults = [];
  $scope.query = '';
  
  if($scope.character.feats !== undefined){
    $scope.characterFeats = $scope.character.feats;
  } else {
    $scope.characterFeats = [];//$scope.character.feats;
  }
  $scope.loading = true;
  
  databaseSrv.getFeats().then(function(feats){
    $timeout(function(){
      $scope.feats = feats;
      $scope.updateFeats();
      $scope.loading = false;
    }, 700);
  });
  
  //Update selected
  $scope.updateFeats = function(){
    for(var i in $scope.feats){
      $scope.feats[i].isSelected = false;
    }
    
    for(var i in $scope.characterFeats){
      for(var j in $scope.feats){
        if($scope.characterFeats[i].name === $scope.feats[j].name){
          $scope.feats[j].isSelected = true;
        }
      }
    }
  };
  
  //Update Character
  $scope.updateCharacter = function(id, field, value){
    saveCharacterSrv.updateCharacter(id, field, value);
  };
  //Add a Feat
  $scope.addFeat = function(feat){
    $scope.characterFeats.push(feat);
    $scope.updateCharacter($scope.character.id, 'feats', $scope.characterFeats);
    $scope.updateFeats();
  };
  
  //Remove a Feat
  $scope.removeFeat = function(feat){
    console.log('removing this item...');
    for(var i in $scope.characterFeats){
      if($scope.characterFeats[i].name == feat.name){
        console.log('deleting an item...');
        $scope.characterFeats.splice(i, 1);
      }
    }
    $scope.updateCharacter($scope.character.id, 'feats', $scope.characterFeats);
    $scope.updateFeats();
  };
  
  $scope.featsSearch = function(query){
    $scope.featsSearchResults = [];
    console.log("----NEW QUERY---");
    for(var i in $scope.feats){
      //var name 
      //var string = $scope.feats[i].name;      
      var result = $scope.feats[i].name.search(new RegExp(query, "i"));
      //var result = string.match(/+'query'+/i);
      console.log(result);
      if(result > -1){
        $scope.featsSearchResults.push($scope.feats[i]);
      }
    }
  };
  
  $scope.selectFeat = function(feat){
    featInfoSrv.selectedFeat = feat;
  };
  
  
   
});