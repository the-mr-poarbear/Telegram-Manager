from database import Base
from sqlalchemy import Column, Integer, String,Date,DateTime,Boolean,ForeignKey
from sqlalchemy.orm import relationship

class Admin(Base):
    __tablename__ = "admin"
    admin_id = Column(Integer,primary_key=True,nullable=False,autoincrement=True) 
    username = Column(String,nullable=False, unique = True) 
    password = Column(String,nullable=False) 
    firstname = Column(String,nullable=False) 
    lastname = Column(String,nullable=False)
    
    bot_admin_rel = relationship("BotAdmin",back_populates="admin_rel")
    container_admin_rel = relationship("ContainerAdmin",back_populates="admin_rel")

class Bot(Base):
    __tablename__ = "bot"
    bot_id = Column(Integer,primary_key=True,nullable=False,autoincrement=True)
    username = Column(String,nullable=False, unique = True) 
    title = Column(String,nullable=False) 
    create_date = Column(Date,nullable=False)
    last_active = Column(Date,nullable=False)
    info = Column(String,nullable=False)

    bot_admin_rel = relationship("BotAdmin",back_populates="bot_rel")
    bot_container_rel = relationship("BotContainer",back_populates="bot_rel")
    bot_history_rel = relationship("BotHistory",back_populates="bot_rel")

class BotAdmin(Base):
    __tablename__ = "bot_admin"
    admin_id = Column(Integer,ForeignKey("admin.admin_id"),primary_key=True,nullable=False)
    bot_id = Column(Integer,ForeignKey("bot.bot_id"),primary_key=True,nullable=False)

    admin_rel = relationship("Admin",back_populates="bot_admin_rel")
    bot_rel = relationship("Bot",back_populates="bot_admin_rel")

class BotContainer(Base):
    __tablename__ = "bot_container"
    bot_id = Column(Integer,ForeignKey("bot.bot_id"),primary_key=True,nullable=False)
    container_id = Column(Integer,ForeignKey("container.container_id"),primary_key=True,nullable=False)

    bot_rel = relationship("Bot",back_populates="bot_container_rel")
    container_rel = relationship("Container",back_populates="bot_container_rel")

class BotHistory(Base):
    __tablename__ = "bot_history"
    bot_history_id = Column(Integer,primary_key=True,nullable=False,index=True)
    bot_id = Column(Integer,ForeignKey("bot.bot_id"),nullable=False)
    message_id = Column(Integer,ForeignKey("message.message_id"),nullable=False)
    time_sent = Column(DateTime,nullable=False)

    bot_rel = relationship("Bot",back_populates="bot_history_rel")
    message_rel = relationship("Message",back_populates="bot_history_rel")

class Container(Base):
    __tablename__ = "container"
    container_id = Column(Integer,primary_key=True,nullable=False,index=True)
    title = Column(String,nullable=False)
    info = Column(String,nullable=True)
    type_id = Column(Integer,ForeignKey("type.type_id"),nullable=False)
    create_date = Column(Date,nullable=False)

    bot_container_rel = relationship("BotContainer",back_populates="container_rel")
    type_rel = relationship("Type",back_populates="container_rel")
    container_admin_rel = relationship("ContainerAdmin",back_populates="container_rel")
    message_rel = relationship("Message",back_populates="container_rel")

class ContainerAdmin(Base):
    __tablename__ = "container_admin"
    admin_id = Column(Integer,ForeignKey("admin.admin_id"),primary_key=True,nullable=False)
    container_id = Column(Integer,ForeignKey("container.container_id"),primary_key=True,nullable=False)

    container_rel = relationship("Container",back_populates="container_admin_rel")
    admin_rel = relationship("Admin",back_populates="container_admin_rel")

class Message(Base):
    __tablename__ = "message"
    message_id = Column(Integer,primary_key=True,nullable=False,index=True)
    content = Column(String,nullable=False)
    container_id = Column(Integer,ForeignKey("container.container_id"),nullable=False)
    create_date = Column(Date,nullable=False)
    is_deleted = Column(Boolean,nullable=False)
    deleted_date = Column(Date,nullable=True)

    bot_history_rel = relationship("BotHistory",back_populates="message_rel")
    container_rel = relationship("Container",back_populates="message_rel")

class SuperAdmin(Base):
    __tablename__ = "super_admin"
    super_admin_id = Column(Integer,primary_key=True,nullable=False,index=True)
    username = Column(String,nullable=False, unique = True)
    password = Column(String,nullable=False)

class Type(Base):
    __tablename__ = "type"
    type_id = Column(Integer,primary_key=True,nullable=False,index=True)
    type_name = Column(String,nullable=False)

    container_rel = relationship("Container", back_populates="type_rel")

    