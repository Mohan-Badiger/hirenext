
const path = require('path');
const fs = require('fs');
const {
  createResultTable,
  addResult,
  getResultsByEmail,
  deleteResultByIdAndEmail
  
} = require('../models/Result');
createResultTable();
const {getUserByEmail}=require("../models/User");

const getResults=async (req, res) => {
  console.log("inside get results controller");
  try {
    const { email } = req.params;
    console.log(email);

    const results = await getResultsByEmail(email);
    console.log("Results fetched:", results);
       console.log(results);
    if (results.length === 0) {
      return res.status(404).json({ message: 'No results found for this email' });
    }

    res.status(200).json({ email, results });
  } catch (error) {
    console.error('Error fetching results:', error.message);
    res.status(500).json({ error: 'Server error' });
  }

}

const addResultController = async (req, res) => {
  try {
    const { userID, testID, testScore } = req.body;
    console.log(req.body);
    console.log("hello")
    console.log(userID, testID, testScore)
    if (userID==null || testID==null || testScore==null) {
      return res.status(400).json({ error: 'All fields (userID, testID, testScore) are required' });
    }

    const result = await addResult(userID, testID, testScore);
  
    res.status(201).json({ message: 'Result added successfully', result });
  } catch (error) {
    console.error('Error inserting result:', error.message);
    res.status(500).json({ error: 'Server error' });
  }

}

