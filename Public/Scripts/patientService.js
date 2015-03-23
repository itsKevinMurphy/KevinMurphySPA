angular.module('patientService', [])

    .factory('Patients', function($http) {
    return {
        get : function () {
            console.log('Patient Service Get');
            return $http.get('/api/patients');
        },
        update : function (patient) {
            console.log('Patient Service Update');
            return $http.put('/api/patients/' + patient.id);
        },
        create : function (patientData) {
            console.log('Patient Service Create');
            return $http.post('/api/patients/', patientData);
        },
        delete : function (id) {
            console.log('Patient Service Delete');
            return $http.delete('/api/patients/' + id);
        }
    }
});