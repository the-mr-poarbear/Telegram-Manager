from fastapi import FastAPI, Depends, status, HTTPException,Body
from typing import Annotated
from sqlalchemy.orm import Session
from database import SessionLocal,engine
from fastapi.middleware.cors import CORSMiddleware
import models
import basemodels
import hashlib
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from datetime import datetime, timedelta, timezone, date
import jwt
from jwt.exceptions import InvalidTokenError
from sqlalchemy import and_,func
import logging
from sqlalchemy.exc import SQLAlchemyError

from sqlalchemy.dialects import postgresql,sqlite


SECRET_KEY = "82aae4058e06a6746ebdd345bb19340223780baa5eb704bcc8890983c20c4739"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="login")

app = FastAPI()

# origins = [
#     "http://localhost:*",
#     "http://localhost:5173",
#     "http://localhost:3000",
#     "https://3mtrzrtmjh.loclx.io",
# ]

app.add_middleware(
    CORSMiddleware,
    # allow_origins=origins,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
    expose_headers = ["*"]
)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

db_dependency = Annotated[Session, Depends(get_db)]
models.Base.metadata.create_all(bind=engine)


def validate_adminID(admin_id: int, db:db_dependency):

    admin_exist = db.query(models.Admin).filter(models.Admin.admin_id == admin_id).first()

    if not admin_exist:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Admin does not exist")
    

def validate_botID(bot_id: int, db:db_dependency):

    bot_exist = db.query(models.Bot).filter(models.Bot.bot_id == bot_id).first()

    if not bot_exist:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Bot does not exist")
    
def validate_messageID(message_id: int, db:db_dependency):

    message_exist = db.query(models.Message).filter(models.Message.message_id == message_id).first()

    if not message_exist:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Message does not exist")
    
def validate_containerID(container_id: int, db:db_dependency):

    container_exist = db.query(models.Container).filter(models.Container.container_id == container_id).first()

    if not container_exist:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Container does not exist")



@app.get('/')
async def root(db:db_dependency):
    admins = db.query(models.Admin).all()
    bot = db.query(models.Bot).all()
    bot_admin = db.query(models.BotAdmin).all()
    bot_container = db.query(models.BotContainer).all()
    bot_history = db.query(models.BotHistory).all()
    container = db.query(models.Container).all()
    container_admin = db.query(models.ContainerAdmin).all()
    message = db.query(models.Message).all()
    super_admin = db.query(models.SuperAdmin).all()
    type = db.query(models.Type).all()
    return {
        'admin':admins,
        'bot':bot,
        'bot_admin':bot_admin,
        'bot_container':bot_container,
        'bot_history':bot_history,
        'container':container,
        'container_admin':container_admin,
        'message':message,
        'super_admin':super_admin,
        'type':type   
    }
    

@app.get('/registerAuthentication/{username}')
async def register_authentication(username: str , db: db_dependency):

    username_taken = db.query(models.Admin).filter(models.Admin.username == username).first()

    if username_taken:
        return False

    return True

@app.post('/register')
async def register_admin(admin: basemodels.AdminBase, db: db_dependency):

    try:
        admin.password = hashlib.sha256(admin.password.encode('utf-8')).hexdigest()
        db_admin = models.Admin(**admin.model_dump())

        db.add(db_admin)
        db.commit()
        db.refresh(db_admin)

        return True

    except SQLAlchemyError as e:
        db.rollback() 
        logging.error(f"SQLAlchemyError: {e}")
        raise HTTPException(status_code=400, detail=str(e))
    except Exception as e:
        db.rollback() 
        logging.error(f"Exception: {e}")
        raise HTTPException(status_code=400, detail=str(e))   


def authenticate_admin(username:str, password:str, db: db_dependency):
    admin = db.query(models.Admin).filter(models.Admin.username == username).first()
    if not admin:
        return False
    if admin.password != hashlib.sha256(password.encode('utf-8')).hexdigest():
        return False
    return admin


def create_access_token(admin_id:int, expires_delta: timedelta):
    encode = {'id': admin_id}
    expires = datetime.now(timezone.utc) + expires_delta
    encode.update({'exp': expires})
    return jwt.encode(encode, SECRET_KEY, algorithm=ALGORITHM)
    

