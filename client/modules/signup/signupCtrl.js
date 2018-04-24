angular.module('app').controller('signupCtrl', function ($scope, $http, $state, routeName) {

    $scope.signup = function (user) {
        let params = {
            email: user.email,
            password: user.password,
            name: user.name
        };

        $http.post('/api/signup', params).then(function (d) {
            if (d.status === 200) {
                $state.go(routeName.SIGNIN)
            }
        }, function (e) {
            console.error(e);
        })
    }
});