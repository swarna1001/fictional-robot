CREATE TABLE `users` (
	`id` serial AUTO_INCREMENT PRIMARY KEY NOT NULL,
	`email` varchar(256),
	`name` varchar(256),
	`is_admin` boolean,
	`google_id` varchar(256));
