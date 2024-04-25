-- MySQL dump 10.13  Distrib 8.0.32, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: absent
-- ------------------------------------------------------
-- Server version	8.0.32

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  `email` varchar(45) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` varchar(45) NOT NULL,
  `phone` varchar(45) NOT NULL,
  `photo` varchar(225) DEFAULT NULL,
  `position` varchar(45) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'Ralfi','ralfi@mail.com','$2a$10$hRBIJz4rGypaUpDF1ic/ZeCfh6jiyXPBT7bDCd3Xqu..O6LuWFWbe','admin','08529999999','1714037987652-WhatsApp Image 2023-10-23 at 20.49.34.jpeg','Software Engineer'),(3,'anto azza','anton@mail.com','$2a$10$AU13O2dRfxIwwMmrzU7F4OLU20yce0lAb.mX4lTnz42oUhvL5nBK.','admin','0812346789','1714043810742-Status.jpg','ADMIN'),(4,'Lia aminudin','lia_aminudin@mail.com','$2a$10$0Ns8DY02Ze5aKYh0sUkEG.WoK4fXdJNN0ilTy8tAqQkK4t51ZQc.O','user','08123123123','1714040409667-rr.jpeg','QA Engineer'),(5,'Fahrul','fahrul@mail.com','$2a$10$xJy2PP1Y2ySDJAiIuzdrCOF27nUv16a5gXa5QyESPntoKGNt4bzxu','user','084545454545','1714041303908-wfh.jpg','Project Manager'),(6,'Asep','asep@mail.com','$2a$10$.2m0x85t4n/xbKfSSy2NCuS6qn/vmjh0AJ.xSk9iHRjVrnxW6NrXe','user','0812345689','1714040924408-Foto ralfi.jpg','hallo');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-04-25 18:44:05
