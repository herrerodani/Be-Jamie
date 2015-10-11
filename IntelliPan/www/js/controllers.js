angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope) {
  $scope.$on('tempChange', function(event, args) {
    $scope.temp = args;
  });
  $scope.$on('intTempChange', function(event, args) {
    $scope.tempT = args;
  });
})

.controller('ChatsCtrl', function($scope, Chats) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
})

.controller('IngredientsCtrl', function($scope, $stateParams) {
  $scope.ingredients = [
  {
    name : 'Potatoes',
  },
  {
    name: 'Eggs'
  },
  {
    name: 'Fish fillet'
  }
  ];
})
.controller('DataCtrl', function($scope, $stateParams) {
  //This is not a highcharts object. It just looks a little like one!
  $scope.chartConfig = {

    options: {
        //This is the Main Highcharts chart config. Any Highchart options are valid here.
        //will be overriden by values specified below.
        tooltip: {
            style: {
                padding: 10,
                fontWeight: 'bold'
            }
        }
    },
    //The below properties are watched separately for changes.

    //Series object (optional) - a list of series using normal highcharts series options.
    series: [{
      name : 'pan',
      data: []
    },
    {
      name : 'food',
      data: []
    }],
    //Title configuration (optional)
    title: {
       text: null
    },
    //Boolean to control showng loading status on chart (optional)
    //Could be a string if you want to show specific loading text.
    loading: false,
    //Configuration for the xAxis (optional). Currently only one x axis can be dynamically controlled.
    //properties currentMin and currentMax provied 2-way binding to the chart's maximimum and minimum
    xAxis: {
    currentMin: 0,
    currentMax: 20,
    title: {text: null}
    },
    //Whether to use HighStocks instead of HighCharts (optional). Defaults to false.
    useHighStocks: false,
    //size (optional) if left out the chart will default to size of the div or something sensible.
    //function (optional)
    func: function (chart) {
      //setup some logic for the chart
      $scope.chart = chart;
    }
  };

  $scope.$on('tempChange', function(event, args) {
    //$scope.chart.series[0].points[0].update(args.object);
    $scope.chart.series[0].addPoint(args);
    //, true, $scope.chart.series[0].points.length > 10
    //console.log($scope.chart.series);
  });
  $scope.$on('intTempChange', function(event, args) {
    $scope.chart.series[1].addPoint(args);
    //, $scope.chart.series[1].points.length > 10);
  });
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
