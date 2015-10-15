app.directive('question', function () {
    return {
        restrict: 'E',
        scope: {
            minValue: '=min',
            maxValue: '=max',
            unit: '@unit',
            question: '@question',
            color: '=color',
            result: '=result',
            description: '@description',
            charttemplate: '@charttemplate'
        },
        templateUrl: 'templates/question.html',
        link: function (scope, element, attr) {
            var el = element,
                slider = element.find(".slider"),
                attr = attr;
            $(document)
                .on('mousemove', mousemove);
            el.on('click', click);

            function click(event) {
                scope.clicked = true;
                $(document)
                    .unbind('mousemove', mousemove);
                el.addClass("clicked");
                scope.$apply()
            }

            function mousemove(event) {
                wh = $(window)
                    .height()
                y = wh - event.pageY;
                perc = y / wh;
                delta = attr.max - attr.min;
                scope.value = 10 * Math.round((delta * perc + attr.min) / 10);
                slider.css({
                    height: y + 'px'
                });
                scope.$apply()
            }

            scope.getNumber = function(num){
                return new Array(num);
            }
        }
    }
});/*
app.directive('vertical', function () {
    return {
        link: function (scope, element, attr) {
            resize();
           var el = element
                parent = el.parent();

           $(window).on('resize', resize);

           function resize(){
                var wh = $(window).height()-170,
                    eh = angular.element(el[0]).height(),
                    mt = (wh - eh)/2;
               
                el.css({
                    marginTop : mt+"px"
                })
           }
        }
    }
});*/
