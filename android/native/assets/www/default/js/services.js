
/* JavaScript content from js/services.js in folder common */
angular.module('starter.services', ['ngResource'])

//change to your network ip address in order to access your app using your phone

.factory('Session', function ($resource) {
    return $resource('http://137.57.102.4:5000/sessions/:sessionId');
})

.factory('Speaker', function ($resource) {
    return $resource('http://137.57.102.4:5000/speakers/:speakerId');
}); 