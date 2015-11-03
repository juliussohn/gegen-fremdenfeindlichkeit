var app = angular.module('gegen-fremdenfeindlichkeit', ['mgo-angular-wizard', 'ngAnimate', 'countTo']);

app.controller('appCtrl', function ($scope, $rootScope, WizardHandler, $window) {
    $scope.value = 0;
    $scope.number = 5;
    $scope.i = 0;
    $scope.values = [];
    $scope.$on('valueSet', function (event, data) {
        $scope.values.push(data);
        if ($scope.values.length == 8) {
            //  $scope.finished = true
        }
    }); 
    $scope.init = function () {
        $scope.browser = $scope.getBrowser();
        if( ($scope.browser[0] == "Safari" && $scope.browser[1] > 8 ) ||($scope.browser[0] == "Chrome" && $scope.browser[1] > 40 ) ){
            $scope.changeBrowser = false;
            $window.ga('send', 'event', 'Browser', 'allowed',  $scope.browser[0]+"/"+$scope.browser[0] );
        }else{
            $scope.changeBrowser = true;
             $window.ga('send', 'event', 'Browser', 'not allowed',  $scope.browser[0]+"/"+$scope.browser[0] );
            //$analytics.eventTrack('Browser not allowed', {  category: 'Browser', label: 'Allowed' });
        }


        
    };

    $scope.getBrowser = function () {
        var ua = navigator.userAgent,
            tem,
            M = ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [];
        if (/trident/i.test(M[1])) {
            tem = /\brv[ :]+(\d+)/g.exec(ua) || [];
            return 'IE ' + (tem[1] || '');
        }
        if (M[1] === 'Chrome') {
            tem = ua.match(/\b(OPR|Edge)\/(\d+)/);
            if (tem != null) return tem.slice(1)
                .join(' ')
                .replace('OPR', 'Opera');
        }
        M = M[2] ? [M[1], M[2]] : [navigator.appName, navigator.appVersion, '-?'];
        if ((tem = ua.match(/version\/(\d+)/i)) != null) M.splice(1, 1, tem[1]);
        M[1]=parseInt(M[1]);
        return M;
    };

    $scope.questions = [    {    
        min: 0,
            max: 100,
            result: 51,
            unit: " %",
            question: "Wie viel Prozent der Flüchtlinge weltweit sind jünger als 18 Jahre?",
        color: "#A468BD",
            charttemplate: "templates/charts/children.html",
            source: "https://www.uno-fluechtlingshilfe.de/fluechtlinge/themen/fluechtlingskinder.html",
        value: 40,
            sourcetitle: "Uno Flüchtlingshilfe – Oktober 2015"    
    },     {    
        min: 0,
            max: 12,
            result: 12,
            unit: " Monate",
            question: "Wie lang ist die durchschnittliche Bearbeitungsdauer für einen Asylantrag in Deutschland?",
        color: "#52BE80",
            charttemplate: "templates/charts/application_duration.html",
            source: "http://www.welt.de/politik/deutschland/article145595071/So-wird-die-Dauer-von-Asylverfahren-verschleiert.html",
        value: 5,
            sourcetitle: "Die Welt – August 2015"    
    }, {    
        min: 0,
            max: 100,
            result: 45,
            unit: " %",
            question: "Wie viele Asylanträge blieben in Deutschland 2015 unbearbeitet?",
            color: "#16a086",
            charttemplate: "templates/charts/unfinished.html",
            source: "http://www.rp-online.de/politik/deutschland/asylantraege-unbearbeitet-bundesamt-fuer-fluechtlinge-im-rueckstand-aid-1.5381979",
            value: 40,
            sourcetitle: "RP Online – September 2015"    
    }, {    
        min: 0,
            max: 6,
            result: 3,
            unit: " Monate",
            question: "Wie lange dürfen Flüchtlinge nach ihrer Ankunft nicht Arbeiten?",
            color: "#576474",
            charttemplate: "templates/charts/work.html",
            source: "http://www.proasyl.de/de/themen/basics/basiswissen/rechte-der-fluechtlinge/",
        value: 2,
            sourcetitle: "Proasyl – Oktober 2015"    
    }, {    
        min: 0,
            max: 4000,
            result: 3300,
            unit: " EUR",
            question: "Wie viel Steuern verdient Deutschland jährlich mehr an einem Asylanten, als es für diesen ausgibt?",
            color: "#7e8c8d",
            charttemplate: "templates/charts/tax.html",
            source: "http://www.badische-zeitung.de/fakten-check-deutschland-geht-es-immer-schlechter",
        value: 1345,
            sourcetitle: "Badische Zeitung – Dezember 2014"    
    }, {    
        min: 100,
            max: 600,
            result: 243,
            unit: " Mio EUR",
            question: "Wie viel Geld vom Bundeshaushalt wurde 2015 für das Bundesamt für Migration und Flüchtlinge ausgegeben?",
        color: "#eb6f63",
            charttemplate: "templates/charts/bundeshaushalt.html",
            source: "http://www.bundeshaushalt-info.de/#/2015/soll/ausgaben/einzelplan.html",
        value: 500,
            sourcetitle: "Bundeshaushalt – Oktober 2015"    
    }, {    
        min: 0,
            max: 1000,
            result: 143,
            unit: " EUR",
            question: "Wie viel Geld bekommt ein Asylbewerber monatlich in einer Erstaufnahmeinrichtung?",
        color: "#f39c11",
            charttemplate: "templates/charts/money.html",
            source: "http://www.spiegel.de/politik/deutschland/fluechtlinge-in-deutschland-antworten-zum-taschengeld-a-1048432.html",
        value: 567,
            sourcetitle: "Spiegel – August 2015"    
    }, {    
        min: 0,
            max: 2000,
            result: 2000,
            unit: " Tote",
            question: "Wie viele Flüchtlinge starben 2015 bei der Flucht über das Mittelmeer?",
        color: "#2980B9",
            charttemplate: "templates/charts/deaths.html",
            source: "http://www.tagesspiegel.de/politik/ertrunkene-fluechtlinge-2015-schon-30-mal-mehr-tote-im-mittelmeer-als-im-vorjahreszeitraum/11664838.html",
        value: 345,
            sourcetitle: "tagessschau.de – August 2015"    
    } ];
    $scope.toStep = function (i) {
        WizardHandler.wizard()
            .goTo(i);
        $scope.questionNumber = parseInt(i.substr(2));
        if (i == "q_0") {
            $scope.started = true;
        }
        if (i == "q_8") {
            $scope.showresults = true;
        }
    };
    $scope.getNumber = function (num) {
        return new Array(num);
    };
    $scope.setValue = function ($event, i) {
        var question = $scope.questions[i];
        $window.ga('send', 'event', 'Question', 'Frage '+i, {
          'Wert': question.value
        });
        console.log(question.value);

        question.clicked = true;
        setTimeout(function () {
            question.showchart = true;
            $scope.$apply();
        }, 800);
    };
    $scope.cursorMousedown = function ($event) {
        $($event.currentTarget)
            .addClass("mousedown");
    };
    $scope.changeValue = function ($event, i) {
        var question = $scope.questions[i];
        $($event.currentTarget)
            .find(".cursor")
            .css({
                top: ($event.pageY - 30) + "px",
                left: ($event.pageX - 30) + "px",
            })
            .removeClass("mouseNotMoved");
        wh = $(window)
            .height();
        y = wh - $event.pageY;
        perc = y / wh;
        delta = question.max - question.min;
        //scope.value = 10 * Math.round((delta * perc + attr.min) / 10);
        question.value = Math.round((delta * perc + question.min));
        question.slider_height = y;
    };
    $scope.bar_options = {
        scaleBeginAtZero: true,
        scaleShowGridLines: false,
        scaleGridLineColor: "#ffffff",
        scaleGridLineWidth: 0,
        scaleShowHorizontalLines: false,
        scaleShowVerticalLines: false,
        scaleShowLabels: false,
        barShowStroke: false,
        barStrokeWidth: 2,
        barValueSpacing: 5,
        showTooltips: false,
        barDatasetSpacing: 20,
        showScale: false,
        legendTemplate: "<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<datasets.length; i++){%><li><span style=\"background-color:<%=datasets[i].fillColor%>\"></span><%if(datasets[i].label){%><%=datasets[i].label%><%}%></li><%}%></ul>"
    };
    $scope.pi_options = {
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
    };
    $scope.result_1 = function () {
        var canvas = $("#result_1");
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
            }, {
                fillColor: color,
                strokeColor: false,
                highlightFill: color,
                highlightStroke: false,
                data: [2000]
            }],
        };
        chart = new Chart(ctx)
            .Bar(data, $scope.bar_options);
    };
    $scope.chart_children = function () {
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
            .Doughnut(data_pi, $scope.pi_options);
    };
    $scope.chart_bundeshaushalt = function () {
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
            .Doughnut(data_bundeshaushalt, $scope.pi_options);
    };
    $scope.chart_unfinished = function () {
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
            .Doughnut(data_bundeshaushalt, $scope.pi_options);
    };
    $scope.chart_deaths = function () {
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
            }, {
                fillColor: color,
                strokeColor: false,
                highlightFill: color,
                highlightStroke: false,
                data: [2000]
            }],
        };
        chart = new Chart(ctx)
            .Bar(data, $scope.bar_options);
    };
    $scope.chart_tax = function () {
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
            }, {
                fillColor: color,
                strokeColor: false,
                highlightFill: color,
                highlightStroke: false,
                data: [15300]
            }],
        };
        chart = new Chart(ctx)
            .Bar(data, $scope.bar_options);
    };
    $scope.result_chart = function (index) {
        var options = bar_options = {
            scaleBeginAtZero: true,
            scaleShowGridLines: false,
            scaleGridLineColor: "#ffffff",
            scaleGridLineWidth: 0,
            scaleShowHorizontalLines: false,
            scaleShowVerticalLines: false,
            scaleShowLabels: true,
            barShowStroke: false,
            barStrokeWidth: 2,
            barValueSpacing: 5,
            showTooltips: false,
            barDatasetSpacing: 10,
            showScale: false,
            responsive: false,
            maintainAspectRatio: false,
        };
        setTimeout(function () {
            var canvas = $(".result_chart");
            var color = $scope.questions[index].color;
            var ctx = canvas.get(index)
                .getContext("2d");
            var data = {
                labels: [''],
                datasets: [{
                    fillColor: "#ffffff",
                    strokeColor: false,
                    highlightFill: color,
                    highlightStroke: false,
                    data: [$scope.questions[index].value]
                }, {
                    fillColor: "#2980B9",
                    strokeColor: false,
                    highlightFill: color,
                    highlightStroke: false,
                    data: [$scope.questions[index].result]
                }],
            };
            chart = new Chart(ctx)
                .Bar(data, options);
        }, 800);
    };
    $scope.refresh = function () {
        location.reload();
    };
});