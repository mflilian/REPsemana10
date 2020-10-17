
const colaboradores = require("../model/colaboradores.json");
const fs = require("fs");

const getAllColaborador = (req, res) => {
  console.log(req.url);
  res.status(200).send(colaboradores);
};

const getByIdColaborador = (req, res) => {
  const id = req.params.id;

  res.status(201).send(colaboradores.find((colaborador) => colaborador.id == id));
};

const postColaborador = (req, res) =>{
  console.log(req.body);
  const {id, nome, sobrenome, cpf, cargo} = req.body;
  colaboradores.push({id, nome, sobrenome, cpf, cargo});
  
  fs.writeFile("./src/model/colaboradores.json",JSON.stringify(colaboradores),'utf8',function(err){
      if(err){
        return res.status(424).send({message: err});

      }
      console.log("Arquivo atualizado com sucesso!")
  }) 

 res.status(200).send(colaboradores)
};

const deleteColaborador = (req, res) => {
  const id = req.params.id;
  const colaboradorFiltrado = colaboradores.find((colaborador) => colaborador.id == id);
  const index = colaboradores.indexOf(colaboradorFiltrado);
  colaboradores.splice(index, 1);

  fs.writeFile("./src/model/colaboradores.json",JSON.stringify(colaboradores),'utf8',function(err){
    if(err){
      return res.status(424).send({message: err});
    }
    console.log("Arquivo atualizado com sucesso!")
  })
  res.status(200).send(colaboradores)
  
}

module.exports = {
  getAllColaborador,
  getByIdColaborador,
  postColaborador,
  deleteColaborador
};
