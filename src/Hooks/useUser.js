import { useState } from "react";
import { getMeApi, getUsersApi, addUserApi, updateUserApi, deleteUserApi } from "../API/user";
import { useAuth } from ".";

export function useUser() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [users, setUsers] = useState(null);
  const { auth } = useAuth();
  
  const getMe = async (token) => {
    try {
      const response = await getMeApi(token);
      return response;
    } catch (error) {
      throw error;
    }
  };

  const getUsers = async () => {
    try {
      setLoading(true);
      const response = await getUsersApi(auth.token);
      setLoading(false);
      setUsers(response);
    } catch (error) {
      setLoading(false);
      setError(error);
    }
  };

  //Funcion para crear un usuario
  const addUser = async (data) => {
    try {
      setLoading(true);
      await addUserApi(data, auth.token);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError(error);
    }
  };

  //Funcion para editar un usuario
  const updateUser = async (id, data) => {
    try {
      setLoading(true);
      await updateUserApi(id, data, auth.token);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError(error);
    }
  };

  //Funcion para eliminar un usuario
  const deleteUser = async (id) => {
    try {
      setLoading(true);
      await deleteUserApi(id, auth.token);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError(error);
    }
  };

  return {
    loading,
    error,
    users,
    getMe,
    getUsers,
    addUser,
    updateUser,
    deleteUser,
  };
  }