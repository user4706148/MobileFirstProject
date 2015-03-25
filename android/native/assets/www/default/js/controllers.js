
/* JavaScript content from js/controllers.js in folder common */
var pageReload = false;

angular.module('starter.controllers', ['starter.services'])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {
	  // Form data for the login modal
	  $scope.loginData = {};

	  // Create the login modal that we will use later
	  $ionicModal.fromTemplateUrl('templates/login.html', {
		scope: $scope
	  }).then(function(modal) {
	    $scope.modal = modal;
	  });

	  // Triggered in the login modal to close it
	  $scope.closeLogin = function() {
	    $scope.modal.hide();
	  };

	  // Open the login modal
	  $scope.login = function() {
	    $scope.modal.show();
	  };

	  // Perform the login action when the user submits the login form
	  $scope.doLogin = function() {
	    console.log('Doing login', $scope.loginData);

	    // Simulate a login delay. Remove this and replace with your login
	    // code if using a login system
	    $timeout(function() {
	      $scope.closeLogin();
	    }, 1000);
	  };
	  
	  $scope.fbLogin = function() {
	    openFB.login(
	        function(response) {
	            if (response.status === 'connected') {
	                console.log('Facebook login succeeded');
					alert('Facebook login succeeded');
	                $scope.closeLogin();
	            } else {
	                alert('Facebook login failed');
	            }
	        },
	        {scope: 'email,publish_actions'});
	  };
})

.controller('ProfileCtrl', function($scope) {
    openFB.api({
        path: '/me',
        params: {fields: 'id,name'},
        success: function(user) {
            $scope.$apply(function() {
                $scope.user = user;
            });
        },
        error: function(error) {
            //alert('Facebook error: ' + error.error_description);
			alert('Error: Please make sure that you have login with Facebook.');
        }
    });
})

.controller('PostCtrl', function ($scope) {
    $scope.item = {};
	$scope.post = function(event) {
		openFB.api({
			method: 'POST',
			path: '/me/feed',
			params: {message: $scope.item.message},
			success: function () {
				alert('This item has been successfully shared on Facebook.');
			},
			error: function () {
				alert('Error: Please make sure that you have login with Facebook.');
			}
		});
    };
	$scope.clear = function()
	{
		$scope.item.message = "";
	};
})

.controller('ToDoListCtrl', function($scope, $ionicModal){
    
	$scope.tasks = [
		{ title: 'Buy oranges', done:false },
		{ title: 'Do AngularJS tutorials', done:false },
		{ title: 'Work on Ionic framework tutorials', done:false },
		{ title: 'Get Twitter feeds', done:false }
	];

	// Create the add task modal that we will use later
	$ionicModal.fromTemplateUrl('templates/addtask.html', {
		scope: $scope
		}).then(function(modal) {
		$scope.modal = modal;
	});

	// Triggered in the add task modal to close it
	$scope.closeAddTask = function() {
	$scope.modal.hide();
	};

	// Open the add task modal
	$scope.addTask = function() {
	$scope.modal.show();
	};

	// Perform the add task action when the user submits the add task form
	$scope.doAddTask = function(task) {
		console.log('Doing add task', $scope.tasks);
		$scope.tasks.push({
			title: task.title, done:false
		});
		$scope.modal.hide();		
		task.title = "";
	
	};

	$scope.removeTask = function() {
        var oldList = $scope.tasks;
        $scope.tasks = [];
        angular.forEach(oldList, function(task) {
            if (!task.done) 
			{
				$scope.tasks.push(task);
			}
        });
		
    };
})

.controller('SessionsCtrl', function($scope, Session) {
   	$scope.sessions = Session.query();
})

.controller('SessionCtrl', function($scope, $stateParams, Session) {
    $scope.session = Session.get({sessionId: $stateParams.sessionId});
	
	$scope.share = function(event) {
      openFB.api({
        method: 'POST',
        path: '/me/feed',
        params: {
            message: "I'll be attending: '" + $scope.session.title + "' by " +
                $scope.session.speaker
        },
        success: function () {
            alert('The session was shared on Facebook');
        },
        error: function () {
            alert('An error occurred while sharing this session on Facebook');
        }
      });
    };
	
	$scope.refreshPage = function(){
		pageReload = true;
	};
})

.controller('SpeakersCtrl', function($scope, Speaker) {
    $scope.speakers = Speaker.query();
})

.controller('SpeakerCtrl', function($scope, $stateParams, Speaker) {
    $scope.speaker = Speaker.get({speakerId: $stateParams.speakerId});
	
	$scope.share = function(event) {
      openFB.api({
        method: 'POST',
        path: '/me/feed',
        params: {
            message: $scope.speaker.name + "'s Biography: " + $scope.speaker.bio
        },
        success: function () {
            alert('The speaker was shared on Facebook');
        },
        error: function () {
            alert('An error occurred while sharing this speaker on Facebook');
        }
      });
    };
	
	$scope.refreshPage = function(){
		pageReload = true;
	};
})

.controller('SessionTwitterFeedCtrl', function($scope, $stateParams, Session) {
    if (pageReload == true){
		window.location.reload();
		pageReload = false;
	}
	
	$scope.session = Session.get({sessionId: $stateParams.sessionId});
		
	window.twttr = (function(d, s, id) {
		var js, fjs = d.getElementsByTagName(s)[0],
			t = window.twttr || {};
		if (d.getElementById(id)) 
			return;
		js = d.createElement(s);
		js.id = id;
		js.src = "https://platform.twitter.com/widgets.js";
		fjs.parentNode.insertBefore(js, fjs);
		t._e = [];
		t.ready = function(f) {
			t._e.push(f);
		};
		
		return t;  
	}
	 
	(document, "script", "twitter-wjs"));	
}) 

.controller('SpeakerTwitterFeedCtrl', function($scope, $stateParams, Speaker) {
    if (pageReload == true){
		window.location.reload();
		pageReload = false;
	}
    
	$scope.speaker = Speaker.get({speakerId: $stateParams.speakerId});	
	
	window.twttr = (function(d, s, id) {
		var js, fjs = d.getElementsByTagName(s)[0],
			t = window.twttr || {};
		if (d.getElementById(id)) 
			return;
		js = d.createElement(s);
		js.id = id;
		js.src = "https://platform.twitter.com/widgets.js";
		fjs.parentNode.insertBefore(js, fjs);
		t._e = [];
		t.ready = function(f) {
			t._e.push(f);
		};
		
		return t;  
	}
	 
	(document, "script", "twitter-wjs"));	
});
