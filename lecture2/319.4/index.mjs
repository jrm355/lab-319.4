const { MongoClient } = require('mongodb');

const uri = 'mongodb+srv://jeremykazdan34:7bLnlbzZBbSheztG@cluster0.nmlos.mongodb.net/'; 
const client = new MongoClient(uri);

// 3Create a single-field index on class_id.
db.grades.createIndex({ class_id: 300 })


client.connect()
  .then(() => {
    const db = client.db('sample_training');
    const collection = db.collection('grades'); 

    // Create the single-field index on class_id
    collection.createIndex({ class_id: 1 }) // 1 for ascending order
      .then(result => {
        console.log('Single-field index on class_id created:', result);
      })
      .catch(err => {
        console.error('Error creating index:', err);
      })
      .finally(() => {
        client.close(); 
      });
  })
  .catch((err) => console.error(err));


// 4Create a single-field index on learner_id.
db.grades.createIndex( { student_id: 1 } )
// 5Create a compound index on learner_id and class_id, in that order, both ascending.



client.connect()
  .then(() => {
    const db = client.db('sample_training');
    const collection = db.collection('student_ID'); 

    // Create the compound index
    collection.createIndex({ learner_id: 1, class_id: 1 })
      .then(result => {
        console.log('Compound index created:', result);
      })
      .catch(err => {
        console.error('Error creating index:', err);
      })
      .finally(() => {
        client.close();
      });
  })
    .catch((err) => console.error(err));
  

    // get code for aggregrate steps from mongo db