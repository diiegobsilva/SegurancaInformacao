from models.mongo import getIdUsers
from models.mysql import mysqlRemoveUsers,mysqlBackup,mysqlRestaurar

mysqlRemoveUsers(getIdUsers())

mysqlBackup('localhost', 'root', 'fatec', 'clientes', '/home/mateus/mysql/backup/', True)
mysqlRestaurar('localhost', 'root', 'fatec', 'clientes', '/home/mateus/mysql/backup/clientes_backup_2023-11-22_07-40-42.sql', True)