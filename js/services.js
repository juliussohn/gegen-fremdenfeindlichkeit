app.directive('question', function () {
    return {
        restrict: 'E',
        scope: {
            minValue: '=min',
            maxValue: '=max',
            unit: '@unit',
            question: '@question',
            result: '=result',
            charttemplate: '@charttemplate',
            color: '@color',
            source: '@source',
            sourcetitle: '@sourcetitle',
        },
        templateUrl: 'templates/question.html',
        link: function (scope, element, attr,$rootScope) {
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
                  el.unbind('click', click);
                el.addClass("clicked");
                
                setTimeout(function () {
                    scope.showchart = true;
                    scope.$apply();
                }, 800);

                 scope.$emit('valueSet', scope.value);
                 scope.$apply();

            }

            function mousemove(event) {
                wh = $(window)
                    .height()
                y = wh - event.pageY;
                perc = y / wh;
                delta = attr.max - attr.min;
                //scope.value = 10 * Math.round((delta * perc + attr.min) / 10);
                scope.value =  Math.round((delta * perc + attr.min) );
                slider.css({
                    height: y + 'px'
                });
                scope.$apply()
            }
            scope.getNumber = function (num) {
                return new Array(num);
            }
            scope.pi_options = {
                responsive: false,
                maintainAspectRatio: false,
                segmentShowStroke: false,
                percentageInnerCutout: 70, // This is 0 for Pie charts
                animationSteps: 60,
                animationEasing: "easeOutQuart",
                animateRotate: true,
                animateScale: false,
                showTooltips: false,
                legendTemplate: "<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<segments.length; i++){%><li><span style=\"background-color:<%=segments[i].fillColor%>\"></span><%if(segments[i].label){%><%=segments[i].label%><%}%></li><%}%></ul>",
            } 
            scope.bar_options = {
                scaleBeginAtZero: true,
                scaleShowGridLines: false,
                //String - Colour of the grid lines
                scaleGridLineColor: "#ffffff",
                //Number - Width of the grid lines
                scaleGridLineWidth: 0,
                //Boolean - Whether to show horizontal lines (except X axis)
                scaleShowHorizontalLines: false,
                //Boolean - Whether to show vertical lines (except Y axis)
                scaleShowVerticalLines: false,
                 scaleShowLabels: false,
                //Boolean - If there is a stroke on each bar
                barShowStroke: false,
                //Number - Pixel width of the bar stroke
                barStrokeWidth: 2,
                //Number - Spacing between each of the X value sets
                barValueSpacing: 5,
                 showTooltips: false,
                //Number - Spacing between data sets within X values
                barDatasetSpacing: 20,
                showScale: false,
                //String - A legend template
                legendTemplate: "<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<datasets.length; i++){%><li><span style=\"background-color:<%=datasets[i].fillColor%>\"></span><%if(datasets[i].label){%><%=datasets[i].label%><%}%></li><%}%></ul>"
            }
            scope.chart_children = function () {
                var canvas = $("#chart_children");
                var color = (canvas.parents(".question")
                    .find(".slider")
                    .css("background-color"));
                var ctx = canvas.get(0)
                    .getContext("2d");
                var data_pi = [{
                    value: 30600000,
                    color: color,
                    label: "Kinderflüchtlinge"
                }, {
                    value: 29400000,
                    color: "#2E2E2E",
                    label: "Volljährige Flüchtlinge"
                }];
                pi_chart = new Chart(ctx)
                    .Doughnut(data_pi, scope.pi_options);
            }
            scope.chart_bundeshaushalt = function () {
                var canvas = $("#chart_bundeshaushalt");
                var color = (canvas.parents(".question")
                    .find(".slider")
                    .css("background-color"));
                var ctx = canvas.get(0)
                    .getContext("2d");
                var data_bundeshaushalt = [{
                    value: 243528000,
                    color: color,
                }, {
                    value: 301600000000,
                    color: "#2E2E2E",
                }];
                chart_bundeshaushalt = new Chart(ctx)
                    .Doughnut(data_bundeshaushalt, scope.pi_options);
            }
            scope.chart_unfinished = function () {
                var canvas = $("#chart_unfinished");
                var color = (canvas.parents(".question")
                    .find(".slider")
                    .css("background-color"));
                var ctx = canvas.get(0)
                    .getContext("2d");
                var data_bundeshaushalt = [{
                    value: 45,
                    color: color,
                }, {
                    value: 55,
                    color: "#2E2E2E",
                }];
                chart_unfinished = new Chart(ctx)
                    .Doughnut(data_bundeshaushalt, scope.pi_options);
            }
            scope.chart_deaths = function () {
                var canvas = $("#chart_deaths");
                var color = (canvas.parents(".question")
                    .find(".slider")
                    .css("background-color"));
                var ctx = canvas.get(0)
                    .getContext("2d");
                var data = {
                    labels: [''],
                    datasets: [{
                        fillColor: "#ffffff",
                        strokeColor: false,
                        highlightFill: color,
                        highlightStroke: false,
                        data: [1600]
                    },{
                        fillColor: color,
                        strokeColor: false,
                        highlightFill: color,
                        highlightStroke: false,
                        data: [2000]
                    }],
                    
                };
                chart = new Chart(ctx)
                    .Bar(data, scope.bar_options);
            }
            scope.chart_tax = function () {
                var canvas = $("#chart_tax");
                var color = (canvas.parents(".question")
                    .find(".slider")
                    .css("background-color"));
                var ctx = canvas.get(0)
                    .getContext("2d");
                var data = {
                    labels: [''],
                    datasets: [{
                        fillColor: "#ffffff",
                        strokeColor: false,
                        highlightFill: color,
                        highlightStroke: false,
                        data: [12000]
                    },{
                        fillColor: color,
                        strokeColor: false,
                        highlightFill: color,
                        highlightStroke: false,
                        data: [15300]
                    }],
                    
                };
                chart = new Chart(ctx)
                    .Bar(data, scope.bar_options);
            }
        }
    }
});

/*
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