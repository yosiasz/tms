var hw = angular.module('tmsapp')
hw.factory('authFactory', ['$http', function($http) {

    var urlBase = 'http://localhost:8001/api/auth';
    var authFactory = {};

    authFactory.Login = function (username, password) {
        return $http.post(urlBase + '/login', {username: username, password: password});
		    };

    return authFactory;
}]);
hw.factory('harborFactory', ['$http', function($http) {

    var urlBase = 'http://localhost:8001/api/harbors';
    var harborFactory = {};

    harborFactory.getHarbors= function () {
        return $http.get(urlBase);
    };

    harborFactory.getHarbor = function (id) {
        return $http.get(urlBase + '/' + id);
    };

    harborFactory.insertHarbor = function (harbor) {
        return $http.post(urlBase, harbor);
    };

    harborFactory.updateHarbor = function (harbor) {
        return $http.put(urlBase + '/' + harbor.harborid, harbor)
    };

    harborFactory.deleteHarbord = function (id) {
        return $http.delete(urlBase + '/' + id);
    };

    return harborFactory;
}]);
hw.factory('shipFactory', ['$http', function($http) {

    var urlBase = 'http://localhost:8001/api/vessels';
    var shipFactory = {};

    shipFactory.getShips= function () {
        return $http.get(urlBase);
    };

    shipFactory.getShip = function (id) {
        return $http.get(urlBase + '/' + id);
    };

    shipFactory.insertShip = function (vessel) {
        return $http.post(urlBase, vessel);
    };

    shipFactory.updateShip = function (vessel) {
        return $http.put(urlBase + '/' + vessel.vesselid, vessel)
    };

    shipFactory.deleteShip = function (id) {
        return $http.delete(urlBase + '/' + id);
    };

    return shipFactory;
}]);
hw.factory('scheduleFactory', ['$http', function($http) {

    var urlBase = 'http://localhost:8001/api/schedules';
    var scheduleFactory = {};

    scheduleFactory.getSchedules= function () {
        return $http.get(urlBase);
    };

    scheduleFactory.getSchedule = function (id) {
        return $http.get(urlBase + '/' + id);
    };

    scheduleFactory.insertSchedule = function (schedule) {
        return $http.post(urlBase, schedule);
    };

    scheduleFactory.updateSchedule  = function (schedule) {
        return $http.put(urlBase + '/' + schedule.scheduleid, schedule)
    };

    scheduleFactory.deleteSchedule = function (id) {
        return $http.delete(urlBase + '/' + id);
    };

    return scheduleFactory;
}]);    
hw.factory('personsFactory', ['$http', function($http) {

    var urlBase = 'http://localhost:8001/api/persons';
    var personsFactory = {};

    personsFactory.getPersons = function () {
        return $http.get(urlBase);
    };

    personsFactory.getPerson = function (id) {
        return $http.get(urlBase + '/' + id);
    };

    personsFactory.insertPerson = function (person) {
        return $http.post(urlBase, person);
    };

    personsFactory.updatePerson = function (person) {
        return $http.put(urlBase + '/' + person.personid, person)
    };

    personsFactory.deletePerson = function (id) {
        return $http.delete(urlBase + '/' + id);
    };

    return personsFactory;
}]);