#!/bin/bash

BKPNUMERO=$(cat logs/deleteuser.log | grep -n 11 | cut -d ":" -f1)
LINHAS=$( wc -l logs/deleteuser.log | cut -d " " -f1)
NUMERO_LINHAS_ARQ=$(expr 1 + $LINHAS )
NUMERO_LINHAS=$(expr $NUMERO_LINHAS_ARQ - $BKPNUMERO )
IDS=$(tail -n $NUMERO_LINHAS logs/deleteuser.log | cut -d ":" -f6)

for i in $IDS    
do
        echo "valor - $i"
done
