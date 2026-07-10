import mysql.connector


class DatabaseSeassion:
    def __init__(self):
        self.connection = mysql.connector.connect(
            host="localhost",
            port=3000,
            user="root",
            password="root",
            database="astropilot"
        )
        self.cursor = self.connection.cursor(dictionary=True)

