CREATE ALGORITHM=UNDEFINED DEFINER=`admin`@`%` SQL SECURITY DEFINER VIEW `indice_SyA5` AS select `m`.`Material` AS `Material`,(`m`.`Sy` / `m`.`elongation_at_break`) AS `Sy/A5` from `materials` `m`;
