from models.mongo import getIdUsers
from models.mysql import mysqlRemoveUsers

mysqlRemoveUsers(getIdUsers())