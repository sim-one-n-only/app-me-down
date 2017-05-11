var app = angular.module("appMeDown");

app.service("itemService", ["$http", function ($http) {
    this.getItems = function () {
        return $http.get("/api/items").then(function (response) {
            return response.data;
        }, function (response) {
            alert("Error " + response.status + ": " + response.statusText);
        });
    };

    this.getUsersItems = function () {
        return $http.get("/api/items?user=currentUser").then(function (response) {
            return response.data;
        }, function (response) {
            alert("Error " + response.status + ": " + response.statusText);
        });
    };

    this.postItems = function(newItem) {
        return $http.post("/api/items/",newItem).then(function(response){
            return response.data;
        });
    };

    this.removeItems = function(id) {
        return $http.delete("/api/items/" + id).then(function(response){
            return "you item has been deleted"
        });
    };

    this.editItems = function (item) {
        return $http.put("/api/items/" + item._id, item).then(function (response) {
            return response.data;
        }, function (response) {
            alert("Error " + response.status + ": " + response.statusText);
        });
    };

    this.getFavorites = function () {
        return $http.get("/api/items?favorite=true").then(function (response) {
            console.log(response.data);
            return response.data;
        }, function (response) {
            alert("Error " + response.status + ": " + response.statusText);
        });
    };

}]);/**
 * Created by sim_one_n_only on 5/8/17.
 */