@app.post('/login',response_model=basemodels.Token)
async def login_admin(form_data:Annotated[OAuth2PasswordRequestForm,Depends()], db: Session = Depends(get_db)):

    admin = authenticate_admin(form_data.username , form_data.password , db)

    if not admin:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED,detail='could not validate admin username or password is incorrect')
    
    token = create_access_token(admin.admin_id, timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES))

    return {'access_token': token, 'token_type': 'bearer'}


async def get_admin(db:db_dependency, admin_id:int):

    return db.query(models.Admin).filter(models.Admin.admin_id == admin_id).first()


async def get_current_admin(token: Annotated[str, Depends(oauth2_scheme)], db:db_dependency):
    print(2)
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        
        id: int = payload.get("id")
        if id is None:
            raise credentials_exception
        token_data = basemodels.TokenData(id=id)
        
    except InvalidTokenError:
        raise credentials_exception
    
    admin = await get_admin(db, token_data.id)
    if admin is None:
        raise credentials_exception
    return admin


admin_dependency = Annotated[models.Admin, Depends(get_current_admin)]


@app.get('/adminInfo') #test function
async def get_user_info(admin:admin_dependency, db: db_dependency):
    print(1)
    # admin = get_current_admin(token,db)
    if admin is None:
        raise HTTPException(status_code=401, detail='authentication failed')
    # print(type(user))
    # print(user.id)
    # userinfo = get_user(db,user.id)
    # print(userinfo.user_name)
    return {'admin':admin}


@app.get('/admin-management-panel')
async def management_panel(admin: admin_dependency, db: db_dependency):
    
    #list of admin containers
    admin_containers = db.query(models.ContainerAdmin.container_id).filter(models.ContainerAdmin.admin_id == admin.admin_id).all()
    message_containers = []
    comment_containers = []
    for container_id_json in admin_containers:
        container_id = container_id_json.container_id
        container = db.query(models.Container).filter(models.Container.container_id == container_id).first()
        message_containers.append(container) if container.type_id==1 else comment_containers.append(container)

    #list of admin bots
    admin_bots = db.query(models.BotAdmin.bot_id).filter(models.BotAdmin.admin_id == admin.admin_id).all()
    bots = []
    for bot_id_json in admin_bots:
        bot_id = bot_id_json.bot_id
        bot = db.query(models.Bot).filter(models.Bot.bot_id == bot_id).first()
        bots.append(bot)

    context = {
        "message_containers": message_containers,
        "comment_containers": comment_containers,
        "bots": bots
    }

    return context


@app.get('/admin-management-container/{container_id}')
async def container_management_panel(container_id: int, db: db_dependency, admin:admin_dependency):

    validate_containerID(container_id,db)
    
    container = db.query(models.Container).filter(models.Container.container_id == container_id).first()

    # count of connectd bots
    connected_bots_count = db.query(func.count(models.BotContainer.bot_id)).filter(models.BotContainer.container_id == container_id).group_by(models.BotContainer.container_id).scalar()

    # count of connected admins
    connected_admins_count = db.query(func.count(models.ContainerAdmin.admin_id)).filter(models.ContainerAdmin.container_id == container_id).group_by(models.ContainerAdmin.container_id).scalar()

    # count of messages
    message_count = db.query(func.count(models.Message.message_id)).filter(models.Message.container_id == container_id).group_by(models.Message.container_id).scalar()

    # list of count of messages sent from container in last 7 days
    week_days = {
        0: 'Mon',
        1: 'Tue',
        2: 'Wed',
        3: 'Thu',
        4: 'Fri',
        5: 'Sat',
        6: 'Sun'
    }
    last_7days_log = []
    for i in range(7):
        t1 = datetime.today() - timedelta(days=i+1)
        t2 = datetime.today() - timedelta(days=i)
        day_log = db.query(func.count(models.BotHistory.bot_history_id)).join(models.Message, models.BotHistory.message_id == models.Message.message_id).filter(and_(models.Message.container_id == container_id, models.BotHistory.time_sent.between(t1,t2))).group_by(models.Message.container_id).scalar()
        day_num = (t1.weekday()+1)%7
        week_day = week_days[day_num]
        if day_log is not None:
            last_7days_log.append({"week_day": week_day, "day_log": day_log})
        else:
            last_7days_log.append({"week_day": week_day, "day_log": 0})

    context = {
        "container": container,
        "connected_bots_count": connected_bots_count,
        "connected_admins_count": connected_admins_count,
        "message_count": message_count,
        "last_7days_log": last_7days_log
    }

    return context


