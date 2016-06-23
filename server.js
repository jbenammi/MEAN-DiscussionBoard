var express = require('express');
app = express();
path = require('path');
bodyParser = require('body-parser');
mongoose = require('mongoose');
deepPopulate = require('mongoose-deep-populate')(mongoose)

app.use(express.static(path.join(__dirname, '/client')));
app.use(bodyParser.json());

require('./server/config/mongoose.js');
require('./server/config/routes.js')(app);

app.listen(5050, function(){
	console.log('now working on port 5050');
})
