#!/bin/bash

BKPNUMERO=$(echo $(cat logs/deleteuser.log | grep -n 27 | cut -d ":" -f1 | cut -d " " -f1) | cut -d " " -f1)
if [ $BKPNUMERO -eq 1 ]
then
    BKPNUMERO=0
fi
LINHAS=$( wc -l logs/deleteuser.log | cut -d " " -f1)
NUMERO_LINHAS_ARQ=$(expr 1 + $LINHAS )
NUMERO_LINHAS=$(expr $NUMERO_LINHAS_ARQ - $BKPNUMERO )
IDS=$(tail -n $NUMERO_LINHAS logs/deleteuser.log | cut -d ":" -f6)

for i in $IDS    
do
        echo "valor - $i"
        docker exec mysql-server mysql -h"localhost" -u"root" -p"fatec" -e"use clientes;"  -e "DELETE FROM cliente WHERE id = $i;"
done