@app.get('/admin-management-bot/{bot_id}')
async def bot_management_panel(bot_id: int,db:db_dependency, admin:admin_dependency):

    validate_botID(bot_id,db)

    bot = db.query(models.Bot).filter(models.Bot.bot_id == bot_id).first()
    
    # count of connectd containers
    connected_containers_count = db.query(func.count(models.BotContainer.container_id)).filter(models.BotContainer.bot_id == bot_id).group_by(models.BotContainer.bot_id).scalar()
    # count of connected admins
    connected_admins_count = db.query(func.count(models.BotAdmin.admin_id)).filter(models.BotAdmin.bot_id == bot_id).group_by(models.BotAdmin.bot_id).scalar()
    # count of messages sent
    message_count = db.query(func.count(models.BotHistory.bot_history_id)).filter(models.BotHistory.bot_id == bot_id).group_by(models.BotHistory.bot_id).scalar()
    # list of count of messages sent from bot in last 7 days
    week_days = {
        0: 'Mon',
        1: 'Tue',
        2: 'Wed',
        3: 'Thu',
        4: 'Fri',
        5: 'Sat',
        6: 'Sun'
    }
    last_7days_log = []
    for i in range(7):
        t1 = datetime.today() - timedelta(days=i+1)
        t2 = datetime.today() - timedelta(days=i)
        day_log = db.query(func.count(models.BotHistory.bot_history_id)).filter(and_(models.BotHistory.bot_id == bot_id,models.BotHistory.time_sent.between(t1,t2))).group_by(models.BotHistory.bot_id).scalar()
        day_num = (t1.weekday()+1)%7
        week_day = week_days[day_num]
        last_7days_log.append({"week_day": week_day, "day_log": day_log}) if day_log is not None else last_7days_log.append({"week_day": week_day, "day_log": 0})

    context = {
        "bot": bot,
        "connected_containers_count": connected_containers_count,
        "connected_admins_count": connected_admins_count,
        "message_count": message_count,
        "last_7days_log": last_7days_log
    }

    return context


@app.post('/add-message',response_model=bool)
async def add_message_to_container(message: basemodels.MessageBase, db: db_dependency, admin:admin_dependency):

    validate_containerID(message.container_id,db)

    try:

        create_date = date.today()
        is_deleted = False
        deleted_date = None

        db_message = models.Message(**message.model_dump(), create_date=create_date, is_deleted=is_deleted, deleted_date=deleted_date)

        db.add(db_message)
        db.commit()
        db.refresh(db_message)

        return True
    except SQLAlchemyError as e:
        db.rollback() 
        logging.error(f"SQLAlchemyError: {e}")
        raise HTTPException(status_code=400, detail=str(e))
    except Exception as e:
        db.rollback() 
        logging.error(f"Exception: {e}")
        raise HTTPException(status_code=400, detail=str(e))


@app.get('/container-messages/{container_id}')
async def get_container_messages(container_id: int, db:db_dependency, admin:admin_dependency):

    validate_containerID(container_id,db)

    container_messages = db.query(models.Message).filter(and_(models.Message.container_id == container_id, models.Message.is_deleted == 0)).all()

    # print(container_messages)

    context = []

    for message in container_messages:

        message_id = message.message_id

        message_content = message.content

        times_used = db.query(func.count(models.BotHistory.bot_history_id)).filter(models.BotHistory.message_id == message_id).group_by(models.BotHistory.message_id).scalar()

        last_used = db.query(func.max(models.BotHistory.time_sent)).filter(models.BotHistory.message_id == message_id).group_by(models.BotHistory.message_id).scalar()

        print(last_used)

        message_context = {
            "message_id": message_id,
            "message_content": message_content,
            "times_used": times_used,
            "last_used": last_used
        }

        context.append(message_context)

    return context


