from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.ext.declarative import declarative_base

ULR_DATABASE = "sqlite:///./database.db"

engine = create_engine(ULR_DATABASE , connect_args={"check_same_thread" : False} , echo=True) 

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()