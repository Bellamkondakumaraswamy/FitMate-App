// backend/models/UserMealPlanModel.js
import mongoose from "mongoose";

// Define the schema for a user's meal plan
const userMealPlanSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    meal1: { type: String },
    meal2: { type: String },
    meal3: { type: String },
    meal4: { type: String },
    meal5: { type: String },
    snacks: { type: String },
  },
  { timestamps: true } // automatically add createdAt and updatedAt
);

// Create the model
const MealPlan = mongoose.model("MealPlan", userMealPlanSchema);

// Export the model
export default MealPlan;