@app.get('/bot-messages/{bot_id}')
async def get_bot_messages(bot_id: int, db:db_dependency, admin:admin_dependency):

    validate_botID(bot_id,db)

    bot_messages = db.query(models.BotHistory).filter(models.BotHistory.bot_id == bot_id).all()

    context = []

    for botmessage in bot_messages:
        time_sent = botmessage.time_sent
        message_id = botmessage.message_id
        message = db.query(models.Message).filter(models.Message.message_id == message_id).first()
        container_id = message.container_id
        is_deleted = message.is_deleted
        content = message.content

        message_context = {
            "message_id": message_id,
            "container_id": container_id,
            "content": content,
            "time_sent": time_sent,
            "is_deleted": is_deleted
        }

        context.append(message_context)

    return context 


@app.delete('/delete-container/{container_id}') # delete all connections
async def delete_container(container_id: int, db:db_dependency, admin:admin_dependency):

    validate_containerID(container_id,db)

    try:

        #delete admin-container connections

        admin_containers = db.query(models.ContainerAdmin).filter(models.ContainerAdmin.container_id == container_id).all()
        for admin_container in admin_containers:
            db.delete(admin_container)
            db.commit()

        # delete bot-container connections

        bot_containers = db.query(models.BotContainer).filter(models.BotContainer.container_id == container_id).all()
        for bot_container in bot_containers:
            db.delete(bot_container)
            db.commit()

        # delete the entity

        db_container = db.query(models.Container).filter(models.Container.container_id == container_id).first()

        db.delete(db_container)
        db.commit()

        return {"message":"container deleted succesfully"}
    except Exception as e:
        db.rollback()
        print(e)
        logging.error(f"Error: {e}")
        raise HTTPException(status_code=status.HTTP_409_CONFLICT,detail="something went wrong")
    


@app.delete('/delete-bot/{bot_id}') # delete all connections
async def delete_bot(bot_id: int, db:db_dependency, admin:admin_dependency):

    validate_botID(bot_id,db)

    try:

        # delete bot-admin conections

        bot_admins = db.query(models.BotAdmin).filter(models.BotAdmin.bot_id == bot_id).all()
        for bot_admin in bot_admins:
            db.delete(bot_admin)
            db.commit()

        # delete bot-container connections

        bot_containers = db.query(models.BotContainer).filter(models.BotContainer.bot_id == bot_id).all()
        for bot_container in bot_containers:
            db.delete(bot_container)
            db.commit()

        db_bot = db.query(models.Bot).filter(models.Bot.bot_id == bot_id).first()

        db.delete(db_bot)
        db.commit()

        return {"message":"bot deleted succesfully"}
        
    except Exception as e:
        db.rollback()
        print(e)
        logging.error(f"Error: {e}")
        raise HTTPException(status_code=status.HTTP_409_CONFLICT,detail="something went wrong")



@app.get('/all-containers')
async def get_all_containers(db:db_dependency, admin:admin_dependency):
    
    all_containers: models.Container = db.query(models.Container).all()

    message_containers = []
    
    comment_containers = []
    
    for container in all_containers:
        message_containers.append(container) if container.type_id==1 else comment_containers.append(container)

    return {"message_containers":message_containers, "comment_containers":comment_containers}

@app.get('/admin-username-authentication/edit/{mode}/{username}&{ent_id}')
async def get_all_admins(mode: int, username: str, ent_id: int, db:db_dependency, admin:admin_dependency):

    # mode 0 => bot
    # mode 1 => container

    admin = db.query(models.Admin).filter(models.Admin.username == username).first()

    if admin is None:
        return False
    
    if mode == 0:
        # check if admin id is in adminBot
        admins_json = db.query(models.BotAdmin.admin_id).filter(models.BotAdmin.bot_id == ent_id).all()

        admins_list = [x.admin_id for x in admins_json]

        if admin.admin_id in admins_list:
            return False
    else:
        # check if admin id is in adminContainer
        admins_json = db.query(models.ContainerAdmin.admin_id).filter(models.ContainerAdmin.container_id == ent_id).all()

        admins_list = [x.admin_id for x in admins_json]

        if admin.admin_id in admins_list:
            return False
        
    return True

    
