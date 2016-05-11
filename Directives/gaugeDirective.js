var gaugeWidget = angular.module('gaugeWidget',[]);
gaugeWidget.directive("gauge", function() {
    return {
        scope: {
            specs:'='
        },
        template: function(e, attrs) {
            return '<svg xmlns="http://www.w3.org/2000/svg" width="600" height="600">' +
                        '<path id="background" d="{{background}}" stroke-width="10" stroke="black" fill="none"/>' +
                        '<path d="{{value}}" stroke-width="10" stroke="#9BC850" fill="none"/>' +
                        '<path id="gradients" d="{{gradients}}" stroke-width="0" fill="none"/>' +
                        '<text ng-repeat="gradient in specs.gradients" dx="0" dy="0" text-anchor="middle" style="font: bold large arial">' +
                            '<textPath xlink:href="#gradients" startOffset="{{gradient.offset}}%">{{gradient.value}}</textPath>' +
                        '</text>' +
                        '<text x="{{maxValueCoordinates.x}}" y="{{maxValueCoordinates.y}}" text-anchor="middle" style="font: bold large arial" transform="rotate(90,{{maxValueCoordinates.x}},{{maxValueCoordinates.y}})">{{specs.maxValue}}' +
                        '</text>' +
                '</svg>';
            },
        link: function(scope, element, attrs) {
            for(var value=0, offset=0;
               value < scope.specs.maxValue;
               value += scope.specs.gradientInterval, offset += 100/18) {
                scope.specs.gradients.push({ value: value, offset: offset });
            }


            var getCoordinatesForAngle = function(centerX, centerY, radius, angleInDegrees){
                var angleInRadians = (angleInDegrees-180) * Math.PI/180.0;

                return {
                    x:parseInt(centerX + (radius * Math.cos(angleInRadians))),
                    y:parseInt(centerY + (radius * Math.sin(angleInRadians)))
                }
            }

            var getArcPathForAngle = function(startingAngle, endingAngle, radius) {
                var startingPt = getCoordinatesForAngle(300,300,radius,startingAngle);
                var endingPt = getCoordinatesForAngle(300,300,radius,endingAngle);

                return ["M", startingPt.x, startingPt.y, "A", radius, radius, 0, 0,  1, endingPt.x, endingPt.y].join(" ");
            }

            var displayGauge = function() {
                scope.value = getArcPathForAngle(0,scope.specs.currentValue, 200);
                scope.background = getArcPathForAngle(0,180, 200);
                scope.gradients = getArcPathForAngle(0,180, 210);

                scope.maxValueCoordinates =  getCoordinatesForAngle(300,300, 210,180);
            }

            displayGauge();
        }
    }
});
