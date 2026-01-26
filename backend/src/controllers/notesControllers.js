

export const getAllNotes = (request,response) => {
    response.status(200).send({msg: 'File successfully retriveded'});
};

export const createNote = (request,response) => {

  response.status(201).send({msg: 'created successfully'});
  
};

export const updateNote = (request,response) => {

  response.status(200).send({msg: 'File successfully updated'});
  
}; 

export const deleteNote = (request,response) => {

  response.status(200).send({msg: 'File successfully deleted'});
  
};