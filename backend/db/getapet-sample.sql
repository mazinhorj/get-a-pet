-- phpMyAdmin SQL Dump
-- version 5.1.1deb5ubuntu1
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Tempo de geração: 11-Maio-2023 às 13:03
-- Versão do servidor: 10.6.12-MariaDB-0ubuntu0.22.04.1
-- versão do PHP: 8.1.2-1ubuntu2.11

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Banco de dados: `getapet-sample`
--

-- --------------------------------------------------------

--
-- Estrutura da tabela `Images`
--

CREATE TABLE `Images` (
  `id` int(11) NOT NULL,
  `petpic` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `PetId` int(11) DEFAULT NULL,
  `UserId` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Extraindo dados da tabela `Images`
--

INSERT INTO `Images` (`id`, `petpic`, `createdAt`, `updatedAt`, `PetId`, `UserId`) VALUES
(1, '1683819216454363.jpg', '2023-05-11 15:33:36', '2023-05-11 15:33:36', 1, 1),
(2, '1683819254811840.jpg', '2023-05-11 15:34:14', '2023-05-11 15:34:14', 2, 1),
(3, '1683819254812580.jpg', '2023-05-11 15:34:14', '2023-05-11 15:34:14', 2, 1),
(4, '1683819254812696.jpg', '2023-05-11 15:34:14', '2023-05-11 15:34:14', 2, 1),
(5, '1683819372221177.jpg', '2023-05-11 15:36:12', '2023-05-11 15:36:12', 3, 2),
(6, '168381937223618.jpg', '2023-05-11 15:36:12', '2023-05-11 15:36:12', 3, 2),
(7, '1683819420261589.jpg', '2023-05-11 15:37:00', '2023-05-11 15:37:00', 4, 2),
(8, '1683819543972434.jpg', '2023-05-11 15:39:04', '2023-05-11 15:39:04', 5, 3),
(9, '1683820517032701.jpg', '2023-05-11 15:55:17', '2023-05-11 15:55:17', 6, 3),
(10, '1683820846250656.jpg', '2023-05-11 16:00:46', '2023-05-11 16:00:46', 7, 3);

-- --------------------------------------------------------

--
-- Estrutura da tabela `Pets`
--

CREATE TABLE `Pets` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `age` varchar(255) NOT NULL,
  `weight` int(11) NOT NULL,
  `color` varchar(255) DEFAULT NULL,
  `available` tinyint(1) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `profilepetpicId` int(11) DEFAULT NULL,
  `ownerId` int(11) DEFAULT NULL,
  `adopterId` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Extraindo dados da tabela `Pets`
--

INSERT INTO `Pets` (`id`, `name`, `age`, `weight`, `color`, `available`, `createdAt`, `updatedAt`, `profilepetpicId`, `ownerId`, `adopterId`) VALUES
(1, 'Archer', '2 anos', 6, 'encardido', 1, '2023-05-11 15:33:36', '2023-05-11 15:33:36', NULL, 1, NULL),
(2, 'Tpol', '2 meses', 4, 'branca', 1, '2023-05-11 15:34:14', '2023-05-11 15:34:14', NULL, 1, NULL),
(3, 'Athena', '1 ano', 7, 'marrom', 1, '2023-05-11 15:36:12', '2023-05-11 15:36:12', NULL, 2, NULL),
(4, 'Pandora', '1 ano', 7, 'branca', 1, '2023-05-11 15:37:00', '2023-05-11 15:37:00', NULL, 2, NULL),
(5, 'Moana', '11 meses', 7, 'preta', 1, '2023-05-11 15:39:03', '2023-05-11 15:39:03', NULL, 3, NULL),
(6, 'Kirk', '1 ano', 8, 'marrom', 1, '2023-05-11 15:55:17', '2023-05-11 15:55:17', NULL, 3, 1),
(7, 'Spock', '1 ano', 7, 'preto', 1, '2023-05-11 16:00:46', '2023-05-11 16:00:46', NULL, 3, NULL);

-- --------------------------------------------------------

--
-- Estrutura da tabela `Users`
--

CREATE TABLE `Users` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `ucpf` varchar(255) DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Extraindo dados da tabela `Users`
--

INSERT INTO `Users` (`id`, `name`, `email`, `password`, `phone`, `ucpf`, `image`, `createdAt`, `updatedAt`) VALUES
(1, 'Mazinho', 'teste@teste', '$2b$12$bQYkrQP7cObtopHu47b08usxyiPXAp8z2zulUGV2tt3en/FES0X3S', '555555555', '095.064.307-64', NULL, '2023-05-11 15:33:10', '2023-05-11 15:33:10'),
(2, 'Nanda', 'teste2@teste', '$2b$12$RSxZWElPv3fvzABCcDdWT.9ONvBa1fndhq5qtkUHmQ.vIW26D3C/u', '555555555', '100.835.607-77', NULL, '2023-05-11 15:34:55', '2023-05-11 15:34:55'),
(3, 'Bruno', 'teste3@teste', '$2b$12$zqxoOXEQNA2sXOdxwGlcl.EXgGJNlAsHBmMQ6HPbXwI1ETQdEJVSi', '555555555', '334.686.820-69', NULL, '2023-05-11 15:38:07', '2023-05-11 15:38:07');

--
-- Índices para tabelas despejadas
--

--
-- Índices para tabela `Images`
--
ALTER TABLE `Images`
  ADD PRIMARY KEY (`id`),
  ADD KEY `PetId` (`PetId`),
  ADD KEY `UserId` (`UserId`);

--
-- Índices para tabela `Pets`
--
ALTER TABLE `Pets`
  ADD PRIMARY KEY (`id`),
  ADD KEY `ownerId` (`ownerId`);

--
-- Índices para tabela `Users`
--
ALTER TABLE `Users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de tabelas despejadas
--

--
-- AUTO_INCREMENT de tabela `Images`
--
ALTER TABLE `Images`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT de tabela `Pets`
--
ALTER TABLE `Pets`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT de tabela `Users`
--
ALTER TABLE `Users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Restrições para despejos de tabelas
--

--
-- Limitadores para a tabela `Images`
--
ALTER TABLE `Images`
  ADD CONSTRAINT `Images_ibfk_1` FOREIGN KEY (`PetId`) REFERENCES `Pets` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `Images_ibfk_2` FOREIGN KEY (`UserId`) REFERENCES `Users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Limitadores para a tabela `Pets`
--
ALTER TABLE `Pets`
  ADD CONSTRAINT `Pets_ibfk_1` FOREIGN KEY (`ownerId`) REFERENCES `Users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
