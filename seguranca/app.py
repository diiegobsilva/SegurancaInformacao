from models.mongo import getIdUsers
from models.mysql import mysqlRemoveUsers,mysqlBackup

mysqlRemoveUsers(getIdUsers())

mysqlBackup('localhost', 'root', 'fatec', 'clientes', '/home/mateus/mysql/backup/')