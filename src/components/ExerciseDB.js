import React, { useState } from "react";
import axios from "axios";
import "./ExerciseDB.css";

const ExercisePage = () => {
  const [selectedMuscle, setSelectedMuscle] = useState("");
  const [exercises, setExercises] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [exercisesPerPage] = useState(10);

  const handleMuscleChange = (e) => setSelectedMuscle(e.target.value);

  // ✅ Final handleSearch function
  const handleSearch = async () => {
    if (!selectedMuscle) return alert("Please select a muscle group.");

    try {
      const response = await axios.get(
        "https://exercisedb.p.rapidapi.com/exercises",
        {
          headers: {
            "X-RapidAPI-Key": "3190d2cd3amshe401585bbe87576p18b44djsn7669ffd89aa8",
            "X-RapidAPI-Host": "exercisedb.p.rapidapi.com",
          },
          params: { bodyPart: selectedMuscle },
        }
      );

      if (!response.data || response.data.length === 0) {
        alert("No exercises found for this muscle group.");
        setExercises([]);
        return;
      }

      setExercises(response.data);
      setCurrentPage(1); // reset pagination
    } catch (error) {
      console.error(error);
      alert("Error fetching exercises. Check console.");
    }
  };

  const indexOfLastExercise = currentPage * exercisesPerPage;
  const indexOfFirstExercise = indexOfLastExercise - exercisesPerPage;
  const currentExercises = exercises.slice(
    indexOfFirstExercise,
    indexOfLastExercise
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const capitalizeFirstLetter = (string) =>
    string.charAt(0).toUpperCase() + string.slice(1);

  return (
    <div className="exercise-page">
      <h2>Search For A Perfect Exercise</h2>

      <div className="select-container">
        <select value={selectedMuscle} onChange={handleMuscleChange}>
          <option value="">Select A Muscle Group</option>
          <option value="back">Back</option>
          <option value="cardio">Cardio</option>
          <option value="chest">Chest</option>
          <option value="lower arms">Lower Arms</option>
          <option value="lower legs">Lower Legs</option>
          <option value="neck">Neck</option>
          <option value="shoulders">Shoulders</option>
          <option value="upper arms">Upper Arms</option>
          <option value="upper legs">Upper Legs</option>
          <option value="waist">Waist</option>
        </select>
        <button onClick={handleSearch} className="mx-3">
          Search
        </button>
      </div>

      {currentExercises.length > 0 ? (
        <div className="exercise-container">
          {currentExercises.map((exercise) => (
            <div
              key={exercise.id || exercise._id || Math.random()}
              className="exercise-card"
            >
              <h3>{capitalizeFirstLetter(exercise.name)}</h3>
              <div className="gif-container">
                <img
                  src={exercise.gifUrl}
                  alt={exercise.name}
                  className="exercise-gif"
                />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <h3>Exercises and demonstrations will be displayed here.</h3>
      )}

      {exercises.length > exercisesPerPage && (
        <div className="pagination">
          {Array.from({
            length: Math.ceil(exercises.length / exercisesPerPage),
          }).map((_, index) => (
            <button key={index} onClick={() => paginate(index + 1)}>
              {index + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default ExercisePage;
