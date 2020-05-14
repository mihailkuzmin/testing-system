INSERT INTO StudentGroup VALUES (DEFAULT, 'АП-31');
INSERT INTO StudentGroup VALUES (DEFAULT, 'УС-31');
INSERT INTO StudentGroup VALUES (DEFAULT, 'АП-191');

INSERT INTO Student VALUES (DEFAULT, 'Шаров', 'Константин', 'Аркадьевич', '6700984', 1, 'login1', 'password1');
INSERT INTO Student VALUES (DEFAULT, 'Исаков', 'Клим', 'Ярославович', '2890827', 1, 'login2', 'password2');
INSERT INTO Student VALUES (DEFAULT, 'Мясников', 'Арнольд', 'Артемович', '2478722', 1, 'login3', 'password3');
INSERT INTO Student VALUES (DEFAULT, 'Блинов', 'Мирон', 'Олегович', '3836977', 2, 'login4', 'password4');
INSERT INTO Student VALUES (DEFAULT, 'Виноградов', 'Владислав', 'Георгьевич', '8638902', 2, 'login5', 'password5');

INSERT INTO Work VALUES (DEFAULT, 'Работа 1. ИТ', '2020-03-01 03:00', '2020-03-20 03:00');
INSERT INTO Work VALUES (DEFAULT, 'Работа 2. ИТ', '2020-03-01 03:00', '2020-03-20 03:00');
INSERT INTO Work VALUES (DEFAULT, 'Работа 1. Программирование', '2020-03-01 03:00', '2020-03-20 03:00');
INSERT INTO Work VALUES (DEFAULT, 'Работа 2. Программирование', '2020-03-15 00:00', '2020-03-18 00:00');

INSERT INTO TaskTopic (name) VALUES ('Массивы'), ('Строки'), ('Рекурсия'), ('Графы'), ('Деревья');

INSERT INTO Task
    (name, description, topic_id)
VALUES
    ('Task 1 name', 'Task 1 desc', 1),
    ('Task 2 name', 'Task 2 desc', 1),
    ('Task 3 name', 'Task 3 desc', 2),
    ('Task 4 name', 'Task 4 desc', 2),
    ('Task 5 name', 'Task 5 desc', 3),
    ('Task 6 name', 'Task 6 desc', 4),
    ('Task 7 name', 'Task 7 desc', 4),
    ('Task 8 name', 'Task 8 desc', 4);

INSERT INTO Test
    (task_id, input, output)
VALUES
    (1, 'Test 1 Input', 'Test 1 Output'),
    (2, 'Test 2 Input', 'Test 2 Output'),
    (3, 'Test 3 Input', 'Test 3 Output'),
    (4, 'Test 4 Input', 'Test 4 Output'),
    (5, 'Test 5 Input', 'Test 5 Output'),
    (6, 'Test 6 Input', 'Test 6 Output'),
    (7, 'Test 7 Input', 'Test 7 Output'),
    (7, 'Test 8 Input', 'Test 8 Output'),
    (8, 'Test 9 Input', 'Test 9 Output');

INSERT INTO Work_Task VALUES (1, 1);
INSERT INTO Work_Task VALUES (1, 2);
INSERT INTO Work_Task VALUES (1, 3);
INSERT INTO Work_Task VALUES (2, 2);
INSERT INTO Work_Task VALUES (2, 3);
INSERT INTO Work_Task VALUES (2, 4);
INSERT INTO Work_Task VALUES (3, 3);
INSERT INTO Work_Task VALUES (3, 4);
INSERT INTO Work_Task VALUES (3, 5);
INSERT INTO Work_Task VALUES (4, 4);
INSERT INTO Work_Task VALUES (4, 5);
INSERT INTO Work_Task VALUES (4, 6);

INSERT INTO StudentGroup_Work VALUES (1, 1);
INSERT INTO StudentGroup_Work VALUES (1, 2);
INSERT INTO StudentGroup_Work VALUES (2, 3);
INSERT INTO StudentGroup_Work VALUES (3, 4);

INSERT INTO PLanguage VALUES (DEFAULT, 'Go');
INSERT INTO PLanguage VALUES (DEFAULT, 'C++');
INSERT INTO PLanguage VALUES (DEFAULT, 'Scala');
INSERT INTO PLanguage VALUES (DEFAULT, 'Ruby');
INSERT INTO PLanguage VALUES (DEFAULT, 'JavaScript');
INSERT INTO PLanguage VALUES (DEFAULT, 'Pascal');
INSERT INTO PLanguage VALUES (DEFAULT, 'Python');
INSERT INTO PLanguage VALUES (DEFAULT, 'PHP');

INSERT INTO TaskResult VALUES (DEFAULT, 1, 1, 1, 'Program text', 'Program output', TRUE, 1);
INSERT INTO TaskResult VALUES (DEFAULT, 1, 2, 1, 'Program text', 'Program output', TRUE, 1);
INSERT INTO TaskResult VALUES (DEFAULT, 1, 3, 1, 'Program text', 'Program output', TRUE, 1);
INSERT INTO TaskResult VALUES (DEFAULT, 4, 3, 7, 'Program text', 'Program output', FALSE, 7);
INSERT INTO TaskResult VALUES (DEFAULT, 4, 4, 7, 'Program text', 'Program output', TRUE, 7);


