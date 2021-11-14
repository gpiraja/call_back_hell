const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const dboper = require('./operations')

const url = 'mongodb://localhost:27017/';
const dbname = 'conFusion';

MongoClient.connect(url, (err, client) => {
    assert.equal(err, null);
    console.log('Conectado corretamente no servidor');

    const db = client.db(dbname);
    const collection = db.collection("receitas");

    dboper.insertDocument(db, {nome : "Vadio", desc: "teste"},
        "receitas", (result) => {
            console.log("Inserindo receita ", result.ops);
            
            dboper.findDocuments(db, "receitas", (docs) => {
                console.log("Achados: ", docs);

                dboper.removeDocument (db, {nome : "Vadio", desc: "teste"}, 
                "receitas",(result) =>{
                    console.log("apagado ", result);
                    db.dropCollection("receitas", (result) =>{
                        console.log("Coleção apagada", result);

                        client.close()
                    })
                } )
            });


        })

    
});