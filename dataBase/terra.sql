-- phpMyAdmin SQL Dump
-- version 5.1.0
-- https://www.phpmyadmin.net/
--
-- Хост: 127.0.0.1:3306
-- Время создания: Апр 29 2022 г., 15:28
-- Версия сервера: 8.0.24
-- Версия PHP: 8.0.8

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- База данных: `terra`
--

-- --------------------------------------------------------

--
-- Структура таблицы `inspections`
--

CREATE TABLE `inspections` (
  `id` int NOT NULL,
  `type` varchar(150) NOT NULL,
  `v` int NOT NULL,
  `date` varchar(20) NOT NULL,
  `status` varchar(30) NOT NULL,
  `fio` varchar(150) NOT NULL,
  `keyLS` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `address` varchar(300) NOT NULL,
  `measur` float NOT NULL,
  `DL` mediumtext CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `file` varchar(300) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

-- --------------------------------------------------------

--
-- Структура таблицы `users`
--

CREATE TABLE `users` (
  `id` int NOT NULL,
  `fio` varchar(255) NOT NULL,
  `post` int NOT NULL,
  `groupDop` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `status` int NOT NULL DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

--
-- Дамп данных таблицы `users`
--

INSERT INTO `users` (`id`, `fio`, `post`, `groupDop`, `status`) VALUES
(1, 'Иванов ИИ', 1, '3', 1),
(2, 'Смирнов СИ', 1, '5', 1),
(3, 'Лебедев АИ', 1, '3', 1),
(4, 'Попов ПИ', 0, '5', 1),
(5, 'Кузнецов ВП', 0, '2', 1),
(6, 'Соколов ИР', 0, '3', 1),
(7, 'Новиков ТП', 0, '2', 1),
(8, 'Морозов КР', 0, '3', 1);

--
-- Индексы сохранённых таблиц
--

--
-- Индексы таблицы `inspections`
--
ALTER TABLE `inspections`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT для сохранённых таблиц
--

--
-- AUTO_INCREMENT для таблицы `inspections`
--
ALTER TABLE `inspections`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT для таблицы `users`
--
ALTER TABLE `users`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
