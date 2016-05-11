var pieChartWidget = angular.module('pieChartWidget',[]);

pieChartWidget.directive('pieChart', function() {
    return {
        scope: {
            specs: '='
        },
        templateUrl: 'Templates/pieChartTemplate.html',
        link: function(scope, element, attrs) {
            var x1=scope.specs.radius, y1=0, total=0, prevEndingAngle=0;

            angular.forEach(scope.specs.slices, function(slice, i){
               total += parseInt(slice.value);
            });

            angular.forEach(scope.specs.slices, function(slice, i){
                slice.x1 = x1;
                slice.y1 = y1;

                slice.endingAngle = (slice.value/total * 360) + prevEndingAngle;
                var radians = slice.endingAngle * (Math.PI/180);
                slice.x2 = (Math.cos(radians) * scope.specs.radius);
                slice.y2 = (Math.sin(radians) * scope.specs.radius);

                x1 = slice.x2;
                y1 = slice.y2;
                prevEndingAngle = slice.endingAngle;
            });

            angular.forEach(scope.specs.slices, function(slice, i){
                var angle = i == 0 ? slice.endingAngle / 2 : slice.endingAngle - (slice.endingAngle - prevEndingAngle) / 2;
                var radians = angle * (Math.PI/180);
                var tickMarkX = Math.cos(radians) * scope.specs.radius;
                var tickMarkY = Math.sin(radians) * scope.specs.radius;

                slice.label.x = Math.cos(radians) * (scope.specs.radius +20);
                slice.label.y = Math.sin(radians) * (scope.specs.radius +20);
                slice.label.alignment = getAlignment(angle);
                slice.tickMark = { x: parseInt(tickMarkX), y: parseInt(tickMarkY), rotation: parseInt(angle) };
                prevEndingAngle = slice.endingAngle;
            });

            function getAlignment(s) {
                if (s < 45) return "start";
                    else if (s < 135) return "middle";
                        else if (s < 225) return "end";
                            else return "start";
            }
        }
    }
});
