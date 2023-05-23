LOAD DATA LOCAL INFILE "C:/Users/david/OneDrive/Escritorio/UM/AWS/Proyecto 2.0/material.csv"
INTO TABLE material_composition
FIELDS TERMINATED BY ','  
LINES terminated by '\n' 
IGNORE 1 ROWS
