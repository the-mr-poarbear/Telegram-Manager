from pydantic import BaseModel
from datetime import date,datetime

class AdminBase(BaseModel):
    
    username: str 
    password: str 
    firstname: str 
    lastname: str

class AdminModel(AdminBase):
    admin_id: int
    class Config:
        from_attributes = True


class BotBase(BaseModel):
    username: str
    title: str
    info: str

class BotModel(BotBase):
    bot_id: int
    create_date: date
    last_active: date
    class Config:
        from_attributes = True


class BotAdminBase(BaseModel):
    admin_id: int
    bot_id: int

class BotAdminModel(BotAdminBase):
    class Config:
        from_attributes = True


class BotContainerBase(BaseModel):
    bot_id: int
    container_id: int

class BotContainerModel(BotContainerBase):
    class Config:
        from_attributes = True


class BotHistoryBase(BaseModel):
    bot_history_id: int
    bot_id: int 
    message_id: int
    time_sent: datetime

class BotHistoryModel(BotHistoryBase):
    class Config:
        from_attributes = True


class ContainerBase(BaseModel):
    title: str
    info: str
    type_id: int

class ContainerModel(ContainerBase):
    container_id: int
    create_date: date
    class Config:
        from_attributes = True


class ContainerAdminBase(BaseModel):
    admin_id: int
    container_id: int

class ContainerAdminModel(ContainerAdminBase):
    class Config:
        from_attributes = True


class MessageBase(BaseModel):
    content: str
    container_id: int

class MessageModel(MessageBase):
    message_id: int
    create_date: date
    is_deleted: bool
    deleted_date: date | None
    class Config:
        from_attributes = True


class SuperAdminBase(BaseModel):
    super_admin_id: int
    username: str
    password: str

class SuperAdminModel(SuperAdminBase):
    class Config:
        from_attributes = True

class Token(BaseModel):
    access_token: str
    token_type: str

class TokenData(BaseModel):
    id: int