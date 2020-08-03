INSERT INTO Role (name) VALUES ('Студент'), ('Модератор'), ('Администратор');

INSERT INTO StudentGroup (name) VALUES ('АП-31'), ('УС-31');

INSERT INTO Student
    (last_name, first_name, patronymic, book_number, group_id, role_id, login, password)
VALUES
    ('Администратор', '', '', NULL, NULL, 3, 'admin', 'b88c043a8fe9ad3b80d00108c61827b4.ad70172de59850cffd6fd62843f51f9f'),
    ('Шаров', 'Константин', 'Аркадьевич', '1274869', 1, 1, 'user', '1cb7afa1cf4058ff6bf59c44a5c61fe3.339ccc7615eee9b305cb41fdba2d63d4'),
    ('Исаков', 'Клим', 'Ярославович', '2890827', 1, 1, 'login2', '3f2969202fef7659b5d65f26c171b909.c0b1f8c16ce2005ba3d2e60d1eae7b2f'),
    ('Мясников', 'Арнольд', 'Артемович', '2478722', 1, 1, 'login3', '4082d84e0562fae4798fd436a52277fa.c4171237f893a3c64c69b62bb3326e87'),
    ('Блинов', 'Мирон', 'Олегович', '3836977', 2, 1, 'login4', '942acb10626e2095dbb78e8078e386bd.7a04a915800cecddc21c18ed2cd4af09'),
    ('Иванов', 'Владислав', 'Петрович', '8638902', 2, 1, 'login5', '9d0f558c49f28368eb78f70d50e4b08f.03f56b29019edc6c4759cfd4ff525fca');

INSERT INTO Work
    (name, open_at, close_at, time_to_complete)
VALUES
    ('Работа 1. Программирование', '2020-07-11T12:00:00.000Z', '2020-07-31T17:00:00.000Z', '2020-07-10T23:00:29.894Z');

INSERT INTO TaskTopic (name) VALUES ('Массивы'), ('Строки'), ('Рекурсия'), ('Графы'), ('Деревья');

INSERT INTO Task
    (name, description, topic_id)
VALUES
    ('Task 1 name', 'Task 1 desc', 1),
    ('Task 2 name', 'Task 2 desc', 1),
    ('Task 3 name', 'Task 3 desc', 2);

INSERT INTO Test
    (task_id, input, output)
VALUES
    (1, 'Test 1 Input', 'Test 1 Output'),
    (2, 'Test 2 Input', 'Test 2 Output'),
    (3, 'Test 3 Input', 'Test 3 Output');

INSERT INTO Work_Task
    (work_id, task_id)
VALUES
    (1, 1), (1, 2), (1, 3);

INSERT INTO StudentGroup_Work (group_id, work_id) VALUES (1, 1);

INSERT INTO PLanguage (name) VALUES ('JavaScript'), ('Python');


