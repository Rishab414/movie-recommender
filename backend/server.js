const Fastify = require('fastify');
const cors = require('@fastify/cors');
const path = require('path');
const fs = require('fs');
const db = require('./db');

const fastify = Fastify({ logger: true });
fastify.register(cors, { origin: true });

// Serve static frontend files in production
const frontendPath = path.join(__dirname, '../frontend/build');
if (fs.existsSync(frontendPath)) {
  fastify.register(require('@fastify/static'), {
    root: frontendPath,
    prefix: '/'
  });
}

// Movie database with recommendations
const movieDatabase = {
  action: [
    "John Wick (2014) - An intense action thriller with incredible fight choreography",
    "Mad Max: Fury Road (2015) - Non-stop action with stunning visuals",
    "The Matrix (1999) - Groundbreaking action sci-fi classic",
    "Atomic Blonde (2017) - Stylish action with impressive fight sequences",
    "Mission: Impossible - Fallout (2018) - High-octane action spectacle"
  ],
  comedy: [
    "The Grand Budapest Hotel (2014) - Quirky and visually stunning comedy",
    "Superbad (2007) - Hilarious coming-of-age comedy",
    "The Pink Panther (2006) - Classic slapstick comedy",
    "Get Hard (2015) - Funny buddy comedy",
    "Tropic Thunder (2008) - Action-packed comedy"
  ],
  drama: [
    "The Shawshank Redemption (1994) - Powerful prison drama",
    "Forrest Gump (1994) - Touching life drama",
    "The Pursuit of Happyness (2006) - Inspiring true story",
    "Gladiator (2000) - Epic historical drama",
    "The Green Mile (1999) - Emotional drama masterpiece"
  ],
  scifi: [
    "Inception (2010) - Mind-bending sci-fi thriller",
    "Interstellar (2014) - Epic space exploration",
    "The Terminator (1991) - Sci-fi action classic",
    "Blade Runner 2049 (2017) - Visually stunning sci-fi",
    "Avatar (2009) - Revolutionary sci-fi epic"
  ],
  horror: [
    "The Shining (1980) - Psychological horror masterpiece",
    "The Exorcist (1973) - Classic supernatural horror",
    "Hereditary (2018) - Modern horror gem",
    "Insidious (2010) - Terrifying supernatural thriller",
    "A Quiet Place (2018) - Innovative suspense horror"
  ],
  romance: [
    "The Notebook (2004) - Heartwarming romantic drama",
    "Titanic (1997) - Epic romance and disaster",
    "La La Land (2016) - Modern romantic musical",
    "Pride and Prejudice (2005) - Classic romance",
    "The Fault in Our Stars (2014) - Emotional teen romance"
  ]
};

// Function to generate recommendations based on user input
function generateRecommendations(userInput) {
  const input = userInput.toLowerCase();
  let recommendations = [];
  
  // Analyze user input and match with movie genres
  if (input.includes('action') || input.includes('fight') || input.includes('fight scene')) {
    recommendations = movieDatabase.action;
  } else if (input.includes('comedy') || input.includes('funny') || input.includes('laugh')) {
    recommendations = movieDatabase.comedy;
  } else if (input.includes('drama') || input.includes('emotional') || input.includes('serious')) {
    recommendations = movieDatabase.drama;
  } else if (input.includes('sci-fi') || input.includes('science') || input.includes('futuristic') || input.includes('space')) {
    recommendations = movieDatabase.scifi;
  } else if (input.includes('horror') || input.includes('scary') || input.includes('scary') || input.includes('suspense')) {
    recommendations = movieDatabase.horror;
  } else if (input.includes('romance') || input.includes('love') || input.includes('romantic')) {
    recommendations = movieDatabase.romance;
  } else {
    // Default: mix of popular movies
    recommendations = [
      ...movieDatabase.action.slice(0, 2),
      ...movieDatabase.drama.slice(0, 2),
      movieDatabase.scifi[0]
    ];
  }
  
  return "Based on your preferences, here are my movie recommendations:\n\n" +
    recommendations.map((movie, idx) => `${idx + 1}. ${movie}`).join("\n");
}

fastify.post('/recommend', async (request, reply) => {
  const { userInput } = request.body;

  try {
    const recommendations = generateRecommendations(userInput);

    // Save in SQLite
    db.run(
      `INSERT INTO recommendations (user_input, recommended_movies) VALUES (?, ?)`,
      [userInput, recommendations]
    );

    return { movies: recommendations };

  } catch (error) {
    console.error(error);
    reply.code(500).send({ error: "Failed to get recommendations" });
  }
});

fastify.listen({ port: 5000 }, (err) => {
  if (err) throw err;
  console.log("Server running on http://localhost:5000");
});
