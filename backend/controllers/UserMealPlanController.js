import MealPlan from "../models/UserMealPlanModel.js";

// Create a new meal plan
export const createUserMealPlan = async (req, res) => {
  try {
    console.log("📥 req.user:", req.user);
    console.log("📥 req.body:", req.body);

    const { date, meal1, meal2, meal3, meal4, meal5, snacks } = req.body;

    if (!date) {
      return res.status(400).json({ error: "Date is required" });
    }

    const mealPlan = new MealPlan({
      userId: req.user._id,
      date,
      meal1,
      meal2,
      meal3,
      meal4,
      meal5,
      snacks,
    });

    await mealPlan.save();

    res.status(201).json({ message: "Meal plan saved successfully", mealPlan });
  } catch (error) {
    console.error("❌ createUserMealPlan error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Update an existing meal plan
export const updateUserMealPlan = async (req, res) => {
  try {
    const { date, meal1, meal2, meal3, meal4, meal5, snacks } = req.body;

    const mealPlan = await MealPlan.findOne({
      userId: req.user._id,
      date,
    });

    if (!mealPlan) {
      return res.status(404).json({ message: "Meal plan not found" });
    }

    mealPlan.meal1 = meal1 || mealPlan.meal1;
    mealPlan.meal2 = meal2 || mealPlan.meal2;
    mealPlan.meal3 = meal3 || mealPlan.meal3;
    mealPlan.meal4 = meal4 || mealPlan.meal4;
    mealPlan.meal5 = meal5 || mealPlan.meal5;
    mealPlan.snacks = snacks || mealPlan.snacks;

    await mealPlan.save();

    res.status(200).json({ message: "Meal plan updated", mealPlan });
  } catch (error) {
    console.error("❌ updateUserMealPlan error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Get a meal plan for a specific date
export const getUserMealPlan = async (req, res) => {
  try {
    const { date } = req.params;

    const mealPlan = await MealPlan.findOne({
      userId: req.user._id,
      date,
    });

    if (!mealPlan) {
      return res.status(404).json({ message: "No meal plan found for this date" });
    }

    res.status(200).json(mealPlan);
  } catch (error) {
    console.error("❌ getUserMealPlan error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
