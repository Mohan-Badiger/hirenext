const path = require('path');
const fs = require('fs');
const {
  createResultTable,
  addResult,
  getResultsByEmail,
  deleteResultByIdAndEmail
} = require('../models/Result');

createResultTable();
const { getUserByEmail } = require("../models/User");

const getResults = async (req, res) => {
  console.log("inside get results controller");
  try {
    // FIX: Decode the email from the URL parameter to handle special characters (@, .)
    const email = decodeURIComponent(req.params.email);
    console.log("Fetching results for:", email);

    const results = await getResultsByEmail(email);
    console.log("Results fetched count:", results.length);

    // CHANGE: Return 200 with empty array instead of 404. 
    // This stops the frontend console from showing a Red GET error for new users.
    if (!results || results.length === 0) {
      return res.status(200).json({ email, results: [], message: 'No results found' });
    }

    res.status(200).json({ email, results });
  } catch (error) {
    console.error('Error fetching results:', error.message);
    res.status(500).json({ error: 'Server error' });
  }
};

const addResultController = async (req, res) => {
  try {
    const { userID, testID, testScore } = req.body;
    if (userID == null || testID == null || testScore == null) {
      return res.status(400).json({ error: 'All fields (userID, testID, testScore) are required' });
    }

    const result = await addResult(userID, testID, testScore);
    res.status(201).json({ message: 'Result added successfully', result });
  } catch (error) {
    console.error('Error inserting result:', error.message);
    res.status(500).json({ error: 'Server error' });
  }
};

const deleteResult = async (req, res) => {
  const { id } = req.params;
  const { email } = req.body;

  console.log("DELETE result hit:", id, email);

  if (!email) {
    return res.status(400).json({ error: "Email is required" });
  }

  try {
    const result = await deleteResultByIdAndEmail(id, email);
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
    // Note: require is synchronous. For high performance, consider fs.promises.readFile
    const mockTests = require('../Data/tests/tests.json');

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
  try {
    const { fileName } = req.params;
    const testQuestions = require(`../Data/mockTestQA/${fileName}.json`);
    
    if (!testQuestions) {
      return res.status(404).json({ message: 'No test questions found' });
    }
    return res.status(200).json(testQuestions);
  } catch (error) {
    console.error('Error fetching test questions:', error.message);
    return res.status(500).json({ error: 'Server error' });
  }
};

const getAllRoles = async (req, res) => {
  try {
    const allRoles = require("../Data/tests/tests.json");
    if (!allRoles) {
      return res.status(404).json({ message: "No roles found" });
    }
    return res.status(200).json(allRoles);
  } catch (error) {
    console.error('Error fetching roles:', error.message);
    return res.status(500).json({ error: 'Server error' });
  }
};

const addRole = async (req, res) => {
  const { title, company, logo } = req.body;

  const rolesPath = path.join(process.cwd(), "Data", "tests", "tests.json");
  const mockTestFolder = path.join(process.cwd(), "Data", "mockTestQA");

  const fileData = fs.readFileSync(rolesPath, "utf-8");
  const roles = JSON.parse(fileData);

  const newId = roles.length > 0 ? roles[roles.length - 1].id + 1 : 1;
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

  fs.writeFileSync(newTestFilePath, JSON.stringify(testTemplate, null, 2));

  return res.json({
    message: "Role added and test file created successfully",
    newRole,
    fileCreated: safeFileName
  });
};

const deleteRole = async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    const filePath = path.join(__dirname, "../Data/tests/tests.json");
    const jsonString = fs.readFileSync(filePath, "utf8");
    const roles = JSON.parse(jsonString);

    const roleToDelete = roles.find((r) => r.id === id);
    if (!roleToDelete) {
      return res.status(404).json({ error: "Role not found" });
    }

    const roleTitle = roleToDelete.title;
    const updated = roles.filter((r) => r.id !== id);
    fs.writeFileSync(filePath, JSON.stringify(updated, null, 2));

    const safeFileName = roleTitle.replace(/ /g, "_") + ".json";
    const testFilePath = path.join(__dirname, "../Data/mockTestQA", safeFileName);

    if (fs.existsSync(testFilePath)) {
      fs.unlinkSync(testFilePath);
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
  try {
    const { title, difficulty, questions } = req.body;
    if (!title || !difficulty || !questions) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const newQuestion = questions[0];
    const safeFileName = title.replace(/ /g, "_") + ".json";
    const filePath = path.join(__dirname, "../Data/mockTestQA", safeFileName);

    if (!fs.existsSync(filePath)) {
      return res.status(404).json({ error: "Test file not found" });
    }

    const existingData = JSON.parse(fs.readFileSync(filePath, "utf8"));
    if (!existingData[difficulty]) {
      return res.status(400).json({ error: "Invalid difficulty level" });
    }

    const diffArray = existingData[difficulty];
    let newId = 1;
    if (diffArray.length > 0) {
      newId = diffArray[diffArray.length - 1].id + 1;
    }

    const formattedQuestion = {
      id: newId,
      question: newQuestion.question,
      options: newQuestion.options,
      correctAnswer: newQuestion.correctAnswer
    };

    diffArray.push(formattedQuestion);
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

module.exports = {
  getResults,
  addResultController,
  getMockTests,
  getTestQuestions,
  getAllRoles,
  addRole,
  deleteRole,
  addQuestion,
  deleteResult
};