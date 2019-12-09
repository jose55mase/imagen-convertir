const sql = require('mssql');

const config = {
        // Old connection
   // server: '204.141.52.148',
   // user: 'MachineBaseConnect3651',
   // password: 'H1#KotS(xh5nF+tGv',
   // database: 'DBKiero_Productos'
   
        // New Connection
    server: '190.85.232.137',
    user: 'SA',
    password: 'f3N1xK13ro.136',
    database: 'DBKiero_Productos'
};

sql.connect(config, function (err) {
    if (err) {
        console.error('Error connecting: ' + err.stack);
        return;
    }
    console.log('Connection established');
});

module.exports = sql;