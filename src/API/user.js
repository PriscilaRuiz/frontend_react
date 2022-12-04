import { BASE_API }from "../Utils/constans"

export async function loginApi(formValue){
    try {
        //Definimos la url del api 
        const url = `${BASE_API}/api/auth/login/`;

        //Parametros de peticion
        const params = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },

          //transormar el objeto en string
          body: JSON.stringify(formValue),
        };
    
        const response = await fetch(url, params);
    
        if (response.status !== 200) {
          throw new Error("Usuario o contraseña incorrectos");
        }
    
        const result = await response.json();
        return result;
        
      } catch (error) {
        throw error;
      }
}

export async function getMeApi(token) {
  try {
    const url = `${BASE_API}/api/auth/me/`;
    const params = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const response = await fetch(url, params);
    const result = await response.json();
    return result;
    
  } catch (error) {
    throw error;
  }
}

//Enlistar usuarios
export async function getUsersApi(token) {
  try {
    const url = `${BASE_API}/api/users/`;
    const params = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await fetch(url, params);
    const result = await response.json();
    return result;
  } catch (error) {
    throw error;
  }
}

//Crear Usuarios
export async function addUserApi(data, token) {
  try {
    const url = `${BASE_API}/api/users/`;
    const params = {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };

    const response = await fetch(url, params);
    const result = await response.json();
    return result;
  } catch (error) {
    throw error;
  }
}

//Actualizar Datos
export async function updateUserApi(id, data, token) {
  try {
    const url = `${BASE_API}/api/users/${id}/`;
    const params = {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };

    const response = await fetch(url, params);
    const result = await response.json();
    return result;
  } catch (error) {
    throw error;
  }
}

//Eliminar datos
export async function deleteUserApi(id, token) {
  try {
    const url = `${BASE_API}/api/users/${id}/`;
    const params = {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const response = await fetch(url, params);
    const result = await response.json();
    return result;
  } catch (error) {
    throw error;
  }
}