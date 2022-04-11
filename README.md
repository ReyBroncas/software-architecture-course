# software-architecture-course

## Setup

- Copy env variables

  `cp .env-sample .env`

- Start the cluster and management-center:

  `docker-compose run hazel_management_center`

---

### Task 3:

- start client

  `docker-compose run client task1`
  
  ![](/res/task1_0.png)
  ![](/res/task1_1.png)
  ![](/res/task1_2.png)

### Task 4:

- start client w/o map lock:

  `docker-compose run client task2 racyUpdate`
  
  ![](/res/task2.png)
  ![](/res/task2_1.png)
  ![](/res/task2_2.png)

- start client w/ optimistic lock:

  `docker-compose run client task2 optimisticUpdate`
  
  ![](/res/task2_3.png)
  ![](/res/task2_4.png)
  ![](/res/task2_5.png)

- start client w/ pessimistic lock:

  `docker-compose run client task2 pessimisticUpdate`
  
  ![](/res/task2_6.png)
  ![](/res/task2_7.png)
  ![](/res/task2_8.png)

### Task 5:

- start producer client:

  `docker-compose run client task3 producer`

- start consumer client:

  `docker-compose run client task3 consumer`

