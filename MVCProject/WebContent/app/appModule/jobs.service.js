angular.module('appModule')
.factory('jobsService', function($http, $filter, authService, $location) {
  var service = {};

  var jobs = [];

  var checkLogin = function(user) {
	  var user = authService.getToken()
	  if (!user) {
		  $location.path('/');
		  return;
	  }
	  else {
		  return user;
	  }
  }
  
  service.index = function() {
	  var user = checkLogin();
	  if (!user) return;
	  return $http({
		  method : 'GET',
		  url : 'rest/user/' + user.id + '/jobs'
	  });
  };
  
  service.show = function(id) {
	  var user = checkLogin();
	  
	  if (!user) return;
	  return $http({
		  method : 'GET',
		  url : 'rest/user/' + user.id + '/jobs/' + id //do we need the id of the job after /jobs/ since it's passed in?
	  });
  };
  
  service.create = function(job) {
	  var user = checkLogin();
	  if (!user) return;
	  job.createdDate = $filter('date')(Date.now(), 'yyyy-MM-dd');
	  console.log(job.createdDate);
	  job.active = 1;
	  job.user = user;
	  return $http({
			method : 'POST',
			url : 'rest/user/' + user.id + '/jobs',
			headers : {
				'Content-Type' : 'application/json'
			},
			data : job
		})
	};
	
	service.destroy = function(jobId) {
		var user = checkLogin();
		console.log(jobId);
		  if (!user) return;
			return $http({
				method : 'DELETE',
				url : 'rest/user/' + user.id + '/jobs/' + jobId
			});
		}
	
	service.update = function(jobs) {
		var user = checkLogin();
		if (user) {
			if(jobs.active) {
			jobs.lastUpdate = $filter('date')(Date.now(), 'yyyy-MM-dd');
			}
			console.log(jobs);
			return $http({
				method : 'PUT',
				url : 'rest/user/' + user.id + '/jobs/' + jobs.id,
				headers : {
					'Content-Type' : 'application/json'
				},
				data : jobs
				
			})
		}
	}
  return service;
})