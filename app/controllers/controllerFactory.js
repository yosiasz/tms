var hw = angular.module('tmsapp')

hw.controller("calendarController", function($scope) {
    $scope.day = moment();
});
hw.controller('authController', ['$scope', '$rootScope', '$routeParams', '$location', '$http', 'authFactory', 
function ($scope, $rootScope, $routeParams, $location, $http, authFactory) {
    //initially set those objects to null to avoid undefined error
    $scope.status;
    $scope.loggedinperson;            

   $scope.Login = function (username, password) {
        authFactory.Login(username, password)
        .success(function (prsn) {
            $scope.status = 'Retrieved person!';
            $scope.loggedinperson = prsn;
			console.log($scope.loggedinperson);
        })
        .error(function (error) {
            $scope.status = 'Error retrieving person! ' + error.message;
        });
    }; 	
}]) 
hw.controller('harborsController', ['$scope', 'harborFactory', function ($scope, harborFactory) {

    $scope.status;
    $scope.harbors;
    
    getHarbors();

    function getHarbors() {
        harborFactory.getHarbors()
            .success(function (hrbrs) {
                $scope.harbors = hrbrs;
            })
            .error(function (error) {
                $scope.status = 'Unable to load persons data: ' + error.message;
            });
    }
            
   $scope.getHarbor = function (id) {
        harborFactory.getHarbor(id)
        .success(function (hrbr) {
            $scope.status = 'Retrieved person!';
            $scope.harbor = hrbr;
        })
        .error(function (error) {
            $scope.status = 'Error retrieving person! ' + error.message;
        });
    };          

}])
hw.controller('AccountController', ['$scope', function ($scope) {
		var UserRole = "Admin";

		$scope.IsAdmin = function(){
			return $scope.UserRole == "Admin";
		}

		$scope.IsUser = function(){
			return $scope.UserRole == "StandardUser";
		}

		$scope.IsManager = function(){
			return $scope.UserRole == "Manager";
		}       

}]) 
hw.controller('shipsController', ['$scope', 'shipFactory', function ($scope, shipFactory) {

    $scope.status;
    $scope.ships;
    
    getShips();

    function getShips() {
        shipFactory.getShips()
            .success(function (shps) {
                $scope.ships = shps;
            })
            .error(function (error) {
                $scope.status = 'Unable to load brand data: ' + error.message;
            });
    }
            
   $scope.getShip = function (id) {
        shipFactory.getShip(id)
        .success(function (shp) {
            $scope.status = 'Retrieved vessel!';
            $scope.ship = shp;
        })
        .error(function (error) {
            $scope.status = 'Error retrieving vessel! ' + error.message;
        });
    };          

}])
hw.controller('personsController', ['$scope', 'personsFactory', function ($scope, personsFactory) {

    $scope.status;
    $scope.persons;
    $scope.person;            

    getPersons();

    function getPersons() {
        personsFactory.getPersons()
            .success(function (prsns) {
                $scope.persons = prsns;
            })
            .error(function (error) {
                $scope.status = 'Unable to load persons data: ' + error.message;
            });
    } 
	$scope.insertPerson = function () {       
			personsFactory.insertPerson($scope.newperson)
				.success(function () {
					$scope.status = 'Inserted Customer! Refreshing person list.';
					$scope.persons.push($scope.newperson);
				}).
				error(function(error) {
					$scope.status = 'Unable to insert perons: ' + error.message;
				});
		};
           
    $scope.getPerson = function (id) {
        personsFactory.getPerson(id)
        .success(function (prsn) {
            $scope.status = 'Retrieved person!';
            $scope.person = prsn;
        })
        .error(function (error) {
            $scope.status = 'Error retrieving person! ' + error.message;
        });
    };           

}])