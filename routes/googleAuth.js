const { google } = require("googleapis");

const CLIENT_ID = "your_client_id";
const CLIENT_SECRET = "your_client_secret";
const REDIRECT_URL = "http://localhost:3000/auth/google/callback"; // Replace with your actual redirect URL

const oauth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  REDIRECT_URL
);
const express = require("express");
const router = express.Router();

router.get("/auth/google", (req, res) => {
  const authUrl = oauth2Client.generateAuthUrl({
    scope: ["profile", "email"], // Request access to profile and email scopes
  });
  res.redirect(authUrl);
});

router.get("/auth/google/callback", async (req, res) => {
  const { code } = req.query;
  const { tokens } = await oauth2Client.getToken(code);
  oauth2Client.setCredentials(tokens);
  // Use the tokens to fetch user profile information and save it to MongoDB
  // Example implementation:
  const { data } = await google
    .oauth2({ auth: oauth2Client, version: "v2" })
    .userinfo.get();
  // Save user details to MongoDB
  const User = require("../models/userModels"); // Replace with your actual user model
  const newUser = new User({
    email: data.email,
    name: data.name,
    // Save other relevant user details as needed
  });
  await newUser.save();
  res.redirect("/"); // Redirect to home page after successful login
});

module.exports = router;
