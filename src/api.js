const API_URL = "http://127.0.0.1:8000";

export async function sendFitnessData({
  height,
  weight,
  age,
  steps,
  water,
  workouts,
}) {
  const response = await fetch(`${API_URL}/fitness-data`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      height: Number(height),
      weight: Number(weight),
      age: Number(age),
      steps: Number(steps),
      water: Number(water),
      workouts: Number(workouts),
    }),
  });

  if (!response.ok) {
    throw new Error("Failed to send fitness data");
  }

  return response.json();
}