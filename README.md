# software-architecture-course

### Initialization
`docker-compose build`


### Run each service separately
- logging
    `docker-compose up logging-service-1 logging-service-2 logging-service-3`
- facade
    `docker-compose up facade-service`
- messages
    `docker-compose up message-service`

### Run everything
`docker-compose facade-service`

### Example:
- Task1: 10 messages written & retrieved

    ![1 screenshot](/res/screenshot_1.png)
- Task2: 2 logging services disabled & msg retrieve

    ![2 screenshot](/res/screenshot_2.png)

