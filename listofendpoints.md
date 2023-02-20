| HTTP Method | URL Path                                    | Description                             | Json |
|-------------|---------------------------------------------|-----------------------------------------|------|
| GET         | /                                           | index                                   |      |
| GET         | /register                                   | registro del usuario mostrar campos     |      |
| POST        | /register                                   | registro del usuario toma de datos      |      |
| GET         | /login                                      | muestra el formulario                   |      |
| POST        | /login                                      | Da acceso a la sesion registrada        |      |
| GET         | /user/{:user_id}/perfil                      | Perfil del usuario                      |      |
| GET         | /user/trainer-list                          | Da acceso a lista de entrenadores       |      |
| GET         | /user/{:trainer_id}/request-personaltraining | Solicitar rutina personalizada          |      |
| POST        | /user/{:trainer_id}/request-personaltraining | Envia los datos de la solicitud         |      |
| GET         | /user/perfil/{:user_id}/edit                 | Renderiza el formulario a editar        |      |
| POST        | /user/perfil/{:user_id}/edit                 | Actualiza los nuevos datos editados     |      |
| POST        | /user/perfil/{:user_id}/delete               | Elimina el usuario                      |      |
| GET         | /user/event-list                            | Da acceso a lista de eventos            |      |
| GET         | /user/create-event                          | Renderiza formulario crear evento       |      |
| POST        | /user/create-event                          | Crea el evento con los datos            |      |
| GET         | /user/{:event_id}/edit-event                 | Renderiza el formulario a editar        |      |
| POST        | /user/{:event_id}/edit-event                 | Actualiza los nuevos datos editados     |      |
| POST        | /user/{:event_id}/delete                     | Elimina el evento                       |      |
| GET         | /user/{:user_id}/routine-list                | Da acceso a la lista de rutinas         |      |
| GET         | /user/{:user_id}/create-routine              | Renderiza formulario de crear           |      |
| POST        | /user/{:user_id}/create-routine              | Crea la rutina en el perfil del usuario |      |
| GET         | /user/{:routine_id}/edit-routine             | Renderiza el formulario para editar     |      |
| POST        | /user/{:routine_id}/edit-routine             | Actualiza los nuevos datos editados     |      |
| POST        | /user/{:routine_id}/delete                   | Elimina la rutina                       |      |