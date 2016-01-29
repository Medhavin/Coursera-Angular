'use strict';

angular.module('confusionApp')

        .controller('MenuController', ['$scope', 'menuFactory', function($scope, menuFactory) {
            
            $scope.tab = 1;
            $scope.filtText = '';
            $scope.showDetails = false;
            $scope.showMenu = false;
            $scope.message = "Loading ...";

            $scope.dishes = menuFactory.getDishes().query(
                    function(response) {
                        $scope.dishes = response;
                        $scope.showMenu = true;
                    },
                    function(response) {
                        $scope.message = "Error: "+response.status + " " + response.statusText;
                    }
                );

                        
            $scope.select = function(setTab) {
                $scope.tab = setTab;
                
                if (setTab === 2) {
                    $scope.filtText = "appetizer";
                }
                else if (setTab === 3) {
                    $scope.filtText = "mains";
                }
                else if (setTab === 4) {
                    $scope.filtText = "dessert";
                }
                else {
                    $scope.filtText = "";
                }
            };

            $scope.isSelected = function (checkTab) {
                return ($scope.tab === checkTab);
            };
    
            $scope.toggleDetails = function() {
                $scope.showDetails = !$scope.showDetails;
            };
        }])

        .controller('ContactController', ['$scope', function($scope) {

            $scope.feedback = {firstName:"", lastName:"", tel: {areaCode:"", number:""}, email:"", agree:false, mychannel:"", comments:""};
            
            var channels = [{value:"tel", label:"Tel."}, {value:"Email",label:"Email"}];
            
            $scope.channels = channels;
            $scope.invalidChannelSelection = false;
                        
        }])

        .controller('FeedbackController', ['$scope', 'feedbackFactory', function($scope, feedbackFactory) {
            
            $scope.sendFeedback = function() {
                
                if ($scope.feedback.agree && ($scope.feedback.mychannel === "")) {
                    $scope.invalidChannelSelection = true;
                    console.log('incorrect');
                }
                else {
                    // console.log(feedbackFactory.getFeedbacks().query());
                    // console.log($scope.feedback);
                    feedbackFactory.getFeedbacks().save($scope.feedback);
                    // console.log(feedbackFactory.getFeedbacks().query());

                    $scope.invalidChannelSelection = false;

                    // feedbackFactory.getFeedbacks.save($scope.feedback);

                    $scope.feedback = {firstName:"", lastName:"", tel: {areaCode:"", number:""}, email:"", agree:false, mychannel:"", comments:""};
                    $scope.feedbackForm.$setPristine();
                    // console.log($scope.feedback);
                }
            };
        }])

        .controller('DishDetailController', ['$scope', '$stateParams', 'menuFactory', function($scope, $stateParams, menuFactory) {

            $scope.showDish = false;
            $scope.message = "Loading ...";
            
            $scope.dish = menuFactory.getDishes().get({id:parseInt($stateParams.id,10)})

            .$promise.then(
                function(response){
                    $scope.dish = response;
                    $scope.showDish = true;
                },
                function(response){
                    $scope.message = "Error: "+response.status + " " + response.statusText;
                }

            );
            
        }])

        .controller('DishCommentController', ['$scope', 'menuFactory', function($scope, menuFactory) {
            
            $scope.feedback = {rating:5, comment:"", author:"", date:""};
            
            $scope.submitComment = function () {
                
                $scope.feedback.date = new Date().toISOString();
                console.log($scope.feedback);
                
                $scope.dish.comments.push($scope.feedback);

                menuFactory.getDishes().update({id:$scope.dish.id}, $scope.dish);
                
                $scope.commentForm.$setPristine();
                
                $scope.feedback = {rating:5, comment:"", author:"", date:""};
            };
        }])

        // implement the IndexController and About Controller here

        .controller('IndexController', ['$scope', 'menuFactory', 'corporateFactory', function($scope, menuFactory, corporateFactory) {

            $scope.showDish = false;
            $scope.message1 = "Loading ...";

            $scope.featureddish = menuFactory.getDishes().get({id:0})
            .$promise.then(
                function(response){
                    $scope.featureddish = response;
                    $scope.showDish = true;
                },
                function(response) {
                    $scope.message1 = "Error: "+response.status + " " + response.statusText;
                }
            );

            $scope.showPromotion = false;
            $scope.message2 = "Loading ...";

            $scope.monthspromotion = menuFactory.getPromotion().get({id:0})
            .$promise.then(
                function(response){
                    $scope.monthspromotion = response;
                    $scope.showPromotion = true;
                },
                function(response) {
                    $scope.message2 = "Error: "+response.status + " " + response.statusText;
                }
            );


            $scope.showChef = false;
            $scope.message3 = "Loading ...";

            $scope.executivechef = corporateFactory.getLeader().get({id:3})
            .$promise.then(
                function(response){
                    $scope.executivechef = response;
                    $scope.showChef = true;
                },
                function(response) {
                    $scope.message3 = "Error: "+response.status + " " + response.statusText;
                }
            );

        }])

        .controller('AboutController', ['$scope', 'corporateFactory', function($scope, corporateFactory) {

            $scope.showLeaders = false;
            $scope.message = "Loading ...";

            $scope.leadership = corporateFactory.getLeaders().query(
                function(response){
                    $scope.leadership = response;
                    $scope.showLeaders = true;
                },
                function(response) {
                    $scope.message = "Error: "+response.status + " " + response.statusText;
                }
            );           

            // $scope.leadership = corporateFactory.getLeaders();

        }])


;
