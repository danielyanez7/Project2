| HTTP Method | URL Path                                     | Description                             | Json |
|-------------|----------------------------------------------|-----------------------------------------|------|
| GET         | /                                            | index                                   |      |
| GET         | /register                                   x| registro del usuario mostrar campos     |      |
| POST        | /register                                   x| registro del usuario toma de datos      |      |
| GET         | /login                                      x| muestra el formulario                   |      |
| POST        | /login                                      x| Da acceso a la sesion registrada        |      |
| GET         | /user/profile/:user_id                      x| profile del usuario                     |      |
| POST        | /user/request-personaltraining/:trainer_id  x| Envia los datos de la solicitud         |      |
| GET         | /user/edit-profile/:user_id                 x| Renderiza el formulario a editar        |      |
| POST        | /user/edit-profile/:user_id                 x| Actualiza los nuevos datos editados     |      |
| POST        | /user/delete-profile/:user_id               x| Elimina el usuario                      |      |
| GET         | /user/routine-list/:user_id                  | Da acceso a la lista de rutinas         |      |
| GET         | /user/trainer-list                          x| Da acceso a lista de entrenadores       |      |
| POST        | /clients/accept-client/:trainer_id          x| Envia los datos de la solicitud         |      |
| GET         | /clients/:trainer_id                        x| lista de clientes del entrenador        |      |
| GET         | /clients/create-routine/:user_id             | Renderiza formulario de crear           |      |
| POST        | /clients/create-routine/:user_id             | Crea la rutina en el perfil del usuario |      |
| GET         | /clients/edit-routine/:routine_id            | Renderiza el formulario para editar     |      |
| POST        | /clients/edit-routine/:routine_id            | Actualiza los nuevos datos editados     |      |
| POST        | /clients/delete-routine/:routine_id          | Elimina la rutina                       |      |
| GET         | /events/event-list                          x| Da acceso a lista de eventos            |      |
| GET         | /events/create-event                        x| Renderiza formulario crear evento       |      |
| POST        | /events/create-event                        x| Crea el evento con los datos            |      |
| GET         | /events/edit-event/:event_id                x| Renderiza el formulario a editar        |      |
| POST        | /events/edit-event/:event_id                x| Actualiza los nuevos datos editados     |      |
| POST        | /events/delete-event/:event_id              x| Elimina el evento                       |      |
