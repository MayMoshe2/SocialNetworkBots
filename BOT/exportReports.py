from ast import Or
from asyncio.windows_events import NULL
from tarfile import NUL
import chromedriver_binary
import time
import logging
import sys
import os
import re
from dataclasses import dataclass
from typing import Dict, Set
from selenium import webdriver
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.remote.webelement import WebElement
from selenium.webdriver.common.action_chains import ActionChains
import chromedriver_binary
import winsound
import json
import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore

# from addConnections import AddConnectionsTracker
# from withdrawConnections import WithdrawConnectionsTracker
import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from email.mime.base import MIMEBase
from email import encoders

logger = logging.getLogger("bot")

def get_email_and_password():
    cred = credentials.Certificate(
        "socialnetworksbots-firebase-adminsdk-ckg7j-0ed2aef80b.json")
    firebase_admin.initialize_app(cred)
    db = firestore.client()

    emp_ref = db.collection('users')
    docs = emp_ref.stream()
    pointer = sys.argv[1]
    for doc in docs:
        value = int(doc.get('value'))
        if value == pointer:
            email = doc.get('username')
            password = doc.get('password')
        else:
            logger.info("No success")
    receiver_address = sys.argv[3]
    return email, password, receiver_address

def initialize_logger():
    logger.setLevel(logging.DEBUG)

    formatter = logging.Formatter(
        "%(asctime)s - %(levelname)s - %(message)s", datefmt="%Y-%m-%d %H:%M:%S")
    handlers = [logging.StreamHandler(
        sys.stdout), logging.FileHandler(filename=f"logs/output.log")]
    for handler in handlers:
        handler.setLevel(logging.DEBUG)
        handler.setFormatter(formatter)
        logger.addHandler(handler)


def sendMail(senderEmail, senderPass, receiver_address, attach_file_name):
    message = MIMEMultipart()
    message['From'] = senderEmail
    message['To'] = receiver_address
    message['Subject'] = 'A test mail sent by Python. It has an attachment.'
    #The subject line
    #The body and the attachments for the mail
    mail_content = '''Hello, this is the report you asked :)'''
    message.attach(MIMEText(mail_content, 'plain'))
    attach_file = open(attach_file_name, 'rb') # Open the file as binary mode
    payload = MIMEBase('application', 'octate-stream')
    payload.set_payload((attach_file).read())
    encoders.encode_base64(payload) #encode the attachment
    #add payload header with filename
    payload.add_header('Content-Decomposition', 'attachment', filename=attach_file_name)
    message.attach(payload)
    #Create SMTP session for sending the mail
    session = smtplib.SMTP('smtp.gmail.com', 587) #use gmail with port
    session.starttls() #enable security
    session.login(senderEmail, senderPass) #login with mail_id and password
    text = message.as_string()
    session.sendmail(senderEmail, receiver_address, text)
    session.quit()
    logger.info('Mail Sent')

def main():
    initialize_logger()
    deliveryTrackerRep = "logs\delivery_tracker.csv"
    addConnectionsRep = "logs\addConnections_tracker.csv"
    withdrawConnectionsTrackerRep = "logs\withdrawConnections_tracker.csv"

    senderEmail, senderPass, receiver_address = get_email_and_password()
    if sys.argv[2] == 0:
        logger.info("export deliverytracker")
        sendMail(senderEmail, senderPass, receiver_address, deliveryTrackerRep)

    elif sys.argv[2] == 1:
        logger.info("delete deliverytracker")
        if(os.path.exists(deliveryTrackerRep) and os.path.isfile(deliveryTrackerRep)):
            os.remove(deliveryTrackerRep)

    elif sys.argv[2] == 2:
        logger.info("export addConnections")
        sendMail(senderEmail, senderPass, receiver_address, addConnectionsRep)

    elif sys.argv[2] == 3:
        logger.info("delete addConnections")
        if(os.path.exists(addConnectionsRep) and os.path.isfile(addConnectionsRep)):
            os.remove(addConnectionsRep)

    elif sys.argv[2] == 4:
        logger.info("export withdrawPeople")
        sendMail(senderEmail, senderPass, receiver_address, withdrawConnectionsTrackerRep)

    elif sys.argv[2] == 5:
        logger.info("delete withdrawPeople")
        if(os.path.exists(withdrawConnectionsTrackerRep) and os.path.isfile(withdrawConnectionsTrackerRep)):
            os.remove(withdrawConnectionsTrackerRep)
        
    logger.info("Done")


if __name__ == "__main__":
    main()