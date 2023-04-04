/*
Esse arquivo deve ser executado apenas uma vez para que a o banco seja criado e populado
*/
import db from "./db.js";

//==== Conteúdos
const TAREFAS_SCHEMA = `
CREATE TABLE IF NOT EXISTS "tarefas" (
    "id" INTEGER PRIMARY KEY AUTOINCREMENT,
    "titulo" text,
    "descricao" text,
    "dia" INTEGER
  );`;

function createTableTarefas() {
    db.run(TAREFAS_SCHEMA, (error)=> {
       if (error) console.log("Erro ao criar tabela de conteúdos");
    });
}

db.serialize( ()=> {
    createTableTarefas();
});