@app.post('/add-bot')
async def add_bot(bot: basemodels.BotBase, admin_usernames: Annotated[list[str],Body()], containers: Annotated[list[int],Body()], db: db_dependency, admin:admin_dependency):

    try:
        # add bot
        create_date = date.today()
        last_active = date.today()
        db_bot = models.Bot(**bot.model_dump() ,create_date=create_date,last_active=last_active)

        db.add(db_bot)
        db.commit()
        db.refresh(db_bot)

        admin_usernames.append(admin.username)

        # add BotAdmins
        for admin_username in admin_usernames:
            try:
                # validate_adminID(admin_id,db)
                admin_id = db.query(models.Admin.admin_id).filter(models.Admin.username == admin_username).first()
                if admin_id is None:
                    raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="admin not found")
                db_botadmin = models.BotAdmin(admin_id=admin_id.admin_id, bot_id=db_bot.bot_id)
                db.add(db_botadmin)
                db.commit()
                db.refresh(db_botadmin)
            except Exception as e:
                print(e)

        # add BotContainer
        for container_id in containers:
            try:
                validate_containerID(container_id,db)
                db_botcontainer = models.BotContainer(bot_id=db_bot.bot_id, container_id=container_id)
                db.add(db_botcontainer)
                db.commit()
                db.refresh(db_botcontainer)
            except Exception as e:
                print(e)
            
        return True

    except SQLAlchemyError as e:
        db.rollback() 
        logging.error(f"SQLAlchemyError: {e}")
        raise HTTPException(status_code=400, detail=str(e))
    except Exception as e:
        db.rollback() 
        logging.error(f"Exception: {e}")
        raise HTTPException(status_code=400, detail=str(e))


@app.post('/add-container')
async def add_container(container: basemodels.ContainerBase, admin_usernames: Annotated[list[str],Body()], bots: Annotated[list[int],Body()], db: db_dependency, admin:admin_dependency):

    try:
        # add container
        create_date = date.today()
        db_container = models.Container(**container.model_dump() ,create_date=create_date)

        db.add(db_container)
        db.commit()
        db.refresh(db_container)

        admin_usernames.append(admin.username)

        # add ContainerAdmins
        for admin_username in admin_usernames:
            try:
                # validate_adminID(admin_id,db)
                admin_id = db.query(models.Admin.admin_id).filter(models.Admin.username == admin_username).first()
                if admin_id is None:
                    raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="admin not found")
                db_containeradmin = models.ContainerAdmin(admin_id=admin_id.admin_id, container_id=db_container.container_id)
                db.add(db_containeradmin)
                db.commit()
                db.refresh(db_containeradmin)
            except Exception as e:
                print(e)


        # add BotContainer
        for bot_id in bots:
            try:
                validate_botID(bot_id,db)
                db_botcontainer = models.BotContainer(bot_id=bot_id, container_id=db_container.container_id)
                db.add(db_botcontainer)
                db.commit()
                db.refresh(db_botcontainer)
            except Exception as e:
                print(e)
            
        return True

    except SQLAlchemyError as e:
        db.rollback() 
        logging.error(f"SQLAlchemyError: {e}")
        raise HTTPException(status_code=400, detail=str(e))
    except Exception as e:
        db.rollback() 
        logging.error(f"Exception: {e}")
        raise HTTPException(status_code=400, detail=str(e))


