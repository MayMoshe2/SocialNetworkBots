from ast import Or
from asyncio.windows_events import NULL
from tarfile import NUL
import chromedriver_binary
import time
import logging
import sys
import os
import re
import string
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
    pointer = int(sys.argv[1])
    for doc in docs:
        value = int(doc.get('value'))
        if value == pointer:
            receiver_address = doc.get('username')
        else:
            logger.info("No success")
    option = int(sys.argv[2])

    email = "EaglePointBot@gmail.com"
    password = "B0t1234!"
    return email, password, receiver_address, option


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


def sendMail(senderEmail, senderPass, receiver_address, attach_file_name, file):

    logger.info(senderEmail)
    logger.info(senderPass)
    try:
        message = MIMEMultipart()
        message['From'] = senderEmail
        message['To'] = receiver_address
        message['Subject'] = 'Report of ' + file
        # The subject line
        # The body and the attachments for the mail
        mail_content = '''Hello, this is the report you asked :) Please download the file and open it with notepad or typist.'''
        message.attach(MIMEText(mail_content, 'plain'))
        attach_file = open(attach_file_name)  # Open the file as binary mode
        payload = MIMEBase('application', 'octate-stream')
        payload.set_payload((attach_file).read())
        encoders.encode_base64(payload)  # encode the attachment
        # add payload header with filename
        payload.add_header('Content-Decomposition',
                           'attachment', filename=attach_file_name)
        message.attach(payload)
        # Create SMTP session for sending the mail
        session = smtplib.SMTP('smtp.gmail.com', 587)  # use gmail with port
        session.starttls()  # enable security
        # login with mail_id and password
        session.login(senderEmail, senderPass)
        logger.info("im here!")
        text = message.as_string()
        session.sendmail(senderEmail, receiver_address, text)
        session.quit()
    except Exception as exc:
        logger.exception("failed", exc_info=exc)
    logger.info('Mail Sent')


def main():
    initialize_logger()

    deliveryTrackerRep = "logs/delivery_tracker.csv"
    addConnectionsRep = "logs/addConnections_tracker.csv"
    withdrawConnectionsTrackerRep = "logs/withdrawConnections_tracker.csv"

    senderEmail, senderPass, receiver_address, option = get_email_and_password()
    if option == 0:
        logger.info("export deliverytracker")
        file = "deliverytracker"
        sendMail(senderEmail, senderPass, receiver_address,
                 deliveryTrackerRep, file)

    elif option == 1:
        logger.info("delete deliverytracker")
        if(os.path.exists(deliveryTrackerRep) and os.path.isfile(deliveryTrackerRep)):
            os.remove(deliveryTrackerRep)

    elif option == 2:
        logger.info("export addConnections")
        file = "addConnections"
        sendMail(senderEmail, senderPass, receiver_address,
                 deliveryTrackerRep, file)

    elif option == 3:
        logger.info("delete addConnections")
        if(os.path.exists(addConnectionsRep) and os.path.isfile(addConnectionsRep)):
            os.remove(addConnectionsRep)

    elif option == 4:
        logger.info("export withdrawPeople")
        file = "withdrawPeople"
        sendMail(senderEmail, senderPass, receiver_address,
                 deliveryTrackerRep, file)

    elif option == 5:
        logger.info("delete withdrawPeople")
        if(os.path.exists(withdrawConnectionsTrackerRep) and os.path.isfile(withdrawConnectionsTrackerRep)):
            os.remove(withdrawConnectionsTrackerRep)

    logger.info("Done")


if __name__ == "__main__":
    main()