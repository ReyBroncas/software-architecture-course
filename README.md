# software-architecture-course

## Setup

Copy env variables
`cp .env-sample .env`

Start the cluster and management-center:
`docker-compose run hazel_management_center`

---

####

Task 3:

start client
`docker-compose run client task1`

####

Task 4:

start client w/o map lock:
`docker-compose run client task2 racyUpdate`

start client w/ optimistic lock:
`docker-compose run client task2 optimisticUpdate`

start client w/ pessimistic lock:
`docker-compose run client task2 pessimisticUpdate`

####

Task 5:

start producer client:
`docker-compose run client task3 producer`

start consumer client:
`docker-compose run client task3 consumer`

---

### Results
