#!/bin/bash

BKPNUMERO=$(cat logs/deleteuser.log | grep -n 11 | cut -d ":" -f1)

LINHAS=$( wc -l logs/deleteuser.log | cut -d " " -f1)
NUMERO_LINHAS=$(expr 1 + $LINHAS )

echo $NUMERO_LINHAS