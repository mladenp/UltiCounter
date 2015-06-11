angular.module('starter.services', ['starter.config', 'starter.services'])

    .factory('DB', function ($q, $http, DB_CONFIG) {

        var self = this;

        self.db = null;

        self.db_open =function(){
            var def = $q.defer();
            try{
                if(window.sqlitePlugin){
                    self.db = window.sqlitePlugin.openDatabase({name: DB_CONFIG.name, bgType: 1},function(){
                        def.resolve(true);
                    });
                } else {
                    def.reject();
                }
            }catch(e){
                def.reject(e);
            }
            return def.promise;
        };

        self.init = function () {
            var def = $q.defer();
            self.db_open().then(function() {
                angular.forEach(DB_CONFIG.tables, function (table) {
                    var columns = [];
                    angular.forEach(table.columns, function (column) {
                        columns.push(column.name + ' ' + column.type);
                    });

                    var query = 'CREATE TABLE IF NOT EXISTS ' + table.name + ' (' + columns.join(',') + ')';
                    self.query(query);
                });
                def.resolve();
            });
            return def.promise;
        };

        self.drop_table = function (tableName) {

            if(tableName){
                //var query = 'DROP TABLE ' + tableName ;
                var query = 'DELETE * FROM ' + tableName;
                self.query(query);
            }else{
                // Drop all tables
                angular.forEach(DB_CONFIG.tables, function (table) {
                    var query = 'DROP TABLE ' + table.name;
                    self.query(query);
                });
            }

        };

        self.query = function (query, bindings) {
            bindings = typeof bindings !== 'undefined' ? bindings : [];
            var deferred = $q.defer();

            self.db.transaction(function (transaction) {
                transaction.executeSql(query, bindings, function (transaction, result) {
                    deferred.resolve(result);
                }, function (transaction, error) {
                    deferred.reject(error);
                });
            });

            return deferred.promise;
        };

        self.fetchAll = function (result) {
            var output = [];
            for (var i = 0; i < result.rows.length; i++) {
                output.push(result.rows.item(i));
            }
            return output;
        };

        self.fetch = function (result) {
            return result.rows.item(0);
        };


        return self;
    })

    .factory('NewCounter', function(DB){

        var self = this;

        self.create = function(cntObj){
            console.log(cntObj);
            return DB.query('INSERT OR REPLACE INTO counters (name, initial_value, max_value, increment, date_created) VALUES ()',
                [cntObj.name, cntObj.initial, cntObj.maxValue, cntObj.increment, cntObj.location, cntObj.sound, cntObj.vibration]);
        }

        return self;
    })

    .factory('UCounter', function(){

    });

