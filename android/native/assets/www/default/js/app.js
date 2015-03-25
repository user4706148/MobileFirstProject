
/* JavaScript content from js/app.js in folder common */
// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js

angular.module('starter', ['ionic', 'starter.controllers'])

.config(function($stateProvider, $urlRouterProvider) {
  
	openFB.init({appId: '1605329239686097'});
	
	$stateProvider

  .state('app', {
    url: "/app",
    abstract: true,
    templateUrl: "templates/menu.html",
    controller: 'AppCtrl'
  })
  
  .state('app.profile', {
	url: "/profile",
	views: {
	  'menuContent' :{
        templateUrl: "templates/profile.html",
        controller: "ProfileCtrl"
	  }
	}
  })
  
  .state('app.post', {
	url: "/post",
	views: {
	  'menuContent' :{
        templateUrl: "templates/post.html",
        controller: "PostCtrl"
	  }
	}
  })

  .state('app.todolist', {
		url: "/todolist",
		views: {
			'menuContent': {
				templateUrl: "templates/todolist.html",
				controller: "ToDoListCtrl"
			}
		}
	})
			
  .state('app.sessions', {
	url: "/sessions",
	views: {
      'menuContent': {
        templateUrl: "templates/sessions.html",
        controller: 'SessionsCtrl'
      }
	}
  })

  .state('app.session', {
      
	url: "/sessions/:sessionId",
    views: {
      'menuContent': {
        templateUrl: "templates/session.html",
        controller: 'SessionCtrl'
      }
    }
  })
    
  .state('app.speakers', {
	url: "/speakers",
	views: {
      'menuContent': {
        templateUrl: "templates/speakers.html",
        controller: 'SpeakersCtrl'
      }
	}
  }) 
 
  .state('app.speaker', {
    url: "/speakers/:speakerId",
    views: {
      'menuContent': {
        templateUrl: "templates/speaker.html",
        controller: 'SpeakerCtrl'
      }
    } 
  })
  
  .state('app.sessiontwitterfeed', {
    url: "/sessions/:sessionId/twitterfeed",
	views: {
	  'menuContent': {
		templateUrl: "templates/sessiontwitterfeed.html",
		controller: "SessionTwitterFeedCtrl"
	  }
	}
  })	
  
  .state('app.speakertwitterfeed', {
    url: "/speakers/:speakerId/twitterfeed",
	views: {
	  'menuContent': {
		templateUrl: "templates/speakertwitterfeed.html",
		controller: "SpeakerTwitterFeedCtrl"
	  }
	}
  });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/sessions');
});