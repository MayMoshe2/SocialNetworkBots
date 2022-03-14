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
    headline = sys.argv[1]
    message = sys.argv[2]
    email = "EaglePointBot@gmail.com"
    password = "B0t1234!"
    return email, password, headline, message


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


def sendMail(senderEmail, senderPass, receiver_address, headline, message):

    logger.info(senderEmail)
    logger.info(senderPass)
    try:
        message = MIMEMultipart()
        message['From'] = senderEmail
        message['To'] = receiver_address
        message['Subject'] = headline
        # The subject line
        # The body and the attachments for the mail
        mail_content = message
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
    senderEmail, senderPass, headline, message = get_email_and_password()
    logger.info(senderEmail)
    logger.info(headline)
    logger.info(message)

    cred = credentials.Certificate(
        "socialnetworksbots-firebase-adminsdk-ckg7j-0ed2aef80b.json")
    firebase_admin.initialize_app(cred)
    db = firestore.client()
    emp_ref = db.collection('users')
    docs = emp_ref.stream()

    receiver_address = "["

    for doc in docs:
        receiver_address += doc.get('username')
        receiver_address += ","
    receiver_address += "]"

    # receiver_address = 'maymoshe222@gmail.com, nirmaman631@gmail.com'
    sendMail(senderEmail, senderPass, receiver_address, headline, message)
    logger.info(receiver_address)
    logger.info("Done")
    # print(receiver_address)


if __name__ == "__main__":
    main()
