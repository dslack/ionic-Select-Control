(function(){

    var _template = [
        "<div class='selectBox {{ngSelectBoxClass}}' ng-click='showSelectModal()'>",
        "<span class='selected {{ngPlaceholderClass}}'>{{label}}</span>",
        "<span class='selectArrow'>&#9660</span>",
        "<input type='hidden' ng-model='ngSelectedValue' name='{{ngHtmlName}}' dynamic-name ng-required='{{ngIsRequired}}'/>",
        "</div>"
    ].join("\n");

    angular.module('$selectBox', []).directive('selectBox', function () {

        return {
            restrict: 'E',
            require: ['ngModel' ],
            template: _template,
            scope: {
                ngSelectedValue: "=",
                ngTitle: "@",
                ngItemName: "@",
                ngItemId: "@",
                ngData: "@",
                ngHtmlName: "@",
                ngIsRequired: "@",
                ngPlaceholder: "@",
                ngHeaderClass: "@",
                ngSelectChanged: "&",
                ngPlaceholderClass: "@",
                ngSelectBoxClass: "@"
            },
            controller: ['$scope', '$element', '$ionicModal', '$parse', function ($scope, $element, $ionicModal, $parse) {

                $scope.ngPlaceholder = ($scope.ngPlaceholder) ? $scope.ngPlaceholder : '';
                $scope.ngIsRequired = ($scope.ngIsRequired) ? $scope.ngIsRequired : false;
                $scope.label = $scope.ngPlaceholder;
                $scope.ngPlaceholderClass = ($scope.ngPlaceholderClass) ? $scope.ngPlaceholderClass : '';
                $scope.ngSelectBoxClass = ($scope.ngSelectBoxClass) ? $scope.ngSelectBoxClass : '';

                $scope.showSelectModal = function () {
                    var val = $parse($scope.ngData);
                    $scope.ngDataObjects = val($scope.$parent);
                    $scope.ngHeaderClass = ($scope.ngHeaderClass) ? $scope.ngHeaderClass : "";
                    $scope.renderModal();
                    $scope.modal.show().then(function(modal) {
                        $scope.modal.el.style.zIndex = 99;
                    });
                };

                $scope.closeSelectModal = function () {
                    if($scope.modal)
                        $scope.modal.hide();
                };

                $scope.$on('$destroy', function (id) {
                    if($scope.modal)
                        $scope.modal.remove();
                });

                $scope.$watch('ngPlaceholder', function (newValue, oldValue) {
                    angular.element($element.children()[0]).children()[0].innerText = newValue;
                });

                $scope.$watch('ngSelectedValue', function (newValue, oldValue) {
                    //console.log('selected value changed from ', oldValue, ' to ', newValue);
                    if(undefined != newValue) {
                        var val = $parse($scope.ngData);
                        $scope.ngDataObjects = val($scope.$parent);
                        var i=0, len=$scope.ngDataObjects.length;
                        for (; i<len; i++) {
                            if ($scope.ngDataObjects[i][$scope.ngItemId] == newValue) {
                                //console.log('found descr for ', newValue, ' = ',$scope.ngDataObjects[i][$scope.ngItemName]);
                                $scope.setPlaceholderLabel($scope.ngDataObjects[i][$scope.ngItemName]);
                            }
                        }
                    } else
                        $scope.setPlaceholderLabel($scope.ngPlaceholder);
                });

                $scope.renderModal = function () {
                    $scope.modal = $ionicModal.fromTemplate('<ion-modal-view id="select" class="ionic-select-enable">'
                        + '<ion-header-bar class="' + $scope.ngHeaderClass + '">'
                        + '<h1 class="title">' + $scope.ngTitle + '</h1>'
                        + ' <a ng-click="closeSelectModal()" class="button button-icon icon ion-close ionic-select-enable"></a>'
                        + '</ion-header-bar>'
                        + '<ion-content>'
                        + '<ion-list class="ionic-select-enable">'
                        + '<ion-item class="ionic-select-enable" ng-click="clickItem(item);' + '" ng-repeat="item in ngDataObjects" ng-bind-html="item[\'' + $scope.ngItemName + '\']"></ion-item>'
                        + '</ion-list>'
                        + ' </ion-content>'
                        + '</ion-modal-view>', {
                        scope: $scope,
                        animation: 'slide-in-right',
                        backdropClickToClose : false
                    });
                };

                $scope.clickItem = function (item) {
                    $scope.ngSelectedValue = item[$scope.ngItemId];
                    $scope.label = item[$scope.ngItemName];
                    $scope.closeSelectModal();
                    $scope.ngSelectChanged({selectedValue: $scope.ngSelectedValue});
                };

                $scope.setPlaceholderLabel = function(label) {
                    $scope.label =  label;
                };

                $scope.$on('reset', function(){
                    $scope.setPlaceholderLabel($scope.ngPlaceholder);
                    $scope.ngSelectedValue = null;
                });
            }],
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
    }).directive('dynamicName', function() {
        return {
            restrict: 'A',
            priority: -1,
            require: ['ngModel'],
            link: function (scope, element, attr, ngModel) {
                ngModel[0].$name = attr.name;
            }
        };
    });
//# sourceMappingURL=selectBox.js.map
})();
