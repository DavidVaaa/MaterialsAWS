LOAD DATA LOCAL INFILE "C:/Users/david/OneDrive/Escritorio/UM/AWS/Proyecto 2.0/Data.csv"
INTO TABLE materials  
FIELDS TERMINATED BY ','  
LINES terminated by '\n' 
IGNORE 1 ROWS
