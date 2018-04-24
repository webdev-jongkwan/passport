angular.module('app').controller('indexCtrl', function ($scope, $state, $http, $sessionStorage, routeName) {
    $scope.routeName = routeName;

    if (!$sessionStorage.user || _.isEmpty($sessionStorage.user)) {
        $state.go(routeName.SIGNIN);
    } else {
        $scope.user = $sessionStorage.user;
    }

    $scope.doLogout = function (user) {
        if ($sessionStorage.user) {
            $http.get('/api/signout').then(function (d) {
                delete $sessionStorage.user;
                $state.go(routeName.SIGNIN);
            });
        }
    };
});