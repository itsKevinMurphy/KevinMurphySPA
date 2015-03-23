// routes ======================================================================
//load the models===============================================================
var Patient = require('./patient.js');
var User = require('./user.js');
var FeedEntry = require('./feeds/feedEntrySchema.js');
var UserFeedEntry = require('./feeds/userFeedEntrySchema.js');
var Feed = require('./feeds/feedSchema.js');
var Chat = require('./chats/chat.js');
// Patients api ----------------------------------------------------------------------------------------------------
// get patients=================================================================

module.exports = function (app, mongoose, stormpath) {
    app.get('/api/patients', function (req, res) {
        console.log('Get patients in routes');
        // use mongoose to get all patients in the database
        Patient.find(function (err, patients) {
            console.log('Patients retrieved from MongoDB using Mongoose');
            console.log(patients);
            // if there is an error retrieving, send the error. nothing after response.send(err) will execute
            if (err) {
                res.send(err)
                console.log('error finding patients');
            }
            res.json(patients); // return all patients in JSON format
        });

    });
    
    //Create patients=================================================================
    // create patient and send back all patients after creation
    app.post('/api/patients', function (req, res) {
        console.log('App create patient post through routes');
        // create a patient, information comes from AJAX request from Angular
        var patient = new Patient();
       
        patient.firstName = req.body.firstName; 
        patient.lastName = req.body.lastName; 
        patient.phoneNo = req.body.phoneNo; 
        patient.lastVisitDate = req.body.lastVisitDate;
        patient.status = true;

         patient.save(function (err) {
            if (err)
                res.send(err);
            
            // get and return all the patients after you create another
            Patient.find(function (err, patients) {
                if (err)
                    res.send(err)
                res.json(patients);
            });
        });

    });
    //Update patients=================================================================
    // Update patient and send back all patients after update
    app.put('/api/patients', function (req, res) {
        console.log('App Update patient post through routes');
        // Update a patient, information comes from AJAX request from Angular
        patient.firstName = req.body.firstName;
        patient.lastName = req.body.lastName;
        patient.phoneNo = req.body.phoneNo;
        patient.lastVisitDate = req.body.lastVisitDate;
        patient.status = true;

        patient.save(function (err) {
            if (err)
                res.send(err);
            
            // get and return all the patients after you create another
            Patient.find(function (err, patients) {
                if (err)
                    res.send(err)
                res.json(patients);
            });
        });

    });
    // delete a patient============================================================================
    app.delete('/api/patients/:patient_id', function (req, res) {
        console.log('app delete in routes');
        Patient.remove({_id : req.params.patient_id
        }, function (err, patient) {
            if (err)
                res.send(err);
            
            // get and return all the patients after you remove one
            Patient.find(function (err, patients) {
                if (err)
                    res.send(err)
                res.json(patients);
            });
        });
        

    app.get('*', function (req, res) {
        res.sendfile('./Public/index.html'); // load our public/index.html file
        });
    });
};
// Feed api -----------------------------------------------------------------------------------------------------------
exports.addAPIRouter = function (app, mongoose, stormpath) {

    app.get('/*', function (req, res, next) {
        res.contentType('application/json');
        next();
    });

    app.post('/*', function (req, res, next) {
        res.contentType('application/json');
        next();
    });

    app.put('/*', function (req, res, next) {
        res.contentType('application/json');
        next();
    });

    app.delete('/*', function (req, res, next) {
        res.contentType('application/json');
        next();
    });
};

