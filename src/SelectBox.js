(function(){

var _template = [
    "<div class='selectBox' ng-click='showSelectModal()'>",
        "<span class='selected'>{{label}}</span>",
        "<span class='selectArrow'>&#9660</span>",
        "<input type='hidden'/>",
    "</div>"
    ].join("\n");

angular.module('$selectBox', []).directive('selectBox', function () {
    return {
        restrict: 'E',
        require: ['ngModel' ],
        template: _template,
        scope: {
            ngSelectedValue: "@",
            ngTitle: "@",
            ngItemName: "@",
            ngItemId: "@",
            ngData: "@",
            ngPlaceholder: "@",
            ngHeaderClass: "@",
            ngSelectChanged: "@"
        },
        controller: function ($scope, $element, $scope, $ionicModal, $parse) {

            $scope.label = ($scope.ngPlaceholder) ? $scope.ngPlaceholder : "";

            $scope.modal = {};

            $scope.showSelectModal = function () {
                // TODO keep debugging, doesn't work out of the box
                // TODO also update test page with a second select item.
                console.log($scope.ngData);
                console.log($scope.data);
                var val = $parse($scope.ngData);
                $scope.data = val($scope);

                $scope.modal.show();
            };

            $scope.closeSelectModal = function () {
                $scope.modal.hide();
            };

            $scope.$on('$destroy', function (id) {
                $scope.modal.remove();
            });

            $scope.modal = $ionicModal.fromTemplate('<ion-modal-view id="select">'
                + '<ion-header-bar '+(($scope.ngHeaderClass) ? 'class="'+$scope.ngHeaderClass+'"' : '') +'>'
                + '<h1 class="title">' + $scope.ngTitle + '</h1>'
                + ' <a ng-click="closeSelectModal()" class="button button-icon icon ion-close"></a>'
                + '</ion-header-bar>'
                + '<ion-content>'
                + '<ion-list>'
                + '<ion-item  ng-click="clickItem(item);' + $scope.ngSelectChanged + '" ng-repeat="item in data" ng-bind-html="item[\'' + $scope.ngItemName + '\']"></ion-item>'
                + '</ion-list>'
                + ' </ion-content>'
                + '</ion-modal-view>', {
                scope: $scope,
                animation: 'slide-in-right'
            });

            $scope.clickItem = function (item) {

                var value = $parse($scope.ngSelectedValue);
                value.assign($scope.$parent, item[$scope.ngItemId]);

                $scope.label = item[$scope.ngItemName];
                $scope.closeSelectModal();
            };

            $scope.$on('reset', function(){
                $scope.label =  ($scope.ngPlaceholder) ? $scope.ngPlaceholder : "";
            })
        },
        compile: function ($element, $scope) {
            var input = $element.find('input.selected');
            angular.forEach({
                'name': $scope.name,
                'ng-model': $scope.ngSelectedValue
            }, function (value, name) {
                if (angular.isDefined(value)) {
                    input.attr(name, value);
                }
            });

        }
    };
});
//# sourceMappingURL=selectBox.js.map
})();