from models.mongo import getIdUsers
from models.mysql import mysqlRemoveUsers,mysqlBackup,mysqlRestaurar

mysqlRemoveUsers(getIdUsers())

mysqlBackup('localhost', 'root', 'fatec', 'clientes', '/home/mateus/mysql/backup/')
mysqlRestaurar('localhost', 'root', 'fatec', 'clientes', '/home/mateus/mysql/backup/clientes_backup_2023-11-21_18-08-43.sql')