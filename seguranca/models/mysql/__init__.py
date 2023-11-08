def mysqlConnection():
    import mysql.connector
    from mysql.connector import errorcode

    try:
        connection = mysql.connector.connect(user='root', password="fatec",
                                    database='nova')
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
            sql = f"delete from nova.users where id in {ids};"
            mycursor.execute(sql)
            db.commit()
            print(mycursor.rowcount, "record(s) deleted")
            db.close()
    except Exception as e:
        return e