import sqlite3

connection = sqlite3.connect('database.db')

sql = "update message set deleted_date='2024-06-23' where message_id=36"

connection.execute(sql)
connection.commit()
print('success')