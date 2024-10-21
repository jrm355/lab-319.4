
// The percentage of learners with an average above 70% (a ratio of the above two outputs).
import express from 'express';
import router from express.Router();
import { MongoClient } from ('mongodb');

// Create a MongoDB client instance and connect to your database
const uri = 'mongodb+srv://jeremykazdan34:7bLnlbzZBbSheztG@cluster0.nmlos.mongodb.net/'; 
const client = new MongoClient(uri);
let db;

client.connect()
  .then(() => {
    db = client.db('sample_training'); 
  })
  .catch((err) => console.error(err));

// GET route 
router.get('/grades/stats', async (req, res) => {
  try {
    const stats = await db.collection('student_ID').aggregate([
        // Stage 1: Add a field for the weighted average
        // The total number of learners.
      // The number of learners with a weighted average (as calculated by the existing routes) higher than 70%.
      {
        $addFields: {
          weightedAverage: {
            $divide: [
              { $sum: '$grades.weightedScore' },
              { $size: '$grades' }
            ]
          }
        }
      },
      // Stage 2: Group to calculate stats
      {
        $group: {
          _id: null,
          totalLearners: { $sum: 1 },
          learnersAbove70: {
            $sum: {
              $cond: [{ $gt: ['$weightedAverage', 70] }, 1, 0]
              // Count learners with average above 70
            }
          }
        }
      },
      // Stage 3: Calculate percentage of learners with average above 70
      {
        $project: {
          _id: 0,
          totalLearners: 1,
          learnersAbove70: 1,
          percentageAbove70: {
            $multiply: [
              { $divide: ['$learnersAbove70', '$totalLearners'] },
              100
            ]
          }
        }
      }
    ]).toArray();

    res.json(stats[0] || { totalLearners: 0, learnersAbove70: 0, percentageAbove70: 0 });
  } catch (err) {
    res.status(500).json({ error: 'An error occurred while fetching the stats' });
  }
});

module.exports = router;



// 2 Create a GET route at /grades/stats/:id
// Within this route, mimic the above aggregation pipeline, but only for learners within a class that has a class_id equal to the specified :id.