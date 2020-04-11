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

INSERT INTO Task VALUES (DEFAULT, 'Task 1 desc', 'Example input 1', 'Example output 1', 'Correct output 1');
INSERT INTO Task VALUES (DEFAULT, 'Task 2 desc', 'Example input 2', 'Example output 2', 'Correct output 2');
INSERT INTO Task VALUES (DEFAULT, 'Task 3 desc', 'Example input 3', 'Example output 3', 'Correct output 3');
INSERT INTO Task VALUES (DEFAULT, 'Task 4 desc', 'Example input 4', 'Example output 4', 'Correct output 4');
INSERT INTO Task VALUES (DEFAULT, 'Task 5 desc', 'Example input 5', 'Example output 5', 'Correct output 5');
INSERT INTO Task VALUES (DEFAULT, 'Task 6 desc', 'Example input 6', 'Example output 6', 'Correct output 6');
INSERT INTO Task VALUES (DEFAULT, 'Task 7 desc', 'Example input 7', 'Example output 7', 'Correct output 7');
INSERT INTO Task VALUES (DEFAULT, 'Task 8 desc', 'Example input 8', 'Example output 8', 'Correct output 8');

INSERT INTO Test VALUES (DEFAULT, 1, 'Test 1 Input', 'Test 1 Output');
INSERT INTO Test VALUES (DEFAULT, 2, 'Test 2 Input', 'Test 2 Output');
INSERT INTO Test VALUES (DEFAULT, 3, 'Test 3 Input', 'Test 3 Output');
INSERT INTO Test VALUES (DEFAULT, 4, 'Test 4 Input', 'Test 4 Output');
INSERT INTO Test VALUES (DEFAULT, 5, 'Test 5 Input', 'Test 5 Output');
INSERT INTO Test VALUES (DEFAULT, 6, 'Test 6 Input', 'Test 6 Output');
INSERT INTO Test VALUES (DEFAULT, 7, 'Test 7 Input', 'Test 7 Output');
INSERT INTO Test VALUES (DEFAULT, 8, 'Test 8 Input', 'Test 8 Output');

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


