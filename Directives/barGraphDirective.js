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

                var id = scope.specs.id + '_' + index;
                bar.barStyle = 'animation:' + id + ' .5s linear;animation-fill-mode:forwards';
                var animationDefinition = '@keyframes ' + id + ' { from { width:0px; } to { width:' + bar.width + 'px; } }';
                document.styleSheets[0].insertRule(animationDefinition, 0);
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
