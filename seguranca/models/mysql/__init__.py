import subprocess
import shlex
import os
import datetime


def mysqlConnection():
    import mysql.connector
    from mysql.connector import errorcode

    try:
        connection = mysql.connector.connect(host='bancoteste.mysql.database.azure.com' , user='fatec', password="sjc123@w",
                                    database='clientes')
        print("Foi")
        return connection
    except mysql.connector.Error as err:
        if err.errno == errorcode.ER_ACCESS_DENIED_ERROR:
            print("Something is wrong with your user name or password")
        elif err.errno == errorcode.ER_BAD_DB_ERROR:
            print("Database does not exist")
        else:
            print(err)

def mysqlRemoveUsers(ids):
    try:
        db = mysqlConnection()
        if db.is_connected():
            mycursor = db.cursor()
            sql = f"delete from clientes.cliente where id in {ids};"
            mycursor.execute(sql)
            db.commit()
            print(mycursor.rowcount, "record(s) deleted")
            db.close()
    except Exception as e:
        return e
    


def mysqlBackup(host, usuario, senha, banco, caminho_backup, docker):
    """Cria um backup do MySQL."""
    data_hora_atual = datetime.datetime.now().strftime("%Y-%m-%d_%H-%M-%S")
    nome_arquivo_backup = f"{banco}_backup_{data_hora_atual}.sql"
    caminho_completo_backup = os.path.join(caminho_backup, nome_arquivo_backup)
    backup = os.path.join('/var/mysql/backup/', nome_arquivo_backup)
    try:
        os.makedirs(caminho_backup, exist_ok=True)

        if docker == True:
            comando = f"docker exec mysql sh -c 'mysqldump -h {host} -u {usuario} -p{senha} --routines --triggers --databases {banco} > {backup}'"
            subprocess.run(shlex.split('docker exec mysql mkdir -p /var/mysql/backup/'), check=True)
            subprocess.run(shlex.split(comando), check=True)
            with open(caminho_completo_backup, 'wb') as f:
                subprocess.run(shlex.split(f'docker exec mysql cat {backup}'), check=True, stdout=f)
        else:
            comando = f"mysqldump -h {host} -u {usuario} -p{senha} --routines --triggers --databases {banco} -r {caminho_completo_backup}"
            subprocess.run(shlex.split(comando), check=True)

        # Executa o comando para criar o backup
        
        print("Backup criado com sucesso!")
    except subprocess.CalledProcessError as e:
        print(f"Erro ao criar o backup: {e}")


def mysqlRestaurar(host, usuario, senha, banco, caminho_backup, docker):
    """Restaura um backup do MySQL."""
    if docker == True:
        comando = f"docker exec mysql mysql -h {host} -u {usuario} -p{senha} {banco} < {caminho_backup}"
    else:
        #comando = f"mysql -h {host} -u {usuario} -p{senha} {banco} < {caminho_backup}"
        comando = f"mysql -h {host} -u {usuario} -p{senha} {banco}"

    try:
        with open(caminho_backup, 'rb') as arquivo:
            subprocess.Popen(comando, stdin=arquivo, shell=True).wait()
        #subprocess.run(shlex.split(comando), check=True)
        print("Backup restaurado com sucesso!")
    except subprocess.CalledProcessError as e:
        print(f"Erro ao restaurar o backup: {e}")