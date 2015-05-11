angular.module('starter.config', [])
    .constant('DB_CONFIG', {
        name: 'ultiCounter',
        tables: [
            {
                name: 'counters',
                columns: [
                    {name: 'id', type: 'integer primary key'}, // Unique ID of counter
                    {name: 'name', type: 'text'}, // Descriptiv name
                    {name: 'initial_value', type: 'integer'}, // Starting value of counter (default 0)
                    {name: 'max_value', type: 'integer'}, // Maximum allowed value
                    {name: 'increment', type: 'integer'}, // By how much to increment
                    {name: 'date_created', type: 'integer'}, // Date when counter is first created
                    {name: 'location', type: 'boolean'}, // Should counter log GPS location ?
                    {name: 'color', type: 'text'}, // Counter color
                    {name: 'sound', type: 'boolean'}, // Should counting make sound ?
                    {name: 'vibrate', type: 'boolean'}, // Should vibrate on count ?
                ]
            },

            {
                name: 'counter_values',
                columns: [
                    {name: 'id', type: 'integer primary key'},
                    {name: 'value', type: 'integer'},
                    {name: 'timestamp_updated', type: 'integer'},
                    {name: 'lat', type: 'real'},
                    {name: 'lng', type: 'real'}
                ]
            },

            {
                name: 'user',
                columns: [
                    {name: 'id', type: 'integer primary key'}, // Randomly generated User ID
                    {name: 'date_created', type: 'integer'} // Date when user first started app
                ]
            }

        ]
    });
