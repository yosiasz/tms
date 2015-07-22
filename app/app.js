var app = angular.module('tmsapp', ['ngRoute','ui.calendar', 'ui.bootstrap']);
 
//This configures the routes and associates each route with a view and a controller
//partials are also called views?
app.config(function ($routeProvider) {
    $routeProvider
        .when('/',
            {
                title: 'Login',
                controller: 'authController',
                templateUrl: '/app/partials/login.html'
            })
        .when('/home',
            {
                controller: 'authController',
                templateUrl: '/app/partials/login.html'
            })
        .when('/harbors',
            {
                controller: 'harborsController',
                templateUrl: '/app/partials/harbors.html'
            })
        .when('/schedules',
            {
                templateUrl: '/app/partials/schedules.html'
            })
        .when('/about',
            {
                controller: 'aboutCtrl',
                templateUrl: '/app/partials/about.html'
            })
        .when('/login', 
            {
                title: 'Login',
                controller: 'authController',
                templateUrl: 'app/partials/login.html'
            })
        .when('/logout', {
            title: 'Logout',
            templateUrl: 'app/partials/login.html',
            controller: 'logoutCtrl'
        })
        .when('/signup', {
            title: 'Signup',
            templateUrl: 'app/partials/signup.html',
            controller: 'authController'
        })
        .when('/dashboard', {
            title: 'Dashboard',
            templateUrl: 'app/partials/dashboard.html',
            controller: 'authCtrl'
        })    
        //Define a route that has a route parameter in it (:personid)
        .when('/persons/:personid',
            {
                controller: 'personController',
                templateUrl: '/app/partials/personDetails.html'
            })
        .when('/persons',
            {
                controller: 'personsController',
                templateUrl: '/app/partials/persons.html'
            })        

        //Define a route that has a route parameter in it (:customerID)
        .when('/vessels',
            {
                controller: 'shipsController',
                templateUrl: '/app/partials/vessels.html'
            })
        .otherwise({ redirectTo: '/' });
})

/*  
app.config(['$routeProvider',
  function ($routeProvider) {
        $routeProvider.
        when('/login', {
            title: 'Login',
            templateUrl: 'partials/login.html',
            controller: 'authCtrl'
        })
            .when('/logout', {
                title: 'Logout',
                templateUrl: 'partials/login.html',
                controller: 'logoutCtrl'
            })
            .when('/signup', {
                title: 'Signup',
                templateUrl: 'partials/signup.html',
                controller: 'authCtrl'
            })
            .when('/dashboard', {
                title: 'Dashboard',
                templateUrl: 'partials/dashboard.html',
                controller: 'authCtrl'
            })
            .when('/', {
                title: 'Login',
                templateUrl: 'partials/login.html',
                controller: 'authCtrl',
                role: '0'
            })
            .otherwise({
                redirectTo: '/login'
            });
  }]) */
/*     .run(function ($rootScope, $location, Data) {
        $rootScope.$on("$routeChangeStart", function (event, next, current) {
            $rootScope.authenticated = false;
            Data.get('session').then(function (results) {
                if (results.uid) {
                    $rootScope.authenticated = true;
                    $rootScope.uid = results.uid;
                    $rootScope.name = results.name;
                    $rootScope.email = results.email;
                } else {
                    var nextUrl = next.$$route.originalPath;
                    if (nextUrl == '/signup' || nextUrl == '/login') {
 
                    } else {
                        $location.path("/login");
                    }
                }
            });
        });
    }); */