// const mongodb = require('mongodb');
// const MongoClient = mongodb.MongoClient
// const ObjectID = mongodb.ObjectID

const { MongoClient, ObjectID } = require('mongodb')


const connectionURl = 'mongodb://127.0.0.1:27017'
const databaseName = 'task-manager'

// const id = new ObjectID()
// console.log(id);
// console.log(id.getTimestamp());



MongoClient.connect(connectionURl, { useUnifiedTopology: true}, function(error, client){
    if(error){
        return console.log("Unable to connect to database.");
        
    }
    const db = client.db(databaseName);



//  db.collection('users').updateOne({_id: new ObjectID('5f1085f58147bb853ee29b98')}, {$inc: { age: 5}}).then((result)=>{
// console.log(result);

//     }).catch((error)=>{
// console.log(error);

//     })

// db.collection('Tasks').updateMany({ seeIf: false}, { $set: {seeIf: true}}).then((result)=>{
//     console.log(result);
    
// }).catch((error)=>{
//     console.log(error);
    
// })

// db.collection('users').deleteMany({age: 23}).then((result)=>{console.log(result)}).catch((err)=>{console.log(err)})
db.collection('users').deleteOne({_id: new ObjectID('5f108694b07a648546f44320')}).then((result)=>{
    console.log(result);
    
}).catch((err)=>{
    console.log(err)
})

})