const deleteResult = async (req, res) => {
  const { id } = req.params;
  const { email } = req.body;

  console.log("DELETE result hit:", id, email);

  if (!email) {
    return res.status(404).json({ error: "Email is required" }); // FIXED
  }

  try {
    const result = await deleteResultByIdAndEmail(id, email);
    console.log("Delete result response:", result);
    if (!result.success) {
      return res.status(406).json({ error: result.message });
    }

    return res.json({
      message: "Result deleted successfully",
      deleted: result.deleted,
    });
  } catch (err) {
    console.error("❌ DELETE result error:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
};



const getMockTests = async (req, res) => {
  try {
    // Await the import
    const mockTests = await require('../Data/tests/tests.json', {
      assert: { type: 'json' }
    });

   
    console.log(module);
    if (!mockTests) {
      return res.status(404).json({ message: 'No mock tests found' });
    }

    return res.status(200).json(mockTests);

  } catch (error) {
    console.error('Error fetching mock tests:', error.message);
    return res.status(500).json({ error: 'Server error' });
  }
};

const getTestQuestions = async (req, res) => {
  console.log("inside get test questions");
  try {
    console.log(req.params);
    const {fileName} = req.params;
    const testQuestions = await require(`../Data/mockTestQA/${fileName}.json`, {
      assert: { type: 'json' }
    });
    if (!testQuestions) {
      return res.status(404).json({ message: 'No test questions found' });
    }
    return res.status(200).json(testQuestions);
  } catch (error) {
    console.error('Error fetching test questions:', error.message);
    return res.status(500).json({ error: 'Server error' });
  }
};

const getAllRoles=async(req,res)=>{
   try{
    const allRoles=await require("../Data/tests/tests.json",{assert:{type:"json"}});
    if(!allRoles){
      return res.status(404).json({message:"No roles found"});
    }
    return res.status(200).json(allRoles);
   }catch(error){
    console.error('Error fetching roles:', error.message);
    return res.status(500).json({ error: 'Server error' });
   }
}


const addRole= async(req, res) => {
  const { title, company, logo } = req.body;

  const rolesPath = path.join(process.cwd(), "Data","tests", "tests.json");
  const mockTestFolder = path.join(process.cwd(), "Data", "mockTestQA");

  // 1. READ existing roles file
  const fileData = fs.readFileSync(rolesPath, "utf-8");
  const roles = JSON.parse(fileData);

  // 2. AUTO-INCREMENT ID
  const newId = roles.length > 0 ? roles[roles.length - 1].id + 1 : 1;

  // 3. Create new role object
  const newRole = { id: newId, title, company, logo };

  roles.push(newRole);


  fs.writeFileSync(rolesPath, JSON.stringify(roles, null, 2));

  
  const safeFileName = title.replace(/ /g, "_") + ".json";

  const newTestFilePath = path.join(mockTestFolder, safeFileName);

  
  const testTemplate = {
   "novice": [],
   "easy": [],
   "intermediate": [],
   "master": [],
    "expert": []

  };


  // 8. Save the new mock test file
  fs.writeFileSync(newTestFilePath, JSON.stringify(testTemplate, null, 2));

  return res.json({
    message: "Role added and test file created successfully",
    newRole,
    fileCreated: safeFileName
  });
};

const deleteRole = async (req, res) => {
  console.log("DELETE hit:", req.params.id);

  const id = parseInt(req.params.id);

  try {
    console.log("Deleting role with ID:", id);

    // Path to roles file
    const filePath = path.join(__dirname, "../Data/tests/tests.json");
    const jsonString = fs.readFileSync(filePath, "utf8");
    const roles = JSON.parse(jsonString);

    // Find the role before deleting (for filename)
    const roleToDelete = roles.find((r) => r.id === id);
    if (!roleToDelete) {
      return res.status(404).json({ error: "Role not found" });
    }

    const roleTitle = roleToDelete.title;
    console.log("Role title:", roleTitle);

    // Remove from roles array
    const updated = roles.filter((r) => r.id !== id);

    // Save updated list
    fs.writeFileSync(filePath, JSON.stringify(updated, null, 2));

 
    const safeFileName = roleTitle.replace(/ /g, "_") + ".json";

    const testFilePath = path.join(__dirname, "../Data/mockTestQA", safeFileName);

    if (fs.existsSync(testFilePath)) {
      fs.unlinkSync(testFilePath);
      console.log("Deleted test file:", safeFileName);
    } else {
      console.log("Test file not found:", safeFileName);
    }

    return res.json({
      success: true,
      message: "Role and its test file deleted successfully",
    });

  } catch (err) {
    console.error("Delete error:", err);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};



const addQuestion = async (req, res) => {
  console.log("ADD QUESTION hit");
  try {
    const { title, difficulty, questions } = req.body;

    if (!title || !difficulty || !questions) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    console.log("Adding question to:", title, difficulty, questions);
    const newQuestion = questions[0];

    // Convert title -> filename
    const safeFileName = title.replace(/ /g, "_") + ".json";

    const filePath = path.join(__dirname, "../Data/mockTestQA", safeFileName);

    // Check file exists
    if (!fs.existsSync(filePath)) {
      return res.status(404).json({ error: "Test file not found" });
    }

    // Read existing test file
    const existingData = JSON.parse(fs.readFileSync(filePath, "utf8"));

    if (!existingData[difficulty]) {
      return res.status(400).json({ error: "Invalid difficulty level" });
    }

    // Get correct difficulty array
    const diffArray = existingData[difficulty];

    // Auto-increment question ID
    let newId = 1;
    if (diffArray.length > 0) {
      newId = diffArray[diffArray.length - 1].id + 1;
    }

    // Final new question object
    const formattedQuestion = {
      id: newId,
      question: newQuestion.question,
      options: newQuestion.options,
      correctAnswer: newQuestion.correctAnswer
    };

    // Push to that difficulty level
    diffArray.push(formattedQuestion);

    // Save updated JSON
    fs.writeFileSync(filePath, JSON.stringify(existingData, null, 2));

    return res.json({
      success: true,
      message: "Question added successfully",
      addedQuestion: formattedQuestion
    });

  } catch (err) {
    console.error("Error adding question:", err);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};



module.exports={getResults,addResultController,getMockTests,getTestQuestions,getAllRoles,addRole,deleteRole, addQuestion,
deleteResult
};