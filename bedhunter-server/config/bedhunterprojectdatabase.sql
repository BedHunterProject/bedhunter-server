-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Gép: 127.0.0.1
-- Létrehozás ideje: 2022. Ápr 07. 14:46
-- Kiszolgáló verziója: 10.4.22-MariaDB
-- PHP verzió: 7.4.26

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Adatbázis: `bedhunterprojectdatabase`
--

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `categories`
--

CREATE TABLE `categories` (
  `id` int(11) NOT NULL,
  `category` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- A tábla adatainak kiíratása `categories`
--

INSERT INTO `categories` (`id`, `category`) VALUES
(1, 'hotel'),
(2, 'motel'),
(3, 'panzio'),
(4, 'diakszallo'),
(5, 'rbnb'),
(6, 'camping'),
(7, 'hostel'),
(8, 'ifjusagi szallo');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `hotels`
--

CREATE TABLE `hotels` (
  `id` int(11) NOT NULL,
  `name` varchar(200) NOT NULL,
  `address` varchar(200) NOT NULL,
  `contact_phone` varchar(50) NOT NULL,
  `contact_email` varchar(200) NOT NULL,
  `category_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- A tábla adatainak kiíratása `hotels`
--

INSERT INTO `hotels` (`id`, `name`, `address`, `contact_phone`, `contact_email`, `category_id`) VALUES
(1, 'Hotel Dzsungel', '4431 Nyíregyháza, Blaha Lujza sétány 41', '+36 (42) 479 710', 'szallas@hoteldzsungel.hu', 1),
(3, 'Hotel Pangea', '4431 Nyíregyháza, Blaha Lujza sétány 15', '+36 42 200 551', 'info@pangeahotel.hu', 1),
(4, 'Európa Hotel és Étterem', '4400 Nyíregyháza, Hunyadi u. 2.', '+36 42 508 670', 'info@europahotel.hu', 1),
(5, 'Korona Hotel és Étterem', '4400 Nyíregyháza, Dózsa György utca 1.', '+36308777979', 'recepcio@korona-hotel.hu', 1),
(7, 'Igrice Kemping és Nyaralófalu', '4431 Nyíregyháza-Sóstógyógyfürdő, Blaha Lujza sétány 4-6.', '+36 42/444-200', 'info@igricecamping.hu', 6),
(9, 'Hotel Sandra Ifjúsági Szálló', '4400 Nyíregyháza Sóstói u. 31/B\r\n', '06-42/ 440-031', 'info@hotelsandra.hu', 8),
(10, 'Irány Colorado Apartman', '4431 Nyíregyháza, Berenát utca 34', '+36 (42) 783-682', 'booking@coloradoapartman.hu', 3),
(11, 'Váci Panzió', '4400 Nyíregyháza Váci Mihály út 16.', '(+36) 42/727-301', 'vacipanzio@gmail.com', 3);

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `reservations`
--

CREATE TABLE `reservations` (
  `id` int(11) NOT NULL,
  `booking_time` datetime NOT NULL,
  `room_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `rooms`
--

CREATE TABLE `rooms` (
  `id` int(11) NOT NULL,
  `hotel_id` int(11) NOT NULL,
  `room_number` int(11) NOT NULL,
  `beds_number` int(11) NOT NULL,
  `date_start` date NOT NULL,
  `date_end` date NOT NULL,
  `price` int(11) NOT NULL,
  `description` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `email` varchar(200) NOT NULL,
  `password` varchar(50) NOT NULL,
  `name` varchar(200) NOT NULL,
  `birthdate` date NOT NULL,
  `phone` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- A tábla adatainak kiíratása `users`
--

INSERT INTO `users` (`id`, `email`, `password`, `name`, `birthdate`, `phone`) VALUES
(1, 'admin', 'admin_vagyok', 'ADMIN', '2022-02-22', '-');

--
-- Indexek a kiírt táblákhoz
--

--
-- A tábla indexei `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`id`);

--
-- A tábla indexei `hotels`
--
ALTER TABLE `hotels`
  ADD PRIMARY KEY (`id`);

--
-- A tábla indexei `reservations`
--
ALTER TABLE `reservations`
  ADD PRIMARY KEY (`id`);

--
-- A tábla indexei `rooms`
--
ALTER TABLE `rooms`
  ADD PRIMARY KEY (`id`);

--
-- A tábla indexei `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- A kiírt táblák AUTO_INCREMENT értéke
--

--
-- AUTO_INCREMENT a táblához `categories`
--
ALTER TABLE `categories`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT a táblához `hotels`
--
ALTER TABLE `hotels`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT a táblához `reservations`
--
ALTER TABLE `reservations`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT a táblához `rooms`
--
ALTER TABLE `rooms`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT a táblához `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
