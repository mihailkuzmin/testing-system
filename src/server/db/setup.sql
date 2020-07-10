CREATE TABLE PLanguage (
	id SERIAL PRIMARY KEY,
	name varchar(30) NOT NULL
);

CREATE TABLE Role (
    id SERIAL PRIMARY KEY,
    name varchar(30) NOT NULL
);

CREATE TABLE StudentGroup (
	id SERIAL PRIMARY KEY,
	name varchar(20) UNIQUE NOT NULL
);

CREATE TABLE Student (
	id SERIAL PRIMARY KEY,
	last_name varchar(30) NOT NULL,
	first_name varchar(30) NOT NULL,
	patronymic varchar(30) NOT NULL,
	book_number varchar(100),
	group_id INT REFERENCES StudentGroup(id) ON DELETE CASCADE,
	role_id INT NOT NULL REFERENCES Role(id),
	login varchar(100) NOT NULL,
	password varchar(100) NOT NULL
);

CREATE TABLE Work (
	id SERIAL PRIMARY KEY,
	name varchar(100) NOT NULL,
	open_at varchar(50) NOT NULL,
	close_at varchar(50) NOT NULL
);


CREATE TABLE TaskTopic (
	id SERIAL PRIMARY KEY,
	name varchar(30) UNIQUE NOT NULL
);

CREATE TABLE Task (
	id SERIAL PRIMARY KEY,
	name varchar(100) NOT NULL,
	description text NOT NULL,
	topic_id INT NOT NULL REFERENCES TaskTopic(id) ON DELETE CASCADE
);

CREATE TABLE Test (
	id SERIAL PRIMARY KEY,
	task_id INT NOT NULL REFERENCES Task(id) ON DELETE CASCADE,
	input text NOT NULL,
	output text NOT NULL
);

CREATE TABLE TaskResult (
	id SERIAL PRIMARY KEY,
	work_id INT NOT NULL REFERENCES Work(id),
	task_id INT NOT NULL REFERENCES Task(id),
	user_id INT NOT NULL REFERENCES Student(id),
	code text NOT NULL,
	code_output text NOT NULL,
	tests_passed INT NOT NULL,
	tests_count INT NOT NULL,
	language_id INT NOT NULL REFERENCES PLanguage(id)
);

CREATE TABLE WorkResult (
	id SERIAL,
	user_id INT NOT NULL REFERENCES Student(id),
	work_id INT NOT NULL REFERENCES Work(id),
	started_at varchar(50) NOT NULL,
	PRIMARY KEY(user_id, work_id)
);

CREATE TABLE StudentGroup_Work (
	group_id INT NOT NULL REFERENCES StudentGroup(id),
	work_id INT NOT NULL REFERENCES Work(id)
);

CREATE TABLE Work_Task (
	work_id INT NOT NULL REFERENCES Work(id),
	task_id INT NOT NULL REFERENCES Task(id)
);
