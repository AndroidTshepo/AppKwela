angular.module('user.services', [])

    .service('UserService', ['$q', 'ParseConfiguration',
        function ($q, ParseConfiguration) {

            var parseInitialized = false;


            return {

                /**
                 *
                 * @returns {*}
                 */
                init: function () {
                    //debugger;
                    // if initialized, then return the activeUser
                    if (parseInitialized === false) {
                        Parse.initialize(ParseConfiguration.applicationId, ParseConfiguration.javascriptKey);
                        parseInitialized = true;
                        console.log("parse initialized in init function");
                    }

                    var currentUser = Parse.User.current();
                    if (currentUser) {
                        return $q.when(currentUser);
                    } else {
                        return $q.reject({error: "noUser"});
                    }

                },
                /**
                 *
                 * @param _userParams
                 */
                createfeedBack: function (feedbackParams) {
                    var feedbackObject = Parse.Object.extend("feedback");
                    var feedback = new feedbackObject();
                    feedback.set("Email", feedbackParams.useremail);
                    feedback.set("Message", feedbackParams.message);
                    feedback.set("TaxiRegistration", feedbackParams.plateNumber);
                    feedback.set("Complaint", feedbackParams.complaint);
                    feedback.save(null, {});
                },


               //Getting feedback from the database
                getfeedback: function (feedback) {

                    var result = $q.defer();
                    var resultArr = [];
                    var query = new Parse.Query('feedback');
                    //send a request to parse here
                    query.find({
                        success: function (results) {
                            //When the data is found
                            for (var i in results) {
                                resultArr.push({email : results[i].get("Email"),
                                    message: results[i].get("Message"),
                                    registration: results[i].get("TaxiRegistration"),
                                    complaint: results[i].get("Complaint")
                                });
                            }
                            result.resolve(resultArr);
                            
                        }, error: function (error) {
                            //When parse could  not find data
                            console.log("Query Error:" + error.message);
                        }
                    });

                    return result.promise;
                },


                //Getiing the taxi fare here
                getTaxiFare: function(addRoute){
                    var result = $q.defer();
                    var resultArr = [];
                    var query = new Parse.Query('addRoute');
                    //send a request to parse here
                    query.find({
                        success: function (results) {
                            //When the data is found
                            for (var i in results) {
                                resultArr.push({destination : results[i].get("destination"),
                                    startPoint: results[i].get("startPoint"),
                                    taxiFare: results[i].get("taxiFare"),

                                });
                            }
                            result.resolve(resultArr);

                        }, error: function (error) {
                            //When parse could  not find data
                            console.log("Query Error:" + error.message);
                        }
                    });
                    return result.promise;
                },




                getAssociation: function (Associations){
                    //initialising Variables
                    var result = $q.defer();
                    var resultArray = [];
                    var query = new Parse.Query('Associations');
                    
                    query.find({
                        success: function(results){
                            for (var x in results){
                                resultArray.push({AssocName : results[x].get("AssocName"),
                                    Location : results[x].get("AssocLocation")
                                });
                            }
                            result.resolve(resultArray);
                        }, error: function(error){
                            //when parse cannot find required data
                            console.log("Query Error: " + error.message);
                        }
                    });
                    
                    return result.promise;
                },
                
                getTaxiRoutes: function (){
                    var result = $q.defer();
                    var resultArr = [];
                    var routeQuery = new Parse.Query('addRoute');
                    
                    routeQuery.find({
                        success: function(results){
                            for (var v in results){
                                resultArr.push({Origin : results[v].get("startPoint"),
                                    Destination : results[v].get("destination")
                                });
                            }
                            result.resolve(resultArr);
                        }, error : function(error){
                            console.log("Query Error: " + error.message);
                        }
                    });
                    
                    return result.promise;
                },


                addNewTaxi: function (taxiListParams) {
                    //cosole.log("Taxi Registration : " + taxiListParams.taxiReg +" Association  : " + taxiListParams.assoc);
                    var taxiListObject = Parse.Object.extend("taxiList");
                    var taxiList = new taxiListObject();
                    taxiList.set("Taxi_Plate", taxiListParams.taxiReg);
                    taxiList.set("Association", taxiListParams.assoc);
                    taxiList.save(null, {});
                },



                
                //Add route service factory
                addTaxiRoute: function (addRouteParams){
                    var addRoute = Parse.Object.extend("addRoute");
                    var addRoute = new addRoute();
                    addRoute.set("startPoint", addRouteParams.startPoint);
                    addRoute.set("destination", addRouteParams.destination);
                    addRoute.set("taxiFare", addRouteParams.taxiFare);
                    addRoute.save(null, {});
                    
                },

                //Creating a user here
                createUser: function (_userParams) {

                    var user = new Parse.User();
                    user.set("username", _userParams.email);
                    user.set("password", _userParams.password);
                    user.set("email", _userParams.email);
                    user.set("first_name", _userParams.first_name);
                    user.set("last_name", _userParams.last_name);

                    // should return a promise
                    return user.signUp(null, {});

                },

                currentUser: function (_parseInitUser) {

                    // if there is no user passed in, see if there is already an
                    // active user that can be utilized
                    _parseInitUser = _parseInitUser ? _parseInitUser : Parse.User.current();

                    console.log("_parseInitUser " + Parse.User.current());
                    if (!_parseInitUser) {
                        return $q.reject({error: "noUser"});
                    } else {
                        return $q.when(_parseInitUser);
                    }
                },

                login: function (_user, _password) {
                    return Parse.User.logIn(_user, _password);
                },
                /**
                 *
                 * @returns {Promise}
                 */
                logout: function (_callback) {
                    var defered = $q.defer();
                    Parse.User.logOut();
                    defered.resolve();
                    return defered.promise;

                }

            }
        }]);