@app.get('/get-unconnected-entities/{mode}/{ent_id}')
async def get_unconnected_entities(mode: int, ent_id: int, db:db_dependency, admin:admin_dependency):

    # mode 1 => bot
    # mode 2 => container
    # ent_id is either bot_id or container_id depending on mode

    if mode==1:

        validate_botID(ent_id,db)

        all_containers = await get_all_containers(db,admin)

        message_containers = [x.container_id for x in all_containers['message_containers']]
        comment_containers = [x.container_id for x in all_containers['comment_containers']]

        connected_containers = db.query(models.BotContainer.container_id).filter(models.BotContainer.bot_id == ent_id).all()

        connected_containers_list = [x.container_id for x in connected_containers]

        for container_id in connected_containers_list:

            if container_id in message_containers:
                message_containers.remove(container_id)
            elif container_id in comment_containers:
                comment_containers.remove(container_id)

        unconnected_message_containers = []
        unconnected_comment_containers = []
        for container_id in message_containers:
            container = db.query(models.Container).filter(models.Container.container_id == container_id).first()
            unconnected_message_containers.append(container)
        for container_id in comment_containers:
            container = db.query(models.Container).filter(models.Container.container_id == container_id).first()
            unconnected_comment_containers.append(container)

        return {"message_containers":unconnected_message_containers, "comment_containers":unconnected_comment_containers}
    
    else:

        validate_containerID(ent_id,db)

        all_botsJson = db.query(models.Bot.bot_id).all()

        all_bots = [x.bot_id for x in all_botsJson]

        connected_botsJson = db.query(models.BotContainer.bot_id).filter(models.BotContainer.container_id == ent_id).all()

        connected_bots = [x.bot_id for x in connected_botsJson]

        for bot_id in connected_bots:
            all_bots.remove(bot_id)

        unconnected_bots = []
        for bot_id in all_bots:
            bot = db.query(models.Bot).filter(models.Bot.bot_id == bot_id).first()
            unconnected_bots.append(bot)

        return unconnected_bots


@app.put('/edit-bot/{bot_id}')
async def edit_bot(edit_params: basemodels.BotBase, admin_usernames: Annotated[list[str],Body()], containers: Annotated[list[int],Body()], bot_id: int, db: db_dependency, admin:admin_dependency):

    validate_botID(bot_id,db)

    username_taken = db.query(models.Bot).filter(models.Bot.username == edit_params.username).first()

    if username_taken is not None and username_taken.bot_id != bot_id :
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="bot username is already taken")

    bot:models.Bot = db.query(models.Bot).filter(models.Bot.bot_id == bot_id).first()

    bot.title = edit_params.title
    bot.username = edit_params.username
    bot.info = edit_params.info

    db.commit()
    db.refresh(bot)

    for admin_username in admin_usernames:
        try:
            # validate_adminID(admin_id,db)
            admin_id = db.query(models.Admin.admin_id).filter(models.Admin.username == admin_username).first()
            if admin_id is None:
                raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="admin not found")
            db_botadmin = models.BotAdmin(admin_id=admin_id.admin_id, bot_id=bot_id)
            db.add(db_botadmin)
            db.commit()
            db.refresh(db_botadmin)
        except Exception as e:
            print(e)

    for container_id in containers:
        try:
            validate_containerID(container_id,db)
            db_botcontainer = models.BotContainer(bot_id=bot_id, container_id=container_id)
            db.add(db_botcontainer)
            db.commit()
            db.refresh(db_botcontainer)
        except Exception as e:
            print(e)

    return {"message":"bot edited succesfully"}


@app.put('/edit-container/{container_id}')
async def edit_container(edit_params: basemodels.ContainerBase, admin_usernames: Annotated[list[str],Body()], bots: Annotated[list[int],Body()], container_id: int, db: db_dependency, admin:admin_dependency):

    validate_containerID(container_id,db)

    container:models.Container = db.query(models.Container).filter(models.Container.container_id == container_id).first()

    container.title = edit_params.title
    container.type_id = edit_params.type_id
    container.info = edit_params.info

    db.commit()
    db.refresh(container)

    for admin_username in admin_usernames:
        try:
            # validate_adminID(admin_id,db)
            admin_id = db.query(models.Admin.admin_id).filter(models.Admin.username == admin_username).first()
            if admin_id is None:
                raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="admin not found")
            db_containeradmin = models.ContainerAdmin(admin_id=admin_id.admin_id, container_id=container_id)
            db.add(db_containeradmin)
            db.commit()
            db.refresh(db_containeradmin)
        except Exception as e:
            print(e)

    for bot_id in bots:
        try:
            validate_botID(bot_id,db)
            db_botcontainer = models.BotContainer(bot_id=bot_id, container_id=container_id)
            db.add(db_botcontainer)
            db.commit()
            db.refresh(db_botcontainer)
        except Exception as e:
            print(e)

    return {"message":"container edited succesfully"}

    


