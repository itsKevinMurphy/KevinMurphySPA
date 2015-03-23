angular.module('patientController', [])
    .controller('mainController', function ($scope, $http, Patients) {
  $scope.patientData = {};
    
// GET =======================================================================================================
    Patients.get()
    .success(function (data) {
        $scope.patients = data;
        console.log('Hello Kevin! Get in Main.');
    }).error(function (data) {
        console.log('Error: ' + data);
    });

// CREATE ======================================================================================================
    // when submitting the add patient form, send the text to the node API
    $scope.createPatient = function () {
        console.log('Create Patient Called in main.js')
        var validNo, validLet;
        var confirmAdd;
        var phoneno = $scope.patientData.phoneNo; console.log('Phone: ' + phoneno);
        var fname = $scope.patientData.firstName; console.log('First Name: ' + fname);
        var lname = $scope.patientData.lastName; console.log('Last Name: ' + lname);
//Validating that names contain only letters--------------------------------------------------------------------
        function allLetter(fname, lname) {
            console.log('First Name in validation: ' + fname);
            console.log('Last Name in validation: ' + lname); 
            var letters = /^[A-Za-z]+$/;
            if (fname.match(letters)&&lname.match(letters)) {
                validLet = true;
                console.log('Name Validation: ' + validLet);
            }  
            else {
                alert("HEY!!! Thats not a valid name....\nLetters Only Son. And no spaces");
                validLet = false;
                console.log('Name Validation: ' + validLet);
            }
        }  
//Validating phone numbers-----------------------------------------------------------------------------------------           
        function phonenumber() {
            console.log('Phone number in validation: ' + phoneno);
            var phoneNo = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
            if (phoneno.match(phoneNo)) {
                validNo = true;
                console.log('Phone Validated: ' + validNo);
            }  
            else {
                validNo = false;
                console.log('Phone Validated: ' + validNo);
                alert("Not a valid Phone Number");
            }
        }

        phonenumber(phoneno);
        allLetter(fname, lname);
        if (validNo==true && validLet==true) { 
        if(confirm("Are you sure?") == true) {confirmAdd = true;} else {confirmAdd = false;};//Verify Add patient
        }

        // if create patient form is empty, nothing will happen
			if ($scope.patientData.firstName != undefined && $scope.patientData.lastName != undefined && $scope.patientData.phoneNo != undefined && confirmAdd == true) {

				// call the create function from our service (returns a promise object)
				Patients.create($scope.patientData)

					// if successful creation, call our get function to get all the new ptients
					.success(function (data) {                                                                                                                                                                                                                                                                
						$scope.patientData = {}; // clear the form so our user is ready to enter another
						$scope.patients = data; // assign our new list of patients
					});
			}
		};
    
    //Update  ==================================================================
    // when submitting the add form, send the text to the node API
    
    $scope.updatePatient = function (patient) {
        console.log('Update Patient Called in main.js');
        console.log(patient);
        // if form is empty, nothing will happen
        if (patient != undefined) {
            console.log('Update Patient passed if in main.js');
            // call the create function from our service (returns a promise object)
            Patients.update(patient)

					// if successful creation, call our get function to get all the new ptients
					.success(function (data) {
                $scope.patient = {}; // clear the form so our user is ready to enter another
                $scope.patients = data; // assign our new list of patients
            });
        }
    };
    // DELETE ==================================================================
    // delete a patient
    $scope.deletePatient = function (id) {
        if (confirm("Are you sure?") == true) { confirmDelete = true; } else { confirmDelete = false; };//Verify Delete patient
        console.log('Create Patient Called in main.js')
        if (confirmDelete == true) {
            console.log('Delete Patient Called Main, ID: ' + id + ' Removed')
            $http.delete('/api/patients/' + id)
                        .success(function (data) {
                $scope.patients = data;
            })
                        .error(function (data) {
                console.log('Error: ' + data);
            
            });
        };
    };

    // Message============================================================================================
    //message a patient
    $scope.messagePatient = function (id, name) { 
        
    };
});

