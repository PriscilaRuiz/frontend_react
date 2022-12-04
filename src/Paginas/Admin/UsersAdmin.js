import React, { useState, useEffect } from "react";
import { Loader } from "semantic-ui-react";
import {HeaderPage,TableUsers,AddEditUserForm,} from "../../Componentes/Admin";
import { ModalBasic } from "../../Componentes/Common";
import {useUser} from "../../Hooks"

export function UsersAdmin(){
    const [showModal, setShowModal] = useState(false);
    const [titleModal, setTitleModal] = useState(null);
    const [contentModal, setContentModal] = useState(null);
    const [refetch, setRefetch] = useState(false);
    const { loading, users, getUsers, deleteUser } = useUser();


    useEffect(() => getUsers(), [refetch]);

    //Cerrar y abril el modal(la ventana de editar y crear usuario)
    const openCloseModal = () => setShowModal((prev) => !prev);
    
    //Para obtener los datos del usuario en el modal
    const onRefetch = () => setRefetch((prev) => !prev);

    //Agregar usuario
    const addUser = () => {
        setTitleModal("Nuevo usuario");
        setContentModal(
          <AddEditUserForm onClose={openCloseModal} onRefetch={onRefetch} />
        );
        openCloseModal();
      };
    
    //Editar Usuario
    const updateUser = (data) => {
        setTitleModal("Actualizar usuario");
        setContentModal(
            <AddEditUserForm
            onClose={openCloseModal}
            onRefetch={onRefetch}
            user={data}
            />
        );
        openCloseModal();
    };

    //Eliminar usuario
    const onDeleteUser = async (data) => {
        const result = window.confirm(`¿Eliminar usuario ${data.email}?`);
        if (result) {
            try {
            await deleteUser(data.id);
            onRefetch();
            } catch (error) {
            console.error(error);
            }
        }
    };

    return (
        <>
            <HeaderPage
                title="Usuarios"
                btnTitle="Nuevo usuario"
                btnClick={addUser}
            />
            {loading ? (
                <Loader active inline="centered">
                    Cargando...
                </Loader>
            ) : (
            <TableUsers
                users={users}
                updateUser={updateUser}
                onDeleteUser={onDeleteUser}
            />
            )}

            <ModalBasic
                show={showModal}
                onClose={openCloseModal}
                title={titleModal}
                children={contentModal}
            />
        </>
    );
}

