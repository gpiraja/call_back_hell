const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

const url = 'mongodb://localhost:27017/';
const dbname = 'conFusion';

MongoClient.connect(url, (err, client) => {
    assert.equal(err, null);
    console.log('Conectado corretamente no servidor');

    const db = client.db(dbname);
    const collection = db.collection("receitas");

    collection.insertOne({
            "nome": "Joao",
            "desc": "Cara de mamão"
        },
        (err, result) => {
            assert.equal(err, null);
            console.log('Registro adicionado ao db: \n');
            console.log(result.insertedId);

            collection.find({}).toArray((err, docs) => {
                assert.equal(err, null);

                console.log("Registros db:\n");
                console.log(docs);

                db.dropCollection("receitas", (err, result) => {
                    assert.equal(err, null);
                    client.close();
                })
            });
     });
});