import express from "express";
import { tarefas } from "./dados.js";

const app = express();
const PORTA = 3000;

app.use(express.json());

app.get("/tarefas", (req, res) => {
  res.status(200).json(tarefas);
});


app.post("/tarefas", (req, res) => {
  const { titulo } = req.body;

 
  if (!titulo || titulo.trim() === "") {
    return res.status(400).json({ erro: "Título é obrigatório." });
  }

 
  const novaTarefa = {
    id: tarefas.length + 1,
    titulo: titulo,
    concluida: false
  };

  
  tarefas.push(novaTarefa);

  
  res.status(201).json(novaTarefa);
});


app.delete("/tarefas/id/:id", (req, res) => {
  const id = parseInt(req.params.id);

  
  const index = tarefas.findIndex(tarefa => tarefa.id === id);

  
  if (index === -1) {
    return res.status(404).json({ erro: "Tarefa não encontrada." });
  }

  
  tarefas.splice(index, 1);

  
  res.status(204).send();
});


app.patch("/tarefas/id/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const { concluida } = req.body;

  
  const tarefa = tarefas.find(tarefa => tarefa.id === id);

  
  if (!tarefa) {
    return res.status(404).json({ erro: "Tarefa não encontrada." });
  }

  
  if (typeof concluida !== "boolean") {
    return res.status(400).json({ erro: "Campo 'concluida' deve ser booleano." });
  }

  
  tarefa.concluida = concluida;

  
  res.status(200).json(tarefa);
});




app.listen(PORTA, () => {
  console.log(`Servidor rodando em http://localhost:${PORTA}`);
});


