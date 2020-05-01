CREATE TABLE PLanguage (
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
	book_number varchar(100) NOT NULL,
	group_id INT NOT NULL REFERENCES StudentGroup(id) ON DELETE CASCADE,
	login varchar(100) NOT NULL,
	password varchar(100) NOT NULL
);

CREATE TABLE Work (
	id SERIAL PRIMARY KEY,
	name varchar(100) NOT NULL,
	open_at timestamp NOT NULL,
	close_at timestamp NOT NULL
);


CREATE TABLE TaskTopic (
    id SERIAL PRIMARY KEY,
    name varchar(30) NOT NULL
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
	work_id INT NOT NULL,
	task_id INT NOT NULL,
	student_id INT NOT NULL,
	program_text text NOT NULL,
	program_output text NOT NULL,
	solved BOOLEAN NOT NULL,
	language_id INT REFERENCES PLanguage(id) NOT NULL
);

CREATE TABLE WorkResult (
	id SERIAL PRIMARY KEY,
	user_id INT NOT NULL,
	work_id INT NOT NULL
);

CREATE TABLE StudentGroup_Work (
	group_id INT NOT NULL,
	work_id INT NOT NULL
);

CREATE TABLE Work_Task (
	work_id INT NOT NULL,
	task_id INT NOT NULL
);
