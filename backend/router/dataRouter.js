const dataRouter = require('express').Router();
const { getResults, addResultController,getMockTests,getTestQuestions ,getAllRoles,addRole,deleteRole,addQuestion
,deleteResult
} = require('../controller/dataController');

dataRouter.get('/getresults/:email', getResults);
dataRouter.post('/addresult', addResultController);
dataRouter.get('/getmocktests', getMockTests);
dataRouter.get('/gettestquestions/:fileName', getTestQuestions);
dataRouter.get('/getallroles',getAllRoles);
dataRouter.post("/addrole", addRole);
dataRouter.delete("/deleterole/:id", deleteRole);
dataRouter.post("/addquestion", addQuestion);
dataRouter.delete("/deleteresult/:id", deleteResult);
module.exports = dataRouter;