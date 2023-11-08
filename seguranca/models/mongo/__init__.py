from pymongo import MongoClient


def mongoConnection():
    try:
        URI = 'mongodb+srv://fatec:CwNdaImFjuebsHKh@cluster0.gyfwek9.mongodb.net/'
        client = MongoClient(URI)
        db = client['seguranca']  
        print("Conexão bem-sucedida ao MongoDB")
        return db
    except Exception as e:
        print(f"Erro ao conectar ao MongoDB: {str(e)}")
        return None
    
def getIdUsers():
    try:
        db = mongoConnection()
        ids = []
        for i in db.users.find():
            ids.append(int(i['cli_id']))
        return tuple(ids)
    except Exception as e :
        return e