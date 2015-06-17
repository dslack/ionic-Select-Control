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
        require: ['ngModel'
        // , 'ngData', 'ngSelectedId', 'ngSelectedValue', '?ngTitle', 'ngItemName', 'ngItemId'
        ],
        template: _template,
        controller: function ($scope, $element, $attrs, $ionicModal, $parse) {

            $scope.label = ($attrs.ngPlaceholder) ? $attrs.ngPlaceholder : "";

            $scope.modal = {};

            $scope.showSelectModal = function () {
                var val = $parse($attrs.ngData);
                $scope.data = val($scope);

                $scope.modal.show();
            };

            $scope.closeSelectModal = function () {
                $scope.modal.hide();
            };

            $scope.$on('$destroy', function (id) {
                $scope.modal.remove();
            });

            $scope.modal = $ionicModal.fromTemplate('<ion-modal-view id="select">' + '<ion-header-bar '+(($attrs.ngHeaderClass) ? 'class="'+$attrs.ngHeaderClass+'"' : '') +'>' + '<h1 class="title">' + $attrs.ngTitle + '</h1>' + ' <a ng-click="closeSelectModal()" class="button button-icon icon ion-close"></a>' + '</ion-header-bar>' + '<ion-content>' + '<ion-list>' + '<ion-item  ng-click="clickItem(item)" ng-repeat="item in data" ng-bind-html="item[\'' + $attrs.ngItemName + '\']"></ion-item>' + '</ion-list>' + ' </ion-content>' + '</ion-modal-view>', {
                scope: $scope,
                animation: 'slide-in-right'
            });

            $scope.clickItem = function (item) {

                var value = $parse($attrs.ngSelectedValue);
                value.assign($scope.$parent, item[$attrs.ngItemId]);

                $scope.label = item[$attrs.ngItemName];

                $scope.closeSelectModal();
            };
        },
        compile: function ($element, $attrs) {
            var input = $element.find('input.selected');
            angular.forEach({
                'name': $attrs.name,
                'ng-model': $attrs.ngSelectedValue
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