@app.get('/container-log/{container_id}&{t1}&{t2}')
async def get_container_log(container_id: int, t1: date, t2:date, db:db_dependency, admin:admin_dependency):

    validate_containerID(container_id,db)
    
    # all_messages_in_period = db.query(models.BotHistory.message_id).filter(models.BotHistory.time_sent.between(t1,t2)).all()
    messages_in_period = db.query(models.BotHistory).join(models.Message,models.Message.message_id == models.BotHistory.message_id).filter(and_(models.BotHistory.time_sent.between(t1,t2),models.Message.container_id==container_id)).all()

    count_messages_in_period = len(messages_in_period)

    added_in_period = db.query(func.count(models.Message.message_id)).filter(and_(models.Message.container_id == container_id,models.Message.create_date.between(t1,t2))).group_by(models.Message.container_id).scalar()
    
    deleted_in_period = db.query(func.count(models.Message.message_id)).filter(and_(models.Message.container_id == container_id,models.Message.is_deleted==1,models.Message.deleted_date.between(t1,t2))).group_by(models.Message.container_id).scalar()

    tempt2 = t2

    graph = []

    while tempt2>t1:

        tempt1 = tempt2 - timedelta(days=1)

        count = 0

        for message in messages_in_period:
            if message.time_sent.date() >= tempt1 and message.time_sent.date() < tempt2:
                count+=1
                messages_in_period.remove(message)
            
        graph_data = {
            "date": tempt1,
            "count": count
        }

        graph.append(graph_data)

        tempt2 = tempt1


    context = {
        "messages_in_period": count_messages_in_period,
        "added_in_period": added_in_period,
        "deleted_in_period": deleted_in_period,
        "graph": graph
    }

    return context


@app.get('/container-log/{container_id}&{t1}&{t2}/sent-messages')
async def get_container_log_sent_messages(container_id: int, t1: date, t2:date, db:db_dependency, admin:admin_dependency):

    validate_containerID(container_id,db)

    messages_in_period = db.query(models.BotHistory).join(models.Message,models.Message.message_id == models.BotHistory.message_id).filter(and_(models.BotHistory.time_sent.between(t1,t2),models.Message.container_id==container_id)).all()

    context = []

    for bothistory in messages_in_period:

        message = db.query(models.Message).filter(models.Message.message_id == bothistory.message_id).first()

        message_context = {
            "message_id": message.message_id,
            "time_sent": bothistory.time_sent,
            "container_id": message.container_id,
            "content": message.content,
        }

        context.append(message_context)

    return context
 

@app.get('/container-log/{container_id}&{t1}&{t2}/added-messages')
async def get_container_log_added_messages(container_id: int, t1: date, t2:date, db:db_dependency, admin:admin_dependency):

    validate_containerID(container_id,db)

    messages = db.query(models.Message).filter(and_(models.Message.container_id == container_id,models.Message.create_date.between(t1,t2))).all()

    return messages


@app.get('/container-log/{container_id}&{t1}&{t2}/deleted-messages')
async def get_container_log_deleted_messages(container_id: int, t1: date, t2:date, db:db_dependency, admin:admin_dependency):

    validate_containerID(container_id,db)

    deleted_messages = db.query(models.Message).filter(and_(models.Message.container_id == container_id, models.Message.is_deleted==1,models.Message.deleted_date.between(t1,t2))).all()

    return deleted_messages


