| HTTP Method | URL Path                                     | Description                             | Json |
|-------------|----------------------------------------------|-----------------------------------------|------|
| GET         | /                                            | index                                   |      |
| GET         | /register                                    | registro del usuario mostrar campos     |      |
| POST        | /register                                    | registro del usuario toma de datos      |      |
| GET         | /login                                       | muestra el formulario                   |      |
| POST        | /login                                       | Da acceso a la sesion registrada        |      |
| GET         | /user/profile/:user_id                       | profile del usuario                     |      |
| GET         | /user/request-personaltraining/:trainer_id   | Solicitar rutina personalizada          |      |
| POST        | /user/request-personaltraining/:trainer_id   | Envia los datos de la solicitud         |      |
| GET         | /user/edit-profile/:user_id                  | Renderiza el formulario a editar        |      |
| POST        | /user/edit-profile/:user_id                  | Actualiza los nuevos datos editados     |      |
| POST        | /user/delete-profile/:user_id                | Elimina el usuario                      |      |
| GET         | /user/routine-list/:user_id                  | Da acceso a la lista de rutinas         |      |
| GET         | /user/trainer-list                           | Da acceso a lista de entrenadores       |      |
| GET         | /clients/:trainer_id                         | lista de clientes del entrenador        |      |
| GET         | /clients/applications/:user.id               | el trainer ve las peticiones de clientes|      |
| GET         | /clients/create-routine/:user_id             | Renderiza formulario de crear           |      |
| POST        | /clients/create-routine/:user_id             | Crea la rutina en el perfil del usuario |      |
| GET         | /clients/edit-routine/:routine_id            | Renderiza el formulario para editar     |      |
| POST        | /clients/edit-routine/:routine_id            | Actualiza los nuevos datos editados     |      |
| POST        | /clients/delete-routine/:routine_id          | Elimina la rutina                       |      |
| GET         | /events/event-list                           | Da acceso a lista de eventos            |      |
| GET         | /events/create-event                         | Renderiza formulario crear evento       |      |
| POST        | /events/create-event                         | Crea el evento con los datos            |      |
| GET         | /events/edit-event/:event_id                 | Renderiza el formulario a editar        |      |
| POST        | /events/edit-event/:event_id                 | Actualiza los nuevos datos editados     |      |
| POST        | /events/delete-event/:event_id               | Elimina el evento                       |      |
