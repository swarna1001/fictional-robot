CREATE TABLE `inventory` (
	`inventory_id` serial AUTO_INCREMENT PRIMARY KEY NOT NULL,
	`name` varchar(256),
	`description` text,
	`category` varchar(256),
	`quantity_in_stock` int,
	`unit_price` int,
	`supplier` varchar(256),
	`date_added` datetime,
	`added_by` varchar(256),
	`is_approved` boolean,
	`approved_by` varchar(256),
	`is_deleted` boolean);
