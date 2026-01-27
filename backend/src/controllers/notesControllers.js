import { request, response } from "express";
import Note from "../models/Note.js";

export const getAllNotes = async (request,response) => {
    try {
      const notes = await Note.find();
      response.status(200).json(notes);
    } catch (error) {
      console.error('Error in getallnotes method', error);
      response.status(500).json({msg: 'internal server error'});
    }
};


export const getNoteById = async(request,response) => {
  try {
    const note = await Note.findById(request.params.id);
    if(!note) return response.status(404).json({msg: 'Not found'});
    response.status(200).json({msg: 'Found note', note});
    } catch (error) {
    console.error('Error in notebyid method', error);
    response.status(500).json({msg: 'internal server error'});
  }
}

export const createNote = async (request,response) => {

  try {
    const {title, content} = request.body;
    const note = new Note({title,content});
    const savedNote = await note.save();
    response.status(201).json({msg: 'Note created successfully', note: savedNote
    });
  } catch (error) {
    response.status(500).json({msg: 'Error during creating the note', error});
  }
  
};

export const updateNote = async(request,response) => {

  try {
    const {title, content} = request.body;
   
  const updateNote = await Note.findByIdAndUpdate(request.params.id, {title,content},{
    new: true,
  });
  if(!updateNote) return response.status(500).json({msg: 'not found'});
  response.status(200).json({msg: 'Updated', note: updateNote});
  
  } catch (error) {
    console.error('Error in update', error);
    response.status(500).json({msg: 'internal server error'});
  }
}; 

export const deleteNote = async(request,response) => {

  try {
    const deleteNote = await Note.findByIdAndDelete(request.params.id);
    if(!deleteNote) return  response.status(404).json({msg: 'not found'});
    response.status(200).json({msg: 'Note has been deleted', delete: deleteNote});
  } catch (error) {
    console.error('Error in delete', error);
    response.status(500).json({msg: 'internal server error'});
  }
};