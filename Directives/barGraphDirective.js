var barGraphWidget = angular.module('barGraphWidget',[]);

barGraphWidget.directive("barGraph", function() {
    return {
        scope: {
            specs:'='
        },
        templateUrl:'Templates/barGraphTemplate.html',
        link: function(scope, element, attrs) {
            var ctx = document.createElement('canvas').getContext('2d');
            var gradients = [];

            ctx.font = scope.specs.fontStyle;
            scope.specs.labelWidth = 0;
            scope.specs.overallWidth = 0;

            angular.forEach(scope.specs.bars, function(bar, index) {
                scope.specs.labelWidth = Math.max(scope.specs.labelWidth,
                                                  ctx.measureText(bar.text).width);
                scope.specs.overallWidth = Math.max(scope.specs.overallWidth,
                                                    bar.width);
            });

            for(var i=0;;i +=scope.specs.gradientInterval) {
                gradients.push({text: i, offset:i});
                if (i > scope.specs.overallWidth)
                    break;
            }

            scope.specs.gradients = gradients;
            scope.specs.overallHeight = scope.specs.bars.length * (1 * scope.specs.height + scope.specs.padding);
        }
    }
});
