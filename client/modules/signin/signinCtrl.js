angular.module('app').controller('signinCtrl', function ($scope, $http, $state, $sessionStorage, routeName) {

    $scope.doLogin = function (user) {
        let params = {
            email: user.email,
            password: user.password
        };
        $http.post('/api/signin', params).then(function (d) {
            console.log(d)
            if (d.status === 200) {
                if (d.data && d.data.user) {
                    $sessionStorage['user'] = d.data.user;
                    $state.go(routeName.INDEX);
                } else {

                }
            } else {
                console.log()
            }
        }, function (err) {
            console.error(err);
        });
    };

});