@app.get('/bot-log/{bot_id}&{t1}&{t2}')
async def get_bot_log(bot_id: int, t1: date, t2:date, db:db_dependency, admin:admin_dependency):

    validate_botID(bot_id,db)
    
    # all_messages_in_period = db.query(models.BotHistory.message_id).filter(models.BotHistory.time_sent.between(t1,t2)).all()
    messages_in_period = db.query(models.BotHistory).filter(and_(models.BotHistory.time_sent.between(t1,t2),models.BotHistory.bot_id==bot_id)).all()

    count_messages_in_period = len(messages_in_period)

    # added_in_period = db.query(func.count(models.Message.message_id)).filter(and_(models.Message.bot_id == bot_id,models.Message.create_date.between(t1,t2))).group_by(models.Message.bot_id).scalar()
    
    # deleted_in_period = db.query(func.count(models.Message.message_id)).filter(and_(models.Message.bot_id == bot_id,models.Message.is_deleted==1,models.Message.deleted_date.between(t1,t2))).group_by(models.Message.bot_id).scalar()

    tempt2 = t2

    graph = []

    while tempt2>t1:

        tempt1 = tempt2 - timedelta(days=1)

        count = 0

        for message in messages_in_period:
            if message.time_sent.date() >= tempt1 and message.time_sent.date() < tempt2:
                count+=1
                messages_in_period.remove(message)
            
        graph_data = {
            "date": tempt1,
            "count": count
        }

        graph.append(graph_data)

        tempt2 = tempt1


    context = {
        "messages_in_period": count_messages_in_period,
        # "added_in_period": added_in_period,
        # "deleted_in_period": deleted_in_period,
        "graph": graph
    }

    return context


@app.get('/bot-log/{bot_id}&{t1}&{t2}/sent-messages')
async def get_bot_log_sent_messages(bot_id: int, t1: date, t2:date, db:db_dependency, admin:admin_dependency):

    validate_botID(bot_id,db)

    messages_in_period = db.query(models.BotHistory).filter(and_(models.BotHistory.time_sent.between(t1,t2),models.BotHistory.bot_id==bot_id)).all()

    context = []

    for bothistory in messages_in_period:

        message = db.query(models.Message).filter(models.Message.message_id == bothistory.message_id).first()

        message_context = {
            "message_id": message.message_id,
            "time_sent": bothistory.time_sent,
            "bot_id": bothistory.bot_id,
            "content": message.content,
        }

        context.append(message_context)

    return context
 

@app.get('/bot-containers/{bot_id}')
async def get_bot_containers(bot_id: int,db: db_dependency, admin: admin_dependency):

    validate_botID(bot_id,db)
    
    bot_containers = db.query(models.BotContainer.container_id).filter(models.BotContainer.bot_id == bot_id).all()

    containers = []

    for container_id_json in bot_containers:

        container_id = container_id_json.container_id

        container = db.query(models.Container).filter(models.Container.container_id == container_id).first()

        containers.append(container)

    return containers


@app.post('/send-messsage',response_model=bool)
async def send_message(bot_history: basemodels.BotHistoryBase, db:db_dependency, admin: admin_dependency):

    validate_botID(bot_history.bot_id,db)
    validate_messageID(bot_history.message_id,db)

    bot_containers = await get_bot_containers(bot_history.bot_id,db,admin)

    bot_containers_list = [x.container_id for x in bot_containers]

    message = db.query(models.Message).filter(models.Message.message_id == bot_history.message_id).first()

    if message.container_id not in bot_containers_list:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="bot does not have access to this message")
    
    time_sent = datetime.now()

    db_botHistory = models.BotHistory(**bot_history.model_dump(), time_sent=time_sent)

    db.add(db_botHistory)
    db.commit()
    db.refresh(db_botHistory)

    update_bot:models.Bot = db.query(models.Bot).filter(models.Bot.bot_id == bot_history.bot_id).first()

    update_bot.last_active = time_sent.date()

    db.commit()
    db.refresh(update_bot)
    
    return True


@app.put('/delete-message/{message_id}')
async def delete_message(message_id: int,db:db_dependency, admin:admin_dependency):

    validate_messageID(message_id,db)

    message:models.Message = db.query(models.Message).filter(models.Message.message_id == message_id).first()

    if message.is_deleted:
        return {"message":"message is already deleted"}

    message.is_deleted = True
    message.deleted_date = date.today()

    db.commit()
    db.refresh(message)

    return {"message":"message deleted succesfully"}


