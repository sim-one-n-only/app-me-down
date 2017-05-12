var app = angular.module("appMeDown");

app.controller("itemController", ["$scope", "$log", "$http", "$uibModal", "itemService", "mapService", function ($scope, $log, $http, $uibModal, itemService, mapService) {

    $scope.favoriteItems = [];

    $scope.favorite = function (item) {
        itemService.postFavorite().then(function (response) {
            $scope.favoriteItems.push(Item);
            console.log($scope.favoriteItems);
        })

    }

    itemService.getItems().then(function (items) {
        items.forEach(function (item) {
            item.map = {
                center: {
                    latitude: item.place.lat,
                    longitude: item.place.lng
                },
                zoom: 14
            };
            item.options = {
                maxZoom: 14
            };
            item.marker = {
                id: item._id,
                coords: {
                    latitude: item.place.lat,
                    longitude: item.place.lng
                },
                window: {
                    title: item.place.name
                }
            }
        });
        $scope.items = items;
    });


    $scope.submit = function (newItem) {
        itemService.postItems(newItem).then(function () {
            $scope.items.push(newItem);
            console.log($scope.items);
        });
    };

    $scope.remove = function (index, id) {
        itemService.removeItems(id).then(function (response) {
            $scope.items.splice(index, 1);
        });
    };

    $scope.save = function (newItem) {
        itemService.saveItems(newItem);
    };
    $scope.showForm = function () {
        $scope.message = "Show Form Button Clicked";
        console.log($scope.message);
        var modalInstance = $uibModal.open({
            templateUrl: "add-item-modal.html",
            controller: "itemModalInstanceController",
            scope: $scope,
            resolve: {
                itemForm: function () {
                    return $scope.itemForm;
                }
            }
        });

        modalInstance.result
            .then(function (newItem) {
                return itemService.postItems(newItem)
            })
            .then(function (newItem) {
                newItem.map = {
                    center: {
                        latitude: newItem.place.lat,
                        longitude: newItem.place.lng
                    },
                    zoom: 14
                };
                newItem.options = {
                    maxZoom: 14
                };

                newItem.marker = {
                    id: newItem._id,
                    coords: {
                        latitude: newItem.place.lat,
                        longitude: newItem.place.lng
                    },
                    window: {
                        title: newItem.place.name
                    }
                }
                console.log(newItem);
                $scope.items.push(newItem);
                // Create the google map
                //				createMap(config);

                // Place markers on the map
                //				setMarkers(newItem.place);
            })
    };

    //	function createMap(config) {
    //		$scope.map = config;
    //	};
    //
    //	$scope.markers = [];
    //
    //	function setMarkers(newItemPlace) {
    //		$scope.markers.push({
    //			id: $scope.markers.length + 1,
    //			coords: {
    //				latitude: newItemPlace.lat,
    //				longitude: newItemPlace.lng
    //			},
    //			window: {
    //				title: newItemPlace.name
    //			}
    //		});
    //		console.log($scope.markers);
    //	};
}]);

//			$scope.createEvent = function (item) {
//				console.log($scope.items);
//				mapService.getMapinfo(item.location.name).then(function (mapData) {
//						item.location.lat = mapData.results[0].geometry.location.lat;
//						item.location.lng = mapData.results[0].geometry.location.lng;
//						setMarkers(mapData.results[0]);
//
//						var config = {
//							center: {
//								latitude: mapData.results[0].geometry.location.lat,
//								longitude: mapResult.results[0].geometry.location.lng
//							},
//							zoom:14
//						}
//						createMap(config);
//						return item;
//				})

// map part ends
