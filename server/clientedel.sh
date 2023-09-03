#!/bin/bash

MONGO_JSON=$(docker exec MONGODB_APP mongosh --quiet -eval "use clientes" -eval "db.cliente.find({ date: { \$gte: ISODate('2023-09-03T00:00:00Z') } })")

IDS=$(echo $MONGO_JSON | sed 's/{/{\n/g; s/}/\n}/g; s/,/\n,/g' | grep cli_id | cut -d ":" -f2 | sed 's/ //g' )

for i in $IDS    
do
        echo "Deletando usuario com ID: $i"
        docker exec mysql-server mysql -h"localhost" -u"root" -p"fatec" -e"use clientes;"  -e "DELETE FROM cliente WHERE id = $i;" > /dev/null 2>&1
done
