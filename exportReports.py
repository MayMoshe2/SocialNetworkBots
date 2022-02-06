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

from addConnections import AddConnectionsTracker
from withdrawConnections import WithdrawConnectionsTracker


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
    return email, password

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


def main():
    initialize_logger()
    deliveryTrackerRep = "logs\delivery_tracker.csv"
    addConnectionsRep = "logs\addConnections_tracker"
    withdrawConnectionsTracker = "logs\withdrawConnections_tracker"
    if sys.argv[2] == 0:
        logger.info("export deliverytracker")

    elif sys.argv[2] == 1:
        logger.info("delete deliverytracker")
        if(os.path.exists(deliveryTrackerRep) and os.path.isfile(deliveryTrackerRep)):
            os.remove(deliveryTrackerRep)

    elif sys.argv[2] == 2:
        logger.info("export addConnections")

    elif sys.argv[2] == 3:
        logger.info("delete addConnections")
        if(os.path.exists(addConnectionsRep) and os.path.isfile(addConnectionsRep)):
            os.remove(addConnectionsRep)

    elif sys.argv[2] == 4:
        logger.info("export withdrowPeople")

    elif sys.argv[2] == 5:
        logger.info("delete withdrowPeople")
        if(os.path.exists(withdrawConnectionsTracker) and os.path.isfile(withdrawConnectionsTracker)):
            os.remove(withdrawConnectionsTracker)
        
    logger.info("Done")


if __name__ == "__main__":
    main()