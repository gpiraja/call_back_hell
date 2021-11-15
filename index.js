const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const dboper = require('./operations')

const url = 'mongodb://localhost:27017/';
const dbname = 'conFusion';

MongoClient.connect(url)
.then ((client) => {
    console.log('Conectado corretamente no servidor');
    const db = client.db(dbname);
    console.log("Conectado no banco : \n", db.s.namespace);
    
    dboper.insertDocument(db, {nome : "Vadio", desc: "teste"},
        "receitas")
    .then((result) => {
            console.log("Inserindo receita ", result.insertedId);
            
            return dboper.findDocuments(db, "receitas")
    })
    .then ((docs) => {
        console.log("Documentos encontrados:\n ", docs);

        return db.dropCollection("receitas");
    })
    .then((result) =>{
        console.log("Coleção apagada", result);
        client.close();
    })
    .catch((err) => console.log(err));   
})
.catch((err) => console.log(err));